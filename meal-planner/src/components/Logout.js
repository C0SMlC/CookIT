import axios from "axios";

export const handleLogoutFunction = async (e) => {
  e.preventDefault();
  console.log("logout");
  try {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });

    await axiosInstance.get("/users/logout");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error);
    } else {
      console.log("An error occurred during logout.");
    }
  }
};
