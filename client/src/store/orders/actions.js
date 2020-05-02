import axios from 'axios';

export const getOrders = (authTokenStatus, search, searchId) => async dispatch => {
  try {
    if(search) {
      const res = await axios({
        method: 'get',
        url: `http://localhost:5000/api/v1/orders?search=${search}`,
        headers: { 
          'Authorization' : `Bearer ${authTokenStatus}`
        },
      });
  
      dispatch({
        type: "GET_ORDERS",
        payload: res.data
      });
    } else if(searchId) {
        const res = await axios({
          method: 'get',
          url: `http://localhost:5000/api/v1/orders?searchId=${searchId}`,
          headers: { 
            'Authorization' : `Bearer ${authTokenStatus}`
          },
        });
    
        dispatch({
          type: "GET_ORDERS",
          payload: res.data
        });
    } else {
        // const res = await axios.get('http://localhost:5000/api/v1/products');
        const res = await axios({
          method: 'get',
          url: 'http://localhost:5000/api/v1/orders',
          headers: { 
            'Authorization' : `Bearer ${authTokenStatus}`
          },
        });

        dispatch({
          type: "GET_ORDERS",
          payload: res.data
        });
    }
  } catch(err) {
      dispatch({
        type: "ORDER_ERROR",
        payload: err
      });
  }
}

export const deleteOrder = (id, authTokenStatus) => async dispatch => {
  try {
    await axios({
      method: 'delete',
      url: `http://localhost:5000/api/v1/orders/${id}`,
      headers: { 
        'Authorization' : `Bearer ${authTokenStatus}`
      },
    });

    dispatch({
      type: 'DELETE_ORDER',
      payload: id
    });

  } catch(err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err
      });
  }
}