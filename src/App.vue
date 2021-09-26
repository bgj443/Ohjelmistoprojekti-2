<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Train List</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Trains />
    </v-content>
  </v-app>
</template>

<script>
import Trains from "./components/Trains";

export default {
  name: "App",
  components: {
    Trains,
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style></style>
