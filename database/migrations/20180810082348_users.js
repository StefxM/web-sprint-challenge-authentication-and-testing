exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');

    tbl.string('username')
      .notNullable()
      .unique();
    tbl.string('password').notNullable();
  }) ;

  // await knex.schema.createTable('jokes', (tbl) => {
  //   tbl.increments('id');
  //   tbl.string('jokes')
  // });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
