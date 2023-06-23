import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
//CSS FROM BLOG PAGE blog.css
import Navbar from "../../Home/Navbar/navbar";
import site from "../../../site";
import  "./projectspage.css"

function ProjectPage() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState({});
  const [projectTechnicalFeatues, setProjectTechnicalFeatues] = useState([]);

  useEffect(() => {

    //`/api/project/${projectId}`
    Axios.get(`/api/project/${projectId}`)
      .then((response) => {
        console.log(response.data);

        setProjectInfo({
          title: response.data.project[0].nameOfProject,
          projectDescription: response.data.project[0].projectDescription,
          projectBackround: response.data.project[0].projectBackround,
          theChallenge:response.data.project[0].theChallenge,
          theSolution:response.data.project[0].theSolution,
          technologies:response.data.project[0].technologies

        });

        console.log(response.data.projectFeatures);

        setProjectTechnicalFeatues(response.data.projectFeatures)
      })
      .catch((err) => {
        console.log(err);

        setProjectInfo({
          title: "ERROR 404",
          projectDescription: "ERROR!PROJECT MOVED OR DELETED",
        });
      });
  }, [projectId]);



  const projectTechnicalfeaturesData = projectTechnicalFeatues.map((feature,key)=>{
    console.log(feature);

      return <li key={key}   >{feature.technicalfeature}   </li>

  })

 console.log(projectInfo.projectBackground);

  return (
    <div id="projectspage"   >
      <Navbar />
      <div className="projectspage-hero" >
        <div className="projectspage-container">
          <h1>{projectInfo.title}</h1>
          <p>{projectInfo.projectDescription}</p>

        </div>
      </div>

      <div className="projectpage-projectbackgroud"  >
        <h2>The Background</h2>
        <p>{projectInfo.projectBackround}  </p>
      </div>

      <div  className="projectpage-thechallenge">
        <h2>The Challenge</h2>
        <p>{projectInfo.theChallenge}   </p>
      </div>

      <div  className="projectpage-thesolution">
        <h2>The Solution</h2>
        <p> {projectInfo.theSolution}  </p>
      </div>

      <div  className="projectspage-technicalfeatures" >
        <h1>Technical Features</h1>

        <ul>
          {projectTechnicalfeaturesData}
        </ul>

        <h2>The Technologies Used</h2>
        <p>{projectInfo.technologies}</p>
      </div>

      <div className="projectspage-getintouch">

        <p>Want To Know More About This Case Study Or Have A Project in Mind?</p>
        <button>GET IN TOUCH</button>
      </div>
    
    </div>
  );
}

export default ProjectPage;
