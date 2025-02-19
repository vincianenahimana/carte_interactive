import { colorGeoJSON} from "./utils/geoUtilitesFonctions.mjs";

const entityMaxPercentSpan= document.getElementById('entity-max')
const entityMinPercentSpan= document.getElementById('entity-min')

//configure the map center and zoom

window.map = L.map("map", {
  center: [50.14510985147266, 5.48413997714843],
  zoom: 8,
  attributionControl : false
});

//Fetch data 

let dataAll = null

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
  dataAll = await fetchData(); //Fetch data on page load
  geodata = dataAll.geodata

  const entityMaxPercent =dataAll.entityMaxPercent
  const entityMinPercent = dataAll.entityMinPercent
  console.log(entityMaxPercent)
  if(dataAll){
    createGeoJSONLayer(geodata)
    entityMaxPercentSpan.innerText = `${entityMaxPercent.type_entite} ${entityMaxPercent.entite}: ${entityMaxPercent.taux_de_chomage_administratif_des_15_64_ans}% `
    entityMinPercentSpan.innerText = `${entityMinPercent.type_entite} ${entityMinPercent.entite}: ${entityMinPercent.taux_de_chomage_administratif_des_15_64_ans}% `
  }
});

//Update the value of entiteSelected when the button changes
document.querySelectorAll('input[name="entite"]').forEach(radio => {
  radio.addEventListener('change', async () => {
    entiteSelected = getSelectedEntite(); 
    dataAll = await fetchData(); // Refetch data each time the entity changes
    geodata = dataAll.geodata
    const entityMaxPercent =dataAll.entityMaxPercent
    const entityMinPercent = dataAll.entityMinPercent
    if(geodata) {
      createGeoJSONLayer(geodata)
    entityMaxPercentSpan.innerText = `${entityMaxPercent.type_entite} ${entityMaxPercent.entite}: ${entityMaxPercent.taux_de_chomage_administratif_des_15_64_ans}% `
    entityMinPercentSpan.innerText = `${entityMinPercent.type_entite} ${entityMinPercent.entite}: ${entityMinPercent.taux_de_chomage_administratif_des_15_64_ans}% `
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
    const geodata = data.dataFormatted;
    const entityMaxPercent = data.entityMaxPercent;
    const entityMinPercent = data.entityMinPercent;
     // You can process the data here
    return {
      geodata:geodata,
      entityMaxPercent: entityMaxPercent,
      entityMinPercent: entityMinPercent
    }
  } catch (error) {
    console.error(error);
  }
}


function createGeoJSONLayer(data) {

  if (geojsonLayer) {
    map.removeLayer(geojsonLayer);
  }

geojsonLayer = L.geoJSON(geodata, {
  style: function(feature){
    return colorGeoJSON(feature.properties.taux_de_chomage_administratif_des_15_64_ans)
  },
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
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//Add attribution data

const attributionData = 'Données GeoJSON (fevrier 2025) : Source <a href="https://www.odwb.be/pages/home/">Open Data Wallonie-Bruxelles</a>'

const attributionControl = L.control.attribution({
  position: 'bottomright'
}).addTo(map);

attributionControl.addAttribution(attributionData);

//TODO Add Legend data

//TODO factorize the code