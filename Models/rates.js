const mongoose = require('mongoose');

const RatesSchema = mongoose.Schema({
    "Project Name": String,
    "Name": String,
    "Rates": Number,
    "Description": String
})

module.exports = mongoose.model('Rates', RatesSchema);