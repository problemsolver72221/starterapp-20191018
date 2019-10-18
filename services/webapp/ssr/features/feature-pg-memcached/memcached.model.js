
import Sequelize from 'sequelize'

export const name = 'Memcached'

const fields = {
    key: {
        type: Sequelize.STRING(100), // eslint-disable-line
        primaryKey: true,
    },
    value: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
    version: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 1,
    },
    meta: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
}

const options = {
    tableName: 'memcached',
    freezeTableName: true,
    underscored: true,
}

export const set = (conn, Model) => async (key, value, meta = {}) => {
    const q = [
        `INSERT INTO memcached`,
        `( key, value, meta, created_at, updated_at )`,
        `VALUES`,
        `( :key, :value, :meta, NOW(), NOW())`,
        'ON CONFLICT ( key ) DO UPDATE SET',
        `version = memcached.version + 1, `,
        `value = excluded.value,`,
        `meta = excluded.meta,`,
        'updated_at = NOW()',
        'RETURNING version',
    ].join(' ')

    const res = await conn.query(q, {
        replacements: {
            key,
            value: JSON.stringify(value),
            meta: JSON.stringify(meta),
        },
    })

    return res[0][0].version
}

export const get = (conn, Model) => (key) =>
    Model.findAll({
        where: { key },
        raw: true,
    })

export const remove = (conn, Model) => (key) =>
    Model.destroy({ where: { key } })

export const init = (conn) => {
    const Model = conn.define(name, fields, options)
    
    Model.set = set(conn, Model)
    Model.get = get(conn, Model)
    Model.remove = remove(conn, Model)

    return Model.sync()
}
