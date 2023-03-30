import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home";
import SingleDog from "../components/singleDog";
import React from "react";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path=":name" element={<SingleDog />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
