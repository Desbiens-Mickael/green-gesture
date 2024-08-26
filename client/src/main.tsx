import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./styles/globals.css";
import App from "./App";
import client from "./gql/client";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Toaster />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
