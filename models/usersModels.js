const dbConnection = require('../knex/knex')

async function readAllUsers () {
  try {
    console.log ('Reading all users');

    const usersList = await dbConnection.from('users');
    console.log(usersList);    
    return usersList;
  } catch (err) {
    console.log(err);
  }
}

const getUserByEmailModel = async (email) => {
  try {
    const user = await dbConnection.from('users').where({ email: email }).first();
    return user;
  } catch (err) {
    console.log('Here', err);
    
  }
};

const addUserModel = async (newUser) => {
  try {
    console.log('addUserModel');
    const [id] = await dbConnection.from('users').insert(newUser);
    return id;
  } catch (err) {
    console.log(err);
  }
};




module.exports = { getUserByEmailModel, addUserModel, readAllUsers };