import { getGeoData} from "../models/geoModel.mjs";
import { formatToGeoJSON } from "../utils/geoUtils.mjs";

export async function fetchGeoData(req, res) {
    try {

        const { type_entite} = req.query;

        console.log('Filtrage avec type_entite:', type_entite);

        if (!type_entite) {
            return res.status(400).json({ error: "'type_entite' required" });
        }

        const data = await getGeoData(type_entite);
        
        const dataFormatted = formatToGeoJSON(data.results);

        res.status(200).json({
            dataFormatted,
            entityMaxPercent : data.maxEntity,
            entityMinPercent: data.minEntity     
        })

    } catch (error) {
        console.error('Error during fetching geodata', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}