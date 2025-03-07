export interface City {
	code: string;
	name: string;
	value?: string;
	label?: string;
}

export interface Meta {
	administrative_area_level: number;
	updated_at: string;
}

export interface CitiesResponse {
	data: City[];
	meta: Meta;
}

export interface CityDropdown {
	value: string
	label: string
}