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

type LinkVariant = 'large' | 'detail' | 'playback' | 'original';
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

const PARTY = asset('party.jpg');
const WEDDING = asset('wedding.jpg');
const DANCE = asset('dance.jpg');
const BIRTHDAY = asset('birthday.jpg');
const PICNIC = asset('picnic.jpg');
const SEA = asset('sea.jpg');
const FRIENDS = asset('friends.jpg');
const CITY = asset('city.jpg');
const VIDEO = asset('sea.mp4');
const TRACK = asset('track.mp3');
export const mockTrackUrl = TRACK;

const PHOTOS = [PARTY, WEDDING, DANCE, BIRTHDAY, PICNIC, SEA, FRIENDS, CITY];

const WEDDING_CAPTIONS = [
  'Клятва под открытым небом',
  'Первый танец',
  'Букет и кольца',
  'Гости за столом',
  'Свечи и гирлянды',
  'Море на закате',
];
const PARTY_CAPTIONS = [
  'Ужин на террасе',
  'Смех и разговоры',
  'Торт со свечами',
  'Гирлянда над столом',
  'Музыка и танцы',
  'Бокалы за вечер',
  'Ночной город',
  'Друзья у камина',
  'Финальный кадр',
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
  language: AccountResponse['language'],
): AccountResponse => ({
  id,
  username,
  name,
  email,
  language,
  registered: true,
  profileMediaId: null,
  consumables: consumables(90, 100 * 1024 ** 3),
});

export const mockAccount = account(
  MOCK_USER_ID,
  'anna',
  'Анна Соколова',
  'anna.sokolova@gmail.com',
  'ru',
);

export const mockUsers: AccountResponse[] = [
  mockAccount,
  account('55555555-5555-4555-8555-555555555555', 'mark', 'Марк Ветров', 'mark.vetrov@gmail.com', 'ru'),
  account('66666666-6666-4666-8666-666666666666', 'elena', 'Елена Ким', 'elena.kim@gmail.com', 'ru'),
  account('77777777-7777-4777-8777-777777777777', 'ilia', 'Илья Орлов', 'ilya.orlov@gmail.com', 'en'),
];

const alice: PublicUserResponse = {
  id: MOCK_USER_ID,
  username: 'anna',
  name: 'Анна Соколова',
  profileMediaId: null,
};
const bob: PublicUserResponse = {
  id: '55555555-5555-4555-8555-555555555555',
  username: 'mark',
  name: 'Марк Ветров',
  profileMediaId: null,
};
const carol: PublicUserResponse = {
  id: '66666666-6666-4666-8666-666666666666',
  username: 'elena',
  name: 'Елена Ким',
  profileMediaId: null,
};
const dave: PublicUserResponse = {
  id: '77777777-7777-4777-8777-777777777777',
  username: 'ilia',
  name: 'Илья Орлов',
  profileMediaId: null,
};

const member = (
  user: PublicUserResponse,
  role: MemberResponse['role'],
  contribution: MemberResponse['contribution'],
  tokens: number,
  bytes: number,
): MemberResponse => ({
  userId: user.id,
  username: user.username,
  name: user.name,
  role,
  consumables: consumables(tokens, bytes),
  contribution,
  joinedAt: '2026-10-01T10:00:00.000Z',
  invitedBy: user.id === MOCK_USER_ID ? null : MOCK_USER_ID,
});

const label = (
  projectId: string,
  ownerId: string,
  name: string,
  color: `#${string}`,
  itemsIds: string[] = [],
): LabelResponse => ({
  id: id(),
  projectId,
  ownerId,
  name,
  color,
  itemsIds,
});

type Kind = 'photo' | 'video' | 'audio';

