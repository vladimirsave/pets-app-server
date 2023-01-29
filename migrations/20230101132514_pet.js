exports.up = function (knex) {
    return knex.schema.createTable('pet', (table) => {
      table.increments('id').primary();
      table.string('type').notNull();
      table.string('name').notNull();
      table.string('adoptionStatus').defaultTo(false);
      table.string('picture').notNull();
      table.string('height').notNull();
      table.string('weight').notNull();
      table.string('color').notNull();
      table.string('bio').notNull();
      table.string('hypoallergnic').notNull();
      table.string('dietary').notNull();
      table.string('breed').notNull();
      table.string('userId').notNull();
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('pet');
  };
  