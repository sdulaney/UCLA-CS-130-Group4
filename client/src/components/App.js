import React from "react";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import CardDisplay from "./Card";
import { us_states } from "../config";
const App = () => {
  return (
    <div>
      <InputField fieldName={"test 1"}></InputField>
      <DropdownField inputList={us_states} fieldName={"test 2"}></DropdownField>
      <CardDisplay
        imageUrl={
          "https://lh3.googleusercontent.com/proxy/CqvyasCiz2MlzC7F1e56MPfVngySiAobdHRrFeby0t7WD51FtjvxkAuEbs3sCLTciLFsDbyZWDdnpblmHgl7opOFhvtTk95Vye9Qug"
        }
        isMatched={false}
        resturantName={"Kazanova"}
        Distance={"2 miles"}
      />
      <CardDisplay
        imageUrl={
          "https://www.in-n-out.com/ino-images/default-source/default-album/og-hero.jpg"
        }
        resturantName={"In-N-Out"}
        isMatched={true}
        Distance={"50 miles"}
      />
    </div>
  );
};

export default App;
