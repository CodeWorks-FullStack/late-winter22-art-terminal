<template>
  <div class="d-flex flex-column">
    <div v-for="(url, index) in images" :key="index">
      <img :src="url" class="img-fluid" alt="" />
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style scoped>
</style>