const item = (
  projectId: string,
  kind: Kind,
  image: string,
  uploader: PublicUserResponse,
  options: {
    labelIds?: string[];
    description?: string;
    analyzed?: boolean;
    daysAgo?: number;
    withPlace?: boolean;
    previewReady?: boolean;
  } = {},
): ItemResponse => {
  const itemId = id();
  const mediaId = id();
  const compressedId = id();
  const previewReady = options.previewReady !== false && kind !== 'audio';
  const previews = previewReady
    ? { small: id(), middle: id(), large: id() }
    : {};
  const originalUrl =
    kind === 'video'
      ? image.replace(/\.jpg$/, '-original.mp4')
      : kind === 'audio'
        ? TRACK
        : image;
  const compressedUrl =
    kind === 'video'
      ? image.replace(/\.jpg$/, '.mp4')
      : kind === 'audio'
        ? TRACK
        : withSuffix(image, 'detail');
  linksByItem.set(itemId, {
    original: originalUrl,
    large: previewReady ? withSuffix(image, 'large') : undefined,
    detail: kind === 'photo' ? compressedUrl : undefined,
    playback: kind === 'photo' ? undefined : compressedUrl,
  });
  const at = new Date(Date.now() - (options.daysAgo ?? 5) * 86_400_000).toISOString();
  const comment =
    options.description ??
    (kind === 'video'
      ? 'Короткое видео с события'
      : kind === 'audio'
        ? 'Музыка из того вечера'
        : 'Любимый кадр');
  return {
    item: {
      id: itemId,
      projectId,
      uploadedBy: uploader.id,
      comment,
      labelIds: options.labelIds ?? [],
      analysis:
        options.analyzed && kind === 'photo'
          ? { description: 'Тёплый момент', scoreImportance: 8.0, scoreQuality: 7.0 }
          : null,
      createdAt: at,
    },
    media: {
      id: mediaId,
      kind,
      fingerprint: '',
      perceptualHash: '',
      format: kind === 'photo' ? 'jpeg' : kind === 'video' ? 'mp4' : 'm4a',
      bytes: kind === 'photo' ? '287079' : kind === 'video' ? '101349' : '98823',
      meta: {
        dimensions:
          kind === 'photo'
            ? { width: 1080, height: 1440 }
            : kind === 'video'
              ? { width: 720, height: 960 }
              : null,
        duration: kind === 'photo' ? null : kind === 'video' ? 5 : 8,
        at,
        place: options.withPlace ? { latitude: 55.75, longitude: 37.61 } : null,
        camera: null,
      },
    },
    uploader,
    variants: {
      original: mediaId,
      compressed: compressedId,
      previews,
    },
    links: {
      small: previews.small ? withSuffix(image, 'small') : null,
      middle: previews.middle ? withSuffix(image, 'middle') : null,
    },
  };
};

type Stage = 'analysis' | 'preparation' | 'directing' | 'editing' | 'done' | 'failed';

