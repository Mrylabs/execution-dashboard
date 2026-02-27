# Execution Dashboard

A structured personal execution system built with Next.js App Router and TypeScript.

This project explores how daily execution can be modeled using explicit state transitions, lifecycle-aware logic, and identity-based tracking rather than simple task lists.

It is designed as an execution interface, not a planning tool.

---

## Philosophy

The system is built around three principles:

- Execution over planning  
- Identity over perfection  
- Informing over punishing  

Instead of focusing on streak pressure, the dashboard emphasizes weekly consistency, explicit daily logs, and neutral feedback loops.

---

## Implemented

### Authentication & Routing
- Public and protected routes
- Layout-based route guards
- Login / logout flow
- Persistent dashboard shell

### Task Layer (Execution v1)
- Add and complete tasks
- Persistent state
- Clear separation of daily execution

### Habit Engine (Consistency Model v2)
- Explicit daily logs (no hidden gaps)
- Monday-based weekly reset
- Weekly completion tracking (Mon–Sun)
- Total completion counter
- Neutral reporting for missed days

---

## In Progress

### Structured Domain Engine

A versioned, rotating domain system for modeling structured routines such as training cycles or life maintenance blocks.

This engine introduces:
- Block-based lifecycle modeling
- Server-driven daily session generation
- Immutable daily snapshots
- Identity continuity across block upgrades

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Server-driven logic (in progress)
- Database persistence (migration underway)

---

## Architectural Goals

This project focuses on:

- Template vs instance separation
- Time-based derived state
- Weekly analytical reporting
- Lifecycle versioning
- Behavioral UX design

The long-term direction is a modular execution system capable of modeling real-world structured domains such as deep work, training, and life routines.
