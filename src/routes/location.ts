import { Router } from 'express';
import Location from '../controllers/Location';

const router = Router();
const locationController = new Location();

router.get('/location', locationController.list);
router.get('/location/:id', locationController.listById);
router.post('/location', locationController.insert);
router.put('/location/:id', locationController.update);

export default router;
