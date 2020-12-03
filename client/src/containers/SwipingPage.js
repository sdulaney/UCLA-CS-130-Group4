import React, { useEffect, useState } from "react";
import CardDisplay from "../components/Card";
import "../styles/pageStyle.css";
import TinderCard from "react-tinder-card";
import axios from "axios";

const SwipingPage = (props) => {
  const [yelp_restaurants, setRestaurants] = useState([]);
  const [userId, setUserId] = useState();
  const [restaurantId, setRestaurantId] = useState("");
  let groupId = "";
  let userName = "";
  try {
    groupId = props.location.state.URL.groupId;
    userName = props.location.state.URL.userName;
  } catch (er) {
    //  console.log(er);
  }

  useEffect(() => {
    try {
      axios
        .post(`http://localhost:3000/join/${groupId}/${userName}`)
        .then((response) => {
          console.log(JSON.parse(response.data.restaurantList[0]));
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
  }, [groupId, userName]);

  const onSwipe = (direction, restId) => {
    if (direction === "right") {
      try {
        axios
          .post(`http://localhost:3000/swipe/${groupId}/${userId}/${restId}`)
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
  };
  useEffect(() => {
    async function findMatch() {
      await axios
        .get(`/match/${groupId}`)
        .then((response) => {
          console.log("RESPONSE: ", response);
          if (response.data !== "") {
            setRestaurantId(
              yelp_restaurants.find((obj) => obj.id === response.data)
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const interval = setInterval(() => {
      findMatch();
    }, 1000);
    return () => clearInterval(interval);
  }, [groupId, restaurantId, yelp_restaurants]);

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
                  {restaurantId === "" ? (
                    <CardDisplay
                      imageUrl={e.image_url}
                      isMatched={false}
                      rating={e.rating}
                      resturantName={e.name}
                      Distance={Math.round(e.distance * 0.000621371)}
                      price={e.price}
                    />
                  ) : (
                    <CardDisplay
                      imageUrl={restaurantId.image_url}
                      rating={restaurantId.rating}
                      isMatched={true}
                      resturantName={restaurantId.name}
                      Distance={Math.round(restaurantId.distance * 0.000621371)}
                      address={restaurantId.location}
                      phone={restaurantId.phone}
                      price={restaurantId.price}
                    />
                  )}
                </TinderCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SwipingPage;
