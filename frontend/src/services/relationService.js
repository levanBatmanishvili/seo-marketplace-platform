import { apiRequest } from "./api";

export function getMyRelations() {
  return apiRequest("/relations/me");
}

export function acceptRelation(relationId) {
  return apiRequest(`/relations/${relationId}/accept`, {
    method: "PATCH",
  });
}

export function rejectRelation(relationId) {
  return apiRequest(`/relations/${relationId}/reject`, {
    method: "PATCH",
  });
}