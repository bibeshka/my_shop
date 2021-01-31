import { stat } from "fs";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER": {
      return action.payload;
    }
    case "LOGIN_USER":
      return action.payload;

    case "ERROR_USER":
      return action.payload;
    default:
      return state;
  }
};
