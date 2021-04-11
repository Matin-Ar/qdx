//userRegister reducer defaults
const usersReducerDefaults = {
  name: "",
  lastname: "",
  number: null,
  email: "",
  JWT: null,
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
        JWT: action.payload.JWT,
      };

    default:
      return state;
  }
};

export default usersReducer;
