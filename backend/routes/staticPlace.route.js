import express from 'express';
import {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace
} from '../controllers/staticPlace.controller.js';

const staticPlaceRouter = express.Router();

staticPlaceRouter.get('/', getAllPlaces);
staticPlaceRouter.get('/:id', getPlace);
staticPlaceRouter.post('/', createPlace);
staticPlaceRouter.put('/:id', updatePlace);
staticPlaceRouter.delete('/:id', deletePlace);

export default staticPlaceRouter; 