import React, { useEffect, useState } from "react";
import axios from "axios";

function Tutorname({ id }) {
  const [tutorName, setTutorName] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/tutor/${id}`)
      .then((res) => setTutorName(res.data.username))
      .catch((err) => console.log(err));
  }, []);
  return <>{tutorName}</>;
}

export default Tutorname;
