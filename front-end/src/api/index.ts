const axios = require("axios");

export async function makeRequest(path: string) {
  //sends request to back-end
  return axios.get(path);
}
