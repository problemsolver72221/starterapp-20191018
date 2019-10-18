import { GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { GraphQLID, GraphQLString } from 'graphql'
import * as hooks from './hooks'

export const workersQuery = async ({
    queryName,
    queryDesc,
    queries = {},
}, ctx) => {
    const args = {
        token: { type: GraphQLString },
    }

    return {
        description: queryDesc,
        args,
        type: new GraphQLNonNull(new GraphQLObjectType({
            name: queryName,
            fields: queries,
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
