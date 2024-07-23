import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./src/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./src/assets/scss/argon-dashboard-react.scss";

import App from "./src/App";
import { AuthProvider } from "./src/context/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
