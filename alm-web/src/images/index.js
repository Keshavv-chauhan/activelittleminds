/*
 * Every image the site ships. Files are produced from image-sources/ by
 * scripts/tools/optimize-images.mjs (responsive WebP, exact 4:5 hero crop,
 * self-hosted video posters). Never import a raw original from here.
 */
import dims from './dimensions.json';

import logo132 from './logo-132.webp';

import playground640 from './playground-640.webp';
import playground1280 from './playground-1280.webp';
import playgroundHero480 from './playground-hero-480.webp';
import playgroundHero768 from './playground-hero-768.webp';
import playgroundHero960 from './playground-hero-960.webp';
import circleTime640 from './circle-time-640.webp';
import circleTime1280 from './circle-time-1280.webp';
import speechSession640 from './speech-session-640.webp';
import speechSession1280 from './speech-session-1280.webp';
import tabletopSession640 from './tabletop-session-640.webp';
import tabletopSession1280 from './tabletop-session-1280.webp';
import movementGroup640 from './movement-group-640.webp';
import movementGroup1280 from './movement-group-1280.webp';
import jumping640 from './jumping-640.webp';
import jumping1280 from './jumping-1280.webp';
import numbersLesson640 from './numbers-lesson-640.webp';
import numbersLesson1280 from './numbers-lesson-1280.webp';

import videoQz4QT4EO3Dk from './video-Qz4QT4EO3Dk.webp';
import videoSWv1fjtIrtw from './video-sWv1fjtIrtw.webp';
import videoQ8HAZaMOwJY from './video-q8HAZaMOwJY.webp';
import videoUji59RdVH0 from './video-2uji59RdVH0.webp';
import videoTg0pb3VRbiU from './video-Tg0pb3VRbiU.webp';

const size = (name) => {
  const d = dims[name];
  if (!d) throw new Error(`images/dimensions.json has no entry for "${name}"`);
  return { width: d[0], height: d[1] };
};

/** A landscape photo offered at 640w and 1280w. `full` is the lightbox size. */
const photo = (name, small, large, alt) => ({
  src: small,
  srcSet: `${small} 640w, ${large} 1280w`,
  full: large,
  ...size(`${name}-1280`),
  alt,
});

export const brand = {
  logo: {
    src: logo132,
    ...size('logo-132'),
    alt: 'Active Little Minds logo: a purple tree with two children beneath it',
  },
};

export const photos = {
  // The hero is a pre-cropped 4:5 portrait of playground.webp.
  playgroundHero: {
    src: playgroundHero480,
    srcSet: `${playgroundHero480} 480w, ${playgroundHero768} 768w, ${playgroundHero960} 960w`,
    full: playground1280,
    ...size('playground-hero-960'),
    alt: 'A girl hanging upside down and grinning on playground climbing bars, with other children playing behind her.',
  },
  playground: photo(
    'playground',
    playground640,
    playground1280,
    'A girl hanging upside down and grinning on playground climbing bars, with other children playing behind her.'
  ),
  circleTime: photo(
    'circle-time',
    circleTime640,
    circleTime1280,
    'A therapist sitting on the floor leading a circle of children through a hand-action game.'
  ),
  speechSession: photo(
    'speech-session',
    speechSession640,
    speechSession1280,
    'A speech therapist and a boy facing each other at a table, copying a mouth shape together.'
  ),
  tabletopSession: photo(
    'tabletop-session',
    tabletopSession640,
    tabletopSession1280,
    'A therapist and a boy at a table covered in coloured letter tiles during a language session.'
  ),
  movementGroup: photo(
    'movement-group',
    movementGroup640,
    movementGroup1280,
    'Children sitting on beanbags on a rainbow mat, copying a therapist’s arm movements.'
  ),
  jumping: photo(
    'jumping',
    jumping640,
    jumping1280,
    'Toddlers jumping with their arms in the air as bubbles float around a bright playroom.'
  ),
  numbersLesson: photo(
    'numbers-lesson',
    numbersLesson640,
    numbersLesson1280,
    'A teacher holding up a number card while a young girl in a yellow dress counts on her fingers, with number and alphabet posters on the wall behind them.'
  ),
};

/** Photo used at the top of each therapy page, keyed by service slug. */
export const servicePhoto = {
  'speech-therapy': photos.speechSession,
  'occupational-therapy': photos.tabletopSession,
  'early-intervention': photos.jumping,
  physiotherapy: photos.movementGroup,
  'special-education': photos.numbersLesson,
  'craniosacral-oral-placement': photos.speechSession,
  'group-therapy': photos.circleTime,
};

/** Self-hosted 9:16 posters for the video row, keyed by YouTube id. */
const poster = (name, src) => ({ src, ...size(name) });
export const videoPoster = {
  Qz4QT4EO3Dk: poster('video-Qz4QT4EO3Dk', videoQz4QT4EO3Dk),
  sWv1fjtIrtw: poster('video-sWv1fjtIrtw', videoSWv1fjtIrtw),
  q8HAZaMOwJY: poster('video-q8HAZaMOwJY', videoQ8HAZaMOwJY),
  '2uji59RdVH0': poster('video-2uji59RdVH0', videoUji59RdVH0),
  Tg0pb3VRbiU: poster('video-Tg0pb3VRbiU', videoTg0pb3VRbiU),
};

/**
 * `sizes` hints for the images that sit at the top of a page. The components
 * and the build's <link rel="preload"> both read these, so they always match.
 */
export const sizes = {
  hero: '(max-width: 900px) 100vw, 480px',
  header: '(max-width: 900px) 100vw, 380px',
};
