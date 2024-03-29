import React from "react";
import cardBg from "../assets/card-background-shapeGreen.svg";
import visaLogo from "../assets/visa-logo.svg";
import editIcon from "../assets/edit-icon.svg";
import ModalEdit from "../ModalEdit";

function CardVisa({ cvc, expires, name, number, index, editCard, card_is }) {
  const numberChunks = number.match(/.{1,4}/g);

  return (
    <div className="bg-[#5ecd88] h-[250px] w-full rounded-2xl relative overflow-hidden z-10 mb-5">
      <div className="p-7 flex flex-col h-full">
        <div className="flex">
          <img src={visaLogo} alt="Visa Logo" className="" />
          <div className="ml-auto flex">
            <div className="text-white text-right mr-5 ">
              <p className="opacity-50 text-xs uppercase">CVC</p>
              <p className=" font-bold">{cvc}</p>
            </div>
            <div className="text-white text-right ">
              <p className="opacity-50 text-xs uppercase">Expires</p>
              <p className=" font-bold">{expires}</p>
            </div>
          </div>
        </div>
        <div className="flex mt-auto  ">
          <div className="mr-auto flex">
            <div className="text-white mr-5">
              <p className=" text-lg font-bold">{name}</p>
              <p className=" font-bold flex">
                {numberChunks.map((chunk, index) => (
                  <span key={index} className="block mr-3 last:mr-0">
                    {chunk}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="flex items-end">
            {" "}
            <ModalEdit
              card_is={card_is}
              editCard={editCard}
              cvc={cvc}
              expires={expires}
              name={name}
              number={number}
              index={index}
            />
          </div>
        </div>
      </div>

      <img
        src={cardBg}
        alt="Card Background"
        className=" absolute bottom-0 right-0 h-full -z-10 "
      />
    </div>
  );
}

export default CardVisa;
