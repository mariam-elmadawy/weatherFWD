// base url of OpenWeather api
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// my own key from api
const apiPersonalK = "&appid=83b008e28e4f9282388726aee5532a77&units=imperial";
// intial server for post and get
const server = "http://127.0.0.1:4000";
// global variables
let dDate = new Date();
let newDate =
    dDate.getMonth() + "." + dDate.getDate() + "." + dDate.getFullYear();
const generate = document.querySelector("#generate");

let generateInfo = function() {
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWInfo(baseUrl, zipCode, apiPersonalK).then(function(data) {
        console.log(data);
        postUserData(server + "/add", {
            date: dDate,
            temp: data.main.temp,
            content: feeling,
        }).then(function() {
            UpdateWeatherUI();
        });
    });
};
//event listener to generate button
generate.addEventListener("click", generateInfo);

const getWInfo = async(bUrl, z, k) => {
    const response = await fetch(bUrl + z + k);
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("error", e);
    }
};
//Function POST data
const postUserData = async(url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content,
        }),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (e) {
        console.log("error", e);
    }
};

// Function that update ui
const UpdateWeatherUI = async() => {
    const request = await fetch(server + "/all");
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById("temp").innerHTML =
            Math.round(allData.temp) + "degrees";
        document.getElementById("content").innerHTML = allData.content;
        document.getElementById("date").innerHTML = allData.date;
    } catch (e) {
        console.log("error", e);
    }
};