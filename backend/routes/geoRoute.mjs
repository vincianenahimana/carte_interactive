import express from 'express';
import { fetchGeoData,fetchFiveFirstData } from '../controllers/geoController.mjs';

const router = express.Router();

router.get('/api/geodata', fetchGeoData)
router.get('/api/data-toprank',fetchFiveFirstData)

export default router;


