const locationResult = document.getElementById("location");
const currentLocationBtn = document.getElementById("currentLocationBtn");

const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }

    else {
        locationResult.innerText = "The browser does not support geolocation";
    }
}


// Error checks

const showLocation = async (position) => {

    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=98433bc618844a1eb558ba08394dbc51&q=${position.coords.latitude}+${position.coords.longitude}&pretty=1&no_annotations=1`);

        const data = await response.json();
        console.log(data);

        locationResult.innerText = `${data.results[0].formatted}`;

    } catch (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationResult.innerText = "Please allow access to location";
                break;
            case error.POSITION_UNAVAILABLE:
                locationResult.innerText = "Location info is not available";
                break;
            case error.TIMEOUT:
                locationResult.innerText = "The request to get user location is timed out";
                break;
            default:
                break;
        }
    }
}


currentLocationBtn.addEventListener("click", getCurrentLocation)