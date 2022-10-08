const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const itemValueSchema = new Schema({
    Item : {
        type: mongoose.Schema.Types.ObjectId, ref:'Items',
        required : true
    },
    Attribute : {
        type: mongoose.Schema.Types.ObjectId, ref:'Attributes',
        required : true
    },
    Value : {
        type: String,
        required : true
    },
    CreatedUser:{
        type: mongoose.Schema.Types.ObjectId , ref:'Users',
        required:true
    },
    UpdatedUser:{
        type: mongoose.Schema.Types.ObjectId , ref:'Users',
        required:true
    },
    CreatedOn : {
        type: Date,
        default: Date.now
    },
    UpdatedOn : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('ItemValues',itemValueSchema);