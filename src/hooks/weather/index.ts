import { useEffect, useState } from "react"
import { API_KEY_OPENWEATHER, API_KEY_TOMORROW, API_KEY_WEATHER, API_URL, API_URL_OPENWEATHER, API_URL_REGION, API_URL_TOMORROW } from "@env"
import { Daily, Location, Weather } from "./types"
// import { data } from "./const"

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
    // console.log('aa', `${API_URL_OPENWEATHER}/forecast?q=${encodeSpaces(city)},id&appid=${API_KEY_OPENWEATHER}`)
    try {
      const response = await fetch(`${API_URL_TOMORROW}?location=${encodeSpaces(city)}&timesteps=1d&apikey=${API_KEY_TOMORROW}`)
      // const response = await fetch(`${API_URL_OPENWEATHER}/forecast?q=${city},id&appid=${API_KEY_OPENWEATHER}`)
      const data = await response.json();
      // console.log('data weather', JSON.stringify(data))
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