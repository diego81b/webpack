import Axios from 'axios';

const axios = Axios.create({
  baseURL: "http://localhost:49286/api/v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});

export default axios;
