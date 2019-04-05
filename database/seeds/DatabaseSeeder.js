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

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      username: 'Luis Henrique',
      email: 'junimhs10@gmail.com',
      password: 'junior'
    })

    await user.teams().create({
      name: 'ModernWeb',
      user_id: user.id
    })

    // await User.create({
    //   username: 'Paulo Henrique',
    //   email: 'paulo@gmail.com',
    //   password: 'paulo'
    // })
  }
}

module.exports = DatabaseSeeder
