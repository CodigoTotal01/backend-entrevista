const {Schema, model} = require('mongoose')

const ReviewSchema = Schema({
    comentario:{
        type: String,
    },

    calificacion:{
        type: String,
    },
});

ReviewSchema.method('toJSON', function (){
    const { __v, ...object} = this.toObject();
    return object
});

module.exports = model("Review", ReviewSchema);