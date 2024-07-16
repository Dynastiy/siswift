<template>
  <div class="container">
    <div
      class="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 grid-cols-none flex flex-col-reverse min-h-[60vh] gap-6 items-center"
    >
      <div class="flex flex-col gap-5">
        <h1 class="lg:text-5xl md:text-3xl text-3xl font-extrabold">The perfect marketplace to buy and sell your phones</h1>
        <h6 class="text-[15px] text-gray-500 font-medium">
          Buy, sell, and upgrade seamlessly in our dynamic phone marketplace. Find the perfect new
          device today!
        </h6>
        <button class="brand-btn-md px-12 py-[15px] w-fit brand-primary">
          <router-link to="/register">Register</router-link>
        </button>
      </div>
      <div>
        <img src="@/assets/img/heroImg.png" class="" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
