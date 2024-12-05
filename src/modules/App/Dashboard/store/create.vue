<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-3 gap-4">
    <div class="lg:page-bg md:page-bg h-fit w-full">
      <main-photo @uploadMainImage="uploadMainImage" :uploadLabel="'Store Photo'" />
    </div>
    <!-- <div>
      {{ shop }}
    </div> -->
    <div class="lg:page-bg md:page-bg lg:col-span-2 md:col-span-2">
      <div>
        <vForm
          class="flex flex-col"
          @submit="createShop"
          :validation-schema="currentSchema"
          keep-values
          v-slot="{ meta }"
        >
          <div class="flex flex-col gap-2">
            <div>
              <vField name="name" v-model="form.name" v-slot="{ field }" class="input">
                <label for="">Shop Name</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="name"
                    class="w-full"
                    id="name"
                    placeholder="Enter shop name"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Phone Number</label>
              <vField
                type="tel"
                v-model="form.phone"
                name="phone"
                class="input"
                placeholder="08012345678"
              >
              </vField>
              <ErrorMessage name="phone" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Store Description</label>
              <vField
                name="description"
                v-model="form.meta_description"
                as="textarea"
                class="input"
                cols="30"
                rows="4"
              >
              </vField>
              <ErrorMessage name="description" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Address</label>
              <vField name="address" v-model="form.address" type="text" class="input"> </vField>
              <ErrorMessage name="address" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>

          <div class="mt-6">
            <button
              :disabled="isLoading || !meta.valid"
              :class="[
                isLoading
                  ? 'bg-gray1 text-gray'
                  : meta.valid
                    ? 'brand-primary bg-primary'
                    : 'bg-gray-400 text-black1'
              ]"
              class="brand-btn w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </vForm>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
import MainPhoto from '@/components/product/mainPhoto.vue'
import { useToast } from 'vue-toastification'
export default {
  components: { MainPhoto },
  data() {
    return {
      isLoading: false,
      currentSchema: yup.object({
        name: yup.string().required(),
        address: yup.string().required(),
        phone: yup
          .string()
          .required()
          .matches(/^[0-9]+$/, 'Must be numeric'),
        description: yup.string().required()
      }),
      mainImage: null,
      form: {
        name: null,
        phone: null,
        address: null,
        meta_description: null
      }
    }
  },

  methods: {
    createShop(values) {
      const toast = useToast()
      if (!this.mainImage || Object.keys(this.mainImage).length == 0) {
        // alert('No store Image found')
        toast.error(`Add Store Image`, {
          timeout: 4000
        })
        return
      }
      const formdata = new FormData()
      let type = this.user.seller_id ? `/shops/${this.shop.id}` : '/shops'
      if (this.user.seller_id) {
        formdata.append('_method', 'put')
      }
      formdata.append('name', values.name)
      formdata.append('phone', values.phone)
      formdata.append('address', values.address)
      formdata.append('meta_description', values.description)
      formdata.append('image', this.mainImage)
      this.$config.createStore(formdata, type).then((res) => {
        this.$router.push('/app/my-store')
        return res
      })
    },

    getUser() {
      this.$auth.getProfile().then((res) => {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    },

    getShop() {
      this.$user.showShop().then((res) => {
        console.log(res)
        if (res.length > 0) {
          this.shop = res[0]
          if (this.$route.name === 'app-store-edit') {
            this.form = {
              name: this.shop.name,
              phone: this.shop.phone,
              address: this.shop.address,
              meta_description: this.shop.meta_description
            }
          }
        } else {
          this.shop = {}
        }
      })
    },

    uploadMainImage(e) {
      this.mainImage = e
    }
  },

  beforeMount() {
    this.getUser()
    this.getShop()
  },

  // watch: {
  //   $route: {
  //     handler(val) {
  //       console.log(val)
  //       if (val.name == 'app-store-edit') {
  //         console.log(this.shop);
  //         if (this.shop && this.shop.status) {
  //           this.form = {
  //             name: this.shop.name,
  //             phone: this.shop.phone,
  //             address: this.shop.address,
  //             meta_description: this.shop.meta_description
  //           }
  //         }
  //       }
  //     },
  //     immediate: true
  //   }
  // },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
