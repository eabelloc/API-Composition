const MelodyRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteElement,
    getByName } = require('./melody.controller');

MelodyRoutes.get('/getAll', getAll)
MelodyRoutes.get('/:id', getById)
MelodyRoutes.get('/name/:name', getByName)
MelodyRoutes.post('/create', create)
MelodyRoutes.patch('/update/:id', update)
MelodyRoutes.delete('/delete/:id', deleteElement)

module.exports = MelodyRoutes