import { Router } from  'express';
import { storeUserDataController, getUserDataController } from '../controllers/controllers.js';
const router = Router();

router.get('/');
router.post('/storeUserData', storeUserDataController);
router.post('/getUserData', getUserDataController);
router.get('/home');

export default router;