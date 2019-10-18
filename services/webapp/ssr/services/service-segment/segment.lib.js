
import Analytics from 'analytics-node'

let client = null

// log user identity
export const identity = (userId = 'system', traits = {}) => {
    try {
        client.identify({ userId, traits })
    } catch (err) {
        console.log(`@metrics identify error - ${err.message}`)
    }
}

// track an event
export const track = (event, properties, userId = 'system') => {
    try {
        client.track({ userId, event, properties })
    } catch (err) {
        console.log(`@metrics track error - ${err.message}`)
    }
}

export const init = (config) => {
    client = new Analytics(config.key)

    // identity()
    // track('hello', { foo: 'fi' })
}

