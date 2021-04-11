import axios from "axios";
//USER_LOGOUT
//USER_LOGIN
//USER_GET_ALL
//USER_DELETE
//SET_REGISTER_ERROR

export const setRegisterError = (error) => ({
  type: "SET_REGISTER_ERROR",
  error,
});

//USER_REGISTER
export const userRegister = (payload) => ({
  type: "USER_REGISTER",
  payload,
});

export const starUserRegister = (payload) => (dispatch) => {
  const { name, lastname, number, email, password } = payload;
  axios.post("/users/singup", { name, lastname, number, email, password }).then(
    (response) => {
      const token = response.data.token;
      console.log(response.data);
      dispatch(userRegister({ name, lastname, number, email, token }));
    },
    (error) => {
      console.log(error.response);

      if (error.response.data.name === "MongoError") {
        dispatch(setRegisterError(error.response.data.name));
      } else {
        dispatch(setRegisterError(error.response.data.message));
      }
    }
  );
};

//USER_LOGOUT
export const userLogOut = () => ({
  type: "USER_LOG_OUT",
});

//StartUSERLOGOUT
export const startUserLogOut = (token) => (dispatch) => {
  const axiosAuth = axios.create({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  dispatch(userLogOut());

  return axiosAuth.post("/users/logout").then(
    () => console.log("user logged out"),
    (e) => console.log("there was a error logging out")
  );
};

//USER_LOGIN
export const userLogIn = (name, lastname, number, email, token) => ({
  type: "USER_LOG_IN",
  name,
  lastname,
  number,
  email,
  token,
});

//startUserLogin
export const startUserLogIn = ({ email, password }) => (dispatch) => {
  axios.post("/users/login", { email, password }).then(
    (resp) => {
      console.log(resp.data);
    },
    (error) => console.log(error.response)
  );
};

// export const starUserRegister = (props) => (dispatch) => {
//   const { name, lastname, number, email, password } = props;
//   axios
//     .post(
//       "http://localhost:3001/users/singup",
//       { "Content-Type": "application/json" },
//       { name, lastname, number, email, password }
//     )
//     .then((response) => {
//       console.log(response.data.token);
//       console.log("inside the axios response");
//       console.log("inside the axios dispatch for userRegister");
//     })
//     .catch((e) => console.log(e.massage));

//   return dispatch(userRegister(props));
// };

// export const starUserRegister = () => ({
//   name,
//   lastname,
//   number,
//   email,
//   password,
// }) => {
//   axios
//     .post(
//       "localhost:3001/users/singup",
//       { "Content-Type": "application/json" },
//       {
//         name,
//         lastname,
//         number,
//         email,
//         password,
//       }
//     )
//     .then((res) => {
//       console.log(res.data.massage);
//     })
//     .catch((e) => console.log(e.massage));

//   return (dispatch) => {
//     return dispatch(userRegister(name, lastname, number, email, password));
//   };
// };
