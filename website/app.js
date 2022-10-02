// base url of OpenWeather api
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="; // my own key from api
const apiPersonalK = "&appid=83b008e28e4f9282388726aee5532a77&units=imperial"; // intial server for post and get
const server = "http://127.0.0.1:4000";
// global variables
let dDate = new Date();
let newDate =
    dDate.getMonth() + "." + dDate.getDate() + "." + dDate.getFullYear();
const generate = document.querySelector("#generate");

function generateInfo(e) {
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWInfo(baseUrl, zipCode, apiPersonalK).then(function(data) {
        console.log(data);
        postUserData(server + "/addData", {
            date: dDate,
            temp: data.main.temp,
            content: feeling,
        });
        UpdateWeatherUI();
    });
}
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
        body: JSON.stringify(data),
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
    try {
        const request = await fetch(server + "/all");
        const allData = await request.json();
        console.log(allData);
        document.getElementById("temp").innerHTML = ` Tempreture is: ${Math.round(
      allData.temp
    )} degrees`;
        document.getElementById(
            "content"
        ).innerHTML = `Feeling is: ${allData.content}`;
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    } catch (e) {
        console.log("error", e);
    }
};