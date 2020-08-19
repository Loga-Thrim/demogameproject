import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import moment from 'moment';

const history = ({token}) => {

    const [history, setHistory] = useState([])

    useEffect(()=>{
        if(token){
            let arr = []
            fetch("https://api-cashweb.olafs.co/cs/transactions", {
                method: "GET",
                headers: {
                    "Content-Type": "apllication/json",
                    "Accept": "apllication/json",
                    Authorization: token
                },
            }).then(res=>{
                res.status==401?logout():res.json().then(async result=>{
                    await asyncForEach(result, async data=>{
                        const {type, status, amount, game, createdAt} = data

                        const time = moment(createdAt).format('DD MMM YYYY HH:mm')
    
                        const items = {type, status, amount, game, time}
                        arr.push(items)
                    })
                    setHistory(arr)
                })
            })
            
        }
    }, [token])

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    function logout(){
        fetch("/api/destroysessions").then(result=>{
            if(result.ok) Router.push("/")
        })
    }

    return (
        <div className="container">
            <img src="title-profile.png" className="image-title" alt=""/>
            <div className="box-content">
                <h1 style={{textAlign: 'center'}}>ประวัติการทำรายการ</h1> <br/><br/><br/>
                    
                {history.map((item, index)=>
                    <>
                        <div className="box-history">
                            <span key={index++}>วันที่ทำรายการ: &nbsp; {item.time}</span> <br/><br/>
                            <span key={index++}>ประเภท: &nbsp; {item.type=="deposit"?"ฝาก":"ถอน"}</span> <br/><br/>
                            <span key={index++}>เกม: &nbsp; {item.game}</span> <br/><br/>
                            <span key={index++}>ยอด: &nbsp; {item.amount}</span> <br/><br/>
                            <span key={index++}>สถานะ: &nbsp; {item.status}</span>
                        </div>
                        <br/><br/>
                    </>
                )}
            </div>

            <style jsx>{`
                .container{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    position: relative;
                    padding-bottom: 200px;
                }
                .image-title{
                    position: absolute;
                    right: 0;
                    width: 35%;
                    top: -20px;
                    opacity: .7;
                }
                .box-content{
                    position: relative;
                    top: 70px;
                    width: 35%;
                    padding: 50px 15%;
                    border-radius: 5px;
                    margin-left: auto;
                    margin-right: auto;
                    border: 0;
                    box-shadow: 0px 0px 7px rgba(0, 0, 0, .2);
                }

                .box-history{
                    width: calc(100% - 60px);
                    background: rgb(245, 245, 245);
                    border-radius: 10px;
                    font-size: 18px;
                    padding: 30px;
                }

                @media only screen and (max-width: 650px){
                    .box-content{
                        width: 84%;
                        padding: 20px 5%;
                        font-size: 14px;
                        top: 30px;
                    }

                    .box-history{
                        font-size: 15px;
                        padding: 20px;
                        width: calc(100% - 40px);
                        line-height: 17px;
                    }
                }
            `}</style>
        </div>
    );
}

export default history;
