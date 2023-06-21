import { Router } from 'express';
import LocationController from '../controllers/Location';

const router = Router();
const locationController = new LocationController();

router.get('/location', locationController.list);
router.get('/location/:id', locationController.listById);

export default router;
