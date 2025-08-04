var galponblue = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -72.49279127026564,
              7.925902959477639
            ],
            [
              -72.49193087464909,
              7.925996054373769
            ],
            [
              -72.4919622055817,
              7.926244307326456
            ],
            [
              -72.49281537098317,
              7.9261535995335635
            ],
            [
              -72.49279127026564,
              7.925902959477639
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
};
// Add the polygon layer to the map
L.geoJSON(galponblue, {
  style: {
    color: 'blue',
    fillcolor: 'blue',
    weight: 0.5,
    fillOpacity: 0.5,
    
  }
}).addTo(map) .bindPopup(' Este es el galpón azul.');

var galponyellow = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -72.49182176419372,
              7.926267276616301
            ],
            [
              -72.4917930762732,
              7.926028600240102
            ],
            [
              -72.49093817624045,
              7.926123313104526
            ],
            [
              -72.4909553889931,
              7.926363883682228
            ],
            [
              -72.49182176419372,
              7.926267276616301
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
  
};
// Add the polygon layer to the map
L.geoJSON(galponyellow, {
  style: {
    color: 'yellow',
    fillcolor: 'yellow',
    weight: 0.5,
    fillOpacity: 0.5,
    
  }
}).addTo(map) .bindPopup(' Este es el galpón amarillo.');



