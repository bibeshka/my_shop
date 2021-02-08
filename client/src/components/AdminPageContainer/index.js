import React from "react";
import "./style.scss";

import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import OrderList from "./OrderList";

const AdminContainer = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <div className="adding-product-form">
          <AddProductForm />
        </div>
        <div className="admin-product-list">
          <ProductList />
        </div>
        <div className="admin-order-list">
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
