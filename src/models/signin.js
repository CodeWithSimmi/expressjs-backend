const mongoose = require('mongoose');
const {Schema}= mongoose

const signinschema = new mongoose.Schema({
    email :Schema.Types.String,
    password :Schema.Types.String

});

module.exports = mongoose.model('Signin' ,signinschema);