# service-segment

Provides functionality to communicate with segment
Service reference: https://segment.com/docs/sources/server/node/

# Usage

### Manage documents

Below is an example of how use service

```js
import * as segment from 'src/services/service-segment'
segment.identity('userId', { name: 'user' })
segment.track('eventName', { prop: 'some prop value' }, 'userId')
```

## Required eniroment variables

```js
registerAction({
    hook: SETTINGS,
    name: '♦ boot',
    handler: async ({ setConfig, getEnv }) => {
        setConfig('segment', {
            key: getEnv('SEGMENT_WRITE_KEY'),
        })
    },
})
```