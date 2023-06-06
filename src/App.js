import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Landing/Home";
import About from "./pages/Landing/About";
import Contact from "./pages/Landing/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SideBar from "./components/SideBar";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { AppContext } from "./context/ContextProvider";
import { AuthContextProvider } from "./context/AuthContext";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import { firestore } from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const navigate = useNavigate();
  const dataUsers = JSON.parse(localStorage.getItem("userData"));
  const [product, setProduct] = useState([]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const colRef = collection(firestore, `${userEmail.email}.product`);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let product = [];
        snapshot.forEach((item) => {
          product.push({ ...item.data(), id: item.id });
        });
        setProduct(product);
      })
      .catch((err) => {
        console.log(err.message);
      });
    onSnapshot(colRef);
  });

  if (!dataUsers.token) {
    return (
      <AuthContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthContextProvider>
    );
  }
  return (
    <AppContext.Provider value={{ product, setProduct }}>
      <SideBar />
    </AppContext.Provider>
  );
}

export default App;
