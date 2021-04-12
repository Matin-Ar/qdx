import axios from "axios";
import { setRegisterError } from "./errors";

//USER_LOGOUT
//USER_LOGIN
//USER_GET_ALL
//USER_DELETE
//SET_REGISTER_ERROR

//USER_REGISTER
export const userRegister = (payload) => ({
  type: "USER_REGISTER",
  payload,
});

//START_USER_REGISTER
export const starUserRegister = (payload) => (dispatch) => {
  const { name, lastname, number, email, password } = payload;
  return axios
    .post("/users/singup", { name, lastname, number, email, password })
    .then(
      (response) => {
        const token = response.data.token;
        console.log(response.data);
        dispatch(userRegister({ name, lastname, number, email, token }));
        return "ثبت نام موفق";
      },
      (error) => {
        console.log(error.response);

        if (error.response.data.name === "MongoError") {
          dispatch(setRegisterError(error.response.data.name));
          return "registerError";
        } else {
          dispatch(setRegisterError(error.response.data.message));
          return "registerError";
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
  return axios.post("/users/login", { email, password }).then(
    (resp) => {
      console.log(resp.data);
    },
    (error) => console.log(error.response)
  );
};
