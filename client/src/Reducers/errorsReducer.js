//userRegister reducer defaults
const errorsReducerDefaults = {
  registerErrorMsg: "",
};

//USERS reducer
const errorsReducer = (state = errorsReducerDefaults, action) => {
  switch (action.type) {
    case "SET_REGISTER_ERROR":
      return {
        ...state,
        registerErrorMsg: action.error,
      };

    default:
      return state;
  }
};

export default errorsReducer;
