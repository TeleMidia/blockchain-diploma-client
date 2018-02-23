var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const MongooseTrigger = require('mongoose-trigger')
const zipmanage = require('./zipmanage');

var TurmaSchema = new mongoose.Schema({
    curso: String,
    filename: String,
    status: Number
    //listaAlunos: Aluno[]
})

//TRIGGER
const UserEvents = MongooseTrigger(TurmaSchema, {
    events: {
      create: {
        select: 'curso skills',
        populate: {
          path: 'skills',
          select: 'curso'
        }
      },
      update: {
        populate: 'skills'
      },
      remove: false
    },
    partials: [
      {
        eventName: 'custom_event',
        triggers: 'curso',
        select: 'curso status',
        //populate: 'something' //if it is a reference... 
      }
    ],
    debug: false
  });
   
  UserEvents.on('create', data => zipmanage.create(data));//console.log('[create] says:', data));
  UserEvents.on('update', data => zipmanage.manage(data));//console.log('[update] says:', data));
  UserEvents.on('partial:skills', data => console.log('[partial:skills] says:', data));
  UserEvents.on('partial:x', data => console.log('[partial:x] says:', data));
  UserEvents.on('remove', data => console.log('[remove] says:', data));
//TRIGGER

TurmaSchema.plugin(mongoosePaginate)
const Turma = mongoose.model('Turma', TurmaSchema)

module.exports = Turma;