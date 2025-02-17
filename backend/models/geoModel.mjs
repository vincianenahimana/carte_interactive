import client from "../config/db.mjs";
export async function getGeoData(typeEntite) {
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
        type_et_entite,
        ST_AsGeoJSON(wkb_geometry) AS geojson
    FROM taux_chomage_15_64
    WHERE type_entite = $1
    `;

  try {
    const response = await client.query(query,[typeEntite]);
    const results = response.rows;
    return results;
  } catch (error) {
    console.error(error);
  }
}

export async function getFiveFirstData() {
  const query = `
     SELECT 
        ogc_fid, 
        ins, 
        type_entite, 
        entite, 
        taux_de_chomage_administratif_des_15_64_ans,
        taux_de_chomage_administratif_des_hommes_de_15_64_ans,
        taux_de_chomage_administratif_des_femmes_de_15_64_ans,
        type_et_entite
    FROM taux_chomage_15_64
    ORDER BY taux_de_chomage_administratif_des_15_64_ans DESC
    LIMIT 5;
    `;

  try {
    const response = await client.query(query);
    const results = response.rows;
    return results;
  } catch (error) {
    console.error(error);
  }
}