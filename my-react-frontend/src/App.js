import "./App.css";
import React from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./router";
import Header from "./components/Header/Header";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <RouterProvider router={router}>
        <Router>
          <Header />
        </Router>
      </RouterProvider>
    </BrowserRouter>
  );
}

export default App;
