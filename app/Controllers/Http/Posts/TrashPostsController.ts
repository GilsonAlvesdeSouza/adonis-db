import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class TrashPostsController {
  public async index({ response }: HttpContextContract) {
    try {
      const posts = await Post.onlyTrashed().exec()
      return response.status(200).json(posts)
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  public async restoreAll({ response }: HttpContextContract) {
    try {
      await Post.query().onlyTrashed().restore()
      return response.status(200).json({ msg: 'success' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  public async removeAll({ response }: HttpContextContract) {
    try {
      await Post.query().onlyTrashed().delete()
      return response.status(200).json({ msg: 'success' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  public async restoreById({ params, response }: HttpContextContract) {
    try {
      const post = await Post.withTrashed().where('id', params.id).firstOrFail()
      await post.restore()
      return response.status(200).json(post)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}
