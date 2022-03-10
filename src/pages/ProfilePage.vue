<template>
  <!-- TODO change out with profile information -->
  <div class="profile container-fluid text-center">
    <div class="row bg-primary justify-content-center">
      <div class="col-4 bg-primary mt-3 mb-0">
        <img
          class="profile-img rounded-circle elevation-4"
          :src="profile.picture"
        />
        <h1>{{ profile.name }}</h1>
        <p>
          {{ profile.email }}
          <i
            v-if="account.id == profile.id"
            data-bs-toggle="modal"
            data-bs-target="#edit-profile"
            class="mdi mdi-pencil selectable"
          ></i>
        </p>
      </div>
    </div>
    <CreateProject v-if="account.id == profile.id" />
    <div class="row justify-content-center">
      <div v-for="p in projects" :key="p.id" class="col-8">
        <Project :project="p" />
      </div>
    </div>
    <Modal id="edit-profile">
      <template #title> edit profile</template>
      <template #body><ProfileForm /> </template>
    </Modal>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { projectsService } from "../services/ProjectsService";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await projectsService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      projects: computed(() => AppState.projects),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped>
.profile-img {
  aspect-ratio: 1;
  min-width: 5em;
  max-width: 7em;
}
</style>
