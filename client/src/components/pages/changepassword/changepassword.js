import React, { useState } from "react";
import "./changepassword.css";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

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

  const saveFile = (e) => {
    const file = e.target.files;
    setFile(e.target.files[0]);
    setFileName(file[0].name);
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
        <form name={fileName} encType="multipart/form-data" id="upload-picture">
          Upload Your Picture
          <input
            type="file"
            onChange={(e) => {
              saveFile(e);
            }}
          />
          <button onClick={uploadPhoto} type="submit">
            Upload
          </button>
        </form>

        <form id="upload-resume">
          Upload Your Resume
          <button>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
