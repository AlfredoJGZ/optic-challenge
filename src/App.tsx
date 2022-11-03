import { Provider } from "./components/Provider";
import Map from "./components/Map";
import "./styles/app.scss";

const App = () => {
  return (
    <Provider>
      <Map />
    </Provider>
  );
};

export default App;
