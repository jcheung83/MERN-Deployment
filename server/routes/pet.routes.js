const express = require('express');

const {
    handleCreatePet,
    getAllPets,
    getPetById,
    deletePetById,
    updatePetById
} = require('../controllers/pet.controller');

const router = express.Router()

router.get('/', getAllPets);
router.post('/new', handleCreatePet);
router.get('/:id', getPetById);
router.delete('/delete/:id', deletePetById);
router.put('/edit/:id', updatePetById);

module.exports = { petRouter: router }