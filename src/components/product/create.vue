<template>
  <div class="flex flex-col justify-between">
    <div>
      <vForm
        class="flex flex-col"
        @submit="nextStep"
        :validation-schema="currentSchema"
        keep-values
        v-slot="{ meta, values }"
      >
        <span v-if="!user.kv" class="bg-accent text-xs p-2 block mb-2">
          For your listing to go live, please verify your identity
          <router-link class="text-primary font-semibold underline" to="/app/kyc"
            >go to KYC verification</router-link
          >
        </span>
        <template v-if="currentStep === 0">
          <div class="flex flex-col gap-2">
            <div>
              <label for="">Title</label>
              <vField name="product_name" placeholder="Enter Product Name" class="input"> </vField>
              <ErrorMessage name="product_name" class="text-xs text-error"></ErrorMessage>
            </div>

            <!-- <div>
              <label for="">Product Model</label>
              <vField name="model" type="text" class="input" placeholder="Enter Product Model">
              </vField>
              <ErrorMessage name="model" class="text-xs text-error"></ErrorMessage>
            </div> -->

            <div class="w-full">
              <label for="">Product Categories</label>
              <!-- <MultiSelect
                v-model="category_id"
                display="chip"
                :options="categories"
                optionLabel="name"
                class="input text-[13px] py-[4px]"
                placeholder="Select Categories"
                :maxSelectedLabels="3"
              /> -->
              <vField name="category_id" as="select" class="input">
                <option selected disabled value="">--Select Category--</option>
                <option
                  v-for="item in categories"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </vField>
            </div>

            <div class="flex lg:flex-row md:flex-row flex-col gap-3">
              <div class="w-full">
                <label for="">Product Price</label>
                <vField
                  name="product_price"
                  type="tel"
                  placeholder="Enter Product Price"
                  class="input"
                >
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

            <div class="w-full">
              <label for="">Quantity</label>
              <vField name="quantity" type="tel" placeholder="Enter Quantity" class="input">
              </vField>
              <ErrorMessage name="quantity" class="text-xs text-error"></ErrorMessage>
            </div>

            <div v-if="values.quantity > 1">
              <label for="">Bulk Pricing {{ `(${bulk_prices.length}/5)` }} </label>
              <div class="flex gap-2" v-if="bulk_prices.length < 5">
                <input
                  type="text"
                  v-model="bulk_size"
                  placeholder="Enter Bulk Size"
                  class="input"
                  @keyup="checkSize(values.quantity)"
                />
                <input
                  type="text"
                  v-model="price_per_piece"
                  placeholder="Price Per Piece*"
                  class="input"
                />
                <button
                  :disabled="sizeError || !price_per_piece || !bulk_size"
                  :class="[
                    'brand-btn bg-primary text-white',
                    sizeError || !price_per_piece || !bulk_size ? 'bg-gray-500' : ''
                  ]"
                  type="button"
                  @click="addBulkPrice"
                >
                  Save
                </button>
              </div>
              <span v-if="sizeError" class="text-[12px] text-red-500">*{{ sizeError }}</span>
              <div class="flex flex-col gap-[5px] mt-[10px]">
                <div
                  class="bg-accent py-[6px] px-[12px] flex justify-between items-center"
                  v-for="(obj, i) in bulk_prices"
                  :key="i"
                >
                  <span class="text-sm block">
                    <b>{{ `From ${obj.qty} pieces:` }}</b>
                    {{ `${$currencyFormat(obj.price)}/piece` }}</span
                  >
                  <span @click="removeItem(i)" class="text-red-500" role="button">
                    <i-icon icon="material-symbols:close" />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label for="">Description</label>
              <Editor v-model="product_description" editorStyle="height: 200px;">
                <template #toolbar>
                  <span class="ql-formats">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                    <button class="ql-link"></button>
                    <button class="ql-align"></button>
                    <button class="ql-align" value="right"></button>
                    <button class="ql-align" value="center"></button>
                    <button class="ql-align" value="justify"></button>
                    <button class="ql-script" value="sub"></button>
                    <button class="ql-script" value="super"></button>
                    <select class="ql-header">
                      <option selected></option>
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                      <option value="5"></option>
                      <option value="6"></option>
                    </select>
                  </span>
                </template>
              </Editor>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="flex flex-col gap-2">
            <div class="flex lg:flex-row md:flex-row flex-col items-center gap-2">
              <div class="w-full">
                <label for="">State</label>
                <vField name="state" as="select" v-model="selectedState" class="input">
                  <option selected disabled value="">--Select State--</option>
                  <option v-for="item in states" :key="item" :value="item">
                    {{ item }}
                  </option>
                </vField>
                <ErrorMessage name="state" class="text-xs text-error"></ErrorMessage>
              </div>

              <div class="w-full">
                <label for="">City</label>
                <vField name="city" as="select" class="input">
                  <option selected disabled value="">--Select City--</option>
                  <option v-for="item in lgas" :key="item" :value="item">
                    {{ item }}
                  </option>
                </vField>
                <ErrorMessage name="city" class="text-xs text-error"></ErrorMessage>
              </div>
            </div>

            <!-- <div>
              <label for="">Location</label>
              <vField name="location" placeholder="Enter Address" class="input"> </vField>
              <ErrorMessage name="location" class="text-xs text-error"></ErrorMessage>
            </div> -->
            <div>
              <div class="flex gap-[3px] items-center">
                <label for="">Condition</label>
                <span class="text-red-500 text-sm" role="button" @click="visible = true">
                  <i-icon icon="material-symbols:info-outline" />
                </span>
              </div>
              <vField name="condition" as="select" class="input">
                <option selected disabled value="">--Select Condition--</option>
                <option
                  v-for="item in [
                    'new',
                    'like-new',
                    'refurbished',
                    'used-good',
                    'used-fair',
                    'used-poor'
                  ]"
                  class="capitalize"
                  :key="item"
                  :value="item"
                >
                  {{ item.split('_').join(' ') }}
                </option>
              </vField>
              <ErrorMessage name="condition" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">RAM Size</label>
              <vField name="ram_size" as="select" class="input">
                <option selected disabled value="">--Select RAM Size--</option>
                <option
                  v-for="item in ['16GB', '32GB', '64GB', '128GB', 'Other']"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </option>
              </vField>
              <ErrorMessage name="ram_size" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">SIM</label>
              <vField name="sim" as="select" class="input">
                <option selected disabled value="">--Select Number of Sims--</option>
                <option
                  v-for="item in ['single_sim', 'dual_sim']"
                  class="capitalize"
                  :key="item"
                  :value="item"
                >
                  {{ item.split('_').join(' ') }}
                </option>
              </vField>
              <ErrorMessage name="sim" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <label for="">Color</label>
              <div class="input-container flex justify-between flex-wrap items-center">
                <span class="colors-list flex gap-2 flex-wrap w-full">
                  <span
                    class="colors w-6 h-6 p-2 cursor-pointer rounded-full"
                    v-for="item in colors"
                    :key="item.uuid"
                    :style="{
                      backgroundColor: item.name,
                      borderColor: item.border
                    }"
                    :class="[color === item.name ? 'ring-2 ring-offset-2 ring-primary' : '']"
                    @click="addColor(item.name)"
                  ></span>
                </span>

                <div class="w-full">
                  <input
                    v-if="add_color"
                    type="color"
                    name=""
                    v-model="new_color"
                    id=""
                    @change="uploadColor"
                  />
                  <button
                    @click="addNewColor"
                    v-else
                    class="text-primary flex items-center text-sm font-semibold"
                  >
                    <i-icon icon="material-symbols:add" />
                    <span class="block">Add Color</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="flex flex-col gap-4 mt-7">
          <button
            class="brand-btn w-full bg-primary"
            v-if="currentStep > 0"
            type="submit"
            @click="prevStep"
          >
            Previous
          </button>
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

    <vDialog v-model:visible="visible" modal header="Conditions" :style="{ width: '20rem' }">
      <Condition />
    </vDialog>
  </div>
