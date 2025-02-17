import { getGeoData, getFiveFirstData } from "../models/geoModel.mjs";
import { formatToGeoJSON } from "../utils/geoUtils.mjs";

export async function fetchGeoData(req, res) {
    try {

        const { type_entite } = req.query;

        console.log('Filtrage avec type_entite:', type_entite);

        if (!type_entite) {
            return res.status(400).json({ error: "'type_entite' required" });
        }

        const data = await getGeoData(type_entite);
        const dataFormatted = formatToGeoJSON(data);

        res.status(200).json(dataFormatted)

    } catch (error) {
        console.error('Error during fetching geodata', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

export async function fetchFiveFirstData(req,res) {
    try {
        const data = await getFiveFirstData()
        res.status(200).json({data})
    } catch (error) {
        console.error('Error during fetching fivedata', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
    
}