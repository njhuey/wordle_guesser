import React from "react";
const axios = require("axios");

export async function makeRequest(path: string) {
  return axios.get(path);
}
