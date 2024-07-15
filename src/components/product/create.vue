<template>
  <div class="flex flex-col justify-between">
    <div>
      <vForm
        class="flex flex-col"
        @submit="nextStep"
        :validation-schema="currentSchema"
        keep-values
        v-slot="{ meta }"
      >
        <template v-if="currentStep === 0">
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
              <vField name="phone" v-slot="{ field }" class="input">
                <label for="">Phone Number</label>
                <div class="input-field">
                  <input
                    type="tel"
                    name="phone"
                    class="w-full"
                    id="name"
                    placeholder="Enter Phone Number"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="phone" class="text-xs text-error"></ErrorMessage>
            </div>

            <!-- <div>
              <vField name="description" v-slot="{ field }" class="input">
                <label for="">Store Description</label>
                <div class="input-field">
                  <textarea
                    name="description"
                    class="w-full bg-transparent py-2"
                    id="description"
                    placeholder="Enter Store Description"
                    v-bind="field"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </vField>
              <ErrorMessage name="description" class="text-xs text-error"></ErrorMessage>
            </div> -->

            <div>
              <vField name="address" v-slot="{ field }" class="input">
                <label for="">Address</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="address"
                    class="w-full"
                    id="name"
                    placeholder="Enter Address"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="address" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Store Photo</label>
              <vField name="profile_picture" type="file" class="input"> </vField>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="flex flex-col gap-2">
            <div>
              <vField name="product_name" v-slot="{ field }" class="input">
                <label for="">Product Name</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="product_name"
                    class="w-full"
                    id="name"
                    placeholder="Enter Product Name"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="product_name" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="model" v-slot="{ field }" class="input">
                <label for="">Product Model</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="model"
                    class="w-full"
                    id="name"
                    placeholder="Enter Product Model"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="model" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="location" v-slot="{ field }" class="input">
                <label for="">Location</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="location"
                    class="w-full"
                    id="name"
                    placeholder="Enter Location"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="location" class="text-xs text-error"></ErrorMessage>
            </div>

            <div class="w-full">
              <!-- <vField name="category_id" v-slot="{ field }" class="input"> -->
              <label for="">Product Categories</label>
              <!-- <div class="input-field">
                    <input
                      type="text"
                      name="category_id"
                      class="w-full"
                      id="name"
                      placeholder="Enter Product Brand"
                      v-bind="field"
                    /> -->
              <MultiSelect
                v-model="category_id"
                display="chip"
                :options="categories"
                optionLabel="name"
                class="input text-[13px] py-[4px]"
                placeholder="Select Categories"
                :maxSelectedLabels="3"
              />
              <!-- </div> -->
              <!-- </vField> -->
              <!-- <ErrorMessage name="category_id" class="text-xs text-error"></ErrorMessage> -->
            </div>

            <div class="flex gap-3">
              <div class="w-full">
                <vField name="product_price" v-slot="{ field }" class="input">
                  <label for="">Product Price</label>
                  <div class="input-field">
                    <input
                      type="tel"
                      name="product_price"
                      class="w-full"
                      id="name"
                      placeholder="Enter Product Price"
                      v-bind="field"
                    />
                  </div>
                </vField>
                <ErrorMessage name="product_price" class="text-xs text-error"></ErrorMessage>
              </div>

              <div class="w-full">
                <label for="">Product Brand</label>
                <vField name="brand_id" as="select" class="input">
                  <option selected disabled value="">--Select Brand--</option>
                  <option v-for="item in categories" :key="item?.id" :value="item?.id">
                    {{ item?.name }}
                  </option>
                </vField>
                <ErrorMessage name="brand_id" class="text-xs text-error"></ErrorMessage>
              </div>
            </div>
            <div>
              <vField name="product_description" v-slot="{ field }" class="input">
                <label for="">Description</label>
                <div class="input-field">
                  <textarea
                    name="product_description"
                    class="w-full bg-transparent py-2"
                    id="description"
                    placeholder="Enter Description"
                    v-bind="field"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </vField>
              <ErrorMessage name="product_description" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>
        </template>

        <div class="flex flex-col gap-4 mt-7">
          <button
            class="brand-btn w-full"
            v-if="currentStep !== 1"
            type="submit"
            :disabled="!meta.valid"
            :class="[meta.valid ? 'brand-primary bg-primary' : 'bg-gray1 text-black1']"
          >
            Next
          </button>
          <button
            :disabled="isLoading || !meta.valid"
            :class="[
              isLoading
                ? 'bg-gray1 text-gray'
                : meta.valid
                  ? 'brand-primary bg-primary'
                  : 'bg-gray1 text-black1'
            ]"
            class="brand-btn w-full"
            v-if="currentStep === 1"
            type="submit"
          >
            Done
          </button>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
export default {
  props: {
    mainImage: Object,
    productImages: Array
  },
  components: {},
  data() {
    return {
      typePassword: true,
      typePassword2: true,
      isLoading: false,
      validationErrors: {},
      currentStep: 0,
      schemas: [
        yup.object({
          name: yup.string().required(),
          address: yup.string().required(),
          phone: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric')
        }),
        yup.object({
          product_name: yup.string().required(),
          model: yup.string().required(),
          location: yup.string().required(),
          product_price: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric'),
          brand_id: yup.string(),
          product_description: yup.string().required()
        })
        // yup.object({
        //   address: yup.string().required(),
        //   postalCode: yup
        //     .string()
        //     .required()
        //     .matches(/^[0-9]+$/, 'Must be numeric')
        // }),
        // yup.object({
        //   terms: yup.bool().required().equals([true])
        // })
      ],
      category_id: [],
      categories: [],
      brands: [],
      product_image: null,
      photos: null
    }
  },

  methods: {
    async create(values) {
      const formdata = new FormData()
      formdata.append('name', values.product_name)
      formdata.append('brand_id', values.brand_id)
      formdata.append('base_price', values.product_price)
      this.category_id.forEach((elem) => {
        formdata.append('categories[]', elem.id)
      })
      this.photos.forEach((elem) => {
        formdata.append('photos[]', elem)
      })
      formdata.append('main_image', this.mainImage)
      formdata.append('location', values.location)
      formdata.append('description', values.product_description)
      formdata.append('model', values.model)
      this.$products.create(formdata).then((res) => {
        console.log(res)
        this.$router.push('/app/my-store')
        return
      })
    },

    nextStep(values) {
      if (this.currentStep === 1) {
        this.create(values)
        return
      }
      this.createShop(values)
    },

    prevStep() {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
      this.$emit('prevStep')
    },

    getSetting() {
      this.$config.getSettings().then((res) => {
        console.log('settings:', res)
        this.categories = res.categories
        this.brands = res.brands
      })
    },

    createShop(values) {
      const formdata = new FormData()
      formdata.append('name', values.name)
      formdata.append('phone', values.phone)
      formdata.append('address', values.address)
      formdata.append('image', values.profile_picture)
      this.$config.createStore(formdata).then((res) => {
        console.log(res)
        this.currentStep++
        this.$emit('nextStep')
        this.$emit('refresh')
      })
    }
  },

  beforeMount() {
    this.getSetting()
  },

  watch: {
    mainImage: {
      handler(val) {
        if (val) {
          this.product_image = val
        }
      },
      immediate: true
    },
    productImages: {
      handler(val) {
        if (val) {
          this.photos = val
        }
      },
      immediate: true
    },
    user: {
      handler(val) {
        if(!val.seller_id) {
          this.currentStep = 0
        }
        else {
          this.currentStep = 1
        }
      },
      immediate: true
    }
  },

  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    },
    user(){
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
