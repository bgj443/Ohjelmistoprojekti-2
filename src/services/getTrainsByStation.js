const API_BASE_PATH = "https://rata.digitraffic.fi/api/v1";

function getTrainsByStation(station) {
  let API_PATH = "/live-trains/station";
  let requestUrl = API_BASE_PATH + API_PATH + "/" + station;
  console.log(requestUrl);
  return fetch(requestUrl).then((response) => response.json());
}

export default getTrainsByStation;
