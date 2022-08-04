const Composition = require('./composition.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const compositions = await Composition.find().populate("chords rhythms melodies");
        return res.json({
            status: 200,
            message: 'Recovered all compositions',
            data: { compositions }
        });
    } catch (error) {
        return next(setError(500, 'Failed all compositions'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const composition = await Composition.findById(id).populate("chords").populate("rhythms").populate("melodies");
        if (!composition) return next(setError(404, 'Composition not found'))
        return res.json({
            status: 200,
            message: 'Recovered composition by id',
            data: { composition }
        });
    } catch (error) {
        return next(setError(500, 'Failed composition by id'))
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const composition = await Composition.find({name:name});
        if (!composition) return next(setError(404, 'Composition not found'));
        return res.json({
            status: 200,
            message: 'Recovered composition by name',
            data: { composition }
        });
    } catch (error) {
        return next(setError(500, 'Failed composition by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const CompositionToSave = new Composition(req.body)
        const compositionInDb = await CompositionToSave.save()
        return res.json({
            status: 201,
            message: 'Created new composition',
            data: { compositionInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created composition'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const composition = new Composition(req.body);
        composition._id = id;
        const updatedComposition = await Composition.findByIdAndUpdate(id, course)
        if (!updatedComposition) return next(setError(404, 'Composition not found'))
        return res.json({
            status: 201,
            message: 'Updated composition by id',
            data: { updatedComposition }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated composition by id'));
    }
}

const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedComposition = await Composition.findByIdAndDelete(id)
        if (!deletedComposition) return next(setError(404, 'Composition not found'))
        return res.json({
            status: 200,
            message: 'Deleted composition by id',
            data: { deletedComposition }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted composition by id'));
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