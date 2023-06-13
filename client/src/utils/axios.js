import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlicer";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
  //mudar baseURL: "/api/v1"
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