const manifest = (
  shots: ItemResponse[],
  targetSeconds: number,
  prompt: string | null,
  stage: Stage,
) => {
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
      requiredItemIds: [],
    },
    shots: shots.map((one) => ({
      itemId: one.item.id,
      mediaId: one.item.originalId,
      kind: one.media.kind,
      capturedAt: one.media.meta.at,
      width: one.media.meta.dimensions?.width ?? null,
      height: one.media.meta.dimensions?.height ?? null,
      durationSeconds: one.media.meta.duration,
      hasAudio: one.media.kind !== 'photo',
      shownWithCover: one.media.kind === 'audio',
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
  const planned = stage !== 'analysis' && stage !== 'preparation' && stage !== 'directing';
  return {
    preparationConfig: config,
    directingInput:
      stage === 'analysis' || stage === 'preparation' ? null : { mergedMontageData: report },
    editingParams: planned ? { commands } : null,
  };
};

const montage = (
  projectId: string,
  shots: ItemResponse[],
  stage: Stage,
  targetSeconds: number,
  prompt: string | null,
): MontageResponse => ({
  id: id(),
  projectId,
  createdBy: MOCK_USER_ID,
  status:
    stage === 'analysis'
      ? 'queued'
      : stage === 'done'
        ? 'done'
        : stage === 'failed'
          ? 'failed'
          : 'processing',
  manifest: manifest(shots, targetSeconds, prompt, stage),
  createdAt: '2026-10-22T10:00:00.000Z',
  error: stage === 'failed' ? 'The model could not agree on a plan for these shots.' : null,
  journal: {
    directing:
      stage === 'analysis' || stage === 'preparation' || stage === 'directing'
        ? null
        : {
            text: `The movie is built from ${shots.length} shots, with a calm pace and space for every moment.`,
            usedItemIds: shots.map((one) => one.item.id),
          },
  },
});

const movie = (
  projectId: string,
  montageResponse: MontageResponse,
  name: string,
  poster: string | null,
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
    durationSeconds: 12.05,
    bytes: 1634374,
    width: 1080,
    height: 1920,
    format: 'mp4',
  },
  montage: montageResponse,
  video_url: VIDEO,
  poster_url: poster,
  preview_url: VIDEO,
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

const weddingId = MOCK_PROJECT_ID;
const cover = label(weddingId, alice.id, 'Обложка', '#e8b04b', []);
const favourite = label(weddingId, alice.id, 'Любимое', '#ec4899', []);
const guests = label(weddingId, alice.id, 'Гости', '#4f46e5', []);
const details = label(weddingId, bob.id, 'Детали', '#14b8a6', []);
const weddingItems = [
  item(weddingId, 'photo', PARTY, alice, {
    labelIds: [cover.id, favourite.id, details.id],
    analyzed: true,
    withPlace: true,
    description: WEDDING_CAPTIONS[0],
    daysAgo: 37,
  }),
  item(weddingId, 'photo', WEDDING, bob, {
    labelIds: [cover.id, guests.id],
    analyzed: true,
    description: WEDDING_CAPTIONS[1],
    daysAgo: 37,
  }),
  item(weddingId, 'photo', DANCE, carol, {
    labelIds: [favourite.id, guests.id],
    analyzed: true,
    description: WEDDING_CAPTIONS[2],
    daysAgo: 36,
  }),
  item(weddingId, 'photo', BIRTHDAY, alice, {
    labelIds: [details.id],
    analyzed: true,
    withPlace: true,
    description: WEDDING_CAPTIONS[3],
    daysAgo: 36,
  }),
  item(weddingId, 'video', SEA, bob, {
    labelIds: [guests.id],
    description: WEDDING_CAPTIONS[4],
    daysAgo: 35,
  }),
  item(weddingId, 'audio', DANCE, alice, {
    description: WEDDING_CAPTIONS[5],
    daysAgo: 35,
  }),
];
const weddingMontage = montage(
  weddingId,
  weddingItems,
  'done',
  30,
  'Тёплый фильм о первом танце и гостях',
);
const TRACK_MEDIA = '12121212-1212-4212-8212-121212121212';
const weddingConfig = weddingMontage.manifest.preparationConfig;
if (weddingConfig) weddingConfig.musicIds = [TRACK_MEDIA];
const weddingReport = weddingMontage.manifest.directingInput?.mergedMontageData as
  | { music?: unknown[] }
  | undefined;
if (weddingReport) {
  weddingReport.music = [
    {
      songId: '13131313-1313-4313-8313-131313131313',
      mediaId: TRACK_MEDIA,
      name: 'Тихий вечер',
      author: 'Марк Ветров',
      durationSeconds: 30,
      analysis: null,
    },
  ];
}
const weddingMovie = movie(
  weddingId,
  weddingMontage,
  'Свадьба Анны и Марка',
  SEA,
  '2026-10-22T10:05:00.000Z',
);

const birthdayId = '22222222-2222-4222-8222-222222222223';
const birthdayCover = label(birthdayId, alice.id, 'Обложка', '#f59e0b', []);
const birthdayFamily = label(birthdayId, alice.id, 'Семья', '#ec4899', []);
const birthdayDetails = label(birthdayId, carol.id, 'Детали', '#22c55e', []);
const birthdayItems = [
  item(birthdayId, 'photo', BIRTHDAY, alice, {
    labelIds: [birthdayCover.id, birthdayFamily.id],
    analyzed: true,
    description: 'Мама задувает свечи',
    daysAgo: 12,
    withPlace: true,
  }),
  item(birthdayId, 'photo', FRIENDS, carol, {
    labelIds: [birthdayFamily.id],
    analyzed: true,
    description: 'Все собрались за столом',
    daysAgo: 12,
  }),
  item(birthdayId, 'photo', PARTY, bob, {
    labelIds: [birthdayDetails.id],
    analyzed: true,
    description: 'Праздничный свет и украшения',
    daysAgo: 11,
  }),
  item(birthdayId, 'photo', CITY, dave, {
    labelIds: [birthdayDetails.id],
    description: 'Гуляли до позднего вечера',
    daysAgo: 11,
  }),
  item(birthdayId, 'video', SEA, alice, {
    labelIds: [birthdayFamily.id],
    description: 'Короткое видео для мамы',
    daysAgo: 10,
  }),
];
const birthdayMontage = montage(
  birthdayId,
  birthdayItems,
  'done',
  25,
  'Тёплый фильм про семейный праздник',
);
const birthdayMovie = movie(
  birthdayId,
  birthdayMontage,
  'День рождения мамы',
  BIRTHDAY,
  '2026-11-15T19:30:00.000Z',
);
const birthdayProject: ProjectCardResponse = {
  id: birthdayId,
  title: 'День рождения мамы',
  eventStart: '2026-11-14T17:00:00.000Z',
  eventEnd: '2026-11-14T23:00:00.000Z',
  consumables: consumables(35, 3 * 1024 ** 3),
  itemCount: birthdayItems.length,
  memberCount: 4,
  sharedCount: 3,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: [BIRTHDAY].map(largeOf),
};

const partyId = '22222222-2222-4222-8222-222222222224';
const partyCover = label(partyId, alice.id, 'Обложка', '#84cc16', []);
const partyFavourites = label(partyId, bob.id, 'Лучшие кадры', '#f97316', []);
const partyDetails = label(partyId, carol.id, 'Детали', '#6366f1', []);
const partyItems = Array.from({ length: 9 }, (_, index) =>
  item(partyId, 'photo', PHOTOS[index % PHOTOS.length] ?? PARTY, index % 2 === 0 ? alice : bob, {
    labelIds: index < 3 ? [partyCover.id] : index < 6 ? [partyFavourites.id] : [partyDetails.id],
    analyzed: true,
    description: PARTY_CAPTIONS[index % PARTY_CAPTIONS.length] ?? 'Гости и веселье',
    daysAgo: 20 + index,
    previewReady: true,
  }),
);
const partyDone = montage(partyId, partyItems.slice(0, 6), 'done', 30, 'Вечер в новом доме');
const partyMovie = movie(
  partyId,
  partyDone,
  'Новоселье',
  PARTY,
  '2026-10-18T21:10:00.000Z',
);
const partyProject: ProjectCardResponse = {
  id: partyId,
  title: 'Новоселье',
  eventStart: '2026-10-17T18:00:00.000Z',
  eventEnd: '2026-10-18T01:00:00.000Z',
  consumables: consumables(25, 3 * 1024 ** 3),
  itemCount: partyItems.length,
  memberCount: 4,
  sharedCount: 3,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: PHOTOS.slice(0, 1).map(largeOf),
};

const concertId = '22222222-2222-4222-8222-222222222225';
const concertCover = label(concertId, carol.id, 'Обложка', '#a855f7', []);
const concertStage = label(concertId, carol.id, 'Сцена', '#8b5cf6', []);
const concertBackstage = label(concertId, alice.id, 'За кадром', '#14b8a6', []);
const concertItems = [
  item(concertId, 'photo', DANCE, carol, {
    labelIds: [concertCover.id, concertStage.id],
    analyzed: true,
    description: 'Выход на сцену',
    daysAgo: 18,
  }),
  item(concertId, 'photo', CITY, carol, {
    labelIds: [concertStage.id],
    analyzed: true,
    description: 'Город после концерта',
    daysAgo: 18,
  }),
  item(concertId, 'photo', FRIENDS, alice, {
    labelIds: [concertBackstage.id],
    analyzed: true,
    description: 'За кулисами с друзьями',
    daysAgo: 17,
  }),
];
const concertDone = montage(concertId, concertItems, 'done', 20, 'Вечер в парке');
const concertMovie = movie(
  concertId,
  concertDone,
  'Концерт в парке',
  DANCE,
  '2026-11-09T22:00:00.000Z',
);
const concertProject: ProjectCardResponse = {
  id: concertId,
  title: 'Концерт в парке',
  eventStart: '2026-11-08T20:00:00.000Z',
  eventEnd: '2026-11-08T23:30:00.000Z',
  consumables: consumables(15, 1024 ** 3),
  itemCount: concertItems.length,
  memberCount: 2,
  sharedCount: 2,
  myRole: 'contributor',
  myContribution: 'done',
  previewUrls: [DANCE].map(largeOf),
};

const dachaId = '22222222-2222-4222-8222-222222222226';
const dachaCover = label(dachaId, bob.id, 'Обложка', '#3b82f6', []);
const dachaNature = label(dachaId, bob.id, 'Природа', '#22c55e', []);
const dachaPeople = label(dachaId, alice.id, 'Близкие', '#f97316', []);
const dachaItems = [
  item(dachaId, 'photo', PICNIC, bob, {
    labelIds: [dachaCover.id, dachaNature.id],
    analyzed: true,
    description: 'Обед на открытом воздухе',
    daysAgo: 27,
  }),
  item(dachaId, 'photo', SEA, bob, {
    labelIds: [dachaNature.id],
    analyzed: true,
    description: 'Вечер у воды',
    daysAgo: 26,
  }),
  item(dachaId, 'photo', FRIENDS, alice, {
    labelIds: [dachaPeople.id],
    analyzed: true,
    description: 'Собрались всей семьёй',
    daysAgo: 26,
  }),
  item(dachaId, 'video', SEA, dave, {
    labelIds: [dachaNature.id],
    description: 'Закат и шум воды',
    daysAgo: 25,
  }),
];
const dachaMontage = montage(dachaId, dachaItems, 'done', 20, 'Выходные у бабушки');
const dachaMovie = movie(
  dachaId,
  dachaMontage,
  'Дача у бабушки',
  PICNIC,
  '2026-11-02T18:00:00.000Z',
);
const dachaSecond = montage(dachaId, dachaItems.slice(0, 2), 'done', 10, 'Только вода и еда');
const dachaSecondMovie = movie(
  dachaId,
  dachaSecond,
  'Дача у бабушки: короткая версия',
  SEA,
  '2026-11-03T09:00:00.000Z',
);
const dachaProject: ProjectCardResponse = {
  id: dachaId,
  title: 'Дача у бабушки',
  eventStart: '2026-10-30T12:00:00.000Z',
  eventEnd: '2026-10-31T12:00:00.000Z',
  consumables: consumables(30, 2 * 1024 ** 3),
  itemCount: dachaItems.length,
  memberCount: 3,
  sharedCount: 2,
  myRole: 'contributor',
  myContribution: 'done',
  previewUrls: [PICNIC].map(largeOf),
};

const weddingMembers = [
  member(alice, 'admin', 'done', 40, 4 * 1024 ** 3),
  member(bob, 'contributor', 'done', 20, 2 * 1024 ** 3),
  member(carol, 'viewer', 'done', 8, 512 * 1024 ** 2),
];

const weddingProject: ProjectCardResponse = {
  id: weddingId,
  title: 'Свадьба Анны и Марка',
  eventStart: '2026-10-20T15:00:00.000Z',
  eventEnd: '2026-10-21T02:00:00.000Z',
  consumables: consumables(40, 4 * 1024 ** 3),
  itemCount: weddingItems.length,
  memberCount: 3,
  sharedCount: 2,
  myRole: 'admin',
  myContribution: 'done',
  previewUrls: [PARTY].map(largeOf),
};

export const mockProjects: ProjectCardResponse[] = [
  weddingProject,
  birthdayProject,
  partyProject,
  concertProject,
  dachaProject,
];

export const mockBundles: Record<string, Bundle> = {
  [weddingId]: bundle(
    weddingProject,
    weddingMembers,
    [cover, favourite, guests, details],
    weddingItems,
    [weddingMontage],
    [weddingMovie],
  ),
  [birthdayId]: bundle(
    birthdayProject,
    [
      member(alice, 'admin', 'done', 35, 3 * 1024 ** 3),
      member(carol, 'contributor', 'done', 15, 1024 ** 3),
      member(bob, 'contributor', 'done', 10, 512 * 1024 ** 2),
      member(dave, 'viewer', 'done', 8, 512 * 1024 ** 2),
    ],
    [birthdayCover, birthdayFamily, birthdayDetails],
    birthdayItems,
    [birthdayMontage],
    [birthdayMovie],
  ),
  [partyId]: bundle(
    partyProject,
    [
      member(alice, 'admin', 'done', 25, 3 * 1024 ** 3),
      member(bob, 'contributor', 'done', 10, 1024 ** 3),
      member(carol, 'contributor', 'done', 5, 512 * 1024 ** 2),
      member(dave, 'viewer', 'done', 8, 512 * 1024 ** 2),
    ],
    [partyCover, partyFavourites, partyDetails],
    partyItems,
    [partyDone],
    [partyMovie],
  ),
  [concertId]: bundle(
    concertProject,
    [
      member(carol, 'admin', 'done', 15, 1024 ** 3),
      member(alice, 'contributor', 'done', 5, 512 * 1024 ** 2),
    ],
    [concertCover, concertStage, concertBackstage],
    concertItems,
    [concertDone],
    [concertMovie],
  ),
  [dachaId]: bundle(
    dachaProject,
    [
      member(bob, 'admin', 'done', 30, 2 * 1024 ** 3),
      member(alice, 'contributor', 'done', 10, 1024 ** 3),
      member(dave, 'viewer', 'done', 8, 512 * 1024 ** 2),
    ],
    [dachaCover, dachaNature, dachaPeople],
    dachaItems,
    [dachaMontage, dachaSecond],
    [dachaMovie, dachaSecondMovie],
  ),
};

export const mockTemplates: MontageTemplateResponse[] = [
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb01',
    about: {
      ru: {
        name: 'Быстрый клип',
        description: 'Короткий динамичный клип о самом ярком моменте события, без долгих планов.',
      },
      en: {
        name: 'Quick clip',
        description:
          'A short, dynamic clip about the brightest moment of the event, no long shots.',
      },
    },
    settings: {
      targetSeconds: 15,
      prompt: 'Короткий динамичный клип о самом ярком моменте.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: PARTY,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb02',
    about: {
      ru: {
        name: 'Кино',
        description: 'Тёплый фильм с историей, спокойным ритмом и титрами.',
      },
      en: {
        name: 'Film',
        description: 'A warm film with a story, an unhurried pace and captions.',
      },
    },
    settings: {
      targetSeconds: 60,
      prompt: 'Тёплый фильм с историей, спокойным ритмом и титрами.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: WEDDING,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb03',
    about: {
      ru: {
        name: 'Репортаж',
        description: 'Репортаж о том, как прошёл день, от начала до конца.',
      },
      en: {
        name: 'Report',
        description: 'A report on how the day went, from start to finish.',
      },
    },
    settings: {
      targetSeconds: 45,
      prompt: 'Репортаж о том, как прошёл день, от начала до конца.',
      dimensions: { width: 1920, height: 1080 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: CITY,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb04',
    about: {
      ru: {
        name: 'Для родителей',
        description: 'Мягкий семейный фильм о детях и близких.',
      },
      en: {
        name: 'For parents',
        description: 'A gentle family film about children and those close to you.',
      },
    },
    settings: {
      targetSeconds: 30,
      prompt: 'Мягкий семейный фильм о детях и близких.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: BIRTHDAY,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb05',
    about: {
      ru: {
        name: 'История',
        description: 'Рассказ от первого лица о том, как прошёл вечер.',
      },
      en: {
        name: 'Story',
        description: 'A first-person story of how the evening went.',
      },
    },
    settings: {
      targetSeconds: 45,
      prompt: 'Рассказ от первого лица о том, как прошёл вечер.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: DANCE,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb06',
    about: {
      ru: {
        name: 'Атмосфера',
        description: 'Медленные планы и детали, без суеты.',
      },
      en: {
        name: 'Atmosphere',
        description: 'Slow shots and details, no rush.',
      },
    },
    settings: {
      targetSeconds: 20,
      prompt: 'Медленные планы и детали, без суеты.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: SEA,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb07',
    about: {
      ru: {
        name: 'Трейлер',
        description: 'Короткий трейлер с нарастанием и кульминацией в финале.',
      },
      en: {
        name: 'Trailer',
        description: 'A short trailer that builds up to a climax at the end.',
      },
    },
    settings: {
      targetSeconds: 30,
      prompt: 'Короткий трейлер с нарастанием и кульминацией в финале.',
      dimensions: { width: 1080, height: 1920 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: FRIENDS,
    referenceMediaId: null,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbb08',
    about: {
      ru: {
        name: 'Хроника',
        description: 'Спокойная хроника события по порядку, от начала до конца.',
      },
      en: {
        name: 'Chronicle',
        description: 'A calm chronicle of the event in order, from start to finish.',
      },
    },
    settings: {
      targetSeconds: 75,
      prompt: 'Спокойная хроника события по порядку, от начала до конца.',
      dimensions: { width: 1920, height: 1080 },
      musicIds: [],
    },
    coverId: null,
    coverUrl: PICNIC,
    referenceMediaId: null,
  },
];

export const mockSongs: SongResponse[] = [
  {
    id: '14141414-1414-4414-8414-141414141414',
    name: 'Тихий вечер',
    author: 'Марк Ветров',
    originalId: TRACK_MEDIA,
    compressedId: null,
    coverId: null,
    previewCoverId: null,
    coverUrl: PARTY,
    previewCoverUrl: PARTY,
    duration: 30,
    uploadedBy: null,
  },
  {
    id: '15151515-1515-4515-8515-151515151515',
    name: 'Вечерний свет',
    author: 'Илья Орлов',
    originalId: '16161616-1616-4616-8616-161616161616',
    compressedId: null,
    coverId: null,
    previewCoverId: null,
    coverUrl: SEA,
    previewCoverUrl: SEA,
    duration: 20,
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
  const made = montage(projectId, chosen, 'done', config.targetSeconds, config.prompt);
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
    chosen[0]?.links.middle ?? null,
    new Date().toISOString(),
  );
  found.montages.unshift(made);
  found.movies.unshift(film);
  return made;
}
