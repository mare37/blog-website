import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function ProjectPage() {
  const { projectId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:8080/project/:${projectId}`).then(
      (response) => {
        console.log(response.data);
      }
    );
  }, []);

  return <div>Project</div>;
}

export default ProjectPage;
