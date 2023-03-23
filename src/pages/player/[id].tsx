import { useRouter } from 'next/router'
import { google } from 'googleapis';
import Link from 'next/link';
import React, { useState } from 'react'
import CharacterEntry from '../characterEntry';

export async function getServerSideProps({ query }: { query: any }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A2:Q400',
  });

  const activityObject = response?.data?.values;

  return {
    props: {
      activityObject,
    },
  };
}

const activityResult = (characterObject: any) => {
	if (characterObject.major == 'No') {
		if (characterObject.posts > 1) return 'complete'
	}
	if (characterObject.major === 'Yes') {
		if (characterObject.posts > 2) return 'complete'
	}
	if (characterObject.posts > 0) return 'partial'
	
	return 'incomplete'
}

export default function ActivityObject({ activityObject }: { activityObject: any }) {
	const router = useRouter()
	const { push } = useRouter()
	const { id } = router.query
	const [togglable, setTogglable] = useState({
		display: 'flex'
	})
	const [searchPlayer, setSearchPlayer] = useState()
	const [searchTeam, setSearchTeam] = useState()

	let activityObjectResults: any[] = [{'Wicked Deeds': []}, {'Mojo Unplugged': []}]
	activityObject.forEach((activityObject:any, index: number) => {
		const characterObject = {
			cellNumber: `Sheet1!F` + (index+2),
			name: activityObject[2],
			codename: activityObject[3],
			player: activityObject[1],
			major: activityObject[4],
			posts: activityObject[5],
			profile: activityObject[6],
			team: activityObject[7],
			family: activityObject[8],
			complete: ''
		}

		characterObject.complete = activityResult(characterObject)

		const target = activityObject[0].startsWith('Mojo') ? activityObjectResults[1]['Mojo Unplugged'] : activityObjectResults[0]['Wicked Deeds']

		const player = characterObject?.player?.toString()?.toLowerCase()
		const playerId: any = { id }.id?.toString()?.toLowerCase()
		if(player === playerId) target?.push(characterObject)
	})	

	const toggleCompleted = () => {
		if (togglable.display === 'flex') setTogglable({ display: 'none' })
		else setTogglable({ display: 'flex' })
	}

	const handleChange = (event: any, subject: string) => {
		subject === 'player' 
		? setSearchPlayer(event.target.value) 
		: setSearchTeam(event.target.value)
	}

	const handleKeyDown = (event: any, subject: any) => {
		if(event.key === 'Enter') {
			subject === 'player'
			? push(`/player/${searchPlayer}`)
			: push(`/team/${searchTeam}`)
		}
	}

  return (
	<>
		<div className="header">
			<button className="toggleButton" onClick={() => toggleCompleted()}>Toggle Completed</button>
			<div className="headerCenter">
				<div className="playerHeader"><Link href="/">{id}</Link></div>
			</div>
			<div className="links">
				<Link href="/">All</Link>
				<Link href="/mu">Mojo Unplugged</Link>
				<Link href="/wd">Wicked Deeds</Link>
				<input placeholder="Enter player"  onChange={(value) => handleChange(value, 'player')} onKeyDown={(value) => handleKeyDown(value, 'player')}/>
				<input placeholder="Enter affiliation" onChange={(value) => handleChange(value, 'team')} onKeyDown={(value) => handleKeyDown(value, 'team')}/>
			</div>
		</div>
		<div className="activityPage">
			{activityObjectResults[1]['Mojo Unplugged'].map((mojoer: any) => {
				return <CharacterEntry
					site={`mojoUnplugged`}
					complete={mojoer.complete}
					togglable={togglable}
					major={mojoer.major}
					name={mojoer.name}
					codename={mojoer.codename}
					team={mojoer.team}
					family={mojoer.family}
					profile={mojoer.profile}
					player={mojoer.player}
					posts={mojoer.posts}
					cellNumber={mojoer.cellNumber}
				/>
			})}
			{activityObjectResults[0]['Wicked Deeds'].map((deeder: any) => {
				return <CharacterEntry
					site={`wickedDeeds`}
					complete={deeder.complete}
					togglable={togglable}
					major={deeder.major}
					name={deeder.name}
					codename={deeder.codename}
					team={deeder.team}
					family={deeder.family}
					profile={deeder.profile}
					player={deeder.player}
					posts={deeder.posts}
					cellNumber={deeder.cellNumber}
				/>
	})}
		</div>
	</>
  );
}