import type { LabelResponse } from '../contract/label';
import type { GalleryPageResponse, ItemResponse } from '../contract/media';
import type { MontageResponse, MontageTemplateResponse } from '../contract/montage';
import type { MovieResponse } from '../contract/movie';
import type { MemberResponse, ProjectCardResponse } from '../contract/project';
import type { SongResponse } from '../contract/song';
import type { AccountResponse, PublicUserResponse } from '../contract/user';

const asset = (name: string): string => `__MEDIA__/${name}`;
const withSuffix = (image: string, suffix: string): string =>
  image.replace(/\.jpg$/, `-${suffix}.jpg`);
const largeOf = (image: string): string => withSuffix(image, 'large');
const setPhotos = (prefix: string): string[] =>
  Array.from({ length: 20 }, (_, index) => asset(`${prefix}-${index + 1}.jpg`));

type LinkVariant = 'large' | 'detail' | 'original';
const linksByItem = new Map<string, Partial<Record<LinkVariant, string>>>();

export const linkFor = (itemId: string, variant: LinkVariant) => {
  const url = linksByItem.get(itemId)?.[variant];
  if (!url) return undefined;
  return {
    itemId,
    variant,
    url,
    expiresAt: new Date(Date.now() + 900_000).toISOString(),
  };
};

const WEDDING_PHOTOS = setPhotos('wedding');
const BIRTHDAY_PHOTOS = setPhotos('birthday');
const SEA_PHOTOS = setPhotos('sea');
const TRACK = asset('track.mp3');
export const mockTrackUrl = TRACK;

const WEDDING_CAPTIONS = [
  'The ceremony under the open sky',
  'The first dance',
  'Rings and flowers',
  'Family portrait',
  'Guests at the reception',
  'Candles and lights',
  'The bride getting ready',
  'A quiet moment before the vows',
  'Walking down the aisle',
  'The best man’s speech',
  'Dancing with friends',
  'Details of the table setting',
  'The wedding cake',
  'A toast to the newlyweds',
  'Golden hour outside',
  'Grandma’s embrace',
  'Confetti on the steps',
  'The bouquet toss',
  'A favorite song',
  'The last guests leaving',
];
const BIRTHDAY_CAPTIONS = [
  'Blowing out the candles',
  'The cake before the party',
  'Family around the table',
  'A surprise hug',
  'Balloons in the hallway',
  'The first slice',
  'Old photos on the wall',
  'A toast for mom',
  'Grandchildren nearby',
  'Wrapping the gifts',
  'A favorite dessert',
  'Late afternoon light',
  'Music in the living room',
  'A quiet conversation',
  'Candles and flowers',
  'The dining table',
  'A walk in the garden',
  'The birthday girl smiling',
  'Everyone together',
  'The evening ending',
];
const SEA_CAPTIONS = [
  'Sailing at sunset',
  'The beach in the morning',
  'Footprints in the sand',
  'A swim before lunch',
  'The boat on the horizon',
  'Sunset over the water',
  'A picnic by the shore',
  'Friends in the waves',
  'A quiet cove',
  'The harbor at night',
  'A long walk on the beach',
  'Seashells and stones',
  'A boat passing by',
  'Dinner by the water',
  'The last light',
  'Clouds over the sea',
  'A view from the cliff',
  'Evening on the deck',
  'A perfect summer day',
  'Saying goodbye to the sea',
];

let counter = 100;
const id = (): string => {
  counter += 1;
  return `00000000-0000-4000-8000-${String(counter).padStart(12, '0')}`;
};

export const MOCK_USER_ID = '11111111-1111-4111-8111-111111111111';
export const MOCK_PROJECT_ID = '22222222-2222-4222-8222-222222222222';

const consumables = (tokens: number, bytes: number) => ({
  tokens: { tokens, spend: 2 },
  storage: { bytes, spend: 0 },
});

const account = (
  id: string,
  username: string,
  name: string,
  email: string,
): AccountResponse => ({
  id,
  username,
  name,
  email,
  language: 'en',
  registered: true,
  profileMediaId: null,
  consumables: consumables(90, 100 * 1024 ** 3),
});

export const mockAccount = account(
  MOCK_USER_ID,
  'anna',
  'Anna Sokolova',
  'anna.sokolova@gmail.com',
);

