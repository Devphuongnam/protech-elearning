import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartList.css";
import axios from "axios";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  const cartItems =
    location.state && location.state.cartItems ? location.state.cartItems : [];

  console.log(cartItems);
  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );

    // Làm tròn tổng giá tiền đến 2 chữ số sau dấu chấm
    setTotalPrice(Number(calculatedTotalPrice.toFixed(2)));
  }, [cartItems]);

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    navigate("/cart", { state: { cartItems: updatedCartItems } });
  };

  const handleCheckout = () => {
    axios
      .post("http://localhost:8081/api/checkout", { cartItems, userId })
      .then((response) => {
        if (response.data === "Order successful") {
          // Hiển thị cảnh báo "Thanh toán thành công"
          alert("Thanh toán thành công");
          navigate("/");
          // Thực hiện các hành động sau khi thanh toán thành công
        } // Nếu server trả về 'Order successful'
        // Thực hiện các hành động sau khi thanh toán thành công
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        // Xử lý lỗi nếu cần thiết
      });
  };

  return (
    <div className="cart-page">
      <h2>Giỏ Hàng</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.title} />
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${item.price}</p>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Tổng tiền: ${totalPrice}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      ) : (
        <p>Giỏ hàng của bạn đang trống.</p>
      )}
    </div>
  );
};

export default CartPage;