</template>

<script>
import * as yup from 'yup'
import Condition from '@/components/utils/Condition.vue'
import { debounce } from 'lodash'
import colors from '@/utils/colors.js'
export default {
  props: {
    mainImage: Object,
    productImages: Array
  },
  components: { Condition },
  data() {
    return {
      visible: false,
      typePassword: true,
      typePassword2: true,
      isLoading: false,
      validationErrors: {},
      currentStep: 0,
      bulk_size: '',
      sizeError: null,
      price_per_piece: '',
      schemas: [
        yup.object({
          product_name: yup.string().required(),
          // model: yup.string().required(),
          product_price: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric'),
          brand_id: yup.string(),
          quantity: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric')
        }),
        yup.object({
          ram_size: yup.string(),
          condition: yup.string().required(),
          sim: yup.string(),
          state: yup.string().required(),
          city: yup.string().required()
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
      category_id: "",
      categories: [],
      brands: [],
      states: [],
      lgas: [],
      bulk_prices: [],
      colors: colors,
      selectedState: '',
      product_image: null,
      photos: null,
      new_color: '',
      add_color: false,
      color: '',
      product_description: ''
    }
  },

  methods: {
    async create(values) {
      if (!this.mainImage) {
        this.$toast.error('Please, add product image', {
          timeout: 4000
        })
        return
      }

      if (this.photos.length === 0) {
        this.$toast.error('Please, please add at least one image', {
          timeout: 4000
        })
        return
      }

      const formdata = new FormData()
      formdata.append('name', values.product_name)
      formdata.append('brand_id', values.brand_id)
      formdata.append('base_price', values.product_price)
      // this.category_id.forEach((elem) => {
        formdata.append('categories[]', values.category_id)
      // })
      this.photos.forEach((elem) => {
        formdata.append('photos[]', elem)
      })
      formdata.append('main_image', this.mainImage)
      // formdata.append('location', values.location)
      formdata.append('description', this.product_description)
      formdata.append('model', '')
      formdata.append('track_inventory', values.quantity)
      formdata.append('condition', values.condition)
      formdata.append('ram', values.ram_size)
      formdata.append('sim', values.sim)
      formdata.append('colour', this.color)
      formdata.append('bulk_price', JSON.stringify(this.bulk_prices))
      // if (this.bulk_prices) {
      //   this.bulk_prices.forEach((elem) => {
      //     formdata.append('bulk_price', (`${elem.qty},${elem.price}`))
      //   })
      // }
      formdata.append('state', values.state == 'AkwaIbom' ? 'Akwa Ibom' : values.state)
      formdata.append('lga', values.city)
      this.$products
        .create(formdata)
        .then((res) => {
          console.log(res)
          this.$router.push('/app/my-listings')
          this.$toast.success('Your ad has been submitted, pending approval', {
            timeout: 4000
          })
          return
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('Error', {
            timeout: 4000
          })
        })
    },

    addColor(color) {
      this.color = color
    },

    addNewColor() {
      this.add_color = !this.add_color
    },

    removeColor(color) {
      this.colors = this.colors.filter((item) => item !== color)
    },

    removeItem(e) {
      this.bulk_prices.splice(e, 1)
    },

    addBulkPrice() {
      this.bulk_prices.push({
        qty: this.bulk_size,
        price: this.price_per_piece
      })
    },

    uploadColor() {
      this.add_color = false
      this.colors.push({
        id: this.colors.length,
        name: this.new_color
      })
    },

    async getStates() {
      try {
        const req = await this.$axios.get('https://nga-states-lga.onrender.com/fetch')
        console.log(req.data)
        this.states = req.data
      } catch (res) {
        console.log(res)
      }
    },

    async getLGA() {
      try {
        const req = await this.$axios.get(
          `https://nga-states-lga.onrender.com/?state=${this.selectedState}`
        )
        console.log(req.data)
        this.lgas = req.data
      } catch (res) {
        console.log(res)
      }
    },

    nextStep(values) {
      if (this.currentStep === 1) {
        this.create(values)
        return
      }
      this.currentStep++
      this.$emit('nextStep')
    },

    prevStep() {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
      this.$emit('prevStep')
    },

    checkSize(e) {
      let sizeError =
        +this.bulk_size > +e
          ? 'bulk quantity cannot be higher than quantity of product available'
          : null
      this.sizeError = sizeError
    },

    getSetting() {
      this.$config.getSettings().then((res) => {
        console.log('settings:', res)
        this.categories = res.categories
        this.brands = res.brands
      })
    }
  },

  beforeMount() {
    this.getSetting()
    this.getStates()
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

    selectedState: {
      handler: debounce(function () {
        this.getLGA()
      }, 500)
    }
    // user: {
    //   handler(val) {
    //     if(!val.seller_id) {
    //       this.currentStep = 0
    //     }
    //     else {
    //       this.currentStep = 1
    //     }
    //   },
    //   immediate: true
    // }
  },

  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    },
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
