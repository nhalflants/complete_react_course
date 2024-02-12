/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet"
import { useEffect, useState } from "react"
import { useCities } from "./../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "./Button"
import { useUrlPosition } from "../hooks/useUrlPosition"

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    error,
    getPosition: getGeoPosition,
  } = useGeolocation()

  const [mapLat, mapLng] = useUrlPosition()

  useEffect(
    function () {
      if ((mapLat, mapLng)) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng]
  )

  useEffect(
    function () {
      if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    },
    [geoLocationPosition]
  )

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getGeoPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <HandleClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function HandleClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}
