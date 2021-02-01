const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER": {
      return action.payload;
    }
    case "LOGIN_USER":
      return action.payload;
    case "LOGOUT_USER":
      return action.payload;
    case "ERROR_USER":
      return action.payload;
    default:
      return state;
  }
};
