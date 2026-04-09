import { apiRequest } from "./api";

export function getExpertProfileByUserId(userId) {
  return apiRequest(`/expert-profiles/${userId}`);
}