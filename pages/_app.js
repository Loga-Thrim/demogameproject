import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from 'next/router'

import 'react-dropdown/style.css'
import Navbar from "../components/navbar";

// show ui loading with nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.onRouteChangeStart = () => {
  NProgress.start()
};
Router.onRouteChangeComplete = () => {
  NProgress.done()
};

export default class Games extends App {
  constructor(props) {
    super(props);
    
    this.state = {token: null}
  }

  render() {
    const { Component } = this.props;

    

    fetch("/api/getsessions", { method: "POST" }).then(result => {
      //if user result status 201 = login success || else status 204 = login fail
      if (result.status == 201) {
        const path = location.pathname
        
        if(path == "/" || path == "/register") Router.push("/profile")
        result.json().then(data => {
          if (this.state.token == null) this.setState({token: data.user.token});
        });
      } else {
        const path = location.pathname

        if(path == '/profile' || path == '/openuser' || path == '/mdeposit' || path == '/mwithdraw' || path == '/mstate'
        || path == '/changepassword' || path == '/history') Router.push("/")

        if (this.state.token != null) this.setState({token: null});
      }
    });

    return (
      <>
        <Head>
          <title>Games</title>
        </Head>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Pridi&display=swap");

          html,
          body {
            margin: 0;
            padding: 0;
            font-family: "Pridi", serif;
            overflow-x: hidden;
          }
        `}</style>

        {/* Navbar */}
        <Navbar user={this.state.token}></Navbar>


        <div className="container">
          <Component token={this.state.token}></Component>
        </div>

        <style jsx>{`
          .container{ margin-top: 54px }

          @media only screen and (max-width: 920px){
            .container{ margin-top: 35px }
          }
        `}</style>
      </>
    );
  }
}