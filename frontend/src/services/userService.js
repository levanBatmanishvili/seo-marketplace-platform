import { apiRequest } from "./api";

export function getExperts(page = 1, limit = 6) {
  return apiRequest(`/users/experts?page=${page}&limit=${limit}`);
}