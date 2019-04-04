'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTeam extends Model {
  // Relacionamentos de tabelas
  use () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UserTeam
