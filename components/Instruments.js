export function msToTime(msTime,lang){
    if(msTime>= 1000 * 60 * 60 * 24){
        var days = Math.floor(msTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((msTime-days*1000 * 60 * 60 * 24 )/ (1000 * 60 * 60));
        if(lang==="ru")
            return days.toString() + " Дней "+hours.toString()+" Часов "+ Math.floor((msTime -days*1000*60*60*24 - hours*1000*60*60)/(1000*60)).toString() + " Мин";
        else
            return days.toString() + " Days "+hours.toString()+" Hrs "+ Math.floor((msTime -days*1000*60*60*24 - hours*1000*60*60)/(1000*60)).toString() + " Min";
    }
    else if(msTime>=1000 * 60 * 60){
        var hours = Math.floor(msTime / (1000 * 60 * 60));
        var minutes = Math.floor((msTime - hours * 1000 * 60 * 60)/(1000*60));
        console.log("Hours",hours,minutes);
        if(lang==="ru")
            return hours.toString() + " Часов "+minutes.toString()+" Мин "+ Math.floor((msTime -hours*1000*60*60 - minutes*1000*60)/1000).toString() + " Сек";
        else
            return hours.toString() + " Hrs "+minutes.toString()+" Min "+ Math.floor((msTime -hours*1000*60*60 - minutes*1000*60)/1000).toString() + " Sec";
    }
    else if(msTime>= 1000*60){
        var minutes = Math.floor(msTime / (1000 * 60));
        if(lang==="ru")
            return minutes.toString()+" Мин " + Math.floor((msTime - minutes*1000*60)/1000).toString() + " Сек";
        else
            return minutes.toString()+" Min " + Math.floor((msTime - minutes*1000*60)/1000).toString() + " Sec";
    }
    else{
        if(lang==="ru")
            return Math.floor(msTime / 1000).toString() + " Сек";
        else
            return Math.floor(msTime / 1000).toString() + " Sec";
    }
}
//Removes script
export function ScriptRemover(filename){
    let allSuspects=document.getElementsByTagName("script");
    for (let i=allSuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
        if (allSuspects[i] && allSuspects[i].getAttribute("src")!==null && allSuspects[i].getAttribute("src").indexOf(filename)!==-1)
            allSuspects[i].parentNode.removeChild(allSuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
