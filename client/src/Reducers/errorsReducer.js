//userRegister reducer defaults
const errorsReducerDefaults = {
  registerErrorMsg: "",
  registersuccessMsg: "",
};

//USERS reducer
const errorsReducer = (state = errorsReducerDefaults, action) => {
  switch (action.type) {
    case "SET_REGISTER_ERROR":
      return {
        ...state,
        registerErrorMsg: action.error,
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

    default:
      return state;
  }
};

export default errorsReducer;
