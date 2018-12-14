const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    name : String,
    visible : Boolean,
    items : [{type : Schema.Types.ObjectId , ref : 'Item'}]
});
module.exports = mongoose.model('List' , listSchema);