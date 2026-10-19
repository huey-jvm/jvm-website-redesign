/**
 * Consolidate: nine crates and a rounded tray. The pointer's x scrubs from a
 * loose spread, crates standing about on their own, to the nine packed into
 * the tray as one unit. Each crate rides its own spring. At rest most are in
 * and two are still out, with the centre crate bright. The slider is how far
 * the loose crates stand from the tray. Each crate leaves along its own
 * spoke from the centre, so no two paths cross, and the centre crate never
 * leaves: it is the core the rest gather to.
 */
const {
  Cam, clamp, facing, fit, lerp, prism, proj, rings, spring, stepS,
  mk, pointer, put, register, disposer, solid,
} = HL;

const N = 3, CELL = 20, FOOT = 14, TRAY = N * CELL, PB = 6, CX = TRAY / 2, CY = TRAY / 2;
const HEIGHTS = [13, 11, 15, 12, 16, 11, 14, 12, 13];
const RADII = [44, 52, 46, 50, 0, 54, 42, 50, 46];
const REST = [1, 1, 1, 1, 1, 0.55, 1, 0, 1];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.05);
  const far = 54 * 1.2 + CELL + FOOT;
  fit(C, [[CX - far, CY - far, -PB], [CX + far, CY + far, -PB], [CX + far, CY - far, 0], [CX - far, CY + far, 0], [CX, CY, 18]], 200, 166);
  const P = proj(C), front = facing(C);
  let spread = value, G = null;

  const g = mk("g", {}, svg);
  const tray = solid(g);
  const [tr, ti] = rings(-4, -4, TRAY + 4, TRAY + 4, 8, 2.4);
  put(tray, prism(P, front, tr, ti, -PB, 0));

  const crates = HEIGHTS.map((h, k) => {
    const i = k % N, j = Math.floor(k / N);
    const di = i - 1, dj = j - 1, len = Math.hypot(di, dj) || 1;
    const home = [i * CELL + (CELL - FOOT) / 2, j * CELL + (CELL - FOOT) / 2];
    return {
      k, h, home,
      out: [home[0] + (di / len) * RADII[k], home[1] + (dj / len) * RADII[k]],
      sp: spring(REST[k], { eps: 0.002 }),
      el: solid(g),
      drawn: NaN,
    };
  });

  const at = (c) => {
    const t = clamp(c.sp.x, 0, 1);
    const ox = c.home[0] + (c.out[0] - c.home[0]) * spread;
    const oy = c.home[1] + (c.out[1] - c.home[1]) * spread;
    return [lerp(ox, c.home[0], t), lerp(oy, c.home[1], t)];
  };

  let order = "";
  function draw() {
    for (const c of crates) {
      const key = c.sp.x * 1000 + spread;
      if (key === c.drawn) continue;
      c.drawn = key;
      const [x0, y0] = at(c);
      c.pos = [x0, y0];
      const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.6, 0.9);
      put(c.el, prism(P, front, ring, inner, 0, c.h));
    }
    const sorted = crates.slice().sort((a, b) => a.pos[0] + a.pos[1] - (b.pos[0] + b.pos[1]));
    const next = sorted.map((c) => c.k).join(",");
    if (next !== order) {
      order = next;
      let prev = tray.g;
      for (const c of sorted) { prev.after(c.el.g); prev = c.el.g; }
    }
  }

  function bright() {
    let lit = null;
    if (G === null) lit = crates[4].el;
    else if (G >= 0.5) lit = tray;
    else lit = crates.reduce((a, b) => (b.sp.t < a.sp.t || (b.sp.t === a.sp.t && b.k > a.k) ? b : a)).el;
    tray.sil.classList.toggle("hi", lit === tray);
    for (const c of crates) c.el.sil.classList.toggle("hi", lit === c.el);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const c of crates) if (stepS(c.sp, dt)) m = true;
    draw();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    crates.forEach((c, n) => {
      const corner = c.k % 2 === 0 && c.k !== 4;
      const lead = corner ? 0.3 : 0;
      c.sp.t = c.k === 4 ? 1 : G === null ? REST[n] : clamp((G - lead) / 0.7, 0, 1);
    });
    if (G === null) read.textContent = "rest";
    else read.textContent = `in ${crates.filter((c) => c.sp.t > 0.5).length}/9`;
    bright();
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { G = clamp((p[0] - 90) / 220, 0, 1); retarget(); },
    leave: () => { G = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());
  draw();
  bright();

  return {
    set: (v) => { spread = v; for (const c of crates) c.drawn = NaN; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "consolidate",
  means: "Loose crates gather into one tray as the pointer moves right: from staffing vendor to integrated partner.",
  rules: [1, 3, 5, 6, 8],
  range: [0.8, 1, 1.2],
  tour: [[110, 160], [200, 160], [300, 160], null],
  mount,
});
