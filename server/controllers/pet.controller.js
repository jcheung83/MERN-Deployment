const { Pet } = require('../models/pet.model');

const handleCreatePet = async (req, res) => {
    try {
        let nameCheck = await Pet.exists({name: req.body.name});
        if (nameCheck){
            return res.status(400).json(err);
        }
        else{
            const newPet = await Pet.create(req.body);
            return res.json(newPet);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

const getAllPets = async (req, res) => {
    const pets = await Pet.find().sort({type: 'asc', name: 'asc'});
    return res.json(pets);
}

const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        return res.json(pet);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const deletePetById = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id)
        return res.json(deletedPet);
    } catch (err) {
        return res.status(400).json(error);
    }
}

const updatePetById = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
            // re-run our validaitons
            runValidators: true,
        })
        return res.json(updatedPet);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    handleCreatePet,
    getAllPets,
    getPetById,
    deletePetById,
    updatePetById
}