//configure the map center and zoom

window.map = L.map("map", {
  center: [50.14510985147266, 5.48413997714843],
  zoom: 8,
});

//Fetch data 

let geodata = null

let geojsonLayer = null;

let entiteSelected = ""; 

// Function to get the selected entity
function getSelectedEntite() {
  const selectedRadio = document.querySelector('input[name="entite"]:checked');
  return selectedRadio.value
}

// Update the value of entiteSelected on page load
document.addEventListener('DOMContentLoaded', async () => {
  entiteSelected = getSelectedEntite(); 
  geodata = await fetchData(); //Fetch data on page load

  if(geodata){
    createGeoJSONLayer(geodata)
  }
});

document.querySelectorAll('input[name="entite"]').forEach(radio => {
  radio.addEventListener('change', async () => {
    entiteSelected = getSelectedEntite(); 
    geodata = await fetchData(); // Refetch data each time the entity changes

    if(geodata) {
      createGeoJSONLayer(geodata)
    }
  });
});

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3000/api/geodata?type_entite=${entiteSelected}`);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json(); 
     // You can process the data here
    return data;
  } catch (error) {
    console.error(error);
  }
}


function createGeoJSONLayer(data) {

  if (geojsonLayer) {
    map.removeLayer(geojsonLayer);
  }

geojsonLayer = L.geoJSON(geodata, {
  onEachFeature : function (feature, layer) {
    const popupContent = `
  <div>
    <p>Entite : ${feature.properties.type_entite}</p>
    <p>Nom : ${feature.properties.entite}</p>
    <p>Taux : ${feature.properties.taux_de_chomage_administratif_des_15_64_ans}%</p>
    <p>Taux Hommes : ${feature.properties.taux_de_chomage_administratif_des_hommes_de_15_64_ans}%</p>
    <p>Taux Femmes : ${feature.properties.taux_de_chomage_administratif_des_femmes_de_15_64_ans}%</p>
  </div>
    `;
    const popup = L.popup().setContent(popupContent);
    layer.bindPopup(popup);
  }
}).addTo(map)

}

// Tile Layer
const openstreetmapTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


