import *as GenerosServices from '../../services/generos.services.js'

function findall(req, res){
    GenerosServices.trearGeneros()
    .then(function(generos){
        res.status(200).json(generos)
    })
}

function findById(req, res){
    const id = req.params.id
    GenerosServices.traerPorId(id)
    .then(function(genero){
        res.status(200).json(genero)
    })
}

function crearGenero(req, res){
    const genero = {
        name : req.body.name
    }

    GenerosServices.guardarGeneros(genero)
    .then(function(nuevogenero){
        res.status(201).json(nuevogenero)
    })
}

function editById(req, res){
    const id = req.params.id

    const genero = {
        name : req.body.name
    }

    GenerosServices.editarGenero(id, genero)
    .then(function(genero){
        if (genero) {
            res.status(200).json({messagge : "Genero editado con éxito."})
        }   else {
            res.status(404).json({messagge : "Genero no encontrado."})
        } 
    })
}

function replaceById(req, res){
    const id = req.params.id

    const genero = {
        name : req.body.name
    }

    GenerosServices.reemplazarGenero(id, genero)
    .then(function(genero){
        if (genero) {
            res.status(200).json({messagge : "Genero reemplazada con éxito."})
        }   else {
            res.status(404).json({messagge : "Genero no encontrada."})
        } 
    })
}

function deleteById(req, res){
    const id = req.params.id
    GenerosServices.eliminarGenero(id)
    .then(function(tecnologia){
        if (tecnologia) {
            res.status(200).json({messagge : "Genero eliminado con éxito."})
        }   else {
            res.status(404).json({messagge : "Genero no encontrado."})
        } 
    })
}

export {
    findall,
    findById,
    crearGenero,
    editById,
    replaceById,
    deleteById
}