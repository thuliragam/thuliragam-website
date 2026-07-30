export default function FallingLeaves() {
  const leaves = Array.from({ length: 10 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {leaves.map((_, i) => (
        <span
          key={i}
          className="leaf"
          style={{
            left: `${5 + i * 9}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${8 + (i % 5)}s`,
          }}
        >
          🍃
        </span>
      ))}
    </div>
  );
}