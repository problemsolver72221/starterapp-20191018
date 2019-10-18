
import io from 'socket.io'
// import ioClient from 'socket.io-client'
import * as hooks from './hooks'

let serverSocket = null
// setup possible events
const listeners = []
const triggers = {}

/**
    socket.io emit cheatsheet: https://socket.io/docs/emit-cheatsheet/
*/
export const emit = (name, payload, options = {}) => {
    const trigger = triggers[name]
    if (!trigger) throw new Error('[service-socketio] Not amoung known triggers')
    Object.keys(payload).forEach((i) => {
        if (!trigger.payload[i]) {
            throw new Error('[service-socketio] trigger payload property does not exist')
        }
        if (trigger.payload[i] !== typeof payload[i]) {
            throw new Error('[service-socketio] invalid trigger payload property type')
        }
    })

    // specify a room id or socket id to target
    if (options.to) {
        serverSocket.to(options.to).emit(name, payload)
        return
    }

    serverSocket.emit(name, payload)
}

const init = async ({ server }, ctx) => {
    serverSocket = io(server)

    await ctx.createHook.serie(hooks.SOCKET_SETUP, {
        addListener: (name, handler) => listeners.push({ name, handler }),
        addTrigger: (name, payload) => { triggers[name] = { name, payload } },
    })

    serverSocket.on('connection', async (clientSocket) => {
        clientSocket.on('disconnect', async () => {
            await ctx.createHook.serie(hooks.SOCKET_DISCONNECT, {
                emit,
                id: clientSocket.id,
                request: clientSocket.handshake.request,
            })
        })

        // add listeners
        await Promise.all(listeners.map(item => { // eslint-disable-line
            if (!item.name || typeof item.name !== 'string') {
                throw new Error('[service-socketio] listener invalid [name]')
            }

            if (!item.handler || typeof item.handler !== 'function') {
                throw new Error('[service-socketio] listener invalid [handler]')
            }

            clientSocket.on(item.name, async (payload) => {
                try {
                    await ctx.createHook.serie(hooks.SOCKET_LISTENER_VALIDATE, {
                        emit,
                        id: clientSocket.id,
                        request: clientSocket.handshake.request,
                    })
                } catch (err) {
                    ctx.logger.verbose(err.message)
                    return
                }

                item.handler(payload || {}, {
                    emit,
                    id: clientSocket.id,
                    request: clientSocket.handshake.request,
                })
            })
        }))
    })
}

export default ({ registerHook, registerAction }) => {
    registerHook(hooks)

    const defaults = {
        trace: __dirname,
        name: hooks.SERVICE_NAME,
    }

    registerAction({
        ...defaults,
        hook: '$EXPRESS_HACKS_BEFORE',
        handler: (args, ctx) => init(args, ctx),
    })

    registerAction({
        ...defaults,
        hook: '$EXPRESS_MIDDLEWARE',
        handler: async ({ registerMiddleware }, ctx) => {
            registerMiddleware(async (req, res, next) => {
                serverSocket.use((socket, next) => {
                    socket.handshake.request = req
                    next()
                })

                await ctx.createHook.serie(hooks.SOCKET_MIDDLEWARE, {
                    registerMiddleware: (cb) => serverSocket.use(cb),
                })

                next()
            })
        },
    })
}
