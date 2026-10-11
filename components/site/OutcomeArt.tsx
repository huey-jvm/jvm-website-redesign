import type { ReactNode } from "react";
import { outcomeIllustrationId, illustrationShape } from "@/content/assets";
import { Slot } from "./Slot";

type P = [number, number];

const pts = (...p: P[]) => p.map(([x, y]) => `${x},${y}`).join(" ");
const r1 = (n: number) => Math.round(n * 10) / 10;


function Platform({ x, y, w, d = 8, gold = false }: { x: number; y: number; w: number; d?: number; gold?: boolean }) {
  const h = w / 2;
  return (
    <g strokeLinejoin="round">
      <polygon points={pts([x - w, y], [x, y + h], [x, y + h + d], [x - w, y + d])} className={gold ? "fill-gold-500 stroke-gold-700" : "fill-ink-100 stroke-ink-300"} />
      <polygon points={pts([x, y + h], [x + w, y], [x + w, y + d], [x, y + h + d])} className={gold ? "fill-gold-700 stroke-gold-700" : "fill-ink-200 stroke-ink-300"} />
      <polygon points={pts([x, y - h], [x + w, y], [x, y + h], [x - w, y])} className={gold ? "fill-gold-200 stroke-gold-700" : "fill-white stroke-ink-300"} />
    </g>
  );
}

function Cube({ x, y, w, h, gold = false }: { x: number; y: number; w: number; h: number; gold?: boolean }) {
  const q = w / 2;
  return (
    <g strokeLinejoin="round">
      <polygon points={pts([x - w, y - h], [x, y - h + q], [x, y + q], [x - w, y])} className={gold ? "fill-gold-500 stroke-gold-700" : "fill-ink-100 stroke-ink-400"} />
      <polygon points={pts([x, y - h + q], [x + w, y - h], [x + w, y], [x, y + q])} className={gold ? "fill-gold-700 stroke-gold-700" : "fill-ink-200 stroke-ink-400"} />
      <polygon points={pts([x, y - h - q], [x + w, y - h], [x, y - h + q], [x - w, y - h])} className={gold ? "fill-gold-200 stroke-gold-700" : "fill-white stroke-ink-400"} />
    </g>
  );
}

function Dash({ from, to, arrow = false }: { from: P; to: P; arrow?: boolean }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const u: P = [dx / len, dy / len];
  const n: P = [-u[1], u[0]];
  const m: P = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  const tip: P = [r1(m[0] + u[0] * 4), r1(m[1] + u[1] * 4)];
  const a: P = [r1(m[0] - u[0] * 3 + n[0] * 3), r1(m[1] - u[1] * 3 + n[1] * 3)];
  const b: P = [r1(m[0] - u[0] * 3 - n[0] * 3), r1(m[1] - u[1] * 3 - n[1] * 3)];
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} strokeDasharray="3 4" className="stroke-ink-400" />
      {arrow ? <polyline points={pts(a, tip, b)} fill="none" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink-500" /> : null}
    </g>
  );
}

function Access() {
  const main: P = [120, 88];
  const sats: P[] = [[34, 52], [206, 52], [34, 112], [206, 112]];
  return (
    <>
      {sats.map((s) => <Dash key={s.join()} from={s} to={main} />)}
      {sats.slice(0, 2).map((s) => <Platform key={s.join()} x={s[0]} y={s[1]} w={20} d={5} />)}
      <Platform x={main[0]} y={main[1]} w={50} />
      {sats.slice(2).map((s) => <Platform key={s.join()} x={s[0]} y={s[1]} w={20} d={5} />)}
      {sats.map((s) => <Cube key={s.join()} x={s[0]} y={s[1]} w={6} h={7} />)}
      <g><Cube x={main[0]} y={main[1]} w={14} h={18} gold /></g>
    </>
  );
}

function WholePerson() {
  return (
    <>
      <line x1={120} y1={36} x2={120} y2={124} strokeDasharray="3 4" className="stroke-ink-400" />
      <Platform x={120} y={112} w={52} d={10} />
      <Platform x={120} y={88} w={52} d={10} />
      <g><Platform x={120} y={64} w={52} d={10} gold /></g>
    </>
  );
}

function Operations() {
  const spots: P[] = [[50, 52], [120, 87], [190, 122]];
  return (
    <>
      <Dash from={spots[0]} to={spots[1]} arrow />
      <Dash from={spots[1]} to={spots[2]} arrow />
      {spots.map((s) => <Platform key={s.join()} x={s[0]} y={s[1]} w={28} d={6} />)}
      <Cube x={spots[0][0]} y={spots[0][1]} w={8} h={9} />
      <g><Cube x={spots[1][0]} y={spots[1][1]} w={11} h={15} gold /></g>
      <Cube x={spots[2][0]} y={spots[2][1]} w={8} h={9} />
    </>
  );
}

function Experience() {
  return (
    <>
      <Platform x={120} y={100} w={56} />
      <ellipse cx={120} cy={100} rx={36} ry={18} fill="none" strokeDasharray="3 4" className="stroke-ink-400" />
      <ellipse cx={120} cy={100} rx={50} ry={25} fill="none" strokeDasharray="3 4" className="stroke-ink-300" />
      <ellipse cx={120} cy={100} rx={14} ry={7} className="fill-ink-200" />
      <g>
        <circle cx={120} cy={84} r={14} className="fill-gold-500 stroke-gold-700" />
        <ellipse cx={115} cy={78} rx={5} ry={4} className="fill-gold-200" />
      </g>
    </>
  );
}

function Readiness() {
  const q = 15;
  const w = 30;
  const h = 46;
  const x = 120;
  const y = 102;
  return (
    <>
      <Platform x={x} y={y} w={62} />
      <g><Cube x={x} y={y} w={12} h={14} gold /></g>
      <g strokeLinejoin="round" className="stroke-ink-400">
        <polygon points={pts([x - w, y - h], [x, y - h + q], [x, y + q], [x - w, y])} className="fill-white/25" />
        <polygon points={pts([x, y - h + q], [x + w, y - h], [x + w, y], [x, y + q])} className="fill-white/35" />
        <polygon points={pts([x, y - h - q], [x + w, y - h], [x, y - h + q], [x - w, y - h])} className="fill-white/50" />
      </g>
    </>
  );
}

const scenes: Record<string, () => ReactNode> = {
  access: Access,
  "whole-person": WholePerson,
  operations: Operations,
  experience: Experience,
  readiness: Readiness,
};

export function OutcomeArt({ outcomeId }: { outcomeId: string }) {
  const id = outcomeIllustrationId(outcomeId);
  const Scene = scenes[outcomeId];
  return (
    <Slot id={id} className="h-full w-full" imgClassName="object-contain" sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 30vw, 100vw">
      {Scene ? (
        <svg
          viewBox={`0 0 ${illustrationShape.width / 5} ${illustrationShape.height / 5}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          focusable="false"
          data-illustration={id}
          className="h-full w-full"
        >
          <Scene />
        </svg>
      ) : null}
    </Slot>
  );
}
