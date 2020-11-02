//CHECK LATE reverse()
import axios from "axios";
import urlBasic from "../../utils/UrlVar";

//get all products
export const getProducts = (search, page, limit) => async (dispatch) => {
  try {
    // check if you search certan products by NAME and return him
    if (search) {
      const res = await axios.get(
        `${urlBasic}/api/v1/products?search=${search}&page=${page}&limit=${limit}`
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
        // payload: res.data.reverse(),
      });
      // return all products
    } else {
      const res = await axios.get(
        `${urlBasic}/api/v1/products?page=${page}&limit=${limit}`
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
        // payload: res.data.reverse(),
      });
    }
  } catch (err) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: err,
    });
  }
};

//adding product
export const addProduct = (product, authTokenStatus) => async (dispatch) => {
  //destructering data and appending them to form
  const { name, description, age, price, image_upload } = product;

  const data = new FormData();
  data.append("name", name);
  data.append("image_upload", image_upload);
  data.append("description", description);
  data.append("age", age);
  data.append("price", price);

  // const data = {
  //   name,
  //   image_upload,
  //   description,
  //   age,
  //   price,
  // };

  try {
    const res = await axios({
      method: "post",
      url: `${urlBasic}/api/v1/products`,
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
        // 'Accept': 'application/json'
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
    console.log(product.name);
    const res = await axios({
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
