// src/components/Progress.tsx

type Props = { current: number; total: number };
export default function Progress({ current, total }: Props) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div aria-label="progress" style={{ margin: "8px 0" }}>
      <div style={{ fontSize: 12, marginBottom: 6 }}>{pct}%</div>
      <div style={{ height: 8, background: "#1a1f27", borderRadius: 999 }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "linear-gradient(90deg,#5ee7df,#b490ca)",
            borderRadius: 999,
            transition: "width .25s ease",
          }}
        />
      </div>
    </div>
  );
}
