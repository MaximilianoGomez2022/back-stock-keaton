import *as SesionServices from '../../services/sesion.services.js'

function findall(req, res){

    SesionServices.traerSesiones()
    .then(function(sesiones){
        res.status(200).json(sesiones)
    })
}

function crearSesion(req, res){
    const sesion = {
        hora : req.body.hora,
    }

    SesionServices.guardarSesion(sesion)
    .then(function(nuevaSesion){
        res.status(201).json(nuevaSesion)
    })
}

function editById(req, res){
    const id = req.params.id

    const sesion = {}

    if(req.body.hora) {
        sesion.hora = req.body.hora
    }
    
    SesionServices.editarSesion(id, sesion)
    .then(function(sesion){
        if (sesion) {
            res.status(200).json({messagge : "Sesión editada con éxito."})
        }   else {
            res.status(404).json({messagge : "Sesión no encontrada"})
        } 
    })
}

export {
    crearSesion,
    findall,
    editById
}