import React, { useState } from "react";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Box, FormControl, InputLabel } from "@mui/material";

function SlotsSearchOptions({ slots, setSlots }) {
  // const [slots, setSlots] = useState([
  //   {
  //     day: "Monday",
  //     time: "00:00",
  //     subject: "",
  //     grade: "",
  //     sessionLength: "30",
  //   },
  // ]);
  const [isUnique, setIsUnique] = useState(true);

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        day: "Monday",
        time: "00:00",
        subject: "",
        grade: "",
        sessionLength: "30",
      },
    ]);
  };

  const removeSlot = (index) => {
    if (slots.length > 1) {
      const updatedSlots = [...slots];
      updatedSlots.splice(index, 1);
      setSlots(updatedSlots);
    }
  };

  const handleSlotChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedSlots = [...slots];
    if (field == "hour") {
      const newTime = value + updatedSlots[index]["time"].slice(2);
      updatedSlots[index]["time"] = newTime;
    } else if (field == "minute") {
      const newTime = updatedSlots[index]["time"].slice(0, 3) + value;
      updatedSlots[index]["time"] = newTime;
    } else {
      updatedSlots[index][field] = value;
    }
    // Check for uniqueness
    const isUnique = checkSlotUniqueness(updatedSlots);
    setIsUnique(isUnique);

    setSlots(updatedSlots);
  };

  const checkSlotUniqueness = (slots) => {
    const slotSet = new Set();
    for (const slot of slots) {
      const slotKey = `${slot.day}-${slot.time}-${slot.subject}-${slot.grade}`;
      if (slotSet.has(slotKey)) {
        return false; // Not unique
      }
      slotSet.add(slotKey);
    }
    return true; // Unique
  };

  return (
    <Container>
      <Box sx={{ padding: 3, borderRadius: 2, textAlign: "center" }}>
        <h2>Search Options</h2>
        {slots.map((slot, index) => (
          <div key={index}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Day</InputLabel>
              <Select
                value={slot.day}
                onChange={(e) => handleSlotChange(e, index, "day")}
                sx={{ marginBottom: 2 }}
                required
              >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>hour</InputLabel>

              <Select
                value={slot.time.split(":")[0]} // Extract hours from time string
                onChange={(e) => handleSlotChange(e, index, "hour")}
                sx={{ marginBottom: 2, marginX: 0.5 }}
              >
                {[...Array(24)].map((_, i) => (
                  <MenuItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Minute</InputLabel>
              <Select
                value={slot.time.split(":")[1]} // Extract minutes from time string
                onChange={(e) => handleSlotChange(e, index, "minute")}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="00">00</MenuItem>
                <MenuItem value="30">30</MenuItem>
              </Select>{" "}
            </FormControl>

            <TextField
              type="text"
              placeholder="Subject"
              value={slot.subject}
              onChange={(e) => handleSlotChange(e, index, "subject")}
              sx={{ marginBottom: 2 }}
              required
            />
            <TextField
              type="text"
              placeholder="Grade"
              value={slot.grade}
              onChange={(e) => handleSlotChange(e, index, "grade")}
              sx={{ marginBottom: 2 }}
              required
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Length</InputLabel>
              <Select
                value={slot.sessionLength}
                onChange={(e) => handleSlotChange(e, index, "sessionLength")}
                sx={{ width: "80px" }}
                label={"Length"}
                required
              >
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="60">60</MenuItem>
                <MenuItem value="90">90</MenuItem>
              </Select>{" "}
            </FormControl>

            {slots.length > 1 && (
              <IconButton onClick={() => removeSlot(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </div>
        ))}
        <IconButton onClick={addSlot}>
          <AddIcon color="primary" />
        </IconButton>
        {!isUnique && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            Non-unique slots. Each slot combination must be unique.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default SlotsSearchOptions;
