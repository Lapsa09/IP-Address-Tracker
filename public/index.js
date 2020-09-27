var mymap = L.map('mapid',{zoomControl: false})

const showIPAddressMap = async (json) => {
    const loader = `<div class="loading"><div></div><div></div><div></div><div></div></div>`;
    document.getElementById('ip').innerHTML = loader;
    document.getElementById('location').innerHTML = loader;
    document.getElementById('timezone').innerHTML = loader;
    document.getElementById('isp').innerHTML = loader;

    const ipAddress = json.ip;
    const api_url = `/${ipAddress}`;
    const response = await fetch(api_url);
    const ipJson = await response.json();

    const latitude = ipJson.location.lat;
    const longitude = ipJson.location.lng;

    setTimeout(function () {
        document.getElementById('ip').innerHTML = ipAddress;
        document.getElementById('location').innerHTML = ipJson.location.city + ", " + ipJson.location.region + " " + ipJson.location.postalCode;
        document.getElementById('timezone').innerHTML = "UTC " + ipJson.location.timezone;
        document.getElementById('isp').innerHTML = ipJson.isp;
    }, 1000);

    var points = [latitude, longitude];

    getMap(points)
}

const getSearch = async () => {
    var input = document.getElementById("search").value;

    if (input == "") alert("Insertar un IP")
    else {
        const loader = `<div class="loading"><div></div><div></div><div></div><div></div></div>`;
        document.getElementById('ip').innerHTML = loader;
        document.getElementById('location').innerHTML = loader;
        document.getElementById('timezone').innerHTML = loader;
        document.getElementById('isp').innerHTML = loader;

        const api_url = `/${inputValue}`;
        const response = await fetch(api_url);
        const json = await response.json();

        const points = [json.location.lat, json.location.lng];
        // console.log(points);
        getMap(points)
    }
}

function getMap(points) {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,

        accessToken: 'pk.eyJ1IjoidmEyNzYiLCJhIjoiY2tlaG9tb3F5MTVhbzJybXpkaHRpZXE5dSJ9.h24ofxQNklYPfEHCNFFyTA'
    }).addTo(mymap);

    var myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [40, 50],
        iconAnchor: [25, 16],
    });

    mymap.setView(points, 13)
    L.marker(points, { icon: myIcon }).addTo(mymap);
}