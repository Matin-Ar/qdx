//setRegisterError

//SET_REGISTER_ERROR
export const setRegisterError = (error) => ({
  type: "SET_REGISTER_ERROR",
  error,
});

//SET_REGISTER_Success
export const setRegisterSuccess = (msg) => ({
  type: "SET_REGISTER_SUCCESS",
  msg,
});

//Clear ALL errors
export const clearAllErrors = () => ({
  type: "CLEAR_ALL_ERRORS",
});
