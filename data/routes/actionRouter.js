const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile').development;

const db = knex(knexConfig);

// POST for adding actions.
router.post('/', async (req, res) => {
	const newAction = req.body;
	try {
		const action = await db('action').insert(newAction);
		res.status(200).json(action);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// GET Actions
router.get('/', (req, res) => {
	return db('action')
		.then((acts) => {
			res.status(200).json(acts);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT Action
router.put('/:id', async (req, res) => {
	try {
		const count = await db('action').where({ id: req.params.id }).update(req.body);
		if (count > 0) {
			const action = await db('action').where({ id: req.params.id }).first();
			res.status(200).json(action);
		} else {
			res.status(404).json({ message: 'Records not found' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// DELETE Action
router.delete('/:id', async (req, res) => {
	try {
		const count = await db('action').where({ id: req.params.id }).del();
		if (count > 0) {
			res.status(204).json('Deleted');
		} else {
			res.status(404).json({ message: 'Records not found' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

module.exports = router;
