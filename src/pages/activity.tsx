import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

// type ActivityObject = {
// 		site: string,
// 		name: string,
// 		character: string,
// 		codename: string,
// 		major: string,
// 		post1?: string,
// 		post2?: string,
// 		post3?: string,
// 		post4?: string,
// 		post5?: string,
// 		post6?: string,
// 		post7?: string,
// 		post8?: string,
// 		post9?: string,
// 		post10?: string,
// }

// export const getServerSideProps = async () => {

// 	const range = `Sheet1!A2:O100`
// 	const spreadsheetId = process.env.SHEET_ID
// 	const apiKey = process.env.API_KEY
// 	const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']

// 	//Auth
// 	const auth = new GoogleAuth({ scopes })
// 	auth.fromAPIKey(apiKey || '')
// 	const authClient = await auth.getClient()
	
// 	const sheets = google.sheets({ version: 'v4', auth: authClient })

// 	const response = await sheets.spreadsheets.values.get({
// 		spreadsheetId,
// 		range,
// 	})

// 	const characterActivityObject = response.data.values

// 	return { props: { characterActivityObject }}
// }

// const Activity = ({ props }: {props: any}) => {
// 	console.log(props)
// 	// const activityResult = (characterProps: ActivityObject) => {
// 	// 	if (characterProps.major == 'No') {
// 	// 		if (characterProps.post1 && characterProps.post2) return 'Complete'
// 	// 		else return 'Incomplete'
// 	// 	}
// 	// 	if (characterProps.major === 'Yes') {
// 	// 		if (characterProps.post1 && characterProps.post2 && characterProps.post3) return 'Complete'
// 	// 	}
		
// 	// 	return 'Error'
// 	// }

// 	return (
// 		<main>
// 		Hi
// 			{/* {props.map((character: ActivityObject) => (
// 				<div className={ character.site === 'Mojo Unplugged' ? 'mojoEntry' : 'wickedEntry' }>
// 					<h1 className={ character.major === 'Yes' ? 'majorCharacter' : 'regularCharacter' }>{character.character}</h1>
// 					<h2>{character.codename}</h2>
// 					<h3>{character.name}</h3>
// 					<div className={activityResult(character)}/>
// 				</div>
// 			))} */}
// 		</main>
// 	)
// }

// export default Activity