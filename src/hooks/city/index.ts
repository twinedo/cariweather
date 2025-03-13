import { useEffect, useState } from "react"
import { City, CityDropdown, CitiesResponse } from "./types"
import { API_URL_REGION } from "@env"

export const useCity = (provinceCode?: string) => {
  const [cities, setCities] = useState<CityDropdown[]>([])
  const [selectedCity, setSelectedCity] = useState<CityDropdown>()
  const [error, setError] = useState('')

  const cleanCityName = (city: string): string => {
    return city.replace(/^(Kab\.|Kota|Adm\.)\s*/i, '').trim();
  };
  
  const onGetCity = async () => {
    try {
      const response = await fetch(`${API_URL_REGION}/regencies/${provinceCode}.json`);
      const data = await response.json() as CitiesResponse;
  
      console.log('data city', data);
  
      const newArr: CityDropdown[] = data.data.map(val => ({
        label: cleanCityName(val.name),
        value: val.code
      }));
  
      console.log('newArr', newArr);
      setCities(newArr);
    } catch (error) {
      setError(JSON.stringify(error));
    }
  };
  

  const onSelectCity = async (city: CityDropdown) => {
    setSelectedCity(city)
  }

  useEffect(() => {
    onGetCity()
  }, [provinceCode])
  
  return {
    cities,
    setCities,
    onGetCity,
    error,
    selectedCity,
    onSelectCity
  }
}