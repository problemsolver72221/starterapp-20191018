
import { workersQuery } from './workers.query'
import { workersMutation } from './workers.mutation'
import * as hooks from './hooks'

// Applies default values to `express.session` config object
const buildConfig = ({ getConfig, setConfig }) => {
    const config = {
        ...getConfig('express.workers', {}),
        token: getConfig('express.workers.token', 'test-token'),
        queries: getConfig('express.workers.queries', {}),
        mutations: getConfig('express.workers.mutations', {}),
        wrapperName: getConfig('express.workers.wrapperName', 'workers'),
        queryName: getConfig('express.workers.queryName', 'WorkersQuery'),
        queryDesc: getConfig('express.workers.queryDesc', 'Provides iqueries endpoints for workers'),
        mutationName: getConfig('express.workers.mutationName', 'WorkersMutation'),
        mutationDesc: getConfig('express.workers.mutationDesc', 'Provide mutations endpoints for workers'),
    }

    setConfig('express.session', config)
    return config
}

export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        hook: '$EXPRESS_WORKERS_GRAPHQL_VALIDATE',
        name: hooks.SERVICE_NAME,
        trace: __filename,
        handler: ({ args }, ctx) => {
            const config = buildConfig(ctx)
            const isDev = [ 'development', 'test' ].includes(ctx.getEnv('NODE_ENV'))

            if (!isDev && args.token !== config.token) {
                throw new Error('Invalid workers token')
            }
        },
    })

    // Express GraphQL is an optional hook as the service may not be registered
    registerAction({
        hook: '$EXPRESS_GRAPHQL',
        name: hooks.SERVICE_NAME,
        optional: true,
        trace: __filename,
        handler: async ({ registerQuery, registerMutation }, ctx) => {
            const {
                wrapperName,
                queries,
                mutations,
                ...config } = buildConfig(ctx)
            
            // make the session wrapper extensible
            await ctx.createHook.serie(hooks.EXPRESS_WORKERS_GRAPHQL, {
                registerQuery: (key, val) => {
                    // console.log(queries)
                    if (queries[key]) {
                        throw new Error(`[express-session] Query "${key}" was already defined`)
                    }
                    queries[key] = val
                },
                registerMutation: (key, val) => {
                    if (mutations[key]) {
                        throw new Error(`[express-session] Mutation "${key}" was already defined`)
                    }
                    mutations[key] = val
                },
            })

            // register query and optinal mutation
            if (Object.keys(queries).length) {
                registerQuery(wrapperName, await workersQuery({ ...config, queries }, ctx))
            }

            if (Object.keys(mutations).length) {
                registerMutation(wrapperName, await workersMutation({ ...config, mutations }, ctx))
            }
        },
    })
}