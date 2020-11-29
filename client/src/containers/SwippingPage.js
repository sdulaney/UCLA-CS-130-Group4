import React, { useEffect, useState } from "react";
import CardDisplay from "../components/Card";
import "../styles/pageStyle.css";
import "../restaurantsData";
import TinderCard from "react-tinder-card";
import axios from "axios";
const SwippingPage = (props) => {
  const urlInfo = props.location.state.URL;
  if (urlInfo.userName === "") urlInfo.userName = "john";
  const [yelp_restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(
          `http://localhost:3000/join/${urlInfo.groupId}/${urlInfo.userName}`
        )
        .then((response) => {
          const parseRest = JSON.parse(response.data.restaurantList[0]);
          setRestaurants(parseRest.businesses);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, [urlInfo.groupId, urlInfo.userName]);

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
          {yelp_restaurants.map((e, i) => (
            <div key={i}>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                flickOnSwipe={true}
                preventSwipe={["up", "down"]}
              >
                <CardDisplay
                  imageUrl={e.image_url}
                  isMatched={false}
                  resturantName={e.name}
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
