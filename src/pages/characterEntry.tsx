import React, { useState } from 'react'
import Link from 'next/link'

type CharacterEntryProps = {
	site: string;
	complete: string;
	togglable: any;
	major: string;
	name: string;
	codename: string;
	player: string;
	posts: number;
	profile: number;
	team: string;
	family: string;
	cellNumber: string;
}

const CharacterEntry: React.FC<CharacterEntryProps> = ({site, complete, togglable, major, name, codename, player, posts, profile, team, family, cellNumber}) => {
	const postsTotal = isNaN(posts) ? 0 : posts
	const remainingPosts = major === 'Yes' ? 3 - postsTotal : 2 - postsTotal
	const siteUrl = 'https://' + site.toLowerCase() + '.jcink.net'
	const profileLink = siteUrl + '/index.php?showuser=' + profile
	const postsLink = siteUrl + '/index.php?act=Search&CODE=getalluser&mid=' + profile
	const [postChange, setPostChange] = useState(postsTotal)
	const [displayedPostsRemaining, setDisplayedPostsRemaining] = useState(remainingPosts)
	const [status, setStatus] = useState(complete)
	const [isSending, setIsSending] = useState(false)

	const updatePosts = async (change:number) => {
		if (isSending) return

		setIsSending(true)
		
		const numberBounds = (value: number) => {
			return value <= 0 
				? 0
				: (value >= 3 && major === 'Yes')
					? 3
					: (value >= 2 && major === 'No')
						? 2
						: value
		}
		const total = numberBounds((Number(postChange) + change))
		const totalRemaining = numberBounds((Number(displayedPostsRemaining) - change))
		const values = total
		const range = cellNumber
		const valueInputOption = 'RAW'
		const updateData = { values, range, valueInputOption }

		await fetch("/api/updateSender", {
			method: "POST",
			body: JSON.stringify(updateData)
		}).then((response) => response.json())

		setPostChange(total)
		setDisplayedPostsRemaining(totalRemaining)
		totalRemaining <= 0 
			? setStatus('complete')
			: totalRemaining > 1 
				? setStatus('incomplete')
				: setStatus('partial')
		setIsSending(false)
	}

	return (
		<div className={`characterEntry ${status} ${site}`} style={ status === 'complete' ? togglable : undefined }>
			<h1 className={ major === 'Yes' ? 'majorCharacter' : 'regularCharacter' }><Link href={profileLink} target="_blank">{name}</Link></h1>
			<h2>{codename}</h2>
			<h3><Link href={`/team/${team}`}>{team}</Link></h3>
			<h3><Link href={`/team/${family}`}>{family}</Link></h3>
			<h3><Link href={`/player/${player}`}>{player}</Link></h3>
			<h3><Link href={postsLink} target="_blank">{displayedPostsRemaining} posts remaining</Link></h3>
			<div className={isSending ? 'disabled' : undefined}>
				<div className="addPost updatePosts" onClick={() => updatePosts(1)}>
					+
				</div>
			</div>
			<div className={isSending ? 'disabled' : undefined}>
				<div className="minusPost updatePosts" onClick={() => updatePosts(-1)}>
					-
				</div>
			</div>
		</div>
	)
}

export default CharacterEntry