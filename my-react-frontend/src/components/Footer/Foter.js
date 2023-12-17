import React from "react";
import "./Foter.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <h6>Liên Hệ</h6>
        <ul>
          <li>CÔNG TY TNHH DỊCH VỤ VÀ PHÁT TRIỂN CÔNG NGHỆ PROTECH</li>
          <li>Địa chỉ: A30-TT2 Khu đô thị Văn Quán - Hà Đông - Hà Nội</li>
          <li>
            Hotline: <a href="tel:0913.434..968">0913.434.968</a>
          </li>
          <li>
            Điện thoại: <a href="tel:0913.434..968">0913.434.968</a>
          </li>
          <li>Zalo: 0913.434.968</li>
          <li>Email: techinplay@gmail.com</li>
        </ul>
      </div>
      <div className="footer-center">
        <h6>Thông tin</h6>
        <ul>
          <li>Giới thiệu</li>
          <li>Thông tin khoá học</li>
          <li>Tin tức</li>
          <li>Thông báo</li>
          <li>Zalo: 0913.434.968</li>
          <li>Email: techinplay@gmail.com</li>
        </ul>
      </div>
      <div className="footer-right">
        <h6>Kết nối với chúng tôi</h6>
        <a
          href="https://www.facebook.com/techinplay?ref=embed_page"
          target="_blank"
          id="u_0_1_A5"
        ></a>
      </div>
    </div>
  );
};

export default Footer;