export const mockUsers: AccountResponse[] = [
  mockAccount,
  account('55555555-5555-4555-8555-555555555555', 'mark', 'Mark Vetrov', 'mark.vetrov@gmail.com'),
  account('66666666-6666-4666-8666-666666666666', 'elena', 'Elena Kim', 'elena.kim@gmail.com'),
  account('77777777-7777-4777-8777-777777777777', 'ilia', 'Ilya Orlov', 'ilya.orlov@gmail.com'),
];

const alice: PublicUserResponse = {
  id: MOCK_USER_ID,
  username: 'anna',
  name: 'Anna Sokolova',
  profileMediaId: null,
};
const bob: PublicUserResponse = {
  id: '55555555-5555-4555-8555-555555555555',
  username: 'mark',
  name: 'Mark Vetrov',
  profileMediaId: null,
};
const carol: PublicUserResponse = {
  id: '66666666-6666-4666-8666-666666666666',
  username: 'elena',
  name: 'Elena Kim',
  profileMediaId: null,
};
const dave: PublicUserResponse = {
  id: '77777777-7777-4777-8777-777777777777',
  username: 'ilia',
  name: 'Ilya Orlov',
  profileMediaId: null,
};

const member = (
  user: PublicUserResponse,
  role: MemberResponse['role'],
  tokens: number,
  bytes: number,
): MemberResponse => ({
  userId: user.id,
  username: user.username,
  name: user.name,
  role,
  consumables: consumables(tokens, bytes),
  contribution: 'done',
  joinedAt: '2026-10-01T10:00:00.000Z',
  invitedBy: user.id === MOCK_USER_ID ? null : MOCK_USER_ID,
});

const label = (
  projectId: string,
  ownerId: string,
  name: string,
  color: `#${string}`,
): LabelResponse => ({
  id: id(),
  projectId,
  ownerId,
  name,
  color,
  itemsIds: [],
});

const item = (
  projectId: string,
  image: string,
  uploader: PublicUserResponse,
  options: {
    labelIds?: string[];
    description: string;
    analyzed?: boolean;
    daysAgo: number;
    withPlace?: boolean;
  },
): ItemResponse => {
  const itemId = id();
  const mediaId = id();
  const compressedId = id();
  const at = new Date(Date.now() - options.daysAgo * 86_400_000).toISOString();
  linksByItem.set(itemId, {
    original: image,
    large: withSuffix(image, 'large'),
    detail: withSuffix(image, 'detail'),
  });
  return {
    item: {
      id: itemId,
      projectId,
      uploadedBy: uploader.id,
      comment: options.description,
      labelIds: options.labelIds ?? [],
      analysis: options.analyzed
        ? { description: options.description, scoreImportance: 8.4, scoreQuality: 8.1 }
        : null,
      createdAt: at,
    },
    media: {
      id: mediaId,
      kind: 'photo',
      fingerprint: '',
      perceptualHash: '',
      format: 'jpeg',
      bytes: '287079',
      meta: {
        dimensions: { width: 1080, height: 1440 },
        duration: null,
        at,
        place: options.withPlace ? { latitude: 55.75, longitude: 37.61 } : null,
        camera: null,
      },
    },
    uploader,
    variants: {
      original: mediaId,
      compressed: compressedId,
      previews: { small: id(), middle: id(), large: id() },
    },
    links: {
      small: withSuffix(image, 'small'),
      middle: withSuffix(image, 'middle'),
    },
  };
};

const manifest = (shots: ItemResponse[], targetSeconds: number, prompt: string) => {
  const config = {
    targetSeconds,
    prompt,
    dimensions: { width: 1080, height: 1920 },
    musicIds: [] as string[],
    includeItemIds: shots.map((one) => one.item.id),
    requiredItemIds: [] as string[],
    templateId: null,
    name: null as string | null,
  };
  const report = {
    movie: {
      targetSeconds,
      dimensions: { width: 1080, height: 1920 },
      story: prompt,
      requiredItemIds: [] as string[],
    },
    shots: shots.map((one) => ({
      itemId: one.item.id,
      mediaId: one.item.originalId,
      kind: one.media.kind,
      capturedAt: one.media.meta.at,
      width: one.media.meta.dimensions?.width ?? null,
      height: one.media.meta.dimensions?.height ?? null,
      durationSeconds: one.media.meta.duration,
      hasAudio: false,
      shownWithCover: false,
      description: one.item.comment,
      labels: [],
      analysis: one.item.analysis,
    })),
    music: [],
  };
  const commands = shots.map((one) => ({
    type: 'shot',
    itemId: one.item.id,
    mediaId: one.item.originalId,
    kind: one.media.kind,
    sourceStartSeconds: 0,
    seconds: 2.5,
    liveLevel: 0,
    framing: null,
    motion: 'none',
    transitionSeconds: 0.25,
  }));
  return {
    preparationConfig: config,
    directingInput: { mergedMontageData: report },
    editingParams: { commands },
  };
};

