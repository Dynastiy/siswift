<template>
  <div>
    <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="item in items" :key="item?.id" class="bg-white p-3 ">
        <span role="button" class="text-red-600 text-xs mb-2 font-semibold text-right block" @click="removeRecord(item)">Delete</span>
        <div class="rounded-lg grid lg:grid-cols-2 md:grid-cols-2 gap-4">
            <span v-for="(value, name) in item" :key="name">
          <span class="block text-[11px] uppercase"> {{ name.split('_').join(' ') }} </span>
          <span class="font-semibold text-sm block">{{ value }}</span>
        </span>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <button @click="addBank" class="brand-btn-md brand-primary">Add Bank Details</button>
    </div>

    <vDialog v-model:visible="visible" modal header="Add Bank Details" :style="{ width: '30rem' }">
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4 mb-6">
          <select name="" id="" class="input" v-model="bank">
            <option v-for="item in banks" :key="item.id" :value="item">{{ item.name }}</option>
          </select>
          <input type="tel" class="input" v-model="account_number" placeholder="Account Number" />
          <input type="text" class="input" v-model="account_name" placeholder="Account Name" />
        </div>
        <div class="text-center">
          <button type="submit" class="brand-btn-md brand-primary w-7/12">Submit</button>
        </div>
      </form>
    </vDialog>
  </div>
</template>

<script>
import {debounce} from 'lodash'
export default {
  data() {
    return {
      visible: false,
      items: [],

      
      banks: [],
      bank: {},
      account_number: '',
      account_name: '',
    }
  },
  methods: {
    onSubmit() {
      const formdata = new FormData()
      formdata.append('bank_name', this.bank.name)
      formdata.append('bank_code', this.bank.code)
      formdata.append('account_name', this.account_name)
      formdata.append('account_number', this.account_number)
      this.$config.createBank(formdata).then(() => {
        this.visible = false
        this.getMethods()
      })
    },

    removeRecord(item) {
        this.$config.removeBank(item.id).then(() => {
        this.getMethods()
      })
    },

    fetchBankRecords(){
      this.$config.listBanks()
      .then((res)=> {
        console.log('Banks:', res.data.data);
        this.banks = res.data.data      
      })
    },

    fetchAccountDetails(){
      let payload = {
        account_number: this.account_number,
        bank_code: this.bank.code
      }
      this.$config.verifyDetails(payload)
      .then((res)=> {
        console.log('Banks:', res.data.data);
        // this.banks = res.data.data      
      })
    },

    // getMethods() {
    //   this.$config.getWithdrawalMethods().then((res) => {
    //     console.log(res)
    //   })
    // }

    getMethods() {
      this.$config.getWithdrawalMethods().then((res) => {
        console.log(res)
        // let resData = res.data
        // let req = []
        // resData.forEach((item) => {
        //   let dataList = {
        //     id: item.id,
        //     bank_name: item.bank_name,
        //     bank_code: item.bank_code,
        //     recipient_name: item.recipient_name,
        //     account_number: item.account_number,
        //     mobile_agent_name: item.mobile_agent_name,
        //     mobile_agent_number: item.mobile_agent_number,
        //     paypal_id: item.paypal_id,
        //     upi_id: item.upi_id
        //   }
        //   req.push(dataList)
        // })
        // this.items = req
      })
    },

    addBank() {
      this.visible = !this.visible
    }
  },

  watch: {
    bank: {
      handler: debounce(function () {
        console.log(this.bank);
        this.fetchAccountDetails()
      }, 500)
    },
    account_number: {
      handler: debounce(function () {
        console.log(this.bank);
        this.fetchAccountDetails()
      }, 500)
    }
  },

  beforeMount() {
    this.getMethods()
    this.fetchBankRecords()
  }
}
</script>

<style></style>




