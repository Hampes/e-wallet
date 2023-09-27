import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMonth, setSelectedYear } from "./cardSlice";
import { Link } from "react-router-dom";
import { addCard } from "./cardSlice";
import React from "react";
import CardList from "./CardList";

export const CreateInactiveCards = () => {
  const [cardCvv, setCardCvv] = useState("");
  const [date, setDate] = useState("");
  const { cards } = useSelector((state) => state.cards);

  let first = cards[0].first.toUpperCase();
  let last = cards[0].last.toUpperCase();
  const setCardNumber = (e) => {
    const inputCardNumber = e.target.value;
    const formattedCardNumber = inputCardNumber.match(/\d{1,4}/g).join(" ");

    if (formattedCardNumber.length <= 19) {
      document.querySelector(".cardNum").textContent = formattedCardNumber;
    }
  };

  const selectedMonth = useSelector((state) => state.cards.selectedMonth);
  const selectedYear = useSelector((state) => state.cards.selectedYear);
  const dispatch = useDispatch();

  const handleMonthYearChange = (e) => {
    const dateParts = e.target.value.split("-");
    const month = dateParts[1];
    const year = dateParts[0];

    if (month && year) {
      setDate(`${month}/${year - 2000}`);
      dispatch(setSelectedMonth(month));
      dispatch(setSelectedYear(year));
    } else {
      setDate(null);
    }
  };

  const handleLogo = () => {
    let selectLogo = document.querySelector(".selectLogo").value;

    let imgLogo = document.querySelector("#imgLogo");
    let activeCardDiv = document.querySelector("#activeCardDiv");

    if (selectLogo === "amex") {
      imgLogo.src = "../images/amex.png";
      imgLogo.classList.remove("imgHb");
      activeCardDiv.classList.add("amex");
      activeCardDiv.classList.remove("Handelsbanken");
      activeCardDiv.classList.remove("Swedbank");
      activeCardDiv.classList.remove("hbColorCard");
    } else if (selectLogo === "Handelsbanken") {
      imgLogo.src = "../images/Handelsbanken.png";
      imgLogo.classList.add("imgHb");

      activeCardDiv.classList.add("Handelsbanken");
      activeCardDiv.classList.remove("amex");
      activeCardDiv.classList.remove("Swedbank");
    } else if (selectLogo === "Swedbank") {
      imgLogo.src = "../images/Swedbank.png";
      activeCardDiv.classList.add("Swedbank");
      activeCardDiv.classList.remove("amex");
    }

    const newCardCvv = document.querySelector(".cardCvv").value;
    setCardCvv(newCardCvv);
  };

  const addCardToArr = () => {
    let saveCardNumber = document.querySelector(".cardNum").innerHTML;
    let selectLogo = document.querySelector(".selectLogo").value;
    let cardCvv = document.querySelector(".cardCvv").value;

    const cardToAdd = {
      first,
      last,
      cardNum: saveCardNumber,
      saveValidTo: date,
      cardVendor: selectLogo,
      cardCvv: cardCvv,
      isActive: false,
    };

    dispatch(addCard(cardToAdd));
  };

  console.log(date);

  const disabledBtn = () => {
    let selectLogo = document.querySelector(".selectLogo").value;
    let saveCardNumber = document.querySelector(".inputCardNumber").value;
    let cardNum = document.querySelector(".cardNum").innerHTML;
    let inputValidTo = document.querySelector(".inputValidTo").value;

    console.log(cardNum.length);

    let message = "";

    switch (true) {
      case cards.length >= 4:
        message = "Du kan max ha 4 kort!";
        break;

      case cardNum.length < 19:
        message = "Kortnumret måste bestå av minst 16 siffror";
        break;

      case selectLogo !== "Select vender" &&
        inputValidTo !== "" &&
        saveCardNumber !== "":
        addCardToArr();
        return;

      case selectLogo !== "Select vender" && saveCardNumber !== "":
        message = "Fyll i datum";
        break;

      case selectLogo !== "Select vender" &&
        inputValidTo === "" &&
        saveCardNumber === "":
        message = "Fyll i kortnummer och datum";
        break;

      case selectLogo === "Select vender" && inputValidTo !== "":
        message = "Välj kortutvigvare";
        break;

      case selectLogo === "Select vender" &&
        inputValidTo === "" &&
        saveCardNumber !== "":
        message = "Fyll i Cardvendor och datum";
        break;

      case cardNum.length <= 19:
        message = "Kortnumret måste bestå av minst 16 siffror";
        break;

      default:
        message = "Fyll i alla uppgifter";
    }
    alert(message);
  };

  console.log(cards);

  const isHome = window.location.pathname !== "/addCard";

  return (
    <div id="addCardWrapper">
      <CardList date={date} first={first} last={last} isHome={isHome} />

      <div className="inputFields">
        <form>
          <label>Namn</label>
          <input
            className="inputName"
            defaultValue={`${first} ${last}`}
            type="text"
            disabled
          />
          <label>Kortnummer</label>
          <input
            className="inputCardNumber"
            type="text"
            onChange={setCardNumber}
            maxLength="16"
            minLength="16"
            pattern="[0-9]"
            placeholder="KORTNUMMER"
          />
          <label>Valid thru</label>
          <input
            className="inputValidTo"
            type="month"
            value={`${selectedYear}-${selectedMonth}`}
            onChange={handleMonthYearChange}
          />
          <label>CVV</label>
          <input
            placeholder="CVV"
            className="cardCvv"
            type="text"
            maxLength="3"
            pattern="[0-9]"
          />
          <label>Välj kortutgivare</label>
          <select onChange={handleLogo} className="selectLogo">
            <option value="Select vender">Select vender</option>
            <option value="amex">American Express</option>
            <option>Handelsbanken</option>
            <option>Swedbank</option>
          </select>
        </form>
        <button className="button buttonDisabled" onClick={disabledBtn}>
          Add card
        </button>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
