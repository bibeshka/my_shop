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
export const getOrders = (token, search, searchId) => async (dispatch) => {
  try {
    // check if you search certan orders by NAME and return him
    if (search) {
      const res = await axios({
        method: "get",
        url: `${urlBasic}/api/v1/orders?search=${search}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "GET_ORDERS",
        payload: res.data,
      });
    } else if (searchId) {
      // check if you search certan orders by ID and return him
      const res = await axios({
        method: "get",
        url: `${urlBasic}/api/v1/orders?searchId=${searchId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "GET_ORDERS",
        payload: res.data,
      });
    } else {
      // return all orders
      const res = await axios({
        method: "get",
        url: `${urlBasic}/api/v1/orders`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "GET_ORDERS",
        payload: res.data,
      });
    }
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
