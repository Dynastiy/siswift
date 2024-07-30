import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async getOrders(type) {
    try {
      let res = await $request.get(`/orders/${type}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async viewOrderRecord(params) {
    try {
      let res = await $request.get(`/order/${params}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async allEscrow() {
    try {
      let res = await $request.get(`get-escrow`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async rejectEscrow(id) {
    try {
      let res = await $request.post(`escrow-reject/${id}`, )
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
    //   return error
      throw error
    }
  },

  async acceptEscrow(id) {
    try {
      let res = await $request.post(`escrow-accept/${id}`, )
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
    //   return error
      throw error
    }
  },

  async completeEscrow(id) {
    try {
      let res = await $request.post(`escrow-complete/${id}`, )
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
    //   return error
      throw error
    }
  },

  async getSellerOrders(type) {
    try {
      let res = await $request.get(`/orders/${type}/seller`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async checkOut(formdata) {
    try {
      let res = await $request.post(`/checkout`, formdata)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async createReview(payload) {
    try {
      let res = await $request.post(`/create-review`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  // Accept or Reject OFfer 
  async modifyOffer(payload, action) {
    try {
      let res = await $request.post(`/offer/${action}`, payload)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },
}




