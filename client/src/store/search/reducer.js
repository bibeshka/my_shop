const initialState = {
  searchHeader: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      return {
        searchHeader: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
