"use client";

import { create } from "zustand";

export type LensEventType =
  | "search_intent"
  | "property_viewed"
  | "property_saved"
  | "tour_item_added"
  | "showing_request"
  | "buyer_intent"
  | "seller_intent"
  | "tool_started"
  | "tool_completed"
  | "consultation_prepared"
  | "emergency_intent_identified"
  | "service_category_identified"
  | "passport_started"
  | "property_context_completed"
  | "risk_questions_derived"
  | "photo_context_added"
  | "triage_completed"
  | "maintenance_plan_created"
  | "service_request_prepared"
  | "reminder_plan_previewed"
  | "safety_path_shown"
  | "case_review_started"
  | "case_review_completed"
  | "attorney_review_prompted"
  | "evidence_plan_created"
  | "documentation_gaps_identified"
  | "owner_walkthrough_requested";

export type LensScope = "real-estate" | "plumbing" | "injury-law";

export type LensEvent = {
  id: string;
  scope: LensScope;
  type: LensEventType;
  signal: string;
  response: string;
  value: string;
  status: "observed" | "derived" | "demo-preview";
};

type SystemLensState = {
  openScope: LensScope | null;
  events: LensEvent[];
  setOpen: (open: boolean, scope: LensScope) => void;
  toggle: (scope: LensScope) => void;
  record: (event: Omit<LensEvent, "id" | "scope"> & { scope?: LensScope }) => void;
};

export const useSystemLens = create<SystemLensState>((set) => ({
  openScope: null,
  events: [],
  setOpen: (open, scope) => set({ openScope: open ? scope : null }),
  toggle: (scope) => set((state) => ({ openScope: state.openScope === scope ? null : scope })),
  record: (event) =>
    set((state) => {
      const normalized = { ...event, scope: event.scope ?? "real-estate" } as Omit<LensEvent, "id">;
      const key = `${normalized.scope}:${normalized.type}:${normalized.signal}`;
      if (state.events.some((item) => `${item.scope}:${item.type}:${item.signal}` === key)) return state;
      const other = state.events.filter((item) => item.scope !== normalized.scope);
      const scoped = [{ ...normalized, id: `${Date.now()}-${normalized.type}` }, ...state.events.filter((item) => item.scope === normalized.scope)].slice(0, 16);
      return { events: [...scoped, ...other].slice(0, 48) };
    }),
}));
