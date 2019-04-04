'use strict'

class TeamController {
  async index ({ auth }) {
    const team = await auth.user.teams().fetch()

    return team
  }

  async store ({ request, response }) {}

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = TeamController