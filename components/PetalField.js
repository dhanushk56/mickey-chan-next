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
  const size = 8 + Math.random() * 16; // 8px - 24px
  return {
    id,
    left: Math.random() * 100, // vw %
    size,
    duration: 9 + Math.random() * 12, // 9s - 21s to fall
    delay: -Math.random() * 20, // negative delay staggers start so it never looks "empty" on load
    drift: Math.random() * 200 - 100, // sideways sway, -100px to 100px
    rotate: 180 + Math.random() * 720, // total spin over the fall
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.45 + Math.random() * 0.45,
  };
}

export default function PetalField() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Randomize the amount on every load too, not just the placement.
    const count = 22 + Math.floor(Math.random() * 26); // 22 - 47 petals
    setPetals(Array.from({ length: count }, (_, i) => randomPetal(i)));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
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
