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
"use strict";
import * as utils from "./utilities.js"

//#region DATA
    let version = [0, 0.0001]; // A flag for the current RDA version.
    let data = {};

    function collect() {
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of params) { // FIXME: improve
            let storage = key.substring(0, key.indexOf('.')), inner = key.slice(key.indexOf('.') + 1, (key.indexOf('.') != key.lastIndexOf('.') ? key.lastIndexOf('.') : key.length)), property = key.substring(storage.length + inner.length + 2, key.length + 1);
            (property == "" ? (data[storage][inner] = (value != "on" && value != "" ? value : value != "" ? true : false)) : (data[storage][inner][property] = (value != "on" && value != "" ? value : value != "" ? true : false)));
        }
        if (data.game.release) { window.history.replaceState({}, document.title, "/" + "game.html"); } else { utils.dlog(data); }
        
        document.getElementById("date").innerText = "Beginning clock...";
        utils.set(data.game.tick, clock); utils.set(data.game.tick, )
        cinit();
    }
    function dataset(value, inner) { (inner == undefined ? ( Object.assign(data, value), collect() ) : Object.assign(data[inner], value)); }
    function vcheck() { if (data.game.version[0] != version[0] || data.game.version[1] != version[1]) { utils.elog(
        "Your save version is out of date! (" + data.game.version[0] + "." + data.game.version[1] + " X " + version[0] + "." + version[1] + ") Errors might occur as you're playing. If you wish to play the version you created the save on, please download the files from the Github and host them locally."
    )}}
//#endregion
//#region STARTUP
    function setup() {
        utils.port("default").then(res => {
            dataset(res); vcheck(); utils.port("citizens").then(res => { dataset(res, "game"); utils.port("regions").then(res => { dataset(res, "game"); prset(); top_update(); game_update(); }) }); 
        });

        // TODO: shrink
        utils.ssetup("subjects"); utils.ssetup("soldiers"); utils.ssetup("buildings"); utils.ssetup("research");
        utils.eadd("fharvest", 'click', function() { radd("click", "food");  }); utils.eadd("wharvest", 'click', function() { radd("click", "wood");  });
        utils.eadd("sharvest", 'click', function() { radd("click", "stone"); });
    }
    window.onload = () => {
        utils.createBackground(true, "1", 0.6);
        window.addEventListener('resize', function() { utils.createBackground(false, "1", 0.6); }); 
        window.addEventListener('fullscreenchange', function() { utils.createBackground(false, "1", 0.6); })

        setup();
    }
//#endregion
//#region UMBRELLAS
    function top_update() {
        utils.display("name",   false, "The " + data.player.civ.kingdom + " of " + data.player.kingdom);
        utils.display("ruler",  false, "Ruled by the " + data.player.civ.prestige + " " + data.player.civ.king + " " + data.player.king);
        utils.display("region", false, data.player.region.subcontinent + " " + data.player.region.continent + " " + data.player.civ.type);
        utils.display("date",   false, Object.entries(months)[data.game.date.month][0] + " " + utils.list(data.game.date.day) + ", " + data.game.date.year + " " + data.game.date.appellation);
    }
    function game_update() {
        // Resources
        utils.display("flabel", false, "Food: " + data.player.resources.food[0]); utils.display("wlabel", false, "Wood: " + data.player.resources.wood[0]); utils.display("slabel", false, "Stone: " + data.player.resources.stone[0]);
        utils.display("ilabel", false, "Hide: " + data.player.resources.hide);    utils.display("hlabel", false, "Herbs: " + data.player.resources.herbs);
        utils.display("rlabel", false, "Roots: " + data.player.resources.roots);  utils.display("olabel", false, "Ore: " + data.player.resources.ore);

        // Workers
        utils.display("unlabel", false, "Unemployed: " + data.player.workers.unemployed); utils.display("prlabel", false, data.player.civ.type + " Protectors: " + data.player.workers.protectors);
        utils.display("hulabel", false, "Hunters: " + data.player.workers.foodgatherers); utils.display("wolabel", false, "Wood Gatherers: " + data.player.workers.woodgatherers); utils.display("stlabel", false, "Stone Gatherers: " + data.player.workers.stonegatherers);
    }
