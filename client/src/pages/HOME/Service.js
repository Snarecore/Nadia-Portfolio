import React, { useEffect, useState } from "react";
import Card from "../../components/CARD/Card";
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
        console.error("Error fetching service description:", error);
      });
  }, []);

  useEffect(() => {
    API.get("/serviceCard")
      .then((res) => {
        setCardInfo(res.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching service cards:", error);
      });
  }, []);

  const paragraph = serviceDescription?.data?.[0]?.serviceParagraph;

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
          What I Offer
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          My Services
        </h2>
        {paragraph && (
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2 leading-relaxed">
            {paragraph}
          </p>
        )}
      </div>

      {cardInfo && cardInfo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cardInfo.map((card) => (
            <Card
              key={card._id}
              image={card.cardImage}
              title={card.cardHeader}
              paragraph={card.cardParagraph}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-xs sm:text-sm text-gray-400">
          No services published yet.
        </div>
      )}
    </section>
  );
};

export default Service;
