import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link'

const Profile = ({token})=>{
    const [profile, setProfile] = useState(null)

    useEffect(()=>{
        if(token){
            fetch("https://api-cashweb.olafs.co/cs/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token
                }
            }).then(res=>{
                if(res.status === 401) logout()
                
                res.json().then(result => setProfile(result))
            })
        }
    }, [token])

    function logout(){
        fetch("/api/destroysessions").then(result=>{
            if(result.ok) Router.push("/")
        })
    }

    const paddingLeft = <span style={{paddingLeft: 30}}></span>

    return(
        <div className="container">
            <h1 className="title">ข้อมูลสมาชิก</h1> 
            <img src="title-profile.png" className="image-title" alt=""/>
            <br/><br/>

            <div className="box-content">
                <br/>
                <div className="content-header">
                    <div className="header-img">
                        <img src="user-logo.png" />
                    </div>

                    <div className="header-btn">
                        <div className="btn-flex">
                            <Link href="/mstate">
                                <a className="btn" style={{background: '#3298EC'}}>ฝาก - ถอนเงิน</a>
                            </Link>
                            <Link href="/changepassword">
                                <a style={{background: '#21DE52'}} className="btn">เปลี่ยนรหัสผ่าน</a>
                            </Link>
                            
                        </div>
                        <div className="btn-flex">
                            <Link href="/history">
                                <a className="btn" style={{background: '#42B89B'}}>ประวัติการทำรายการ</a>
                            </Link>
                            <Link href="/promotion">
                                <a className="btn" style={{background: '#EC8732'}}>โปรโมชั่น</a>
                            </Link>
                        </div>
                        <div className="btn-flex">
                            <button className="btn" style={{background: '#E11A26'}} onClick={logout}>ออกจากระบบ</button>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="content-body">
                    <div className="body-title">
                        <br/>
                        <span>ชื่อ - สกุล</span> 
                        <br/><br/><br/>

                        <span>เลขบัญชี</span>
                        <br/><br/><br/>

                        <span>ธนาคาร</span>
                        <br/><br/><br/>

                        <span>เบอร์โทรศัพท์</span>
                        <br/><br/><br/>

                        <span>ไอดีไลน์</span>
                        <br/><br/><br/>

                        <span>เกม</span>
                        <br/><br/><br/>
                    </div>
                    <div className="body-result">
                        <br/>

                        {profile ? 
                            <div>
                                <span>{profile.name}</span>
                                <br/><br/><br/>

                                <span>{profile.bankNo}</span>
                                <br/><br/><br/>

                                <span>{profile.bank.name}</span>
                                <br/><br/><br/>

                                <span>{profile.phone}</span>
                                <br/><br/><br/>

                                <span>{profile.lineId}</span>
                                <br/><br/><br/>

                                {profile.games.map((item, index)=>
                                    <div>
                                        <div className="box-result">
                                            <span key={index++}>ชื่อเกม: {paddingLeft}{item.game.name}</span> <br/>
                                            <span key={index++}>username: {paddingLeft}{item.username ? item.username : "-"}</span> <br/>
                                            <span key={index++}>password: {paddingLeft}{item.password ? item.password : "-"}</span> <br/>
                                            <span key={index++}>สถานะ: {paddingLeft}
                                                <span key={index++} style={{background: item.status=='active'?"green":item.status=="pending"?"#F7B921":"red", 
                                                padding: "4px 15px", color: 'white', borderRadius: 5}}>
                                                    {item.status}
                                                </span>
                                            </span> <br/>
                                        </div> <br/><br/>
                                    </div>
                                )}
                            </div> : null
                        }

                    </div>
                </div>
            </div>

            <br/><br/>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');

                .container{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    position: relative;
                    height: 100%;
                }
                .title{
                    font-size: 32px;
                    letter-spacing: .5px;
                    padding-top: 50px;
                    margin-left: 150px;
                }
                .image-title{
                    position: absolute;
                    right: 0;
                    width: 35%;
                    top: -20px;
                    opacity: .7;
                    z-index: -1;
                }
                .box-content{
                    width: 80%;
                    margin-left: auto;
                    margin-right: auto;
                    height: calc(100vh + 100%);
                    display: flex;
                    flex-direction: column;
                    border-left: 1px solid rgba(0, 0, 0, .2);
                }
                .content-header{
                    display: flex;
                    flex-direction: row;
                    height: 300px;
                }
                .content-header .header-img img{ width: 70%; }
                .content-header .header-img{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .content-header .header-btn{
                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .content-header .header-btn .btn-flex{
                    display: flex;
                    flex: 1;
                    width: 50%;
                    justify-content: space-between;
                    align-items: center;
                }


                .content-body{
                    display: flex;
                    flex-direction: row;
                }
                .content-body .body-title{
                    flex: 1;
                    font-size: 22px;
                    padding-left: 50px;
                }
                .content-body .body-title span{
                    padding: 7px 0;
                    position: absolute;
                }
                .content-body .body-result{
                    flex: 2;
                    font-size: 22px;
                }

                .box-result{
                    line-height: 50px;
                    background: rgb(240, 240, 240);
                    padding: 10px 20px;
                    border-radius: 5px;
                }

                .btn{
                    color: white;
                    border: 0;
                    border-radius: 7px;
                    font-size: 16px;
                    height: 75%;
                    text-align: center;
                    width: 45%;
                    cursor: pointer;
                    transition: .2s;
                    letter-spacing: .5px;
                    font-family: 'Pridi', serif;
                    outline: none;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .btn:hover{
                    color: black;
                    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.4);
                }

                @media only screen and (max-width: 920px){
                    .title{
                        text-align: center;
                        margin: 0;
                    }
                    .content-header .header-btn .btn-flex{ width: 60%; }
                    .btn{
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    .box-content{
                        border: 0;
                    }

                    .body-title{border: 0;}
                    .body-title span{ font-size: 15px; }
                    .body-result span{ font-size: 15px; }
                }
                @media only screen and (max-width: 700px){
                    .title{
                        text-align: center;
                        margin: 0;
                    }
                    .content-header{
                        height: 250px;
                    }
                    .btn{
                        height: 70%;
                        font-size: 12px;
                        border-radius: 5px;
                    }
                    .content-header .header-btn .btn-flex{ width: 60%; }

                    .content-body .body-result span{ width: 40%; }
                    .content-body .body-result{ flex: 3 }
                }

                @media only screen and (max-width: 600px){
                    .title{
                        text-align: center;
                        margin: 0;
                    }
                    .content-header{
                        height: 200px;
                    }
                    .btn{
                        height: 70%;
                        border-radius: 5px;
                        font-size: 11px;
                    }
                    .box-content{
                        width: 100%;
                    }
                    .content-header .header-btn .btn-flex{ width: 70%; }
                    .content-header .header-img img{
                        padding-left: 30px;
                        width: 100%;
                    }
                    .content-body .body-title{ padding-left: 25px; }
                    .content-body .body-title span{ font-size: 13px; }
                    .content-body .body-result span{ font-size: 13px; } 
                    .content-body .body-result{ flex: 2 }

                    .content-body .body-result .box-result{
                        line-height: 30px;
                        width: 70%;
                    }
                }
            `}</style>
        </div>
    )
}

export default Profile