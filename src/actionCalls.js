import axios from "axios"

export const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("https://u-chemitter-with-mern-in-backend.onrender.com/api/auth/login", user)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
        dispatch({ type: "LOGIN_ERROR", payload: err })
    }
}