export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
}
