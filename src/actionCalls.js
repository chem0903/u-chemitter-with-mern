import axios from "axios";

const SEVER_API = process.env.REACT_APP_SEVER_API;

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${SEVER_API}/auth/login`, user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};
