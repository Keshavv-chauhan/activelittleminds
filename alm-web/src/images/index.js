import logo from './logo.webp';
import playground from './playground.webp';
import circleTime from './circle-time.webp';
import speechSession from './speech-session.webp';
import tabletopSession from './tabletop-session.webp';
import movementGroup from './movement-group.webp';
import jumping from './jumping.webp';

// NOTE: `unplaced-pexels.avif` is in this folder but is not used yet — it is a
// 6000x4000 original and needs resizing before it goes on a page.

export const brand = { logo };

export const photos = {
  playground: {
    src: playground,
    alt: 'A girl hanging upside down and grinning on playground climbing bars, with other children playing behind her.',
  },
  circleTime: {
    src: circleTime,
    alt: 'A therapist sitting on the floor leading a circle of children through a hand-action game.',
  },
  speechSession: {
    src: speechSession,
    alt: 'A speech therapist and a boy facing each other at a table, copying a mouth shape together.',
  },
  tabletopSession: {
    src: tabletopSession,
    alt: 'A therapist and a boy at a table covered in coloured letter tiles during a language session.',
  },
  movementGroup: {
    src: movementGroup,
    alt: 'Children sitting on beanbags on a rainbow mat, copying a therapist’s arm movements.',
  },
  jumping: {
    src: jumping,
    alt: 'Toddlers jumping with their arms in the air as bubbles float around a bright playroom.',
  },
};

/** Photo used at the top of each therapy page, keyed by service slug. */
export const servicePhoto = {
  'speech-and-language-therapy': photos.speechSession,
  'occupational-therapy-and-sensory-integration': photos.tabletopSession,
  'neurodevelopment-therapy-and-early-intervention': photos.jumping,
  'pediatric-physiotherapy-and-sports-therapy': photos.movementGroup,
  'special-education-and-remedial-classes': photos.tabletopSession,
  'craniosacral-and-oral-placement-therapy': photos.speechSession,
  'group-and-social-therapy': photos.circleTime,
};
