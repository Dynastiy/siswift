<template>
  <div>
    <div class="input-field">
      <span class="w-full flex gap-2 items-center py-1">
        <span class="password-iccon">
          <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
        </span>
        <input
          type="text"
          class="w-full py-1"
          id="search"
          placeholder="Search for phone"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style></style>
