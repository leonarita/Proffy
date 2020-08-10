import Knex from 'knex'

export async function up (knex: Knex) {

    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('surname').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('avatar').notNullable().defaultTo('')
        table.string('whatsapp').notNullable().defaultTo('')
        table.string('bio').notNullable().defaultTo('')
    })
}

export async function down (knex: Knex) {

    return knex.schema.dropTable('users')
}

