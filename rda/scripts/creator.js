//----------------------------------------------//
//--- RDA Save Creator Scripts | Adrian Lost ---//
//----------------------------------------------//
/*
    All the scripts for the RDA save creator.
    Copyright (C) 2023 helpLost
    
    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public 
    License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any 
    later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public 
    License for more details. You should have received a copy of the GNU General Public License along 
    with this program.  If not, see <https://www.gnu.org/licenses/>. For the full license file, see <LICENSE.md>.

    For any buisness or program-related inquiries email me at helplost30@gmail.com.
*/

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