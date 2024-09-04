<template>
  <div class="main grid grid-cols-5 gap-2 mt-4">
    <!-- {{subscription}} -->
    <div>
      <div
        class="dropzone-container flex flex-col items-center justify-center rounded-md text-center h-12 bg-white"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          multiple
          name="file2"
          id="fileInput2"
          class="hidden-input"
          @change="onChange2"
          ref="file2"
          accept=".png,.jpg,.jpeg"
        />

        <label for="fileInput2" class="file-label mb-0 flex flex-col items-center">
          <i-icon icon="akar-icons:plus" class="text-[17px]" />
          <!-- <div v-if="isDragging">Release to drop files here.</div>
          <div v-else class="text-[16px] font-medium mb-0">
            Upload <span class="text-primary font-semibold">Phone Photo</span>
          </div> -->
        </label>
      </div>
      <!-- <div class="flex justify-between my-3">
        <span class="text-[13.4px] text-neutral-700">Maximum of 20mb</span>
        <span class="text-[13.4px] text-neutral-700 underline cursor-pointer">Download Sample</span>
      </div> -->
    </div>
    <div class="col-span-4">
      <div class="grid grid-cols-4 gap-2">
        <div v-for="(item, idx) in photos" :key="idx">
          <div class="relative">
            <img :src="generateURL(item)" alt="" class="h-12 w-full rounded-md object-fit-cover" />
            <div class="flex justify-end gap-2 absolute top-1 right-1">
              <span
                role="button"
                class="bg-white text-xs px-2 py-1 font-semibold rounded-md"
                @click="removePhoto(idx)"
              >
                <i-icon icon="fluent:delete-12-regular" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
      isDragging: false,
      photos: [],
      hasPreview: false,
      maxFiles: 4
    }
  },
  methods: {
    upload(newFiles) {
      const toast = useToast()
      if (this.photos.length + newFiles.length > this.maxFiles) {
        toast.error(`Cannot upload more than ${this.maxFiles} photos, upgrade plan to upload more`, {
          timeout: 4000
        })
        return
      }
      const updatedFiles = Array.from(newFiles)
      this.photos = [...this.photos, ...updatedFiles]
      console.log(this.photos, 'from:photo Upload')
      this.$emit('uploadImage', this.photos)
    },

    onChange2(e) {
      const selectedFiles = e.target.files
      this.upload(selectedFiles)
    },

    dragover(e) {
      e.preventDefault()
      this.isDragging = true
    },

    dragleave() {
      this.isDragging = false
    },

    drop(e) {
      e.preventDefault()
      let newFiles = e.dataTransfer.photos
      this.upload(newFiles)
      this.isDragging = false
    },

    generateURL(file) {
      let fileSrc = URL.createObjectURL(file)
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc)
      }, 1000)
      return fileSrc
    },

    getCurrentSubscription() {
      this.$config.getSubscription().then((res) => {
        console.log(res.subscription)
        this.$store.commit('auth/setSubscription', res.subscription)
      })
    },

    removePhoto(value) {
      if (this.photos.length !== 0) {
        this.photos.splice(value, 1)
      }
    }
  },

  beforeMount() {
    this.getCurrentSubscription()
  },

  watch: {
    subscription: {
      handler(val) {
        if (val.plan_id !== 1) {
          this.maxFiles = 8
        } else {
          this.maxFiles = 4
        }
      },
      immediate: true,
      deep: true
    }
  },

  computed: {
    subscription() {
      return this.$store.getters['auth/getSubscription']
    }
  }
}
</script>
<style scoped>
/* .main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
} */

.dropzone-container {
  /* height: 60px; */
  /* width: 100%; */
  background: var(---gray1);
  border: 2px solid var(---primary-color);
  /* border-style: ; */
  /* border-radius: 12px; */
}

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

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
