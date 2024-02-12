/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react"
import { useCallback } from "react"

const BASE_URL = "http://localhost:8000"

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload }
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }
    case "rejected":
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error("Unkown action type")
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error loading data" })
      }
    }
    getCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: "city/loaded", payload: data })
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error loading data" })
      }
    },
    [currentCity.id]
  )

  async function addCity(city) {
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      dispatch({ type: "city/created", payload: data })
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error creating city data" })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" })
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      })

      dispatch({ type: "city/deleted", payload: id })
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error deleting city data" })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error("Cities context was used outside")
  return context
}

export { CitiesProvider, useCities }