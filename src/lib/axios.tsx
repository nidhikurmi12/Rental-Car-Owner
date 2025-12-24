import axios from "axios";
import EnvVars from "../config/EnVars.conf";
const Request = axios.create({
  baseURL: EnvVars.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

Request.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("token")
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

export default Request;

