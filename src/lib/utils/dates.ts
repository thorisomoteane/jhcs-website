import { format } from "date-fns";

export function getEventStatus(date: Date): "upcoming" | "past" {
  return date >= new Date() ? "upcoming" : "past";
}

export function formatEventDate(date: Date): string {
  return format(date, "d MMM yyyy");
}

export function formatEventDateTime(date: Date): string {
  return format(date, "d MMM yyyy 'at' h:mm a");
}

export function formatDisplayDate(date: Date): string {
  return format(date, "PPP");
}
