/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../store/slices/updateProfileSlice';
import { toast } from 'react-toastify';
import { clearAllUpdateProfileErrors } from '../store/slices/updateProfileSlice';
import { getUser } from '../store/slices/userSlice';
import { FaRegEyeSlash,FaEye } from 'react-icons/fa';

const UpdatePassword = () => {
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  
  const{user}=useSelector(state=>state.usert);
  const {loading,error,isUpdated}=useSelector(state=>state.update);
  const dispatch=useDispatch();
  

  const handleUpdatePassword=()=>{
    const formData=new FormData();
    formData.append("oldPassword",oldPassword)
    formData.append("newPassword",newPassword)
    formData.append("confirmPasswword",confirmPassword)
    dispatch(updatePassword(formData))
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearAllUpdateProfileErrors())
    }
    if(isUpdated){
      toast.success("Password Updated")
      dispatch(getUser())
      dispatch(clearAllUpdateProfileErrors())
    }
  },[dispatch,loading,error,isUpdated])
  return (
    <div className='account_components update_password_component'>
      <h1>Update Password</h1>
      <div>
        <label>Current Password</label>
        <input type='text' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
        {
          showPassword?<FaRegEyeSlash className='eye_
          icon' onClick={setShowPassword(!showPassword)}/>:
          <FaEye className='eye_icon' onClick={setShowPassword(!showPassword)}/>
        }
      </div>
      <div>
        <label>New Password</label>
        <input type='text' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
        {
          showPassword?<FaRegEyeSlash className='eye_
          icon' onClick={setShowPassword(!showPassword)}/>:
          <FaEye className='eye_icon' onClick={setShowPassword(!showPassword)}/>
        }
      </div>
      <div>
        <label>Confirm Password</label>
        <input type='text' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        {
          showPassword?<FaRegEyeSlash className='eye_
          icon' onClick={setShowPassword(!showPassword)}/>:
          <FaEye className='eye_icon' onClick={setShowPassword(!showPassword)}/>
        }
      </div>
      <div className='save_changes_btn_wrapper'>
        <button className='btn' onClick={handleUpdatePassword} disabled={loading}>
         Update Password
        </button>
      </div>
    </div>
  )
}

export default UpdatePassword