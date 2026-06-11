"use client";

import { useState } from "react";
import {
  getCycleRhythmLabel,
  type CycleRhythm,
} from "@/lib/todayPersonalization";

type TodayHeaderProps = {
  greeting: string;
  reminder: string;
  cycleRhythm: CycleRhythm;
  onSaveReminder: (reminder: string) => void;
  onSaveCycleRhythm: (cycleRhythm: CycleRhythm) => void;
};

export default function TodayHeader({
  greeting,
  reminder,
  cycleRhythm,
  onSaveReminder,
  onSaveCycleRhythm,
}: TodayHeaderProps) {
  const [editingReminder, setEditingReminder] = useState(false);
  const [editingCycle, setEditingCycle] = useState(false);
  const [reminderDraft, setReminderDraft] = useState(reminder);
  const [periodStartDateDraft, setPeriodStartDateDraft] = useState(
    cycleRhythm.periodStartDate
  );
  const [cycleLengthDraft, setCycleLengthDraft] = useState(
    String(cycleRhythm.cycleLength)
  );

  function handleCancelReminder() {
    setReminderDraft(reminder);
    setEditingReminder(false);
  }

  function handleSaveReminder() {
    const nextReminder = reminderDraft.trim() || reminder;
    onSaveReminder(nextReminder);
    setReminderDraft(nextReminder);
    setEditingReminder(false);
  }

  function handleCancelCycle() {
    setPeriodStartDateDraft(cycleRhythm.periodStartDate);
    setCycleLengthDraft(String(cycleRhythm.cycleLength));
    setEditingCycle(false);
  }

  function handleSaveCycle() {
    const parsedCycleLength = Number.parseInt(cycleLengthDraft, 10);
    const nextCycle = {
      periodStartDate: periodStartDateDraft,
      cycleLength:
        Number.isFinite(parsedCycleLength) && parsedCycleLength > 0
          ? parsedCycleLength
          : 28,
    };

    onSaveCycleRhythm(nextCycle);
    setPeriodStartDateDraft(nextCycle.periodStartDate);
    setCycleLengthDraft(String(nextCycle.cycleLength));
    setEditingCycle(false);
  }

  return (
    <header className="space-y-1 pb-0">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-normal text-gray-950 md:text-3xl">
          {greeting}
        </h1>

        {editingCycle ? (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <input
              type="date"
              value={periodStartDateDraft}
              onChange={(event) => setPeriodStartDateDraft(event.target.value)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 outline-none focus:border-gray-300"
              aria-label="Period start date"
            />
            <input
              type="number"
              min="1"
              value={cycleLengthDraft}
              onChange={(event) => setCycleLengthDraft(event.target.value)}
              className="w-20 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 outline-none focus:border-gray-300"
              aria-label="Average cycle length"
            />
            <button
              type="button"
              onClick={handleSaveCycle}
              className="text-xs font-medium text-gray-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelCycle}
              className="text-xs text-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingCycle(true)}
            title="Track your cycle if it's relevant to you."
            className="shrink-0 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-500 shadow-sm transition hover:text-gray-700"
          >
            {getCycleRhythmLabel(cycleRhythm)}
          </button>
        )}
      </div>

      {editingReminder ? (
        <div className="flex max-w-xl flex-wrap items-center gap-2">
          <input
            value={reminderDraft}
            onChange={(event) => setReminderDraft(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-300"
            aria-label="Personal reminder"
          />
          <button
            type="button"
            onClick={handleSaveReminder}
            className="text-xs font-medium text-gray-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelReminder}
            className="text-xs text-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-sm leading-5 text-gray-500">
            {reminder}
          </p>
          <button
            type="button"
            onClick={() => setEditingReminder(true)}
            className="text-xs text-gray-400 transition hover:text-gray-600"
          >
            Edit
          </button>
        </div>
      )}
    </header>
  );
}
