import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Paper, Divider } from "@mui/material";
import FavoriteRecord from "../../widgets/favoriteRecord/favoriteRecord";

function Favourites() {
  const [favouritesData, setFavouritesData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/student/favorite")
      .then((res) => {
        console.log(res.data);
        setFavouritesData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 1,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          textAlign: "center",
          minWidth: "40vw",
        }}
      >
        <h2>Favourites</h2>
        {favouritesData.map((favorite, index) => (
          <>
            <FavoriteRecord
              key={index}
              grade={favorite.grade}
              subject={favorite.subject}
              favoriteTutors={favorite.favoriteTutors}
            />
            <hr />
          </>
        ))}
      </Paper>
    </Container>
  );
}

export default Favourites;
