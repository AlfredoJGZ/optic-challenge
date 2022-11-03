import { useState } from "react";
import { Prediction } from "../interfaces/interfaces";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const baseUrl =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
const params = `&types=airport&location=37.76999%2C-95.712891&strictbounds=true&radius=2000000&key=${apiKey}`;

export const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = (newInputValue: string) => {
    fetch(`${baseUrl}${newInputValue}${params}`)
      .then((response) => response.json())
      .then((data) => {
        setPlaces(
          data.predictions.reduce(
            (acc: { [x: string]: string }, prediction: Prediction) => {
              acc[prediction.description] = prediction.place_id;
              return acc;
            },
            {}
          )
        );
      })
      .catch((error) => console.log(error));
  };

  return [places, fetchPlaces];
};
