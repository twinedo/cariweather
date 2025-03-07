import { useEffect, useState } from "react"
import { Province, ProvinceDropdown, ProvincesResponse } from "./types"
import { API_URL_REGION } from "@env"

export const useRegion = () => {
  const [provinces, setProvinces] = useState<ProvinceDropdown[]>([])
  const [selectedProvince, setSelectedProvince] = useState<ProvinceDropdown>()
  const [error, setError] = useState('')

  const onGetProvinces = async () => {
    try {
      const response = await fetch(`${API_URL_REGION}/provinces.json`)
      const data = await response.json() as ProvincesResponse;
      let newArr: ProvinceDropdown[] = []
      data.data.map(val => {
        let item = {
          label: val.name,
          value: val.code
        }
        newArr.push(item)
      })
      setProvinces(newArr);
    } catch (error) {
      setError(JSON.stringify(error))
    }
  }

  const onSelectProvince = async (province: ProvinceDropdown) => {
    setSelectedProvince(province)
  }

  useEffect(() => {
    onGetProvinces()
  }, [])
  
  return {
    provinces,
    setProvinces,
    onGetProvinces,
    error,
    selectedProvince,
    onSelectProvince
  }
}