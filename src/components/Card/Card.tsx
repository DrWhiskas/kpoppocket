import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css';
import attackData from '../../data/kpop.json';

interface CardProps {
	type: string;
	title: string;
	name: string;
	group: string;
	img: string;
	hp: string;
	attacks: {
		category: string;
		type: string;
		name: string;
		power: string | number;
		description: string;
	}[];
	logo: string;
}

function randomCard() {
	const bg = attackData.bg;
	const randomIndex = Math.floor(Math.random() * bg.length);
	const randomMemberIndex = Math.floor(
		Math.random() * bg[randomIndex].members.length
	);
	const card = bg[randomIndex].members[randomMemberIndex];

	// Choisir aléatoirement entre "standard" et "ex"
	const categories = ['standard', 'ex'];
	const chosenCategory =
		categories[Math.floor(Math.random() * categories.length)];

	// Filtrer les attaques et HP correspondant à la catégorie choisie
	const filteredAttacks = card.attack.filter(
		(a) => a.category === chosenCategory
	);
	const filteredHp = card.hp.find((h) => h.category === chosenCategory);

	return {
		type: card.type,
		title: card.name,
		name: card.name,
		group: bg[randomIndex].name,
		img: card.img[chosenCategory as keyof typeof card.img],
		hp: filteredHp ? filteredHp.number : 'N/A', // Si pas trouvé, mettre "N/A"
		attacks: filteredAttacks.length > 0 ? filteredAttacks : [], // Si pas trouvé, mettre un tableau vide
		logo: bg[randomIndex].logo,
	};
}
export default function Card() {
	const [card, setCard] = useState<CardProps | null>(null);

	useEffect(() => {
		const newCard = randomCard();
		setCard(newCard);

		// Enregistrer la carte dans la base de données
		axios
			.post('http://localhost:5000/cards', newCard)
			.then((response) => {
				console.log('Card saved:', response.data);
			})
			.catch((error) => {
				console.error('There was an error saving the card!', error);
			});
	}, []);

	if (!card) return null;

	const cardClass = card.type === 'GX' ? 'card card-gx' : 'card card-standard';

	return (
		<article className={cardClass} style={{ position: 'relative', zIndex: 0 }}>
			{/* Image de fond derrière la carte */}
			<img
				className="card__background"
				src="/images/model_vmax.png"
				alt="Background"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 2, // Place l'image derrière le contenu
				}}
			/>
			<img className="card__img" src={card.img} alt={card.name} />
			{/* Header */}
			<header className="card__header">
				<span className="card__header__name">{card.name}</span>
				<img src={card.logo} alt="" />
			</header>
			{/* Contenu de la carte */}
		</article>
	);
}