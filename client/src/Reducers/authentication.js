//userRegister reducer defaults
const usersReducerDefaults = {
  name: "",
  lastname: "",
  number: null,
  email: "",
  token: null,
};

//USERS reducer
const usersReducer = (state = usersReducerDefaults, action) => {
  switch (action.type) {
    case "USER_REGISTER":
      return {
        ...state,
        name: action.payload.name,
        lastname: action.payload.lastname,
        number: action.payload.number,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "USER_LOG_OUT":
      return {
        name: "",
        lastname: "",
        number: null,
        email: "",
        token: null,
      };
    case "USER_LOG_IN":
      return {
        name: action.name,
        lastname: action.lastname,
        number: action.number,
        email: action.email,
        token: action.token,
      };

    default:
      return state;
  }
};

export default usersReducer;
