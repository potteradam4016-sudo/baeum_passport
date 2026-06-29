import { apiClient } from "./apiClient";

export type StampDto = {
  id: number;
  country_id: number;
  country_name: string;
  flag_image_url?: string;
  continent_name?: string;
  created_at?: string;
};

export async function getStamps() {
  const { data } = await apiClient.get<StampDto[]>("/api/stamps");
  return data;
}
