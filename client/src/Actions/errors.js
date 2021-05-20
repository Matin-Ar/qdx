//setRegisterError

//SET_REGISTER_ERROR
export const setRegisterError = (error) => ({
  type: "SET_REGISTER_ERROR",
  error,
});

//startSetRegisterError
export const startSetRegisterError = (errors) => {
  return (dispatch) => {
    //turning the object into an array and storing it in the store
    dispatch(setRegisterError(errors));
  };
};

//SET_REGISTER_Success
export const setRegisterSuccess = (msg) => ({
  type: "SET_REGISTER_SUCCESS",
  msg,
});

//Clear ALL errors
export const clearAllErrors = () => ({
  type: "CLEAR_ALL_ERRORS",
});

//Clear Register MSg
export const clearRegisterMsg = () => ({
  type: "CLEAR_REGISTER_MSG",
});

//set Login success MSg
export const setLoginSuccessMsg = (msg) => ({
  type: "SET_LOGIN_SUCCESS",
  msg,
});

//set Login Error MSg
export const setLoginErrorMsg = (error) => ({
  type: "SET_LOGIN_ERROR",
  error,
});

//Clear Login MSg
export const clearLoginErrorMsg = () => ({
  type: "CLEAR_LOGIN_ERROR_MSG",
});
