# service-redis

Provides a closed api wrapper in graphql to the fetchq worker nodes.
Need a token to be accessable in production.

# Usage

### manage groups
Add new endpoints to the workers wrapper.

```js
registerAction({
    hook: '$EXPRESS_WORKERS_GRAPHQL',
    name: '♦ boot',
    handler: async ({ registerQuery, registerMutation }) => {
        registerQuery('queryName', require('path-to-query'))
        registerMutation('mutationName', require('path-to-mutation'))
    },
})
```

## Required eniroment variables

```js
registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: async ({ setConfig, getEnv }) => {
        setConfig('express.workers.token', getEnv('WORKERS_TOKEN'))
    },
})
```