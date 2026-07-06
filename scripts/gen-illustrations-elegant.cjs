// Elegant dark "spotlight" illustrations: thin white line-art on near-black,
// soft glows, glowing nodes. One idea per scene, matches the content.
// Usage: node _gen-elegant.cjs <scene> <W> <H> <outfile.html>
const fs = require("fs");

const BG = "#0c0c0e";
const scene = process.argv[2] || "endless";
const W = +(process.argv[3] || 1000), H = +(process.argv[4] || 620);
const CX = W / 2;
let S = [];
const push = (s) => S.push(s);

// helpers
const rr = (x, y, w, h, r, o = {}) => push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}"${o.sw ? ` stroke-width="${o.sw}"` : ""}${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.op != null ? ` opacity="${o.op}"` : ""}/>`);
const ln = (x1, y1, x2, y2, o = {}) => push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || "#fff"}" stroke-width="${o.sw || 1.3}" stroke-linecap="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.op != null ? ` opacity="${o.op}"` : ""}/>`);
const ci = (cx, cy, r, o = {}) => push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}"${o.sw ? ` stroke-width="${o.sw}"` : ""}${o.op != null ? ` opacity="${o.op}"` : ""}/>`);
const pth = (d, o = {}) => push(`<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || "#fff"}" stroke-width="${o.sw || 1.3}" stroke-linecap="round" stroke-linejoin="round"${o.op != null ? ` opacity="${o.op}"` : ""}/>`);
const halo = (cx, cy, r, op = 0.9) => push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#halo)" opacity="${op}"/>`);
const node = (cx, cy, o = {}) => { halo(cx, cy, o.glow || 16, o.glowOp || 0.9); ci(cx, cy, o.ring || 8, { stroke: "#fff", sw: 1.2, op: 0.5 }); ci(cx, cy, o.r || 4, { fill: "#fff" }); };
// a thin field-outline "input"
function field(x, y, w, h, op, barOp) {
  rr(x, y, w, h, Math.min(15, h / 3.2), { stroke: "#fff", sw: 1.3, fill: "rgba(255,255,255,0.014)", op });
  if (barOp !== 0) rr(x + 20, y + h / 2 - 4, Math.min(w * 0.42, 120), 8, 4, { fill: "#fff", op: (barOp != null ? barOp : op) * 0.8 });
}

// ambient soft glow blob
const glowBlob = (cx, cy, rx, ry, op = 0.18) => push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#halo)" opacity="${op}"/>`);

// deterministic pseudo-random for reproducible particle scatter
let _seed = 20260706;
const rnd = () => { _seed = (_seed * 1103515245 + 12345) & 0x7fffffff; return _seed / 0x7fffffff; };

// ambient depth: faint dot grid + concentric dashed rings from a focal point +
// scattered particles (a few glowing). Drawn behind the main content.
function depth(fx, fy, o = {}) {
  push(`<rect x="0" y="0" width="${W}" height="${H}" fill="url(#dotgrid)"/>`);
  // concentric dashed rings radiating from the focal point
  const step = o.ringStep || Math.min(W, H) * 0.16;
  for (let i = 1; i <= (o.rings || 5); i++) {
    ci(fx, fy, step * i, { stroke: "#fff", sw: 1, op: Math.max(0.015, 0.075 - i * 0.012), dash: "2 11" });
  }
  // scattered particles
  _seed = 20260706;
  const n = o.particles || 40;
  for (let i = 0; i < n; i++) {
    const x = rnd() * W, y = rnd() * H, bright = rnd() > 0.86;
    if (bright) { halo(x, y, 5, 0.5); ci(x, y, 1.6, { fill: "#fff", op: 0.85 }); }
    else ci(x, y, 0.6 + rnd() * 1.1, { fill: "#fff", op: 0.06 + rnd() * 0.09 });
  }
}

function endless() {
  depth(CX, H * 0.2, { rings: 5, ringStep: H * 0.17, particles: 44 });
  glowBlob(CX, H * 0.24, W * 0.34, H * 0.28, 0.20);
  const fw0 = Math.min(360, W * 0.42), fh = 58, gap = 22;
  const ops = [0.62, 0.4, 0.24, 0.13, 0.06];
  let y = H * 0.12;
  ops.forEach((op, i) => {
    const w = fw0 * (1 - i * 0.07), x = CX - w / 2, h = fh - i * 3;
    field(x, y, w, h, op, op);
    if (i === 0) node(x + w, y + h / 2, { glow: 14, r: 4.5, ring: 8 });
    y += h + gap;
  });
  // dashed trail into the void + node, then fade
  ln(CX, y - 4, CX, H + 20, { op: 0.14, dash: "2 9" });
  node(CX, y + (H - y) * 0.4, { glow: 12, r: 3.5, ring: 7 });
}

