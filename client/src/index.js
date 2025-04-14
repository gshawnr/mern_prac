import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from "./reportWebVitals";

import App from "./screens/App";
import Agents from "./screens/Agents";
import Properties from "./screens/Properties";
import PropertyView from "./screens/PropertyView";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
