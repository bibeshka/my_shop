export const errorHandler = (setErrorMessage, message) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);
};
