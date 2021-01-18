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

module.exports.filtraTipoAno = (t, ano) => {
    return Casamento
        .find({ type: t, year: { $gt: ano } })
        .exec()
}

module.exports.listaAutores = () => {
    return Casamento
        .aggregate([{ $unwind: "$authors" }, { $group: { _id: "$authors" } }, { $sort: { _id: 1 } }])
        .exec()
}

module.exports.listaAutoresCasamento = a => {
    return Casamento
        .aggregate([{ $unwind: "$authors" }, { $match: { authors: a } }])
        .exec()
}
