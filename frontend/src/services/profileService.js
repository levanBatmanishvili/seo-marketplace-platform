import { apiRequest } from "./api";

export function getMyProfile() {
  return apiRequest("/profiles/me");
}

export function createProfile(profileData) {
  return apiRequest("/profiles", {
    method: "POST",
    body: JSON.stringify(profileData),
  });
}