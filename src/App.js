import {
  MapContainer,
  TileLayer,
  Popup,
  Circle,
  FeatureGroup,
} from 'react-leaflet'

import './App.css'
import apiData from './data.json'

function getOthers() {
  let below = 0,
    betweenOne = 0,
    betweenTwo = 0,
    above = 0

  let length = apiData.length

  apiData.map((data, _) => {
    let dataValue = data.data
    if (dataValue < 500) {
      below++
    } else if (dataValue >= 500 && dataValue <= 1000) {
      betweenOne++
    } else if (dataValue >= 1000 && dataValue <= 5000) {
      betweenTwo++
    } else {
      above++
    }
  })
  return [
    Math.floor((below / length) * 100),
    Math.floor((betweenOne / length) * 100),
    Math.floor((betweenTwo / length) * 100),
    Math.floor((above / length) * 100),
  ]
}

function getPathOptions(dataValue) {
  if (dataValue < 500) {
    return {fillColor: 'lightskyblue', color: 'green'}
  } else if (dataValue >= 500 && dataValue <= 1000) {
    return {fillColor: 'deepskyblue', color: 'red'}
  } else if (dataValue >= 1000 && dataValue <= 5000) {
    return {fillColor: 'darkblue', color: 'orange'}
  } else {
    return {fillColor: 'indigo', color: 'black'}
  }
}

function getBar() {
  const [below, betweenOne, betweenTwo, above] = getOthers()

  return (
    <div className="totalSpent">
      <div style={{display: 'inline-block', width: '4%'}}>Usage:</div>
      <div style={{display: 'inline-block', width: below - 1 + '%'}}>
        <div
          className="below"
          style={{backgroundColor: 'green', height: '100%'}}
        ></div>
        <p style={{display: 'flex', alignContent: 'space-between'}}>
          <span
            style={{
              height: 18,
              width: 18,
              marginRight: 2,
              backgroundColor: 'green',
            }}
          ></span>{' '}
          <span>&nbsp;&lt;$500 &nbsp; &nbsp; &nbsp; &nbsp;{below}</span>
        </p>
      </div>
      <div style={{display: 'inline-block', width: betweenOne - 1 + '%'}}>
        <div
          className="betweenOne"
          style={{backgroundColor: 'red', height: '100%'}}
        ></div>
        <p style={{display: 'flex', alignContent: 'space-between'}}>
          <span
            style={{
              height: 18,
              width: 18,
              marginRight: 2,
              backgroundColor: 'red',
            }}
          ></span>{' '}
          <span>&nbsp;$500-$1000 &nbsp; &nbsp; &nbsp; &nbsp; {betweenOne}</span>
        </p>
      </div>
      <div style={{display: 'inline-block', width: betweenTwo - 1 + '%'}}>
        <div
          className="betweenTwo"
          style={{backgroundColor: 'orange', height: '100%'}}
        ></div>
        <p style={{display: 'flex', alignContent: 'space-between'}}>
          <span
            style={{
              height: 18,
              width: 18,
              marginRight: 2,
              backgroundColor: 'orange',
            }}
          ></span>{' '}
          <span>&nbsp;$1000-$5000 &nbsp; &nbsp; &nbsp; &nbsp;{betweenTwo}</span>
        </p>
      </div>
      <div style={{display: 'inline-block', width: above - 1 + '%'}}>
        <div
          className="above"
          style={{backgroundColor: 'black', height: '100%'}}
        ></div>
        <p style={{display: 'flex', alignContent: 'space-between'}}>
          <span
            style={{
              height: 18,
              width: 18,
              marginRight: 2,
              backgroundColor: 'black',
            }}
          ></span>{' '}
          <span>&nbsp;&gt;$5000 &nbsp; &nbsp; &nbsp; &nbsp;{above}</span>
        </p>
      </div>
    </div>
  )
}

function getCircle(dataPoint) {
  return (
    <FeatureGroup key={dataPoint.id}>
      <Popup>
        <p>Radius: {dataPoint.radius}</p>
        <p>Spent: ${dataPoint.data}</p>
      </Popup>
      <Circle
        center={[dataPoint.lat, dataPoint.lon]}
        pathOptions={getPathOptions(dataPoint.data)}
        radius={dataPoint.radius}
      />
    </FeatureGroup>
  )
}

function App() {
  const [below, betweenOne, betweenTwo, above] = getOthers()
  console.log(betweenOne, below, betweenTwo, above)
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
        {apiData.map((dataPoint, idx) => getCircle(dataPoint))}
      </MapContainer>
      {getBar()}
    </>
  )
}

export default App
