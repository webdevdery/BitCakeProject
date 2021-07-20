import "./App.css";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
        <Routes />
      <ToastContainer autoClose={5000} hideProgressBar />
    </div>
  );
}

export default App;
