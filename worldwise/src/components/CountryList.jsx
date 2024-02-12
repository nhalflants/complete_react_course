/* eslint-disable react/prop-types */
import Spinner from "./Spinner"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import Message from "./Message"
import { useCities } from "./../contexts/CitiesContext"

export default function CountryList() {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="Please add a new city" />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { name: city.country, flag: city.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  )
}
