<template>
  <div class="main">
    <div>
      <div
        class="dropzone-container flex flex-col items-center justify-center text-center bg-white"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="onChange"
          ref="file"
          accept=".png,.jpg,.jpeg"
        />

        <label
          for="fileInput"
          class="file-label mb-0 flex flex-col items-center"
          v-if="Object.keys(files).length <= 0 "
        >
          <i-icon icon="ph:upload-simple-fill" class="text-[30px]" />
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else class="text-[16px] font-medium mb-0">
            Upload <span class="text-primary font-semibold"> {{ uploadLabel }} </span>
          </div>
        </label>

        <div v-else class="dropzone-container flex flex-col items-center justify-center" :style="generateURL">
          <!-- <img :src="generateURL" alt="" class="h-[180px] w-full rounded-[12px] object-fit object-center object-cover" /> -->
          <div class="flex flex-col gap-2">
            <label class="bg-white py-2 px-4 font-semibold shadow text-primary capitalize text-sm block w-fit rounded-md" for="fileInput" role="button"> replace </label>
            <button class="bg-white py-2 px-4 font-semibold shadow text-red-600 capitalize text-sm block w-fit rounded-md" @click="removePhoto">remove</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-5 gap-2 mt-4" >
        <div v-for="(item, idx) in files" :key="idx">
          <div class="relative">
            <img :src="generateURL(item)" alt="" class="h-12 w-full rounded-lg object-fit-cover" />
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
      </div> -->
  </div>
</template>

<script>
export default {
  props: {
    uploadLabel: {
      type: String,
      default: 'Phone Photo'
    }
  },
  data() {
    return {
      isDragging: false,
      files: {},
      hasPreview: false
    }
  },
  methods: {
    onChange() {
      this.files = this.$refs.file.files
      console.log(this.files, 'from:photo Upload')
      this.$emit('uploadMainImage', this.files[0])
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
      this.$refs.file.files = e.dataTransfer.files
      this.onChange()
      this.isDragging = false
    },

    // generateURL() {
    //   let fileSrc = URL.createObjectURL(this.files[0])
    //   setTimeout(() => {
    //     URL.revokeObjectURL(fileSrc)
    //   }, 1000)
    //   return fileSrc
    // },

    removePhoto() {
      if (Object.keys(this.files).length !== 0) {
        this.files = {}
      }
    }
  },

  computed: {
    generateURL() {
      let fileSrc =  URL.createObjectURL(this.files[0])
      // setTimeout(() => {
      //   URL.revokeObjectURL(fileSrc)
      // }, 1000)
      return { backgroundImage: `url(${fileSrc})` }
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
  height: 200px;
  width: 100%;
  background: var(---gray1);
  border: 2px solid var(---primary-color);
  /* border-style: ; */
  border-radius: 12px;
  background-size: cover;
  background-position: center;
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
