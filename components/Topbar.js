import Link from "next/link";
import Translator from "./Translator";

const Topbar=props=>{
    return(
    <div className="topbar">

        <div className="topbar-left">
            <Link href="/">
            <a href="index.html" className="logo">
                <i className="icon-linx"/>
                <span>linxdatacenter</span></a>
            </Link>
        </div>

        <nav className="navbar-custom">

            <ul className="list-inline float-right mb-0">

                <li className="list-inline-item dropdown notification-list">
                    <a  className="nav-link waves-effect waves-light" data-toggle="dropdown"
                        role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="zmdi zmdi-globe-alt noti-icon">{props.lang[0].toUpperCase()+props.lang[1]}</i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">
                        <div className="dropdown-item languageSelect">
                            <h5 className="text-overflow"><small><Translator page="topbar" comp="language" lang={props.lang}/></small></h5>
                        </div>

                        <a className="dropdown-item notify-item" onClick={()=>Switch(props,"en")}>
                            <i className="flag flag-en"></i> <span>English</span>
                        </a>

                        <a className="dropdown-item notify-item"  onClick={()=>Switch(props,"ru")}>
                            <i className="flag flag-ru"></i> <span>Русский</span>
                        </a>

                    </div>
                </li>

                <li className="list-inline-item dropdown notification-list">
                    <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown"
                       role="button" aria-haspopup="false" aria-expanded="false">
                        <img src={"/assets/images/users/avatar-1.jpg"} alt="user" className="rounded-circle"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">

                        <div className="dropdown-item noti-title">
                            <h5 className="text-overflow"><small><Translator page="topbar" comp="greet" lang={props.lang}/></small></h5>
                        </div>

                        <a className="dropdown-item notify-item">
                            <i className="zmdi zmdi-account-circle"/> <span><Translator page="topbar" comp="profile" lang={props.lang}/></span>
                        </a>

                        <a className="dropdown-item notify-item">
                            <i className="zmdi zmdi-settings"/> <span><Translator page="topbar" comp="settings" lang={props.lang}/></span>
                        </a>

                        <a className="dropdown-item notify-item" onClick={()=>Logout(props)}>
                            <i className="zmdi zmdi-power"/> <span><Translator page="topbar" comp="logout" lang={props.lang}/></span>
                        </a>
                    </div>
                </li>
            </ul>

            <ul className="list-inline menu-left mb-0">
                <li className="float-left">
                    <button className="button-menu-mobile open-left waves-light waves-effect" onClick={openSidebar}>
                        <i className="zmdi zmdi-menu"/>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
);
};

function Logout(props) {
    localStorage.setItem('sid','');
    props.setVal('sid','');
}
function Switch(props,lang) {
    props.setVal("language",lang);
    localStorage.setItem("lang",lang);
}

function  openSidebar(){
    let wrapper=document.getElementById("wrapper");
    !wrapper.classList.contains("forced")?wrapper.classList.add("forced"):null;
    wrapper.classList.contains("enlarged")?wrapper.classList.remove("enlarged"):wrapper.classList.add("enlarged");
    if( wrapper.classList.contains("enlarged")&&  document.body.classList.contains("fixed-left")) {
        document.body.classList.remove("fixed-left");
        document.body.classList.add("fixed-left-void");
    }
    else if(!(wrapper.classList.contains("enlarged")) &&  document.body.classList.contains("fixed-left-void")){
        document.body.classList.add("fixed-left");
        document.body.classList.remove("fixed-left-void");
    }

    if(wrapper.classList.contains("enlarged")){
        document.querySelectorAll(".left ul").forEach(el=> el.removeAttribute("style"))
    }
    else {
        document.querySelectorAll(".left ul").forEach(elem=>{
           if(elem.parentNode.classList.contains("menuOpen")){
            elem.parentNode.querySelectorAll("ul").forEach(el=>el.style.display="block")
           }
        });
    }
}

export default Topbar;
