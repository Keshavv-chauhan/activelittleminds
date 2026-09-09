import React from 'react';

// Chunky, hand-drawn-feeling glyphs. Deliberately not a stock icon set and
// deliberately not emoji, which is what the old site used.
const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const Speech = (p) => (
  <svg {...base} {...p}>
    <path d="M8 12h32v20H22l-9 8v-8H8z" />
    <path d="M17 20h6M17 26h14" />
  </svg>
);

const Hand = (p) => (
  <svg {...base} {...p}>
    <path d="M17 26V10a3 3 0 0 1 6 0v12" />
    <path d="M23 21V8a3 3 0 0 1 6 0v14" />
    <path d="M29 22V13a3 3 0 0 1 6 0v17a11 11 0 0 1-11 11h-2a10 10 0 0 1-9-6l-4-9a3 3 0 0 1 5-3l3 4" />
  </svg>
);

// Rising milestones rather than an abstract spark — it has to read at 48px.
const Spark = (p) => (
  <svg {...base} {...p}>
    <path d="M7 41h34" />
    <path d="M14 41V29" />
    <path d="M24 41V22" />
    <path d="M34 41V15" />
    <path d="M34 5v6M31 8h6" />
  </svg>
);

const Move = (p) => (
  <svg {...base} {...p}>
    <circle cx="28" cy="10" r="4" />
    <path d="M26 20l-8 6 5 7-4 10" />
    <path d="M26 20l6 4 3 8" />
    <path d="M26 20l-9 2" />
  </svg>
);

const Book = (p) => (
  <svg {...base} {...p}>
    <path d="M24 14C20 10 14 9 8 10v25c6-1 12 0 16 4 4-4 10-5 16-4V10c-6-1-12 0-16 4z" />
    <path d="M24 14v25" />
  </svg>
);

const Calm = (p) => (
  <svg {...base} {...p}>
    <path d="M8 30c5-6 11-6 16 0s11 6 16 0" />
    <path d="M8 18c5-6 11-6 16 0s11 6 16 0" />
  </svg>
);

const Group = (p) => (
  <svg {...base} {...p}>
    <circle cx="16" cy="17" r="5" />
    <circle cx="32" cy="17" r="5" />
    <path d="M7 38a9 9 0 0 1 18 0" />
    <path d="M23 38a9 9 0 0 1 18 0" />
  </svg>
);

/** Keyed by service slug so content.js stays free of presentation. */
export const serviceIcon = {
  'speech-and-language-therapy': Speech,
  'occupational-therapy-and-sensory-integration': Hand,
  'neurodevelopment-therapy-and-early-intervention': Spark,
  'pediatric-physiotherapy-and-sports-therapy': Move,
  'special-education-and-remedial-classes': Book,
  'craniosacral-and-oral-placement-therapy': Calm,
  'group-and-social-therapy': Group,
};

// --- Icons for the "what working with us is like" cards ---
const Roof = (p) => (
  <svg {...base} {...p}>
    <path d="M6 24 24 9l18 15" />
    <path d="M11 22v17h26V22" />
    <path d="M20 39V29h8v10" />
  </svg>
);

const Plan = (p) => (
  <svg {...base} {...p}>
    <path d="M11 8h26v32H11z" />
    <path d="M18 18h12M18 26h12M18 34h7" />
  </svg>
);

const Parents = (p) => (
  <svg {...base} {...p}>
    <circle cx="18" cy="16" r="6" />
    <circle cx="35" cy="22" r="4.5" />
    <path d="M8 40a10 10 0 0 1 20 0" />
    <path d="M30 40a7 7 0 0 1 12 0" />
  </svg>
);

const Chart = (p) => (
  <svg {...base} {...p}>
    <path d="M9 39h30" />
    <path d="M13 39V27M23 39V17M33 39V23" />
  </svg>
);

const Heart = (p) => (
  <svg {...base} {...p}>
    <path d="M24 40S9 31 9 20a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 11-15 20-15 20z" />
  </svg>
);

/** Keyed by the `title` of each entry in `whyUs`. */
export const reasonIcon = {
  'Every therapy under one roof': Roof,
  'A plan built for your child': Plan,
  'Parents are shown the work': Parents,
  'Progress you can see': Chart,
  'A place children want to return to': Heart,
};
