import { google } from 'googleapis';

const updateSender = async (req: any, res: any) => {
	if (req.method === 'POST') {
		try {
			const parsedBody = JSON.parse(req.body)
			const { values, range, valueInputOption } = parsedBody
			const spreadsheetId = process.env.SHEET_ID
			const requestBody = { values: [[values]] }
			const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
			const sheets = google.sheets({ version: 'v4', auth });

			await sheets.spreadsheets.values.update({
				spreadsheetId,
				range,
				valueInputOption,
				requestBody,
			}, (err:any) => {
				if (err) {
					res.status(502).json({ message: 'Something went fucky' })
				} else {
					res.status(200).json({ message: 'Updated successfully' })
				}
			})

			
		} catch {
			res.status(500).json({ message: 'Oops'})
		}
	}
	else {
		console.log('Why')
	}
}

export default updateSender