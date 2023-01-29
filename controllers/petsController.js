const {  readAllPets, addPetModel, deletePetModel, readOnePet, notAdoptedPets, notFostedPets } = require('../models/petsModels');

const deletePet = async(req, res) => {
  const { petId } = req.params;
  const deleted = await deletePetModel (petId);
  if (deleted) {
    res.send({ ok: true, deletedId: petId });
  }
};

const addPet = async (req, res) => {
  try {
    const id = await addPetModel(req.body);
        
    const newPet = {
      ...req.body,
      id: id,
    };
    res.send(newPet);
    console.log('14 ID',id);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllPets = async (req, res) => {
  try {
    const allPets = await readAllPets();
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getOnePet = async (req, res) => {
  try {
    const { petId } = req.params;
    console.log('39 kontroler',petId);
    
    const onePet = await readOnePet(petId);
    res.send(onePet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getNotAdoptedPets = async (req, res) => {
  try {
    const allPets = await notAdoptedPets();
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getNotFostedPets = async (req, res) => {
  try {
    const allPets = await notFostedPets();
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { deletePet, addPet, getAllPets, getOnePet, getNotAdoptedPets, getNotFostedPets};
