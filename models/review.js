const {Schema, model} = require('mongoose')

const ReviewsSchema = Schema({
    comentario:{
        type: String,
        require: true
    },

    calificacion:{
        type: Number,
        default: 0
    }
});

ReviewsSchema.method('toJSON', function (){
    const { __v, ...object} = this.toObject();
    return object
});

module.exports = model("Review", ReviewsSchema);