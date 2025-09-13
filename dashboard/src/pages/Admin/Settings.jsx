import React, { useState } from "react";
import "../../css/Admin/Settings.css";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
      <h2>⚙️ Admin Settings</h2>
      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "security" ? "active" : ""}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={activeTab === "preferences" ? "active" : ""}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
          <button
            className={activeTab === "business" ? "active" : ""}
            onClick={() => setActiveTab("business")}
          >
            Business
          </button>
          <button
            className={activeTab === "logs" ? "active" : ""}
            onClick={() => setActiveTab("logs")}
          >
            Logs
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === "profile" && (
            <div>
              <h3>👤 Profile Settings</h3>
              <form>
                <label>Name:</label>
                <input type="text" placeholder="Admin Name" />
                <label>Email:</label>
                <input type="email" placeholder="admin@example.com" />
                <label>Phone:</label>
                <input type="text" placeholder="+91 9876543210" />
                <label>Profile Picture:</label>
                <input type="file" />
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3>🔒 Security Settings</h3>
              <form>
                <label>Current Password:</label>
                <input type="password" />
                <label>New Password:</label>
                <input type="password" />
                <label>Confirm Password:</label>
                <input type="password" />
                <button type="submit" className="save-btn">
                  Update Password
                </button>
              </form>
              <div className="extra-option">
                <label>
                  <input type="checkbox" /> Enable Two-Factor Authentication
                </label>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h3>🎨 Preferences</h3>
              <label>Theme:</label>
              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>
              <label>Language:</label>
              <select>
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
              <button className="save-btn">Save Preferences</button>
            </div>
          )}

          {activeTab === "business" && (
            <div>
              <h3>🏢 Business Settings</h3>
              <form>
                <label>Company Name:</label>
                <input type="text" placeholder="My Company" />
                <label>Logo:</label>
                <input type="file" />
                <label>Address:</label>
                <textarea placeholder="Company Address"></textarea>
                <label>Payment Gateway API Key:</label>
                <input type="text" placeholder="Enter Razorpay/Stripe Key" />
                <button type="submit" className="save-btn">
                  Save Business Settings
                </button>
              </form>
            </div>
          )}

          {activeTab === "logs" && (
            <div>
              <h3>📜 Activity Logs</h3>
              <ul className="logs-list">
                <li>Admin logged in - 10:20 AM</li>
                <li>Updated business details - 11:00 AM</li>
                <li>Changed password - 2:30 PM</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
