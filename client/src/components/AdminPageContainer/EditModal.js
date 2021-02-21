import React, { useState } from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";

const EditModal = ({ product, updateProduct, userReducer }) => {
  const accessToken = userReducer.userInfo.token;

  const [moduleStatus, setModalStatus] = useState(false);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [age, setAge] = useState(product.age);

  const productForm = {
    name,
    description,
    price,
    age,
  };

  return (
    <div>
      <button
        className="admin-products-buttons__edit"
        onClick={() => setModalStatus(!moduleStatus)}
      >
        EDIT
      </button>
      {moduleStatus ? (
        <div className="modal-window-container">
          <div className="modal-window-container__border">
            <form
              onSubmit={() =>
                updateProduct(product._id, productForm, accessToken)
              }
              encType="multipart/form-data"
              className="modal-window-container__border__form"
            >
              <h1>Edit</h1>
              <p>{product.name}</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="modal-window-container__border__form__buttons">
                <button type="submit">Edit</button>
                <button onClick={() => setModalStatus(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
