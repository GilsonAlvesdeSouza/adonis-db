/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.group(() => {
    Route.get('/', 'PostsController.index')
    Route.post('/', 'PostsController.store')
    Route.get('/:id', 'PostsController.postsById')
    Route.put('/:id', 'PostsController.update')
    Route.delete('/:id', 'PostsController.delete')
    Route.delete('/delete/:id', 'PostsController.destroy')
  }).prefix('/posts/').namespace('App/Controllers/Http/Posts')

  Route.group(() => {
    Route.get('/', 'TrashPostsController.index')
    Route.get('/restore-all', 'TrashPostsController.restoreAll')
    Route.get('/remove-all', 'TrashPostsController.removeAll')
    Route.get('/:id', 'TrashPostsController.restoreById')
  }).prefix('/trash-posts/').namespace('App/Controllers/Http/Posts')
}).prefix('/api')
