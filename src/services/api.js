//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "https://api-video.vercel.app",
});

export default Api;
