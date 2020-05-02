const authTokenStatus = sessionStorage.getItem('jwt');
const authTokenStatusLS = localStorage.getItem('jwt');

export const loginCheck = () => {
  if(!authTokenStatus || !authTokenStatusLS) {
    window.location = "/login";
  }
}