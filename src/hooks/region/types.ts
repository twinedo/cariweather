export interface Province {
	code: string;
	name: string;
	value?: string;
	label?: string;
}

export interface Meta {
	administrative_area_level: number;
	updated_at: string;
}

export interface ProvincesResponse {
	data: Province[];
	meta: Meta;
}

export interface ProvinceDropdown {
	value: string
	label: string
}