const montage = (
  projectId: string,
  shots: ItemResponse[],
  targetSeconds: number,
  prompt: string,
): MontageResponse => ({
  id: id(),
  projectId,
  createdBy: MOCK_USER_ID,
  status: 'done',
  manifest: manifest(shots, targetSeconds, prompt),
  createdAt: '2026-10-22T10:00:00.000Z',
  error: null,
  journal: {
    directing: {
      text: `The movie is built from ${shots.length} shots, with a calm pace and space for every moment.`,
      usedItemIds: shots.map((one) => one.item.id),
    },
  },
});

const movie = (
  projectId: string,
  montageResponse: MontageResponse,
  name: string,
  poster: string,
  createdAt: string,
): MovieResponse => ({
  id: id(),
  name,
  projectId,
  createdBy: MOCK_USER_ID,
  createdAt,
  montageId: montageResponse.id,
  originalId: id(),
  compressedId: null,
  previewId: null,
  video: {
    durationSeconds: 42.5,
    bytes: 6_434_374,
    width: 1080,
    height: 1920,
    format: 'mp4',
  },
  montage: montageResponse,
  video_url: asset('sea.mp4'),
  poster_url: poster,
  preview_url: asset('sea.mp4'),
});

type Bundle = {
  project: ProjectCardResponse;
  members: MemberResponse[];
  labels: LabelResponse[];
  gallery: GalleryPageResponse;
  montages: MontageResponse[];
  movies: MovieResponse[];
};

const bundle = (
  project: ProjectCardResponse,
  members: MemberResponse[],
  labels: LabelResponse[],
  items: ItemResponse[],
  montages: MontageResponse[],
  movies: MovieResponse[],
): Bundle => ({
  project,
  members,
  labels,
  gallery: { items, nextCursor: null },
  montages,
  movies,
});

const makeItems = (
  projectId: string,
  photos: string[],
  captions: string[],
  uploaders: PublicUserResponse[],
  labelIds: string[],
): ItemResponse[] =>
  photos.map((photo, index) =>
    item(projectId, photo, uploaders[index % uploaders.length] ?? alice, {
      labelIds: index % 3 === 0 ? [labelIds[0] ?? ''] : index % 3 === 1 ? [labelIds[1] ?? ''] : [labelIds[2] ?? ''],
      description: captions[index] ?? `Moment ${index + 1}`,
      analyzed: true,
      daysAgo: 20 + index,
      withPlace: index % 5 === 0,
    }),
  );

const weddingId = MOCK_PROJECT_ID;
const weddingLabels = [
  label(weddingId, alice.id, 'Cover', '#e8b04b'),
  label(weddingId, alice.id, 'Favourites', '#ec4899'),
  label(weddingId, bob.id, 'Guests', '#4f46e5'),
];
const weddingItems = makeItems(
  weddingId,
  WEDDING_PHOTOS,
  WEDDING_CAPTIONS,
  [alice, bob, carol, dave],
  weddingLabels.map((one) => one.id),
);
const weddingMontage = montage(weddingId, weddingItems.slice(0, 12), 45, 'A warm film about the wedding day');
const weddingMovie = movie(
  weddingId,
  weddingMontage,
  "Anna & Mark's Wedding",
  WEDDING_PHOTOS[0] ?? WEDDING_PHOTOS[1] ?? '',
  '2026-11-02T20:05:00.000Z',
);
const weddingProject: ProjectCardResponse = {
  id: weddingId,
  title: "Anna & Mark's Wedding",
  eventStart: '2026-10-31T15:00:00.000Z',
  eventEnd: '2026-11-01T02:00:00.000Z',
  consumables: consumables(80, 8 * 1024 ** 3),
  itemCount: weddingItems.length,
  memberCount: 3,
  sharedCount: 2,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: WEDDING_PHOTOS.slice(0, 1).map(largeOf),
};

