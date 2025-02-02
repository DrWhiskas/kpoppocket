import React, { useState } from 'react';
import Booster from '../../components/Booster/Booster';
import Card from '../../components/Card/Card';
import './home.css';

export default function Home() {
	return (
		<div className="home">
			<section className="home__container">
				<h1 className="home__container__title">K-POP Trading Card GAME</h1>
				<Booster />
			</section>
		</div>
	);
}
