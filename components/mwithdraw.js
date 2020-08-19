import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from "sweetalert2";
import Router from 'next/router';

import { AiOutlineFieldTime } from 'react-icons/ai';

const withdraw = ({token}) => {
    const [withdraw, setWithdraw] = useState({
        state: "withdraw",
        customer_game_id: "",
        amount: null,
    })
    const [optionsGames, setOptionsGames] = useState([])

    const [loading, setLoading] = useState("none")

    //set options select
    useEffect(()=>{
        let arrGames = []

        if(token){
            fetch("https://api-cashweb.olafs.co/cs/games/active", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": token
                }
            }).then(res=>{
                res.status==401?logout():res.json().then(async (json)=>{
                    await asyncForEach(json, async (data)=>{
                        let itemOptions = {value: data._id, label: data.game.name}
                        arrGames.push(itemOptions)
                    });
                    setOptionsGames(arrGames)
                })
            })
        }
    }, [token])

    function logout(){
        fetch("/api/destroysessions").then(result=>{
            if(result.ok) Router.push("/")
        })
    }
    
    //set options select
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    function sendData(e){
        e.preventDefault()

        setLoading("flex")

        fetch("https://api-cashweb.olafs.co/cs/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                state: withdraw.state,
                customer_game_id: withdraw.customer_game_id,
                amount: withdraw.amount
            })
        }).then(res=>{
            if(res.status === 201){
                setLoading("none")
                Swal.fire({
                    title: "ดำเนินการสำเร็จ",
                    icon: "success"
                }).then(()=>Router.push("/profile"))
            } else{
                setLoading("none")
                Swal.fire({
                    title: "ดำเนินการล้มเหลว",
                    text: "โปรดลองใหม่อีกครั้ง",
                    icon: "warning"
                })
            }
        })
    }
    
    return (
        <div>
            <div className="loading"><div className="loader"></div></div>
            <div className="box-content">
                <h1 style={{textAlign: 'center', letterSpacing: 1}}>ถอนเงิน</h1><br/>
                <span>เกม</span> <br/><br/>
                <Select options={optionsGames} onChange={e=>setWithdraw({...withdraw, customer_game_id: e.value})}></Select>
                <br/><br/><br/>

                <span>จำนวนเงิน</span> <br/><br/>
                <input type="number" placeholder="ระบุจำนวนเงินที่่ต้องการถอน .." value={withdraw.amount} onChange={e=>setWithdraw({ ...withdraw, amount: e.target.value })} className="form-date"></input>
                <br/><br/>

                <button className="btn-confirm" onClick={sendData}>ยืนยัน</button>

                <br/><br/><br/>
            </div>

            <style jsx>{`
                .box-content span{
                    font-size: 17px;
                }
                span.detail{
                    background: rgb(240, 240, 240);
                    padding: 10px 40px;
                    width: 50%;
                    border-radius: 5px;
                }
                .box-bankDetail{
                    display: flex;
                    justify-content: flex-start;
                }
                .box-title{
                    display: flex;
                    flex: 2;
                    flex-direction: column;
                }
                .box-result{
                    display: flex;
                    flex: 4;
                    flex-direction: column;
                }

                input{
                    outline: none;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, .2);
                    padding: 10px;
                    font-size: 15px;
                }
                input:focus{
                    border: 1px solid lightblue;
                    box-shadow: 1px 1px 5px 0px rgba(0, 100, 250, .3);
                }
                .form-date{
                    width: calc(100% - 20px);
                }
                .btn-confirm{
                    color: white;
                    border: 0;
                    background: rgb(0, 150, 250);
                    border-radius: 5px;
                    padding: 10px 30px;
                    cursor: pointer;
                    transition: .2s;
                }
                .btn-confirm:hover{
                    background: rgb(0, 110, 250);
                }

                /* Loading */
                .loading{
                    width: 100%;
                    top: 61px;
                    z-index: 20;
                    position: fixed;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0, 0, 0, .5);
                    height: 100vh;
                    left: 0;
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

                @media only screen and (max-width: 800px){
                    h1{ font-size: 22px; }
                    input{ font-size: 14px; }
                    .box-content span{
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
}

export default withdraw;