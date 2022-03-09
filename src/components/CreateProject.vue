<template>
  <form
    @submit.prevent="createProject"
    class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Project title</label>
      <input
        v-model="state.editable.title"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">cover image</label>
      <input
        v-model="state.editable.coverImg"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 mb-2">
      <label for="" class="form-label">images of your project</label>
      <textarea
        v-model="state.editable.projectImgs"
        required
        type="text"
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { projectsService } from "../services/ProjectsService";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createProject() {
        try {
          const safeUrlArray = state.editable.projectImgs
            .split(",")
            .map((url) => url.trim());
          state.editable.projectImgs = safeUrlArray;
          await projectsService.create(state.editable);
          state.editable = {};
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style scoped>
input,
textarea {
  background: rgb(37, 37, 37);
  color: var(--bs-light);
}
</style>
