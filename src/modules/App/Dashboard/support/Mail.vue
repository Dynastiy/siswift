<template>
  <div class="bg-white p-6 rounded-md lg:w-6/12 md:w-7/12 w-full mx-auto">
    <div class="">
      <h3 class="font-bold mb-6">Want to send a mail to us?</h3>
    </div>
    <!-- <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div> -->
    <vForm @submit="onSubmit" v-slot="{ meta }" class="">
      <div class="flex flex-col gap-3">
        <div>
          <label for="">Name</label>
          <vField name="name" rules="required" class="input" type="text"> </vField>
          <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Email Address</label>
          <vField name="email" rules="email" class="input" type="email"> </vField>
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Subject</label>
          <vField name="subject" rules="required" class="input" type="text"> </vField>
          <ErrorMessage name="subject" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Description</label>
          <vField name="message" rules="required" class="input" as="textarea" rows="4"> </vField>
          <ErrorMessage name="mesage" class="text-xs text-error"></ErrorMessage>
        </div>
      </div>

      <div class="text-center mt-5">
        <button
          class="brand-btn w-full"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading ? 'bg-gray1 text-gray' : meta.valid ? 'brand-primary' : 'bg-gray1 text-black1'
          ]"
        >
          Send
        </button>
      </div>
    </vForm>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isLoading: false
    }
  },

  methods: {
    async onSubmit(values, {resetForm}) {
      this.isLoading = true
      let payload = {
        ...values, 
        priority: 1
      }
      console.log(values, 'ommmo')
      this.$config.sendTicket(payload)
      .then((res)=> {
        console.log(res);
        resetForm()
      })
      .finally(()=> {
        this.isLoading = false
      })
    }
  }
}
</script>
