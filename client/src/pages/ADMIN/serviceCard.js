import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../../api/apiClient";

const ServiceCard = () => {
  const { id } = useParams();
  const [cardInfo, setCardInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API
      .get(`/serviceCard`)
      .then((res) => {
        setCardInfo(res.data?.data || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const handleDelete = (cardId) => {
    API
      .delete(`/serviceCard/${cardId}`)
      .then((res) => {
        setCardInfo((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the card!", error);
      });
  };

  const handleEdit = (cardId) => {
    navigate(`/page/admin/editServiceCard/${cardId}`);
  };

  return (
    <div>
      <div className="flex p-10 justify-around">
        <h1 className="text-4xl font-semibold">Card Information</h1>
        <Link
          to={`/page/admin/addServiceCard`}
          className="text-2xl bg-white dark:bg-sky-800 hover:bg-sky-500 py-2 px-4 rounded"
        >
          ADD NEW CARD
        </Link>
      </div>
      <div className="flex justify-center flex-wrap gap-10 py-10 px-10 text-lg md:text-2xl text-justify md:px-10">
        {cardInfo && cardInfo.length > 0 ? (
          cardInfo.map((card) => (
            <div
              key={card._id}
              className="bg-white dark:bg-sky-800 max-w-sm lg:max-w-lg p-5 rounded-lg shadow-md"
            >
              <img src={card.cardImage} alt="" className="w-64 mx-auto" />
              <h1 className="text-4xl font-bold text-center p-5 tracking-wider ">
                {card.cardHeader}
              </h1>
              <p className="text-lg text-justify pb-5 text-white">
                {card.cardParagraph}
              </p>
              <div className="text-2xl flex justify-around">
                <button
                  className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
                  onClick={() => handleEdit(card._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
                  onClick={() => handleDelete(card._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No card information available.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
