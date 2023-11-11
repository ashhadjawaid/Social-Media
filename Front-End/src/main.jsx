import React from 'react'
import App from './App.jsx'
import * as ReactDOM from "react-dom/client";
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <App/>
    </AuthContextProvider>
  </React.StrictMode>
);
