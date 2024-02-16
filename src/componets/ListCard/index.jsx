import React, { useState } from "react";
import  CardMaster  from '../CardMaster';
import CardVisa  from '../CardVisa';
import {data} from '../../mockedData/card_holders'

function ListCard() {
    const [cards, setCards] = useState([{cvc:"009",expires:"08/21",name:"John Cabruci",number:[5532, 1234, 5545, 8014 ]},
    {cvc:"129",expires:"12/24",name:"John Cabruci",number:[1923, 1231, 8892, 2381 ]}]);

    console.log(data);
    return (
        <div className='my-10' >
 <div className="mb-5"> 
{cards.map((card, index) => (
  <CardMaster key={index} cvc={card.cvc} expires={card.expires} name={card.name} number={card.number}/>
))}
      
      
      </div>
      <CardVisa/>
      <button onClick={() => setCards(data)} className="bg-purple-600 text-white w-full py-3 rounded-lg">Add new card</button>
          

        </div>)
      
}

export default ListCard