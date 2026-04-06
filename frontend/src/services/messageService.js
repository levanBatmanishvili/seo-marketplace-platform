import { apiRequest } from "./api";

export function getMessagesByRelation(relationId) {
  return apiRequest(`/messages/${relationId}`);
}

export function sendMessage(messageData) {
  return apiRequest("/messages", {
    method: "POST",
    body: JSON.stringify(messageData),
  });
}