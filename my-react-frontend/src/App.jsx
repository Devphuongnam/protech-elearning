import "./App.css";
import React from "react";
import Login from "./Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Login/Signup";
import Home from "./Home";
import Header from "./components/Header/header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/header" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
