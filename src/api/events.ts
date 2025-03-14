import { API_BASE_URL } from "@/config/api";

export const fetchEvents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    return response.json();
  }; 
export const fetchEventsbyId = async () => {
    const response = await fetch(`${API_BASE_URL}/api/events/:id`);
    return response.json();
  }; 