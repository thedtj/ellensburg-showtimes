import express from 'express'
import db from './lib/db'
import { getHTML, getDates, getShowtimes, runCron } from './lib/scraper'
import './lib/cron'

const app = express()

app.get('/api/v1', async (req, res, next) => {

	const showtimesHTML = await getHTML(
		'http://ellensburgmovies.com/gmc_html/gmc_html_showtimes.html'
	)

	const [dates, { movies, comingSoon }] = await Promise.all([
		getDates(showtimesHTML),
		getShowtimes(showtimesHTML)
	])

	res.json({ dates, movies, comingSoon })
})

const port = process.eventNames.PORT || 5800

app.listen(port, () => console.log(`app running on port ${port}`))
