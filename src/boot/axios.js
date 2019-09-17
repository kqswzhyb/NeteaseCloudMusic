import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
