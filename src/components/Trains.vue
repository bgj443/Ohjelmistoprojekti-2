<template>
  <div>
    <select v-model="departureStation" @change="refreshTrains">
      <option selected disabled>Valitse lähtöasema</option>
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
        <span class="train-destination" v-if="train.timeTableRows.length">{{
          train.timeTableRows[train.timeTableRows.length - 1].stationShortCode
        }}</span>
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
      headers: [
        { text: "Train number", align: "left", value: "trainNumber" },
        { text: "Train type", align: "left", value: "trainType" },
      ],
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
</style>
