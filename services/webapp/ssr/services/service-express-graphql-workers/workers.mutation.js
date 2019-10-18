import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import * as hooks from './hooks'

export const workersMutation = async ({
    mutationName,
    mutationDesc,
    mutations = {},
}, ctx) => {
    const args = {
        token: { type: GraphQLString },
    }

    return {
        description: mutationDesc,
        args,
        type: new GraphQLNonNull(new GraphQLObjectType({
            name: mutationName,
            fields: mutations,
        })),
        resolve: async (_, args, { req, res }) => {
            await ctx.createHook.serie(hooks.EXPRESS_WORKERS_GRAPHQL_VALIDATE, {
                args,
                req,
                res,
            })

            return {}
        },
    }
}
