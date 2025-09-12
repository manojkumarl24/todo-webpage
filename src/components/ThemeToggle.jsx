import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      aria-pressed={!isLight}
      aria-label="Toggle theme"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      style={btnStyle}
    >
      {isLight ? "🌙" : "☀️"}
    </button>
  );
};

const btnStyle = {
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.06)",
  cursor: "pointer",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
};

export default ThemeToggle;
