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
        <template v-if="findDeparture(train.timeTableRows)">
          <span class="train-type">{{
            train.commuterLineID ? train.commuterLineID : train.trainType
          }}</span>
          <span class="train-destination" v-if="train.timeTableRows.length">
            {{
              train.timeTableRows[train.timeTableRows.length - 1]
                .stationShortCode
            }}
          </span>
          <span class="train-track">
            {{ findDeparture(train.timeTableRows).commercialTrack }}
          </span>
          <span class="train-schedule">
            {{ formatDate(findDeparture(train.timeTableRows).scheduledTime) }}
          </span>
          <span class="train-schedule">
            {{ formatTime(findDeparture(train.timeTableRows).scheduledTime) }}
          </span>
        </template>
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
    findDeparture(timetable) {
      let departure = timetable.find(
        (el) =>
          el.stationShortCode == this.departureStation && el.type == "DEPARTURE"
      );
      return departure;
    },
    formatDate(value) {
      let formatted = new Date(value).toLocaleDateString("fi-fi");
      return formatted;
    },
    formatTime(value) {
      let formatted = new Date(value).toLocaleTimeString("fi-fi", {
        hour: "2-digit",
        minute: "2-digit",
      });
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
