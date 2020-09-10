import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <div className="admin-page-navigation">
      <div className="admin-page-navigation__container">
        <Link to="/admin">Add Product</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
    </div>
  );
};

export default AdminNavigation;
