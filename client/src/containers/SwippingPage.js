import React, { useEffect, useState } from "react";
import CardDisplay from "../components/Card";
import "../styles/pageStyle.css";
import "../restaurantsData";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { Route } from "react-router-dom";

const SwippingPage = (props) => {
  const urlInfo = props.location.state.URL;
  if (urlInfo.userName === "") urlInfo.userName = "john";
  const [yelp_restaurants, setRestaurants] = useState([]);
  const [userId, setUserId] = useState();
  const [restaurantId, setRestaurantId] = useState("");

  useEffect(() => {
    try {
      axios
        .post(
          `http://localhost:3000/join/${urlInfo.groupId}/${urlInfo.userName}`
        )
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
  }, [urlInfo.groupId, urlInfo.userName]);
  // async function findMatch() {
  //   await axios
  //     .get(`/match/${urlInfo.groupId}`)
  //     .then((response) => {
  //       console.log("RESPONSE: ", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
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
    // findMatch();
  };
  useEffect(() => {
    async function findMatch() {
      await axios
        .get(`/match/${urlInfo.groupId}`)
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
    }, 100000);
    return () => clearInterval(interval);
  }, [urlInfo.groupId, restaurantId, yelp_restaurants]);

  // useEffect(() => {
  //   findMatch();
  //   const interval = setInterval(() => {
  //     // findMatch();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);
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
                  // onCardLeftScreen={
                  //   restaurantId === ""
                  //     ? null
                  //     : history.push("/", {
                  //         restId: restaurantId,
                  //         restaurants: yelp_restaurants,
                  //       })
                  // }
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

export default SwippingPage;
//Assume there are 10 restaurants
// Use polling to find a match
