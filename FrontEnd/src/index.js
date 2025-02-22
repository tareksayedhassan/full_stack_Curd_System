import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import Index from "./common/Index";
import Router from "./Router/Router";
import { Provider } from "react-redux";
import Store from "./Store/Index";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={Router}>
        <Index />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
