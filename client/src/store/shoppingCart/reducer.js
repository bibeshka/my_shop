import { stat } from "fs";

const initialState = {
  basketNumber: 0,
  cart: []
}

export default(state=initialState, action) => {
  switch(action.type) {
    
    case 'ADD_TO_CART':
      const itemIndex = state.cart.findIndex(p => p._id === action.payload._id);

      if(itemIndex >= 0) {
        return {
          ...state,
          basketNumber: state.basketNumber + 1, //check later try to change
          ...state.cart[itemIndex].amount += 1 
        }
      }
      
      return {
        ...state,
        basketNumber: state.basketNumber + 1, //check later try to change
        cart: [...state.cart, { ...action.payload, amount: 1 }]
      }

    case 'UPDATE_AMOUNT': {
      if(action.amount <= 0) {
        return state;
      }

      const itemIndex = state.cart.findIndex(p => p._id === action.id);
      
      return {
        ...state,
        basketNumber: state.basketNumber + 1, //check later try to change
        ...state.cart[itemIndex].amount = Number(action.amount)
      }
    }
    
    case 'DELETE_FROM_CART': {
      // get idex from all items we keep
      const itemIndex = state.cart.filter(p => p._id !== action.id);

      //get index from item we wand to delete
      const deleteItemIndex = state.cart.filter(p => p._id === action.id)

      if (itemIndex[0]) {//check later try to change
        return {
          basketNumber: state.basketNumber  - deleteItemIndex[0].amount, 
          cart: [...itemIndex]
        };
      }

      return {
        basketNumber: 0,//check later try to change
        cart: [...itemIndex]
      };

    }
    
    default:  
      return state;
  }
}