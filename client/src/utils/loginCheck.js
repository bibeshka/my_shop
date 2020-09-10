const authTokenStatus = sessionStorage.getItem("jwt");
const authTokenStatusLS = localStorage.getItem("jwt");

//checking if admin user still auth
export const loginCheck = () => {
  if (!authTokenStatus || !authTokenStatusLS) {
    window.location = "/login";
  }
};
