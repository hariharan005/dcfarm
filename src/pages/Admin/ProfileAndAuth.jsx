import React, { useState } from "react";
import "../../css/Admin/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Hariharan",
    username: "admin123",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+91 9876543210",
    address: "Chennai, India",
    lastLogin: "2025-09-02 18:45",
    createdAt: "2023-01-15",
    profilePic: "https://via.placeholder.com/120",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  // 🔹 Handle Password Change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  // 🔹 Handle Profile Field Change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔹 Save Profile Updates
  const saveProfile = () => {
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  // 🔹 Handle Profile Picture Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-pic">
          <img src={profile.profilePic} alt="Admin" />
          <label className="upload-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="profile-info">
          {isEditing ? (
            <>
              <p>
                <b>Name:</b>{" "}
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </p>
              <p>
                <b>Email:</b>{" "}
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </p>
              <p>
                <b>Phone:</b>{" "}
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
              </p>
              <p>
                <b>Address:</b>{" "}
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                />
              </p>
              <div className="edit-actions">
                <button className="save-btn" onClick={saveProfile}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Username:</b> {profile.username}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Role:</b> {profile.role}</p>
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Address:</b> {profile.address}</p>
              <p><b>Last Login:</b> {profile.lastLogin}</p>
              <p><b>Account Created:</b> {profile.createdAt}</p>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Password Change */}
      <div className="password-card">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            required
          />
          <button type="submit" className="save-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
