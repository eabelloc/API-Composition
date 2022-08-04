const ChordRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteElement,
    getByName } = require('./chord.controller');

ChordRoutes.get('/getAll', getAll)
ChordRoutes.get('/:id', getById)
ChordRoutes.get('/name/:name', getByName)
ChordRoutes.post('/create', create)
ChordRoutes.patch('/update/:id', update)
ChordRoutes.delete('/delete/:id', deleteElement)

module.exports = ChordRoutes