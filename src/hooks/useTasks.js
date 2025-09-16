import { useEffect, useMemo, useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { taskReducer } from "../reducers/taskReducer";
import { STATUSES } from "../constants";


function computeStatus(task) {
  const now = new Date();
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const progress = Number(task.progress ?? 0);

  if (!deadline) {
    if (progress >= 100) return "FINISHED";
    if (progress > 0) return "IN-PROGRESS";
    return "TO-DO";
  }

  if (now <= deadline) {
    if (progress === 0) return "TO-DO";
    if (progress > 0 && progress < 100) return "IN-PROGRESS";
    if (progress === 100) return "FINISHED";
  } else {
    if (progress < 100) return "PENDING";
    if (progress === 100 && task.status !== "FINISHED") return "LATE FINISH";
  }

  return "TO-DO";
}


export default function useTasks({ sortBy = null, filterGroups = [], filterStatuses = [] } = {}) {
  const [tasks, dispatch] = useLocalStorage("tasks", [], taskReducer);

  useEffect(() => {
    if (!Array.isArray(tasks)) return;

    const updates = tasks.reduce((acc, t) => {
      const newStatus = computeStatus(t);
      if (t.status !== newStatus) acc.push({ ...t, status: newStatus });
      return acc;
    }, []);

    if (updates.length) {
      updates.forEach((u) => {
        dispatch({ type: "UPDATE_TASK", payload: u });
      });
    }
  }, [tasks]); 

  const groups = useMemo(() => {
    if (!Array.isArray(tasks)) return [];
    const s = new Set();
    tasks.forEach((t) => {
      if (t.group && String(t.group).trim()) s.add(String(t.group).trim());
    });
    return Array.from(s);
  }, [tasks]);

  const addTask = useCallback(
    (taskPayload) => {
      const normalized = {
        ...taskPayload,
        progress: Number(taskPayload.progress ?? 0),
        status: taskPayload.status ?? "TO-DO",
        createdAt: taskPayload.createdAt ?? new Date().toISOString()
      };
      dispatch({ type: "ADD_TASK", payload: normalized });
    },
    [dispatch]
  );

  const updateTask = useCallback(
    (payload) => {
      const existing = tasks.find((t) => t.id === payload.id);
      if (!existing) return;
      const merged = { ...existing, ...payload, status: existing.status, progress: existing.progress };
      dispatch({ type: "UPDATE_TASK", payload: merged });
    },
    [dispatch, tasks]
  );

  const deleteTask = useCallback((id) => dispatch({ type: "DELETE_TASK", payload: id }), [dispatch]);

  const updateProgress = useCallback(
    (id, newProgress) => {
      const p = Math.max(0, Math.min(100, Number(newProgress)));
      const t = tasks.find((x) => x.id === id);
      if (!t) return;
      const updated = { ...t, progress: p };
      updated.status = computeStatus(updated);
      dispatch({ type: "UPDATE_TASK", payload: updated });
    },
    [dispatch, tasks]
  );

  const visibleTasks = useMemo(() => {
    let result = Array.isArray(tasks) ? tasks.slice() : [];

    if (Array.isArray(filterGroups) && filterGroups.length > 0) {
      result = result.filter((t) => filterGroups.includes(String(t.group ?? "")));
    }

    if (Array.isArray(filterStatuses) && filterStatuses.length > 0) {
      const upper = filterStatuses.map((s) => String(s).toUpperCase());
      result = result.filter((t) => upper.includes(String((t.status ?? "").toUpperCase())));
    }

    if (sortBy) {
      if (sortBy === "NEWEST") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === "OLDEST") {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === "HIGH_PRIORITY") {
        result.sort((a, b) => {
          const pa = (a.priority || "").toString();
          const pb = (b.priority || "").toString();
          if (pa === pb) return 0;
          return pa < pb ? 1 : -1;
        });
      } else if (sortBy === "LOW_PRIORITY") {
        result.sort((a, b) => {
          const pa = (a.priority || "").toString();
          const pb = (b.priority || "").toString();
          if (pa === pb) return 0;
          return pa > pb ? 1 : -1;
        });
      }
    }

    return result;
  }, [tasks, filterGroups, filterStatuses, sortBy]);

  return {
    tasks,
    visibleTasks,
    groups,
    addTask,
    updateTask,
    deleteTask,
    updateProgress,
    dispatch 
  };
}
