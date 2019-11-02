
import {getPlace} from "./Weather.js";
import {currentDiv,plusDivs} from "./slideshow.js";
import {callWCoords} from "./Weather.js";

let button =document.getElementById("submit");
let plus= document.getElementsByClassName("w3-left")[0];
let minus=document.getElementsByClassName("w3-right")[0];
let spans = document.getElementsByClassName("demo");



console.log(process.env.API_KEY);


for (let i=0;i<spans.length; i++){
    spans[i].addEventListener("click", ()=>currentDiv(i+1));
}

var $container= $('#container');
var $c0 = $('#C0');
var $c1 = $('#C1');
var $c2 = $('#C2');
var $c3 = $('#C3');
var $title2 = $('#section-title2');
let visible = false;

let visible0 = false;
let visible1 = false;
let visible2 = false;
let visible3 = false;

if(navigator.geolocation){
    if(navigator.geolocation.getCurrentPosition(callWCoords))
    setTimeout(()=>visibleCards(),3000);
}

document.addEventListener("keypress", logKey);

function logKey(e) {
    if (e.code=="Enter"){
        if(getPlace()){
        setTimeout(()=>visibleCards(),1000)}
    }

}


function visibleCards(){
    $title2.removeClass("hide");
    if (!visible){
        $container.slideUp(0, function () {
            $container.removeClass("hide").fadeIn(1000);

        })
    }
    visible=true;
    if (!visible0){
        $c0.slideUp(0, function () {
            $c0.removeClass("hide").fadeIn(1100);

        })
    }
    visible0=true;
    if (!visible1){
        $c1.slideUp(0, function () {
            $c1.removeClass("hide").fadeIn(1200);

        })
    }
    visible1=true;
    if (!visible2){
        $c2.slideUp(0, function () {
            $c2.removeClass("hide").fadeIn(1300);

        })
    }
    visible2=true;
    if (!visible3){
        $c3.slideUp(0, function () {
            $c3.removeClass("hide").fadeIn(1400);

        })
    }
    visible3=true;
}




button.addEventListener("click",()=>getPlace());
plus.addEventListener("click", ()=>plusDivs(-1));
minus.addEventListener("click", ()=>plusDivs(1));
button.addEventListener("click", visibleCards);
