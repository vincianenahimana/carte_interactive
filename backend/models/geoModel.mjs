import client from "../config/db.mjs";

const queryAll = `
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


const queryMax = `
     SELECT 
        ogc_fid, 
        ins, 
        type_entite, 
        entite, 
        periode, 
        taux_de_chomage_administratif_des_15_64_ans,
        taux_de_chomage_administratif_des_hommes_de_15_64_ans,
        taux_de_chomage_administratif_des_femmes_de_15_64_ans,
        type_et_entite
    FROM taux_chomage_15_64
    WHERE type_entite = $1
    ORDER BY taux_de_chomage_administratif_des_15_64_ans DESC
    LIMIT 1;
    `

    const queryMin = `
    SELECT 
       ogc_fid, 
       ins, 
       type_entite, 
       entite, 
       periode, 
       taux_de_chomage_administratif_des_15_64_ans,
       taux_de_chomage_administratif_des_hommes_de_15_64_ans,
       taux_de_chomage_administratif_des_femmes_de_15_64_ans,
       type_et_entite
   FROM taux_chomage_15_64
   WHERE type_entite = $1
   ORDER BY taux_de_chomage_administratif_des_15_64_ans ASC
   LIMIT 1;
   `


export async function getGeoData(typeEntite) {
   try {
    const responseAll = await client.query(queryAll,[typeEntite]);
    
    const results = responseAll.rows;
    
    let maxEntity = null;
    let minEntity = null;


  const responseMax= await client.query(queryMax,[typeEntite]);
   if (responseMax.rows.length>0) {
    maxEntity = responseMax.rows[0];
   }

   const responseMin = await client.query(queryMin,[typeEntite]);
   if(responseMin.rows.length>0) {
      minEntity = responseMin.rows[0];
   }

   return {
    results,
    maxEntity,
    minEntity
   }

  } catch (error) {
    console.error(error);
  }
}