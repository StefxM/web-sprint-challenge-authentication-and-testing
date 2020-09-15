const db = require('../database/dbConfig')

const find = () => {
    return db('users').select("id", "username", "password")
}

const findByID = async (id) => {
    return await db('users').where({ id }).first();
  };

  const findByUsername = async (username) => {
    return await db('users').where({ username }).first();
  };

 const findBy = (filter) => {
    return db("users")
      .select("id", "username", "password")
      .where(filter)
  }

  const addUser = async (user) => {
    return await db('users')
      .insert(user, 'id')
      .then(([id]) => findByID(id));
  };

  const getJokes = async () => {
    return await db('jokes')
  }

module.exports = {
    find,
    findByID,
    findByUsername,
    findBy,
    addUser,
    getJokes,
}