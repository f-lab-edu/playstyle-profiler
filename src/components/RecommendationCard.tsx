type CardProps = {
    title: string;
    tags?: ReadonlyArray<string>;
    url?: string;
};

export default function RecommendationCard({ title, tags, url }: CardProps) {
    return (
        <a
            href={url ?? "#"}
            target={url ? "_blank" : "_self"}
            rel="noreferrer"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #242a36",
                textDecoration: "none",
                color: "inherit",
                background: "linear-gradient(180deg,#0e1218,#0a0d12)",
            }}
        >
            <strong>{title}</strong>
            {tags && tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {tags.map((t) => (
                        <span
                            key={t}
                            style={{
                                fontSize: 12,
                                padding: "4px 8px",
                                borderRadius: 999,
                                background: "#151b26",
                                border: "1px solid #242a36",
                                opacity: 0.9,
                            }}
                        >
              #{t}
            </span>
                    ))}
                </div>
            )}
        </a>
    );
}