import React, { useState } from "react";
import CardDisplay from "../components/Card";
import "../styles/pageStyle.css";
import "../restaurantsData";
import resturants from "../restaurantsData";
import TinderCard from "react-tinder-card";

const SwippingPage = () => {
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    // If direction==="right" -> like restaurant else dislike
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <div>
      <div className="pageContainer">
        <div className="elementsContainer">
          {resturants.map((e, i) => (
            <div key={i}>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                flickOnSwipe={true}
                preventSwipe={["up", "down"]}
              >
                <CardDisplay
                  imageUrl={e.imageUrl}
                  isMatched={false}
                  resturantName={e.resturantName}
                  Distance={e.distance}
                />
              </TinderCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwippingPage;
{
  /* <div>
      <div className="pageContainer">
        <div className="elementsContainer">
          {resturants.map((e, i) => (
            <div key={i}>
              <CardDisplay
                imageUrl={e.imageUrl}
                isMatched={false}
                resturantName={e.resturantName}
                Distance={e.distance}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
          */
}
