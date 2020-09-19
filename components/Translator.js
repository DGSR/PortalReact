import React from "react";
import arr from "./Dictionary"

const Translator=props=>{
    if(props.renderSub)
        return <input placeholder={arr[props.page][props.comp][props.lang]} className={props.cl}
                type={props.type}/>;
    else
        return arr[props.page][props.comp][props.lang];
};

export function translateToText(page,comp,lang){
    return arr[page][comp][lang];
}

//export {translateToText};
export default Translator;
