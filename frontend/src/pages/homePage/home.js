import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import GAISearchBox from "../../widgets/gAISearchBox/gAISearchBox";
import SlotsSearchOptions from "../../widgets/slotsSearchOptions/slotsSearchOptions";
import axios from "axios";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TutorsSearchResult from "../../widgets/tutorsSearchResults/tutorsSearchResults";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(0);
  const [slots, setSlots] = useState([
    {
      day: "Monday",
      hour: 0,
      minute: 0,
      length: 30,
    },
  ]);
  const [searchResult, setSearchResult] = useState({});

  const [openSearchEmpty, setOpenSearchEmpty] = useState(false);

  const handleSearchEmptyClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSearchEmpty(false);
  };

  const sendSlots = async () => {
    console.log(subject, grade, slots);
    if (areAllFieldsFilled()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/tutor/search",
          {
            subject,
            grade,
            slots,
          }
        );
        // Handle the response as needed
        console.log(response.data);
        if (!response.data.tutors.length) {
          setOpenSearchEmpty(true);
        } else setSearchResult(response.data);
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
      if (!slot.day || !subject || !grade) {
        return false;
      }
    }
    return true;
  };
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
        <GAISearchBox
          setSlots={setSlots}
          setGrade={setGrade}
          setSubject={setSubject}
        />
        <SlotsSearchOptions
          slots={slots}
          setSlots={setSlots}
          grade={grade}
          setGrade={setGrade}
          subject={subject}
          setSubject={setSubject}
        />
        <Button variant="contained" color="primary" onClick={sendSlots}>
          Search
        </Button>
        {searchResult?.tutors?.length > 0 && (
          <TutorsSearchResult SearchResult={searchResult} />
        )}
      </Paper>
      <Snackbar
        open={openSearchEmpty}
        autoHideDuration={6000}
        onClose={handleSearchEmptyClose}
      >
        <Alert
          onClose={handleSearchEmptyClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          No Search Result!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
