import *as ProductsServices from '../../services/products.services.js'

function findall(req, res){

    const filter = {}

    if(req.query.destacada) {

        if(req.query.destacada === 'true') {
            filter.destacada = true
        }

        if(req.query.destacada === 'false') {
            filter.destacada = false
        }
    }

    if(req.query.category) {
        filter.category = req.query.category
    }

    ProductsServices.traerTrabajos(filter)
    .then(function(trabajos){
        res.status(200).json(trabajos)
    })
}


function crearPelicula(req, res){
    const pelicula = {
        nombre : req.body.nombre,
        cantidad : req.body.cantidad,
        porciones: req.body.porciones,
        ultimaDescarga: req.body.ultimaDescarga
    }

    ProductsServices.guardarProduct(pelicula)
    .then(function(nuevaPelicula){
        res.status(201).json(nuevaPelicula)
    })
}

function findById(req, res){

    const id = req.params.id

    ProductsServices.traerPorId(id)
    .then(function(proyecto){
        if (proyecto) {
            res.status(200).json(proyecto)
        }   else {
            res.status(404).json({messagge : "Trabajo no encontrado"})
        }       
    })
}

function editById(req, res){
    const id = req.params.id

    const product = {}

    if(req.body.nombre) {
        product.nombre = req.body.nombre
    }

    if(req.body.cantidad) {
        product.cantidad = req.body.cantidad
    }

    if(req.body.porciones) {
        product.porciones = req.body.porciones
    }

    if(req.body.ultimaDescarga) {
        product.ultimaDescarga = req.body.ultimaDescarga
    }
    
    ProductsServices.editarPelicula(id, product)
    .then(function(product){
        if (product) {
            res.status(200).json({messagge : "Producto editada con éxito."})
        }   else {
            res.status(404).json({messagge : "Producto no encontrada"})
        } 
    })
}

function deleteById(req, res){
    const id = req.params.id

    ProductsServices.eliminarProducto(id)
    .then(function(product){
        if (product) {
            res.status(200).json({messagge : "Producto eliminado con éxito."})
        }   else {
            res.status(404).json({messagge : "Producto no encontrado"})
        }       
    })
}

function replaceById(req, res){
    const id = req.params.id

    const pelicula = {
        nombre : req.body.nombre,
        genero : req.body.genero,
        anio : req.body.anio,
        destacada: req.body.destacada  
    }

    ProductsServices.reemplazarPelicula(id, pelicula)
    .then(function(pelicula){
        if (pelicula) {
            res.status(200).json({messagge : "Pelicula reemplazada con éxito."})
        }   else {
            res.status(404).json({messagge : "Pelicula no encontrada"})
        }       
    })
}

function guardarHistorial(req, res){
    const historial = {
        historial: req.body.historial,
        fecha: new Date()
    }

    ProductsServices.guardarHistorial(historial)
    .then(function(nuevoHistorial){
        res.status(201).json(nuevoHistorial)
    })
}


export {
    findall,
    crearPelicula,
    findById,
    editById,
    replaceById,
    deleteById,
    guardarHistorial
}