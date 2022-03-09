<template>
  <div class="profile container-fluid text-center">
    <div class="row bg-primary justify-content-center">
      <div class="col-4 bg-primary mt-3 mb-0">
        <img
          class="profile-img rounded-circle elevation-4"
          :src="account.picture"
        />
        <h1>{{ account.name }}</h1>
        <p>{{ account.email }}</p>
      </div>
    </div>
    <CreateProject />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  name: "Profile",
  setup() {
    return {
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
