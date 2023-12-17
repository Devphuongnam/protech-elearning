import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8081/login", {
      email,
      password,
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: "LOGIN_ERROR", payload: "Login failed" });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:8081/logout");
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
