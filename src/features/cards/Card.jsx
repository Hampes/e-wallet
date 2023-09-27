import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCardIsActive,
  updateCardIsInactive,
  removeCard,
} from "./cardSlice";

import CardList from "./CardList";

export const Card = (props) => {
  const { cards } = useSelector((state) => state.cards);

  const first = props.first.toUpperCase();
  const last = props.last.toUpperCase();
  let cardVendor = props.cardVendor;
  let cardNum = props.cardNum;

  const dispatch = useDispatch();

  const clickedCardIndex = cards.findIndex((card) => card.cardNum === cardNum);
  const click = () => {
    cards.map((card) => {
      return card.isActive == false;
    });
    if (clickedCardIndex !== -1) {
      const clickedCard = { ...cards[clickedCardIndex] };

      if (clickedCard.isActive === false) {
        clickedCard.isActive = true;

        dispatch(updateCardIsInactive({ cards, isActive: false }));
        dispatch(updateCardIsActive({ cardNum, isActive: true }));
      }
    }
  };

  const deleteCard = () => {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort detta kort?"
    );

    if (confirmDelete) {
      if (cards[clickedCardIndex].isActive === false) {
        if (clickedCardIndex !== -1) {
          dispatch(removeCard(clickedCardIndex));
        }
      }
    }
  };
  const isHome = window.location.pathname === "/";

  return (
    <CardList
      first={first}
      last={last}
      cardVendor={cardVendor}
      cardNum={props.cardNum}
      saveValidTo={props.saveValidTo}
      click={click}
      deleteCard={deleteCard}
      isHome={isHome}
    />
  );
};
