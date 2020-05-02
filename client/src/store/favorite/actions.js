export const addToFavorite = (product) => {
  return {
    type: 'ADD_TO_FAVORITE',
    payload: {
      ...product,
    }
  }
}