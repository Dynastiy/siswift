<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-3 gap-4">
    <div class="lg:page-bg md:page-bg h-fit w-full">
      <main-photo @uploadMainImage="uploadMainImage" uploadLabel="Store Photo" />
    </div>
    <div class="lg:page-bg md:page-bg lg:col-span-2 md:col-span-2">
      <div>
        {{user}}
      </div>
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
              <vField name="name" v-slot="{ field }" class="input">
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
              <vField type="tel" name="phone" class="input" placeholder="Enter Phone Number">
              </vField>
              <ErrorMessage name="phone" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Store Description</label>
              <vField name="description" as="textarea" class="input" cols="30" rows="4"> </vField>
              <ErrorMessage name="description" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Address</label>
              <vField name="address" type="text" class="input"> </vField>
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
      mainImage: null
    }
  },

  methods: {
    createShop(values) {
      const formdata = new FormData()
      let type = this.user.seller_id ? `/shops/${this.user.shop.id}` : '/shops'
      if(this.user.seller_id) {
        formdata.append('_method', 'put')
      } 
      formdata.append('name', values.name)
      formdata.append('phone', values.phone)
      formdata.append('address', values.address)
      formdata.append('description', values.description)
      formdata.append('image', this.mainImage)
      this.$config.createStore(formdata, type).then((res) => {
        this.$router.push('/app/my-store')
        return res
      })
    },

    uploadMainImage(e) {
      this.mainImage = e
    }
  },

  watch: {},

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
