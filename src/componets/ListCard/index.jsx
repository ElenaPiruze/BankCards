import React, { useState } from "react";
import CardMaster from "../CardMaster";
import CardVisa from "../CardVisa";
import { data as initialData } from "../../mockedData/card_holders";
import ModalAdd from "../ModalAdd";

function ListCard() {
  const [data, setData] = useState([]);

  console.log(data);

  const addCard = (newCard) => {
    if (data) {
      setData([...data, newCard]);
    } else {
      setData([newCard]);
    }
  };

  const editCard = (index, updatedCard) => {
    const newData = [...data];
    newData[index] = updatedCard;
    setData(newData);
  };

  return (
    <div className="my-10">
      {data &&
        data?.map((card, index) => (
          <>
            {card.card_is === "Mastercard" ? (
              <div className="mb-5">
                <CardMaster
                  key={index}
                  index={index}
                  cvc={card.cvc}
                  expires={card.expiry_date}
                  name={card.name_in_card}
                  number={card.card_number}
                  editCard={editCard}
                  card_is={card.card_is}
                />
              </div>
            ) : (
              <CardVisa
                key={index}
                index={index}
                cvc={card.cvc}
                expires={card.expiry_date}
                name={card.name_in_card}
                number={card.card_number}
                editCard={editCard}
                card_is={card.card_is}
              />
            )}
          </>
        ))}

      <ModalAdd addCard={addCard} />
    </div>
  );
}

export default ListCard;
