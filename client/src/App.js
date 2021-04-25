import "./styles/components/App.scss";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import store from "./Store/configureStore";
import { QueryClient, QueryClientProvider } from "react-query";

const mystore = store();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === "production",
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
    },
  },
});

function App() {
  return (
    <Provider store={mystore}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </div>
    </Provider>
  );
}

export default App;
