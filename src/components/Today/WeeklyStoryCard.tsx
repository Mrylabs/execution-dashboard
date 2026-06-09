"use client";

import { useState } from "react";
import type { WeeklyStory } from "@/lib/todayPersonalization";
import TodayCard from "./TodayCard";

type WeeklyStoryCardProps = {
  weeklyStory: WeeklyStory;
  weeklyHabitPercentage: number;
  onSaveWeeklyStory: (weeklyStory: WeeklyStory) => void;
};

export default function WeeklyStoryCard({
  weeklyStory,
  weeklyHabitPercentage,
  onSaveWeeklyStory,
}: WeeklyStoryCardProps) {
  const [editing, setEditing] = useState(false);
  const [headlineDraft, setHeadlineDraft] = useState(weeklyStory.headline);
  const [noteDraft, setNoteDraft] = useState(weeklyStory.note);

  function handleCancel() {
    setHeadlineDraft(weeklyStory.headline);
    setNoteDraft(weeklyStory.note);
    setEditing(false);
  }

  function handleSave() {
    const nextWeeklyStory = {
      ...weeklyStory,
      headline: headlineDraft.trim() || weeklyStory.headline,
      note: noteDraft.trim() || weeklyStory.note,
    };

    onSaveWeeklyStory(nextWeeklyStory);
    setHeadlineDraft(nextWeeklyStory.headline);
    setNoteDraft(nextWeeklyStory.note);
    setEditing(false);
  }

  return (
    <TodayCard
      title={weeklyStory.title}
      eyebrow="This week"
      accent="blue"
      prominence="primary"
      className="md:col-span-6 lg:col-span-12 lg:min-h-[420px]"
    >
      <div className="flex min-h-[300px] flex-col justify-between gap-10">
        <div className="space-y-5">
          <div className="flex justify-end">
            {editing ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="text-xs font-medium text-blue-950/75"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-xs text-blue-950/45"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs text-blue-950/45 transition hover:text-blue-950/70"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <textarea
                value={headlineDraft}
                onChange={(event) => setHeadlineDraft(event.target.value)}
                className="min-h-28 w-full max-w-2xl resize-none rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 text-3xl font-semibold leading-tight text-blue-950 outline-none focus:border-blue-200 md:text-5xl"
                aria-label="Weekly story headline"
              />
              <textarea
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                className="min-h-24 w-full max-w-xl resize-none rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-base leading-8 text-blue-950/70 outline-none focus:border-blue-200"
                aria-label="Weekly story note"
              />
            </div>
          ) : (
            <>
              <p className="max-w-2xl text-3xl font-semibold leading-tight text-blue-950 md:text-5xl">
                {weeklyStory.headline}
              </p>

              <p className="max-w-xl text-base leading-8 text-blue-950/65">
                Consistency is at{" "}
                <span className="font-semibold text-blue-950">
                  {weeklyHabitPercentage}%
                </span>
                . {weeklyStory.note}
              </p>
            </>
          )}
        </div>

        <div className="max-w-xl">
          <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-normal text-blue-900/55">
            <span>Weekly rhythm</span>
            <span>{weeklyHabitPercentage}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-blue-500/80 transition-all"
              style={{ width: `${weeklyHabitPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </TodayCard>
  );
}
