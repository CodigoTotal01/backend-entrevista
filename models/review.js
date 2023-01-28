const {Schema, model} = require('mongoose')

const ReviewSchema = Schema({
    comentario:{
        type: String,
    },

    calificacion:{
        type: Number,
        default: 0
    },
    usuario: {
        required: true,
        ref: 'Usuario',
        type: Schema.Types.ObjectId,
    }



});

ReviewSchema.method('toJSON', function (){
    const { __v, ...object} = this.toObject();
    return object
});

module.exports = model("Review", ReviewSchema);