const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile').development;

const db = knex(knexConfig);

// GET for retrieving a project by its id that returns an object with project and actions
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const project = await db('project').where('id', id).first();
		const actions = await db('action').where('project_id', id);
		const fullProject = {
			id: project.id,
			name: project.name,
			description: project.description,
			completed: project.completed_tag === 0 ? false : true,
			actions: actions.map((el) => {
				return {
					id: el.id,
					description: el.description,
					notes: el.notes,
					complete: el.completed_tag === 0 ? false : true
				};
			})
		};
		res.status(200).json(fullProject);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// POST for adding projects.
router.post('/', async (req, res) => {
	const newProject = req.body;
	try {
		const project = await db('project').insert(newProject);
		res.status(201).json(project);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// Stretch - Projects endpoints
// GET Projects
router.get('/', (req, res) => {
	return db('project')
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT Project
router.put('/:id', async (req, res) => {
	try {
		const count = await db('project').where({ id: req.params.id }).update(req.body);
		if (count > 0) {
			const project = await db('project').where({ id: req.params.id }).first();
			res.status(200).json(project);
		} else {
			res.status(404).json({ message: 'Records not found' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// DELETE Project
router.delete('/:id', async (req, res) => {
	try {
		const count = await db('project').where({ id: req.params.id }).del();
		if (count > 0) {
			res.status(204).json('Deleted!');
		} else {
			res.status(404).json({ message: 'Records not found' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

module.exports = router;
