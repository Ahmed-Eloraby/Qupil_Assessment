import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function GAISearchBox({ setSlots }) {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/v1/ai/", {
        prompt: content,
      })
      .then((response) => setSlots(response.data))
      .catch((err) => console.log(err));
    // Assuming the response is JSON data
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    // Dynamically set the height based on the content
  };

  return (
    <div>
      <h2>Search AI</h2>
      <TextField
        label="Content"
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
        Submit
      </Button>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GAISearchBox;
