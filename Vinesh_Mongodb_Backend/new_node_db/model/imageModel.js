const mongoose = require('mongoose'); //mongodb lib
const Schema = mongoose.Schema;  //creates schema
const ImageSchema = new Schema({
    imageLink: {
        type: String       //schema object
    }
}, { timestamps: true });
module.exports = mongoose.model('images', ImageSchema);  //exports


