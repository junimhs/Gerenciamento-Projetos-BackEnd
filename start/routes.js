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

// Rotas para cadastrar com convite
Route.post('users', 'UserController.store').validator(['User'])

// Rotas para Teams
Route.group(() => {
  Route.resource('teams', 'TeamController')
    .apiOnly()
    .validator(new Map([[['teams.store', 'teams.update'], ['Team']]]))
  Route.get('roles', 'RoleController.index')
}).middleware('auth')

// Rotas para convites
Route.group(() => {
  Route.post('invites', 'InviteController.store')
    .validator(['Invites'])
    .middleware(['can:invites_create'])
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store', 'projects.update'], ['Project']]]))
    .middleware(
      new Map([
        [
          ['projects.store', 'projects.update', 'projects.destroy'],
          ['can:projects_create']
        ]
      ])
    )
  Route.get('member', 'MemberController.index')
  Route.put('member/:id', 'MemberController.update').middleware([
    'is:administrator'
  ])
  Route.get('permissions', 'PermissionController.show')
}).middleware(['auth', 'team'])
