// const fs = require('fs');
// const path = require('path');
// const pathToCountriesDB = path.resolve(__dirname, '../database/petsDB.json');
const dbConnection = require('../knex/knex')


async function readAllPets () {
  try {
    console.log ('Reading allpets');
    const petsList = await dbConnection.from('pet');
    console.log (petsList);
    return petsList;
    
    
  } catch (err) {
    console.log(err);
  }
}

async function notAdoptedPets () {
  try {
    const petsList = await dbConnection.from('pet').where({ adoptionStatus: "false" });
    console.log (petsList);
    return petsList;   
  } catch (err) {
    console.log(err);
  }
}

async function notFostedPets () {
  try {
    const petsList = await dbConnection.from('pet')
    .where({ adoptionStatus: "false" })
    .whereNotIn('id', dbConnection.from('foster').select('p_id'));
    console.log ('not fosted', petsList);
    return petsList;   
  } catch (err) {
    console.log(err);
  }
}




async function readOnePet (petId) {
  try {
    const petOne = await dbConnection.from('pet').where({id:petId}).first()
    return petOne
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {  
    const [id] = await dbConnection.from('pet').insert(newPet)
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  try {

    const deleted = await dbConnection.from('pet').where({id:petId}).del()
    return deleted
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPets, addPetModel, deletePetModel, readOnePet, notAdoptedPets, notFostedPets };