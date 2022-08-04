const Melody = require('./melody.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const melodies = await Melody.find().populate("compositions");
        return res.json({
            status: 200,
            message: 'Recovered all melodies',
            data: { melodies }
        });
    } catch (error) {
        return next(setError(500, 'Failed all melodies'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const melody = await Melody.findById(id).populate("compositions");
        if (!melody) return next(setError(404, 'Melody not found'))
        return res.json({
            status: 200,
            message: 'Recovered melody by id',
            data: { melody }
        });
    } catch (error) {
        return next(setError(500, 'Failed melody by id'))
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const melody = await Melody.find({name:name});
        if (!melody) return next(setError(404, 'Melody not found'));
        return res.json({
            status: 200,
            message: 'Recovered melody by name',
            data: { melody }
        });
    } catch (error) {
        return next(setError(500, 'Failed melody by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const MelodyToSave = new Melody(req.body)
        const melodyInDb = await MelodyToSave.save()
        return res.json({
            status: 201,
            message: 'Created new melody',
            data: { melodyInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created melody'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const melody = new Melody(req.body);
        melody._id = id;
        const updatedMelody = await Melody.findByIdAndUpdate(id, course)
        if (!updatedMelody) return next(setError(404, 'Melody not found'))
        return res.json({
            status: 201,
            message: 'Updated melody by id',
            data: { updatedMelody }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated melody by id'));
    }
}

const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedMelody = await Melody.findByIdAndDelete(id)
        if (!deletedMelody) return next(setError(404, 'Melody not found'))
        return res.json({
            status: 200,
            message: 'Deleted melody by id',
            data: { deletedMelody }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted melody by id'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteElement,
    getByName
}