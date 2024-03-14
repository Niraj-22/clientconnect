import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
});

// axiosInstance.interceptors.request.use((req) => {
//   const userData = window.localStorage.getItem("User");
//   if (userData) {
//     const user = JSON.parse(userData);
//     const token = user.token;
//     req.headers = {
//       "ngrok-skip-browser-warning": "69420",
//       Authorization: `${token}`,
//     };
//   }
//   return req;
// });

export default axiosInstance;
