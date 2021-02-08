import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";
import "./style.scss";

import AdminNavigation from "./AdminNavigation";

const AddProductForm = ({ addProduct, userReducer }) => {
  const accessToken = userReducer.userInfo.token;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image_upload_1: null,
    image_upload_2: null,
    image_upload_3: null,
    price: "",
    age: "",
  });

  return (
    <div className="admin-page">
      <AdminNavigation />
      <div className="admin-page-container">
        <div className="adding-product-form">
          <div className="adding-product-form-container">
            <h3>Add product</h3>
            <form
              onSubmit={() => addProduct(product, accessToken)}
              encType="multipart/form-data"
            >
              <input
                type="text"
                className="adding-product-form__name"
                placeholder="Enter Name"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <br />
              <textarea
                type="text"
                className="adding-product-form__description"
                placeholder="Enter Description"
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
              <br />
              <input
                type="file"
                className="adding-product-form__image_upload"
                onChange={(e) =>
                  setProduct({ ...product, image_upload_1: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                className="adding-product-form__image_upload"
                onChange={(e) =>
                  setProduct({ ...product, image_upload_2: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                className="adding-product-form__image_upload"
                onChange={(e) =>
                  setProduct({ ...product, image_upload_3: e.target.files[0] })
                }
              />
              <br />
              <input
                type="text"
                className="adding-product-form__price"
                placeholder="Enter Price"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                className="adding-product-form__age"
                placeholder="Enter Age"
                onChange={(e) =>
                  setProduct({ ...product, age: e.target.value })
                }
              />
              <br />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
