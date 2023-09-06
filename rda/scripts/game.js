//--------------------------------------//
//--- RDA Game Scripts | Adrian Lost ---//
//--------------------------------------//
import * as utils from "./utilities.js"
let data = {
    game: {
        release: false,
        achievements: "",
        cheats: "",
        save: "",
        difficulty: "",
        date: { year: 4500, month: 0, day: 1, hour: 1, leap: true, appellation: "BC" },
        regions: {},
        tick: 50
    },
    player: {
        king: "",
        kingdom: "",
        cities: { capital: "" },
        culture: { new: "", name: "", tenet: "" },
        religion: { new: "", name: "", tenet: "", value: "" },
        region: { continent: "", subcontinent: "" },
        civ: { prestige: "Mighty", king: "Chieftain", kingdom: "Tribal Village", type: "Tribe", stats: {} },
        resources: { food: 0, wood: 0, stone: 0, herbs: 0, roots: 0, ore: 0, hide: 0 },
        workers: { unemployed: 5, food: 0, wood: 0, stone: 0, guard: 0 },
        soldiers: {} //- save for later implementation
    }
};

//-- A function to grab the game data from the url. --//
function grabParams() {
    const params = new URLSearchParams(window.location.search);

    data.player.king = params.get('k');
    data.player.kingdom = params.get('ki');
    data.player.cities.capital = params.get('c');

    data.player.culture.new = params.get('cu');
    data.player.culture.name = params.get('cn');
    data.player.culture.tenet = params.get('ct');
    
    data.player.religion.new = params.get('r');
    data.player.religion.name = params.get('rn');
    data.player.religion.tenet = params.get('rt');
    data.player.religion.value = params.get('rv');

    data.game.achievements = params.get('a');
    data.game.cheats = params.get('ch');
    data.game.save = params.get('s');
    data.game.difficulty = params.get('d');

    if (data.game.release) { window.history.replaceState({}, document.title, "/" + "game.html"); }
    else { utils.dlog(data); }
}

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

function rdisplay() { document.getElementById("flabel").innerText = "Food: " + data.player.resources.food; document.getElementById("wlabel").innerText = "Wood: " + data.player.resources.wood; document.getElementById("slabel").innerText = "Stone: " + data.player.resources.stone; document.getElementById("herbs").innerText = "Herbs: " + data.player.resources.herbs; document.getElementById("roots").innerText = "Roots: " + data.player.resources.roots; document.getElementById("ore").innerText = "Ore: " + data.player.resources.ore; document.getElementById("hide").innerText = "Hide: " + data.player.resources.hide; }

function rset(regions) { data.game.regions = regions; prset(); }
function redisplay() { document.getElementById("region").innerText = data.player.region.subcontinent + " " + data.player.region.continent + " " + data.player.civ.type}
function prset() { 
    let random = Math.floor(Math.random() * 6); 
    data.player.region.continent = Object.entries(data.game.regions.continents)[random][1].ethnicity;
    data.player.region.subcontinent = Object.entries(data.game.regions.continents)[random][1].subs[Math.floor(Math.random() * Object.entries(data.game.regions.continents)[random][1].subs.length)];
    redisplay();
}
//-- Append all the text to where it's needed and start any beginning-of-game functions. --//
function setup() {
    kidisplay(); kdisplay();

    document.getElementById("date").innerText = "Beginning clock..."; 
    cdisplay(); utils.set(data.game.tick, clock);

    utils.port("regions").then(res => rset(res));

    rdisplay();

    document.getElementById("resources").addEventListener('click', function() { utils.toggle("subjects", 0); });
    document.getElementById("workers").addEventListener('click', function() { utils.toggle("subjects", 1); });
    document.getElementById("happiness").addEventListener('click', function() { utils.toggle("subjects", 2); });
    document.getElementById("collection").addEventListener('click', function() { utils.toggle("subjects", 3); });
}

window.onload = () => {
    utils.createBackground(true, "1", 0.6);
    window.addEventListener('resize', function() { utils.createBackground(false, "1", 0.6); })
    window.addEventListener('fullscreenchange', function() { utils.createBackground(false, "1", 0.6); })

    grabParams();
    setup();
}