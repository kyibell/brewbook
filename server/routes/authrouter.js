import express from 'express';
import * as AuthCtrl from '../controllers/authcontroller.js';
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = express.Router();



// Public Routes
router.post('/signup', AuthCtrl.signup);
router.post('/login', AuthCtrl.login);

// Protected Routes

router.use(decodeUserFromToken);
router.post("/change-password", checkAuth, AuthCtrl.changePassword);

export default router;