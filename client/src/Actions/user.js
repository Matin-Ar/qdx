import axios from "axios";
import setAutherizationToken from "../utils/setAutherizationToken";
import moment from "moment";
import {
  startSetRegisterError,
  clearAllErrors,
  setLoginSuccessMsg,
  setRegisterSuccess,
  clearRegisterMsg,
} from "./errors";

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
  const { name, lastname, number, email, password, _id, code } = payload;

  return axios
    .post("api/users/singup", { name, lastname, number, email, password, code })

    .then(
      (response) => {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setAutherizationToken(token);
        dispatch(userRegister({ name, lastname, number, email, token, _id }));
        const successTxt = "ثبت نام موفق";
        dispatch(setRegisterSuccess(successTxt));
        setTimeout(() => {
          dispatch(clearRegisterMsg());
        }, 5000);
        return successTxt;
      },
      (error) => {
        // dispatch(startSetRegisterError(error.response.data.error));
        return error.response.data.error;
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
  dispatch(clearAllErrors());
  axios.post("/api/users/logout");
  setAutherizationToken();
  localStorage.removeItem("jwtToken");

  return axiosAuth.post("/api/users/logout").then(
    () => console.log("user logged out"),
    (e) => console.log("there was a error logging out")
  );
};

//USER_LOGIN
export const userLogIn = ({
  name,
  lastname,
  number,
  email,
  token,
  _id,
  role,
  gender,
  codinglanguage,
  education,
}) => ({
  type: "USER_LOG_IN",
  name,
  lastname,
  number,
  email,
  token,
  _id,
  role,
  gender,
  codinglanguage,
  education,
});

//startUserLogin
export const startUserLogIn =
  ({ email, password }) =>
  (dispatch) => {
    return axios.post("/api/users/login", { email, password }).then(
      (resp) => {
        const token = resp.data.token;
        setAutherizationToken(token);
        localStorage.setItem("jwtToken", token);
        dispatch(setLoginSuccessMsg("ورود با موفقیت"));
        const user = resp.data.user;
        dispatch(userLogIn({ token, ...user }));

        return resp;
      },
      (error) => {
        console.log("error from startUserLogin Catch:", error);
        return "ایمیل و یا رمز عبور وارد شده صحیح نمی باشد";
      }
    );
  };

export const SetCurrentUser = ({
  name,
  lastname,
  number,
  email,
  _id,
  role,
  bday,
  education,
  codinglanguage,
  gender,
}) => ({
  type: "SET_CURRENT_USER",
  name,
  lastname,
  number,
  email,
  _id,
  role,
  bday,
  education,
  codinglanguage,
  gender,
});

export const startSetCurrentUser = () => (dispatch) => {
  axios.get("/api/users/me").then(
    (resp) => {
      dispatch(SetCurrentUser(resp.data));
    },
    (error) => console.log("there was a error in setting current user", error)
  );
};

export const setUserAvatar = (avatar) => ({
  type: "SET_USER_AVATAR",
  avatar,
});

export const startSetUserAvatar = (file, userId) => (dispatch) => {
  let formData = new FormData();
  formData.append("avatar", file);
  return axios({
    url: "/api/users/me/avatar",
    method: "POST",
    data: formData,
  })
    .then((res) => {
      dispatch(
        setUserAvatar(`api//users/${userId}/avatar/?${moment().valueOf()}`)
      );

      return res.status;
    })
    .catch((err) => {
      return err;
    });
};
