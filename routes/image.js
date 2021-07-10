import express from 'express';

import { getImages, getImagesByRegion, getRandomImage } from '../controllers/image.js';

const router = express.Router();

router.get('/page/:currentPage', getImages);
router.get('/random', getRandomImage);
router.get('/page/:currentPage/:region', getImagesByRegion);
router.get('/random/:region', getRandomImage);


export default router;