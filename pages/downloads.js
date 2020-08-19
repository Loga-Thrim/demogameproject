import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Downloads = ()=>{
    const [download, setDownload] = useState([])
    const router = useRouter()

    useEffect(()=>{
        let arr = []
        fetch("https://api-cashweb.olafs.co/cs/blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(res=>res.json())
        .then(async result=>{
            await asyncForEach(result, async data=>{
                let item = {
                    id: data._id,
                    imageUrl: data.imageUrl,
                    name: data.name
                }
                arr.push(item) 
            })
            setDownload(arr)
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
                <h1 style={{fontSize: 40}}>Download</h1> <br/><br/>

                <div className="card-download">
                    {download.map((item, index)=>
                        <>
                            <div className="card">
                                <img key={index++} onClick={()=>router.push(`/downloads/[...download]`, `/downloads/${item.id}`)} src={item.imageUrl} alt=""/>
                                <div className="box" onClick={()=>router.push(`/downloads/[...download]`, `/downloads/${item.id}`)}>
                                    <span key={index} className="name">{item.name}</span>
                                </div> <br/><br/><br/><br/>
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

                .card-download{
                    position: relative;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                }
                .card{
                    width: calc(50%);
                }
                .card img{
                    width: 70%;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
                    cursor: pointer;
                    background: black;
                }
                .card .box{
                    position: relative;
                    width: calc(70% - 40px);
                    padding: 30px 20px;
                    margin-left: auto;
                    margin-right: auto;
                    top: -7px;
                    background: rgba(0, 0, 0, .05);
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
                    cursor: pointer;
                    transition: .1s;
                }
                .card .box:hover{
                    background: white;
                }
                .card img:hover ~ .box{
                    background: white;
                }

                .box .name{
                    font-weight: bold;
                    font-size: 26px;
                    letter-spacing: 1px;
                    position: relative;
                }

                @media only screen and (max-width: 1000px){
                    .content{
                        width: 70%;
                    }
                    .box .name{
                        font-size: 20px;
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
                    .card img{
                        width: 100%;
                    }
                    .card .box{
                        width: calc(100% - 40px);
                    }
                    .box .name{
                        font-size: 20px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Downloads
