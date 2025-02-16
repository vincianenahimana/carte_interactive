export function formatToGeoJSON(data, geometryField = 'geojson') {
    return {
        type: "FeatureCollection",
        features: data.map(row => {
            const { [geometryField]: geometry, ...properties } = row;
            return {
                type: "Feature",
                geometry: JSON.parse(geometry), 
                properties: properties, 
            };
        })
    };
}

