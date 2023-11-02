import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box } from "@mui/material";

function GAISearchBox({ setSlots, setSubject, setGrade }) {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/v1/ai/gpt", {
        prompt: content,
      })
      .then((response) => {
        setGrade(response.data.grade);
        setSubject(response.data.subject);
        setSlots(response.data.slots);
      })
      .catch((err) => console.log(err));
    // Assuming the response is JSON data
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    // Dynamically set the height based on the content
  };

  return (
    <Box sx={{ m: 1 }}>
      <h2>Search AI</h2>
      <TextField
        label="Prompt"
        variant="outlined"
        multiline
        fullWidth
        rows={3}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        GENERATE SEARCH OPTIONS
      </Button>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </Box>
  );
}

export default GAISearchBox;
