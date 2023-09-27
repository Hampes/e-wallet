import { useDispatch, useSelector } from "react-redux";
import { getFirstUser } from "../features/cards/cardSlice";
import ActiveCard from "../features/cards/ActiveCard";
import InactiveCards from "../features/cards/InactiveCards";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();

  const { cards } = useSelector((state) => state.cards);

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(getFirstUser());
    }
  }, [cards, dispatch]);

  return (
    <div className="cardWrapper">
      <ActiveCard />
      <div className="centerNav">
        <InactiveCards />
        
      </div>
    </div>
  );
};

export default Home;
