
import * as hooks from './hooks'
// import * as kicks from './kicks'

// import { driverPurgerMutation } from './graphql/driver-purger.mutation'

export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

    const defaults = {
        name: hooks.FEATURE_NAME,
        trace: __filename,
    }

    registerAction({
        ...defaults,
        hook: '$FETCHQ_INIT',
        handler: async ({ registerQueue }, ctx) => {
            registerQueue('workflow')
        },
    })

    registerAction({
        ...defaults,
        hook: '$EXPRESS_WORKERS_GRAPHQL',
        handler: async ({ registerMutation }) => {},
    })
}
