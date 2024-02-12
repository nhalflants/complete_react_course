/* eslint-disable react/prop-types */
import styles from "./CountryItem.module.css"

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.flag}</span>
      <span>{country.name}</span>
    </li>
  )
}

export default CountryItem
