/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearAllApplicationErrors, deleteApplication, fetchEmployerApplication, resetApplicationSlice } from '../store/slices/applicationSlice';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
const Applications = () => {
  const {isAuthenticated}=useSelector(state=>state.user);
  const {application,loading,message,error}=useSelector(state=>state.application);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearAllApplicationErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplication())
  },[message,error,dispatch])
  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return (
  <>
  {
    loading ? (
      <Spinner />
    ) : application && application.length <= 0 ? (
      <h1>You have no applications from job seekers.</h1>
    ) : (
      <>
        <div className="account_components">
          <h3>Applications For Your Posted Jobs</h3>
          <div className="applications_container">
            {application.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title: </span> {element.jobInfo.jobTitle}
                  </p>
                  <p className="sub-sec">
                    <span>Applicants Name: </span>{" "}
                    {element.jobSeekerInfo.name}
                  </p>
                  <p className="sub-sec">
                    <span>Applicants Email:</span>{" "}
                    {element.jobSeekerInfo.email}
                  </p>
                  <p className="sub-sec">
                    <span>Applicants Phone: </span>{" "}
                    {element.jobSeekerInfo.phone}
                  </p>
                  <p className="sub-sec">
                    <span>Applicants Address: </span>{" "}
                    {element.jobSeekerInfo.address}
                  </p>
                  <p className="sub-sec">
                    <span>Applicants CoverLetter: </span>
                    <textarea
                      value={element.jobSeekerInfo.coverLetter}
                      rows={5}
                      disabled
                    ></textarea>
                  </p>
                  <div className="btn-wrapper">
                    <button
                      className="outline_btn"
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete Application
                    </button>
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      className="btn"
                      target="_blank"
                    >
                      View Resume
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )}
  
  </>
)    
  
}

export default Applications;