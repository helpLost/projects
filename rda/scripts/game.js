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
        utils.set(data.game.tick, clock);
        cinit();
    }
    function dataset(value, inner) { (inner == undefined ? ( Object.assign(data, value), collect() ) : Object.assign(data[inner], value)); }
    function vcheck() { if (data.game.version[0] != version[0] || data.game.version[1] != version[1]) { utils.elog(
        "Your save version is out of date! (" + data.game.version[0] + "." + data.game.version[1] + " X " + version[0] + "." + version[1] + ") Errors might occur as you're playing. If you wish to play the version you created the save on, please download the files from the Github and host them locally."
    )}}

    function savefile(only) {
        if(!only) {
            let file = new Blob([JSON.stringify(data)], {type: "application/json"});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, data.game.save);
            else { // All others
                var a = document.createElement("a"); let url = URL.createObjectURL(file);
                a.href = url; a.download = data.game.save + ".rising";
                document.body.appendChild(a); a.click(); document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }
        }
        localStorage.setItem('risingdawns', JSON.stringify(data));
    }
    function loadfile(local) {
        if (!local) {
            let container = document.createElement("div"); container.id = "filecontainer";
            container.innerHTML = "<dialog id = 'fileload' open><p>Load Save File</p><div id = 'file'><button id = 'fileselect' style = 'display: inline;'>Select File</button><p id = 'filename' style = 'display: inline; margin-left: 10px;'>None Selected <span id = 'filesize' style = 'display: inline; font-style: italic; font-family: Georgia;'>0 bytes</span></p></div><input id = 'filegive' type = 'file' style = 'padding: 5vh;' accept = '.json, .rising'></dialog>"
            document.body.appendChild(container); utils.eadd("fileselect", 'click', (e) => {
                document.getElementById("filegive").click();
                e.preventDefault();
            }); utils.eadd("filegive", 'change', function(e) { 
                let file = document.getElementById("filegive").files[0], reader = new FileReader(); 
                reader.onload = (e) => {
                    data = JSON.parse(e.target.result);
                    document.body.removeChild(document.getElementById("filecontainer"));
                    top_update(); game_update(); vcheck();
                };
                reader.readAsText(file);
            });
        } else {
            if (data != null) { data = JSON.parse(localStorage.getItem('risingdawns')); } else { utils.dlog("Local storage save not found."); colog("Save not found. Did you mean to load from a file?"); }
        }
    }
//#endregion
//#region STARTUP
    function setup() {
        utils.port("default").then(res => {
            dataset(res); vcheck(); utils.port("citizens").then(res => { dataset(res, "game"); utils.port("regions").then(res => { dataset(res, "game"); prset(); top_update(); game_update(); }) });
        });

        // TODO: shrink
        utils.ssetup("subjects"); utils.ssetup("soldiers"); utils.ssetup("buildings"); utils.ssetup("research");
        utils.eadd("fharvest", 'click', function() { radd("click", "food"); }); utils.eadd("wharvest", 'click', function() { radd("click", "wood");  });
        utils.eadd("sharvest", 'click', function() { radd("click", "stone"); });

        function handlekeys(key) { if(key == 's') { savefile(); } else if (key == 'o') { loadfile(true); } else if (key == 'l') { loadfile(false); } }
        utils.eadd(document, 'keydown', function(event) { handlekeys(event.key); });

        utils.dlog("Running RDA Version " + version[0] + "." + version[1] + "a");
    }
    window.onload = () => {
        utils.createBackground(true, "1", 0.6);
        window.addEventListener('resize', function() { utils.createBackground(false, "1", 0.6); });
        window.addEventListener('fullscreenchange', function() { utils.createBackground(false, "1", 0.6); })

        setup();
    }
//#endregion
//#region UMBRELLAS
    function eaddi(id, callback) { // TODO: find a better place
        let items = document.getElementById(id).getElementsByClassName("add");
        for (let i = 0; i < items.length; i++) { 
            utils.eadd(items.item(i), callback, function() { eval(items.item(i).getAttribute("func")); })
        }
    }
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

        lres();
        eaddi("wwindow", 'click');
    }
//#endregion
//#region RESOURCES
    function rspc(chnc, resource) { let random = Math.floor(Math.random() * chnc); if (random == 0) { data.player.resources[resource] += 1; } }
    function radd(type, resource) { data.player.resources[resource][0] += data.player.resources[type]; if (data.player.resources[resource][0] >= data.player.caps[resource]) { data.player.resources[resource][0] = data.player.caps[resource]; } rspc(data.player.resources[resource][1], data.player.resources[resource][2]); game_update(); }
    function rsub(amnt, resource) { (resource == "food" || resource == "wood" || resource == "stone" ? data.player.resources[resource][0] -= amnt : data.player.resources[resource] -= amnt); game_update(); }
