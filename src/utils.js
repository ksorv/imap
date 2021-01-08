export function getPercentage(total) {
  return (no) => Math.floor((no / total) * 100);
}

export function getPathColors(dataValue) {
  if (dataValue < 500) {
    return { fillColor: "lightskyblue", color: "green" };
  } else if (dataValue >= 500 && dataValue <= 1000) {
    return { fillColor: "deepskyblue", color: "red" };
  } else if (dataValue >= 1000 && dataValue <= 5000) {
    return { fillColor: "darkblue", color: "orange" };
  } else {
    return { fillColor: "indigo", color: "black" };
  }
}

export function getAllPercentages(apiData) {
  let below = 0,
    betweenOne = 0,
    betweenTwo = 0,
    above = 0;

  apiData.map((data, _) => {
    let dataValue = data.data;
    if (dataValue < 500) {
      below++;
    } else if (dataValue >= 500 && dataValue <= 1000) {
      betweenOne++;
    } else if (dataValue >= 1000 && dataValue <= 5000) {
      betweenTwo++;
    } else {
      above++;
    }
  });

  const getPercentageFor = getPercentage(apiData.length);

  return [
    getPercentageFor(below),
    getPercentageFor(betweenOne),
    getPercentageFor(betweenTwo),
    getPercentageFor(above)
  ];
}
