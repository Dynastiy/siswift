<template>
  <div>
    <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <!-- proile

      {{ user }} -->
      <div class="flex items-center flex-col mb-3">
        <div class="relative">
          <img
            :src="user.image ? imgUrl + 'user/profile/'+ user.image : image"
            class="w-[80px] h-[80px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
          />
          <input
            type="file"
            name="file"
            id="fileInput"
            class="hidden-input"
            ref="file"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            @change="uploadPhoto"
          />

          <label
            for="fileInput"
            class="file-label mb-0 flex flex-col items-center bg-primary text-white p-[8px] rounded-full absolute right-0 bottom-0"
          >
            <i-icon :icon="isUploading ? 'line-md:downloading-loop' : 'lucide:images'" class="text-[15px]" />

          </label>
        </div>
        <h4 class="font-semibold">{{ `${form.firstname} ${form.lastname}` }}</h4>
      </div>
      <form class="flex flex-col gap-[8px]" @submit.prevent="editProfile">
        <div class="flex lg:flex-row md:flex-row flex-col gap-[8px]">
          <div>
            <label for="">First Name</label>
            <input type="text" class="input" v-model="form.firstname" />
          </div>

          <div>
            <label for="">Last Name</label>
            <input type="text" class="input" v-model="form.lastname" />
          </div>
        </div>

        <div>
          <label for="">Phone Number</label>
          <input type="text" class="input" v-model="form.mobile" />
        </div>

        <div>
          <label for="">Home Address</label>
          <input type="text" class="input" v-model="form.address" />
        </div>

        <div class="text-center mt-2">
          <button
            class="brand-btn w-8/12"
            :disabled="isLoading"
            :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
          >
          <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
          <span v-else> Update </span>
          </button>
        </div>
        <div class="mt-3"></div>
      </form>

      <h4 class="font-semibold mt-3">Verification</h4>
      <span
        class="border border-dashed border-primary block p-2 rounded-md flex justify-between items-center"
        role="button"
        @click="$router.push('/app/kyc')"
      >
        <span class="font-medium text-sm flex gap-2 items-center">
          <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
          <div class="flex flex-col">
            <span>KYC Verification</span>
            <span class="text-xs text-gray-500">{{
              !!user.kyc_data ? 'Verified' : 'Not Verified'
            }}</span>
          </div>
        </span>
        <i-icon icon="prime:angle-right" class="text-[25px]" />
      </span>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        mobile: '',
        address: '',
        image: ''
      },
      isLoading: false,
      isUploading: false,
      image,
      
    }
  },

  methods: {
    editProfile() {
      this.isLoading = true
      const formdata = new FormData()
      formdata.append("_method", "PUT");
      formdata.append('firstname', this.form.firstname)
      formdata.append('lastname', this.form.lastname)
      formdata.append('email', this.form.email)
      formdata.append('mobile', this.form.phone)
      formdata.append('address', this.form.address)

      this.$auth.updateProfile(formdata, this.user.id).then((res) => {
        console.log('register res:', res)
        this.getUser()
      })
      .finally(()=> {
        this.isLoading = false
      })
    },

    uploadPhoto() {
      const input = event.target
      let image = input.files[0]
    this.isUploading = true
      const formdata = new FormData()
      formdata.append("_method", "PUT");
      formdata.append('firstname', this.form.firstname)
      formdata.append('lastname', this.form.lastname)
      formdata.append('image', image)

      this.$auth.updateProfile(formdata, this.user.id).then((res) => {
        console.log('register res:', res)
        this.getUser()
      })
      .finally(()=> {
        this.isUploading = false
      })
    },

    getUser(){
      this.$auth.getProfile()
      .then((res)=> {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    },
  },

  watch: {
    user: {
      handler(val) {
        this.form = {
          firstname: val.firstname,
          lastname: val.lastname,
          mobile: val.mobile,
          address: val.address.address
        }
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
</style>
