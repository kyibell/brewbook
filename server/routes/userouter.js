import express from 'express';
import * as UserCtrl from '../controllers/usercontroller.js'

const router = express.Router();

// Public Routes
router.get('/getAllUsers', UserCtrl.getAllUsers);
router.get('/getUserbyId/:id', UserCtrl.getUserById);
router.patch('/updateUser/:id', UserCtrl.updateUser);
router.delete('/deleteUser/:id', UserCtrl.deleteUser);

export default router;