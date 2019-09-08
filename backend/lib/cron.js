import cron from 'node-cron'
import { runCron } from './scraper'

cron.schedule('0 21-23,0-12 * * THU-FRI', () => {
	console.log('Cron running. Fun fact, Unicron was played by Orson Welles.')
	runCron()
})

// * Constant scraping for use during dev
// cron.schedule('* * * * *', () => {
// 	console.log('Cron running. Fun fact, Unicron was played by Orson Welles.')
// 	runCron()
// })
