import React from "react";
import Link from "next/link";
import Translator from "../../../components/Translator";
import {ScriptRemover} from "../../../components/Instruments";

class VM extends React.Component{
    constructor() {
        super();
        this.showOS=this.showOS.bind(this);
        this.showDate=this.showDate.bind(this);
    }
    render() {
        let arr1,arr2,arr3;
        console.log(this.props);
        console.log(this.props.st.vm);
        if(this.props) {
            console.log("props check pass");
            if (this.props.st.vm.storage) {
                console.log("storage profile check pass ");
                if (document.getElementsByClassName("dataTables_empty")[0])
                    document.getElementsByClassName("dataTables_empty")[0].remove();
                arr2 = this.props.st.vm.storage.map(item => <tr
                    key={item.properties.id} item={item}>
                    <td>{item.storage}</td>
                    <td>{item.bus_type ? item.bus_type : "-"}</td>
                    <td>{item.unit_number ? item.unit_number : "-"}</td>
                    <td>{item.bus_number ? item.bus_number : "-"}</td>
                </tr>);
            }
            if (this.props.st.vm.networks) {
                console.log("network check pass ");
                arr1 = this.props.st.vm.networks.map(item => <tr
                    key={item.properties.id} item={item}>
                    <td>{item.ip_address ? item.ip_address : "-"}</td>
                    <td>{item.ip_mode? item.ip_mode:"-"}</td>
                    <td>{item.mac ? item.mac : "-"}</td>
                    <td>{item.is_connected ? "Yes" : "No"}</td>
                    <td>{item.is_primary ? "Yes" : "No"}</td>
                </tr>);
            }
            if(this.props.st.vm.storage_profile){
                arr3 = this.props.st.vdc.storage_profile.map(item => <tr
                    key={item.storage_profile_id} item={item}>
                    <td>{item.properties.name}</td>
                    <td>{item.limit}</td>
                    <td>{item.storage_used_mb}</td>
                </tr>);
            }
        }
        return (
            <>
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="page-title-box">
                                        <h4 className="page-title float-left"><Translator page="resources" comp="vmResources" lang={this.props.lang}/>&nbsp;{this.props.st.vm.properties.name}</h4>
                                        <ol className="breadcrumb float-right">
                                            <li className="breadcrumb-item"><a><Translator page="common" comp="portal" lang={this.props.lang}/></a></li>
                                            <li className="breadcrumb-item">VM</li>
                                            <li className="breadcrumb-item">{this.props.st.vm.properties.name}</li>
                                        </ol>
                                        <div className="clearfix"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloudy float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-10">{this.props.st.vm.cloud?this.props.st.vm.cloud:"Loading..."}</h2>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloud float-right text-muted"/>
                                        <h6 className="text-success text-uppercase m-b-15 m-t-10">CPU</h6>
                                        <h2 className="m-b-10">{this.props.st.vm.cpu?this.props.st.vm.cpu:"Loading..."}</h2>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-primary text-uppercase m-b-15 m-t-10">RAM</h6>
                                        <h3 className="m-b-10">{this.props.st.vm.ram?this.props.st.vm.ram:"Loading..."}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h3>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <h6 className="m-b-10 float-right">{this.props.st.vm.num_cpus?this.props.st.vm.num_cpus:"Loading..."}</h6>
                                        <h6 className="text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="numberOf" lang={this.props.lang}/> CPUs</h6>
                                        <h6 className="m-b-10 float-right">{this.props.st.vm.num_cores_per_socket?this.props.st.vm.num_cores_per_socket:"Loading..."}</h6>
                                        <h6 className="text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="numberOf" lang={this.props.lang}/>&nbsp;<Translator page="resources" comp="coresPerSocket" lang={this.props.lang}/></h6>
                                        <h6 className="m-b-10 float-right">{this.props.st.vm.boot_delay?this.props.st.vm.boot_delay:"N/A"}</h6>
                                        <h6 className="text-uppercase m-b-15">Boot delay</h6>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio1" value="option2.1" name="radioSingle1"
                                                   checked={this.props.st.vm.is_enabled} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="enabled" lang={this.props.lang}/></h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio2" value="option2.1" name="radioSingle2"
                                                   checked={this.props.st.vm.bios_setup} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15">BIOS Setup</h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio3" value="option2.1" name="radioSingle3"
                                                   checked={this.props.st.vm.guest_customization} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15">Guest Customization</h6>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio4" value="option2.1" name="radioSingle4"
                                                   checked={this.props.st.vm.vcpu_hot_add} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15">vCPU hot add</h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio5" value="option2.1" name="radioSingle5"
                                                   checked={this.props.st.vm.ram_hot_add} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15">RAM hot add</h6>
                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio6" value="option2.1" name="radioSingle6"
                                                   checked={this.props.st.vm.synchronize_time} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="synchroTime" lang={this.props.lang}/></h6>
                                    </div>
                                </div>

                                <div id="stat">
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="status" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.vm.status?this.props.st.vm.status.replace("_"," "):"Loading..."} </h2>
                                    </div>
                                </div>

                                <div id="vmTools" className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3" style={{display: this.props.st.vm.vm_tools_version?"block":"none"}}>
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloud float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10">VM tools</h6>
                                        <h2 className="m-b-10">{this.props.st.vm.vm_tools_version?this.props.st.vm.vm_tools_version:"N/A"}</h2>
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div id="OS" className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <h6 className="text-uppercase m-b-15 m-t-10">OS</h6>
                                        <h2 className="m-b-10">{this.props.st.vm.os?this.showOS():"Loading..."}</h2>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="zmdi zmdi-time float-right text-muted"/>
                                        <h6 className="text-success text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="dateCreated" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-10">{this.props.st.vm.date_created?this.showDate():"Loading..."}</h2>
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
                                            {arr3}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-box table-responsive">
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="hardDisk" lang={this.props.lang}/></h6>
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>
                                                    <span><Translator page="resources" comp="storage" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                                <th><Translator page="resources" comp="busType" lang={this.props.lang}/></th>
                                                <th>Unit Number</th>
                                                <th><Translator page="resources" comp="busNumber" lang={this.props.lang}/></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {arr2}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-box table-responsive">
                                        <h6 className="text-muted text-uppercase m-b-15">Network</h6>
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>IP Address</th>
                                                <th>IP mode</th>
                                                <th>MAC</th>
                                                <th><Translator page="resources" comp="connected" lang={this.props.lang}/></th>
                                                <th><Translator page="resources" comp="primary" lang={this.props.lang}/></th>
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
        if(!document.getElementById("cloud").classList.contains("active")) {
            document.getElementById("cloud").classList.add("active");
            if(document.getElementById("vmLink"))
                document.getElementById("vmLink").classList.add("active");
        }
        if(document.getElementById("vmTools").style.display==="none")
            document.getElementById("stat").classList.add("coll", "col-xs-12", "col-md-12", "col-lg-12", "col-xl-6");
        else
            document.getElementById("stat").classList.add("coll", "col-xs-12", "col-md-6", "col-lg-6", "col-xl-3");

    }
    showOS(){
        let temp = this.props.st.vm.os;
        let l=temp.length;
        for(let i=0;i<l;i++){
            if(temp[i]==="_"){
                temp=temp.slice(0,i)+" "+temp.slice(i+1);
            }
            else if( temp[i]===temp[i].toUpperCase() || ((temp[i] >= '0' && temp[i] <= '9'))){
                if((temp[i-1] >= '0' && temp[i-1] <= '9')&(temp[i] >= '0' && temp[i] <= '9'))
                    continue;
                temp=temp.slice(0,i)+" "+temp.slice(i);
                i++;
                l++;
            }
            else if(temp[i-1] >= '0' && temp[i-1] <= '9'){
                temp=temp.slice(0,i-1)+" "+temp.slice(i-1);
            }
        }
        temp = temp.replace(/ +(?= )/g,'');
        return temp;
    }
    showDate(){
        let temp=this.props.st.vm.date_created;
        return temp.slice(0,10)+" "+temp.slice(11,23)+" "+temp.slice(23);
    }
}

export default VM;
