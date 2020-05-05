const initialState = {
  products: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'PRODUCT_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}