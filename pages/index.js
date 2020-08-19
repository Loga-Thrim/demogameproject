import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Swal from "sweetalert2";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState("none")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  async function signin(e){
    e.preventDefault()
    setLoading("flex")

    fetch("https://api-cashweb.olafs.co/cs/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "appliction/json",
      },
      body: JSON.stringify({username: login.username, password: login.password})
    }).then(res=>{
      setLoading("none")

      if(res.status == 200){
        res.json().then(result=>{
          fetch("/api/setsessions", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({token: result.token})
          }).then(resApi => {
            if(resApi.status == 201) Router.push("/profile")
          })
        })
      } else{
        setLoading("none")
        Swal.fire({
          title: "ลงชื่อเข้าสู่ระบบไม่สำเร็จ",
          text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง หรือสมัครสมาชิกหากท่านยังไม่มีบัญชีผู้ใช้",
          icon: "error"
        }).then(()=>{
          setLogin({...login, password: ""})
        })
      }
    })
  }
  
  return (
    <>
      <div className="loading"><div className="loader"></div></div>
      <div className="container">
        <div className="login-box">
          <p className="title">เข้าสู่ระบบ</p> <br />
          <br />
          <form onSubmit={signin}>
            <div className="user-box">
              <input type="text" required value={login.username} onChange={(e)=>setLogin({...login, username: e.target.value})} />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" required value={login.password} onChange={(e)=>setLogin({...login, password: e.target.value})} />
              <label>Password</label>
            </div>
            <button className="btn" disabled={!login.username || !login.password}>เข้าสู่ระบบ</button>
          </form>
        </div>
        <img src="background-login.png" className="img" alt=""/>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          background: linear-gradient(#141e30, #243b55);
          font-family: "Open Sans", sans-serif;
          padding-top: 140px;
          z-index: -999;
          position: absolute;
        }
        .title {
          font-size: 26px;
          color: white;
          text-align: center;
          letter-spacing: 0.5px;
        }
        .img{
          position: absolute;
          width: 50%;
          left: 55%;
          top: 35%;
          transform: translate(-50%, -50%);
          z-index: -1;
          opacity: .5;
        }

        .login-box {
          margin-left: auto;
          margin-right: auto;
          width: 30%;
          padding: 40px;
          background: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          z-index: 10;
        }
        .login-box .user-box {
          position: relative;
        }
        .login-box .user-box input {
          width: 100%;
          padding: 12px 0;
          font-size: 16px;
          color: #fff;
          margin-bottom: 50px;
          border: none;
          border-bottom: 1px solid #fff;
          outline: none;
          background: transparent;
        }
        .login-box .user-box label {
          position: absolute;
          top: 0;
          left: 0;
          padding: 10px 0;
          font-size: 16px;
          color: #fff;
          pointer-events: none;
          transition: 0.5s;
          letter-spacing: 0.5px;
        }
        .login-box .user-box input:focus ~ label,
        .login-box .user-box input:valid ~ label {
          top: -30px;
          left: 0;
          color: #03e9f4;
          font-size: 14px;
        }
        .btn{
            padding: 10px 0;
            text-align: center;
            color: white;
            background: transparent;
            border: 0px;
            cursor: pointer;
            font-size: 16px;
            width: 100%; 
            background: red;
            transition: 1s;
        }
        .btn:disabled{
          background: transparent;
          cursor: default;
        }

        @media only screen and (max-width: 920px) {
          .login-box {
            width: 60%;
          }
        }

        @media only screen and (max-height: 850px) {
          .container {
            padding-top: 60px;
          }
          .title {
            font-size: 18px;
          }
        }

        @media only screen and (max-width: 500px) {
          .title {
            font-size: 16px;
          }
          .login-box .user-box label {
            font-size: 14px;
          }
          .login-box .user-box input:focus ~ label,
          .login-box .user-box input:valid ~ label {
            top: -30px;
            left: 0;
            color: #03e9f4;
            font-size: 12px;
          }
          .login-box {
            width: 80%;
          }
        }

        /* Loading */
        .loading{
          width: 100%;
          z-index: 20;
          position: fixed;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, .5);
          height: 100vh;
          display: ${loading};
        }
        .loader {
          margin-top: -100px;
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid #3498db;
          width: 150px;
          height: 150px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Login;
