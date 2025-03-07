// export interface Location {
// 	name: string;
// 	region: string;
// 	country: string;
// 	lat: number;
// 	lon: number;
// 	tz_id: string;
// 	localtime_epoch: number;
// 	localtime: string;
// }

// export interface Condition {
// 	text: string;
// 	icon: string;
// 	code: number;
// }

// export interface Current {
// 	last_updated_epoch: number;
// 	last_updated: string;
// 	temp_c: number;
// 	temp_f: number;
// 	is_day: number;
// 	condition: Condition;
// 	wind_mph: number;
// 	wind_kph: number;
// 	wind_degree: number;
// 	wind_dir: string;
// 	pressure_mb: number;
// 	pressure_in: number;
// 	precip_mm: number;
// 	precip_in: number;
// 	humidity: number;
// 	cloud: number;
// 	feelslike_c: number;
// 	feelslike_f: number;
// 	windchill_c: number;
// 	windchill_f: number;
// 	heatindex_c: number;
// 	heatindex_f: number;
// 	dewpoint_c: number;
// 	dewpoint_f: number;
// 	vis_km: number;
// 	vis_miles: number;
// 	uv: number;
// 	gust_mph: number;
// 	gust_kph: number;
// }

// export interface Weather {
// 	location: Location;
// 	current: Current;
// }



export interface Value {
	cloudBaseAvg: number;
	cloudBaseMax: number;
	cloudBaseMin: number;
	cloudCeilingAvg: number;
	cloudCeilingMax: number;
	cloudCeilingMin: number;
	cloudCoverAvg: number;
	cloudCoverMax: number;
	cloudCoverMin: number;
	dewPointAvg: number;
	dewPointMax: number;
	dewPointMin: number;
	evapotranspirationAvg: number;
	evapotranspirationMax: number;
	evapotranspirationMin: number;
	evapotranspirationSum: number;
	freezingRainIntensityAvg: number;
	freezingRainIntensityMax: number;
	freezingRainIntensityMin: number;
	hailProbabilityAvg: number;
	hailProbabilityMax: number;
	hailProbabilityMin: number;
	hailSizeAvg: number;
	hailSizeMax: number;
	hailSizeMin: number;
	humidityAvg: number;
	humidityMax: number;
	humidityMin: number;
	iceAccumulationAvg: number;
	iceAccumulationLweAvg: number;
	iceAccumulationLweMax: number;
	iceAccumulationLweMin: number;
	iceAccumulationLweSum: number;
	iceAccumulationMax: number;
	iceAccumulationMin: number;
	iceAccumulationSum: number;
	moonriseTime: string;
	moonsetTime: string;
	precipitationProbabilityAvg: number;
	precipitationProbabilityMax: number;
	precipitationProbabilityMin: number;
	pressureSeaLevelAvg: number;
	pressureSeaLevelMax: number;
	pressureSeaLevelMin: number;
	pressureSurfaceLevelAvg: number;
	pressureSurfaceLevelMax: number;
	pressureSurfaceLevelMin: number;
	rainAccumulationAvg: number;
	rainAccumulationLweAvg: number;
	rainAccumulationLweMax: number;
	rainAccumulationLweMin: number;
	rainAccumulationMax: number;
	rainAccumulationMin: number;
	rainAccumulationSum: number;
	rainIntensityAvg: number;
	rainIntensityMax: number;
	rainIntensityMin: number;
	sleetAccumulationAvg: number;
	sleetAccumulationLweAvg: number;
	sleetAccumulationLweMax: number;
	sleetAccumulationLweMin: number;
	sleetAccumulationLweSum: number;
	sleetAccumulationMax: number;
	sleetAccumulationMin: number;
	sleetIntensityAvg: number;
	sleetIntensityMax: number;
	sleetIntensityMin: number;
	snowAccumulationAvg: number;
	snowAccumulationLweAvg: number;
	snowAccumulationLweMax: number;
	snowAccumulationLweMin: number;
	snowAccumulationLweSum: number;
	snowAccumulationMax: number;
	snowAccumulationMin: number;
	snowAccumulationSum: number;
	snowIntensityAvg: number;
	snowIntensityMax: number;
	snowIntensityMin: number;
	sunriseTime: string;
	sunsetTime: string;
	temperatureApparentAvg: number;
	temperatureApparentMax: number;
	temperatureApparentMin: number;
	temperatureAvg: number;
	temperatureMax: number;
	temperatureMin: number;
	uvHealthConcernAvg: number;
	uvHealthConcernMax: number;
	uvHealthConcernMin: number;
	uvIndexAvg: number;
	uvIndexMax: number;
	uvIndexMin: number;
	visibilityAvg: number;
	visibilityMax: number;
	visibilityMin: number;
	weatherCodeMax: number;
	weatherCodeMin: number;
	windDirectionAvg: number;
	windGustAvg: number;
	windGustMax: number;
	windGustMin: number;
	windSpeedAvg: number;
	windSpeedMax: number;
	windSpeedMin: number;
}

export interface Daily {
	time: string;
	values: Value;
}

export interface Timeline {
	daily: Daily[];
}

export interface Location {
	lat: number;
	lon: number;
	name: string;
	type: string;
}

export interface Weather {
	timelines: Timeline;
	location: Location;
}