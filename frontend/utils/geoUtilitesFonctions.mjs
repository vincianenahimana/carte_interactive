export function colorGeoJSON(taux) {

    let fillColor = "";

    if (taux > 20) {
      fillColor = "#eb1212";
    } else if (taux > 15) {
      fillColor = "#ec4f44";
    } else if (taux > 10) {
      fillColor = "#e7756e";
    } else if (taux > 5) {
      fillColor = "#da9694";
    } else {
      fillColor = "#c4b5b5";
    }


    return  {
        color: "white",
        fillColor: fillColor,
        fillOpacity : 0.8
    }

}

//background-image: linear-gradient(to right, #c4b5b5, #da9694, #e7756e, #ec4f44, #eb1212);