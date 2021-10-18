const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String
    }
    
})


const Token = mongoose.model('Tokens',tokenSchema);

module.exports = Token;
