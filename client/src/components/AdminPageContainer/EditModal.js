import React, { useState, useRef } from "react";

import "./style.scss";
import useOusideClick from "../../hooks/useOusideClick";
import useInput from "../../hooks/useInput";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";

const EditModal = ({ product, updateProduct, userReducer }) => {
  const accessToken = userReducer.userInfo.token;

  const node = useRef();

  const [moduleStatus, setModalStatus] = useState(false);

  const name = useInput(product.name);
  const description = useInput(product.description);
  const price = useInput(product.price);
  const age = useInput(product.age);

  const productForm = {
    name: name.value,
    description: description.value,
    price: price.value,
    age: age.value,
  };

  useOusideClick(node, () => {
    moduleStatus && setModalStatus(false);
  });

  const modalClose = (e) => {
    e.preventDefault();
    setModalStatus(false);
  };

  return (
    <div>
      <button
        className="admin-products-buttons__edit"
        onClick={() => setModalStatus(!moduleStatus)}
      >
        EDIT
      </button>
      {moduleStatus && (
        <div className="modal-window-container">
          <div className="modal-window-container__border" ref={node}>
            <form
              onSubmit={() =>
                updateProduct(product._id, productForm, accessToken)
              }
              encType="multipart/form-data"
              className="modal-window-container__border__form"
            >
              <h1>Edit</h1>
              <p>{product.name}</p>

              <input type="text" value={name.value} {...name} />

              <textarea value={description.value} {...description} />

              <input type="text" value={price.value} {...price} />

              <input type="text" value={age.value} {...age} />

              <div className="modal-window-container__border__form__buttons">
                <button type="submit">Edit</button>
                <button onClick={(e) => modalClose(e)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
