import { apiRequest } from "./api";

export function getMyNeeds() {
  return apiRequest("/needs/me");
}

export function getOpenNeeds(page = 1, limit = 6) {
  return apiRequest(`/needs?page=${page}&limit=${limit}`);
}

export function createNeed(needData) {
  return apiRequest("/needs", {
    method: "POST",
    body: JSON.stringify(needData),
  });
}