import axios from "axios";

axios.defaults.baseURL = "http://10.7.7.31:4000";

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
