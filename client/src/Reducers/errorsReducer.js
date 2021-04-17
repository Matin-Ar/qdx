//userRegister reducer defaults
const errorsReducerDefaults = {
  registerErrorMsg: [],
  registersuccessMsg: "",
  loginSuccess: "",
  loginError: "",
};

//USERS reducer
const errorsReducer = (state = errorsReducerDefaults, action) => {
  switch (action.type) {
    case "SET_REGISTER_ERROR":
      return {
        ...state,
        registerErrorMsg: [...state.registerErrorMsg, ...action.error],
      };

    case "SET_REGISTER_SUCCESS":
      return {
        ...state,
        registersuccessMsg: action.msg,
      };

    case "CLEAR_ALL_ERRORS":
      return {
        ...errorsReducerDefaults,
      };

    case "CLEAR_REGISTER_MSG":
      return {
        ...state,
        registerErrorMsg: "",
        registersuccessMsg: "",
      };

    case "SET_LOGIN_SUCCESS":
      return {
        ...state,
        loginSuccess: action.msg,
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        loginError: action.error,
      };

    case "CLEAR_LOGIN_ERROR_MSG":
      return {
        ...state,
        loginError: "",
      };

    default:
      return state;
  }
};

export default errorsReducer;
