import React from "react";
import Head from "next/head";
import Link from "next/link";
import Translator from "../../components/Translator";
import {ScriptRemover} from "../../components/Instruments";

let glob=[];

const PostLink = props => (
    <>
        <Link href="cloud/org/[id]" as={`cloud/org/${props.id}`}>
            <a onClick={()=>{
                let t=glob.find(x => x.properties.name === props.id);
                props.setVal("org",t)
            }}>{props.id}</a>
        </Link>
    </>
);

class Cloud extends React.Component{
    state={arr:null};
    DataFetcher(){
        fetch("https://bridge.linxdatacenter.com/api/v1/app/"+this.props.st.company+"/dashboard", {
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem("uid")+":"+localStorage.getItem("sid"),
            }})
            .then(r => r.json())
            .then(data => {
                if(data.status==="rejected"){
                    document.getElementsByClassName("err")[0].innerHTML=data;
                    document.getElementsByClassName("err")[0].style.display="block"
                }
                else if(data && this.state.arr!== data) {
                    this.setState({arr: data});
                    glob = data;
                }
            })
            .catch((error) => {
                document.getElementsByClassName("err")[0].innerHTML=error;
                document.getElementsByClassName("err")[0].style.display="block"}
                );
    };
    render() {
        let arr1;
        if(this.state.arr) {
            glob=this.state.arr;
            arr1 = this.state.arr.map(item => <tr
                key={item.org_id} item={item}>
                <td>{item.full_name}</td>
                <td>{item.cpu_used} / {item.cpu_allocated}</td>
                <td>{item.ram_used} / {item.ram_allocated}</td>
                <td>{item.storage_used} / {item.storage_allocated}</td>
                <td>{item.cloud}</td>
                <td><PostLink id={item.properties.name} name={item.properties.name} setVal={this.props.setVal}/></td>
            </tr>);
            if(document.getElementsByClassName("dataTables_empty")[0])
                document.getElementsByClassName("dataTables_empty")[0].remove();

        }
        return <>
            <Head>
                <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
            </Head>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="page-title-box">
                                    <h4 className="page-title float-left"><Translator page="resources" comp="title" lang={this.props.lang}/></h4>
                                    <ol className="breadcrumb float-right">
                                        <li className="breadcrumb-item"><a href="#"><Translator page="common" comp="portal" lang={this.props.lang}/></a></li>
                                        <li className="breadcrumb-item active"><Translator page="resources" comp="title" lang={this.props.lang}/></li>
                                    </ol>
                                    <div className="clearfix"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card-box table-responsive">
                                    <p className="err"><Translator page="common" comp="errorLoadingData" lang={this.props.lang}/></p>
                                    <table id="key-table" className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th><Translator page="resources" comp="orgName" lang={this.props.lang}/></th>
                                            <th><span>CPU <Translator page="resources" comp="used" lang={this.props.lang}/></span>
                                                <span className="float-right"><Translator page="resources" comp="ghz" lang={this.props.lang}/></span>
                                            </th>
                                            <th><span>RAM <Translator page="resources" comp="used" lang={this.props.lang}/></span>
                                                <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                            </th>
                                            <th>
                                                <span>
                                                    <Translator page="resources" comp="storage" lang={this.props.lang}/> <Translator page="resources" comp="used" lang={this.props.lang}/>
                                                </span>
                                                <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                            </th>
                                            <th><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></th>
                                            <th><Translator page="resources" comp="detailsLink" lang={this.props.lang}/></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {arr1}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    componentDidMount() {
        this.DataFetcher();
        if(!document.getElementById("cloud").classList.contains("active")) {
            document.getElementById("cloud").classList.add("active");
            document.getElementById("summaryLink").classList.add("active");
        }
        if(document.getElementsByClassName("subdrop")[1])
            document.getElementsByClassName("subdrop")[1].classList.remove("subdrop");
        this.props.srcExe("assets/plugins/datatables/jquery.dataTables.min.js");
        this.props.srcExe("assets/plugins/datatables/dataTables.bootstrap4.min.js");
        this.props.srcExe("assets/pages/jquery.vmstat.js");
    }
    componentDidUpdate() {
        this.props.srcExe("assets/plugins/datatables/jquery.dataTables.min.js");
        this.props.srcExe("assets/plugins/datatables/dataTables.bootstrap4.min.js");
        this.props.srcExe("assets/pages/jquery.vmstat.js");
    }
    componentWillUnmount() {
        console.log("remove event");
        if(document.getElementById("key-table_wrapper")) {
            document.getElementById("key-table_wrapper").childNodes[0].remove();
            document.getElementById("key-table_wrapper").childNodes[1].remove();
        }
        ScriptRemover("jquery.vmstat.js");
        ScriptRemover("assets/plugins/datatables/jquery.dataTables.min.js");
        ScriptRemover("assets/plugins/datatables/dataTables.bootstrap4.min.js");
    }
}

export default Cloud;
