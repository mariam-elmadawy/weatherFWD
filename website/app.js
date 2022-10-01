/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiK = "&appid=83b008e28e4f9282388726aee5532a77&units=imperial";
const server = "http://127.0.0.1:4000";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generate = document.querySelector("#generate");
generate.addEventListener("click", getInfo);

/* Function called by event listener */
function getInfo(e) {
    const zip = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWeatherInfo(baseUrl, zip, apiK).then(function(data) {
        console.log(data);
        postData(server + "/add", {
            date: d,
            temp: data.main.temp,
            content: feeling,
        });
        retrieveData();
    });
}
/* Function to GET Web API Data*/
const getWeatherInfo = async(baseUrl, zip, key) => {
    const res = await fetch(baseUrl + zip + key);
    try {
        const data = await res.json();

        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/* Function to POST data */
const postData = async(url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
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
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const retrieveData = async() => {
    const req = await fetch(server + "/all");
    try {
        // Transform into JSON
        const allData = await req.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById("temp").innerHTML =
            Math.round(allData.temp) + "degrees";
        document.getElementById("content").innerHTML = allData.content;
        document.getElementById("date").innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
    }
};