const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile').development;

const db = knex(knexConfig);

const server = express();

server.use(express.json());

// GET for retrieving a project by its id that returns an object with project and actions
server.get('/api/projects/:id', async (req, res) => {
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
server.post('/api/projects', async (req, res) => {
	const newProject = req.body;
	try {
		const project = await db('project').insert(newProject);
		res.status(201).json(project);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// POST for adding actions.
server.post('/api/actions', async (req, res) => {
	const newAction = req.body;
	try {
		const action = await db('action').insert(newAction);
		res.status(200).json(action);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// Stretch
// GET Projects
server.get('/api/projects', (req, res) => {
	return db('project')
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// GET Actions
server.get('/api/actions', (req, res) => {
	return db('action')
		.then((acts) => {
			res.status(200).json(acts);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT Project
server.put('/api/projects/:id', async (req, res) => {
	try {
		const count = await db('project').where({ id: req.params.id }).update(req.body);
		if (count > 0) {
			const role = await db('project').where({ id: req.params.id }).first();
			res.status(200).json(role);
		} else {
			res.status(404).json({ message: 'Records not found' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong.' });
	}
});

// DELETE Project
server.delete('/api/projects/:id', async (req, res) => {
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

const port = process.env.PORT || 4444;
server.listen(port, () => console.log(`\n === Running on ${port} === \n`));
