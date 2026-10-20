import React, { useEffect, useState } from "react";
import Card from "../../components/CARD/Card";

// import webDevelopment from "../../assets/webDevelopment.png";
// import frontend from "../../assets/frontend.png";
// import backend from "../../assets/backend.png";
// import database from "../../assets/database (1).png";
// import software from "../../assets/software.png";
// import graphics from "../../assets/graphics.png";
import API from "../../api/apiClient";

const Service = () => {
  const [serviceDescription, setServiceDescription] = useState(null);
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    API.get("/service")
      .then((res) => {
        setServiceDescription(res.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the service description!",
          error
        );
      });
  }, []);

  useEffect(() => {
    API.get("/serviceCard")
      .then((res) => {
        setCardInfo(res.data?.data || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the service cards!", error);
      });
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-white pt-10 pb-10">
      <h1 className="text-center tracking-widest">Explore my Services</h1>
      <h1 className="text-5xl font-bold text-center pb-5">My Services</h1>
      <p className="py-4 px-10 text-lg md:text-2xl text-justify md:px-10">
        {serviceDescription &&
        serviceDescription.data &&
        serviceDescription.data.length > 0 ? (
          <p className="py-4 px-10 text-lg md:text-2xl text-justify md:px-10">
            {serviceDescription.data[0].serviceParagraph}
          </p>
        ) : (
          <p>Loading service description...</p>
        )}
      </p>

      <div className="flex flex-wrap justify-center">
        {/* web Development Card */}
        {/* <Card
          img={webDevelopment}
          title={"Web Development"}
          paragraph={
            "Bring your vision to life with responsive, user-friendly websites. Specializing in HTML, CSS, Bootstrap, and JavaScript to create dynamic and engaging web experiences. Whether you need a personal blog, a corporate site, or an e-commerce platform, I can help design and develop a website that meets your needs."
          }
        ></Card> */}
        {/* web Development Card */}

        {/* fronted Development Card */}
        {/* <Card
          img={frontend}
          title={"Frontend Development"}
          paragraph={
            "Crafting visually appealing and interactive user interfaces with a focus on usability and performance. I use modern frontend technologies like ReactJS to build seamless and efficient user experiences. From single-page applications to complex web platforms, I ensure a smooth and engaging user journey."
          }
        ></Card> */}
        {/* fronted Development Card */}

        {/* Backend Development Card */}
        {/* <Card
          img={backend}
          title={"Backend Development"}
          paragraph={
            "Building robust and scalable backend systems using PHP and MySQL. I develop secure and efficient server-side logic, manage databases, and integrate APIs to support your application's functionality and performance. Whether it's a content management system or a custom web application, I've got you covered."
          }
        ></Card> */}
        {/* Backend Development Card */}

        {/* Database Development Card */}
        {/* <Card
          img={database}
          title={"Database Management"}
          paragraph={
            "Designing, managing, and optimizing databases to ensure data integrity, security, and performance. With experience in MySQL and database design, I can help streamline your data storage solutions, perform migrations, and maintain database health."
          }
        ></Card> */}
        {/* Database Development Card */}

        {/* Software Development Card */}
        {/* <Card
          img={software}
          title={"Software Development"}
          paragraph={
            "Developing custom software solutions tailored to your specific needs. With proficiency in Java and other programming languages, I create software that solves real-world problems and enhances operational efficiency. From desktop applications to complex systems, I deliver reliable and high-quality software."
          }
        ></Card> */}
        {/* Software Development Card */}

        {/* Technical Development Card */}
        {/* <Card
          img={graphics}
          title={"Graphics Design"}
          paragraph={
            "Creating visually stunning and impactful designs using tools like Adobe Photoshop and Adobe Premiere Pro. I design logos, marketing materials, social media graphics, and more, ensuring your brand stands out. Let me help you convey your message through compelling and creative visuals."
          }
        ></Card> */}
        {/* Technical Development Card */}
        {cardInfo && cardInfo.length > 0 ? (
          cardInfo.map((card) => (
            <Card
              image={card.cardImage}
              title={card.cardHeader}
              paragraph={card.cardParagraph}
            ></Card>
          ))
        ) : (
          <p>No card information available.</p>
        )}
      </div>
    </div>
  );
};

export default Service;
