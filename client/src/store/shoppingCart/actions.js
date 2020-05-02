export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      ...product,
      amount: 1
    }
  }
}

export const updateAmount = (id, amount) => {
  return {
    type: 'UPDATE_AMOUNT',
    id,
    amount
  }
}

export const removeFromCart = (id) => {
  return {
    type: 'DELETE_FROM_CART',
    id
  }
}