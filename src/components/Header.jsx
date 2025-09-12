import { useTheme } from "../context/ThemeContext";


export default function Header() {
    const { theme, toggle } = useTheme();
    return (
        <header style={headerStyle}>
            <h1 style={{ margin: 0 }}>Todo Webpage</h1>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <small style={{ opacity: 0.8 }}>{theme === "light" ? "Light" : "Dark"}</small>
                <button onClick={toggle} style={themeButtonStyle} aria-label="Toggle theme">
                {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </header>
    );
}


const headerStyle = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: 18,
};


const themeButtonStyle = { padding: 8, borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" };
