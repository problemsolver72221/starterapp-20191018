module.exports = [
    {
        desc: 'in-memory cache lifetime for settings',
        scope: [ 'server', 'client' ],
        feature: ['settings'],
        key: 'interval',
        payload: 60000, // 1min
    },
    {
        desc: 'interval to update active drive in pg drive_logs',
        scope: [ 'server'],
        feature: ['drives'],
        key: 'driveLogInterval',
        payload: 1000 * 60 * 4, // 4min
    },
    {
        desc: 'interval in seconds on when to purge a active driver from redis',
        scope: [ 'server'],
        feature: ['drives'],
        key: 'purgerInterval',
        payload: 10, // 10 seconds
    },
    {
        desc: 'range in kilometers of the bounding box',
        scope: [ 'server'],
        feature: ['turf'],
        key: 'bboxRange',
        payload: 5, // kilometers
    },
    {
        desc: 'default points multiplier per driven meter',
        scope: [ 'server'],
        feature: ['points'],
        key: 'defaultPerM',
        payload: 10 / 1000, // 10p/km or 0.01p/m
    },
    {
        desc: 'max points to collect when driving alone',
        scope: [ 'server'],
        feature: ['points'],
        key: 'maxPointsAlone',
        payload: 500,
    },
    {
        desc: 'fallback person information',
        scope: [ 'server'],
        feature: ['bisnode'],
        key: 'fallbackPerson',
        payload: JSON.stringify({
            fname: 'fname',
            lname: 'lname',
            city: 'Malmö',
            country: 'SE',
            line1: 'Anckargripsgatan',
            line2: '3',
            postno: '21119',
            state: 'skåne',
            ip: '100.100.100.100',
            phone: '0737684652',
            email: 'default@passenger.se',
        }),
    },
]
