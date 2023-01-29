const express = require('express');
const { readAllPets, addPetModel, deletePetModel } = require('../models/petsModels');
const { v4: uuidv4 } = require('uuid');
const PetsController = require('../controllers/petsController');
const {auth} = require('../middleware/usersMiddleware')

const router = express.Router();

 

///Add Validation Middleware to POST/PUT routes
router.post('/', auth, PetsController.addPet);
router.get('/', PetsController.getAllPets);
router.get('/pet/:petId', PetsController.getOnePet);
router.delete('/:petId', auth, PetsController.deletePet);
router.get('/notadopted', PetsController.getNotAdoptedPets);
router.get('/notfosted', PetsController.getNotFostedPets);


module.exports = router;

