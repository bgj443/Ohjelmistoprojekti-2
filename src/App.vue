<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Valitse lähtöasema</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Trains />
      <DatePicker />
    </v-content>
  </v-app>
</template>

<script>
import Trains from "./components/Trains";
import DatePicker from "./components/DatePicker";

export default {
  name: "App",
  components: {
    DatePicker,
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
