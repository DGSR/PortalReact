import React from "react";
import Head from "next/head";
import Link from "next/link";
import Translator, {translateToText} from "../../../components/Translator";
import {msToTime, ScriptRemover} from "../../../components/Instruments";

let glob=[];

const PostLink = props => (
    <>
        <Link href="../vm/[id]" as={`../vm/${props.id}`}>
            <a onClick={()=>{
                let t=glob.find(x => x.properties.name === props.id);
                props.setVal("vm",t)
            }}>{props.id}</a>
        </Link>
    </>
);


class VDC extends React.Component{
    state={
        arr:[]
    };
    DataFetcher=(vdc_id)=>{
        fetch("https://bridge.linxdatacenter.com/api/v1/app/"+this.props.st.company+"/cloud/vdc/"+vdc_id+"/vm", {
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem("uid")+":"+localStorage.getItem("sid"),
            }})
            .then(r => r.json())
            .then(data => {
                if(data && this.state.arr!== data) {
                    this.setState({arr: data});
                    glob = data.vms;
                }
            })
            .catch((error) => {
                alert(error);
                if(document.getElementsByClassName("err")[0])
                    document.getElementsByClassName("err")[0].style.display="block"}
            );

    };

    render() {
        let arr1,arr2;
        if(this.state.arr!==null &&  this.state.arr!==undefined && this.state.arr.length!==0) {
            arr1 = this.state.arr.vms.map(item => <tr
                key={item.properties.id} item={item}>
                <td>{item.properties.name}</td>
                <td>{item.cloud}</td>
                <td>{item.cpu}</td>
                <td>{item.ram}</td>
                <td>{item.storage.reduce(function (total,cur){return total+cur.storage},0)}</td>
                <td>{item.is_enabled?"Enabled":"Disabled"}</td>
                <td><PostLink id={item.properties.name} name={item.properties.name} setVal={this.props.setVal}/></td>
            </tr>);
            if (document.getElementsByClassName("dataTables_empty")[0])
                document.getElementsByClassName("dataTables_empty")[0].remove();
        }
        if(this.props.st.vdc.storage_profile){
            arr2 = this.props.st.vdc.storage_profile.map(item => <tr
                key={item.storage_profile_id} item={item}>
                <td>{item.properties.name}</td>
                <td>{item.limit}</td>
                <td>{item.storage_used_mb}</td>
            </tr>);
        }
        return (
            <>
                <Head>
                    <link href="../../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
                </Head>
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="page-title-box">
                                        <h4 className="page-title float-left"><Translator page="resources" comp="vdcResources" lang={this.props.lang}/>&nbsp;{this.props.st.vdc.properties.name}</h4>
                                            <span id="hideShow" class="btn btn-sm btn-success" style={{marginLeft:"10px"}}
                                                  onClick={()=>{
                                                if(document.getElementById("1").style.display==="flex"){
                                                    document.getElementById("1").style.display="none";
                                                    document.getElementById("2").style.display="none";
                                                    document.getElementById("3").style.display="none";
                                                    document.getElementById("hideShow").innerText=translateToText("resources","showInfo",this.props.lang);
                                                }else{
                                                    document.getElementById("1").style.display="flex";
                                                    document.getElementById("2").style.display="flex";
                                                    document.getElementById("3").style.display="flex";
                                                    document.getElementById("hideShow").innerHTML=translateToText("resources","hideInfo",this.props.lang);
                                                }
                                                }}><Translator page="resources" comp="hideInfo" lang={this.props.lang}/>
                                            </span>
                                        <ol className="breadcrumb float-right">
                                            <li className="breadcrumb-item"><a><Translator page="common" comp="portal" lang={this.props.lang}/></a></li>
                                            <li className="breadcrumb-item">VDC</li>
                                            <li className="breadcrumb-item">{this.props.st.vdc.properties.name}</li>
                                        </ol>
                                        <div className="clearfix"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row" id="descriptionRow">
                                <div className="col-12">
                                    <div className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><Translator page="resources" comp="title" lang={this.props.lang}/></h4>
                                        <div id="datatable_wrapper"
                                             className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {this.props.st.vdc.description}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div id="1" className="row" style={{display:"flex"}}>
                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloudy float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-10">{this.props.st.vdc.cloud?this.props.st.vdc.cloud:"Loading..."}</h2>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="icon-cloud-upload float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15">CPU <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.cpu_used!==undefined?this.props.st.vdc.cpu_used+" / "+this.props.st.vdc.cpu_limit:0}&nbsp;<Translator page="resources" comp="ghz" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-info"
                                                 role="progressbar" style={{width: (this.props.st.vdc.cpu_used/this.props.st.vdc.cpu_limit*100).toFixed(0)+"%"}}
                                                 aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="zmdi zmdi-cloud-upload float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15">RAM <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.ram_used!==undefined?this.props.st.vdc.ram_used+" / "+this.props.st.vdc.ram_limit:0}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-success"
                                                 role="progressbar" style={{width: (this.props.st.vdc.ram_used/this.props.st.vdc.ram_limit*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="status" lang={this.props.lang}/></h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio1" value="option2.1" name="radioSingle1"
                                                   checked={this.props.st.vdc.is_enabled} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="m-b-15"><Translator page="resources" comp="enabled" lang={this.props.lang}/></h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio2" value="option2.1" name="radioSingle2"
                                                   checked={this.props.st.vdc.is_payg} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="m-b-15">Pay-as-you-go</h6>
                                    </div>
                                </div>

                            </div>

                            <div id="2" className="row" style={{display:"flex"}}>
                                <div id="sata" className="coll"  style={{display: this.props.st.vdc.sata_allocated?"block":"none"}}>
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-muted text-uppercase m-b-15">Sata <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.sata_used!==undefined?this.props.st.vdc.sata_used+" / "+this.props.st.vdc.sata_ordered+ " / "+this.props.st.vdc.sata_allocated :0}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-warning"
                                                 role="progressbar" style={{width: (this.props.st.vdc.sata_used/this.props.st.vdc.sata_ordered*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div id="sas" className="coll" style={{display: this.props.st.vdc.sas_allocated?"block":"none"}}>
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-muted text-uppercase m-b-15">SAS <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.sas_used!==undefined?this.props.st.vdc.sas_used+" / "+this.props.st.vdc.sas_ordered:0}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-warning"
                                                 role="progressbar" style={{width: (this.props.st.vdc.sas_used/this.props.st.vdc.sas_ordered*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div id="ssd" className="coll" style={{display: this.props.st.vdc.ssd_allocated?"block":"none"}}>
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-muted text-uppercase m-b-15">SSD <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.ssd_allocated!==undefined?this.props.st.vdc.ssd_used+" / "+this.props.st.vdc.ssd_ordered:0}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-warning"
                                                 role="progressbar" style={{width: (this.props.st.vdc.ssd_used/this.props.st.vdc.ssd_ordered*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="icon-cloud-upload float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15">vCPU</h6>
                                        <h2 className="m-b-20">{this.props.st.vdc.v_cpu_in_ghz!==undefined?this.props.st.vdc.v_cpu_in_ghz:0}&nbsp;<Translator page="resources" comp="ghz" lang={this.props.lang}/></h2>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloud float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="networkquota" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-10">{this.props.st.vdc.network_quota}</h2>
                                    </div>
                                </div>

                            </div>

                            <div id="3" className="row" style={{display:"flex"}}>

                                <div className="col-xs-12 col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloud-refresh float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="lastUpdated" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{msToTime(this.props.st.vdc.updated,this.props.st.language)}</h2>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-box table-responsive">
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="storagePolicy" lang={this.props.lang}/></h6>
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th><Translator page="resources" comp="limit" lang={this.props.lang}/></th>
                                                <th>
                                                    <span><Translator page="resources" comp="storage" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {arr2}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card-box table-responsive">
                                        <p className="err"><Translator page="common" comp="errorLoadingData" lang={this.props.lang}/></p>
                                        <table id="key-table-vdc" className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th><Translator page="resources" comp="vmName" lang={this.props.lang}/></th>
                                                <th><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></th>
                                                <th>CPU</th>
                                                <th>
                                                    <span>RAM</span>
                                                    <span className="float-right"><Translator page="resources" comp="ghz" lang={this.props.lang}/></span>
                                                </th>
                                                <th>
                                                    <span><Translator page="resources" comp="storage" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                                <th><Translator page="main" comp="status" lang={this.props.lang}/></th>
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
        )
    }
    componentDidMount() {
        this.DataFetcher(this.props.st.vdc.properties.id);
        console.log("vdc active")
        if(!document.getElementById("cloud").classList.contains("active")) {
            document.getElementById("cloud").classList.add("active");
            if(document.getElementById("vdcLink"))
                document.getElementById("vdcLink").classList.add("active");
        }
        if(document.getElementById("sata").style.display==="none"){
            if(document.getElementById("sas").style.display==="none")
                document.getElementById("ssd").classList.add("col-xs-12","col-md-12","col-lg-12","col-xl-6");
            else{
                document.getElementById("sas").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
                document.getElementById("ssd").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
            }
        }
        else if(document.getElementById("sas").style.display==="none"){
            if(document.getElementById("ssd").style.display==="none")
                document.getElementById("sata").classList.add("col-xs-12","col-md-12","col-lg-12","col-xl-6");
            else{
                document.getElementById("sata").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
                document.getElementById("ssd").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
            }
        }
        else if(document.getElementById("ssd").style.display==="none"){
            document.getElementById("sata").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
            document.getElementById("ssd").classList.add("col-xs-12","col-md-6","col-lg-6","col-xl-3");
        }
        else {
            document.getElementById("sata").classList.add("col-xs-6","col-md-4","col-lg-4","col-xl-2");
            document.getElementById("sas").classList.add("col-xs-6","col-md-4","col-lg-4","col-xl-2");
            document.getElementById("ssd").classList.add("col-xs-6","col-md-4","col-lg-4","col-xl-2");
        }
        if(!this.props.st.vdc.description)
            document.getElementById("descriptionRow").style.display="none";
    }
}

export default VDC;
