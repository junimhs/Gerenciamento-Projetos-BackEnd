'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      username: 'Luis Henrique',
      email: 'junimhs10@gmail.com',
      password: 'junior'
    })

    // Criando permissao
    const createInvite = await Permission.create({
      slug: 'invites_create',
      name: 'Convidar Membros'
    })
    const createProject = await Permission.create({
      slug: 'projects_create',
      name: 'Criar projetos'
    })

    // Criando Roles
    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrador'
    })
    const moderador = await Role.create({
      slug: 'moderator',
      name: 'Moderador'
    })

    await Role.create({
      slug: 'visitor',
      name: 'Visitante'
    })

    // Referenciando as permission nas roles
    await admin.permissions().attach([createInvite.id, createProject.id])
    await moderador.permissions().attach([createProject.id])

    const team = await user.teams().create({
      name: 'ModernWeb',
      user_id: user.id
    })

    const teamJoin = await user
      .teamJoin()
      .where('team_id', team.id)
      .first()

    await teamJoin.roles().attach([admin.id])
  }
}

module.exports = DatabaseSeeder
