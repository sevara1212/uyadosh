
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "EEE, MMM d, yyyy 'at' h:mm a");
}

export function formatTimeFromNow(dateString: string): string {
  const date = new Date(dateString);
  return formatDistance(date, new Date(), { addSuffix: true });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  }
}

export function getSportIcon(sportType: string): string {
  switch (sportType.toLowerCase()) {
    case 'running':
      return '🏃';
    case 'yoga':
      return '🧘';
    case 'cycling':
      return '🚴';
    case 'swimming':
      return '🏊';
    case 'basketball':
      return '🏀';
    case 'football':
      return '⚽';
    case 'tennis':
      return '🎾';
    case 'gym':
      return '💪';
    case 'other':
      return '🏆';
    default:
      return '🏆';
  }
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
