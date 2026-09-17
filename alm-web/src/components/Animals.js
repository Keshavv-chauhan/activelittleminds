import React from 'react';

/*
 * A small cast of characters, drawn as SVG rather than PNG so they stay sharp
 * at any size, recolour with the palette, and cost almost nothing to load.
 * Deliberately simple: round shapes, big eyes, no outlines.
 */

const eye = '#3a3357';

function Face({ children, ...p }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...p}>
      {children}
    </svg>
  );
}

export const Bunny = (p) => (
  <Face {...p}>
    <ellipse cx="23" cy="20" rx="6" ry="15" fill="#f7a8c4" />
    <ellipse cx="41" cy="20" rx="6" ry="15" fill="#f7a8c4" />
    <ellipse cx="23" cy="21" rx="2.6" ry="9" fill="#fddce8" />
    <ellipse cx="41" cy="21" rx="2.6" ry="9" fill="#fddce8" />
    <circle cx="32" cy="42" r="17" fill="#fbc6db" />
    <circle cx="26" cy="40" r="2.6" fill={eye} />
    <circle cx="38" cy="40" r="2.6" fill={eye} />
    <ellipse cx="32" cy="47" rx="3" ry="2.2" fill="#e2739b" />
  </Face>
);

export const Bear = (p) => (
  <Face {...p}>
    <circle cx="17" cy="22" r="9" fill="#c9915f" />
    <circle cx="47" cy="22" r="9" fill="#c9915f" />
    <circle cx="17" cy="22" r="4.5" fill="#efc9a4" />
    <circle cx="47" cy="22" r="4.5" fill="#efc9a4" />
    <circle cx="32" cy="36" r="20" fill="#d9a570" />
    <ellipse cx="32" cy="44" rx="11" ry="8.5" fill="#f2d7b8" />
    <circle cx="25" cy="33" r="2.8" fill={eye} />
    <circle cx="39" cy="33" r="2.8" fill={eye} />
    <ellipse cx="32" cy="41" rx="3.4" ry="2.6" fill={eye} />
  </Face>
);

export const Fox = (p) => (
  <Face {...p}>
    <path d="M12 14l12 9-9 11z" fill="#f4823c" />
    <path d="M52 14L40 23l9 11z" fill="#f4823c" />
    <path d="M32 16c12 0 20 9 20 20 0 11-9 18-20 18s-20-7-20-18c0-11 8-20 20-20z" fill="#fb9a58" />
    <path d="M32 40c6 0 11 4 11 9 0 4-5 7-11 7s-11-3-11-7c0-5 5-9 11-9z" fill="#fff3e6" />
    <circle cx="24" cy="35" r="2.8" fill={eye} />
    <circle cx="40" cy="35" r="2.8" fill={eye} />
    <ellipse cx="32" cy="46" rx="3" ry="2.3" fill={eye} />
  </Face>
);

export const Elephant = (p) => (
  <Face {...p}>
    <ellipse cx="12" cy="34" rx="10" ry="14" fill="#9db8e0" />
    <ellipse cx="52" cy="34" rx="10" ry="14" fill="#9db8e0" />
    <circle cx="32" cy="33" r="19" fill="#b3c9ec" />
    <path
      d="M32 44c4 0 6 3 6 7s-3 7-7 6"
      fill="none"
      stroke="#b3c9ec"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <circle cx="25" cy="31" r="2.8" fill={eye} />
    <circle cx="39" cy="31" r="2.8" fill={eye} />
  </Face>
);

export const Turtle = (p) => (
  <Face {...p}>
    <ellipse cx="32" cy="46" rx="9" ry="7" fill="#8fd9b6" />
    <circle cx="52" cy="40" r="8" fill="#8fd9b6" />
    <path d="M32 16c12 0 21 9 21 20H11c0-11 9-20 21-20z" fill="#4fb98a" />
    <circle cx="32" cy="28" r="6" fill="#8fd9b6" />
    <circle cx="20" cy="31" r="4.5" fill="#8fd9b6" />
    <circle cx="44" cy="31" r="4.5" fill="#8fd9b6" />
    <circle cx="54" cy="38" r="2.3" fill={eye} />
  </Face>
);

export const Chick = (p) => (
  <Face {...p}>
    <circle cx="32" cy="35" r="19" fill="#ffd24c" />
    <ellipse cx="18" cy="37" rx="6" ry="9" fill="#f7c02c" />
    <path d="M32 36l7 5-7 5z" fill="#f4823c" />
    <circle cx="26" cy="30" r="2.8" fill={eye} />
    <circle cx="39" cy="30" r="2.8" fill={eye} />
    <path d="M32 16v-6M27 18l-3-5M37 18l3-5" stroke="#f7c02c" strokeWidth="3" strokeLinecap="round" />
  </Face>
);

const CAST = [Bunny, Bear, Fox, Elephant, Turtle, Chick];

/** A row of characters that bob gently along a ground line. */
export function AnimalParade() {
  return (
    <div className="parade" aria-hidden="true">
      {CAST.map((Animal, i) => (
        <Animal key={i} className="parade__animal" />
      ))}
    </div>
  );
}

export default CAST;

/*
 * Founder portrait — an illustration, not a photo of a real person. Used as a
 * placeholder until the clinic supplies an actual headshot; see the TODO in
 * content.mjs. Kept in the same flat, rounded style as the animal cast so it
 * reads as "one design system" rather than a stock photo bolted on.
 */
export function FounderPortrait(p) {
  return (
    <svg viewBox="0 0 200 220" aria-hidden="true" focusable="false" {...p}>
      <rect width="200" height="220" fill="none" />
      {/* hair, behind the head */}
      <path
        d="M100 34c-34 0-54 24-54 58 0 20 4 38 10 52h10c-4-16-6-32-6-46 0-30 16-48 40-48s40 18 40 48c0 14-2 30-6 46h10c6-14 10-32 10-52 0-34-20-58-54-58z"
        fill="#4a3a2c"
      />
      {/* neck + shoulders / top */}
      <path
        d="M60 172c0-16 18-28 40-28s40 12 40 28v30H60z"
        fill="#5fc5e8"
      />
      <path d="M88 152h24v20a12 12 0 0 1-24 0z" fill="#f0c39a" />
      {/* face */}
      <circle cx="100" cy="112" r="46" fill="#f4cda3" />
      {/* hair front sweep */}
      <path
        d="M56 108c0-30 20-50 44-50s44 20 44 50c-8-10-16-16-24-16-4 6-12 10-20 10s-16-4-20-10c-8 0-16 6-24 16z"
        fill="#4a3a2c"
      />
      {/* eyes */}
      <circle cx="84" cy="114" r="5" fill="#3a3357" />
      <circle cx="116" cy="114" r="5" fill="#3a3357" />
      {/* smile */}
      <path
        d="M84 132c6 8 26 8 32 0"
        fill="none"
        stroke="#a9603f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* cheeks */}
      <circle cx="72" cy="122" r="6" fill="#ff9cbb" opacity="0.5" />
      <circle cx="128" cy="122" r="6" fill="#ff9cbb" opacity="0.5" />
    </svg>
  );
}
