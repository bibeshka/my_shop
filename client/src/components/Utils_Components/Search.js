import React, { useState } from "react";

import * as ProductsActions from "../../store/home/actions";
import { useDispatch } from "react-redux";

const Search = () => {
  const [search, setSearch] = useState("");

  //adding redux functional
  const dispatch = useDispatch();

  const handleGetProducts = (search) => {
    dispatch(ProductsActions.getProducts(search));
  };

  return (
    <div className="search">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && handleGetProducts(search)}
      />
      <div className="search-btn" onClick={() => handleGetProducts(search)}>
        <i className="fas fa-search" />
      </div>
    </div>
  );
};

export default Search;
