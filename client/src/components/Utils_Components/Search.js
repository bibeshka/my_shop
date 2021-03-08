import React, { useState } from "react";

// import * as ProductsActions from "../../store/home/actions";
import { useDispatch } from "react-redux";
import * as HeaderActions from "../../store/search/action";

import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [search, setSearch] = useState("");

  //adding redux functional
  const dispatch = useDispatch();

  const handleSetSearch = (search) => {
    dispatch(HeaderActions.setSeach(search));
  };

  const debouncedSearch = useDebounce(handleSetSearch, 700);

  const onChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="search">
      {/* onKeyDown={(e) => e.keyCode === 13 && handleSetSearch(search)} */}
      <input type="text" onChange={onChange} placeholder="Search..." />
      <div className="search-btn" onClick={() => handleSetSearch(search)}>
        <i className="fas fa-search" />
      </div>
    </div>
  );
};

export default Search;
