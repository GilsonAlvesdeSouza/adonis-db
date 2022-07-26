/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.group(() => {
    Route.resource('posts', 'PostsController').apiOnly()
    Route.delete('posts/delete/:id', 'PostsController.delete').as('posts.delete')
  }).namespace('App/Controllers/Http/Posts')

  Route.group(() => {
    Route.get('/', 'TrashPostsController.index')
    Route.get('/restore-all', 'TrashPostsController.restoreAll')
    Route.get('/remove-all', 'TrashPostsController.removeAll')
    Route.get('/:id', 'TrashPostsController.restoreById')
  }).prefix('/trash-posts/').namespace('App/Controllers/Http/Posts')
}).prefix('/api')
