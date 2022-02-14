

// Set global variables, including Open Weather Maps API Key
let owmAPI = "788d5638d7c8e354a162d6c9747d1bdf";
let currentCity = "";
let lastCity = "";

// this is an error handle for fetch 
var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    let city = $('#search-city').val();
    currentCity= $('#search-city').val();
    // Set the queryURL to fetch from API using weather search - added units=imperial to fix
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // Save city to local storage
        saveCity(city);
        $('#search-error').text("");
        // Create icon for the current weather using Open Weather Maps
        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        // Offset UTC timezone - using moment.js
        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset = response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);
        // Render cities list
        renderCities();
        // Obtain the 5day forecast for the searched city
        getFiveDayForecast(event);
        // Set the header text to the found city name
        $('#header-text').text(response.name);
        // HTML for the results of search
        let currentWeatherHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>`;