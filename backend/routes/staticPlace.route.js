import express from 'express';
import {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace
} from '../controllers/staticPlace.controller.js';
import { verifyTokenAndRole } from '../middleware/auth.js';

const staticPlaceRouter = express.Router();

staticPlaceRouter.get('/', getAllPlaces);
staticPlaceRouter.get('/:id',verifyTokenAndRole(['admin' , 'user']), getPlace);
staticPlaceRouter.post('/',verifyTokenAndRole(['admin']), createPlace);
staticPlaceRouter.put('/:id',verifyTokenAndRole(['admin']), updatePlace);
staticPlaceRouter.delete('/:id',verifyTokenAndRole(['admin']), deletePlace);

export default staticPlaceRouter; 