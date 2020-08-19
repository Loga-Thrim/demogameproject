import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const Promotion = ()=>{
    const [promotion, setPromotion] = useState([])

    useEffect(()=>{
        let arr = []
        fetch("https://api-cashweb.olafs.co/cs/promotions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(res=>res.json())
        .then(async result=>{
            await asyncForEach(result, async data=>{
                let item = {
                    detail: data.detail,
                    imageUrl: data.imageUrl,
                    name: data.name,
                    status: data.status
                }
                arr.push(item) 
            })
            setPromotion(arr)
        })
    }, [])

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    return(
        <div className="container">
            <img src="title-profile.png" className="image-title" alt=""/>
            <div className="content">
                <h1 style={{fontSize: 40}}>โปรโมชั่น</h1> <br/><br/>

                <div className="card-promotion">
                    {promotion.map((item, index)=>
                        <>
                            <div className="card">
                                <img src={item.imageUrl} alt=""/>
                                <div className="box"> <br/>
                                    <span key={index++} className="name">{item.name}</span>
                                    <span key={index++} className="status">{item.status}</span> <br/><br/><br/>

                                    <span className="detail-title">รายระเอียด</span> <br/>
                                    <span key={index++} className="detail">{parse(item.detail)}</span>
                                </div> <br/><br/>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .container{
                    width: 100%;
                    height: 100%;
                    top: 0;
                    overflow: hidden;
                    padding-bottom: 150px;
                    position: relative;
                }
                .image-title{
                    position: absolute;
                    right: 0;
                    width: 35%;
                    top: -20px;
                    opacity: .7;
                }
                .content{
                    text-align: center;
                    width: 60%;
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                    top: 70px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2);
                    padding: 50px 0;
                }


                .card-promotion{
                    position: relative;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                }
                .card{
                    width: calc(50% - 40px);
                    padding: 0px 20px;
                }
                .card img{
                    width: 100%;
                }
                .box{
                    top: -5px;
                    position: relative;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
                    padding-bottom: 10px;
                }
                .box .name{
                    margin-left: 70px;
                    float: left;
                    font-weight: bold;
                    font-size: 20px;
                }
                .box .status{
                    margin-right: 70px;
                    float: right;
                    font-weight: bold;
                    font-size: 20px;
                    color: rgb(50, 200, 50);
                }
                .box .detail-title{
                    margin-left: 70px;
                    float: left;
                }

                @media only screen and (max-width: 1000px){
                    .content{
                        width: 70%;
                    }
                    .box .name{
                        margin-left: 40px;
                        font-size: 20px;
                    }
                    .box .status{
                        margin-right: 40px;
                        font-size: 20px;
                    }
                    .box .detail-title{
                        margin-left: 40px;
                    }
                    
                }

                @media only screen and (max-width: 650px){
                    .content{
                        width: 80%;
                    }
                    .card{
                        width: calc(100% - 40px);
                        padding: 0px 20px;
                    }
                    .box .name{
                        margin-left: 40px;
                        font-size: 20px;
                    }
                    .box .status{
                        margin-right: 40px;
                        font-size: 20px;
                    }
                    .box .detail-title{
                        margin-left: 40px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Promotion