import React from "react";
import { useSelector } from "react-redux";
import { Card } from "./Card";
const ActiveCard = () => {
  const { cards } = useSelector((state) => state.cards);

  const activeCards = cards.filter((card) => card.isActive);

  return (
    <div className="activeCard">
      <p className="lexend">Active card</p>

      {activeCards.map((card, i) => (
        <Card key={i} {...card} />
      ))}
    </div>
  );
};

export default ActiveCard;
