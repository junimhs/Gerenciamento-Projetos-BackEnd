'use strict'

class Team {
  async handle ({ request, response, auth }, next) {
    const slug = request.header('TEAM')
    let team = null
    // Verificar se tem dados no header TEAM
    if (slug) {
      team = await auth.user
        .teams()
        .where('slug', slug)
        .first()
    }
    // Verificando se tem time
    if (!team) {
      return response.status(401).send()
    }
    auth.user.currentTeam = team.id
    request.team = team
    await next()
  }
}

module.exports = Team
