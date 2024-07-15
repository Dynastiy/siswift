import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {

  async cartList() {
    try {
      let res = await $request.get(`/carts`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("Cart items not retrieved")
      throw error
    }
  },

  async list() {
    try {
      let res = await $request.get(`/seller-products`)
      // catchAxiosSuccess()
      return res.data
    } catch (error) {
      catchAxiosError("Seller Products not found")
      throw error
    }
  },

  async messages() {
    try {
      let res = await $request.get(`/messages`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError('Messages not retrieved')
      throw error
    }
  },

  async getMessages(ID) {
    try {
      let res = await $request.get(`/messages/${ID}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("user not gotten")
      throw error
    }
  },


  async addToCart(payload) {
    try {
      let res = await $request.post(`/add-to-cart`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateCart({id, payload}) {
    try {
      let res = await $request.post(`/update-cart-item/${id}`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeFromCart(id) {
    try {
      let res = await $request.post(`/remove-cart-item/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async addToWishlist(payload) {
    try {
      let res = await $request.post(`/add-to-wishlist`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeFromWishlist(id) {
    try {
      let res = await $request.post(`/remove-from-wishlist/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getOrders(status, page) {
    try {
      let res = await $request.get(`/user-orders?status=${status}&page=${page}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async getOrderByID(id) {
    try {
      let res = await $request.get(`/find-order/${id}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
    }
  },

  

  async addAddress(payload) {
    try {
      let res = await $request.post(`/add-address`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeAddress(id) {
    try {
      let res = await $request.post(`/remove-address/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async placeOrder(payload) {
    try {
      let res = await $request.post(`/make-order`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeOrder(id) {
    try {
      let res = await $request.post(`/delete-user-order/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async createRating(payload) {
    try {
      let res = await $request.post(`/create-rating`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
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
}




