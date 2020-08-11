import Knex from 'knex'

export async function up(knex: Knex) {

    return knex.schema.createTable('favorites', table => {

        table.increments('id').primary()
        table.integer('user_id').nullable().references('id').inTable('users')
        table.integer('proffy_id').nullable().references('id').inTable('users')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('favorites')
}