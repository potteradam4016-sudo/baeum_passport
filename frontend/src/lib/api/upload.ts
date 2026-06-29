import { apiClient } from "./apiClient";

type UploadResponse = {
  url: string;
};

async function uploadImage(file: File, endpoint: "/api/upload/flag" | "/api/upload/map") {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await apiClient.post<UploadResponse>(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.url;
}

export function uploadFlagImage(file: File) {
  return uploadImage(file, "/api/upload/flag");
}

export function uploadMapImage(file: File) {
  return uploadImage(file, "/api/upload/map");
}
