const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = Schema({
    list : {type : Schema.Types.ObjectId, ref : 'List'},
    description : String,
});

module.exports = mongoose.model('Item' , itemSchema);
