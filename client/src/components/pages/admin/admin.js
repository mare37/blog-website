import "./admin.css";
import Axios from "axios";
import Navbar from "./admin-navbar";
import Main from "./admin-main";

Axios.defaults.withCredentials = true;

function Admin() {
  return (
    <div>
      <div className="admin">
        <Navbar />

        <br />
        <br />
        <br />
        <Main />
      </div>
    </div>
  );
}

export default Admin;
