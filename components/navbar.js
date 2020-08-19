import React, { useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { FcMenu } from 'react-icons/fc'

const Navbar = (props) => {
  const [menu, setMenu] = useState("none");

  let classMenu = useRouter().pathname.slice(1);
  if (classMenu == "") classMenu = "login";

  function logout(){
    fetch("/api/destroysessions").then(result=>{
        if(result.ok){
          setMenu("none")
          Router.push("/")
        }
    })
  }

  function menuClick() {
    if (menu == "none") setMenu("block");
    else setMenu("none");
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ul>
        <p className="logo">Games</p>

        {/* show menu when responsive */}
        <p className="menu" onClick={menuClick}>
          <FcMenu size={22} />
        </p>

        {props.user == null ? (
          <>
            <li>
              <Link href="/">
                <a onClick={menuClick} className="login">
                  เข้าสู่ระบบ
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a onClick={menuClick} className="register">
                  สมัครสมาชิก
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/profile">
                <a onClick={menuClick} className="profile">
                  ข้อมูลสมาชิก
                </a>
              </Link>
            </li>
            <li>
              <Link href="/openuser">
                <a onClick={menuClick} className="openuser">
                  เปิด USER เกม
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mstate">
                <a onClick={menuClick} className="mstate">
                  ฝาก - ถอนเงิน
                </a>
              </Link>
            </li>
          </>
        )}

        <li>
          <Link href="/downloads">
            <a onClick={menuClick} className="downloads">
              Download
            </a>
          </Link>
        </li>
        <li>
          <Link href="/promotion">
            <a onClick={menuClick} className="promotion">
              โปรโมชั่น
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a onClick={menuClick} className="contact">
              ติดต่อเรา
            </a>
          </Link>
        </li>

        {props.user == null ? null : 
          <li>
            <a onClick={logout} className="logout">ออกจากระบบ</a>
          </li>
        }
      </ul>

      <style jsx>{`
        ul {
          z-index: 10;
          margin: 0;
          top: 0px;
          padding: 0;
          width: 100%;
          position: fixed;
          background: rgb(240, 240, 240);
          text-align: right;
        }
        ul .logo {
          list-style-type: none;
          margin-left: 50px;
          font-size: 26px;
          top: -17px;
          position: absolute;
          font-weight: bold;
        }
        ul li {
          list-style-type: none;
          display: inline-block;
          
        }
        ul li a{
          cursor: pointer;
          color: rgb(80, 80, 80);
          display: block;
          padding: 15px 30px;
          text-decoration: none;
          font-size: 20px;
          transition: 0.1s;
          letter-spacing: 0.5px;
          border: 0;
          outline: none;
        }
        ul li a:hover{
          background: rgb(180, 180, 180);
          color: white;
        }
        .menu {
          text-align: center;
          font-size: 16px;
          color: black;
          display: none;
          cursor: pointer;
          margin: 0;
          padding: 10px 0;
          width: 50px;
          margin-left: auto;
        }
        ul li a.${classMenu} {
          background: rgb(120, 120, 120);
          color: white;
        }

        @media only screen and (max-width: 1300px){
          ul li a{
            font-size: 16px;
            padding: 20px;
          }
        }

        @media only screen and (max-width: 1000px) {
          ul .logo {
            left: 20px;
            top: 5px;
            margin: 0;
            font-size: 20px;
          }
          .menu {
            display: block;
          }
          ul li {
            padding: 5px 0;
            text-align: center;
            float: none;
            display: ${menu};
          }
          ul li a{
            font-size: 15px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
