import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import GAISearchBox from "../../widgets/gAISearchBox/gAISearchBox";
import SlotsSearchOptions from "../../widgets/slotsSearchOptions/slotsSearchOptions";
import axios from "axios";
import { Button } from "@mui/material";
function Home() {
  const sendSlots = async () => {
    if (areAllFieldsFilled()) {
      try {
        const response = await axios.post("http://your-api-endpoint", {
          slots,
        });
        // Handle the response as needed
        console.log("Slots sent:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Display an error message or take appropriate action
      console.error(
        "Please fill in all fields for each slot before submitting."
      );
    }
  };
  const areAllFieldsFilled = () => {
    for (const slot of slots) {
      if (
        !slot.day ||
        !slot.time ||
        !slot.subject ||
        !slot.grade ||
        !slot.sessionLength
      ) {
        return false;
      }
    }
    return true;
  };
  const [slots, setSlots] = useState([
    {
      day: "Monday",
      time: "00:00",
      subject: "",
      grade: "",
      length: "30",
    },
  ]);
  const [isUnique, setIsUnique] = useState(true);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <GAISearchBox setSlots={setSlots} />
        <SlotsSearchOptions slots={slots} setSlots={setSlots} />
        <Button variant="contained" color="primary" onClick={sendSlots}>
          Submit Slots
        </Button>
      </Paper>
    </Container>
  );
}

export default Home;
