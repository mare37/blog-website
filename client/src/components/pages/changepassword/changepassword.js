import React, { useState } from "react";
import "./changepassword.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/resetpassword", {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div id="changepassword">
      <div className="changepassword">
        <form className="changepassword-form">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email Address"
          />
          <label>Enter Current Password</label>
          <input
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            type="password"
            name="current password"
          />

          <label>Enter New Password</label>
          <input
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type="password"
            name="new password"
          />

          <button onClick={handleSubmit}>Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
