<template>
    <div class="">
      <div class="">
        <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Change password</h3>
        <span class="text-[15px] block font-regular text-gray2"
          >Fill your info below to change password</span
        >
      </div>
      <!-- <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div> -->
      <vForm
        @submit="onSubmit"
        v-slot="{ meta }"
        class="mt-8"
      >
        <div class="flex flex-col gap-4">
            <div>
            <label for="">Old Password</label>
            <vField name="current_password" v-slot="{ field }" rules="required">
              <div class="input-field">
                <span class="w-full flex gap-2 items-center">
                  <span class="password-iccon">
                    <i-icon icon="solar:lock-bold" class="form-icon" />
                  </span>
                  <input
                    :type="typePassword ? 'password' : 'text'"
                    name="current_password"
                    class="w-full"
                    id="password1"
                    placeholder="Password"
                    v-bind="field"
                  />
                </span>
                <span class="password-iccon" role="button" @click="typePassword = !typePassword">
                  <i-icon
                    :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                    class="form-icon"
                  />
                </span>
              </div>
            </vField>
            <ErrorMessage name="current_password" class="text-xs text-error"></ErrorMessage>
          </div>
          <div>
            <label for="">New Password</label>
            <vField name="password" v-slot="{ field }" rules="required">
              <div class="input-field">
                <span class="w-full flex gap-2 items-center">
                  <span class="password-iccon">
                    <i-icon icon="solar:lock-bold" class="form-icon" />
                  </span>
                  <input
                    :type="typePassword ? 'password' : 'text'"
                    name="password"
                    class="w-full"
                    id="password2"
                    placeholder="Password"
                    v-bind="field"
                  />
                </span>
                <span class="password-iccon" role="button" @click="typePassword = !typePassword">
                  <i-icon
                    :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                    class="form-icon"
                  />
                </span>
              </div>
            </vField>
            <ErrorMessage name="password" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Confirm Password</label>
            <vField name="password_confirmation" v-slot="{ field }" rules="required">
              <div class="input-field">
                <span class="w-full flex gap-2 items-center">
                  <span class="password-iccon">
                    <i-icon icon="solar:lock-bold" class="form-icon" />
                  </span>
                  <input
                    :type="typePassword2 ? 'password' : 'text'"
                    name="password_confirmation"
                    class="w-full"
                    id="password3"
                    placeholder="Confirm Password"
                    v-bind="field"
                  />
                </span>
                <span class="password-iccon" role="button" @click="typePassword2 = !typePassword2">
                  <i-icon
                    :icon="typePassword2 ? 'tabler:eye' : 'gridicons:not-visible'"
                    class="form-icon"
                  />
                </span>
              </div>
            </vField>
            <ErrorMessage name="password_confirmation" class="text-xs text-error"></ErrorMessage>
          </div>
  
        </div>
  
        <div class="text-center mt-8">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid"
            :class="[
              isLoading ? 'bg-gray1 text-gray' : meta.valid ? 'brand-primary' : 'bg-gray1 text-black1'
            ]"
          >
            Continue
          </button>
          <div class="mt-3">
        
        </div>
        </div>
      </vForm>
    </div>
  </template>
  
  <script>
  export default {
    components: {},
  
    data() {
      return {
        typePassword: true,
        typePassword2: true,
        isLoading: false,
        validationErrors: {}
      }
    },
  
    methods: {
      async onSubmit(values, {resetForm}) {
      this.$auth.changePassword(values).then((res) => {
        resetForm()
        return res
      })
      }
    }
  }
  </script>
  