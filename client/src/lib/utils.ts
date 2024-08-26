import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDuration, intervalToDuration, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ChallengeCountDownOptions = {
  format: Array<"days" | "hours" | "minutes" | "seconds">;
  delimiter?: string;
};
export function challengeCountDown(
  startDate: string,
  endDate: string,
  options: ChallengeCountDownOptions = {
    format: ["days"],
  }
) {
  const duration = intervalToDuration({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  return formatDuration(duration, {
    locale: fr,
    format: options.format,
    delimiter: ", ",
  });
}
