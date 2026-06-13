"use client";

import { useState } from "react";
import type { WeeklyStory } from "@/lib/todayPersonalization";
import DashboardCard from "@/components/dashboard/DashboardCard";

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
    <DashboardCard
      className="h-full overflow-hidden border-blue-100/55 bg-blue-50/55 px-4 py-3.5 shadow-sm ring-1 ring-blue-100/45 md:col-span-6 md:px-5 md:py-4 lg:col-span-12"
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-normal text-blue-700">
              This week
            </p>

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
                className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-slate-300 opacity-70 transition hover:bg-slate-50 hover:text-slate-500 hover:opacity-100"
                aria-label="Edit weekly story"
              >
                <span aria-hidden="true">✎</span>
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-3">
              <textarea
                value={headlineDraft}
                onChange={(event) => setHeadlineDraft(event.target.value)}
                className="min-h-20 w-full max-w-2xl resize-none rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 text-2xl font-semibold leading-snug text-blue-950 outline-none focus:border-blue-200 md:text-3xl"
                aria-label="Weekly story headline"
              />
              <textarea
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                className="min-h-16 w-full max-w-xl resize-none rounded-xl border border-blue-100 bg-white/70 px-4 py-2.5 text-sm leading-6 text-blue-950/70 outline-none focus:border-blue-200"
                aria-label="Weekly story note"
              />
            </div>
          ) : (
            <>
              <p className="max-w-2xl text-2xl font-semibold leading-snug text-blue-950 md:text-3xl">
                {weeklyStory.headline}
              </p>

              <p className="max-w-xl text-sm leading-6 text-blue-950/65">
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
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-normal text-blue-900/55">
            <span>Weekly rhythm</span>
            <span>{weeklyHabitPercentage}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-blue-500/80 transition-all"
              style={{ width: `${weeklyHabitPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
