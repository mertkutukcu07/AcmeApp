import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://novel-project-ntj8t.ampt.app/",
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         // 401 handling
//         return axiosInstance.request(error.config);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
