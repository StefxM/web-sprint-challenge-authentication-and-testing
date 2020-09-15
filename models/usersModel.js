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

  const addUser = async (user) => {
    return await db('users')
      .insert(user, 'id')
      .then(([id]) => findByID(id));
  };



module.exports = {
    find,
    findByID,
    findByUsername,
    addUser,
}