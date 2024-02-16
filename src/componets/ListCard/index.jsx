import React, { useState, useEffect } from "react";
import CardMaster from "../CardMaster";
import CardVisa from "../CardVisa";
import { data as initialData } from "../../mockedData/card_holders"; 
import ModalAdd from "../ModalAdd";

function ListCard() {
  const [data, setData] = useState(initialData);
  const [showMaster, setShowMaster] = useState([]);
  const [showVisa, setShowVisa] = useState([]);


  console.log(data);
  useEffect(() => {
    const masterCards = data.filter((card) => isMasterCard(card.card_number));
    const visaCards = data.filter((card) => isVisaCard(card.card_number));

    setShowMaster(masterCards);
    setShowVisa(visaCards);
  }, [data]);

  const isMasterCard = (cardNumber) => {
    return cardNumber.startsWith("5") && cardNumber.length === 16;
  };

  const isVisaCard = (cardNumber) => {
    return cardNumber.startsWith("4") && cardNumber.length === 16;
  };

  const addCard = (newCard) => {
    setData([...data, newCard]); // Add the new card to the data state
  };
  return (
    <div className="my-10">
      <div className="mb-5">
        {showMaster &&
          showMaster?.map((card, index) => (
            <CardMaster
              key={index}
              cvc={card.cvc}
              expires={card.expiry_date}
              name={card.name_in_card}
              number={card.card_number}
            />
          ))}
      </div>
      {showVisa &&
        showVisa?.map((card, index) => (
          <CardVisa
            key={index}
            cvc={card.cvc}
            expires={card.expiry_date}
            name={card.name_in_card}
            number={card.card_number}
          />
        ))}

      <ModalAdd addCard={addCard}/>
    </div>
  );
}

export default ListCard;
