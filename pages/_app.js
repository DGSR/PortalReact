import React from "react";
import App from "next/app";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import Login from "./login";
import {ScriptRemover} from "../components/Instruments";

//Router events(works while loading between pages)
Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`);

    console.log(url.split("/")[1],Router.route.split("/")[1])
    //Clean some of previous page leftovers
    //All active(first of all left sidebar menu)
    if(url.split("/")[1]!==Router.route.split("/")[1] || url.split("/")[2]!==Router.route.split("/")[2]) {
        if (document.getElementById("sidebar-menu")) {
            while (document.getElementById("sidebar-menu").getElementsByClassName("active").length !== 0)
                document.getElementById("sidebar-menu").getElementsByClassName("active")[0].classList.remove("active");
        }
    }
    //Spinner for loading between pages
    NProgress.start();
    NProgress.configure({ trickleSpeed: 200 });
});
Router.events.on('routeChangeComplete', ()=>{ NProgress.done();});
Router.events.on('routeChangeError', ()=>{ NProgress.done();});

 class MainApp extends App{
     //delayedLoad is needed to delay the attachment of scripts to topBar and sidebar
     //because login page doesnt have them
     delayedLoad=false;

    constructor(props) {
        super(props)
        this.state = {
            sid: "",
            company: "",
            org:{},
            vdc:{},
            vm:{},
        };
        if (typeof window !== 'undefined') {
            this.state.language= localStorage.getItem("lang")?localStorage.getItem("lang"):navigator.languages[1];
            if(!localStorage.getItem("lang"))
                localStorage.setItem("lang",navigator.languages[1]);
        }

    }
     setStateVal = (n, v) => {
         this.setState({[n]: v})
     };
    render() {
            const { Component, pageProps } = this.props;
            let links=<>
                <Head>
                <link rel="shortcut icon" href="/assets/images/favicon.ico"/>
                <link href="/assets/css/nprogress.css" rel="stylesheet" type="text/css"/>
                <link href="/assets/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/assets/css/style.css" rel="stylesheet"/>
                <link href="/assets/css/reactStyle.css" rel="stylesheet"/>

                <link href="/assets/plugins/morris/morris.css" rel="stylesheet"/>
                <link href="/assets/plugins/switchery/switchery.min.css" rel="stylesheet"/>
                <script src="/assets/js/modernizr.min.js"/>
                <script>var resizefunc = [];</script>
                <script src="/assets/js/jquery.min.js"/>
                <script src="/assets/js/popper.min.js"/>
                <script src="/assets/js/bootstrap.min.js"/>
                <script src="/assets/js/detect.js"/>
                <script src="/assets/js/fastclick.js"/>
                <script src="/assets/js/jquery.blockUI.js"/>
                <script src="/assets/js/waves.js"/>
                <script src="/assets/js/jquery.nicescroll.js"/>
                <script src="/assets/js/jquery.scrollTo.min.js"/>
                <script src="/assets/js/jquery.slimscroll.js"/>
                <script src="/assets/plugins/switchery/switchery.min.js"/>
                </Head>
            </>;
            if((this.props.Component.name.toLowerCase()!=="login" && this.state.sid)) {
                return <>
                    <div id="wrapper">
                        <Head><title>Portal</title></Head>
                        {links}
                        <Topbar setVal={this.setStateVal} lang={this.state.language}/>
                        <Sidebar lang={this.state.language} org={this.state.org} vdc={this.state.vdc} vm={this.state.vm}/>
                        <Component {...pageProps} lang={this.state.language} st={this.state}
                                   setVal={this.setStateVal} srcExe={ScriptExecutor}/>
                    </div>
                </>;
            }
            else {
                this.delayedLoad=true;
                return <>
                    <Login {...pageProps} setStates={this.setStateVal}/>
                    {links}
                    <Head><title>Login to Portal</title></Head>
                </>;
            }
    }
     componentDidMount() {
         if(localStorage.getItem('sid') && !(this.state.sid)) {
             this.setState({
                 sid: localStorage.getItem('sid'),
                 company:atob(localStorage.getItem('uid')).split('|')[1]
             });
         }
     }
     componentDidUpdate(){
         if(this.delayedLoad){
             ScriptExecutor("/assets/js/jquery.core.new.js");
             this.delayedLoad=false;
         }
         this.AllScriptExecutor()
     }

     //SCRIPT MANAGER: removes scripts
     AllScriptExecutor(){
        if(this.state.sid){
            ScriptRemover("jquery-ui.min.js");
            ScriptRemover("moment.js");
            ScriptRemover("morris.min.js");
            ScriptRemover("raphael-min.js");
            ScriptRemover("jquery.waypoints.min.js");
            ScriptRemover("jflotinit.js");
            ScriptRemover("jquery.flot.js");
            ScriptRemover("jquery.flot.tooltip.min.js");
            ScriptRemover("jquery.flot.resize.js");
            ScriptRemover("jquery.flot.crosshair.js");
            ScriptRemover("jquery.flot.axislabels.js");

            ScriptRemover("jquery.dataTables.min.js");
            ScriptRemover("dataTables.bootstrap4.min.js");
            ScriptRemover("dataTables.keyTable.min.js");
            ScriptRemover("jquery.vmstat.js");
        }
    }
}

//Loads script by appending to body
function ScriptExecutor(src) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
}

export default MainApp;
