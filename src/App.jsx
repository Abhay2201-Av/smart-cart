import "./App.css";
import "./index.css";
import Test from "./components/Test";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MenClothing from "./components/MenClothing";
import WomenClothing from "./components/WomenClothing";
import Electronics from "./components/Electronics";
import Jewellery from "./components/Jewellery";
import Footer from "./components/Footer";
import CartList from "./components/CartList";
// import { CheckOutForm } from "./components/CheckOutFrom";
import Registrastion from "./components/Registrastion";
import LogIn from "./components/LogIn";
import { AuthProvider } from "./components/context/AuthContext";
import { ProtectedRoute } from "./components/pages/ProtectedRoute.Jsx";
import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import Checkout from "./components/CheckOut";
// import Slider from "./components/Slider";

export default function App() {
  useEffect(()=>{
   Aos.init();
  },[])
  return (
    <>
    <AuthProvider>
    <header >
    <NavBar  />
    </header>
      <Routes>
        <Route path="/MenClothing" element={<MenClothing />} />
        <Route path="/WomenClothing" element={<WomenClothing />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route exact path="/" element={<Test />} />
        <Route path="/CartList" element={<CartList  />} />
        <Route path="/checkout" element={<ProtectedRoute  Component={Checkout} />} />
        <Route path="/registration" element={<Registrastion />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>  
      {/* <Slider /> */}
    <footer>
      <Footer />
    </footer> 
    </AuthProvider> 
    </>
  );
}
