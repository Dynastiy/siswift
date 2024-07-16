<template>
  <div class="bg-accent">
    <div class="container p-8">
        <h4 class="font-semibold mb-6 text-xl text-center">Start using Siswift today</h4>
        <div class="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 gap-6 grid-cols-none items-center">
            <div>
                <img src="@/assets/img/startImg.png" alt="">
            </div>
            <div>
               <div class="border-b border-b-gray-600 py-5" v-for="(item, idx) in info" :key="idx">
                <h3 class="font-semibold text-xl">{{ item?.header }}</h3>
                <h6 class="text-sm">{{ item?.desc }}</h6>
               </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            info: [
                {
                    header: "Buy and sell with confidence",
                    desc: 'Your payment is held securely until you confirm your it’s received.'
                },
                {
                    header: "Buy with ease with our user friendly platform",
                    desc: 'Your payment is held securely until you confirm your it’s received.'
                },
                {
                    header: "Buy with ease with our user friendly platform",
                    desc: 'Your payment is held securely until you confirm your it’s received.'
                }
            ]
        }
    }
}
</script>

<style></style>
