import React, { useState } from "react";
import "./changepassword.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import site from "../../../site";

Axios.defaults.withCredentials = true;

function ChangePassword() {
  const navigate = useNavigate();
  const [passwordReset, setPassword] = useState(false);
  const [error, setError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setPhoto] = useState();
  const [fileName, setPhotoName] = useState("");
  const [resume, setResume] = useState();
  const [resumeName, setResumeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://${site.hostname}:${site.port}/api/resetpassword`, {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
      .then((response) => {
        console.log(response.data);
        setPassword(response.data.auth);

        Axios.get(`http://${site.hostname}:${site.port}/api/logout`).then(
          (response) => {
            console.log(response);
          }
        );
      })
      .catch((err) => {
        //auth is false
        const auth = err.response.data.auth;
        setPassword(auth);
        setError(true);
        console.log(auth);
      });
  };

  const savePhoto = (e) => {
    const file = e.target.files;
    console.log(file);
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
        url: `http://${site.hostname}:${site.port}/resume`,
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
        url: `http://${site.hostname}:${site.port}/photo`,
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
      {passwordReset ? (
        <div className="changepassword-success">
          <div className="changepassword-popup">
            <p>PASSWORD CHANGED SUCCESSFULLY</p>
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </a>
          </div>
        </div>
      ) : (
        <div className="changepassword-main">
          <Link to={"/admin"}>
            {" "}
            <p className="back-to-dashboard">Back to Dashboard</p>{" "}
          </Link>

          <div className="changepassword">
            <form className="changepassword-form">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter Email Address"
              />

              <input
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                type="password"
                name="current password"
                placeholder="Enter Current Password"
              />

              <input
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="password"
                name="new password"
                placeholder="Enter New Password"
              />
              {error && (
                <p className="wrong-password">Wrong Password or Email</p>
              )}

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
      )}
    </div>
  );
}

export default ChangePassword;
