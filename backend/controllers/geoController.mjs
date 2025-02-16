import { getGeoData } from "../models/geoModel.mjs";
import { formatToGeoJSON } from "../utils/geoUtils.mjs";

export async function fetchGeoData(req, res) {
    try {
        const data = await getGeoData();
        const dataFormatted = formatToGeoJSON(data);

        res.status(200).json(dataFormatted)


    } catch (error) {
        console.error('Error during fetching geodata', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}