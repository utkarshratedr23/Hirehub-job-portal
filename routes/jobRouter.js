import express from "express";
import { postJob,getAllJobs,getASingleJob,getMyJobs,deleteJob } from "../controllers/jobController.js";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.js";


const router=express.Router();
router.post('/post',isAuthenticated,isAuthorised("Employer"),postJob)
router.get('/getall',getAllJobs)
router.get('/getmyjobs',isAuthenticated,isAuthorised('Employer'),getMyJobs)
router.delete('/delete/:id',isAuthenticated,isAuthorised("Employer"),deleteJob)
router.get('/get/:id',isAuthenticated,getASingleJob)
export default router;