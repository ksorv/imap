import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";

import { getBars } from "./Bar";
import Circle from "./Circle";
import { getAllPercentages } from "../utils";

import "../styles/App.css";
import apiData from "../../data.json";

function App() {
  const [below, betweenOne, betweenTwo, above] = getAllPercentages(apiData);

  const barsData = [
    {
      width: below,
      color: "green"
    },
    {
      width: betweenOne,
      color: "red"
    },
    {
      width: betweenTwo,
      color: "orange"
    },
    {
      width: above,
      color: "black"
    }
  ];

  return (
    <>
      <MapContainer
        center={[20.52, 20.34]}
        zoom={2.5}
        scrollWheelZoom={false}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {apiData.map((dataPoint) => (
          <Circle dataPoint={dataPoint} key="index" />
        ))}
      </MapContainer>
      {getBars("Usage", barsData)}
    </>
  );
}

export default App;
