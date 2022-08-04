const CompositionRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteElement,
    getByName } = require('./composition.controller');

CompositionRoutes.get('/getAll', getAll)
CompositionRoutes.get('/:id', getById)
CompositionRoutes.get('/name/:name', getByName)
CompositionRoutes.post('/create', create)
CompositionRoutes.patch('/update/:id', update)
CompositionRoutes.delete('/delete/:id', deleteElement)

module.exports = CompositionRoutes