import type { TravelCountryInfo } from "@/lib/storage";
import { apiClient } from "./apiClient";

type TravelInfoResponse = {
  id?: number;
  country_id?: number;
  country_name?: string;
  display_name?: string;
  area?: string;
  population?: string;
  language?: string;
  capital?: string;
  continent?: string;
  flag_image_url?: string;
  map_image_url?: string;
  user_note?: string;
  travel_purpose?: string;
  places_to_visit?: string;
  local_phrase?: string;
  travel_tips?: string;
  landmark?: string;
  food_to_try?: string;
  packing_list?: string;
  cautions?: string;
  weather_note?: string;
  free_memo?: string;
};

function toInfo(data: TravelInfoResponse, fallbackCountryName = ""): TravelCountryInfo {
  const countryName = data.country_name ?? fallbackCountryName;
  return {
    countryName,
    displayName: data.display_name ?? countryName,
    area: data.area ?? "",
    population: data.population ?? "",
    language: data.language ?? "",
    capital: data.capital ?? "",
    continent: data.continent ?? "",
    flagImage: data.flag_image_url ?? "",
    mapImage: data.map_image_url ?? "",
    travelPurpose: data.travel_purpose ?? "",
    placesToVisit: data.places_to_visit ?? "",
    localPhrase: data.local_phrase ?? "",
    travelTips: data.travel_tips ?? data.user_note ?? "",
    landmark: data.landmark ?? "",
    foodToTry: data.food_to_try ?? "",
    packingList: data.packing_list ?? "",
    cautions: data.cautions ?? "",
    weatherNote: data.weather_note ?? "",
    freeMemo: data.free_memo ?? "",
  };
}

function toPayload(info: TravelCountryInfo) {
  return {
    country_name: info.countryName,
    display_name: info.displayName,
    area: info.area,
    population: info.population,
    language: info.language,
    capital: info.capital,
    continent: info.continent,
    flag_image_url: info.flagImage,
    map_image_url: info.mapImage,
    user_note: info.travelTips,
    travel_purpose: info.travelPurpose,
    places_to_visit: info.placesToVisit,
    local_phrase: info.localPhrase,
    travel_tips: info.travelTips,
    landmark: info.landmark,
    food_to_try: info.foodToTry,
    packing_list: info.packingList,
    cautions: info.cautions,
    weather_note: info.weatherNote,
    free_memo: info.freeMemo,
  };
}

export async function getTravelInfos() {
  const { data } = await apiClient.get<TravelInfoResponse[]>("/api/travel-info");
  return data.map((item) => toInfo(item));
}

export async function createTravelInfo(info: TravelCountryInfo) {
  const { data } = await apiClient.post<TravelInfoResponse>("/api/travel-info", toPayload(info));
  return toInfo(data, info.countryName);
}

export async function getTravelInfo(countryName: string) {
  const { data } = await apiClient.get<TravelInfoResponse>(`/api/travel-info/country/${encodeURIComponent(countryName)}`);
  return toInfo(data, countryName);
}

export async function updateTravelInfo(countryName: string, info: TravelCountryInfo) {
  const { data } = await apiClient.patch<TravelInfoResponse>(`/api/travel-info/country/${encodeURIComponent(countryName)}`, toPayload(info));
  return toInfo(data, countryName);
}

export async function deleteTravelInfo(countryName: string) {
  await apiClient.delete(`/api/travel-info/country/${encodeURIComponent(countryName)}`);
}
