exports.up = function(knex, Promise) {
	return knex.schema.createTable('action', (table) => {
		table.increments();

		table.string('description', 250).notNullable();

		table.text('notes');

		table.boolean('completed_tag');

		table
			.integer('project_id')
			.unsigned()
			.references('id')
			.inTable('project')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('action');
};
