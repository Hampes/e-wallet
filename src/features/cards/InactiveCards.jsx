import React from "react";
import { useSelector } from "react-redux";
import { Card } from "./Card";
import { Nav } from "../../components/Nav";

const InactiveCards = () => {
  const { cards } = useSelector((state) => state.cards);

  const inactiveCards = cards.filter((card) => card.isActive == false);

  return (
    <div className="inactiveCards">
      <div className="inactiveCardRow">
        <p className="lexend">Inactive Cards</p>
        <Nav />
      </div>

      {inactiveCards.map((card, i) => i < 3 && <Card key={i} {...card} />)}
    </div>
  );
};

export default InactiveCards;
