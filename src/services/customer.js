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

  async wishList() {
    try {
      let res = await $request.get(`/wishlist`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("Cart items not retrieved")
      throw error
    }
  },

  async list() {
    try {
      let res = await $request.get(`/all-products`)
      // catchAxiosSuccess()
      return res.data
    } catch (error) {
      catchAxiosError("Listings not found")
      throw error
    }
  },

  async sellerProducts() {
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

  async sendMessage(formData) {
    try {
      let res = await $request.post(`/messages`, formData)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError('Messages not retrieved')
      return error
      
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

  async getNotifications(){
    try {
      let res = await $request.get(`/notifications`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("user not gotten")
      throw error
    }
  },

  async readNotification(params){
    try {
      let res = await $request.get(`/notifications`, params)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async getTransactions(){
    try {
      let res = await $request.get(`/transactions`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("user not gotten")
      throw error
    }
  },

  async getStoreAnalysis(){
    try {
      let res = await $request.get(`/shop-stats`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError("Store Stats")
      throw error
    }
  },

  async addToCart(payload) {
    try {
      let res = await $request.post(`/carts`, payload)
      catchAxiosSuccess('Added to cart succesfully')
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
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
      let res = await $request.delete(`/carts/${id}`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async fundWallet(payload) {
    try {
      let res = await $request.post(`/pay`, payload)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async addToWishlist(payload) {
    try {
      let res = await $request.post(`/wishlist`, payload)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

  async removeFromWishlist(id) {
    try {
      let res = await $request.delete(`/wishlist/${id}`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      throw error
    }
  },

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


  async showShop() {
    try {
      let res = await $request.get(`/shops`, )
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




