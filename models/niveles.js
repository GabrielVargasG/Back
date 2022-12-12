const { Schema, model } = require('mongoose');

const nivelSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    completo: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valor: {
        type: Number,
        default: 0,
        required: true
    },
    grado: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
    },
});

nivelSchema.methods.toJSON = function() {
    const { __v, completado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Nivel', nivelSchema );
