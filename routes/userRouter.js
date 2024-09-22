import express from 'express';
import { getUser, logout, register, updatePassword, updateProfile } from '../controllers/userController.js';
import { login } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router=express.Router();
router.post('/register',register);
router.post('/login',login)
router.get('/logout',isAuthenticated ,logout)
router.get('/getuser',isAuthenticated,getUser)
router.put('/update/profile',isAuthenticated,updateProfile)
router.put('/update/password',isAuthenticated,updatePassword);
export default router;