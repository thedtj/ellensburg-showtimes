import cron from 'node-cron'
import { runCron } from './scraper'

// * Production Cron Schedule
cron.schedule('0 21-23,0-12 * * THU-FRI', () => {
	console.log('Cron running. Fun fact, Unicron was played by Orson Welles.')
	runCron()
})

// * Dev Cron Schedule
// cron.schedule('* * * * *', () => {
// 	console.log('Cron running. Fun fact, Unicron was played by Orson Welles.')
// 	runCron()
// })
