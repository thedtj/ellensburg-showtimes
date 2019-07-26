import db from './db'

export function updateDB(dbEntry, freshData) {
	const refreshedAt = db.get(`${entry}[0].refreshed`).value()

	console.log(dbEntry, freshData, refreshedAt)

	db.get(`${dbEntry}`)
		.remove({ refreshed: refreshedAt })
		.value()

	db.get(`${dbEntry}`)
		.push({ freshData, refreshed: Date.now() })
		.write()
}
