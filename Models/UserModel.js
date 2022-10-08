const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    Name : {
        type: String,
        required : true
    },
    LastName : {
        type: String,
        required : true
    },
    UserName : {
        type: String,
        required : true,
    },
    Email : {
        type: String,
        required : true
    },
    Password : {
        type: String,
        required : true
    },
    BirthDate : {
        type: Date,
    },
    Role : {
        type: String,
        required : true
    },
    Phone : {
        type: String,
    },
    Location : {
        type: String,
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

module.exports = mongoose.model('Users',userSchema);