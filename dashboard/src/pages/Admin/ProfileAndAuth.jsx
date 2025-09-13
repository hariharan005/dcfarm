// src/pages/Admin/Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, updatePassword } from "../../services/adminServices";
import "../../css/Admin/Profile.css";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [pwd, setPwd] = useState({ current: "", newPass: "", confirm: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          profilePic: data.profilePic || "",
          role: data.role || "",
        });
      } catch (err) {
        setMsg({ type: "error", text: "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, profilePic: reader.result }));
      setMsg({ type: "info", text: "Preview ready. Click Save to persist." });
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const res = await updateProfile(form);
      if (res.success) {
        setProfile(res.admin);
        setIsEditing(false);
        setMsg({ type: "success", text: "Profile updated" });
      } else {
        setMsg({ type: "error", text: "Failed to save profile" });
      }
    } catch (err) {
      setMsg({ type: "error", text: "Failed to save profile" });
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    if (!pwd.current || !pwd.newPass || !pwd.confirm) return setMsg({ type:"error", text:"All password fields required" });
    if (pwd.newPass !== pwd.confirm) return setMsg({ type:"error", text:"Passwords do not match" });

    try {
      const res = await updatePassword(pwd.current, pwd.newPass);
      if (res.success) {
        setMsg({ type: "success", text: res.message || "Password updated" });
        setPwd({ current: "", newPass: "", confirm: "" });
      } else {
        setMsg({ type: "error", text: res.error || "Failed to update password" });
      }
    } catch (err) {
      setMsg({ type: "error", text: "Failed to update password" });
    }
  };

  if (loading) return <div className="profile-loading">Loading…</div>;
  if (!profile) return <div className="profile-error">Profile not found</div>;

  return (
    <div className="profile-page">
      {msg.text && <div className={`alert ${msg.type === "success" ? "alert-success" : msg.type === "error" ? "alert-error" : "alert-info"}`}>{msg.text}</div>}

      <div className="profile-card">
        <div className="profile-left">
          <img
            src={(isEditing ? form?.profilePic : profile.profilePic) || "https://via.placeholder.com/120"}
            alt="avatar"
            className="avatar"
          />
          {isEditing && (
            <label className="btn btn-secondary">
              Change Photo
              <input type="file" accept="image/*" onChange={onFile} className="hidden-input" />
            </label>
          )}
        </div>

        <div className="profile-right">
          <div className="profile-row">
            <span className="label">Name</span>
            {isEditing ? (
              <input className="input" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            ) : <span className="value">{profile.name}</span>}
          </div>

          <div className="profile-row">
            <span className="label">Username</span>
            <span className="value muted">{profile.username}</span>
          </div>

          <div className="profile-row">
            <span className="label">Email</span>
            {isEditing ? (
              <input className="input" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            ) : <span className="value">{profile.email}</span>}
          </div>

          <div className="profile-row">
            <span className="label">Phone</span>
            {isEditing ? (
              <input className="input" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
            ) : <span className="value">{profile.phone}</span>}
          </div>

          <div className="profile-row">
            <span className="label">Address</span>
            {isEditing ? (
              <input className="input" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
            ) : <span className="value">{profile.address}</span>}
          </div>

          <div className="profile-row">
            <span className="label">Role</span>
            <span className="value muted">{profile.role}</span>
          </div>

          <div className="profile-row">
            <span className="label">Last Login</span>
            <span className="value muted">{profile.lastLogin}</span>
          </div>

          <div className="profile-row">
            <span className="label">Account Created</span>
            <span className="value muted">{profile.createdAt}</span>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
                <button className="btn btn-danger" onClick={() => { setIsEditing(false); setForm({ ...profile }); }}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={()=>{ setIsEditing(true); setForm({...profile}); }}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>

      <div className="password-card">
        <h3>Change Password</h3>
        <form onSubmit={savePassword} className="password-form">
          <input className="input" type="password" placeholder="Current password" value={pwd.current} onChange={(e)=>setPwd({...pwd, current:e.target.value})} />
          <input className="input" type="password" placeholder="New password" value={pwd.newPass} onChange={(e)=>setPwd({...pwd, newPass:e.target.value})} />
          <input className="input" type="password" placeholder="Confirm new password" value={pwd.confirm} onChange={(e)=>setPwd({...pwd, confirm:e.target.value})} />
          <button className="btn btn-primary" type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
