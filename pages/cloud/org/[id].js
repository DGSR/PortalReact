import React from "react";
import Head from "next/head";
import Link from "next/link";
import Translator from "../../../components/Translator";
import {msToTime,ScriptRemover} from "../../../components/Instruments";

let glob=[];

const PostLink = props => (
    <>
        <Link href="../vdc/[id]" as={`../vdc/${props.id}`}>
            <a onClick={()=>{
                let t=glob.find(x => x.properties.name === props.id);
                props.setVal("vdc",t)
            }}>{props.id}</a>
        </Link>
    </>
);

class Org extends React.Component{
    state={
        arr:[],
    };
    DataFetcher=(Oid)=>{
        fetch("https://bridge.linxdatacenter.com/api/v1/app/"+this.props.st.company+"/cloud/org/"+Oid.toLowerCase()+"/vdc", {
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
                    glob = data;
                }
            })
            .catch((error) => {
                alert(error);
                document.getElementsByClassName("err")[0].style.display="block"}
            );
    };

    render() {
        let arr1;
        if(this.state.arr!==null &&  this.state.arr!==undefined) {
            arr1 = this.state.arr.map(item => <tr
                key={item.properties.id} item={item}>
                <td>{item.properties.name}</td>
                <td>{item.cloud}</td>
                <td>{item.cpu_used} / {item.cpu_limit}</td>
                <td>{item.ram_used} / {item.ram_limit}</td>
                <td>
                    {item.sata_allocated?item.sata_allocated+" / ":"-"}
                    {(item.sata_used && item.sata_used!==item.sata_allocated)?item.used+ " / ":null}
                    {item.sata_ordered?item.sata_ordered:null}
                </td>
                <td>
                    {item.sas_allocated?item.sas_allocated+" / ":"-"}
                    {(item.sas_used && item.sas_used!==item.sas_allocated)?item.sas_used+ " / ":null}
                    {item.sas_ordered?item.sas_ordered:null}
                </td>
                <td>
                    {item.ssd_allocated?item.ssd_allocated+" / ":"-"}
                    {(item.ssd_used && item.ssd_used!==item.ssd_allocated)?item.ssd_used+ " / ":null}
                    {item.ssd_ordered?item.ssd_ordered:null}
                </td>
                <td>{item.is_enabled?<Translator page="resources" comp="enabled" lang={this.props.lang}/>:<Translator page="resources" comp="disabled" lang={this.props.lang}/>}</td>
                <td><PostLink id={item.properties.name} name={item.properties.name} setVal={this.props.setVal}/></td>
            </tr>);
            if (document.getElementsByClassName("dataTables_empty")[0])
                document.getElementsByClassName("dataTables_empty")[0].remove();
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
                                        <h4 className="page-title float-left"><Translator page="resources" comp="organizationResources" lang={this.props.lang}/>&nbsp;{this.props.st.org.full_name}</h4>
                                        <ol className="breadcrumb float-right">
                                            <li className="breadcrumb-item"><a href="#"><Translator page="common" comp="portal" lang={this.props.lang}/></a></li>
                                            <li className="breadcrumb-item"><Translator page="resources" comp="title" lang={this.props.lang}/></li>
                                            <li className="breadcrumb-item">{this.props.st.org.properties.name}</li>
                                        </ol>
                                        <div className="clearfix"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="coll col-xs-12 col-md-12 col-lg-12  col-xl-6">
                                    <div id="cardbox01" className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><Translator page="resources" comp="description" lang={this.props.lang}/></h4>
                                        <div id="datatable_wrapper"
                                             className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {this.props.st.org.description}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div id="cardbox02" className="card-box tilebox-two">

                                        <h3 className="m-b-10 float-right">{this.props.st.org.network_quota}</h3>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="networkquota" lang={this.props.lang}/></h6>

                                        <div className="radio radio-success radio-single float-right">
                                            <input type="radio" id="singleRadio2" value="option2.1" name="radioSingle1"
                                                   checked={this.props.st.org.is_enabled} aria-label="Single radio Two" readOnly/>
                                            <label/>
                                        </div>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="main" comp="status" lang={this.props.lang}/></h6>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div id="cardbox03" className="card-box tilebox-two">
                                        <i className="wi wi-cloudy float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-10">{this.props.st.org.cloud}</h2>
                                    </div>
                                </div>

                            </div>

                            <div className="row">

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-cloud-refresh float-right text-muted"/>
                                        <h6 className="text-pink text-uppercase m-b-15 m-t-10"><Translator page="resources" comp="lastUpdated" lang={this.props.lang}/></h6>
                                        <h3 className="m-b-10">{msToTime(this.props.st.org.updated,this.props.st.language)}</h3>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="icon-cloud-upload float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15">CPU <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.org.cpu_used} / {this.props.st.org.cpu_allocated}&nbsp;<Translator page="resources" comp="ghz" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-info"
                                                 role="progressbar" style={{width: (this.props.st.org.cpu_used/this.props.st.org.cpu_allocated*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="zmdi zmdi-cloud-upload float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15">RAM <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.org.ram_used} / {this.props.st.org.ram_allocated}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-success"
                                                 role="progressbar" style={{width: (this.props.st.org.ram_used/this.props.st.org.ram_allocated*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="coll col-xs-12 col-md-6 col-lg-6 col-xl-3">
                                    <div className="card-box tilebox-two">
                                        <i className="wi wi-fog float-right text-muted"/>
                                        <h6 className="text-muted text-uppercase m-b-15"><Translator page="resources" comp="storage" lang={this.props.lang}/> <Translator page="resources" comp="used" lang={this.props.lang}/></h6>
                                        <h2 className="m-b-20">{this.props.st.org.storage_used} / {this.props.st.org.storage_allocated}&nbsp;<Translator page="resources" comp="gb" lang={this.props.lang}/></h2>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-striped bg-warning"
                                                 role="progressbar" style={{width: (this.props.st.org.storage_used/this.props.st.org.storage_allocated*100).toFixed(0)+"%"}}
                                                 aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card-box table-responsive">
                                        <p className="err"><Translator page="common" comp="errorLoadingData" lang={this.props.lang}/></p>
                                        <table id="key-table-org" className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th><Translator page="resources" comp="vdcName" lang={this.props.lang}/></th>
                                                <th><Translator page="resources" comp="cloudLocation" lang={this.props.lang}/></th>
                                                <th>
                                                    <span>CPU <Translator page="resources" comp="used" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="ghz" lang={this.props.lang}/></span>
                                                </th>
                                                <th>
                                                    <span>RAM <Translator page="resources" comp="used" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                                <th>
                                                    <span>SATA <Translator page="resources" comp="allocated" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                                <th>
                                                    <span>SAS <Translator page="resources" comp="allocated" lang={this.props.lang}/></span>
                                                    <span className="float-right"><Translator page="resources" comp="gb" lang={this.props.lang}/></span>
                                                </th>
                                                <th><span>SSD <Translator page="resources" comp="allocated" lang={this.props.lang}/></span>
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
        this.DataFetcher(this.props.st.org.org_id);
        console.log("active org");
        if(!document.getElementById("cloud").classList.contains("active")) {
            document.getElementById("cloud").classList.add("active");
           if(document.getElementById("orgLink"))
                document.getElementById("orgLink").classList.add("active");
        }
    }
}

export default Org;
