import React from "react";

import { Popup, Circle as MapCircle, FeatureGroup } from "react-leaflet";
import { getPathColors } from "../utils";

export default ({ dataPoint }) => (
  <FeatureGroup key={dataPoint.id}>
    <Popup>
      <p>Radius: {dataPoint.radius}</p>
      <p>Spent: ${dataPoint.data}</p>
    </Popup>
    <MapCircle
      center={[dataPoint.lat, dataPoint.lon]}
      pathOptions={getPathColors(dataPoint.data)}
      radius={dataPoint.radius}
    />
  </FeatureGroup>
);
