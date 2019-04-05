'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

// Rotas para Session(Login)
Route.post('session', 'SessionController.store').validator(['Session'])

// Rotas para Teams
Route.group(() => {
  Route.resource('teams', 'TeamController')
    .apiOnly()
    .validator(new Map([[['teams.store', 'teams.update'], ['Team']]]))
}).middleware('auth')

// Rotas para convites
Route.group(() => {
  Route.post('invites', 'InviteController.store')
}).middleware(['auth', 'team'])
