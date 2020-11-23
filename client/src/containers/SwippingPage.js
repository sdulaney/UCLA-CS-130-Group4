import React from "react";
import CardDisplay from "../components/Card";
import "../styles/pageStyle.css";

const SwippingPage = () => {
  return (
    <div className="pageContainer">
      <div className="elementsContainer">
        <CardDisplay
          imageUrl={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxpU2ZbovkLf37SqbtpNg1vlk_C_8hBf8YA&usqp=CAU"
          }
          isMatched={false}
          resturantName={"Kazanova"}
          Distance={"2 miles"}
        />
      </div>
    </div>
  );
};

export default SwippingPage;
