import axios from 'axios'
import cheerio from 'cheerio'
import { updateDB } from './helpers'
import * as fs from 'fs'

async function getHTML(url) {
	const { data: html } = await axios.get(url)
	return html
}

async function getMovieInfo(html) {}

async function getShowtimes(html) {
	const $ = cheerio.load(html)
	const movies = []

	$('.results, .resultsRed').each(function(i, elem) {
		const rawData = $(elem)
			.text()
			.replace(/\n/g, '')
			.replace(/\t/g, '')

		const cleanData = rawData.split('  ').filter((nonNull) => nonNull !== '')

		const cleanTimes = cleanData

		const title = cleanTimes.splice(0, 1)
		const runningTime = cleanTimes.splice(-1, 1)
		const rating = cleanTimes.splice(-1, 1)

		const movie = {
			title: title[0],
			runningTime: runningTime[0],
			rating: rating[0],
			showtimes: cleanTimes
		}

		movies.push(movie)
	})

	movies.shift()

	const comingSoon = movies.splice(movies.findIndex((movie) => movie.showtimes.length < 2))

	comingSoon.shift()

	// console.log(movies)
	// console.log(comingSoon)
	return {
		movies,
		comingSoon
	}
}

async function getDates(html) {
	const $ = cheerio.load(html)
	let dates = ''

	$('.style21 strong font').each(function(i, elem) {
		const data = $(elem)
			.text()
			.trim()
		dates = data
	})

	// console.log(dates)
	return dates
}

async function runCron() {
	console.log('hacking the mainframe')

	const showtimesHTML = await getHTML(
		'http://ellensburgmovies.com/gmc_html/gmc_html_showtimes.html'
	)

	const [dates, { movies, comingSoon }] = await Promise.all([
		getDates(showtimesHTML),
		getShowtimes(showtimesHTML)
	])

	updateDB('dates', dates)
	updateDB('movies', movies)
	updateDB('comingSoon', comingSoon)

	console.log('DB update successful!')
}

export { getHTML, getMovieInfo, getShowtimes, getDates, runCron }
