//-----------------------------------------//
//--- RDA Utility Scripts | Adrian Lost ---//
//-----------------------------------------//
export function elog(message) { console.error(message); }
export function dlog(message) { console.info(message); }
export function log(message) { console.log(message); }

export function set(time, func) { let interval = self.setInterval(func, time); }
export async function port(file) { const response = await fetch("../../scripts/json/" + file + ".json"); return await response.json(); }

//-- A function that will switch through the tabs of a select window on click. --//
export function toggle(id, index) {
    let tabs = document.getElementById(id).getElementsByClassName("tab"), windows = document.getElementById(id).getElementsByClassName("window");
    for (let item of Object.keys(tabs)) { if (item != index) { tabs.item(item).classList = "tab unselected"; } else { tabs.item(item).classList = "tab selected"; } }
    for (let item of Object.keys(windows)) { if (item != index) { windows.item(item).classList = "window unshown"; } else { windows.item(item).classList = "window shown"; } }
}

//-- A function that will append a bit onto the end of a list number to make it look better, IE "1st", "2nd". --//
export function list(number) { 
    let split = number.toString().split(''), last = split[split.length - 1];
    if (split[split.length - 2] != '1' && last == '1') { return number + "st"; }
    else if (split[split.length - 2] != '1' && last == '2') { return number + "nd"; }
    else if (split[split.length - 2] != '1' && last == '3') { return number + "rd"; }
    else { return number + "th"; }
}

//-- A function to add commas to a big number. --//
export function comma(number) {
    let string = number.toString().split(''), length = string.length;
    for (let i = length; i > 0; i-=3) { if (string[i] != undefined) { string.splice(i, 0, ","); } }
    return string.join("");
}

//-- A message that will be applied onto every element of the specified type via the title attribute. --//
export function hoverMessage(tag, message) {
    let elements = document.getElementsByTagName(tag);
    for (let i = 0; i < elements.length; i++) { elements.item(i).setAttribute("title", message); }
}

//-- Create a background for the webpage using a specified file. --//
export function createBackground(first, name, opacity) {
    if (first == false) { document.getElementById("background").remove(); }
    let element = document.createElement("img"); element.id = "background";
    element.width = window.innerWidth; element.height = window.innerHeight;
    element.src = "../../assets/images/backgrounds/" + document.body.classList.item(0) + "/" + name + ".jpg";

    element.style.position = "absolute"; element.style.zIndex = "-1";
    element.style.left = "0px"; element.style.top = "0px";
    element.style.opacity = opacity;

    document.getElementById("container").append(element);
}