import React from "react";
import Translator from "./Translator";

const MainPage =props=> (
  <div>
      <div className="content-page">
        <div className="content">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-xl-12">
                        <div className="page-title-box">
                            <h4 className="page-title float-left"><Translator page="main" comp="title" lang={props.lang}/> &nbsp;</h4>
                            <ol className="breadcrumb float-right">
                                <li className="breadcrumb-item"><a href="#"><Translator page="common" comp="portal" lang={props.lang}/></a></li>
                                <li className="breadcrumb-item active"><Translator page="main" comp="title" lang={props.lang}/></li>
                            </ol>
                            <div className="clearfix"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box tilebox-one">
                            <i className="icon-layers float-right text-muted"></i>
                            <h6 className="text-muted text-uppercase m-b-20"><Translator page="main" comp="card-1" lang={props.lang}/></h6>
                            <h2 className="m-b-20">2</h2>
                            <span className="label label-success"> 48 </span> <span className="text-muted"><Translator page="main" comp="card-1-caption" lang={props.lang}/></span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box tilebox-one">
                            <i className="icon-layers float-right text-muted"/>
                            <h6 className="text-muted text-uppercase m-b-20"><Translator page="main" comp="card-2" lang={props.lang}/></h6>
                            <h2 className="m-b-20">42</h2>
                            <span className="label label-danger"> 5/6 <Translator page="main" comp="kw" lang={props.lang}/> </span> <span className="text-muted"><Translator page="main" comp="card-2-caption" lang={props.lang}/></span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box tilebox-one">
                            <i className="icon-layers float-right text-muted"/>
                            <h6 className="text-muted text-uppercase m-b-20"><Translator page="main" comp="card-3" lang={props.lang}/></h6>
                            <h2 className="m-b-20">10</h2>
                            <span className="label label-pink"> 8.5 <Translator page="main" comp="Gbps" lang={props.lang}/> </span> <span className="text-muted"><Translator page="main" comp="card-3-caption" lang={props.lang}/></span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box tilebox-one">
                            <i className="icon-layers float-right text-muted"/>
                            <h6 className="text-muted text-uppercase m-b-20"><Translator page="main" comp="card-4" lang={props.lang}/></h6>
                            <h2 className="m-b-20">12</h2>
                            <span className="label label-warning"> 8 <Translator page="main" comp="TB" lang={props.lang}/> </span>
                            <span className="text-muted"> <Translator page="main" comp="card-4-caption" lang={props.lang}/> </span>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xs-12 col-lg-12 col-xl-6">
                        <div className="card-box">

                            <h4 className="header-title m-t-0 m-b-20"><Translator page="main" comp="chart-cloud" lang={props.lang}/></h4>

                            <div className="text-center">
                                <ul className="list-inline chart-detail-list m-b-0">
                                    <li className="list-inline-item">
                                        <h6 style={{color: "#3db9dc"}}>
                                            <i className="zmdi zmdi-circle-o m-r-5"/><Translator page="main" comp="cpuConsumed" lang={props.lang}/>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 style={{color: "#1bb99a"}}>
                                            <i className="zmdi zmdi-triangle-up m-r-5"/><Translator page="main" comp="ramConsumed" lang={props.lang}/>
                                        </h6>
                                    </li>
                                    <li className="list-inline-item">
                                        <h6 style={{color: "#818a91"}}>
                                            <i className="zmdi zmdi-square-o m-r-5"/><Translator page="main" comp="storageConsumed" lang={props.lang}/>
                                        </h6>
                                    </li>
                                </ul>
                            </div>

                            <div id="morris-bar-stacked" style={{height: "320px"}}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-12 col-xl-6">
                        <div className="card-box">
                            <h4 className="header-title m-t-0 m-b-20"><Translator page="main" comp="chart-network" lang={props.lang}/></h4>
                            <div className="list-inline chart-detail-list m-b-0" style={{marginBottom:"24px"}}>
                                <h6 className="text-muted m-bCC-30">
                                    <Translator page="main" comp="chart-network-caption" lang={props.lang}/>
                                </h6>
                            </div>
                            <div className="p-20">
                                <div id="flotRealTime" style={{height: "280px"}} className="flot-chart"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-xs-12 col-lg-12 col-xl-12">
                        <div className="card-box">

                            <h4 className="header-title m-t-0 m-b-30"><Translator page="main" comp="chart-table" lang={props.lang}/></h4>

                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                    <tr>
                                        <th><Translator page="main" comp="company" lang={props.lang}/></th>
                                        <th><Translator page="main" comp="startdate" lang={props.lang}/></th>
                                        <th><Translator page="main" comp="enddate" lang={props.lang}/></th>
                                        <th><Translator page="main" comp="status" lang={props.lang}/></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th className="text-muted">Apple Technology</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-success"><Translator page="main" comp="paid" lang={props.lang}/></span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Envato Pty Ltd.</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-danger"><Translator page="main" comp="unpaid" lang={props.lang}/></span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Dribbble LLC.</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-success"><Translator page="main" comp="paid" lang={props.lang}/></span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Adobe Family</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-success"><Translator page="main" comp="paid" lang={props.lang}/></span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Apple Technology</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-danger"><Translator page="main" comp="unpaid" lang={props.lang}/></span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-muted">Envato Pty Ltd.</th>
                                        <td>20/02/2014</td>
                                        <td>19/02/2020</td>
                                        <td><span className="label label-success"><Translator page="main" comp="paid" lang={props.lang}/></span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default MainPage;
