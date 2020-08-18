import axios from 'axios';

export const addOrder = async (e ,data, authToken) => {
  e.preventDefault();
  try {
    const result = await axios({
      method: 'post',
      url:'http://localhost:5000/api/v1/orders',
      data
    })

    return result;
  } catch(error) {
      console.log(error);
  }
}

export const logoutAcc = async (authTokenStatus) => {
  try {
    const result = await axios({
      method: 'post',
      url:'http://localhost:5000/api/v1/admin/logout',
      headers: { 'Authorization' : `Bearer ${authTokenStatus}`},
      token: authTokenStatus
    });

    sessionStorage.removeItem('jwt');
    window.location="/";

    return result;
  } catch(error) {
      console.log(error);
  }
}