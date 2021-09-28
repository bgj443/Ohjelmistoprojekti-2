<template>
  <div>
    <select v-model="departureStation" @change="refreshTrains">
      <option selected disabled></option>
      <template v-for="(station, i) in stations">
        <option
          v-bind:key="'station' + i"
          :value="station.stationShortCode"
          v-if="station.passengerTraffic === true"
        >
          {{ station.stationName }}
        </option>
      </template>
    </select>
    <template v-if="trains.length">
      <div v-for="(train, i) in trains" v-bind:key="i">
        <span class="train-type">{{ train.trainType }}</span>
        <span class="train-destination" v-if="train.timeTableRows.length">
          {{
            train.timeTableRows[train.timeTableRows.length - 1].stationShortCode
          }}
        </span>
        <span class="train-track" v-if="train.timeTableRows.length">
          {{
            train.timeTableRows[train.timeTableRows.length - 1].commercialTrack
          }}</span
        >
        <span class="train-schedule" v-if="train.timeTableRows.length">
          {{
            formatDate(
              train.timeTableRows[train.timeTableRows.length - 1].scheduledTime
            )
          }}</span
        >
        <span class="train-schedule" v-if="train.timeTableRows.length">
          {{
            formatTime(
              train.timeTableRows[train.timeTableRows.length - 1].scheduledTime
            )
          }}</span
        >
      </div>
    </template>
  </div>
</template>

<script>
import getTrainsByStation from "../services/getTrainsByStation";
import getStations from "../services/getStations";

export default {
  data() {
    return {
      departureStation: "",
      arrivalStation: "",
      trains: [],
      stations: [],
      headers: [],
    };
  },
  methods: {
    refreshTrains() {
      if (this.departureStation) {
        getTrainsByStation(this.departureStation).then(
          (data) => (this.trains = data)
        );
      }
    },
    formatDate(value) {
      let formatted = new Date(value).toLocaleDateString("fi-fi");
      return formatted;
    },
    formatTime(value) {
      let formatted = new Date(value).toLocaleTimeString("fi-fi");
      return formatted;
    },
  },
  mounted() {
    getStations().then((data) => (this.stations = data));
  },
};
</script>

<style>
.train-type {
  display: inline-block;
  border-radius: 50%;
  min-width: 30px;
  height: 30px;
  background: black;
  color: white;
  font-size: 16px;
  line-height: 30px;
  font-weight: bold;
  text-align: center;
  padding: 6px;
}
.train-destination {
  color: black;
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
.train-track {
  color: black;
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
.train-schedule {
  color: black;
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
</style>
