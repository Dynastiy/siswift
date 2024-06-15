<template>
  <div>
    <div
      class="fixed rounded-tr-[15px] bottom-nav px-6 h-[70px] rounded-tl-[15px] w-full bottom-0 sm:z-0"
    >
      <div class="flex justify-between h-full w-full items-center">
        <ul class="flex items-center w-full justify-between h-full mb-0 relative">
          <li
            class=""
            :class="[routeParent === item.parent ? 'text-primary activeNav' : 'tx-text-dark1']"
            v-for="(item, idx) in menu"
            :key="idx"
          >
            <router-link
              class="flex flex-col items-center gap-1 w-full text-sm font-semibold"
              :to="item.url"
            >
              <span>
                <i-icon :icon="item.icon" class="text-xl" />
              </span>
              <span class="font-medium text-[12px]">
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul>

        <!-- <ul class="flex items-center gap-[30px] h-full mb-0 relative">
          <li
            class=""
            :class="[routeParent === item.parent ? 'text-secondary activeNav' : 'tx-text-dark1']"
            v-for="(item, idx) in menu.slice(2, 4)"
            :key="idx"
          >
            <router-link
              class="flex flex-col items-center w-full text-sm"
              :to="item.url"
            >
              <span>
                <i-icon :icon="item.icon" class="text-xl" />
              </span>
              <span class="font-semibold">
                {{ item.title }}
              </span>
            </router-link>
          </li>
        </ul> -->
      </div>

      <!-- <div class="flex justify-center">
        <div id="sweep">
          <div id="sweep-right" />
          <div id="sweep-center" />
          <div id="sweep-left" />
        </div>
      </div>

      <div class="circle">
        <router-link to="/scan">
          <i-icon icon="fluent:scan-text-24-filled" />
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    },
    routeParent() {
      return this.$route.meta.parent
    }
  }
}
</script>

<style scoped>
/* .activeNav::after {
  content: '';
  position: absolute;
  bottom: 0;
  background-color: var(--secondary-color);
  display: block;
  height: 3px;
  translate: (50%, -50%);
  width: 50px;
} */

.circle {
  position: absolute;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--white);
  /* background: var(--deep-color); */
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  top: -20px;
  border-radius: 47%;
  height: 60px;
  width: 60px;
  right: 50%;
  transform: translate(50%, -10%);
  /* box-shadow:
    -4px -4px 12px #929292,
    6px 6px 12px #ffffff; */
}

.bottom-nav {
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.80);
  /* border-radius: 12px; */
  /* border: 1px solid rgba(255, 255, 255, 0.125); */
}

#sweep {
  height: 100%;
  width: 160px;
  display: flex;
  position: absolute;
  left: -50;
  top: 0px;
}

#sweep-center {
  height: 45px;
  display: flex;
  flex: 1;
  background: var(--gray-100);
  border-radius: 0 0 60% 60%;
}

#sweep-left {
  height: 35px;
  width: 50px;
  overflow: hidden;
  position: relative;
  right: 2px;
}

#sweep-left:before {
  content: '';
  display: block;
  width: 220%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  box-shadow: -40px -40px 0 0 var(--gray-100);
}

#sweep-right {
  height: 35px;
  width: 50px;
  overflow: hidden;
  position: relative;
  left: 2px;
}

#sweep-right:before {
  content: '';
  display: block;
  width: 220%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
  top: 0;
  right: 0;
  box-shadow: 40px -40px 0 0 var(--gray-200);
}
</style>
