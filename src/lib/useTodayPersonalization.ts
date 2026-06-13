"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readTodayPersonalization,
  type CycleRhythm,
  type TodayPersonalization,
  type WeeklyStory,
  writeTodayPersonalization,
} from "@/lib/todayPersonalization";
import { supabase } from "@/lib/supabase";

export function useTodayPersonalization() {
  const [storageUserId, setStorageUserId] = useState<string | null>(null);
  const [personalization, setPersonalization] =
    useState<TodayPersonalization>(readTodayPersonalization);

  useEffect(() => {
    let mounted = true;

    async function loadUserScopedPersonalization() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      const userId = user?.id ?? null;
      setStorageUserId(userId);
      setPersonalization(readTodayPersonalization(userId));
    }

    void loadUserScopedPersonalization();

    return () => {
      mounted = false;
    };
  }, []);

  const updatePersonalization = useCallback(
    (next: TodayPersonalization) => {
      setPersonalization(next);
      writeTodayPersonalization(next, storageUserId);
    },
    [storageUserId]
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
