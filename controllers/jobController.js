import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";

export const postJob=catchAsyncErrors(async(req,res,next)=>{
    const{
        title,
        jobType,
        location,
        company,
        introduction,
        responsibilities,
        qualification,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsiteTitle,
        personalWebsiteUrl,
        jobNiche,
        newsLetterSend
    }=req.body
    if(
        !title ||
        !jobType ||
        !location ||
        !company ||
        !introduction ||
        !responsibilities ||
        !qualification ||
        !salary ||
        !jobNiche
    ){
        return next(new ErrorHandler("Please Provide full job details",400))
    }
    if((personalWebsiteTitle && !personalWebsiteUrl ) ||
    (!personalWebsiteTitle && personalWebsiteUrl)){
    return next(new ErrorHandler("Provide both the urls and title or leave both blank",400))
    }
    const postedBy=req.user._id;
    const job=await Job.create({
        title,
        jobType,
        location,
        company,
        introduction,
        responsibilities,
        qualification,
        offers,
        salary,
        hiringMultipleCandidates,
        personlWebsite:{
            title:personalWebsiteTitle,
            url:personalWebsiteTitle,
        }
        ,
        jobNiche,
        newsLetterSend,
        postedBy
    })
    res.status(201).json({
        success:true,
        message:"Job posted successfully",
        job
    })
})
export const getAllJobs=catchAsyncErrors(async(req,res,next)=>{
    const {city,searchKeyword,niche}=req.query;
    const query={}
    if(city){
        query.location=city;
    }
    if(niche){
        query.jobNiche=niche;
    }
    if(searchKeyword){
        query.$or=[
            {title:{$regex:searchKeyword,$options:"i"}},
            {companyName:{$regex:searchKeyword,$options:"i"}},
            {introduction:{$regex:searchKeyword,$options:"i"}}
        ]
    }
    const jobs=await Job.find(query);
    res.status(200).json({
        success:true,
        jobs,
        count:jobs.length
    })
})
export const getASingleJob=catchAsyncErrors(async(req,res,next)=>{
 const {id}=req.params;
 const job=await Job.findById(id);
 if(!job){
    return next(new ErrorHandler("OOPS! Job not found"))
}
res.status(200).json({
    success:true,
    job
})

})
export const getMyJobs=catchAsyncErrors(async(req,res,next)=>{ //which employer is posting
    const myJobs=await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myJobs
    })
})
export const deleteJob=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.user._id;
    const job=await Job.find(id);
    if(!job){
        return next(new ErrorHandler("OOPS! Job not found"))
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted"
    })
})