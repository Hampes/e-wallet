const CardList = (props) => {
  const shouldShowDeleteButton = props.isHome && !props.isActive;

  const deleteBtn = () => {
    return (
      <button className="deleteCardBtn" onClick={props.deleteCard}>
        X
      </button>
    );
  };

  return (
    <div
      id="activeCardDiv"
      className={props.cardVendor ? props.cardVendor : "amex"}
      onDoubleClick={props.click}
    >
      <div className="firstIcons">
        <img className="connectImg " src="../images/connect1.png" />

        <img
          id="imgLogo"
          src={`../images/${
            props.cardVendor ? `${props.cardVendor}.png` : "amex.png"
          }`}
        />
        {shouldShowDeleteButton && deleteBtn()}
      </div>
      <div className="chipDiv">
        <img className="iconImg" src="../images/chip.png" />
      </div>
      <p className="cardNum">
        {props.cardNum ? props.cardNum : "0000 0000 0000 0000"}
      </p>
      <div className="cardNameDiv">
        <div>
          <p className="placeholderName">Cardholder name</p>
          <span>{`${props.first} ${props.last}`}</span>
        </div>
        <div>
          <p className="placeholderName">Valid thru</p>
          <p className="validThru">
            {props.date ? props.date : props.saveValidTo}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default CardList;
