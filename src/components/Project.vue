<template>
  <!-- NOTE data bs properties is what targets the modal to open it -->
  <div
    class="project row ms-1 mt-2"
    data-bs-toggle="modal"
    data-bs-target="#project-modal"
    @click="setActive"
  >
    <div class="col-6 cover-img"></div>
    <div
      class="
        col-6
        d-flex
        flex-column
        justify-content-center
        align-items-middle
        mosaic-background
      "
    >
      <div class="p-2 bg-dark-blur rounded text-center text-light">
        {{ project.title }}
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { projectsService } from "../services/ProjectsService";
import { mosaicMaker } from "../utils/MosaicMaker";
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      setActive() {
        projectsService.setActive(props.project);
      },
      // NOTE background image on the left
      coverImg: computed(() => `url('${props.project.coverImg}')`),
      // NOTE the other one that mosaic's kinda a lot here
      mosaicUrls: computed(() => mosaicMaker(props.project.projectImgs).urls),
      mosaicSizes: computed(() => mosaicMaker(props.project.projectImgs).sizes),
      mosaicPositions: computed(
        () => mosaicMaker(props.project.projectImgs).positions
      ),
      mosaicRepeats: computed(
        () => mosaicMaker(props.project.projectImgs).repeats
      ),
    };
  },
};
</script>


<style lang="scss" scoped>
.project {
  min-height: 20vh;
  transition: all 0.12s ease;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
}
.project:hover {
  transform: scale(1.05);
  outline: 1px solid var(--bs-light);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
}

.bg-dark-blur {
  background: rgba(24, 24, 24, 0.562);
  backdrop-filter: blur(20px);
}

.cover-img {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
}

.mosaic-background {
  background-image: v-bind(mosaicUrls);
  background-size: v-bind(mosaicSizes);
  background-position: v-bind(mosaicPositions);
  background-repeat: v-bind(mosaicRepeats);
}
</style>
