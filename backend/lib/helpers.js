import db from './db'

// eslint-disable-next-line import/prefer-default-export
export function updateDB(dbEntry, freshData) {
	const refreshedAt = db.get(`${dbEntry}[0].refreshed`).value()

	db.get(`${dbEntry}`)
		.remove({ refreshed: refreshedAt })
		.value()

	db.get(`${dbEntry}`)
		.push({ freshData, refreshed: Date.now() })
		.write()
}
