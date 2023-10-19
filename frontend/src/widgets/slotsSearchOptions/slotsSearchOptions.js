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

function SlotsSearchOptions({
  slots,
  setSlots,
  grade,
  setGrade,
  subject,
  setSubject,
}) {
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
        hour: 0,
        minute: 0,
        length: "30",
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

    updatedSlots[index][field] = value;

    // Check for uniqueness
    const isUnique = checkSlotUniqueness(updatedSlots);
    setIsUnique(isUnique);

    setSlots(updatedSlots);
  };

  const checkSlotUniqueness = (slots) => {
    const slotSet = new Set();
    for (const slot of slots) {
      const slotKey = `${slot.day}-${slot.hour}-${slot.minute}`;
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
        <Box>
          <TextField
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            placeholder="Grade"
            value={grade}
            onChange={(e) =>
              setGrade(Number(e.target.value.replace(/[^0-9]/g, "")))
            }
            sx={{ marginBottom: 2 }}
            required
          />
        </Box>
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
                value={slot.hour}
                onChange={(e) => handleSlotChange(e, index, "hour")}
                sx={{ marginBottom: 2, marginX: 0.5 }}
              >
                {[...Array(24)].map((_, i) => (
                  <MenuItem key={i} value={i}>
                    {i.toString().padStart(2, "0")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Minute</InputLabel>
              <Select
                value={slot.minute}
                onChange={(e) => handleSlotChange(e, index, "minute")}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value={0}>00</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Length</InputLabel>
              <Select
                value={slot.length}
                onChange={(e) => handleSlotChange(e, index, "length")}
                sx={{ width: "80px" }}
                label={"Length"}
                required
              >
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={90}>90</MenuItem>
              </Select>
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
