export default function ProfileAvatar({ name, size = 44 }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#2B6EFF",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: size / 2.4,
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
