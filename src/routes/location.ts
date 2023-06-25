import { Router } from 'express';
import location from '../controllers/Location';

const router = Router();

router.get('/location', location.list);
router.get('/location/:id', location.listById);
router.post('/location', location.insert);
router.put('/location/:id', location.update);
router.delete('/location/:id', location.delete);

export default router;
