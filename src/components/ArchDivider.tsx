export default function ArchDivider({
  color = "var(--color-paper)",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <div
      className="divider-arch"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 28" preserveAspectRatio="none">
        <path
          d="M0,0 L400,0 L400,10 C 370,26 330,26 300,10 C 280,0 270,0 250,10 C 220,26 180,26 150,10 C 130,0 120,0 100,10 C 70,26 30,26 0,10 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
