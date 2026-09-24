"use client";

import { useEffect, useState } from "react";

// Several shades of pink so the petals feel varied, not uniform.
const COLORS = [
  "#ffd1dc",
  "#ffb6c1",
  "#f8bbd0",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#e0669d",
  "#db2777",
];

function randomPetal(id) {
  const size = 8 + Math.random() * 14; // 8px - 22px
  return {
    id,
    left: Math.random() * 100, // vw %
    size,
    duration: 11 + Math.random() * 12, // 11s - 23s to fall — slower reads as smoother than fast+small
    delay: -Math.random() * 20, // negative delay staggers start so it never looks "empty" on load
    drift: Math.random() * 160 - 80, // sideways sway, -80px to 80px
    rotate: 180 + Math.random() * 540,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.4 + Math.random() * 0.4,
  };
}

export default function PetalField() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Fewer, GPU-cheap petals — smoothness matters more than density.
    const count = 16 + Math.floor(Math.random() * 14); // 16 - 29 petals
    setPetals(Array.from({ length: count }, (_, i) => randomPetal(i)));
  }, []);

  return (
    <div
      className="petal-field fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            "--rotate": `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
