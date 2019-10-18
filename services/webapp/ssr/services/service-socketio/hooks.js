import { SERVICE } from '@forrestjs/hooks'
export const SERVICE_NAME = `${SERVICE} service-socketio`

export const SOCKET_SETUP = `${SERVICE_NAME}/setup`
export const SOCKET_MIDDLEWARE = `${SERVICE_NAME}/middleware`

export const SOCKET_DISCONNECT = `${SERVICE_NAME}/disconnect`
export const SOCKET_LISTENER_VALIDATE = `${SERVICE_NAME}/listenerValidate`