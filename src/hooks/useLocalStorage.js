import { useReducer, useEffect } from "react";

export default function useLocalStorage(key, initialValue, reducer) {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
