exports.up = function (knex) {
    return knex.schema.createTable('adopted', (table) => {
        table.increments('id').primary();
        table.string('u_id').notNull();
        table.string('p_id').notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('adopted');
};