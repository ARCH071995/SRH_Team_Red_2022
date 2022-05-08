const mongoose = require('mongoose'); //mongodb lib
const Schema = mongoose.Schema; //creates schema
const hobbySchema = new Schema({
    hobby_id: {
        type: Number                          //schema object
    },
    hobby:{
        type: String 
    }
}, { timestamps: true });
module.exports = mongoose.model('hobby', hobbySchema);  //exports


//  objects and db created

