import React from "react";
import "./Slidetop.css";

const Slidetop = () => {
  return (
    <div className="slidetop">
      <div className="carousel-slide">
        <div className="carousel-inner">
          <div className="item-active">
            <a href="#">
              <img
                className="img"
                src="https://mona.media/wp-content/uploads/2021/03/chia-nho-noi-dung-bai-giang-e-learning.jpg"
                alt="slide"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slidetop;
