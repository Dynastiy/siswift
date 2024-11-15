<template>
  <div>
    <div></div>
    <div class="bg-white p-6 rounded-md lg:w-6/12 md:w-7/12 w-full mx-auto">
      <div class="">
        <h3 class="font-bold text-xl mb-6">Refund Product</h3>
      </div>

      <vForm @submit="onSubmit" v-slot="{ meta }" class="">
        <div class="flex flex-col gap-[10px]">

          <div>
            <label for="">Amount</label>
            <vField
              name="amount"
              v-model="dataObj.amount"
              readonly
              rules="required"
              class="input"
              type="text"
            >
            </vField>
            <ErrorMessage name="amount" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Reason</label>
            <vField @change="selectItem" name="reason" rules="required" class="input" as="select">
              <option selected disabled value="">--Select Reason--</option>
              <option v-for="(item, idx) in reasons" :key="idx" :value="item.subject">
                {{ item.subject }}
              </option>
            </vField>
            <ErrorMessage name="reason" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Description</label>
            <vField name="desc" rules="required" class="input" as="select">
              <option selected disabled value="">--Select Description--</option>
              <option v-for="(item, idx) in detailed_info" :key="idx" :value="item">
                {{ item }}
              </option>
            </vField>
            <ErrorMessage name="desc" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Additional Information</label>
            <vField name="add_info" class="input" as="textarea" rows="3"> </vField>
            <ErrorMessage name="add_info" class="text-xs text-error"></ErrorMessage>
          </div>
        </div>

        <div class="text-center mt-5">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid"
            :class="[
              isLoading
                ? 'bg-gray1 text-gray'
                : meta.valid
                  ? 'brand-primary'
                  : 'bg-gray1 text-black1'
            ]"
          >
            Send
          </button>
        </div>

      </vForm>
    </div>
  </div>
</template>

<script>
import reasons from '@/assets/api/reason.json'
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      dataObj: {
        amount: this.$route.query.amount
      },
      reasons,
      detailed_info: [],
      ID: this.$route.params.ID
    }
  },

  methods: {
    async onSubmit(values, { resetForm }) {
      this.isLoading = true
      let payload = {
        ...values,
        seller_id: this.$route.query.seller
      }
      this.$orders
        .dispute(payload, this.ID)
        .then((res) => {
          this.$router.push(`/app/dispute/${res.id}/view/${this.ID}`)
          resetForm()
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    selectItem(e) {
      console.log(e.target._value)
      let checkName = e.target._value
      let info = this.detailed_info
      let sourceData = this.reasons

      // console.log
      info = sourceData.find((item) => item.subject == checkName)
      this.detailed_info = info.desc
    }
  },

  beforeMount() {
    // this.fetchTicketRecords()
  }
}
</script>

<style scoped>
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
