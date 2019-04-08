'use strict'

const User = use('App/Models/User')
const Invite = use('App/Models/Invite')

class UserController {
  async store ({ request, response, auth }) {
    const data = request.only(['username', 'email', 'password'])

    const teamQuery = Invite.query().where('email', data.email)

    const teams = await teamQuery.pluck('team_id')

    if (teams.length === 0) {
      // Cadastro normal sem convite
      // const UserValidate = await User.findBy('email', data.email)
      // if (UserValidate) {
      //   return response
      //     .status(401)
      //     .json({ message: 'E-mail já foi cadastrado !' })
      // }
      // const user = await User.create(data)
      // const token = auth.attempt(data.email, data.password)
      // return token
      return response
        .status(401)
        .json({ message: 'Você não foi convidado por nenhum time !' })
    } else {
      const user = await User.create(data)
      await user.teams().attach(teams)
      await teamQuery.delete()

      const token = auth.attempt(data.email, data.password)

      return token
    }
  }
}

module.exports = UserController
