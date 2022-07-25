import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'PostsController.index')
    Route.post('/', 'PostsController.store')
    Route.get('/:id', 'PostsController.postsById')
    Route.delete('/:id', 'PostsController.destroy')
  }).prefix('/posts')
}).prefix('/api')
