const RhythmRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteElement,
    getByName } = require('./rhythm.controller');

RhythmRoutes.get('/getAll', getAll)
RhythmRoutes.get('/:id', getById)
RhythmRoutes.get('/name/:name', getByName)
RhythmRoutes.post('/create', create)
RhythmRoutes.patch('/update/:id', update)
RhythmRoutes.delete('/delete/:id', deleteElement)

module.exports = RhythmRoutes