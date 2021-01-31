import axios from "axios";
import urlBasic from "../../utils/UrlVar";

export const createUser = (username, email, password) => async (dispatch) => {
  const data = {
    name: username,
    email: email,
    password: password,
  };

  try {
    const result = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/user`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    dispatch({
      type: "CREATE_USER",
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_USER",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const data = {
    email,
    password,
  };

  try {
    const result = await axios({
      method: "POST",
      url: `${urlBasic}/api/v1/user/login`,
      data,
    });

    dispatch({
      type: "LOGIN_USER",
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_USER",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