//#endregion
//#region RESOURCES
    function rspc(chnc, resource) { let random = Math.floor(Math.random() * chnc); if (random == 0) { data.player.resources[resource] += 1; } }
    function radd(type, resource) { data.player.resources[resource][0] += data.player.resources[type]; if (data.player.resources[resource][0] >= data.player.caps[resource]) { data.player.resources[resource][0] = data.player.caps[resource]; } rspc(data.player.resources[resource][1], data.player.resources[resource][2]); game_update(); }
    function rsub(amnt, resource) { (resource == "food" || resource == "wood" || resource == "stone" ? data.player.resources[resource][0] -= amnt : data.player.resources[resource] -= amnt); game_update(); }
//#endregion
//#region WORKERS
    function wadd(amnt, worker) { 
        data.player.workers[worker] += amnt; console.log(data.game.workers[worker].food);
        rsub(data.game.workers[worker].food, "food"); rsub(data.game.workers[worker].wood, "wood"); rsub(data.game.workers[worker].stone, "stone");
        rsub(data.game.workers[worker].hide, "hide"); rsub(data.game.workers[worker].ore, "ore");
    }
    function wres() { // FIXME: improve
        let i = 0, food = 0, wood = 0, stone = 0, hide = 0, ore = 0;
        for (let item of Object.values(data.game.workers)) {
            let workernum = Object.values(data.player.workers)[i];
            food += item.food * workernum; wood += item.wood * workernum; stone += item.stone * workernum;
            hide += item.hide * workernum; ore += item.ore * workernum;
        i++; }
        rsub(food, "food"); rsub(wood, "wood"); rsub(stone, "stone"); rsub(hide, "hide"); rsub(ore, "ore"); 
    }
//#endregion
//#region CLOCK
    let months = {"January": 31, "Febuary": [28, 29], "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};
    function clock() { // FIXME: improve
        if (data.game.date.hour < 24) { data.game.date.hour++; return; } else { data.game.date.hour = 1; data.game.date.day++; }
        if (data.game.date.day > (!data.game.date.leap && data.game.date.month != 1 ? Object.entries(months)[data.game.date.month][1] : (!data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][0] : (data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][1] : Object.entries(months)[data.game.date.month][1])))) { data.game.date.day = 1; data.game.date.month++; }
        if (data.game.date.month > 11) { data.game.date.month = 0; (data.game.date.appellation == "BC" ? data.game.date.year-- : data.game.date.year++); ((data.game.date.year / 4).toString().indexOf('.') > -1 ? data.game.date.leap = true : data.game.date.leap = false) }
        if (data.game.date.appellation == "BC" && data.game.date.year < 0) { data.game.date.appellation = "AD"; }
    }
//#endregion
//#region CONSOLE
    let eventlog = document.getElementById("events").getElementsByClassName("entry"), eventRepeat = 1;
    function cinit() { for(let i = 0; i < eventlog.length; i++) { eventlog.item(i).childNodes.item(0).innerText = "(" + utils.time(":", true) + ")"; eventlog.item(i).childNodes.item(1).innerText = "No events have yet occurred."; eventlog.item(i).childNodes.item(2).innerText = "(x" + eventRepeat + ")"; } }
    function colog() { }
//#endregion

//--- Background Game Functions ---//
function prset() { // TODO: shrink
    let random = Math.floor(Math.random() * 2);
    data.player.region.continent = Object.entries(data.game.regions)[random][1].ethnicity;
    data.player.region.subcontinent = Object.entries(data.game.regions)[random][1].subs[Math.floor(Math.random() * Object.entries(data.game.regions)[random][1].subs.length)];
}
//-- Append all the text to where it's needed and start any beginning-of-game functions. --//