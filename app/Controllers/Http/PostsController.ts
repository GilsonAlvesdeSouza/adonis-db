import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  protected async index({}: HttpContextContract) {
    const posts = await Post.all()
    return { posts }
  }

  protected async store({ request, response }: HttpContextContract) {
    const myDataRequest = request.only(['title', 'post'])
    try {
      const post = await Post.create(myDataRequest)
      return response.status(202).send(post)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  protected async postsById({ params, response }: HttpContextContract) {
    const { id } = params
    let post = await Post.findBy('id', id)
    if (post) {
      return response.status(200).send(post)
    }
    // tem essas 2 formas abaixo
    // return response.status(404).send({ error: 'post não encontrado' })
    return response.notFound({ error: 'post não encontrado!' })
  }

  protected async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    let postRemove = await Post.find(id)
    postRemove?.delete()
  }
}
