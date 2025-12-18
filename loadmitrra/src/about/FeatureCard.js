function FeatureCard({ title, desc, bg, icon, color }) {
  return (
    <div className="col-sm-6">
      <div
        className="h-100 p-3"
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(22, 20, 20, 0.06)",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center mb-2"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: bg,
            color: color,
          }}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>

        <h6 className="fw-semibold mb-1">{title}</h6>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
