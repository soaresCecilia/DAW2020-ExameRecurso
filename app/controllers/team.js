// Controlador para o modelo Team

var Team = require('../models/team')

// Devolve a lista de Teams
/*
_id, team, pitch1, pitch2, techPitch, 
businessReport, techReport, e nmembers (número de membros da equipe);
*/
module.exports.listar = () => {
    return Team
        .find({}, {_id: 1, team: 1, pitch1: 1, pitch2: 1, techPitch: 1, businessReport: 1, 
            techReport: 1, membros: {$size: "$members"}})
        .sort()
        .exec()
}

// Devolve a lista de Tarefas
module.exports.listar2 = () => {
    return Team
        .find()
        .sort()
        .exec()
}


module.exports.consultar = id => {
    return Team
        .findOne({_id: id})
        .exec()
}

module.exports.consultarMembro = (id, idMember)=> {
    return Team
        .findOne({_id: id}, {members: {id: idMember}}, {members: 1})
        .exec()
}


module.exports.inserir = t => {
    var novo = new Team(t)
    return novo.save()
}

module.exports.inserir2 = (id, membro) => {
    return Team.updateOne(
        { _id: id }, 
        { $push: 
            { members: {id: membro.id, name: membro.name, courses: membro.courses} }
    });
}

module.exports.remover = function(id){
    return Team.deleteOne({_id: id})
}

module.exports.remover2 = function(id, idMember){
    return Team.deleteOne({_id: id}, {members:{id: idMember}})
}

module.exports.alterar = function(t){
    return Team.findByIdAndUpdate({_id: t._id}, t, {new: true})
}
