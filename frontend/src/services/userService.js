import { apiRequest } from "./api";

export function getExperts() {
  return apiRequest("/users/experts");
}