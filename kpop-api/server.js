const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kpop', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const cardSchema = new mongoose.Schema({
	type: String,
	title: String,
	name: String,
	group: String,
	img: String,
	hp: String,
	attacks: [
		{
			category: String,
			type: String,
			name: String,
			power: String,
			description: String,
		},
	],
	logo: String,
});

const Card = mongoose.model('Card', cardSchema);

// Routes
app.post('/cards', async (req, res) => {
	const card = new Card(req.body);
	try {
		await card.save();
		res.status(201).send(card);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
