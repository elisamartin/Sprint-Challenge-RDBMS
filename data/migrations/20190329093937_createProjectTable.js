exports.up = function(knex, Promise) {
	return knex.schema.createTable('project', (table) => {
		table.increments();

		table.string('name', 128).notNullable();

		table.string('description', 250).notNullable();

		table.boolean('completed_tag');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('project');
};
