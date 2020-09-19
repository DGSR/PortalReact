import Link from "next/link";
import Translator, {translateToText} from "./Translator";
import React from "react";

const Sidebar=props=> {
    let org="";
    let vdc="";
    let vm="";
    if(props.org && Object.getOwnPropertyNames(props.org).length>0)
        org="org/"+props.org.properties.name;
    if(props.vdc && Object.getOwnPropertyNames(props.vdc).length>0)
        vdc="vdc/"+props.vdc.properties.name;
    if(props.vm && Object.getOwnPropertyNames(props.vm).length>0)
        vm="vm/"+props.vm.properties.name;
    return <div className="left side-menu">
        <div className="sidebar-inner slimscrollleft">
            <div id="sidebar-menu">
                <ul>
                    <li className="text-muted menu-title"><Translator page="sidebar" comp="main-caption"
                                                                      lang={props.lang}/><br/><br/></li>
                    <Link href="/">
                        <li className="has_sub">
                            <a id="indexLink" href="" className="waves-effect">
                                <i className="zmdi zmdi-view-dashboard"/><span><Translator page="main" comp="title"
                                                                                           lang={props.lang}/></span></a>
                        </li>
                    </Link>
                    <li className={document.body.classList.contains("enlarged") ? "has_sub" : "has_sub menuOpen"}>
                        <a id="cloud" className="waves-effect subdrop" onClick={(e) => menuItemClick(e)}>
                            <i className="zmdi zmdi-cloud-outline"/><span><Translator page="sidebar" comp="cloud"
                                                                                      lang={props.lang}/></span>
                            <span className="menu-arrow"/></a>
                        <ul className="list-unstyled"
                            style={{display: document.body.classList.contains("enlarged") ? "" : "block"}}>
                            <Link href="/cloud">
                                <li id="summaryLink"><a href=""><Translator page="sidebar" comp="summary"
                                                                            lang={props.lang}/></a></li>
                            </Link>
                            {(props.org && Object.getOwnPropertyNames(props.org).length>0)?
                                <Linker href="org/[id]" as={org} text={
                                    translateToText("sidebar","lastOrg",props.lang)+org.slice(4)
                                } idd="orgLink"/>:""}
                            {(props.vdc && Object.getOwnPropertyNames(props.vdc).length>0)?
                                <Linker href="vdc/[id]" as={vdc} text={
                                    translateToText("sidebar","lastVDC",props.lang)+vdc.slice(4)
                                } idd="vdcLink"/>:""}
                            {(props.vm && Object.getOwnPropertyNames(props.vm).length>0)?
                                <Linker href="vm/[id]" as={vm} text={
                                    translateToText("sidebar","lastVM",props.lang)+vm.slice(3)
                                } idd="vmLink"/>:""}
                        </ul>
                    </li>
                </ul>
                <div className="clearfix"/>
            </div>
            <div className="clearfix"/>
        </div>
    </div>
};

const Linker=props=>(
    <Link href={"/cloud/"+props.href} as={"/cloud/"+props.as}>
        <li id={props.idd}><a href>{props.text}</a></li>
    </Link>
);

function menuItemClick(e) {
    let p=e.target.parentNode;
    while(true) {
        if (p.tagName !== "LI")
            p=p.parentNode;
        else
            break;
    }
    if(p.classList.contains("menuOpen")) {
        p.classList.remove("menuOpen");
        p.querySelector("ul").removeAttribute("style");
    }
    else {
        p.classList.add("menuOpen");
        p.querySelector("ul").style.display="block";
    }
}
export default Sidebar;
