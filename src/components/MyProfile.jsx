/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="account_components">
      <h1>My Profile</h1>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled
          value={user?.name || "N/A"}
          style={{color:"white"}}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          disabled
          value={user?.email || "N/A"}
          style={{color:"white"}}
        />
      </div>
      {/* Conditional rendering for Job Seeker-specific fields */}
      {user?.role === "Job seeker" && (
        <div>
          <label>My Preferred Job Niches</label>
          <div style={{ display: 'flex', flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              disabled
              value={user?.niches?.firstNiche || ""}
            />
            <input
              type="text"
              disabled
              value={user?.niches?.secondNiche || ""}
            />
            <input
              type="text"
              disabled
              value={user?.niches?.thirdNiche || ""}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              disabled
              value={user?.phone || "N/A"}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              disabled
              value={user?.address || "N/A"}
            />
          </div>
          <div>
            <label>Role</label>
            <input
              type="text"
              disabled
              value={user?.role || "N/A"}
            />
          </div>
          <div>
            <label>Joined On</label>
            <input
              type="text"
              disabled
              value={user?.createdAt || "N/A"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
