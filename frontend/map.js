//configure the map center and zoom

window.map = L.map("map", {
  center: [50.14510985147266, 5.48413997714843],
  zoom: 8,
});

//Function to fetch data from the API

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error during fetching");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

//function to transform JSON to GeoJSON

async function jsonToGeoJson(data) {
  const geojson = {
    type: "FeatureCollection",
    features: [],
  };

  data.forEach((element) => {
    const feature = {
      type: element.geo_shape.type,
      geometry: element.geo_shape.geometry,
    properties : {
        type: element.type_entite,
        name:element.entite,
        taux_15_64:element.taux_de_chomage_administratif_des_15_64_ans,
        taux_H_15_64:element.taux_de_chomage_administratif_des_hommes_de_15_64_ans,
        taux_F_15_64:element.taux_de_chomage_administratif_des_femmes_de_15_64_ans,

    }
    };
    geojson.features.push(feature);
  });

  return geojson;
}



const openstreetmapTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

openstreetmapTileLayer.addTo(map);

//fetch Data

const response = await fetchData(
    "https://www.odwb.be/api/explore/v2.1/catalog/datasets/213500/records?limit=10"
  );

const jsonData = response.results
console.log(jsonData)
//transform jsonData 

const geoJsonData = await jsonToGeoJson(jsonData);

// create a popup

function createPopup(featureProperties){
    const {type,name,taux_15_64} = featureProperties

    return `
    <div class="custom-popup">
        <p>Type : ${type}</p>
        <p>Name : ${name}</p>
        <p>Taux : ${taux_15_64}%</p>
    </div>
    `
    
}

//create style

const getColor = (value) => {
    // On définit les couleurs pour chaque tranche de pourcentage
    const colors = [
      'rgba(169, 160, 255, 0.3)', // 0% à 4.99%
      'rgba(20, 33, 221, 0.3)',   // 5% à 9.99%
      'rgba(252, 78, 42, 0.3)',   // 10% à 14.99%
      'rgba(227, 26, 28, 0.3)',   // 15% à 19.99%
      'rgba(189, 0, 38, 0.3)'     // 20% (et plus)
    ];
  
    // On s'assure que la valeur est dans l'intervalle [0, 20]
    const clampedValue = Math.max(0, Math.min(value, 20));
  
    // Chaque tranche représente 5%. 
    // Par exemple : une valeur entre 0 et 4.99 donnera l'indice 0, entre 5 et 9.99 l'indice 1, etc.
    const index = Math.floor(clampedValue / 5);
  
    // Retourne la couleur correspondante à l'indice
    return colors[index];
  };
  
  

const styleChomage = (feature) =>{
    const tauxChomage = feature.properties.taux_15_64
    console.log(tauxChomage)
    return {
        fillColor: getColor(tauxChomage),  // Appliquer la couleur basée sur le taux de chômage
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}

//create a legend

function createLegend() {
    const legend = L.control({
        position: 'bottomleft'
    });

    legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 5, 10, 15, 20];
        const labels = [];

        // Loop through the grades and create a label for each range
        for (let index = 0; index < grades.length; index++) {
            // Create each label with a colored box and text
            labels.push(
                `<i style="background:${getColor(grades[index])}"></i> ${grades[index]}% - ${grades[index+1]}% `
            );
        }

        // Combine all the labels and display them inside the div
        div.innerHTML = labels.join('<br>');
        return div;
    };

    return legend;
}




//add jsonData to map 

L.geoJSON(geoJsonData,
    {
        style: styleChomage,
        onEachFeature: (geojsonFeature, layer) => {
            const popupContent = createPopup(geojsonFeature.properties);
            layer.bindPopup(popupContent);
    }  

}).addTo(map);

const legend = createLegend();
legend.addTo(map);