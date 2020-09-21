//CHECK LATE reverse()
import axios from "axios";

//get all products
export const getProducts = (search, page, limit) => async (dispatch) => {
  try {
    // check if you search certan products by NAME and return him
    if (search) {
      const res = await axios.get(
        `/api/v1/products?search=${search}&page=${page}&limit=${limit}`
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
        // payload: res.data.reverse(),
      });
      // return all products
    } else {
      const res = await axios.get(
        `/api/v1/products?page=${page}&limit=${limit}`
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
  // data.append({
  //   'name': name,
  //   'image_upload': image_upload,
  //   'description': description,
  //   'age': age,
  //   'price': price
  // })

  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/products",
      headers: {
        Authorization: `Bearer ${authTokenStatus}`,
        // 'Accept': 'application/json'
        "Content-Type": "application/json",
        type: "formData",
      },
      data,
      // data: {
      //   name,
      //   description,
      //   image,
      //   age,
      //   price,
      //   formData
      // }
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

//deliting product only fron auth admin
export const deleteProduct = (id, authTokenStatus) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `http://localhost:5000/api/v1/products/${id}`,
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
