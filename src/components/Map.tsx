import { useContext } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Skeleton from "@mui/material/Skeleton";
import Card from "./Card";
import { ctx } from "./Provider";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY as string;

const Map = () => {
  const { route } = useContext(ctx);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  return (
    <main>
      {isLoaded ? (
        <>
          <GoogleMap
            center={{ lat: 37.09024, lng: -95.712891 }}
            zoom={5}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {route && <DirectionsRenderer directions={route} />}
          </GoogleMap>
          <Card />
        </>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"100%"}
        />
      )}
    </main>
  );
};

export default Map;
