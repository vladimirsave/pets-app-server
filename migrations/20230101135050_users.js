exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.string('email').notNull();
        table.string('password').notNull();
        table.string('repassword').notNull();
        table.string('isAdmin').defaultTo(false);
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};