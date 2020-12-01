/*
    USAGE
    1- import CardDisplay from "<PATH>/Card";
    
    2-  Example :
       <CardDisplay
        imageUrl={
          "https://lh3.googleusercontent.com/proxy/CqvyasCiz2MlzC7F1e56MPfVngySiAobdHRrFeby0t7WD51FtjvxkAuEbs3sCLTciLFsDbyZWDdnpblmHgl7opOFhvtTk95Vye9Qug"
        }
        isMatched={false}
        resturantName={"Kazanova"}
        Distance={"2 miles"}
      />
*/

import React from "react";
import "../styles/card.css";

// import { makeStyles } from '@material-ui/core/styles';
// import Rating from '@material-ui/lab/Rating';
// import Box from "@material-ui/core/Box";
// import StarRating from "./StarRating";

import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTimes,
  faDirections,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

export default class CardDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { field: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ field: event.target.value });
  }
  handleSubmit(event) {
    //Post to API code goes here
    event.preventDefault();
  }
  render() {
    return (
      <div className="container">
        <Card bsPrefix="cardContainer">
          {this.props.isMatched ? (
            <h3 className="titleText"> Tonight's Dinner</h3>
          ) : (
            <h3 className="titleText"> Tonight's Matched Dinner</h3>
          )}

          <img
            src={this.props.imageUrl}
            alt="restaurant"
            className="card_image"
          />
          <Card.Body waves>
            <h2 className="resturantNameStyle">{this.props.resturantName}</h2>
            <Card.Text>
              <h6> 


                {/* <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
                {/* <div className="App">
                  <StarRating></StarRating>
                </div> */}



                Implement Rating Here </h6>
              {/* drumstick-bite-solid.svg */}
              <h6 className="distanceTextStyle"> {this.props.Distance} </h6>
            </Card.Text>
            <div className="buttonsContainer">
              <div className="buttonChildContainer">
                <button className="buttonStyle">
                  {this.props.isMatched ? (
                    <FontAwesomeIcon className="iconStyle" icon={faPhoneAlt} />
                  ) : (
                    <FontAwesomeIcon className="iconStyle" icon={faTimes} />
                  )}
                </button>
              </div>
              <div className="buttonChildContainer">
                <button className="buttonStyle">
                  {this.props.isMatched ? (
                    <FontAwesomeIcon
                      className="iconStyle"
                      icon={faDirections}
                    />
                  ) : (
                    <FontAwesomeIcon className="iconStyle" icon={faHeart} />
                  )}
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}






