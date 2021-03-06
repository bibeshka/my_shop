import axios from "axios";
import urlBasic from "../../utils/UrlVar";

//get all products
export const getProducts = (
  search = "",
  searchId = "",
  page = 1,
  limit = 6
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${urlBasic}/api/v1/products?search=${search}&searchId=${searchId}&page=${page}&limit=${limit}`
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: err,
    });
  }
};

//adding product
export const addProduct = (product, authTokenStatus) => async (dispatch) => {
  const data = new FormData();
  data.append("name", product.name);
  data.append("image_upload_1", product.image_upload_1);
  data.append("image_upload_2", product.image_upload_2);
  data.append("image_upload_3", product.image_upload_3);
  data.append("description", product.description);
  data.append("age", product.age);
  data.append("price", product.price);

  try {
    const res = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/products`,
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
        "Content-Type": "application/json",
        type: "formData",
      },
      data,
    });

    dispatch({
      type: "ADD_PRODUCT",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: err,
    });
  }
};

export const updateProduct = (id, product, authTokenStatus) => async (
  dispatch
) => {
  const { name, description, age, price } = product;

  const data = {
    name,
    description,
    age,
    price,
  };

  try {
    await axios({
      method: "patch",
      url: `${urlBasic}/api/v1/products/${id}`,
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
        // 'Accept': 'application/json'
        "Content-Type": "application/json",
      },
      data,
    });
    // dispatch({
    //   type: "ADD_PRODUCT",
    //   payload: res.data,
    // });
  } catch (err) {
    dispatch({
      type: "TRANSACTION_ERROR",
      payload: err,
    });
  }
};

//deliting product only fron auth admin
export const deleteProduct = (id, authTokenStatus) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `${urlBasic}/api/v1/products/${id}`,
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
      },
    });

    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: "TRANSACTION_ERROR",
      payload: err,
    });
  }
};

export const createReview = (id, review, token) => async (dispatch) => {
  const data = {
    name: review.name,
    rating: review.rating,
    comment: review.comment,
  };
  try {
    const result = await axios({
      method: "POST",
      url: `${urlBasic}/api/v1/products/${id}/reviews`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    });

    dispatch({
      type: "ADD_REVIEW",
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
