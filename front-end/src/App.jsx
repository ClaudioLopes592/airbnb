import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" user={user} element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
