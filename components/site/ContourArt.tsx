type P = [number, number];

const r1 = (n: number) => Math.round(n * 10) / 10;
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function ring(cx: number, cy: number, r: number, k: number) {
  const n = 28;
  const pts: P[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const wob = 1 + 0.09 * Math.sin(3 * t + k) + 0.05 * Math.sin(5 * t + 2 * k) + 0.025 * Math.sin(8 * t + 3 * k);
    pts.push([cx + r * wob * Math.cos(t) * 1.3, cy + r * wob * Math.sin(t)]);
  }
  const start = mid(pts[n - 1], pts[0]);
  let d = `M${r1(start[0])} ${r1(start[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += `Q${r1(pts[i][0])} ${r1(pts[i][1])} ${r1(m[0])} ${r1(m[1])}`;
  }
  return `${d}Z`;
}

const paths = [
  ...Array.from({ length: 12 }, (_, i) => ring(980, 250, 40 + i * 36, i * 0.14)),
  ...Array.from({ length: 6 }, (_, i) => ring(120, 570, 30 + i * 30, 1.7 + i * 0.16)),
];

export function ContourArt() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMid slice" aria-hidden focusable="false" className="h-full w-full">
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" strokeWidth={1} vectorEffect="non-scaling-stroke" className="stroke-gold-500/15" />
      ))}
    </svg>
  );
}
