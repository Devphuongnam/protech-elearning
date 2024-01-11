// Cart.js
import React, { useEffect, useRef } from "react";
import { CartProvider, useCart } from "./CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useCart();
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const handleCartClick = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      dispatch({ type: "TOGGLE_CART" });
    }
  };

  useEffect(() => {
    if (state.isCartOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [state.isCartOpen]);

  const handleGoToCart = () => {
    navigate("/cart", { state: { cartItems: state.items } });
  };

  return (
    <div
      ref={cartRef}
      className={`cart-container ${state.isCartOpen ? "open" : ""}`}
    >
      <div className="cart-count" onClick={handleGoToCart}>
        <FaShoppingCart style={{ fontSize: "2rem" }} />
        <span>
          <sup onClick={handleCartClick} style={{ cursor: "pointer" }}>
            {state.items ? state.items.length : 0}
          </sup>
        </span>
      </div>
      {state.isCartOpen && (
        <div>
          <ul>
            {state.items.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
