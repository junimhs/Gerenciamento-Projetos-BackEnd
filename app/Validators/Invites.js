'use strict'

const Antl = use('Antl')

class Invites {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      invites: 'required|array',
      'invites.*': 'required|email'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Invites
