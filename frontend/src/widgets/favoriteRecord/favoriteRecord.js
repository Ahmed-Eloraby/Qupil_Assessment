import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import Tutorname from "../../atoms/tutorName/tutorname";

function FavoriteRecord({ grade, subject, favoriteTutors }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box>Subject: {subject}</Box>
        <Box>Grade: {grade}</Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tutor Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteTutors.map((tutor, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Tutorname id={tutor._id} />
                </TableCell>
                <TableCell>{tutor.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default FavoriteRecord;
