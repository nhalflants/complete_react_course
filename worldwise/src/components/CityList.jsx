/* eslint-disable react/prop-types */
import Spinner from "./Spinner"
import styles from "./CityList.module.css"
import CityItem from "./CityItem"
import Message from "./Message"
import { useCities } from "./../contexts/CitiesContext"

export default function CityList() {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="Please add a new city" />
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}
