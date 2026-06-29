import { apiClient } from "./apiClient";

export type UserCountryDto = {
  id: number;
  country_id: number;
  name: string;
  flag_image_url?: string;
  capital?: string;
  continent_name?: string;
  immigration_passed: boolean;
  immigration_passed_at?: string;
  added_at?: string;
};

export async function getUserCountries() {
  const { data } = await apiClient.get<UserCountryDto[]>("/api/user-countries");
  return data;
}

export async function addUserCountry(countryId: number) {
  const { data } = await apiClient.post("/api/user-countries", { country_id: countryId });
  return data;
}

export async function passImmigration(userCountryId: number) {
  const { data } = await apiClient.patch(`/api/user-countries/${userCountryId}/immigration`);
  return data;
}
