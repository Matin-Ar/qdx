import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import usersReducer from "../Reducers/authentication";
import errorsReducer from "../Reducers/errorsReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //store Creation
  const store = createStore(
    combineReducers({
      errorMsg: errorsReducer,
      user: usersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
