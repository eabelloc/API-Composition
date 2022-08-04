const Chord = require('./chord.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const chords = await Chord.find().populate("compositions");
        return res.json({
            status: 200,
            message: 'Recovered all chords',
            data: { chords }
        });
    } catch (error) {
        return next(setError(500, 'Failed all chords'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const chord = await Chord.findById(id).populate("compositions");
        if (!chord) return next(setError(404, 'Chord not found'))
        return res.json({
            status: 200,
            message: 'Recovered chord by id',
            data: { chord }
        });
    } catch (error) {
        return next(setError(500, 'Failed chord by id'))
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const chord = await Chord.find({name:name});
        if (!chord) return next(setError(404, 'Chord not found'));
        return res.json({
            status: 200,
            message: 'Recovered chord by name',
            data: { chord }
        });
    } catch (error) {
        return next(setError(500, 'Failed chord by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const ChordToSave = new Chord(req.body)
        const chordInDb = await ChordToSave.save()
        return res.json({
            status: 201,
            message: 'Created new chord',
            data: { chordInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created chord'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const chord = new Chord(req.body);
        chord._id = id;
        const updatedChord = await Chord.findByIdAndUpdate(id, course)
        if (!updatedChord) return next(setError(404, 'Chord not found'))
        return res.json({
            status: 201,
            message: 'Updated chord by id',
            data: { updatedChord }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated chord by id'));
    }
}

const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedChord = await Chord.findByIdAndDelete(id)
        if (!deletedChord) return next(setError(404, 'Chord not found'))
        return res.json({
            status: 200,
            message: 'Deleted chord by id',
            data: { deletedChord }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted chord by id'));
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