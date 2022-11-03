// import Input from "./components/Input";
import { Provider } from "./components/Provider";
import Map from "./components/Map";
import Card from "./components/Card";
import "./styles/app.scss";

const App = () => {
  return (
    <Provider>
      <Map />
    </Provider>
  );
};

export default App;
