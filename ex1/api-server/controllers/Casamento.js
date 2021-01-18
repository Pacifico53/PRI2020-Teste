var Casamento = require('../models/Casamento')

module.exports.listar = () => {
    return Casamento
        .find({}, { _id: 1, date: 1, title: 1 })
        .exec()
}

module.exports.consultar = id => {
    return Casamento
        .find({ _id: id })
        .exec()
}

module.exports.getWithNames = name => {
    const regex = new RegExp(name, 'i')
    return Casamento
        .find({ title: { $regex: regex } })
        .exec()
}


module.exports.getWithYear = (year) => {
    const regex = new RegExp(year, 'i')
    return Casamento
        .find({ date: { $regex: regex } })
        .exec()
}

module.exports.getNoivos = () => {
    return Casamento
        .find({ type: t })
        .exec()
}

