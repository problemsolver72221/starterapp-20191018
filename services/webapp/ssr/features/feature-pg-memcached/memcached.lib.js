
import * as pg from '@forrestjs/service-postgres'

export const set = async (key, value, meta = {}) =>
    pg.getModel('Memcached').set(String(key), value, meta)

// retrieve a value by key and optional minimum version
export const get = async (key) =>
    pg.getModel('Memcached').get(key)

export const remove = async (key) =>
    pg.getModel('Memcached').remove(key)
