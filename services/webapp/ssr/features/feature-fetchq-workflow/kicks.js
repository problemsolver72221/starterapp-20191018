
// import * as fetchq from 'src/services/service-fetchq'
// import { getSetting } from 'src/features/feature-pg-settings'

// export const findOrphanDrive = (driveId) =>
//     fetchq.append({
//         queue: 'workflow',
//         payload: {
//             query: 'findOrphanDrive',
//             variables: { driveId },
//         },
//     })

// export const countTotalPoints = (accountId, diff) =>
//     fetchq.append({
//         queue: 'workflow',
//         payload: {
//             query: 'countTotalPoints',
//             variables: { accountId, diff },
//         },
//     })

// export const driverPurger = (accountId) =>
//     fetchq.upsert({
//         queue: 'workflow',
//         settings: {
//             subject: `drivepurger:${accountId}`,
//             delay: [ getSetting('server.drives.purgerInterval', 10), 'seconds' ],
//             payload: {
//                 query: 'driverPurger',
//                 variables: { accountId },
//             },
//         },
//     })

// export const calcPeriodReward = (accountId) =>
//     fetchq.push({
//         queue: 'workflow',
//         settings: {
//             subject: `calcperiodreward:${accountId}`,
//             payload: {
//                 query: 'calcPeriodReward',
//                 variables: { accountId },
//             },
//         },
//     })

// // kick to send latest account data to client
// export const socketAccountData = (accountId) =>
//     fetchq.push({
//         queue: 'workflow',
//         settings: {
//             subject: `socketaccountdata:${accountId}`,
//             payload: {
//                 query: 'socketAccountData',
//                 variables: { accountId },
//             },
//         },
//     })