const birthdayId = '22222222-2222-4222-8222-222222222223';
const birthdayLabels = [
  label(birthdayId, alice.id, 'Cover', '#f59e0b'),
  label(birthdayId, alice.id, 'Family', '#ec4899'),
  label(birthdayId, carol.id, 'Details', '#22c55e'),
];
const birthdayItems = makeItems(
  birthdayId,
  BIRTHDAY_PHOTOS,
  BIRTHDAY_CAPTIONS,
  [alice, carol, bob, dave],
  birthdayLabels.map((one) => one.id),
);
const birthdayMontage = montage(birthdayId, birthdayItems.slice(0, 12), 40, 'A family film about mom’s birthday');
const birthdayMovie = movie(
  birthdayId,
  birthdayMontage,
  "Mom's 60th Birthday",
  BIRTHDAY_PHOTOS[0] ?? BIRTHDAY_PHOTOS[1] ?? '',
  '2026-11-16T19:30:00.000Z',
);
const birthdayProject: ProjectCardResponse = {
  id: birthdayId,
  title: "Mom's 60th Birthday",
  eventStart: '2026-11-15T17:00:00.000Z',
  eventEnd: '2026-11-15T23:00:00.000Z',
  consumables: consumables(70, 6 * 1024 ** 3),
  itemCount: birthdayItems.length,
  memberCount: 4,
  sharedCount: 3,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: BIRTHDAY_PHOTOS.slice(0, 1).map(largeOf),
};

const seaId = '22222222-2222-4222-8222-222222222224';
const seaLabels = [
  label(seaId, alice.id, 'Cover', '#38bdf8'),
  label(seaId, bob.id, 'Sunsets', '#f97316'),
  label(seaId, dave.id, 'Friends', '#a855f7'),
];
const seaItems = makeItems(
  seaId,
  SEA_PHOTOS,
  SEA_CAPTIONS,
  [alice, bob, carol, dave],
  seaLabels.map((one) => one.id),
);
const seaMontage = montage(seaId, seaItems.slice(0, 12), 45, 'A calm film about a summer by the sea');
const seaMovie = movie(
  seaId,
  seaMontage,
  'Summer by the Sea',
  SEA_PHOTOS[0] ?? SEA_PHOTOS[1] ?? '',
  '2026-08-18T21:00:00.000Z',
);
const seaProject: ProjectCardResponse = {
  id: seaId,
  title: 'Summer by the Sea',
  eventStart: '2026-08-14T10:00:00.000Z',
  eventEnd: '2026-08-17T20:00:00.000Z',
  consumables: consumables(75, 7 * 1024 ** 3),
  itemCount: seaItems.length,
  memberCount: 4,
  sharedCount: 3,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: SEA_PHOTOS.slice(0, 1).map(largeOf),
};

export const mockProjects: ProjectCardResponse[] = [weddingProject, birthdayProject, seaProject];

export const mockBundles: Record<string, Bundle> = {
  [weddingId]: bundle(
    weddingProject,
    [
      member(alice, 'admin', 40, 4 * 1024 ** 3),
      member(bob, 'contributor', 25, 3 * 1024 ** 3),
      member(carol, 'contributor', 15, 2 * 1024 ** 3),
    ],
    weddingLabels,
    weddingItems,
    [weddingMontage],
    [weddingMovie],
  ),
  [birthdayId]: bundle(
    birthdayProject,
    [
      member(alice, 'admin', 35, 3 * 1024 ** 3),
      member(carol, 'contributor', 20, 2 * 1024 ** 3),
      member(bob, 'contributor', 15, 1024 ** 3),
      member(dave, 'contributor', 10, 1024 ** 3),
    ],
    birthdayLabels,
    birthdayItems,
    [birthdayMontage],
    [birthdayMovie],
  ),
  [seaId]: bundle(
    seaProject,
    [
      member(alice, 'admin', 30, 3 * 1024 ** 3),
      member(bob, 'contributor', 25, 2 * 1024 ** 3),
      member(carol, 'contributor', 15, 2 * 1024 ** 3),
      member(dave, 'contributor', 10, 1024 ** 3),
    ],
    seaLabels,
    seaItems,
    [seaMontage],
    [seaMovie],
  ),
};

