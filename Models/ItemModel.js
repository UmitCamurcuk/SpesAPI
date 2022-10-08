const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const itemSchema = new Schema({
    Name : {
        type: String,
        required : true
    },
    Code : {
        type: String,
        required : true
    },
    ItemType : {
        type: mongoose.Schema.Types.ObjectId , ref : "ItemTypes",
        required : true
    },
    Family : {
        type: String,
        required : true
    },
    Attributes : [{
        type: mongoose.Schema.Types.ObjectId , ref: "Attributes",
        required : true
    }],
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

module.exports = mongoose.model('Items',itemSchema);