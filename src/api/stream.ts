import { API_BASE_URL } from "@/config/api";

export const fetchStreams = async () => {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    return response.json();
  }; 