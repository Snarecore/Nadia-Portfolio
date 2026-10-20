import React, { useEffect, useState } from "react";
import Slider from "../../components/SLIDER/Slider";
import API from "../../api/apiClient";

const Projects = () => {
  // const projectData = [
  //   {
  //     id: 1,
  //     number: "01",
  //     title: "University Website Enhancement Project",
  //     description:
  //       "Redesigned and enhanced the university website using HTML, CSS, Bootstrap, and PHP. Created an engaging frontend with sections for notices, news updates, and university facilities.",
  //     languages: "[HTML, CSS, JS, PHP]",
  //     liveLink: "https://zndub.000webhostapp.com/",
  //     githubLink: "https://github.com/zubayerfarazi/university-website",
  //     image: website,
  //   },
  //   {
  //     id: 2,
  //     number: "02",
  //     title: "Travel Agency Management System",
  //     description:
  //       "Developed a Travel Agency Management System using Java on NetBeans. The system includes features such as Sign In/Sign-Up, Booking Dashboard, Employee Dashboard, and more.",
  //     languages: "[Java]",
  //     liveLink: "#",
  //     githubLink: "https://github.com/zubayerfarazi/travel-agency-project",
  //     image: TravelAgency,
  //   },
  //   {
  //     id: 3,
  //     number: "03",
  //     title: "Crop Yield Prediction",
  //     description:
  //       "Developed a machine learning project aimed at predicting crop yields based on various environmental and agricultural factors.",
  //     languages: "[Python]",
  //     liveLink: "#",
  //     githubLink:
  //       "https://github.com/zubayerfarazi/Crop-Recommendation-using-Machine-Learning",
  //     image: machine,
  //   },
  //   // Add more projects as needed
  // ];
  const [liveProjects, setLiveProjects] = useState([]);

  useEffect(() => {
    API.get("/liveProject")
      .then((res) => {
        setLiveProjects(res.data?.data || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-10">
      <h1 className="text-center tracking-widest">Explore Recent Projects</h1>
      <h1 className="text-5xl font-bold text-center pb-4 md:pb-0">
        My Projects
      </h1>
      {liveProjects && liveProjects && liveProjects.length > 0 ? (
        <Slider projectData={liveProjects} />
      ) : (
        <p>Loading service description...</p>
      )}
    </div>
  );
};

export default Projects;
