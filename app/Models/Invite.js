"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Invite extends Model {
  // Relacionamentos de tabelas
  use() {
    return this.belongsTo("App/Models/User");
  }

  team() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Invite;