const template = (
  id: string,
  name: string,
  description: string,
  targetSeconds: number,
  prompt: string,
  cover: string,
  width: number,
  height: number,
): MontageTemplateResponse => ({
  id,
  about: { ru: { name, description }, en: { name, description } },
  settings: { targetSeconds, prompt, dimensions: { width, height }, musicIds: [] },
  coverId: null,
  coverUrl: cover,
  referenceMediaId: null,
});

export const mockTemplates: MontageTemplateResponse[] = [
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb01', 'Quick clip', 'A short, dynamic clip about the brightest moment of the event.', 15, 'A short dynamic clip about the brightest moment.', WEDDING_PHOTOS[1] ?? WEDDING_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb02', 'Film', 'A warm film with a story, an unhurried pace and captions.', 60, 'A warm film with a story and captions.', BIRTHDAY_PHOTOS[1] ?? BIRTHDAY_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb03', 'Report', 'A report on how the day went, from start to finish.', 45, 'A report about the day, from start to finish.', SEA_PHOTOS[2] ?? SEA_PHOTOS[0] ?? '', 1920, 1080),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb04', 'For parents', 'A gentle family film about the people close to you.', 30, 'A gentle family film about loved ones.', BIRTHDAY_PHOTOS[3] ?? BIRTHDAY_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb05', 'Story', 'A first-person story of how the evening went.', 45, 'A first-person story of the evening.', WEDDING_PHOTOS[4] ?? WEDDING_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb06', 'Atmosphere', 'Slow shots and details, with no rush.', 20, 'Slow shots and small details.', SEA_PHOTOS[5] ?? SEA_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb07', 'Trailer', 'A short trailer that builds to a climax at the end.', 30, 'A short trailer with a strong finale.', WEDDING_PHOTOS[7] ?? WEDDING_PHOTOS[0] ?? '', 1080, 1920),
  template('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb08', 'Chronicle', 'A calm chronicle of the event in order.', 75, 'A calm chronicle of the event in order.', SEA_PHOTOS[8] ?? SEA_PHOTOS[0] ?? '', 1920, 1080),
];

export const mockSongs: SongResponse[] = [
  {
    id: '14141414-1414-4414-8414-141414141414',
    name: 'Quiet Evening',
    author: 'Mark Vetrov',
    originalId: '12121212-1212-4212-8212-121212121212',
    compressedId: null,
    coverId: null,
    previewCoverId: null,
    coverUrl: WEDDING_PHOTOS[0] ?? WEDDING_PHOTOS[1] ?? '',
    previewCoverUrl: WEDDING_PHOTOS[0] ?? WEDDING_PHOTOS[1] ?? '',
    duration: 30,
    uploadedBy: null,
  },
  {
    id: '15151515-1515-4515-8515-151515151515',
    name: 'Summer Light',
    author: 'Ilya Orlov',
    originalId: '16161616-1616-4616-8616-161616161616',
    compressedId: null,
    coverId: null,
    previewCoverId: null,
    coverUrl: SEA_PHOTOS[0] ?? SEA_PHOTOS[1] ?? '',
    previewCoverUrl: SEA_PHOTOS[0] ?? SEA_PHOTOS[1] ?? '',
    duration: 24,
    uploadedBy: null,
  },
];

export function createMockMontage(
  projectId: string,
  config: {
    targetSeconds: number;
    prompt: string | null;
    dimensions: { width: number; height: number };
    musicIds: string[];
    includeItemIds: string[];
  },
  name: string | null,
): MontageResponse | undefined {
  const found = mockBundles[projectId];
  if (!found) return undefined;
  const chosen = config.includeItemIds.flatMap((itemId) =>
    found.gallery.items.filter((one) => one.item.id === itemId).slice(0, 1),
  );
  if (chosen.length === 0) return undefined;
  const made = montage(projectId, chosen, config.targetSeconds, config.prompt ?? found.project.title);
  const settings = made.manifest.preparationConfig;
  if (settings) {
    settings.dimensions = config.dimensions;
    settings.musicIds = config.musicIds;
    settings.name = name;
  }
  const film = movie(
    projectId,
    made,
    name || found.project.title,
    chosen[0]?.links.middle ?? '',
    new Date().toISOString(),
  );
  found.montages.unshift(made);
  found.movies.unshift(film);
  return made;
}
