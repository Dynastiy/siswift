<script setup>
// const getYear = new Date().getFullYear()
// import TwitterIcon from "@/components/icons/twitterIcon.vue";
</script>

<template>
  <footer class="bg-black2 mt-0 py-[72px] flex flex-col gap-[54px] lg:gap-[54px] text-white">
    <div class="container">
      <div class="grid grid-cols-4">
        <div>
          <ul class="flex flex-col lg:gap-[12px]">
            <!-- <li class="text-[14px] font-normal lg:leading-[21.602px]">
              <router-link to=""> info@croxxtalent.com </router-link>
            </li>
            <li class="text-[14px] font-normal lg:leading-[21.602px]">
              <router-link to="">+1 888-301-0737 </router-link>
            </li> -->
            <li class="text-[14px] font-normal lg:leading-[21.602px]">
              <a> 10, ADAMASIGBA, MOKOLA, IBADAN, OYO STATE, NIGERIA </a>
            </li>
            <!-- <li class="text-[14px] font-normal lg:leading-[21.602px]">
              <router-link to="">USA 20310 </router-link>
            </li> -->
          </ul>
        </div>

        <div class="flex justify-between lg:flex-row flex-col">
          <div class="flex flex-col lg:flex-row gap-[58px] text-left justify-start w-full">
            <div>
              <h5 class="font-bold text-primary text-[16px] mb-[12px]">Service</h5>
              <ul class="flex flex-col lg:gap-[12px]">
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/app/my-store"> Store </router-link>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/app/my-cart"> Cart </router-link>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/app/marketplace"> Products </router-link>
                </li>
                <!-- <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to=""> Contacts </router-link>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/about"> About </router-link>
                </li> -->
              </ul>
            </div>
          </div>
        </div>

        <div class="flex justify-between lg:flex-row flex-col">
          <div class="flex flex-col lg:flex-row gap-[58px] text-left justify-start w-full">
            <div>
              <h5 class="font-bold text-primary text-[16px] mb-[12px]">Company</h5>
              <ul class="flex flex-col lg:gap-[12px]">
                <!-- <li class="text-[14px] font-normal lg:leading-[21.602px]">
                <router-link to=""> Products </router-link>
              </li>
              <li class="text-[14px] font-normal lg:leading-[21.602px]">
                <router-link to=""> Resources </router-link>
              </li> -->
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/contact"> Contact Us</router-link>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="terms"> Terms and Conditons </router-link>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <router-link to="/privacy-policy"> Privacy Policy </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex justify-between lg:flex-row flex-col">
          <div class="flex flex-col lg:flex-row gap-[58px] text-left justify-start w-full">
            <div>
              <h5 class="font-bold text-primary text-[16px] mb-[12px]">Our Social Media</h5>
              <ul class="flex flex-col lg:gap-[12px]">
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <a href="https://instagram.com/siswiftng" target="_blank"> Instagram </a>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <a href="https://facebook.com/siswiftng" target="_blank"> Facebook </a>
                </li>
                <li class="text-[14px] font-normal lg:leading-[21.602px]">
                  <a href="https://x.com/siswiftng" target="_blank"> Twitter </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
