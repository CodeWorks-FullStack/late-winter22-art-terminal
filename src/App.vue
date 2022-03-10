<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <!-- NOTE id at the top of the modal lets us re-use the same modal for different purposes -->
  <Modal id="project-modal">
    <template #title> {{ activeProject.title }} </template>
    <template #body>
      <ImageThread :images="activeProjectImgs" />
    </template>
    <template #footer>
      <div class="d-flex w-100 justify-content-between">
        <div
          v-if="account.id == activeProject.creatorId"
          class="btn btn-outline-danger"
          @click="remove"
        >
          <i class="mdi mdi-delete"></i> delete
        </div>
        <div
          @click="goTo('Profile')"
          class="selectable d-flex align-items-center"
        >
          <p>
            {{ activeProject.creator?.name }}
          </p>
          <img
            class="profile-pic ms-2"
            :src="activeProject.creator?.picture"
            alt=""
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { logger } from "./utils/Logger";
import Pop from "./utils/Pop";
import { projectsService } from "./services/ProjectsService";
export default {
  name: "App",
  setup() {
    const router = useRouter();
    return {
      goTo(page) {
        Modal.getOrCreateInstance(
          document.getElementById("project-modal")
        ).hide();
        router.push({
          name: page,
          params: { id: AppState.activeProject.creatorId },
        });
      },
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      activeProject: computed(() => AppState.activeProject),
      activeProjectImgs: computed(() => {
        if (AppState.activeProject.projectImgs) {
          return [
            AppState.activeProject.coverImg,
            ...AppState.activeProject.projectImgs,
          ];
        }
        return [];
      }),
      async remove() {
        try {
          if (
            await Pop.confirm(
              "are you sure you want to delete this project?",
              "",
              "info",
              "yeah! get rid of it!"
            )
          ) {
            await projectsService.remove(AppState.activeProject.id);
            Modal.getOrCreateInstance(
              document.getElementById("project-modal")
            ).hide();
            Pop.toast("deleted project", "success");
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.modal.fade {
  background: rgba(22, 22, 22, 0.438);
  backdrop-filter: blur(20px);
}

.profile-pic {
  height: 40px;
  width: 40px;
}
</style>
