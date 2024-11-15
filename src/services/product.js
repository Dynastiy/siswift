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

  async getProducts() {
    try {
      let res = await $request.get(`all-products`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError('products not found')
      throw error
    }
  },

  async listByLocation(params) {
    try {
      let res = await $request.post(`search`, params)
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
  },

  async createProductReview(formdata) {
    try {
      let res = await $request.post(`rate`, formdata)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async productAction(action, id) {
    try {
      let res = await $request.get(`/${action}/${id}`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async delete(id) {
    try {
      let res = await $request.delete(`/products/${id}`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async sponsorListing(payload) {
    try {
      let res = await $request.post(`/campaigns`, payload)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async getProductAnalysis(ID) {
    try {
      let res = await $request.get(`/stats/${ID}`)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  
}
