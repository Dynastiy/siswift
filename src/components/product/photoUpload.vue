<template>
  <div class="main">
    <div>
      <div
        class="dropzone-container flex flex-col items-center justify-center text-center"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          multiple
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="onChange"
          ref="file"
          accept=".png,.jpg,.svg,.jpeg,.webp"
        />

        <label for="fileInput" class="file-label mb-0 flex flex-col items-center">
          <i-icon icon="ph:upload-simple-fill" class="text-[30px]" />
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else class="text-[16px] font-medium mb-0">
            Upload <span class="text-primary font-semibold">Phone Photo</span>
          </div>
          <!-- <span class="text-xs text-neutral-700">Supported format xlsx, csv, txt</span> -->
        </label>
      </div>
      <!-- <div class="flex justify-between my-3">
        <span class="text-[13.4px] text-neutral-700">Maximum of 20mb</span>
        <span class="text-[13.4px] text-neutral-700 underline cursor-pointer">Download Sample</span>
      </div> -->
    </div>
    <div class="grid grid-cols-5 gap-2 mt-4" >
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
              <!-- Remove -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      files: [],
      hasPreview: false
    }
  },
  methods: {
    onChange() {
      this.files.push(...this.$refs.file.files)
      console.log(this.files, 'from:photo Upload')
      this.$emit('uploadImage', this.files)
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

    generateURL(file) {
      let fileSrc = URL.createObjectURL(file)
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc)
      }, 1000)
      return fileSrc
    },

    removePhoto(value) {
      if (this.files.length !== 0) {
        this.files.splice(value, 1)
      }
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
