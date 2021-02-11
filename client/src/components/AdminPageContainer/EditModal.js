import React, { useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";

const EditModal = ({ product, updateProduct }) => {
  const [moduleStatus, setModalStatus] = useState(false);

  const authTokenStatus = sessionStorage.getItem("jwt");

  const [productForm, setProductForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    age: product.age,
  });

  const modalShow = () => {
    moduleStatus === false ? setModalStatus(true) : setModalStatus(false);
  };

  return (
    <div>
      <button
        className="admin-products-buttons__edit"
        onClick={() => modalShow()}
      >
        EDIT
      </button>
      {moduleStatus ? (
        <div className="modal-window-container">
          <div className="modal-window-container__border">
            <form
              onSubmit={() =>
                updateProduct(product._id, productForm, authTokenStatus)
              }
              encType="multipart/form-data"
              className="modal-window-container__border__form"
            >
              <h1>Edit</h1>
              <p>{product.name}</p>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
              />
              <textarea
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
              />
              <input
                type="text"
                value={productForm.age}
                onChange={(e) =>
                  setProductForm({ ...productForm, age: e.target.value })
                }
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
