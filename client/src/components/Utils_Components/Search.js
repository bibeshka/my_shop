import React, { useState } from "react";

// import * as ProductsActions from "../../store/home/actions";
import { useDispatch } from "react-redux";
import * as HeaderActions from "../../store/search/action";

const Search = () => {
  const [search, setSearch] = useState("");

  //adding redux functional
  const dispatch = useDispatch();

  const handleSetSearch = (search) => {
    dispatch(HeaderActions.setSeach(search));
  };

  return (
    <div className="search">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        onKeyDown={(e) => e.keyCode === 13 && handleSetSearch(search)}
      />
      <div className="search-btn" onClick={() => handleSetSearch(search)}>
        <i className="fas fa-search" />
      </div>
    </div>
  );
};

export default Search;
