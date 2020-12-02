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
  const [userId, setUserId] = useState();
  const [restaurantId, setRestaurantId] = useState();
  useEffect(() => {
    try {
      axios
        .post(
          `http://localhost:3000/join/${urlInfo.groupId}/${urlInfo.userName}`
        )
        .then((response) => {
          // console.log(response.data.restaurantList[0]);
          setUserId(response.data.userid);
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
  const findMatch = () => {
    axios
      .get(`/match/${urlInfo.groupId}`)
      .then((response) => {
        console.log("RESPONSE: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSwipe = (direction, restId) => {
    //console.log("You swiped: " + direction);
    // console.log("Rest ID " + restId);
    //console.log("User ID" + userId);
    //console.log("Group ID" + urlInfo.groupId);
    // If direction==="right" -> like restaurant else dislike
    if (direction === "right") {
      try {
        axios
          .post(
            `http://localhost:3000/swipe/${urlInfo.groupId}/${userId}/${restId}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    }
    findMatch();
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <div>
      <div className="pageContainer">
        <div className="elementsContainer">
          {yelp_restaurants.map((e, i) => (
            <div>
              <div key={i}>
                <TinderCard
                  onSwipe={(direction, id) => onSwipe(direction, (id = e.id))}
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
                <h2>{() => findMatch()}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwippingPage;
//Assume there are 10 restaurants
// Use polling to find a match
