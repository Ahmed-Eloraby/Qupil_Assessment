import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

function TutorsSearchResult({ SearchResult }) {
  const handlePostData = () => {
    // Send the data via a POST request using Axios
    axios
      .post("http://localhost:8080/api/v1/student/favorite", SearchResult)
      .then((response) => {
        console.log("Data sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tutor Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SearchResult.tutors
              .sort((a, b) => b.score - a.score)
              .map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell>{tutor.username}</TableCell>
                  <TableCell>{tutor.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handlePostData}>
        Add to Favorites
      </Button>
    </div>
  );
}

export default TutorsSearchResult;
