import React from "react";

const Bar = ({ percentageWidth, color, ...props }) => (
  <div
    style={{ display: "inline-block", width: percentageWidth + "%" }}
    {...props}
  >
    <div style={{ backgroundColor: color, height: 16 }}></div>
    <p style={{ display: "flex", alignContent: "space-between" }}>
      <span
        style={{
          height: 18,
          width: 18,
          marginRight: 2,
          backgroundColor: color
        }}
      ></span>{" "}
      <span>&nbsp;&lt;$500 &nbsp; &nbsp; {percentageWidth}%</span>
    </p>
  </div>
);

function getBars(showing, barsData) {
  return (
    <div className="mainBar">
      <div style={{ display: "inline-block", width: "4%", margin: 2 }}>
        {showing + ":"}
      </div>
      <div style={{ display: "inline-block", width: "96%" }}>
        {barsData.map((barData) => (
          <Bar percentageWidth={barData.width} color={barData.color} />
        ))}
      </div>
    </div>
  );
}

export { Bar, getBars };
