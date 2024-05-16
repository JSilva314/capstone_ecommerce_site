import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Checkbox } from "@mui/material";

function ListCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [newUsed, setNewUsed] = useState(true);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [bodyType, setType] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");

  async function handleListCar() {
    try {
      const { data } = await axios.post(
        "/api/cars",
        {
          make,
          model,
          newUsed,
          color,
          year: +year,
          bodyType,
          image,
          price,
          vin: +vin,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2>List Car</h2>
      <div>
        <TextField
          label="Car Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <TextField
          label="Car Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Checkbox checked={newUsed} onChange={() => setNewUsed(!newUsed)} />
        <TextField
          label="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          label="Vehicle Type"
          value={bodyType}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Image"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Vin Number"
          type="number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <Button variant="contained" onClick={handleListCar}>
          List Car
        </Button>
      </div>
    </div>
  );
}
export default ListCar;
