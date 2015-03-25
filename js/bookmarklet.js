var root = "https://ellerycrane.github.io/monster-manager/";
var head = document.getElementsByTagName('head')[0];
var css = document.createElement("link");
css.rel = "stylesheet";
css.type = "text/css";
css.href = root+"dist/css/monster-manager.css";
head.appendChild(css);
var container = document.createElement("div");
container.id = "monster-manager-container";
var body = document.getElementsByTagName('body')[0];
body.insertBefore(container, body.childNodes[0]);
function onMonsterManagerLoad(event) {
    if (event.data.monsterManagerLoaded) {
        console.log("Loaded!");
        event.source.postMessage({
            url: root+"dist/monster-manager.js",
            type: "js"
        }, event.origin);
    }
}
function evalData(event) {
    if (event.data.type == 'css') {
        console.log("Loaded css! url: " + event.data.url);
    }
    if (event.data.type == 'js') {
        console.log("Loaded javascript! url: " + event.data.url);
        eval(event.data.data);
        window.MonsterManager.initialize();
        event.source.postMessage({
            url: root+"test.yaml",
            type: "yaml"
        }, event.origin);
    }
    if (event.data.type == 'yaml') {
        window.MonsterManager.updateMonsters(event.data.data);
    }
}
window.addEventListener("message", onMonsterManagerLoad, false);
window.addEventListener("message", evalData, false);
var iframe = document.createElement("iframe");
iframe.style.display="none";
iframe.id = "monster-manager-iframe";
iframe.src = root+"loader.html";
document.getElementsByTagName('body')[0].appendChild(iframe);