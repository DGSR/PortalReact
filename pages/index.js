import React from 'react';
import MainPage from "../components/MainPage";
import {ScriptRemover} from "../components/Instruments";

class Index extends React.Component{
    render() {
        return<>
            <MainPage lang={this.props.lang}/>
        </>;
    }
    componentDidMount(){
        this.props.srcExe("assets/plugins/waypoints/lib/jquery.waypoints.min.js");
        this.props.srcExe("assets/plugins/morris/morris.min.js");
        this.props.srcExe("assets/plugins/raphael/raphael-min.js");

        this.props.srcExe("assets/plugins/flot-chart/jquery.flot.js");
        this.props.srcExe("assets/plugins/flot-chart/jquery.flot.tooltip.min.js");
        this.props.srcExe("assets/plugins/flot-chart/jquery.flot.resize.js");
        this.props.srcExe("assets/plugins/flot-chart/jquery.flot.crosshair.js");
        this.props.srcExe("assets/plugins/flot-chart/jquery.flot.axislabels.js");
        this.props.srcExe("assets/pages/jflotinit.js");
        this.props.srcExe("assets/pages/jquery.index.js");
        document.getElementById("indexLink").classList.add("active");
    }
    componentDidUpdate() {
        document.getElementById("indexLink").classList.add("active");
    }
    componentWillUnmount() {
        ScriptRemover("jquery.waypoints.min.js");
        ScriptRemover("morris.min.js");
        ScriptRemover("raphael-min.js");

        ScriptRemover("jquery.flot.js");
        ScriptRemover("jquery.flot.tooltip.min.js");
        ScriptRemover("jquery.flot.resize.js");
        ScriptRemover("jquery.flot.crosshair.js");
        ScriptRemover("jquery.flot.axislabels.js");
        ScriptRemover("jflotinit.js");
        ScriptRemover("jquery.index.js");

    }
}
export default Index;
