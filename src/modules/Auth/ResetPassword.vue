<template>
  <div class="">
    <div>
      <div
        class="flex justify-center"
      >
        <img src="@/assets/img/logo.svg" width="120" alt="" />
      </div>
      <div class="text-center mb-3">
        <h3 class="text-2xl font-bold">Change Password?</h3>
        <span class="text-xs block"
          >We have sent an email with password reset information to {{ emailAddress }}</span
        >
      </div>
     
      <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2">
        <div>
          <label for="">Enter New Password</label>
          <vField name="password" v-slot="{ field }" rules="required">
            <div class="input-field">
              <input
                :type="typePassword ? 'password' : 'text'"
                name="password"
                id="password"
                placeholder="Password"
                v-bind="field"
              />
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
          <label for="">Confirm New Password</label>
          <vField name="password_confirmation" v-slot="{ field }" rules="required">
            <div class="input-field">
              <input
                :type="newPassword ? 'password' : 'text'"
                name="password"
                id="password2"
                placeholder="Confirm New Password"
                v-bind="field"
              />
              <span class="password-iccon" role="button" @click="newPassword = !newPassword">
                <i-icon
                  :icon="newPassword ? 'tabler:eye' : 'gridicons:not-visible'"
                  class="form-icon"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="password_confirmation" class="text-xs text-error"></ErrorMessage>
        </div>

        <div class="text-center mt-3">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid"
            :class="[isLoading ? 'bg-gray-400 text-gray-600' : meta.valid ? 'brand-primary' : 'bg-gray-400 text-gray-600']"
          >
            Change Password
          </button>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      typePassword: true,
      newPassword: true,
      emailAddress: '',
      isLoading: false
    }
  },

  methods: {
    onSubmit(values) {
        this.isLoading = true
        // let credentials = {
        //   ...values,
        // }
        this.$auth.resetPassword(values, {
          token: this.token,
          email: this.email,
        })
        .then(()=> {
          this.$router.push('/login')
        })
        .finally(()=> {
          this.isLoading = false
        })
    }
  },

  watch: {
    email: {
      handler(val) {
        let emailInfo = val.split('@')
        let mainEmail = emailInfo[0].split('')
        let spacing = mainEmail.length
        let hideInfo = mainEmail.fill('*', '2', spacing)
        this.emailAddress = `${hideInfo.join('')}@${emailInfo[1]}`
      },
      immediate: true
    }
  },
  computed: {
    email() {
      const data = this.$route.query.email
      return data
    },
    token() {
      const data = this.$route.query.token
      return data
    }

  }
}
</script>
