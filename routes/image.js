import express from 'express';

import { getImages, getImagesByRegion, getRandomImage } from '../controllers/image.js';

const router = express.Router();

router.get('/', getImages);
router.get('/:id', getImages);
router.get('/random', getRandomImage);
router.get('/:region', getImagesByRegion);
router.get('/random/:region', getRandomImage);


export default router;