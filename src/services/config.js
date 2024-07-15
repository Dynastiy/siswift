import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  async subscribeToNewsletter(formData) {
    try {
      let res = await $request.post(`newsletter/subscribe/c5d37ef1-db76-449d-8379-ae91237c1296`, formData)
      // catchAxiosSuccess("Subscribed to Newsletter Successfully")
      toast.success("Subscribed to Newsletter Successfully", {
        timeout: 4000,
    });
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

    async createStore(formData) {
        try {
          let res = await $request.post(`shops`, formData)
          catchAxiosSuccess("Store Created Succesfully")
          return res.data
        } catch (error) {
          catchAxiosError("Store Not created")
          throw error
        }
      },

      async getCategory(slug) {
        try {
          let res = await $request.get(`show-category/${slug}`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async getStores({name, type, page}) {
        try {
          let res = await $request.get(`/all-shops?name=${name}&type=${type}&page=${page}`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async showShop(slug) {
        try {
          let res = await $request.get(`show-shop/${slug}`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async findShop(id) {
        try {
          let res = await $request.get(`find-shop/${id}`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async getSettings() {
        try {
          let res = await $request.get(`general-setting`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async getTags() {
        try {
          let res = await $request.get(`all-tags`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

}