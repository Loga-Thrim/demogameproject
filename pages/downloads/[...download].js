import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

const Detaildownloads = (prop)=>{
    const [downloadDetail, setDownloadDetail] = useState({
        name: "",
        detail: "",
        status: "",
        imageUrl: ""
    })
    const router = useRouter()
    const id = router.query.download

    useEffect(()=>{
        if(id){
            let url = "https://api-cashweb.olafs.co/cs/blogs/"+id[0];

            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then(res=>res.json())
            .then(result=>{
                const { name, detail, status, imageUrl } = result
                setDownloadDetail({name, detail, status, imageUrl})
            })
        }
    }, [id])

    return(
        <div className="container">
            <img src="/title-profile.png" className="image-title" alt=""/>
            <div className="content">
                <h1 style={{fontSize: 40, textAlign: 'center'}}>Download</h1> <br/><br/>

                <div className="card-downloadDetail">
                    <img src={downloadDetail.imageUrl} style={{width: '100%'}} alt=""/>
                    <div className="box">
                        <span className="name">{downloadDetail.name}</span>
                        <span className="status">{downloadDetail.status}</span> <br/><br/><br/>
                        <span className="detail">รายระเอียด</span> <br/>
                        <span>{parse(downloadDetail.detail)}</span>
                    </div>
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
                    width: 60%;
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                    top: 70px;
                    padding: 50px 0;
                }
                .card-downloadDetail{
                    position: relative;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, .7);
                }
                .box{
                    width: 100%;
                    padding: 30px 50px;
                }

                .box .name{
                    padding-top: 50px;
                    font-weight: bold;
                    font-size: 26px;
                }
                .box .status{
                    padding-left: 100px;
                    font-weight: bold;
                    font-size: 26px;
                    color: rgb(50, 200, 50);
                }
                .box .detail{
                    font-size: 18px;
                }

                @media only screen and (max-width: 1000px){
                    .content{
                        width: 70%;
                    }
                }

                @media only screen and (max-width: 650px){
                    .content{
                        width: 90%;
                    }
                }

                @media only screen and (max-width: 400px){
                    .box{
                        padding: 30px 20px;
                    }

                    .box .name{
                        font-size: 22px;
                    }
                    .box .status{
                        padding-left: 70px;
                        font-size: 22px;
                    }
                    .box .detail{font-size: 16px;}
                }
            `}</style>
        </div>
    )
}

export default Detaildownloads;