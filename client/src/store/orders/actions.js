import axios from "axios";
import urlBasic from "../../utils/UrlVar";

export const addOrder = (e, data) => async (dispatch) => {
  e.preventDefault();
  try {
    const result = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/orders`,
      data,
    });

    dispatch({
      type: "ADD_ORDER",
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
      payload: err,
    });
  }
};

//get orders only for auth admin
export const getOrders = (token, search = "", searchId = "") => async (
  dispatch
) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${urlBasic}/api/v1/orders?search=${search}&searchId=${searchId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "GET_ORDERS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ORDER_ERROR",
      payload: err,
    });
  }
};

//delete order only for auth admin
export const deleteOrder = (id, authTokenStatus) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `${urlBasic}/api/v1/orders/${id}`,
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
      },
    });

    dispatch({
      type: "DELETE_ORDER",
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: "TRANSACTION_ERROR",
      payload: err,
    });
  }
};
