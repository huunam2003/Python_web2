import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import "../SignInPage/style.scss";
import imageLogin from "../../assets/images/login.webp";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  let status = 0;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);  
      }
      localStorage.setItem('email', result.email); 
      status = result.status;
      alert(result.message);
      handleNavigateHome();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  
    localStorage.setItem("status", status);
 };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="Wrap_login">
      <div className="Login">
        <div className="login_left">
          <Image src={imageLogin} preview={false} alt="image_login" />
        </div>
        <div className="login_right">
          <div className="login_title">Đăng nhập</div>

          <div className="login_form">
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="Abc@gmail.com"
              value={email}
              onChange={handleOnChangeEmail}
            />

            <div style={{ position: "relative" }}>
              <span
                className="Hidden"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <InputForm
                placeholder="Password"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSubmit}
              className="Btn_Login"
              bordered="false"
              textButton={"Đăng nhập"}
            />
            {/* <div className="Text_login">Quên mật khẩu</div> */}
            <span>Bạn chưa có tài khoản? </span>
            <span className="Text_login" onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
