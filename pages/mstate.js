import React, { useState } from "react";

import Mdeposit from "../components/mdeposit";
import Mwithdraw from "../components/mwithdraw";

const mstate = ({ bank, bankNo, token }) => {
  const [state, setState] = useState(1);

  return (
    <div>
      <div className="container">
        <img src="title-profile.png" className="image-title" alt=""/>
        <div className="content">
          <h2>เลือกเมนู</h2> <br/><br/>

          <div className="box-btn">
            <button className={state==1?'active':''} onClick={()=>setState(1)}>ฝากเงิน</button>
            <button className={state==2?'active':''} onClick={()=>setState(2)}>ถอนเงิน</button>
          </div>
          
          <br/><br/>

          {state == 1 ? (
            <Mdeposit bank={bank} bankNo={bankNo} token={token}></Mdeposit>
          ) : state == 2 ? (
            <Mwithdraw bank={bank} bankNo={bankNo} token={token}></Mwithdraw>
          ) : null}
        </div>

        <style jsx>{`
          .container {
            width: 100%;
            height: 100%;
            background: white;
            position: relative;
            top: 0;
            margin: 0;
            padding-bottom: 150px;
          }
          .image-title{
            position: absolute;
            right: 0;
            width: 35%;
            top: -20px;
            opacity: .7;
          }
          .content {
            margin-left: auto;
            margin-right: auto;
            width: 35%;
            padding: 50px 15%;
            border-radius: 10px;
            box-shadow: 0px 0px 7px rgba(0, 0, 0, .2);
            position: relative;
            top: 70px;
          }

          .box-btn{
            width: 100%;
            display: flex;
            justify-content: space-around;
          }

          .box-btn button{
            color: white;
            padding: 20px 35px;
            font-size: 20px;
            border: 0;
            outline: none;
            cursor: pointer;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, .3);
            transition: .15s;

            background: #DC7E25;
          }

          .box-btn button:hover{
            background: #BB5C01;
          }

          .box-btn .active{
            background: #BB5C01;
          }

          select{
            outline: none;
            padding: 20px;
            width: 50%;
            font-size: 20px;
          }

          @media only screen and (max-width: 800px) {
            .container {
              padding-bottom: 200px;
            }
            .content {
              width: 40%;
              padding: 50px 15%;
              font-size: 14px;
            }
            .content span {
              font-size: 14px;
            }
          }

          @media only screen and (max-width: 700px){
            .box-btn button{
              padding: 15px 20px;
              font-size: 16px;
            }
          }

          @media only screen and (max-width: 450px) {
            .container {
              padding-bottom: 150px;
            }
            .content {
              width: 84%;
              padding: 20px 5%;
              font-size: 14px;
              top: 30px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default mstate;
