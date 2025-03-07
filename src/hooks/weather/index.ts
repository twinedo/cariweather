import { useEffect, useState } from "react"
import { API_KEY_TOMORROW, API_KEY_WEATHER, API_URL, API_URL_REGION, API_URL_TOMORROW } from "@env"
import { Daily, Location, Weather } from "./types"

export const useWeather = (city?: string) => {
  const [weather, setWeather] = useState<Weather>()
  const [locationWeather, setLocationWeather] = useState<Location>()
  const [dailyWeather, setDailyWeather] = useState<Daily[]>([])
  const [error, setError] = useState('')
  console.log('city', city)

  const encodeSpaces = (str?: string): string => {
    return str?.replace(/ /g, '%20') ?? '';
  };

  const onGetWeather = async () => {
    try {
      const response = await fetch(`${API_URL_TOMORROW}?location=${encodeSpaces(city)}&timesteps=1d&apikey=${API_KEY_TOMORROW}`)
      const data = await response.json() as Weather;
      // console.log('data weather', data)
      setWeather(data)
      setLocationWeather(data.location)
      setDailyWeather(data.timelines.daily)
    } catch (error) {
      setError(JSON.stringify(error))
    }
  }

  useEffect(() => {
    onGetWeather()
  }, [city])
  
  return {
    weather,
    setWeather,
    onGetWeather,
    locationWeather,
    dailyWeather,
    error,
  }
}