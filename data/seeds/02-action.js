exports.seed = function(knex, Promise) {
	return knex('action').del().then(function() {
		return knex('action').insert([
			{
				id: 1,
				description: 'Action description 1',
				notes: 'Action notes 1',
				completed_tag: false,
				project_id: 1
			},
			{
				id: 2,
				description: 'Action description 2',
				notes: 'Action notes 2',
				completed_tag: false,
				project_id: 1
			},
			{ id: 3, description: 'Action description 3', notes: 'Action notes 3', completed_tag: false, project_id: 1 }
		]);
	});
};
