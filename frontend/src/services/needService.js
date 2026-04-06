import { apiRequest } from "./api";

export function getMyNeeds() {
  return apiRequest("/needs/my");
}

export function getOpenNeeds() {
  return apiRequest("/needs");
}

export function createNeed(needData) {
  return apiRequest("/needs", {
    method: "POST",
    body: JSON.stringify(needData),
  });
}