//----------------------------------------------//
//--- RDA Save Creator Scripts | Adrian Lost ---//
//----------------------------------------------//
import * as utils from "./utilities.js"

function form() {
    let caffect = document.getElementsByClassName("caffect");
    let raffect = document.getElementsByClassName("raffect");
    if (document.getElementById("culture").checked) {
        document.getElementById("ethnicity").style.marginBottom = "5vh"; 
        for (let i = 0; i < caffect.length; i++) { caffect.item(i).style.display = "block"; }
    } else { document.getElementById("ethnicity").style.marginBottom = "0px"; for (let i = 0; i < caffect.length; i++) { caffect.item(i).style.display = "none"; } }

    if (document.getElementById("religion").checked) {
        for (let i = 0; i < raffect.length; i++) { raffect.item(i).style.display = "block"; }
    } else { for (let i = 0; i < raffect.length; i++) { raffect.item(i).style.display = "none"; } }
}

window.onload = () => {
    utils.createBackground(true, "creator", 0.85);
    window.addEventListener('resize', function() { utils.createBackground(false, "creator", 0.85); })
    window.addEventListener('fullscreenchange', function() { utils.createBackground(false, "creator", 0.85); })

    utils.hoverMessage("div", "Hover over any form item to see an explanation.");
    utils.hoverMessage("select", "If you want an explanation of each choice, hover over them.");

    form();
    document.getElementById("data").addEventListener('click', function() { form(); })
    document.getElementById("data").addEventListener('reset', function() { form(); })
}