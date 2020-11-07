import axios from "axios";
import urlBasic from "./UrlVar";

//addin order in data base
export const addOrder = async (e, data, authToken) => {
  e.preventDefault();
  try {
    const result = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/orders`,
      data,
    });

    return result;
  } catch (error) {
    return error;
  }
};

//logout from admdin auth
export const logoutAcc = async (authTokenStatus) => {
  try {
    const result = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/admin/logout`,
      headers: { Authorization: `Bearer ${authTokenStatus}` },
      token: authTokenStatus,
    });

    sessionStorage.removeItem("jwt");
    window.location = "/";

    return result;
  } catch (error) {
    console.log(error);
  }
};
