import express from 'express';

import { getImages, getImagesByRegion, getRandomImage } from '../controllers/image.js';

const router = express.Router();

router.get('/', getImages);
router.get('/random', getRandomImage);
router.get('/:region', getImagesByRegion);


export default router;