//#endregion
//#region WORKERS
    function wadd(amnt, worker) {
        data.player.workers[worker] += amnt;
        rsub(data.game.workers[worker].food, "food"); rsub(data.game.workers[worker].wood, "wood"); rsub(data.game.workers[worker].stone, "stone");
        rsub(data.game.workers[worker].hide, "hide"); rsub(data.game.workers[worker].ore, "ore");
        game_update();
    }
    function wres() { // FIXME: improve + add a centralized "loss" data structure
        let i = 0, food = 0, wood = 0, stone = 0, hide = 0, ore = 0;
        for (let item of Object.values(data.game.workers)) {
            let workernum = Object.values(data.player.workers)[i];
            food += item.food * workernum; wood += item.wood * workernum; stone += item.stone * workernum;
            hide += item.hide * workernum; ore += item.ore * workernum;
        i++; }
        rsub(food, "food"); rsub(wood, "wood"); rsub(stone, "stone"); rsub(hide, "hide"); rsub(ore, "ore");
    }
    function lres() {
        let elements = document.getElementById("lossContainer").getElementsByClassName("resourceLabelText");
        let i = 0, food = 0, wood = 0, stone = 0, hide = 0, ore = 0;
        for (let item of Object.values(data.game.workers)) {
            let workernum = Object.values(data.player.workers)[i];
            food += item.food * workernum; wood += item.wood * workernum; stone += item.stone * workernum;
            hide += item.hide * workernum; ore += item.ore * workernum;
        i++; }
        elements.item(0).innerText = utils.shorten(food); elements.item(1).innerText = utils.shorten(wood); elements.item(2).innerText = utils.shorten(stone);
        elements.item(3).innerText = utils.shorten(hide); elements.item(4).innerText = utils.shorten(ore);
    }
//#endregion
//#region CLOCK
    let months = {"January": 31, "Febuary": [28, 29], "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};
    function clock() { // FIXME: improve
        if (data.game.date.hour < 24) { data.game.date.hour++; return; } else { data.game.date.hour = 1; data.game.date.day++; }
        if (data.game.date.day > (!data.game.date.leap && data.game.date.month != 1 ? Object.entries(months)[data.game.date.month][1] : (!data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][0] : (data.game.date.leap && data.game.date.month == 1 ? Object.entries(months)[data.game.date.month][1][1] : Object.entries(months)[data.game.date.month][1])))) { wres(); data.game.date.day = 1; data.game.date.month++; }
        if (data.game.date.month > 11) { data.game.date.month = 0; (data.game.date.appellation == "BC" ? data.game.date.year-- : data.game.date.year++); ((data.game.date.year / 4).toString().indexOf('.') > -1 ? data.game.date.leap = true : data.game.date.leap = false) }
        if (data.game.date.appellation == "BC" && data.game.date.year < 0) { data.game.date.appellation = "AD"; }
        top_update();
    }
//#endregion
//#region CONSOLE
    let eventlog = document.getElementById("events").getElementsByClassName("entry"), eventRepeat = 1;
    function cinit() { for(let i = 0; i < eventlog.length; i++) { colog("No events to note.", true); } }
    function colog(message, individual) {
        let date = utils.time(':', true);
        if (eventlog.item(0).childNodes.item(1).innerText != message || individual) {
            eventRepeat = 1; let keepLines = 10;
            while (--keepLines > 1) { eventlog.item(keepLines).innerHTML = eventlog.item(keepLines-1).innerHTML; }

            eventlog.item(1).innerHTML = eventlog.item(0).innerHTML;
        } else { eventRepeat++ }
        eventlog.item(0).innerHTML = "<p class = 'time'>(" + date + ")</p><p class = 'message'>" + message + "</p><p class = 'repeat'>(x" + eventRepeat + ")</p>";;
    }
//#endregion

//--- Background Game Functions ---//
function prset() { // TODO: shrink
    let random = Math.floor(Math.random() * 2);
    data.player.region.continent = Object.entries(data.game.regions)[random][1].ethnicity;
    data.player.region.subcontinent = Object.entries(data.game.regions)[random][1].subs[Math.floor(Math.random() * Object.entries(data.game.regions)[random][1].subs.length)];
}
//-- Append all the text to where it's needed and start any beginning-of-game functions. --//