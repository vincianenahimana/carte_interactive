import express from 'express';
import { fetchGeoData } from '../controllers/geoController.mjs';

const router = express.Router();

router.get('/api/geo-data', fetchGeoData)

export default router;


