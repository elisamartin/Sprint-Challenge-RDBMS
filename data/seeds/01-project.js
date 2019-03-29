exports.seed = function(knex, Promise) {
	return knex('project').del().then(function() {
		return knex('project').insert([
			{ id: 1, name: 'Project name 1', description: 'Project description 1', completed_tag: false }
		]);
	});
};
