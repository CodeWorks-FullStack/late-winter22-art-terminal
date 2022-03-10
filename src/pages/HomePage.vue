<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column text-light">
    <div class="row">
      <div class="col-12">
        <Search />
      </div>
    </div>
    <div class="row px-5 mb-5 pb-5">
      <div v-for="p in projects" :key="p.id" class="col-md-6">
        <Project :project="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { projectsService } from "../services/ProjectsService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      projects: computed(() => AppState.projects),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  // place-content: center;
  // text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
