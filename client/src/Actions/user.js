import axios from "axios";

//USER_LOGIN
//USER_LOGOUT
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
      const JWT = response.data.token;
      dispatch(userRegister({ name, lastname, number, email, JWT }));
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

// axios.create({
//     headers: {
//         authorization: `Bearer `
//     }
// })
