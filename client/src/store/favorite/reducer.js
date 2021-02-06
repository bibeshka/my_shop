const initialState = {
  favorite: localStorage.getItem("t_shop-favorite")
    ? JSON.parse(localStorage.getItem("t_shop-favorite"))
    : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      //find element which you choose
      const itemIndex = state.favorite.findIndex(
        (p) => p._id === action.payload._id
      );

      //delete from favorite if item already in favorite
      if (itemIndex >= 0) {
        const otherImtes = state.favorite.filter(
          (p) => p._id !== action.payload._id
        );

        localStorage.setItem(
          "t_shop-favorite",
          JSON.stringify([...otherImtes])
        );
        return {
          favorite: [...otherImtes],
        };
      }

      localStorage.setItem(
        "t_shop-favorite",
        JSON.stringify([...state.favorite, action.payload])
      );

      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };

    default:
      return state;
  }
};
