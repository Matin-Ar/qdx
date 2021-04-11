import "./styles/components/App.scss";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import store from "./Store/configureStore";
// import usersReducer from "./Reducers/authentication";
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const mystore = store();

function App() {
  return (
    <Provider store={mystore}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
