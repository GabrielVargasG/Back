const { response } = require('express');
const { Nivel } = require('../models');



const obtenerNiveles = async(req, res = response ) => {
    const { usuario, ...body } = req.body;
    // const { limite = 5, desde = 0 } = req.query;
    const query = { usuario: req.usuario._id };
    // const query = { grado: "1" };

    const [ total, niveles ] = await Promise.all([
        Nivel.countDocuments(query),
        Nivel.find(query)
            .populate('usuario', 'nombre')
            // .skip( Number( desde ) )
            // .limit(Number( limite ))
    ]);

    res.json({
        total,
        niveles
    });
}

const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Nivel.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( producto );

}

const crearNivel = async(req, res = response ) => {

    const { usuario, ...body } = req.body;

    // const nivelDB = await Nivel.findOne({ nombre: body.nombre.toUpperCase() });

    
    // if ( nivelDB ) {
    //     return res.status(400).json({
    //         msg: `El nivel ${ productoDB.nombre }, ya existe`
    //     });
    // }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const nivel = new Nivel( data );

    // Guardar DB
    const nuevoNivel = await nivel.save();
    await nuevoNivel
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .execPopulate();

    res.status(201).json( nuevoNivel );

}

const actualizarNivel = async( req, res = response ) => {

    const { id } = req.params;
    const { usuario, ...data } = req.body;

    // if( data.nombre ) {
    //     data.nombre  = data.nombre.toUpperCase();
    // }

    data.usuario = req.usuario._id;

    const nivel = await Nivel.findByIdAndUpdate(id, data, { new: true });

    await nivel
        .populate('usuario', 'nombre')
        .execPopulate();
    res.json( nivel );

}

const borrarProducto = async(req, res = response ) => {

    const { id } = req.params;
    const productoBorrado = await Nivel.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}




module.exports = {
    crearNivel,
    obtenerNiveles,
    obtenerProducto,
    actualizarNivel,
    borrarProducto
}