import { apiClient } from "./apiClient";

export type ApiCountry = {
  id: number;
  name: string;
  continent_id: number;
  continent_name?: string;
  flag_image_url?: string;
  map_image_url?: string;
  capital?: string;
  population?: number;
  area_km2?: number;
  language?: string;
  description?: string;
  is_featured?: number;
  currency?: string;
  area_comparison?: string;
  population_comparison?: string;
  greeting?: string;
  overview?: string;
  map_note?: string;
  clothing?: string;
  food?: string;
  house?: string;
  color?: string;
};

export type ApiContinent = {
  id: number;
  name: string;
  color: string;
  population?: number;
  area_km2?: number;
  country_count?: number;
};

export async function getContinents() {
  const { data } = await apiClient.get<ApiContinent[]>("/api/continents");
  return data;
}

export async function getCountries() {
  const { data } = await apiClient.get<ApiCountry[]>("/api/countries");
  return data;
}

export async function getFeaturedCountries() {
  const { data } = await apiClient.get<ApiCountry[]>("/api/countries/featured");
  return data;
}

export async function getCountry(id: number) {
  const { data } = await apiClient.get<ApiCountry>(`/api/countries/${id}`);
  return data;
}

let countryCache: ApiCountry[] | null = null;

export async function getCountryByName(name: string) {
  if (!countryCache) {
    countryCache = await getCountries();
  }
  return countryCache.find((country) => country.name === name) ?? null;
}

export async function getCountryIdByName(name: string) {
  const country = await getCountryByName(name);
  return country?.id ?? null;
}
