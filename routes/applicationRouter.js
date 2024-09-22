import express from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.js";
import { deleteApplication, employerGetApplication, jobSeekerGetAllApplication, postApplication } from "../controllers/applicationController.js";
const router=express.Router();
router.post('/post/:id',isAuthenticated,isAuthorised("Job seeker"),postApplication)
router.get('/employer/getall',isAuthenticated,isAuthorised("Employer"),employerGetApplication)
router.get('/jobseeker/getall',isAuthenticated,isAuthorised("Job seeker"),jobSeekerGetAllApplication)
router.delete('/delete/:id',isAuthenticated,deleteApplication)
export default router;