"use client";

import { useCallback, useState } from "react";
import {
  readTodayPersonalization,
  type CycleRhythm,
  type TodayPersonalization,
  type WeeklyStory,
  writeTodayPersonalization,
} from "@/lib/todayPersonalization";

export function useTodayPersonalization() {
  const [personalization, setPersonalization] =
    useState<TodayPersonalization>(readTodayPersonalization);

  const updatePersonalization = useCallback(
    (next: TodayPersonalization) => {
      setPersonalization(next);
      writeTodayPersonalization(next);
    },
    []
  );

  const updateWeeklyStory = useCallback(
    (weeklyStory: WeeklyStory) => {
      updatePersonalization({
        ...personalization,
        weeklyStory,
      });
    },
    [personalization, updatePersonalization]
  );

  const updatePersonalReminder = useCallback(
    (personalReminder: string) => {
      updatePersonalization({
        ...personalization,
        personalReminder,
      });
    },
    [personalization, updatePersonalization]
  );

  const updateCycleRhythm = useCallback(
    (cycleRhythm: CycleRhythm) => {
      updatePersonalization({
        ...personalization,
        cycleRhythm,
      });
    },
    [personalization, updatePersonalization]
  );

  return {
    personalization,
    updateWeeklyStory,
    updatePersonalReminder,
    updateCycleRhythm,
  };
}
