import axios from "axios";
import React, { useState } from "react";

function ListCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [newUsed, setNewUsed] = useState(true);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
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
          type,
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
        <label>Car Make</label>
        <input value={make} onChange={(e) => setMake(e.target.value)} />
        <label>Car Model</label>
        <input value={model} onChange={(e) => setModel(e.target.value)} />
        <label>New or Used</label>
        <input
          type="checkbox"
          value={newUsed}
          onChange={() => {
            newUsed ? setNewUsed(false) : setNewUsed(true);
          }}
        />
        <label>Color</label>
        <input value={color} onChange={(e) => setColor(e.target.value)} />
        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Vehicle Type</label>
        <input value={type} onChange={(e) => setType(e.target.value)} />
        <label>Image</label>
        <input
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Vin Number</label>
        <input
          type="number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button onClick={handleListCar}>List Car</button>
      </div>
    </div>
  );
}
export default ListCar;