function overload() {
  depth(CX, H * 0.46, { rings: 5, ringStep: Math.min(W, H) * 0.2, particles: 42 });
  glowBlob(CX, H * 0.42, W * 0.5, H * 0.34, 0.16);
  // a bounded "screen" frame
  const fw = Math.min(W * 0.66, 360), fx = CX - fw / 2, fy = H * 0.1, fh = H * 0.66;
  rr(fx, fy, fw, fh, 26, { stroke: "#fff", sw: 1.3, op: 0.3 });
  // packed fields
  const x = fx + 22, w = fw - 44, h = 34, step = 44;
  const n = Math.floor((fh - 30) / step);
  for (let i = 0; i < n; i++) field(x, fy + 18 + i * step, w, h, 0.34, 0.5);
  // spilling out the bottom, fading
  field(x + 12, fy + fh - 14, w - 24, h, 0.2, 0.3);
  field(x + 28, fy + fh + 32, w - 56, h, 0.1, 0.16);
  node(fx + fw, fy + 18 + h / 2, { glow: 13, r: 4, ring: 7 });
}

function ambiguous() {
  depth(CX, H * 0.5, { rings: 5, ringStep: Math.min(W, H) * 0.18, particles: 40 });
  glowBlob(CX, H * 0.46, W * 0.42, H * 0.4, 0.16);
  const w = Math.min(W * 0.6, 380), x = CX - w / 2, h = 92;
  const y1 = H * 0.2, y2 = H * 0.2 + h + 96;
  [y1, y2].forEach((y) => {
    field(x, y, w, h, 0.42, 0.5);
    // chevron
    const cx = x + w - 30, cy = y + h / 2;
    ln(cx - 9, cy - 5, cx, cy + 5, { op: 0.5, sw: 1.5 }); ln(cx, cy + 5, cx + 9, cy - 5, { op: 0.5, sw: 1.5 });
  });
  // luminous question mark between them
  const qx = CX, qy = (y1 + h + y2) / 2 + 2;
  halo(qx, qy - 4, 42, 0.55);
  pth(`M ${qx - 17},${qy - 15} a 17,17 0 1 1 27,14 q -11,8 -11,17`, { sw: 5.5, op: 0.95 });
  ci(qx, qy + 26, 3.4, { fill: "#fff" });
}

function errorRate() {
  const cx = CX, cy = H * 0.46, r = Math.min(W, H) * 0.26;
  depth(cx, cy, { rings: 4, ringStep: r * 0.55, particles: 40 });
  glowBlob(cx, cy, W * 0.4, H * 0.4, 0.14);
  // radial tick marks around the gauge (dial detail)
  for (let t = 0; t < 60; t++) {
    const a = (t / 60) * 2 * Math.PI - Math.PI / 2;
    const major = t % 5 === 0;
    const r1 = r + 14, r2 = r + (major ? 26 : 20);
    ln(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), { sw: major ? 1.4 : 1, op: major ? 0.22 : 0.1 });
  }
  const C = 2 * Math.PI * r;
  // faint full track
  ci(cx, cy, r, { stroke: "#fff", sw: 2, op: 0.1 });
  // 80% bright arc (start at top, clockwise)
  push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${(0.8 * C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})" opacity="0.85"/>`);
  // glowing node at the arc's end (80% around from top, clockwise) -> angle
  const ang = -Math.PI / 2 + 0.8 * 2 * Math.PI;
  node(cx + r * Math.cos(ang), cy + r * Math.sin(ang), { glow: 18, r: 4.5, ring: 8 });
  // small warning glyph in the centre
  const tr = 20;
  pth(`M ${cx},${cy - tr} L ${cx - tr * 0.9},${cy + tr * 0.62} L ${cx + tr * 0.9},${cy + tr * 0.62} Z`, { sw: 1.6, op: 0.55 });
  ln(cx, cy - tr * 0.28, cx, cy + tr * 0.12, { op: 0.6, sw: 1.6 });
  ci(cx, cy + tr * 0.38, 1.6, { fill: "#fff", op: 0.6 });
}

const scenes = { endless, overload, ambiguous, errorRate };
(scenes[scene] || endless)();

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="bgglow" cx="50%" cy="30%" r="75%"><stop offset="0%" stop-color="#17171b"/><stop offset="100%" stop-color="${BG}"/></radialGradient>
  <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" opacity="0.045"/></pattern>
</defs>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgglow)"/>
${S.join("\n")}
</svg>`;
fs.writeFileSync(process.argv[5] || `el-${scene}.html`, `<div id="s" style="width:${W}px;height:${H}px;background:${BG};">${svg}</div>`);
console.log("wrote", scene, W + "x" + H);
