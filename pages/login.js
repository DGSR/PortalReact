import React from "react";

export default class Login extends React.Component{
    Auth(e) {
        e.preventDefault();
        console.log("starting auth");
        fetch('https://bridge.linxdatacenter.com/api/v1/auth/login', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization':'Basic ' + btoa(document.getElementById("log").value + ":" + document.getElementById("pas").value),
                'Content-Type': 'application/json'
            },
        })
            .then(r => {
                if (r.status !== 200) {
                    alert(r.status+" "+r.statusText)
                    console.log("Wrong Credentials");
                    return "";
                }
                r.json().then((data) => {
                    localStorage.setItem('sid', data.sid);
                    localStorage.setItem('uid', data.uid);
                    this.props.setStates('sid',data.sid);
                    this.props.setStates('company',atob(data.uid).split('|')[1]);
                })
            })
            .catch((status,error) => {
            alert(error+status);
        });
    }
 render() {
     return <>
         <div className="account-pages"/>
         <div className="clearfix"/>
         <div className="wrapper-page">
             <div className="account-bg">
                 <div className="card-box mb-0">
                     <div className="text-center m-t-20">
                         <a href="/" className="logo">
                             <i className="icon-linx"/><span>Linxdatacenter</span>
                         </a>
                     </div>
                     <div className="m-t-10 p-20">
                         <div className="row">
                             <div className="col-12 text-center">
                                 <h6 className="text-muted text-uppercase m-b-0 m-t-0">Sign In</h6>
                             </div>
                         </div>
                         <form className="m-t-20" action="#">
                             <div className="form-group row">
                                 <div className="col-12">
                                     <input id="log" className="form-control" type="text" required=""
                                            placeholder="Username"/>
                                 </div>
                             </div>
                             <div className="form-group row">
                                 <div className="col-12">
                                     <input id="pas" className="form-control" type="password" required=""
                                            placeholder="Password" autoComplete="password"/>
                                 </div>
                             </div>

                             <div className="form-group text-center row m-t-10">
                                 <div className="col-12">
                                     <button className="btn btn-success btn-block waves-effect waves-light"
                                             type="submit"
                                             onClick={(e) => this.Auth(e)}>Log In
                                     </button>
                                 </div>
                             </div>

                         </form>
                     </div>
                     <div className="clearfix"/>
                 </div>
             </div>
         </div>
     </>;
 }
}
