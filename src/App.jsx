import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
