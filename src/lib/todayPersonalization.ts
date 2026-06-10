export type WeeklyStory = {
  title: string;
  headline: string;
  note: string;
};

export type CycleRhythm = {
  periodStartDate: string;
  cycleLength: number;
};

export type TodayPersonalization = {
  weeklyStory: WeeklyStory;
  personalReminder: string;
  cycleRhythm: CycleRhythm;
};

const STORAGE_KEY = "execution-dashboard:today-personalization";
const DEFAULT_CYCLE_LENGTH = 28;

export const defaultTodayPersonalization: TodayPersonalization = {
  weeklyStory: {
    title: "Weekly Story",
    headline: "Keep the week moving with a few clean wins.",
    note: "Today is about protecting the rhythm, not forcing the whole week at once.",
  },
  personalReminder: "Momentum > mood.",
  cycleRhythm: {
    periodStartDate: "",
    cycleLength: DEFAULT_CYCLE_LENGTH,
  },
};

type StoredCycleRhythm =
  | Partial<CycleRhythm>
  | {
      day?: number;
      label?: string;
    };

type StoredTodayPersonalization = Partial<
  Omit<TodayPersonalization, "cycleRhythm">
> & {
  cycleRhythm?: StoredCycleRhythm;
};

function getDateString(date: Date) {
  return date.toISOString().split("T")[0];
}

function normalizeCycleRhythm(
  cycleRhythm: StoredCycleRhythm | undefined
): CycleRhythm {
  if (!cycleRhythm) {
    return defaultTodayPersonalization.cycleRhythm;
  }

  if ("periodStartDate" in cycleRhythm) {
    const cycleLength =
      typeof cycleRhythm.cycleLength === "number" &&
      Number.isFinite(cycleRhythm.cycleLength) &&
      cycleRhythm.cycleLength > 0
        ? Math.round(cycleRhythm.cycleLength)
        : DEFAULT_CYCLE_LENGTH;

    return {
      periodStartDate: cycleRhythm.periodStartDate || "",
      cycleLength,
    };
  }

  return {
    periodStartDate: getDateString(new Date()),
    cycleLength: DEFAULT_CYCLE_LENGTH,
  };
}

function mergeTodayPersonalization(
  value: StoredTodayPersonalization
): TodayPersonalization {
  return {
    weeklyStory: {
      ...defaultTodayPersonalization.weeklyStory,
      ...value.weeklyStory,
    },
    personalReminder:
      value.personalReminder ?? defaultTodayPersonalization.personalReminder,
    cycleRhythm: normalizeCycleRhythm(value.cycleRhythm),
  };
}

export function getCycleDay(periodStartDate: string, today = new Date()) {
  if (!periodStartDate) return 0;

  const start = new Date(`${periodStartDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;

  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const dayDifference = Math.floor(
    (current.getTime() - startDate.getTime()) / 86_400_000
  );

  if (dayDifference < 0) return 0;

  return dayDifference + 1;
}

export function getCyclePhase(cycleDay: number, cycleLength = DEFAULT_CYCLE_LENGTH) {
  if (cycleDay <= 0 || cycleLength <= 0) return "";

  const normalizedDay = ((cycleDay - 1) % cycleLength) + 1;

  if (normalizedDay <= 5) return "Period";
  if (normalizedDay <= 13) return "Follicular";
  if (normalizedDay <= 16) return "Ovulation";
  return "Luteal";
}

export function getCycleRhythmLabel(cycleRhythm: CycleRhythm) {
  const cycleDay = getCycleDay(cycleRhythm.periodStartDate);
  const phase = getCyclePhase(cycleDay, cycleRhythm.cycleLength);

  if (!cycleDay || !phase) return "Set cycle";

  return `Day ${cycleDay} - ${phase}`;
}

export function readTodayPersonalization(): TodayPersonalization {
  if (typeof window === "undefined") {
    return defaultTodayPersonalization;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultTodayPersonalization;

    return mergeTodayPersonalization(JSON.parse(stored));
  } catch {
    return defaultTodayPersonalization;
  }
}

export function writeTodayPersonalization(
  personalization: TodayPersonalization
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(personalization)
  );
}
