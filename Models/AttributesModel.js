const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const attributeSchema = new Schema({
    Name : {
        type: String,
        required : true
    },
    Type : {
        type: String,
        required : true
    },
    ItemTypes : [{
        type: mongoose.Schema.Types.ObjectId, ref:'ItemTypes',
        required : true
    }],
    Code : {
        type: String,
        required : true
    },
    isRequired : {
        type: Boolean,
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
    }
})

module.exports = mongoose.model('Attributes',attributeSchema);