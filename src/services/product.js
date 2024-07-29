import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'

export default {
  async getRecord(id) {
    try {
      let res = await $request.get(`products/${id}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError('product not found')
      throw error
    }
  },

  async list(params) {
    try {
      let res = await $request.get(`products`, { params })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError('products not found')
      throw error
    }
  },

  async create(formdata) {
    try {
      let res = await $request.post(`products`, formdata)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  }
}
