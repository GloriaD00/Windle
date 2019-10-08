


let list= require("../node_modules/country-list/country-list.js");
import dotenv from 'dotenv';

dotenv.config();

let cityInput = document.getElementById("cityInput");
let zipInput = document.getElementById("zipInput");
let countryInput = document.getElementById("countryInput");
let conditionsFields = document.getElementsByClassName("condition");
let timeRangeFields = document.getElementsByClassName("time-range");
let maxFields = document.getElementsByClassName("max");
let minFields = document.getElementsByClassName("min");
let tempFields= document.getElementsByClassName("temp");
let cardDate = document.getElementsByClassName("date");


var skycons = new Skycons({"color": "white"});
skycons.add(document.getElementsByClassName("icon1")[0], Skycons.CLEAR_DAY);
skycons.add(document.getElementsByClassName("icon1")[1], Skycons.CLEAR_DAY);
skycons.add(document.getElementsByClassName("icon1")[2], Skycons.CLEAR_DAY);

function call(city,country,zip) {
    let countryCode=list.getCode(country);
    let API;

    if(countryCode==null){
        alert("check your country spelling");
    }


   else if (city!="" && country!="") {
        API = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.toLowerCase()+','+countryCode.toLowerCase()+'&units=metric&APPID='+process.env.API_KEY;
    }
    else if(country!="" && zip!=""){
        API = 'https://api.openweathermap.org/data/2.5/forecast?q='+zip.toString()+','+countryCode.toLowerCase()+'&units=metric&APPID='+process.env.API_KEY;
    }

    else {
        alert("Please type your country and city or your country and zip code");
    }
    return API;
}


export function callWCoords(position) {
    let latitude = position.coords.latitude;
    let longitude =position.coords.longitude;
    let call1;
    let API1="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyAfH3Ypu0Al8HpNRXhOPEzGLeNbkxOlsoI"
    fetch(API1).then(
        res=>res.json()).then( data=>{

        let city1=data.results[0].address_components[3].long_name;
        let country1=data.results[0].address_components[6].short_name;


        call1='https://api.openweathermap.org/data/2.5/forecast?q='+city1.toLowerCase()+','+country1.toLowerCase()+'&units=metric&APPID='+process.env.API_KEY;
        getPlaceC(call1);

    });


}
function getPlaceC(call) {
    fetch(call).then(response=>{
        return response.json();
    }).then(data=>{
        let weatherList=data.list;


        let city = data.city.name;

        let descs = new Array(3);
        let times = new Array(3);
        let mins = new Array(3);
        let maxs = new Array(3);
        let currents = new Array(3);


        for (let i=0; i<=2;i++){
            descs[i]=weatherList[i].weather[0].description;
            times[i]=new Date(Date.parse(weatherList[i].dt_txt));
            mins[i]=weatherList[i].main.temp_min;
            maxs[i]=weatherList[i].main.temp_max;
            currents[i]=weatherList[i].main.temp;
            descSettler(descs[i],times[i],i,maxs[i], mins[i], currents[i]);
            conditionSettler(descs[i],times[i],i, "icon1");
        }


        cardSettler(weatherList);
        settler(city);
        // conditionSettler(description,time);

    }).catch(function () {
        alert("Something went wrong try to check your spelling");
    });


}
function getPlace() {
    let city = cityInput.value;
    let country = countryInput.value;
    let zip = zipInput.value;


    let APICall=call(city,country,zip);

    fetch(APICall).then(response=>{
        return response.json();
    }).then(data=>{
        let weatherList=data.list;


        let descs = new Array(3);
        let times = new Array(3);
        let mins = new Array(3);
        let maxs = new Array(3);
        let currents = new Array(3);


        for (let i=0; i<=2;i++){
            descs[i]=weatherList[i].weather[0].description;
            times[i]=new Date(Date.parse(weatherList[i].dt_txt));
            mins[i]=weatherList[i].main.temp_min;
            maxs[i]=weatherList[i].main.temp_max;
            currents[i]=weatherList[i].main.temp;
            descSettler(descs[i],times[i],i,maxs[i], mins[i], currents[i]);
            conditionSettler(descs[i],times[i],i, "icon1");
        }


        cardSettler(weatherList);
        settler(city);
       // conditionSettler(description,time);

    }).catch(function () {
        alert("Something went wrong try to check your spelling");
    });

}



function settler(cityname){
   document.getElementById("section-title1").innerHTML="Today's weather in... "+cityname;
}



function descSettler(desc, time, i, max, min, temp){
    conditionsFields[i].innerHTML=desc;
    maxFields[i].innerHTML="Max: "+max;
    minFields[i].innerHTML="Min: "+min;
    tempFields[i].innerHTML="Temp: "+temp;
    timeRangeFields[i].innerHTML= time.getHours()+":00- "+(time.getHours()+1)+":00";

}

function SearchDays(arr){
    let returned=new Array();
    let today= new Date();
    for(let i=0; i<arr.length;i++){
        let dt=new Date(Date.parse(arr[i].dt_txt));
        if(dt>today && dt.getHours()==9 ){
            returned.push(arr[i]);
        }
    }
    return returned;
}

function cardSettler(arr) {
    let days=SearchDays(arr);

    let descs1 = new Array(4);
    let times1 = new Array(4);
    for(let i=0; i<4; i++){
        descs1[i]=days[i].weather[0].description;
        times1[i]=new Date(Date.parse(days[i].dt_txt));
        conditionSettler(descs1[i], times1[i], i, "icon2");
        cardDate[i].innerHTML=times1[i].getDate()+"/"+times1[i].getMonth();
        tempFields[i+3].innerHTML="Temp: "+days[i].main.temp;
        maxFields[i+3].innerHTML="Max: "+days[i].main.temp_max;
        minFields[i+3].innerHTML="Min: "+days[i].main.temp_min;

    }
}



function conditionSettler(desc, time, n, name){

    if(time.getHours()>=6 && time.getHours()<20) {
        switch (desc) {
            case"clear sky":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLEAR_DAY);
                break;
            case "scattered clouds":
            case "overcast clouds":
            case "few clouds":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.PARTLY_CLOUDY_DAY);
                break;
            case "broken clouds" :
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLOUDY);
                break;
            case "shower rain":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.SHOWERS_DAY);
                break;
            case "rain":
            case "light rain":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.RAIN);
                break;
            case "thunderstorm":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.THUNDER_SHOWERS_DAY);
                break;
            case "snow":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.SNOW);
                break;
            case "mist":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.FOG);
            default:
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLEAR_DAY);
        }
    }
        else {
        switch (desc) {
            case"clear sky":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLEAR_NIGHT);
                break;
            case "scattered clouds", "few clouds":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.PARTLY_CLOUDY_NIGHT);
                break;
            case "broken clouds" :
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLOUDY);
                break;
            case "shower rain":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.SHOWERS_NIGHT);
                break;
            case "rain", "light rain":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.RAIN);
                break;
            case "thunderstorm":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.THUNDER_SHOWERS_NIGHT);
                break;
            case "snow":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.SNOW);
                break;
            case "mist":
                skycons.set(document.getElementsByClassName(name)[n], Skycons.FOG);
            default:
                skycons.set(document.getElementsByClassName(name)[n], Skycons.CLEAR_NIGHT);
        }
        }
        skycons.play();
    }


export {getPlace};
