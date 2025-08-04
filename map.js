
//objeto de creación y despliegue del mapa
var map = L.map('map').setView([7.9249173,-72.4918418], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// Importing firebase app initialization
/* import firebase from "firebase/compat/app";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
*/

// Importing firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV8KCcdv_ioyxP31Sj2UiJr7F_imj4d6o",
  authDomain: "soycenabastos-live-map-demoweb.firebaseapp.com",
  databaseURL: "https://soycenabastos-live-map-demoweb-default-rtdb.firebaseio.com",
  projectId: "soycenabastos-live-map-demoweb",
  storageBucket: "soycenabastos-live-map-demoweb.firebasestorage.app",
  messagingSenderId: "865907759041",
  appId: "1:865907759041:web:915cd3d44a44eab11a0140",
  measurementId: "G-ZYDLDB8SQQ"
};
    

    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.database();

// Initialize Firebase app





// GeoJSON data for points and lines
var IntPointsGeoJson=
{
    "type": "FeatureCollection",
    "features": 
        [
    {
        "type": "Feature",
        "properties": {},
      "geometry": {
          "coordinates": [
              -72.49282147971168,
          7.925070364711516
        ],
        "type": "Point"
    }
        
    },{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
         -72.49342283632522,
         7.926149928643696
        ],
        "type": "Point"
                    }
                }
        ]
    }
    
    var IntLinesGeoJson =
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              [
                -72.49264346809639,
                7.922954193558198
              ],
              [
                -72.49254720389833,
                7.923514346763909
              ],
              [
                -72.49290819464252,
                7.926350855547142
              ]
            ],
            "type": "LineString"
                    }
        };
    
        // Add the GeoJSON layers to the map
    L.geoJSON(IntPointsGeoJson, {}).addTo(map);
    L.geoJSON(IntLinesGeoJson, {
        style: {
            color: 'blue',
            opacity: 0.5,
            weight: 5,
        }
    }).addTo(map);


// Adding a object for a marker with a custom icon (persona)
var myIcon = L.icon({
    iconUrl: "../GeminiCena/persona.png",
    iconSize: [50, 50],
    iconAnchor: [50, 50],
    popupAnchor: [-3, -76],
    shadowUrl: "",
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});


// Adding a marker to the map with the custom icon {}
L.marker([7.9249173,-72.4918418],{icon:myIcon}).addTo(map)
.bindPopup(' La Central de Abastos de todos los Nortesantandereanos.<br> Cenabastos.')
.openPopup();

// Adding a circle to the map
var circle= L.circle([7.925070364711516,-72.49282147971168,16], {
    color: '#88A66A',
    fillColor: '#88A66A',
    fillOpacity: 0.5,
    radius: 40
}).addTo(map);

// Adding a circle to the map with each new user
// 👤 Track user location
    const userId = "user_" + Math.floor(Math.random() * 100000);
    navigator.geolocation.watchPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      db.ref("users/" + userId).set({ lat, lng, timestamp: Date.now() });
    });

    // 👥 Show all markers
    const markers = {};
    db.ref("users").on("value", (snapshot) => {
      const users = snapshot.val();
      if (!users) return;

       for (let id in users) {
    const u = users[id];
    const latLng = [u.lat, u.lng];

    if (markers[id]) {
      // ✅ Move marker if it already exists
      markers[id].setLatLng(latLng);
    } else {
      // ✅ Create new marker
      markers[id] = L.marker(latLng, { icon: myIcon }).addTo(map)
        .bindPopup("User: " + id);
    }
  }
});

      /*for (let id in markers) map.removeLayer(markers[id]);
      for (let id in users) {
        const u = users[id];
        markers[id] = L.marker([u.lat, u.lng],{icon:myIcon}).addTo(map)
          .bindPopup("User: " + id);
          
      }
    });*/

/* function addCircle(lat, lng) {
    L.circle([lat, lng], {
        color: '#FF0000',
        fillColor: '#FF0000',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map);
}*/


function onMapClick(latitud) {
    alert("Has dado click en latitud: " + latitud.latlng.lat +" y longitud:" + latitud.latlng.lng );
} map.on('click', onMapClick);