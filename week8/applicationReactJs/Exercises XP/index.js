import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // ✅ مهم
import App from "./App";
import store from "./redux/store"; // ✅ استورد الـ store ديالك

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
