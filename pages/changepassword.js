import React, { useState } from 'react';
import Swal from "sweetalert2";
import Router from 'next/router';

const ChangePassword = ({token})=>{
    const [password, setPassword] = useState({
        password_old: null,
        password: null,
        password_confirmation: null
    })

    function sendData(){
        fetch("https://api-cashweb.olafs.co/cs/changepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token
            },
            body: JSON.stringify(password)
        }).then(res=>{
            if(res.status){
                Swal.fire({
                    title: "เปลี่ยนรหัสผ่านสำเร็จ",
                    text: "กรุณาเข้าสู่ระบบอีกครั้ง",
                    icon: "success"
                }).then(()=>{
                    fetch("/api/destroysessions").then(result=>{
                        if(result.ok) Router.push("/")
                    })
                })
            } else{
                Swal.fire({
                    title: "ดำเนินการล้มเหลว",
                    text: "กรุณาลองใหม่อีกครั้งในภายหลัง",
                    icon: "warning"
                }).then(()=>{
                    setPassword({password_old: null, password: null, password_confirmation: null})
                })
            }
        })
    }

    return(
        <div className="container">
            <img src="title-profile.png" className="image-title" alt=""/>
            <div className="box-content">
                <h1 style={{letterSpacing: 1}}>เปลี่ยนรหัสผ่าน</h1> <br/>
                <input type="password" onChange={e=>setPassword({...password, password_old: e.target.value})} value={password.password_old} placeholder="รหัสผ่านเดิม" /> <br/><br/>
                <input type="password" onChange={e=>setPassword({...password, password: e.target.value})} value={password.password} placeholder="รหัสผ่านใหม่" /> <br/><br/>
                <input type="password" onChange={e=>setPassword({...password, password_confirmation: e.target.value})} value={password.password_confirmation} placeholder="ยืนยันรหัสผ่านใหม่" /> <br/><br/>
                <button onClick={sendData}>เปลี่ยนรหัสผ่าน</button>
            </div>

            <style jsx>{`
                .container{
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    top: 0;
                    margin: 0;
                }
                .image-title{
                    position: absolute;
                    right: 0;
                    width: 35%;
                    top: -20px;
                    opacity: .7;
                }
                .box-content{
                    top: 100px;
                    position: relative;
                    margin-left: auto;
                    margin-right: auto;
                    width: calc(50% - 100px);
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
                    padding: 100px 50px;
                    border-radius: 10px;
                    text-align: center;
                }
                input{
                    padding: 15px 25px;
                    font-size: 18px;
                    border-radius: 5px;
                    border: 0;
                    outline: none;
                    width: 55%;
                    border: 1px solid rgba(0, 0, 0, .1);
                }
                button{
                    width: calc(55% + 50px);
                    padding: 15px;
                    font-size: 18px;
                    outline: none;
                    border: 0;
                    border-radius: 5px;
                    background: rgb(50, 120, 200);
                    color: white;
                    cursor: pointer;
                }

                @media only screen and (max-width: 800px){
                    .box-content{
                        top: 70px;
                        width: calc(80% - 100px);
                    }
                    h1{
                        font-size: 26px;
                    }
                    input{
                        font-size: 16px;
                        width: 75%;
                    }
                    button{width: calc(75% + 50px);}
                }

                @media only screen and (max-width: 400px){
                    .box-content{
                        top: 70px;
                        padding: 100px 0;
                        width: calc(90%);
                    }
                    h1{
                        font-size: 22px;
                    }
                    input{
                        font-size: 14px;
                        padding: 10px 10px;
                        width: calc(80% - 20px);
                    }
                    button{
                        width: calc(80%);
                        padding: 10px 0;
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
}

export default ChangePassword