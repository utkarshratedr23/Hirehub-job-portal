// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { clearAllJobErrors, fetchJobs } from '../store/slices/jobSlice.js';
import {toast} from "react-toastify"
import Spinner from '../components/Spinner';
import {FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom';
const Jobs = () => {
    const [city,setCity]=useState("");
    const [niche,setNiche]=useState("");
    const [selectedCity,setSelectedCity]=useState("");
    const [selectedNiche,setSelectedNiche]=useState("");
    const [searchKeyword,setSearchKeyword]=useState("");
    const {jobs,loading,error}=useSelector((state)=>state.jobs)
    const handleCityChange=(city)=>{
        setCity(city);
        setSelectedCity(city);
    }
    const handleNicheChange=(niche)=>{
        setNiche(niche);
        setSelectedNiche(niche)
    }
    const cities = [
        "Bengaluru",
        "Mysore",
        "Madurai",
        "Raipur",
        "Jaipur",
        "Ahemdabad",
        "Hyderabad",
        "Bhubneshwar",
        "Kolkata",
        "Trivandrum",
        "Chennai",
        "Lucknow",
        "Gwalior",
        "Bhopal",
        "Mumbai",
        "Noida",
        "Gurgaon",
        "Delhi",
        "Pune",
        "Indore",
      ];
      const nichesArray = [
        "Software Development",
        "Web Development",
        "Cybersecurity",
        "Data Science",
        "Artificial Intelligence",
        "Cloud Computing",
        "DevOps",
        "Mobile App Development",
        "Blockchain",
        "Database Administration",
        "Network Administration",
        "UI/UX Design",
        "Game Development",
        "IoT (Internet of Things)",
        "Big Data",
        "Machine Learning",
        "IT Project Management",
        "IT Support and Helpdesk",
        "Systems Administration",
        "IT Consulting",
      ];
    const dispatch=useDispatch();
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllJobErrors)
        }
        dispatch(fetchJobs(city,niche,searchKeyword))
    },[dispatch,error,city,niche])

    const handleSearch=()=>{
        dispatch(fetchJobs(city,niche,searchKeyword))
    }
  return <>
    {
        loading?<Spinner/>:(
            <div className='jobs'>
                <div className='search-tab-wrapper'>
                    <input
                    type='text'
                    value={searchKeyword}
                    onChange={(e)=>setSearchKeyword(e.target.value)}/>
                    <button onClick={handleSearch}>
                        Find Job
                    </button>
                    <FaSearch/>
                </div>
                <div className='wrapper'>
                    <div className='filter-bar'>
                        <div className='cities'>
                            <h2>Filter Job by City</h2>
                            {
                                cities.map((city,index)=>(
                                 <div key={index}>
                                 <input type='radio' id={city}
                                 name="city"
                                 checked={selectedCity===city}
                                 onChange={()=>handleCityChange(city)}/>
                                 <label htmlFor={city}>{city}</label>
                                 </div>
                                ))
                            }
                        </div>
                        <div className='cities'>
                            <h2>Filter Job by Niche</h2>
                            {
                                nichesArray.map((niche,index)=>(
                                 <div key={index}>
                                 <input type='radio' id={niche}
                                 name="niche"
                                 checked={selectedNiche===niche}
                                 onChange={()=>handleNicheChange(niche)}/>
                                 <label htmlFor={niche}>{niche}</label>
                                 </div>
                                ))
                            }
                        </div>
                    </div>
                <div className='container'>
                    <div className='mobile-filter'>
                   <select value={city} onChange={(e)=>setCity(e.target.value)}>
                    <option value=""> Filter By City </option>
                    {
                        cities.map((index,city)=>(
                       <option value={city} key={index}>
                        {city}
                       </option>
                        ))
                    }
                   </select>
                   <select value={niche} onChange={(e)=>setNiche(e.target.value)}>
                    <option value=""> Filter By Niche </option>
                    {
                        nichesArray.map((index,niche)=>(
                       <option value={niche} key={index}>
                        {niche}
                       </option>
                        ))
                    }
                   </select>
                    </div>
                    <div className="jobs_container">
                        {
                            jobs && jobs.map((element)=>{
                                return(
                                    <div className="card" key={element.id}>
                                     {element.hiringMultipleCandidates==='Yes'?(
                                        <p className="hiring-multiple">
                                            Hiring Multiple Candidates
                                        </p>
                                     ):(
                                        <p className='hiring'>
                                            Hiring
                                        </p>
                                     )}
                                     <p className='title'>{element.title} </p>
                                     <p className='company'>{element.company}</p>
                                     <p className='location'>{element.location} </p>
                                     <p className='salary'><span> Salary:</span>{element.salary} </p>
                                     <p className='posted'><span>Posted On:</span> Rs{element.jobPostedOn.substring(0,10)} 
                                     </p>
                                    <div className="btn-wrapper">
                                  <Link className='btn' to={`/post/application/${element._id}`}> 
                                  Apply Now 
                                  </Link>
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                </div>
            </div>
        )
    }
  </>
}

export default Jobs