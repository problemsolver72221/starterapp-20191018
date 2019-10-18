
import { createHookApp } from '@forrestjs/hooks'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default createHookApp({
    trace: true,
    services: [
        require('@forrestjs/service-env'),
        require('@forrestjs/service-logger'),
        require('./services/service-fetchq'),
        require('./services/service-api'),
    ],
    features: [
        require('./features/api-queries'),
        require('./features/worker-workflow'),
    ],
    settings: async ({ setConfig, getEnv, getConfig }) => {
        setConfig('fetchq', {
            logLevel: getEnv('LOG_LEVEL'),
            connect: {
                host: getEnv('PG_HOST'),
                port: getEnv('PG_PORT'),
                database: getEnv('PG_DATABASE'),
                user: getEnv('PG_USERNAME'),
                password: getEnv('PG_PASSWORD'),
            },
        })

        setConfig('api', {
            token: getEnv('API_TOKEN'),
            endpoint: getEnv('API_ENDPOINT'),
        })
    },
})
