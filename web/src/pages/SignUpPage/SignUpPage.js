import React, { useState, useEffect } from 'react';

import { Image } from "antd";
import "../SignUpPage/style.scss";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogin from '../../assets/images/login.webp';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { configConsumerProps } from 'antd/lib/config-provider';

function SignUpPage() {
    const [isShowPassword ,setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [users, setUsers] = useState([]); // State to store fetched users
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { email, password , confirmPassword};
        try {
          if (password == confirmPassword){
            alert("Succesful")
          
          const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          console.log('Server Response:', result);
          handleNavigateSignIn()
          }
          else{alert("Mat khau khong khop")} /// xu li sau
        } catch (error) {
          // neu trung email
          console.error('Error:', error);
        }
      };
    
      // Function to fetch all users from the database
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000'); // Assuming the "/" route returns all users
          const data = await response.json();
          setUsers(data); // Update state with fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    
      // Use useEffect to fetch users when the component mounts
      useEffect(() => {
        fetchUsers();
      }, []);
    const handleOnChangeEmail = (value) => {
      setEmail(value)
    }

    const handleOnChangePassword = (value) => {
      setPassword(value)
    }

    const handleOnChangeCofirmPassword = (value) => {
      setConfirmPassword(value)
    }

    const handleSignUp = () => {
        console.log(email, password)
    }

    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    }



    return ( 
        <div className="Wrap_login">
            <div className="Login">
                <div className="login_left">
                    <Image src={imageLogin}  preview={false} alt="image_login"/>
                </div>
                <div className="login_right">
                    <div className="login_title">Đăng ký</div>
                    <div className="login_form">

                        <InputForm 
                            style={{marginBottom:'10px'}} 
                            placeholder='Abc@gmail.com' 
                            value ={email}
                            onChange={handleOnChangeEmail} 
                        />
                        <div style={{position:'relative'}}>
                            <span className="Hidden" onClick={() => setIsShowPassword(!isShowPassword)} >
                                {
                                    isShowPassword ? (
                                        <EyeFilled />
                                        ) : (
                                        <EyeInvisibleFilled />
                                        )
                                }
                            </span>
                            <InputForm 
                                style={{marginBottom:'10px'}} 
                                placeholder='Password' 
                                type = {isShowPassword ? 'text' :'password'}
                                value ={password}
                                onChange={handleOnChangePassword}
                            />
                        </div>
                        <div style={{position:'relative'}}>
                            <span className="Hidden" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} >
                                {
                                    isShowConfirmPassword ? (
                                        <EyeFilled />
                                        ) : (
                                        <EyeInvisibleFilled />
                                        )
                                }
                            </span>
                            <InputForm 
                                placeholder='Confirm Password' 
                                type = {isShowConfirmPassword ? 'text' :'password'}
                                value ={confirmPassword}
                                onChange={handleOnChangeCofirmPassword}
                            />
                        </div>
                        

                        <ButtonComponent className='Btn_Login'    
                            disabled={!email.length || !password.length}
                            onClick={handleSubmit}
                            bordered ="false" 
                            textButton={'Đăng ký'}
                        />

                        <span >Bạn đã có tài khoản? </span>
                        <span className="Text_login" onClick={handleNavigateSignIn}>Đăng nhập</span>
                    </div>
                </div>
                
            </div> 
        </div> 
    );
}

export default SignUpPage;