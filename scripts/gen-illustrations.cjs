// Minimal, bold, monochrome illustration set. Few lines, big, no text, no grid.
// Each is one clear idea built from the same "form field" motif.
// Theme-aware (light/dark). Rendered to PNG via Chromium (browse).
// Usage: node _gen-illo.cjs <scene> <light|dark> <outfile.html>
const fs = require("fs");

const W = 760, H = 760;
const LIGHT = { BG: "#f6f6f4", ST: "#191919", FACE: "#ffffff", BAR: "#cfcfcc", SOFT: "#e7e7e4" };
const DARK = { BG: "#1f1f21", ST: "#f0f0f0", FACE: "#2b2b2e", BAR: "#565659", SOFT: "#37373a" };
let P = LIGHT, S;

const A = (o) => (o.opacity != null ? ` opacity="${o.opacity}"` : "");
const rrect = (x, y, w, h, r, o = {}) => S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}"${o.sw ? ` stroke-width="${o.sw}"` : ""} stroke-linejoin="round"${o.tf ? ` transform="${o.tf}"` : ""}${A(o)}/>`);
const line = (x1, y1, x2, y2, o = {}) => S.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || P.ST}" stroke-width="${o.w || 3}" stroke-linecap="round"${A(o)}/>`);
const circ = (cx, cy, r, o = {}) => S.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}"${o.sw ? ` stroke-width="${o.sw}"` : ""}${A(o)}/>`);
const path = (d, o = {}) => S.push(`<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || P.ST}" stroke-width="${o.w || 3}" stroke-linecap="round" stroke-linejoin="round"${A(o)}/>`);

const SW = 3.4; // bold field stroke
// a big input field: rounded box + one placeholder bar (+ optional chevron)
function field(x, y, w, h, o = {}) {
  rrect(x, y, w, h, 14, { fill: o.fill || P.FACE, stroke: P.ST, sw: o.sw || SW, opacity: o.opacity });
  if (o.bar !== false) rrect(x + 20, y + h / 2 - 5, o.barW || 96, 10, 5, { fill: P.BAR, opacity: o.opacity });
  if (o.chevron) { const cx = x + w - 30, cy = y + h / 2; line(cx - 9, cy - 5, cx, cy + 5, { w: 3, opacity: o.opacity }); line(cx, cy + 5, cx + 9, cy - 5, { w: 3, opacity: o.opacity }); }
}
function warnBadge(cx, cy, r, o = {}) {
  path(`M ${cx},${cy - r} L ${cx - r * 0.92},${cy + r * 0.64} L ${cx + r * 0.92},${cy + r * 0.64} Z`, { w: o.w || 3.2, opacity: o.opacity });
  line(cx, cy - r * 0.3, cx, cy + r * 0.18, { w: o.w || 3.2, opacity: o.opacity });
  circ(cx, cy + r * 0.42, 2.6, { fill: P.ST, opacity: o.opacity });
}

function bg() { S.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${P.BG}"/>`); }

// 1. No end in sight — a form field repeating down forever, fading off the edge
function endless() {
  bg();
  const x = 168, w = 424, h = 74, step = 104;
  const ops = [1, 1, 1, 0.55, 0.28, 0.12];
  ops.forEach((op, i) => field(x, 70 + i * step, w, h, { opacity: op, chevron: i % 2 === 1 }));
  // "keeps going" — double down chevron
  const cx = 380, cy = 706;
  [0, 16].forEach((dy) => path(`M ${cx - 20},${cy - 10 + dy} L ${cx},${cy + 8 + dy} L ${cx + 20},${cy - 10 + dy}`, { w: 3.4, opacity: 0.5 - dy / 60 }));
}

// 2. Too much asked at once — one screen overstuffed, fields spilling out
function overload() {
  bg();
  const fx = 176, fy = 96, fw = 408, fh = 470;
  rrect(fx, fy, fw, fh, 26, { fill: "none", stroke: P.ST, sw: 3 }); // the "one screen"
  const x = fx + 26, w = fw - 52, h = 40, step = 50;
  for (let i = 0; i < 8; i++) field(x, fy + 26 + i * step, w, h, { sw: 2.8, barW: 80 });
  // spilling out the bottom
  field(x + 10, fy + fh - 16, w - 20, 40, { sw: 2.8, barW: 80, opacity: 0.6 });
  field(x + 26, fy + fh + 34, w - 52, 40, { sw: 2.8, barW: 80, opacity: 0.32 });
}

// 3. Text field or dropdown? — two identical inputs, a big question mark
function ambiguous() {
  bg();
  const x = 196, w = 368, h = 104;
  field(x, 214, w, h, { barW: 150, chevron: true, sw: 3.6 });
  field(x, 214 + h + 92, w, h, { barW: 150, chevron: true, sw: 3.6 });
  const qx = 380, qy = 214 + h + 46;
  path(`M ${qx - 22},${qy - 18} a 22,22 0 1 1 34,17 q -12,9 -12,20`, { w: 9 });
  circ(qx, qy + 34, 5.4, { fill: P.ST });
}

// 4. 80% error rate — five fields, four flagged (= 80%)
function errorRate() {
  bg();
  const x = 168, w = 424, h = 74, step = 104;
  const err = [true, true, false, true, true];
  err.forEach((e, i) => {
    field(x, 62 + i * step, w, h, { sw: e ? 3.8 : 3.2, fill: e ? P.SOFT : P.FACE, barW: 96 });
    if (e) warnBadge(x + w - 40, 62 + i * step + h / 2, 15, { w: 2.8 });
  });
}

const scenes = { endless, overload, ambiguous, errorRate };
const scene = process.argv[2] || "overload";
P = process.argv[3] === "dark" ? DARK : LIGHT;
S = [];
(scenes[scene] || overload)();

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${S.join("")}</svg>`;
fs.writeFileSync(process.argv[4] || `illo-${scene}.html`, `<div id="stage" style="width:${W}px;height:${H}px;background:${P.BG};">${svg}</div>`);
console.log("wrote", scene, process.argv[3] || "light");
