//--------------------------------------//
//--- RDA Game Scripts | Adrian Lost ---//
//--------------------------------------//
/*
    All the scripts for the RDA game file. Almost every game function is stored in this file.
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

//#region DATA
    let data = {};

    function collect() {
        const params = new URLSearchParams(window.location.search);
        data.player.king = params.get('k'); data.player.kingdom = params.get('ki'); data.player.cities.capital = params.get('c');
        data.player.culture.new = params.get('cu'); data.player.culture.name = params.get('cn'); data.player.culture.tenet = params.get('ct');
        data.player.religion.new = params.get('r'); data.player.religion.name = params.get('rn'); data.player.religion.tenet = params.get('rt'); data.player.religion.value = params.get('rv');
        data.game.achievements = params.get('a'); data.game.cheats = params.get('ch'); data.game.save = params.get('s'); data.game.difficulty = params.get('d');
    
        if (data.game.release) { window.history.replaceState({}, document.title, "/" + "game.html"); } else { utils.dlog(data); }
        kidisplay(); kdisplay();
        document.getElementById("date").innerText = "Beginning clock..."; cdisplay(); utils.set(data.game.tick, clock);

        rdisplay(); cinit();
    }
    function dataset(value) { data = value; collect(); }
//#endregion

//#region RESOURCES
    function rspc(chnc, resource) { let random = Math.floor(Math.random() * chnc); if (random == 0) { data.player.resources[`${resource}`] += 1; } }
    function radd(type, resource) { data.player.resources[`${resource}`][0] += data.player.resources[`${type}`]; if (data.player.resources[`${resource}`][0] >= data.player.caps[`${resource}`]) { data.player.resources[`${resource}`][0] = data.player.caps[`${resource}`]; } rspc(data.player.resources[`${resource}`][1], data.player.resources[`${resource}`][2]); rdisplay(); }
    function rsub(amnt, resource) { data.player.resources[`${resource}`][0] -= amnt; if (data.player.resources[`${resource}`][0] <= 0) { data.player.resources[`${resource}`] = 0; } }
//#endregion

//#region WORKERS

//#endregion

//#region CLOCK

//#endregion

//#region CONSOLE
    let eventlog = document.getElementById("events").getElementsByClassName("entry"), eventRepeat = 1;
    function cinit() { for(let i = 0; i < eventlog.length; i++) { eventlog.item(i).childNodes.item(0).innerText = "(" + utils.time(":", true) + ")"; eventlog.item(i).childNodes.item(1).innerText = "No events have yet occurred."; eventlog.item(i).childNodes.item(2).innerText = "(x" + eventRepeat + ")"; } }
    function colog() { }
//#endregion

//--- Clock Functions --//
let months = {"January": 31, "Febuary": [28, 29], "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};

function cdisplay() { document.getElementById("date").innerText = Object.entries(months)[data.game.date.month][0] + " " + utils.list(data.game.date.day) + ", " + (data.game.date.appellation != "AD" ? utils.comma(data.game.date.year) : data.game.date.year) + " " + data.game.date.appellation; }
function clock() {
    if (data.game.date.hour < 24) { data.game.date.hour++; return; } else { data.game.date.hour = 1; data.game.date.day++; }
    if (data.game.date.day > (!data.game.date.leap && data.game.date.month != 1 ? Object.entries(months)[data.game.date.month][1] : (!data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][0] : (data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][1] : Object.entries(months)[data.game.date.month][1])))) { data.game.date.day = 1; data.game.date.month++; }
    if (data.game.date.month > 11) { data.game.date.month = 0; (data.game.date.appellation == "BC" ? data.game.date.year-- : data.game.date.year++); ((data.game.date.year / 4).toString().indexOf('.') > -1 ? data.game.date.leap = true : data.game.date.leap = false) }
    if (data.game.date.appellation == "BC" && data.game.date.year < 0) { data.game.date.appellation = "AD"; }
    
    cdisplay();
}


//--- Background Game Functions ---//
function kidisplay() { document.getElementById("name").innerText = "The " + data.player.civ.kingdom + " of " + data.player.kingdom; }
function kdisplay() { document.getElementById("ruler").innerText = "Ruled by the " + data.player.civ.prestige + " " + data.player.civ.king + " " + data.player.king; }

function rdisplay() { document.getElementById("flabel").innerText = "Food: " + data.player.resources.food[0]; document.getElementById("wlabel").innerText = "Wood: " + data.player.resources.wood[0]; document.getElementById("slabel").innerText = "Stone: " + data.player.resources.stone[0]; document.getElementById("ilabel").innerText = "Hide: " + data.player.resources.hide; document.getElementById("hlabel").innerText = "Herbs: " + data.player.resources.herbs; document.getElementById("rlabel").innerText = "Roots: " + data.player.resources.roots; document.getElementById("olabel").innerText = "Ore: " + data.player.resources.ore; }

function rset(regions) { data.game.regions = regions; prset(); }
function redisplay() { document.getElementById("region").innerText = data.player.region.subcontinent + " " + data.player.region.continent + " " + data.player.civ.type}
function prset() { 
    let random = Math.floor(Math.random() * 3); 
    data.player.region.continent = Object.entries(data.game.regions.continents)[random][1].ethnicity;
    data.player.region.subcontinent = Object.entries(data.game.regions.continents)[random][1].subs[Math.floor(Math.random() * Object.entries(data.game.regions.continents)[random][1].subs.length)];
    redisplay();
}
//-- Append all the text to where it's needed and start any beginning-of-game functions. --//

//TODO: CLEAN
function setup() {
    utils.port("default").then(res => dataset(res)); utils.port("regions").then(res => rset(res));

    document.getElementById("resources").addEventListener('click', function() { utils.toggle("subjects", 0); });
    document.getElementById("workers").addEventListener('click', function() { utils.toggle("subjects", 1); });
    document.getElementById("happiness").addEventListener('click', function() { utils.toggle("subjects", 2); });
    document.getElementById("collection").addEventListener('click', function() { utils.toggle("subjects", 3); });
    
    document.getElementById("garrison").addEventListener('click', function() { utils.toggle("soldiers", 0); });
    document.getElementById("conquest").addEventListener('click', function() { utils.toggle("soldiers", 1); });
    document.getElementById("fortification").addEventListener('click', function() { utils.toggle("soldiers", 2); });
    
    document.getElementById("central").addEventListener('click', function() { utils.toggle("buildings", 0); });
    document.getElementById("city").addEventListener('click', function() { utils.toggle("buildings", 1); });
    document.getElementById("services").addEventListener('click', function() { utils.toggle("buildings", 2); });
    document.getElementById("military").addEventListener('click', function() { utils.toggle("buildings", 3); });

    document.getElementById("resource").addEventListener('click', function() { utils.toggle("research", 0); });
    document.getElementById("building").addEventListener('click', function() { utils.toggle("research", 1); });
    document.getElementById("diplomacy").addEventListener('click', function() { utils.toggle("research", 2); });

    document.getElementById("fharvest").addEventListener('click', function() { radd("click", "food"); });
    document.getElementById("wharvest").addEventListener('click', function() { radd("click", "wood"); });
    document.getElementById("sharvest").addEventListener('click', function() { radd("click", "stone"); });
}

window.onload = () => {
    utils.createBackground(true, "1", 0.6);
    window.addEventListener('resize', function() { utils.createBackground(false, "1", 0.6); })
    window.addEventListener('fullscreenchange', function() { utils.createBackground(false, "1", 0.6); })

    setup();
}