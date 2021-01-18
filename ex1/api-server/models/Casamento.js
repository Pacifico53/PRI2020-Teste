var mongoose = require('mongoose')

casamentosSchema = mongoose.Schema({
    _id: String,
    date: String,
    title: String,
    href: String,
})

module.exports = mongoose.model('casamentos', casamentosSchema);
