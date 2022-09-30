import React, { useState } from "react";
import "./changepassword.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setPhoto] = useState();
  const [fileName, setPhotoName] = useState("");
  const [resume, setResume] = useState();
  const [resumeName, setResumeName] = useState("");

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

  const savePhoto = (e) => {
    const file = e.target.files;
    setPhoto(e.target.files[0]);
    setPhotoName(file[0].name);
  };
  const saveResume = (e) => {
    const file = e.target.files;
    setResume(e.target.files[0]);
    setResumeName(file[0].name);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("fileName", resumeName);

    try {
      const res = await Axios({
        method: "post",
        url: "http://localhost:8080/resume",
        withCredentials: true,
        header: { "content-Type": "multipart-/form-data" },
        data: formData,
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    formData.append("image", file);
    formData.append("fileName", fileName);

    try {
      const res = await Axios({
        method: "post",
        url: "http://localhost:8080/photo",
        withCredentials: true,
        header: { "content-Type": "multipart-/form-data" },
        data: formData,
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
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
      <div id="upload" className="changepassword">
        <form id="upload-picture">
          Upload Your Picture
          <input
            type="file"
            onChange={(e) => {
              savePhoto(e);
            }}
          />
          <button onClick={uploadPhoto} type="submit">
            Upload
          </button>
        </form>

        <form id="upload-resume">
          Upload Your Resume
          <input
            type="file"
            onChange={(e) => {
              saveResume(e);
            }}
          />
          <button onClick={uploadResume}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
