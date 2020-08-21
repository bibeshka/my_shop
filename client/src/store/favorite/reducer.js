const initialState = {
  favorite: []
}

export default(state=initialState, action) => {
  switch(action.type) {
    
    case 'ADD_TO_FAVORITE':
      //find element which you choose
      const itemIndex = state.favorite.findIndex(p => p._id === action.payload._id);
      
      //delete from favorite if item already in favorite
      if(itemIndex >= 0) {
        const otherImtes = state.favorite.filter(p => p._id !== action.payload._id);
        return {
          favorite: [...otherImtes]
        };
      }
      
      return {
        ...state,
        favorite: [...state.favorite, action.payload]
      }
    
    default:  
      return state;
  }
}