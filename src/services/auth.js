import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async login(formData) {
    try {
      let res = await $request.post(`login`, formData)
      console.log(res.data)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      console.log(error.data, 'from ')
      catchAxiosError(error.data)
      throw error
    }
  },

  async createAccount(formData) {
    try {
      let res = await $request.post(`register`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      // return error
      throw error
    }
  },

  async forgotPassword(formData) {
    try {
      let res = await $request.post(`/password/email`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      // return error
      throw error
    }
  },

  async resetPassword(payload, formData) {
    try {
      let res = await $request.post(`/password/reset`, formData, { params:  payload })
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      // return error
      throw error
    }
  },

  async verifyResetCode(formData, code) {
    try {
      let res = await $request.post(`/password/verify-code`, formData, {
        params: { code }
      })
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      // return error
      throw error
    }
  },

  async verifyEmail(formData) {
    try {
      let res = await $request.post(`/user/verify-email`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      // return error
      throw error
    }
  },

  async getProfile() {
    try {
      let res = await $request.get(`/profile`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async getVerificationCode() {
    try {
      let res = await $request.get(`/user/authorization`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      return error
      // throw error
    }
  },

  async changePassword(formData) {
    try {
      let res = await $request.post(`/user/change-password`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      //   return error
      throw error
    }
  },

  async updateProfile(formData, ID) {
    try {
      let res = await $request.post(`/profile/${ID}`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      //   return error
      throw error
    }
  },

  async uploadDocument(formData) {
    try {
      let res = await $request.post(`/kyc`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      //   return error
      throw error
    }
  },

  async getDocument() {
    try {
      let res = await $request.get(`/kyc`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error.data)
      //   return error
      throw error
    }
  }

  // sendVerificationCode(){

  // }
}
