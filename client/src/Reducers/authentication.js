//userRegister reducer defaults
const usersReducerDefaults = {
  name: "",
  lastname: "",
  number: null,
  email: "",
  token: null,
  isAuth: false,
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
        isAuth: true,
      };
    case "USER_LOG_OUT":
      return {
        name: "",
        lastname: "",
        number: null,
        email: "",
        token: null,
        isAuth: false,
      };
    case "USER_LOG_IN":
      return {
        name: action.name,
        lastname: action.lastname,
        number: action.number,
        email: action.email,
        token: action.token,
        isAuth: true,
      };

    case "SET_CURRENT_USER":
      return {
        name: action.name,
        lastname: action.lastname,
        number: action.number,
        email: action.email,
        isAuth: true,
      };

    default:
      return state;
  }
};

export default usersReducer;
