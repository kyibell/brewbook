import express from 'express';
import * as UserCtrl from '../controllers/usercontroller.js'
import userEvent from '@testing-library/user-event';

const router = express.Router();

// Public Routes
router.get('/getAllUsers', UserCtrl.getAllUsers);




export default router;