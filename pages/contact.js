import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const Contact = ()=>{
    const [contact, setContact] = useState("")
    useEffect(()=>{
        fetch("https://api-cashweb.olafs.co/cs/contact", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            setContact(result.value)
        })
    }, [])
    
    return(
        <div className="container">
            <img src="title-profile.png" className="image-title" alt=""/>
            <div className="content">
                <h1>ติดต่อเรา</h1> <br/><br/><br/>

                {parse(contact)}
            </div>

            <style jsx>{`
                .container{
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    top: 0;
                    margin: 0;
                    padding: 0;
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
                    top: 80px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

export default Contact