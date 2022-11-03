import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState, useContext } from "react";
import { ctx } from "./Provider";

const Card = () => {
  const [distance, setDistance] = useState<string>("");
  const { setDirection } = useContext(ctx);
  const origin = useRef<HTMLInputElement>(null);
  const destination = useRef<HTMLInputElement>(null);
  const directionsService = new google.maps.DirectionsService();

  const handleSubmit = async () => {
    if (origin.current && destination.current) {
      directionsService.route(
        {
          origin: origin.current.value,
          destination: destination.current.value,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDistance(result!.routes[0]!.legs[0]!.distance!.text);
            setDirection(result!);
          }
          if (status === "ZERO_RESULTS") {
            setDistance("No possible route founded");
          }
        }
      );
    }
  };

  return (
    <Paper
      sx={{
        flexGrow: 1,
        position: "absolute",
        backgroundColor: "#fff",
        padding: "1.5rem 2rem",
        top: 0,
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={8}>
          <Autocomplete types={["airport"]} restrictions={{ country: "us" }}>
            <TextField
              fullWidth
              sx={{ marginBottom: "1rem" }}
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
              InputProps={{ style: { fontSize: "1.5rem" } }}
              label="Origin"
              variant="outlined"
              inputRef={origin}
              placeholder="Enter an airport name"
            />
          </Autocomplete>
          <Autocomplete types={["airport"]} restrictions={{ country: "us" }}>
            <TextField
              fullWidth
              sx={{ marginTop: "1rem" }}
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
              InputProps={{ style: { fontSize: "1.5rem" } }}
              label="Destination"
              variant="outlined"
              inputRef={destination}
              placeholder="Enter an airport name"
            />
          </Autocomplete>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ fontSize: "1.5rem" }}
            onClick={handleSubmit}
          >
            Get Distance
          </Button>
          <Typography variant="h4" align="center" mt={4}>
            {distance}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
