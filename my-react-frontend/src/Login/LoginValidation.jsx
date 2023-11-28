function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  if (values.name === "") {
    error.name = "Tên không được để trống !!!";
  } else {
    error.name = "";
  }

  if (values.email === "") {
    error.email = "Email không được để trống !!!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email không hợp lệ !!!";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Mật khẩu không được để trống !!!";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Mật khẩu không hợp lệ, Mẫu mật khẩu yêu cầu ít nhất 8 ký tự và phải chứa ít nhất một chữ hoa, một chữ thường và một số. !!!";
  } else {
    error.password = "";
  }
  return error;
}

export default Validation;
