import client from "../config/db.mjs";

export async function getGeoData() {
  const query = `
     SELECT 
        ogc_fid, 
        ins, 
        type_entite, 
        entite, 
        periode, 
        taux_de_chomage_administratif_des_15_64_ans,
        taux_de_chomage_administratif_des_hommes_de_15_64_ans,
        taux_de_chomage_administratif_des_femmes_de_15_64_ans,
        taux_de_chomage_administratif_des_15_24_ans,
        taux_de_chomage_administratif_des_25_49_ans,
        taux_de_chomage_administratif_des_50_64_ans,
        taux_de_chomage_administratif_des_15_19_ans,
        type_et_entite,
        ST_AsGeoJSON(wkb_geometry) AS geojson
    FROM taux_chomage_15_64
    `;

  try {
    const response = await client.query(query);
    const results = response.rows;
    return results;
  } catch (error) {
    console.error(error);
  }
}
