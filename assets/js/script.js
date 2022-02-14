

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