<template>
  <div>Sponsor Listing</div>
</template>

<script>
export default {
  methods: {
    getPlans() {
      this.$config.getPlans().then((res) => {
        console.log(res)
      })
    }
  },

  beforeMount() {
    this.getPlans()
  }
}
</script>

<style></style>
