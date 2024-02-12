import { useState, useEffect } from "react"

const apiKey = "f84fc31d"

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(
    function () {
      callback?.()
      const controller = new AbortController()
      async function fetchMovies() {
        try {
          setIsLoading(true)
          setError("")
          const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`, {
            signal: controller.signal,
          })
          if (!res.ok) throw new Error("Something went wrong with fetching movies")

          const data = await res.json()
          if (data.Response === "False") throw new Error("Movie not found")

          setMovies(data.Search)
        } catch (error) {
          console.log(error.message)
          if (error.name !== "AbortError") setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      if (query.length < 3) {
        setMovies([])
        setError("")
        return
      }

      // handleCloseMovie()
      fetchMovies()

      return function () {
        controller.abort()
      }
    },
    [query]
  )
  return { movies, isLoading, error }
}
