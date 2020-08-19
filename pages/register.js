import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Router from "next/router";
import Select from "react-select";

//react icons
import { FaUserTie, FaKey, FaUserLock, FaPhoneAlt } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";

const Home = () => {
  const [options, setOptions] = useState([]);
  const [register, setRegister] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    name: "",
    bank_id: "",
    bank_no: "",
    phone: "",
    line_id: "",
  });
  const [loading, setLoading] = useState("none");

  async function pushRegister(e) {
    e.preventDefault();
    setLoading("flex");

    fetch("https://api-cashweb.olafs.co/cs/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Zync-Origin": "https://demogameproject.herokuapp.com/",
      },
      body: JSON.stringify(register),
    }).then((res) => {
      setLoading("none");

      if (res.status == 201) {
        Swal.fire({
          title: "สมัครสมาชิกสำเร็จ !",
          text:
            "คุณได้ทำการสมัครสมาชิกเรียบร้อยแล้ว กรุณาเข้าสู่ระบบเพื่อนใช้งาน",
          icon: "success",
        }).then(() => Router.push("/"));
      } else {
        Swal.fire({
          title: "สมัครสมาชิกไม่สำเร็จ",
          text: "การสมัครสมาชิกล้มเหลว กรุณาลองใหม่อีกครั้ง",
          icon: "error",
        });
        setRegister({
          username: "",
          password: "",
          password_confirmation: "",
          name: "",
          bank_id: "",
          bank_no: "",
          phone: "",
          line_id: "",
        });
      }
    });

    /* } */
  }

  function selectChange(e) {
    const target_bank = e.value;

    setRegister({ ...register, bank_id: target_bank });
  }

  //set options select
  useEffect(() => {
    let arrOption = [];

    fetch("https://api-cashweb.olafs.co/cs/banks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (json) => {
        await asyncForEach(json, async (data) => {
          let item = { value: data._id, label: data.name };
          arrOption.push(item);
        });

        setOptions(arrOption);
      });
  }, []);
  //set options select
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  return (
    <>
      <div className="loading">
        <div className="loader"></div>
      </div>

      <div className="container">
        <img src="title-profile.png" className="image-title" alt="" />
        <div className="box-content">
          <p className="title">สมัครสมาชิก</p> <br />
          <form onSubmit={pushRegister}>
            <p>
              USERNAME &nbsp; <FaUserLock />
            </p>
            <br />
            <input
              type="text"
              placeholder="username .."
              value={register.usernmae}
              onChange={(e) =>
                setRegister({ ...register, username: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>
              PASSWORD &nbsp; <FaKey />
            </p>
            <input
              type="password"
              placeholder="password .."
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>
              CONFIRM PASSWORD &nbsp; <FaKey />
            </p>
            <input
              type="password"
              placeholder="confirm password .."
              value={register.password_confirmation}
              onChange={(e) =>
                setRegister({
                  ...register,
                  password_confirmation: e.target.value,
                })
              }
              required
            />
            <br />
            <br />
            <p>
              ชื่อ - นามสกุล &nbsp; <FaUserTie />
            </p>
            <br />
            <input
              type="text"
              placeholder="กรอก ชื่อ - นามสกุล"
              value={register.name}
              onChange={(e) =>
                setRegister({ ...register, name: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>ธนาคาร</p> <br />
            <br />
            <br />
            <div style={{ textAlign: "left" }}>
              <Select
                onChange={selectChange}
                options={options}
                required
              ></Select>
            </div>
            <br />
            <br />
            <p>
              เลขบัญชีธนาคาร &nbsp; <AiFillBank />
            </p>
            <br />
            <input
              type="number"
              className="number"
              placeholder="ระบุเลขบัญชีธนาคาร ..."
              value={register.bank_no}
              onChange={(e) =>
                setRegister({ ...register, bank_no: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>
              เบอร์โทรศัพท์ &nbsp; <FaPhoneAlt />
            </p>
            <br />
            <input
              type="number"
              className="number"
              placeholder="0x-xxx-xxxx"
              value={register.phone}
              onChange={(e) =>
                setRegister({ ...register, phone: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>
              ไอดีไลน์ &nbsp; <img src="line.png" width="25" alt="" />
            </p>
            <br />
            <input
              type="text"
              value={register.line_id}
              placeholder="Line id ..."
              onChange={(e) =>
                setRegister({ ...register, line_id: e.target.value })
              }
              required
            />
            <br />
            <br />
            <button
              onClick={pushRegister}
              disabled={
                !register.username ||
                !register.password ||
                !register.bank_id ||
                !register.bank_no ||
                !register.line_id ||
                !register.phone ||
                !register.name
              }
              className="btn-register"
            >
              สมัครสมาชิก
            </button>
            <br />
            <br />
            <br />
            <hr /> <br />
            <br />
            <button onClick={() => Router.push("/")} className="btn-login">
              เข้าสู่ระบบ
            </button>
            <br />
            <br />
            <br />
          </form>
        </div>
      </div>

      <style jsx>{`
        .container {
          background: white;
          position: relative;
          width: 100%;
          height: calc(100% + 100vh);
          padding-bottom: 200px;
        }
        .image-title {
          position: absolute;
          right: 0;
          width: 35%;
          top: -20px;
          opacity: 0.7;
        }
        .box-content {
          position: relative;
          top: 70px;
          width: 35%;
          padding: 50px 15%;
          border-radius: 5px;
          margin-left: auto;
          margin-right: auto;
          border: 0;
          box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
        }
        .title {
          font-size: 28px;
        }
        form {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        form p {
          float: left;
          letter-spacing: 0.5px;
        }
        form input {
          padding: 8px 13px;
          margin-right: 20px;
          border: 1px solid rgb(200, 200, 250);
          border-radius: 5px;
          font-size: 16px;
          width: calc(100% - 26px);
          outline: none;
          letter-spacing: 0.5px;
        }
        form input:focus {
          box-shadow: 2px 2px 2px 1px rgba(0, 180, 255, 0.2),
            -2px -2px 2px 1px rgba(0, 180, 255, 0.2);
        }
        .number::-webkit-outer-spin-button,
        .number::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .btn-register {
          padding: 15px 0;
          color: white;
          border: 0;
          background: #3598eb;
          width: 100%;
          font-size: 15px;
          letter-spacing: 0.5px;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          outline: none;
        }
        .btn-register:hover {
          background: #177fd6;
        }
        .btn-register:disabled {
          background: rgb(100, 150, 250);
        }
        .btn-register:disabled:hover {
          background: rgb(100, 150, 250);
        }

        .btn-login {
          padding: 15px 0;
          color: white;
          border: 0;
          background: #1ecc3b;
          width: 100%;
          font-size: 15px;
          letter-spacing: 0.5px;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          outline: none;
        }
        .btn-login:hover {
          background: #14ee38;
        }

        /* Loading */
        .loading {
          width: 100%;
          z-index: 20;
          position: fixed;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
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

        @media only screen and (max-width: 800px) {
          h1 {
            font-size: 22px;
          }
          .container {
            padding-bottom: 200px;
          }
          .box-content {
            width: 40%;
            padding: 50px 15%;
            font-size: 14px;
          }
          .box-content span {
            font-size: 14px;
          }
          input {
            font-size: 14px;
          }
        }

        @media only screen and (max-width: 450px) {
          .container {
            padding-bottom: 150px;
          }
          .box-content {
            width: 84%;
            padding: 20px 5%;
            font-size: 14px;
            top: 30px;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Home;
