import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from "sweetalert2";
import Router from 'next/router';

import { AiOutlineFieldTime } from 'react-icons/ai';

const mdeposit = ({token}) => {
    const [deposit, setDeposit] = useState({
        state: "deposit",
        customer_game_id: "",
        account_id: "",
        amount: null,
        transfer_date: "",
        transfer_time: "",
        img_slip: ""
    })
    const [optionsGames, setOptionsGames] = useState([])
    const [optionsBanks, setOptionsBanks] = useState([])
    const [dataBankNo, setDataBankNo] = useState([])
    const [bankNo, setBankNo] = useState("")
    const [bank, setBank] = useState({name: "", bankNo: "", bankName: ""})

    const [loading, setLoading] = useState("none")
    const [boxDetail, setBoxDetail] = useState("none")

    //set options select
    useEffect(()=>{
        let arrGames = []
        let arrBanks = []
        let arrBankNo = []

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

            fetch("https://api-cashweb.olafs.co/cs/accounts/banks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": token
                }
            }).then(response=>response.json())
            .then(async result=>{
                await asyncForEach(result, async data=>{
                    const {_id, bankNo, name} = data
                    let itemBank = {value: _id, label: data.bank.name}
                    let itemBankNo = {
                        bankNo,
                        name,
                        bankName: data.bank.name
                    }
                    arrBanks.push(itemBank)
                    arrBankNo.push(itemBankNo)
                })

                setOptionsBanks(arrBanks)
                setDataBankNo(arrBankNo)
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

    function gameSelectChange(e){
        dataBankNo.some(snap=>{
            if(snap.bankName === e.label){
                setBank({name: snap.name, bankNo: snap.bankNo, bankName: e.label})
                setDeposit({...deposit, account_id: e.value})
            }

            return snap.name === e.label
        })

        setBoxDetail("block")
    }

    function handleImage(e){
        setDeposit({...deposit, img_slip: e.target.files[0]})
    }

    function sendData(e){
        e.preventDefault()

        setLoading("flex")

        const formData = new FormData()

        formData.append("state", deposit.state)
        formData.append("customer_game_id", deposit.customer_game_id)
        formData.append("account_id", deposit.account_id)
        formData.append("amount", deposit.amount)
        formData.append("transfer_date", deposit.transfer_date)
        formData.append("transfer_time", deposit.transfer_time)
        formData.append("img_slip", deposit.img_slip)

        fetch("https://api-cashweb.olafs.co/cs/transactions", {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: formData
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

    function time(e){
        setDeposit({ ...deposit, transfer_time: e.target.value })

        if(e.target.value.length == 2){
            setDeposit({ ...deposit, transfer_time: e.target.value + ":" })
        }
    }
    
    return (
        <div>
            <div className="loading"><div className="loader"></div></div>
            <div className="box-content">
                <h1 style={{textAlign: 'center', letterSpacing: 1}}>ฝากเงิน</h1><br/>
                <span>เกม</span> <br/><br/>
                <Select options={optionsGames} onChange={e=>setDeposit({...deposit, customer_game_id: e.value})}></Select>
                <br/><br/><br/>

                <span>ธนาคาร</span> <br/><br/>
                <Select options={optionsBanks} placeholder="เลือกธนาคาร" onChange={gameSelectChange}></Select>
                <br/><br/><br/>

                <div className="box-bankDetail">
                    <div className="box-title">
                        <span>เลขบัญชี</span> <br/><br/>
                    </div>
                    <div className="box-result">
                        <span className="detail" style={{marginTop: -10}}>{bank.bankNo}</span> <br/><br/>
                    </div>
                </div>
                <br/>

                <div className="box-bankDetail">
                    <div className="box-title">
                        <span>ชื่อบัญชี</span> <br/><br/>
                    </div>
                    <div className="box-result">
                        <span className="detail" style={{marginTop: -10}}>{bank.name}</span> <br/><br/>
                    </div>
                </div>
                <br/>

                <span>จำนวนเงิน</span> <br/><br/>
                <input type="number" placeholder="ระบุจำนวนเงินที่ฝาก .." value={deposit.amount} onChange={e=>setDeposit({ ...deposit, amount: e.target.value })} className="form-date"></input>
                <br/><br/><br/>

                <div className="box-detail">
                    <p>รายละเอียดการโอนเงิน</p> 
                    <span>เลขบัญชี : &nbsp;{bank.bankNo}</span> <br/>
                    <span>ชื่อบัญชี : &nbsp;{bank.name}</span> <br/>
                    <span>ธนาคาร : &nbsp;{bank.bankName}</span> <br/>
                    <span>ยอดที่ต้องโอน : &nbsp;{deposit.amount}</span>
                </div>
                <br/><br/>

                <span>วันที่ฝาก</span> <br/><br/>
                <input type="date" onChange={e=>setDeposit({ ...deposit, transfer_date: e.target.value })} className="form-date"></input>
                <br/><br/>

                <span>เวลาที่ฝาก</span>
                <AiOutlineFieldTime size={'5%'} style={{position: "relative", top: 7, marginLeft: 10}} />
                <br/><br/>
                <input type="text" onChange={time} value={deposit.transfer_time} placeholder="XX : XX" className="form-time" />
                <br/><br/>

                <span>รูปสลิป</span> <br/><br/>
                <input type="file" className="form-file" onChange={handleImage} />
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
                .box-detail{
                    display: ${boxDetail};
                    line-height: 40px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
                    width: auto;
                    padding: 10px 30px;
                    background: rgb(245, 245, 245);
                }
                .box-detail p{
                    font-weight: bold;
                    font-size: 20px;
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
                .form-time{
                    width: 20%;
                }
                .form-file{
                    padding: 0;
                    border: 0;
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

export default mdeposit;