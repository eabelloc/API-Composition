const Rhythm = require('./rhythm.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const rhythms = await Rhythm.find().populate("compositions");
        return res.json({
            status: 200,
            message: 'Recovered all rhythms',
            data: { rhythms }
        });
    } catch (error) {
        return next(setError(500, 'Failed all rhythms'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const rhythm = await Rhythm.findById(id).populate("compositions");
        if (!rhythm) return next(setError(404, 'Rhythm not found'))
        return res.json({
            status: 200,
            message: 'Recovered rhythm by id',
            data: { rhythm }
        });
    } catch (error) {
        return next(setError(500, 'Failed rhythm by id'))
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const rhythm = await Rhythm.find({name:name});
        if (!rhythm) return next(setError(404, 'Rhythm not found'));
        return res.json({
            status: 200,
            message: 'Recovered rhythm by name',
            data: { rhythm }
        });
    } catch (error) {
        return next(setError(500, 'Failed rhythm by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const RhythmToSave = new Rhythm(req.body)
        const rhythmInDb = await RhythmToSave.save()
        return res.json({
            status: 201,
            message: 'Created new rhythm',
            data: { rhythmInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created rhythm'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const rhythm = new Rhythm(req.body);
        rhythm._id = id;
        const updatedRhythm = await Rhythm.findByIdAndUpdate(id, course)
        if (!updatedRhythm) return next(setError(404, 'Rhythm not found'))
        return res.json({
            status: 201,
            message: 'Updated rhythm by id',
            data: { updatedRhythm }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated rhythm by id'));
    }
}

const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedRhythm = await Rhythm.findByIdAndDelete(id)
        if (!deletedRhythm) return next(setError(404, 'Rhythm not found'))
        return res.json({
            status: 200,
            message: 'Deleted rhythm by id',
            data: { deletedRhythm }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted rhythm by id'));
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