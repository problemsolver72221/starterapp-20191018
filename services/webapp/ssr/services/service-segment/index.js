import * as hooks from './hooks'

import { init } from './segment.lib'

// Applies default values to `segment` config object
const buildConfig = ({ getConfig, setConfig }) => {
    const config = {
        ...getConfig('segment', {}),
        key: getConfig('segment.key'),
    }

    setConfig('segment', config)
    return config
}

// export resuable functionality
export {
    identity,
    track,
} from './segment.lib'


export default ({ registerHook, registerAction }) => {
    registerHook(hooks)

    const defaults = {
        name: hooks.SERVICE_NAME,
        trace: __filename,
    }

    registerAction({
        ...defaults,
        hook: '$INIT_SERVICE',
        handler: async (args, ctx) => {
            const config = buildConfig(ctx)
            await init(config)
        },
    })
}
