import "./styles/components/App.scss";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import store from "./Store/configureStore";

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
