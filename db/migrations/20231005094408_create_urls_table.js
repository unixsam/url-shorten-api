/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('urls', function(table) {
        table.increments('id').primary();
        table.string('original_url').notNullable();
        table.string('short_url').notNullable().unique();
        table.integer('click_count').defaultTo(0); // Add click_count column with a default value of 0
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('urls');
};

