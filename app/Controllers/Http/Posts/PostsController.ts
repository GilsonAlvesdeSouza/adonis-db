import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  protected async index({ response }: HttpContextContract) {
    try {
      const posts = await (await Post.all()).reverse()
      return response.status(200).json(posts)
    } catch (error) {
      response.status(500).json(error)
    }
  }

  protected async store({ request, response }: HttpContextContract) {
    const myDataRequest = request.only(['title', 'post'])
    try {
      const post = await Post.create(myDataRequest)
      return response.status(201).send(post)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  protected async postsById({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const post = await Post.withTrashed().where('id', id).first()
      if (post) {
        if (post.trashed) {
          return response.forbidden({ msg: 'removed post!' })
        }
        return response.status(200).send(post)
      }
      return response.status(404).json({ msg: 'not found ' })
    } catch (error) {
      // tem essas 2 formas abaixo
      return response.status(500).json({ error })
      // return response.notFound({ error: 'post não encontrado!' })
    }
  }

  protected async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    try {
      let post = await Post.find(id)
      if (post) {
        const myData = request.only(['title', 'post'])
        post.merge(myData)
        post.save()
        return response.status(200).json(post)
      }
      return response.status(404).json({ msg: 'not found ' })
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  protected async delete({ params, response }: HttpContextContract) {
    try {
      const post = await Post.find(params.id)
      if (post) {
        await post.delete()
        return response.status(200).json(post)
      }
      return response.status(404).json({ msg: 'not found' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  protected async destroy({ response, params }: HttpContextContract) {
    try {
      const post = await Post.find(params.id)
      if (post) {
        await post.forceDelete()
        return response.status(200).json(post)
      }
      return response.status(404).json({ msg: 'not found' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}
