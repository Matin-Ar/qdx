import moment from "moment";

//userRegister reducer defaults
const usersReducerDefaults = {
  name: "",
  lastname: "",
  number: null,
  email: "",
  token: null,
  isAuth: false,
  id: "",
  avatar: "",
  role: "",
  bday: "",
  education: "",
  codinglanguage: "",
  gender: "agender",
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
        id: action.payload._id,
        isAuth: true,
        avatar: {
          url: `http://localhost:3001/users/${
            action.payload._id
          }/avatar/?${moment().valueOf()}`,
        },
      };
    case "USER_LOG_OUT":
      return {
        name: "",
        lastname: "",
        number: null,
        email: "",
        token: null,
        isAuth: false,
        avatar: "",
      };
    case "USER_LOG_IN":
      return {
        name: action.name,
        lastname: action.lastname,
        number: action.number,
        email: action.email,
        token: action.token,
        isAuth: true,
        role: action.role,
        id: action._id,
        gender: action.gender,
        bday: action.bday,
        education: action.education,
        codinglanguage: action.codinglanguage,
        avatar: `http://localhost:3001/users/${
          action._id
        }/avatar/?${moment().valueOf()}`,
      };

    case "SET_CURRENT_USER":
      return {
        name: action.name,
        lastname: action.lastname,
        number: action.number,
        email: action.email,
        isAuth: true,
        role: action.role,
        gender: action.gender,
        id: action._id,
        bday: action.bday,
        education: action.education,
        codinglanguage: action.codinglanguage,
        avatar: `http://localhost:3001/users/${
          action._id
        }/avatar/?${moment().valueOf()}`,
      };

    case "SET_USER_AVATAR":
      return {
        ...state,
        avatar: action.avatar,
      };

    default:
      return state;
  }
};

export default usersReducer;
