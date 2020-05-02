const initialState = {
  cart: []
}

export default(state=initialState, action) => {
  switch(action.type) {
    
    case 'ADD_TO_CART':
      const itemIndex = state.cart.findIndex(p => p._id === action.payload._id);

      if(itemIndex >= 0) {
        return {
          ...state,
          ...state.cart[itemIndex].amount += 1 
        }
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, amount: 1 }]
      }

    case 'UPDATE_AMOUNT': {
      if(action.amount <= 0) {
        return state;
      }

      const itemIndex = state.cart.findIndex(p => p._id === action.id);
      
      return {
        ...state,
        ...state.cart[itemIndex].amount = Number(action.amount)
      }
    }
    
    case 'DELETE_FROM_CART': {
      const itemIndex = state.cart.filter(p => p._id !== action.id);

      return {
        cart: [...itemIndex]
      };
    }
    
    default:  
      return state;
  }
}