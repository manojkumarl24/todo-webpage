export const DEFAULT_STATUS = "TO-DO"; 
export const STATUSES = Object.freeze([
  "TO-DO",
  "IN-PROGRESS",
  "FINISHED",
  "PENDING",
  "LATE FINISH"
]);

export const PRIORITIES = Object.freeze(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const SORT_OPTIONS = Object.freeze({
  NEWEST: "NEWEST",
  OLDEST: "OLDEST",
  HIGH_PRIORITY: "HIGH_PRIORITY",
  LOW_PRIORITY: "LOW_PRIORITY"
});
