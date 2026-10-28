export function parseInstant(iso: string): number | null {
  const time = new Date(iso).getTime();
  return Number.isFinite(time) ? time : null;
}

export function remainingParts(ms: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const safe = Math.max(0, ms);
  return {
    days: Math.floor(safe / 86_400_000),
    hours: Math.floor(safe / 3_600_000) % 24,
    minutes: Math.floor(safe / 60_000) % 60,
    seconds: Math.floor(safe / 1000) % 60,
  };
}

export function progressBetween(startIso: string, endIso: string, now: number): number {
  const start = parseInstant(startIso);
  const end = parseInstant(endIso);
  if (start === null || end === null || end <= start) return 0;
  return Math.min(1, Math.max(0, (now - start) / (end - start)));
}

/** Clock time on the Jakarta calendar date of the event. */
export function jakartaTimelineInstant(eventAtIso: string, hhmm: string): number | null {
  const eventAt = parseInstant(eventAtIso);
  if (eventAt === null) return null;

  const match = /^(\d{1,2})[:.](\d{2})$/.exec(hhmm.trim());
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(eventAt));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) return null;

  const stamp = new Date(
    `${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+07:00`,
  ).getTime();

  return Number.isFinite(stamp) ? stamp : null;
}
