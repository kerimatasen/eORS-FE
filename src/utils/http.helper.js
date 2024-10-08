import axios from "axios";
import config from "../config";

const url = (endpoint) => {
  return `${config.apiUrl}/${endpoint}`;
};

const get = (endpoint) => {
  return axios
    .get(url(endpoint), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((res) => res.data);
};

const post = (endpoint, data = {}) => {
  return axios
    .post(url(endpoint), data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export { post, get };
