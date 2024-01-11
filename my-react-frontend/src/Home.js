import React from "react";
import Header from "./components/Header/Header";
import Slidetop from "./components/Slidetop/Slidetop";
import CoursesList from "./components/Page/CourseList/CourseList";
import Footer from "./components/Footer/Footer";
import { CartProvider, useCart } from "./components/Cart/CartContext";
import "../src/components/Cart/Cart.css";
import Cart from "./components/Cart/Cart";

function Home() {
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Slidetop />
      <CoursesList />
      <Footer />
    </CartProvider>
  );
}

export default Home;
