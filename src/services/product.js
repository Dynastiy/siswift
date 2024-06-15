import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async getProductBySlug(slug) {
    try {
      let res = await $request.get(`show-product/${slug}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },


  async getProducts({url, type, page}) {
    try {
      let res = await $request.get(`${url}?page=${page}&type=${type}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async adultProducts({url, type, page}) {
    try {
      let res = await $request.get(`${url}?page=${page}&type=${type}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  // filte
}
