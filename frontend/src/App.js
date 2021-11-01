import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./navigation/Navigation";
import Routes from "./routes/Routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
