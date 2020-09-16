export const setSeach = (search) => (dispatch) => {
  dispatch({
    type: "SET_SEARCH",
    payload: search,
  });
};
