const initialState = {
  orders: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case 'ORDER_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}