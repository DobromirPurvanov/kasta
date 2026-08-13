/**
 * Продуктови данни за E RIDE PRO България.
 *
 * Гамата е три модела — SS 2.5, SS 3.0 и SR — и всеки от тях се предлага в три
 * версии: офроуд (без регистрация), L1e (мопед) и L3e (лек мотоциклет).
 * Mini се предлага само в офроуд версия.
 *
 * Техническите параметри идват от официалните сайтове на производителя:
 * eridepro.nu (мощност, скорост, обхват, батерия, тегла), eridepros.co.uk
 * (шаси, табло, размери) и официалния наръчник за L1e версията.
 *
 * ВАЖНО: L3e версиите чакат цени от вносителя — виж `published` по-долу.
 */

export type FamilyKey = 'mini' | 'ss-25' | 'ss-30' | 'sr'
export type VersionKey = 'off-road' | 'l1e' | 'l3e'
export type FilterKey = 'all' | FamilyKey | VersionKey

export interface SpecRow {
  label: string
  labelBg: string
  value: string
  /** Само когато стойността съдържа думи, които се превеждат. */
  valueBg?: string
}

export interface SpecGroup {
  title: string
  titleBg: string
  rows: SpecRow[]
}

export interface Product {
  id: string
  slug: string
  family: FamilyKey
  /** Показва се като етикет над името — „SR", „SS 3.0"... */
  familyLabel: string
  version: VersionKey
  name: string
  nameBg: string
  category: string
  /** Липсва, докато вносителят не потвърди цена — тогава се показва „по запитване". */
  price?: string
  /** Предишна цена, зачертана до `price`. */
  originalPrice?: string
  /** Скрива продукта от сайта, без да губим данните му. */
  published: boolean
  image: string
  /** Галерията, която да се ползва, ако моделът няма собствена. */
  gallerySlug?: string
  galleryCount: number
  alt: string
  title: string
  titleBg: string
  metaDesc: string
  metaDescBg: string
  tagline: string
  taglineBg: string
  description: string
  descriptionBg: string
  specs: SpecGroup[]
  faq: { q: string; qBg: string; a: string; aBg: string }[]
  filters: FilterKey[]
}

/* ------------------------------------------------------------------ *
 * Общи блокове
 * ------------------------------------------------------------------ */

const HOMOLOGATION = 'Homologation'
const HOMOLOGATION_BG = 'Хомологация'
const POWERTRAIN = 'Powertrain'
const POWERTRAIN_BG = 'Задвижване'
const CHASSIS = 'Chassis'
const CHASSIS_BG = 'Шаси'
const DIMENSIONS = 'Dimensions & weight'
const DIMENSIONS_BG = 'Размери и тегла'

interface VersionProfile {
  /** Скорост, ограничена от хомологацията. */
  topSpeed: string
  category: string
  categoryBg: string
  licence: string
  licenceBg: string
  registration: string
  registrationBg: string
  tyres: string
  tyresBg: string
}

const OFF_ROAD_LABELS = {
  category: 'Off-road (not road legal)',
  categoryBg: 'Офроуд (без регистрация)',
  licence: 'Not required on private land',
  licenceBg: 'Не се изисква на частен терен',
  registration: 'Not registered',
  registrationBg: 'Не се регистрира',
}

const L1E_LABELS = {
  category: 'L1e (moped)',
  categoryBg: 'L1e (мопед)',
  licence: 'AM category, from 16',
  licenceBg: 'Категория AM, от 16 г.',
  registration: 'Registered at KAT',
  registrationBg: 'Регистрира се в КАТ',
}

const L3E_LABELS = {
  category: 'L3e (light motorcycle)',
  categoryBg: 'L3e (лек мотоциклет)',
  licence: 'A1 category, from 16',
  licenceBg: 'Категория A1, от 16 г.',
  registration: 'Registered at KAT',
  registrationBg: 'Регистрира се в КАТ',
}

function homologationGroup(profile: VersionProfile): SpecGroup {
  return {
    title: HOMOLOGATION,
    titleBg: HOMOLOGATION_BG,
    rows: [
      { label: 'Category', labelBg: 'Категория', value: profile.category, valueBg: profile.categoryBg },
      { label: 'Top speed', labelBg: 'Макс. скорост', value: profile.topSpeed },
      { label: 'Licence', labelBg: 'Книжка', value: profile.licence, valueBg: profile.licenceBg },
      { label: 'Registration', labelBg: 'Регистрация', value: profile.registration, valueBg: profile.registrationBg },
      { label: 'Tyres', labelBg: 'Гуми', value: profile.tyres, valueBg: profile.tyresBg },
    ],
  }
}

/* ------------------------------------------------------------------ *
 * SR
 * ------------------------------------------------------------------ */

const SR_POWERTRAIN: SpecGroup = {
  title: POWERTRAIN,
  titleBg: POWERTRAIN_BG,
  rows: [
    { label: 'Rated voltage', labelBg: 'Напрежение', value: '72 V' },
    { label: 'Rated power', labelBg: 'Номинална мощност', value: '10 kW' },
    { label: 'Peak power', labelBg: 'Пикова мощност', value: '25 kW' },
    { label: 'Motor peak torque', labelBg: 'Въртящ момент (двигател)', value: '70 Nm' },
    { label: 'Wheel peak torque', labelBg: 'Въртящ момент (колело)', value: '630 Nm' },
    { label: 'Battery', labelBg: 'Батерия', value: '72V 50Ah · 3600 Wh Samsung 50S, swappable', valueBg: '72V 50Ah · 3600 Wh Samsung 50S, сменяема' },
    { label: '0–48 km/h', labelBg: '0–48 km/h', value: '1.8 s', valueBg: '1,8 сек.' },
    { label: 'Range', labelBg: 'Обхват', value: '100+ km at 40 km/h · 150+ km at 24 km/h', valueBg: '100+ km при 40 km/h · 150+ km при 24 km/h' },
    { label: 'Charging 20–90%', labelBg: 'Зареждане 20–90%', value: '3.5 h', valueBg: '3,5 часа' },
  ],
}

const SR_CHASSIS: SpecGroup = {
  title: CHASSIS,
  titleBg: CHASSIS_BG,
  rows: [
    { label: 'Front fork', labelBg: 'Предна вилка', value: 'FASTACE adjustable · 775 mm, 220 mm travel', valueBg: 'FASTACE регулируема · 775 mm, ход 220 mm' },
    { label: 'Rear shock', labelBg: 'Заден амортисьор', value: 'FASTACE adjustable · 265 mm, 75 mm travel', valueBg: 'FASTACE регулируем · 265 mm, ход 75 mm' },
    { label: 'Brakes', labelBg: 'Спирачки', value: 'DOT4 hydraulic · 220 mm discs front and rear', valueBg: 'DOT4 хидравлични · дискове 220 mm отпред и отзад' },
    { label: 'Regenerative braking', labelBg: 'Рекуперация', value: 'Multilevel adjustable', valueBg: 'Многостепенно регулируема' },
    { label: 'Chain', labelBg: 'Верига', value: 'RK 428 · 114 links', valueBg: 'RK 428 · 114 звена' },
    { label: 'Sprocket', labelBg: 'Зъбно колело', value: '428 58T · 7075 CNC aluminium', valueBg: '428 58T · CNC алуминий 7075' },
    { label: 'Display', labelBg: 'Табло', value: 'Colour TFT', valueBg: 'Цветен TFT' },
  ],
}

const SR_DIMENSIONS: SpecGroup = {
  title: DIMENSIONS,
  titleBg: DIMENSIONS_BG,
  rows: [
    { label: 'Seat height', labelBg: 'Височина на седалката', value: '830 mm' },
    { label: 'Wheelbase', labelBg: 'Междуосие', value: '1260 mm' },
    { label: 'Handlebar width', labelBg: 'Ширина на кормилото', value: '780 mm' },
    { label: 'Ground clearance', labelBg: 'Просвет', value: '280 mm' },
    { label: 'Weight', labelBg: 'Тегло', value: '83 kg' },
    { label: 'Max load', labelBg: 'Макс. натоварване', value: '137 kg' },
  ],
}

/* ------------------------------------------------------------------ *
 * SS 3.0
 * ------------------------------------------------------------------ */

const SS30_POWERTRAIN: SpecGroup = {
  title: POWERTRAIN,
  titleBg: POWERTRAIN_BG,
  rows: [
    { label: 'Rated voltage', labelBg: 'Напрежение', value: '72 V' },
    { label: 'Rated power', labelBg: 'Номинална мощност', value: '6 kW' },
    { label: 'Peak power', labelBg: 'Пикова мощност', value: '15.6 kW', valueBg: '15,6 kW' },
    { label: 'Motor peak torque', labelBg: 'Въртящ момент (двигател)', value: '58 Nm' },
    { label: 'Wheel peak torque', labelBg: 'Въртящ момент (колело)', value: '520 Nm' },
    { label: 'Battery', labelBg: 'Батерия', value: '72V 50Ah · 3600 Wh, swappable lithium', valueBg: '72V 50Ah · 3600 Wh, сменяема литиева' },
    { label: '0–50 km/h', labelBg: '0–50 km/h', value: '2 s', valueBg: '2 сек.' },
    { label: 'Range', labelBg: 'Обхват', value: '103+ km at 40 km/h · 161+ km at 24 km/h', valueBg: '103+ km при 40 km/h · 161+ km при 24 km/h' },
    { label: 'Charging 20–90%', labelBg: 'Зареждане 20–90%', value: '3.5 h', valueBg: '3,5 часа' },
  ],
}

const SS30_CHASSIS: SpecGroup = {
  title: CHASSIS,
  titleBg: CHASSIS_BG,
  rows: [
    { label: 'Front fork', labelBg: 'Предна вилка', value: 'FASTACE adjustable', valueBg: 'FASTACE регулируема' },
    { label: 'Rear shock', labelBg: 'Заден амортисьор', value: 'FASTACE adjustable', valueBg: 'FASTACE регулируем' },
    { label: 'Brakes', labelBg: 'Спирачки', value: 'DOT4 hydraulic', valueBg: 'DOT4 хидравлични' },
    { label: 'Regenerative braking', labelBg: 'Рекуперация', value: 'Multilevel adjustable', valueBg: 'Многостепенно регулируема' },
    { label: 'Chain', labelBg: 'Верига', value: '428 · 114 links', valueBg: '428 · 114 звена' },
    { label: 'Sprocket', labelBg: 'Зъбно колело', value: '428 58T' },
    { label: 'Display', labelBg: 'Табло', value: 'Colour TFT · Bluetooth', valueBg: 'Цветен TFT · Bluetooth' },
  ],
}

const SS30_DIMENSIONS: SpecGroup = {
  title: DIMENSIONS,
  titleBg: DIMENSIONS_BG,
  rows: [
    { label: 'Seat height', labelBg: 'Височина на седалката', value: '830 mm' },
    { label: 'Wheelbase', labelBg: 'Междуосие', value: '1260 mm' },
    { label: 'Handlebar width', labelBg: 'Ширина на кормилото', value: '780 mm' },
    { label: 'Ground clearance', labelBg: 'Просвет', value: '280 mm' },
    { label: 'Weight', labelBg: 'Тегло', value: '76 kg' },
    { label: 'Max load', labelBg: 'Макс. натоварване', value: '137 kg' },
  ],
}

/* ------------------------------------------------------------------ *
 * SS 2.5
 * ------------------------------------------------------------------ */

const SS25_POWERTRAIN: SpecGroup = {
  title: POWERTRAIN,
  titleBg: POWERTRAIN_BG,
  rows: [
    { label: 'Rated voltage', labelBg: 'Напрежение', value: '72 V' },
    // Производителят публикува само хомологираната мощност за 2.5 — пиковата
    // на офроуд версията я няма никъде, затова не си я измисляме.
    { label: 'Power', labelBg: 'Мощност', value: '3.7 kW homologated', valueBg: '3,7 kW хомологирана' },
    { label: 'Battery', labelBg: 'Батерия', value: '72V 40Ah · 2880 Wh Samsung', valueBg: '72V 40Ah · 2880 Wh Samsung' },
    { label: '0–45 km/h', labelBg: '0–45 km/h', value: '2.5 s', valueBg: '2,5 сек.' },
    { label: 'Range', labelBg: 'Обхват', value: 'up to 100 km', valueBg: 'до 100 km' },
    { label: 'Charging 20–80%', labelBg: 'Зареждане 20–80%', value: '1.5 h', valueBg: '1,5 часа' },
  ],
}

const SS25_CHASSIS: SpecGroup = {
  title: CHASSIS,
  titleBg: CHASSIS_BG,
  rows: [
    { label: 'Front fork', labelBg: 'Предна вилка', value: 'FASTACE twin-crown · 200 mm travel, compression and rebound adjustable', valueBg: 'FASTACE двумостова · ход 200 mm, регулируема на натиск и отскок' },
    { label: 'Rear shock', labelBg: 'Заден амортисьор', value: 'Steel spring, adjustable', valueBg: 'Стоманена пружина, регулируем' },
    { label: 'Brakes', labelBg: 'Спирачки', value: 'Hydraulic discs, motorcycle standard', valueBg: 'Хидравлични дискови, мотоциклетен стандарт' },
    { label: 'Regenerative braking', labelBg: 'Рекуперация', value: 'Adjustable', valueBg: 'Регулируема' },
  ],
}

const SS25_DIMENSIONS: SpecGroup = {
  title: DIMENSIONS,
  titleBg: DIMENSIONS_BG,
  rows: [
    { label: 'Seat height', labelBg: 'Височина на седалката', value: '860 mm' },
    { label: 'Overall length', labelBg: 'Обща дължина', value: '1950 mm' },
    { label: 'Wheelbase', labelBg: 'Междуосие', value: '1280 mm' },
    { label: 'Handlebar width', labelBg: 'Ширина на кормилото', value: '800 mm' },
    { label: 'Weight', labelBg: 'Тегло', value: '69 kg with battery · 53 kg without', valueBg: '69 kg с батерия · 53 kg без' },
    { label: 'Max load', labelBg: 'Макс. натоварване', value: '137 kg' },
  ],
}

/* ------------------------------------------------------------------ *
 * Mini
 * ------------------------------------------------------------------ */

const MINI_SPECS: SpecGroup[] = [
  homologationGroup({
    topSpeed: '75 km/h',
    ...OFF_ROAD_LABELS,
    tyres: 'Front 60/100-14 · Rear 80/100-12',
    tyresBg: 'Предна 60/100-14 · Задна 80/100-12',
  }),
  {
    title: POWERTRAIN,
    titleBg: POWERTRAIN_BG,
    rows: [
      { label: 'Rated voltage', labelBg: 'Напрежение', value: '72 V' },
      { label: 'Rated power', labelBg: 'Номинална мощност', value: '3 kW' },
      { label: 'Peak power', labelBg: 'Пикова мощност', value: '8 kW' },
      { label: 'Motor peak torque', labelBg: 'Въртящ момент (двигател)', value: '38 Nm' },
      { label: 'Wheel peak torque', labelBg: 'Въртящ момент (колело)', value: '270 Nm' },
      { label: 'Battery', labelBg: 'Батерия', value: '72V 30Ah · 2160 Wh, swappable lithium', valueBg: '72V 30Ah · 2160 Wh, сменяема литиева' },
      { label: '0–48 km/h', labelBg: '0–48 km/h', value: '3 s', valueBg: '3 сек.' },
      { label: 'Range', labelBg: 'Обхват', value: '60+ km at 32 km/h', valueBg: '60+ km при 32 km/h' },
      { label: 'Charging 20–90%', labelBg: 'Зареждане 20–90%', value: '2 h', valueBg: '2 часа' },
    ],
  },
  {
    title: CHASSIS,
    titleBg: CHASSIS_BG,
    rows: [
      { label: 'Front fork', labelBg: 'Предна вилка', value: 'FASTACE adjustable', valueBg: 'FASTACE регулируема' },
      { label: 'Rear shock', labelBg: 'Заден амортисьор', value: 'FASTACE adjustable', valueBg: 'FASTACE регулируем' },
      { label: 'Brakes', labelBg: 'Спирачки', value: 'Mineral oil hydraulic + regen', valueBg: 'Хидравлични с минерално масло + рекуперация' },
      { label: 'Chain', labelBg: 'Верига', value: '420 · 90 links', valueBg: '420 · 90 звена' },
      { label: 'Sprocket', labelBg: 'Зъбно колело', value: '420 41T' },
      { label: 'Display', labelBg: 'Табло', value: 'Colour LCD', valueBg: 'Цветен LCD' },
    ],
  },
  {
    title: DIMENSIONS,
    titleBg: DIMENSIONS_BG,
    rows: [
      { label: 'Seat height', labelBg: 'Височина на седалката', value: '678 mm' },
      { label: 'Wheelbase', labelBg: 'Междуосие', value: '1070 mm' },
      { label: 'Handlebar width', labelBg: 'Ширина на кормилото', value: '710 mm' },
      { label: 'Ground clearance', labelBg: 'Просвет', value: '270 mm' },
      { label: 'Weight', labelBg: 'Тегло', value: '53.5 kg', valueBg: '53,5 kg' },
      { label: 'Max load', labelBg: 'Макс. натоварване', value: '65 kg' },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Гумите се менят с версията — офроуд кара Fatty, пътните dual sport.
 * ------------------------------------------------------------------ */

const FATTY_19_16 = { tyres: '19"/16" Fatty knobby', tyresBg: '19"/16" Fatty крос' }
const DUAL_SPORT_19_18 = { tyres: '19"/18" dual sport', tyresBg: '19"/18" dual sport' }
const SS25_ROAD_TYRES = { tyres: 'Front 2.75-19 · Rear 3.00-18', tyresBg: 'Предна 2.75-19 · Задна 3.00-18' }

const FAQ_WARRANTY = {
  q: 'Is there a warranty?',
  qBg: 'Има ли гаранция?',
  a: 'Yes — a 2-year manufacturer warranty, serviced by Kasta Ventures in Sofia.',
  aBg: 'Да — 2-годишна производствена гаранция, обслужвана от Kasta Ventures в София.',
}

const FAQ_L1E_LICENCE = {
  q: 'What licence do I need?',
  qBg: 'Каква книжка ми трябва?',
  a: 'The L1e version is a moped — an AM category licence is enough, available from 16.',
  aBg: 'Версията L1e е мопед — стига книжка от категория AM, която се вади от 16 г.',
}

const FAQ_L3E_LICENCE = {
  q: 'What licence do I need?',
  qBg: 'Каква книжка ми трябва?',
  a: 'The L3e version is a light motorcycle — it needs an A1 category licence, available from 16.',
  aBg: 'Версията L3e е лек мотоциклет — иска книжка от категория A1, която се вади от 16 г.',
}

const FAQ_OFFROAD_WHERE = {
  q: 'Where can I ride it?',
  qBg: 'Къде мога да го карам?',
  a: 'The off-road version is not registered, so it is ridden on private land and designated off-road trails.',
  aBg: 'Офроуд версията не се регистрира, тоест се кара на частен терен и по обозначени офроуд трасета.',
}

const FAQ_REGISTRATION = {
  q: 'Is it registered at KAT?',
  qBg: 'Регистрира ли се в КАТ?',
  a: 'Yes — it comes with full EU homologation documents, so registration is straightforward.',
  aBg: 'Да — идва с пълна EU хомологационна документация, така че регистрацията минава лесно.',
}

/* ------------------------------------------------------------------ *
 * Гамата
 * ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---------------------------------------------------------------- SS 2.5 */
  {
    id: 'ss25-offroad',
    slug: 'ss-25-off-road',
    family: 'ss-25',
    familyLabel: 'SS 2.5',
    version: 'off-road',
    name: 'E RIDE PRO SS 2.5 — Off Road',
    nameBg: 'E RIDE PRO SS 2.5 — Офроуд',
    category: 'SS 2.5',
    price: '€5,390.00',
    published: true,
    image: '/images/kasta/ss25-offroad-main.png',
    galleryCount: 16,
    alt: 'E RIDE PRO SS 2.5 Off Road електрически мотор',
    title: 'E RIDE PRO SS 2.5 Off Road | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 2.5 Офроуд | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 2.5 Off Road — the entry into the range, on Fatty knobby tyres. Official representative for Bulgaria, Kasta Ventures.',
    metaDescBg: 'E RIDE PRO SS 2.5 Офроуд — входът в гамата, на Fatty крос гуми. Официален представител за България — Kasta Ventures.',
    tagline: 'The entry into the range. Fatty tyres, no compromises off the tarmac.',
    taglineBg: 'Входът в гамата. Fatty гуми и никакви компромиси извън асфалта.',
    description: `The SS 2.5 Off Road is where the E RIDE PRO range begins. It keeps the same 72V architecture and swappable Samsung battery as the bigger models, in a lighter and more forgiving package.\n\nOn Fatty knobby tyres and a twin-crown FASTACE fork with 200 mm of travel, it is built for trails, fields and climbs rather than for the road. It is not registered, so it is ridden on private land and designated off-road trails.\n\nAt 69 kg with the battery in, it is easy to pick up, easy to load into a van and easy to trust while you are still learning what an electric dirt bike can do.`,
    descriptionBg: `SS 2.5 Офроуд е мястото, откъдето започва гамата E RIDE PRO. Пази същата 72V архитектура и сменяемата Samsung батерия като по-големите модели, но в по-лек и по-прощаващ пакет.\n\nНа Fatty крос гуми и двумостова FASTACE вилка с ход 200 mm, е построен за пътеки, поляни и изкачвания, а не за асфалт. Не се регистрира, тоест се кара на частен терен и по обозначени офроуд трасета.\n\nС 69 kg с поставена батерия се вдига лесно, товари се лесно и се кара с доверие, докато още опознаваш какво може един електрически мотокрос.`,
    specs: [
      homologationGroup({ topSpeed: '90 km/h', ...OFF_ROAD_LABELS, ...FATTY_19_16 }),
      SS25_POWERTRAIN,
      SS25_CHASSIS,
      SS25_DIMENSIONS,
    ],
    faq: [FAQ_OFFROAD_WHERE, FAQ_WARRANTY],
    filters: ['all', 'ss-25', 'off-road'],
  },
  {
    id: 'ss25-l1e',
    slug: 'ss-25-l1e',
    family: 'ss-25',
    familyLabel: 'SS 2.5',
    version: 'l1e',
    name: 'E RIDE PRO SS 2.5 — L1e Road Legal',
    nameBg: 'E RIDE PRO SS 2.5 — L1e пътен',
    category: 'SS 2.5',
    price: '€4,899.00',
    originalPrice: '€5,390.00',
    published: true,
    image: '/images/kasta/ss25-l1e-main.png',
    galleryCount: 18,
    alt: 'E RIDE PRO SS 2.5 L1e пътен електрически мотор',
    title: 'E RIDE PRO SS 2.5 L1e — пътен мопед | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 2.5 L1e — пътен мопед | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 2.5 L1e — road legal moped, 45 km/h, AM licence. On promotion at Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SS 2.5 L1e — пътен мопед, 45 km/h, книжка AM. На промоция в Kasta Ventures — официален представител за България.',
    tagline: 'Our best-selling road-legal model. Now on promotion.',
    taglineBg: 'Нашият най-продаван пътен модел. Сега на промоция.',
    description: `The SS 2.5 L1e is the same bike as the off-road version, homologated as an L1e moped: lights, mirrors, indicators, a plate holder and dual-sport tyres, limited to 45 km/h.\n\nThat means an AM licence from the age of 16 and straightforward registration at KAT — with the documents supplied. For a daily ride around Sofia it is quiet, cheap to run and needs almost no maintenance.\n\nIt is the model we sell most of, and it is currently on promotion.`,
    descriptionBg: `SS 2.5 L1e е същият мотор като офроуд версията, хомологиран като мопед L1e: светлини, огледала, мигачи, поставка за номер и dual sport гуми, ограничен до 45 km/h.\n\nТова означава книжка AM от 16 г. и лесна регистрация в КАТ — документите се предоставят. За ежедневно каране из София е тих, евтин за поддръжка и почти не иска сервиз.\n\nТова е моделът, който продаваме най-много, и в момента е на промоция.`,
    specs: [
      homologationGroup({ topSpeed: '45 km/h', ...L1E_LABELS, ...SS25_ROAD_TYRES }),
      SS25_POWERTRAIN,
      SS25_CHASSIS,
      SS25_DIMENSIONS,
    ],
    faq: [FAQ_L1E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'ss-25', 'l1e'],
  },
  {
    id: 'ss25-l3e',
    slug: 'ss-25-l3e',
    family: 'ss-25',
    familyLabel: 'SS 2.5',
    version: 'l3e',
    name: 'E RIDE PRO SS 2.5 — L3e Road Legal',
    nameBg: 'E RIDE PRO SS 2.5 — L3e пътен',
    category: 'SS 2.5',
    // Цената чака потвърждение от вносителя.
    published: false,
    image: '/images/kasta/ss25-l3e-main.webp',
    gallerySlug: 'ss-25-l1e',
    galleryCount: 18,
    alt: 'E RIDE PRO SS 2.5 L3e пътен електрически мотоциклет',
    title: 'E RIDE PRO SS 2.5 L3e — лек мотоциклет | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 2.5 L3e — лек мотоциклет | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 2.5 L3e — light motorcycle homologation, 80 km/h, A1 licence. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SS 2.5 L3e — хомологация лек мотоциклет, 80 km/h, книжка A1. Kasta Ventures — официален представител за България.',
    tagline: 'The same bike, homologated as a light motorcycle. 80 km/h.',
    taglineBg: 'Същият мотор, хомологиран като лек мотоциклет. 80 km/h.',
    description: `The SS 2.5 L3e is homologated as a light motorcycle rather than a moped. The bike is the same — the difference is the certificate and the limiter, which sits at 80 km/h instead of 45.\n\nThat asks for an A1 licence, and in return it opens up roads where a moped is out of place.`,
    descriptionBg: `SS 2.5 L3e е хомологиран като лек мотоциклет, а не като мопед. Моторът е същият — разликата е в сертификата и в ограничителя, който е на 80 km/h вместо на 45.\n\nТова иска книжка A1, а в замяна отваря пътища, по които мопедът няма работа.`,
    specs: [
      homologationGroup({ topSpeed: '80 km/h', ...L3E_LABELS, ...SS25_ROAD_TYRES }),
      SS25_POWERTRAIN,
      SS25_CHASSIS,
      SS25_DIMENSIONS,
    ],
    faq: [FAQ_L3E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'ss-25', 'l3e'],
  },

  /* ---------------------------------------------------------------- SS 3.0 */
  {
    id: 'ss30-offroad',
    slug: 'ss-30-off-road',
    family: 'ss-30',
    familyLabel: 'SS 3.0',
    version: 'off-road',
    name: 'E RIDE PRO SS 3.0 — Off Road',
    nameBg: 'E RIDE PRO SS 3.0 — Офроуд',
    category: 'SS 3.0',
    price: '€6,399.00',
    published: true,
    image: '/images/kasta/ss30-offroad-main.png',
    galleryCount: 16,
    alt: 'E RIDE PRO SS 3.0 Off Road електрически мотор',
    title: 'E RIDE PRO SS 3.0 Off Road | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 3.0 Офроуд | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 3.0 Off Road — 15.6 kW peak, 100 km/h, 3600 Wh battery. Official representative for Bulgaria, Kasta Ventures.',
    metaDescBg: 'E RIDE PRO SS 3.0 Офроуд — 15,6 kW пикова, 100 km/h, батерия 3600 Wh. Официален представител за България — Kasta Ventures.',
    tagline: 'Twice the power of the 2.5, in the same chassis as the SR.',
    taglineBg: 'Двойно повече мощност от 2.5, в същото шаси като SR.',
    description: `The SS 3.0 sits between the 2.5 and the SR, and it is the model most riders end up on. It carries the big 3600 Wh battery and the full-size chassis, with 15.6 kW of peak power and 520 Nm at the wheel.\n\nThat is enough to make steep climbs feel flat and to keep going for over 100 km on a charge. The FASTACE suspension and DOT4 hydraulics are the same components the SR runs.\n\nThe off-road version is not registered and rides on Fatty knobby tyres.`,
    descriptionBg: `SS 3.0 стои между 2.5 и SR и е моделът, на който повечето ездачи се спират. Носи голямата батерия от 3600 Wh и пълноразмерното шаси, с 15,6 kW пикова мощност и 520 Nm на колелото.\n\nТова стига стръмните изкачвания да изглеждат равни и да се карат над 100 km с едно зареждане. Окачването FASTACE и хидравликата DOT4 са същите компоненти, които върти и SR.\n\nОфроуд версията не се регистрира и е на Fatty крос гуми.`,
    specs: [
      homologationGroup({ topSpeed: '100 km/h', ...OFF_ROAD_LABELS, ...FATTY_19_16 }),
      SS30_POWERTRAIN,
      SS30_CHASSIS,
      SS30_DIMENSIONS,
    ],
    faq: [FAQ_OFFROAD_WHERE, FAQ_WARRANTY],
    filters: ['all', 'ss-30', 'off-road'],
  },
  {
    id: 'ss30-l1e',
    slug: 'ss-30-l1e',
    family: 'ss-30',
    familyLabel: 'SS 3.0',
    version: 'l1e',
    name: 'E RIDE PRO SS 3.0 — L1e Road Legal',
    nameBg: 'E RIDE PRO SS 3.0 — L1e пътен',
    category: 'SS 3.0',
    price: '€6,399.00',
    published: true,
    image: '/images/kasta/ss30-l1e-main.webp',
    galleryCount: 17,
    alt: 'E RIDE PRO SS 3.0 L1e пътен електрически мотор',
    title: 'E RIDE PRO SS 3.0 L1e — пътен мопед | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 3.0 L1e — пътен мопед | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 3.0 L1e — road legal moped, 45 km/h, AM licence, full EU homologation. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SS 3.0 L1e — пътен мопед, 45 km/h, книжка AM, пълна EU хомологация. Kasta Ventures — официален представител за България.',
    tagline: 'The full-size chassis, homologated as a moped.',
    taglineBg: 'Пълноразмерното шаси, хомологирано като мопед.',
    description: `The SS 3.0 L1e takes the full-size chassis and the 3600 Wh battery and puts them on the road as an L1e moped — lights, mirrors, indicators, plate holder, dual-sport tyres, limited to 45 km/h.\n\nAn AM licence from 16 is enough, and registration at KAT is straightforward with the homologation documents supplied.`,
    descriptionBg: `SS 3.0 L1e взима пълноразмерното шаси и батерията от 3600 Wh и ги изкарва на пътя като мопед L1e — светлини, огледала, мигачи, поставка за номер, dual sport гуми, ограничен до 45 km/h.\n\nКнижка AM от 16 г. е достатъчна, а регистрацията в КАТ минава лесно с предоставените хомологационни документи.`,
    specs: [
      homologationGroup({ topSpeed: '45 km/h', ...L1E_LABELS, ...DUAL_SPORT_19_18 }),
      SS30_POWERTRAIN,
      SS30_CHASSIS,
      SS30_DIMENSIONS,
    ],
    faq: [FAQ_L1E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'ss-30', 'l1e'],
  },
  {
    id: 'ss30-l3e',
    slug: 'ss-30-l3e',
    family: 'ss-30',
    familyLabel: 'SS 3.0',
    version: 'l3e',
    name: 'E RIDE PRO SS 3.0 — L3e Road Legal',
    nameBg: 'E RIDE PRO SS 3.0 — L3e пътен',
    category: 'SS 3.0',
    published: false,
    image: '/images/kasta/ss30-l3e-main.webp',
    gallerySlug: 'ss-30-l1e',
    galleryCount: 17,
    alt: 'E RIDE PRO SS 3.0 L3e пътен електрически мотоциклет',
    title: 'E RIDE PRO SS 3.0 L3e — лек мотоциклет | Kasta Ventures България',
    titleBg: 'E RIDE PRO SS 3.0 L3e — лек мотоциклет | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SS 3.0 L3e — light motorcycle homologation, 80 km/h, A1 licence. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SS 3.0 L3e — хомологация лек мотоциклет, 80 km/h, книжка A1. Kasta Ventures — официален представител за България.',
    tagline: 'The same bike, homologated as a light motorcycle. 80 km/h.',
    taglineBg: 'Същият мотор, хомологиран като лек мотоциклет. 80 km/h.',
    description: `The SS 3.0 L3e is homologated as a light motorcycle. Same chassis, same battery, same suspension — the limiter sits at 80 km/h instead of 45, and it asks for an A1 licence in return.`,
    descriptionBg: `SS 3.0 L3e е хомологиран като лек мотоциклет. Същото шаси, същата батерия, същото окачване — ограничителят е на 80 km/h вместо на 45, а в замяна иска книжка A1.`,
    specs: [
      homologationGroup({ topSpeed: '80 km/h', ...L3E_LABELS, ...DUAL_SPORT_19_18 }),
      SS30_POWERTRAIN,
      SS30_CHASSIS,
      SS30_DIMENSIONS,
    ],
    faq: [FAQ_L3E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'ss-30', 'l3e'],
  },

  /* -------------------------------------------------------------------- SR */
  {
    id: 'sr-off-road',
    slug: 'sr-off-road',
    family: 'sr',
    familyLabel: 'SR',
    version: 'off-road',
    name: 'E RIDE PRO SR — Off Road',
    nameBg: 'E RIDE PRO SR — Офроуд',
    category: 'SR',
    price: '€7,499.00',
    published: true,
    image: '/images/kasta/sr-offroad-main.png',
    galleryCount: 15,
    alt: 'E RIDE PRO SR Off Road електрически мотор',
    title: 'E RIDE PRO SR Off Road | Kasta Ventures България',
    titleBg: 'E RIDE PRO SR Офроуд | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SR Off Road — 25 kW peak, 113 km/h, 0–48 km/h in 1.8 s. The flagship. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SR Офроуд — 25 kW пикова, 113 km/h, 0–48 km/h за 1,8 сек. Флагманът. Kasta Ventures — официален представител за България.',
    tagline: 'The flagship. 25 kW peak and 630 Nm at the wheel.',
    taglineBg: 'Флагманът. 25 kW пикова мощност и 630 Nm на колелото.',
    description: `The SR is the top of the range and it does not pretend otherwise: 10 kW rated, 25 kW peak, 630 Nm at the wheel and 0–48 km/h in 1.8 seconds.\n\nThe 3600 Wh Samsung 50S pack is swappable, so a second battery doubles your day. FASTACE suspension with 220 mm of fork travel, DOT4 hydraulics on 220 mm discs front and rear, an RK racing chain and a CNC-machined 7075 sprocket.\n\nThe off-road version is not registered and runs 19"/16" Fatty knobby tyres.`,
    descriptionBg: `SR е върхът на гамата и не се прави на друго: 10 kW номинална, 25 kW пикова, 630 Nm на колелото и 0–48 km/h за 1,8 секунди.\n\nПакетът Samsung 50S от 3600 Wh е сменяем, тоест втора батерия удвоява деня ти. Окачване FASTACE с ход 220 mm отпред, хидравлика DOT4 на дискове 220 mm отпред и отзад, състезателна верига RK и CNC фрезовано зъбно колело 7075.\n\nОфроуд версията не се регистрира и върти Fatty крос гуми 19"/16".`,
    specs: [
      homologationGroup({ topSpeed: '113 km/h', ...OFF_ROAD_LABELS, ...FATTY_19_16 }),
      SR_POWERTRAIN,
      SR_CHASSIS,
      SR_DIMENSIONS,
    ],
    faq: [FAQ_OFFROAD_WHERE, FAQ_WARRANTY],
    filters: ['all', 'sr', 'off-road'],
  },
  {
    id: 'sr-l1e',
    slug: 'sr-l1e',
    family: 'sr',
    familyLabel: 'SR',
    version: 'l1e',
    name: 'E RIDE PRO SR — L1e Road Legal',
    nameBg: 'E RIDE PRO SR — L1e пътен',
    category: 'SR',
    price: '€7,499.00',
    published: true,
    image: '/images/kasta/sr-l1e-main.webp',
    galleryCount: 17,
    alt: 'E RIDE PRO SR L1e пътен електрически мотор',
    title: 'E RIDE PRO SR L1e — пътен мопед | Kasta Ventures България',
    titleBg: 'E RIDE PRO SR L1e — пътен мопед | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SR L1e — the flagship, homologated as a moped. 45 km/h, AM licence. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SR L1e — флагманът, хомологиран като мопед. 45 km/h, книжка AM. Kasta Ventures — официален представител за България.',
    tagline: 'The flagship, homologated as a moped.',
    taglineBg: 'Флагманът, хомологиран като мопед.',
    description: `The SR L1e is the flagship with road equipment and an L1e certificate: lights, mirrors, indicators, plate holder and dual-sport tyres, limited to 45 km/h.\n\nUnderneath, nothing is given up — the same 25 kW motor, the same 3600 Wh pack and the same FASTACE suspension. An AM licence from 16 is all it asks for.`,
    descriptionBg: `SR L1e е флагманът с пътно оборудване и сертификат L1e: светлини, огледала, мигачи, поставка за номер и dual sport гуми, ограничен до 45 km/h.\n\nОтдолу нищо не е орязано — същият двигател от 25 kW, същият пакет от 3600 Wh и същото окачване FASTACE. Иска само книжка AM от 16 г.`,
    specs: [
      homologationGroup({ topSpeed: '45 km/h', ...L1E_LABELS, ...DUAL_SPORT_19_18 }),
      SR_POWERTRAIN,
      SR_CHASSIS,
      SR_DIMENSIONS,
    ],
    faq: [FAQ_L1E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'sr', 'l1e'],
  },
  {
    id: 'sr-l3e',
    slug: 'sr-l3e',
    family: 'sr',
    familyLabel: 'SR',
    version: 'l3e',
    name: 'E RIDE PRO SR — L3e Road Legal',
    nameBg: 'E RIDE PRO SR — L3e пътен',
    category: 'SR',
    published: false,
    image: '/images/kasta/sr-l3e-main.webp',
    gallerySlug: 'sr-l1e',
    galleryCount: 17,
    alt: 'E RIDE PRO SR L3e пътен електрически мотоциклет',
    title: 'E RIDE PRO SR L3e — лек мотоциклет | Kasta Ventures България',
    titleBg: 'E RIDE PRO SR L3e — лек мотоциклет | Kasta Ventures България',
    metaDesc: 'E RIDE PRO SR L3e — the flagship as a light motorcycle. 80 km/h, A1 licence. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO SR L3e — флагманът като лек мотоциклет. 80 km/h, книжка A1. Kasta Ventures — официален представител за България.',
    tagline: 'The flagship, homologated as a light motorcycle. 80 km/h.',
    taglineBg: 'Флагманът, хомологиран като лек мотоциклет. 80 km/h.',
    description: `The SR L3e is the flagship with a light motorcycle certificate. The limiter sits at 80 km/h instead of 45, which asks for an A1 licence and gives back the roads a moped has no business on.`,
    descriptionBg: `SR L3e е флагманът със сертификат за лек мотоциклет. Ограничителят е на 80 km/h вместо на 45, което иска книжка A1 и връща пътищата, по които мопедът няма работа.`,
    specs: [
      homologationGroup({ topSpeed: '80 km/h', ...L3E_LABELS, ...DUAL_SPORT_19_18 }),
      SR_POWERTRAIN,
      SR_CHASSIS,
      SR_DIMENSIONS,
    ],
    faq: [FAQ_L3E_LICENCE, FAQ_REGISTRATION, FAQ_WARRANTY],
    filters: ['all', 'sr', 'l3e'],
  },

  /* ------------------------------------------------------------------ Mini */
  {
    id: 'mini-r-72v',
    slug: 'mini-r-72v',
    family: 'mini',
    familyLabel: 'Mini',
    version: 'off-road',
    name: 'E RIDE PRO Mini R 72V — Off Road',
    nameBg: 'E RIDE PRO Mini R 72V — Офроуд',
    category: 'Mini',
    price: '€3,960.00',
    published: true,
    image: '/images/kasta/mini-main.png',
    galleryCount: 5,
    alt: 'E RIDE PRO Mini R 72V електрически мотор',
    title: 'E RIDE PRO Mini R 72V | Kasta Ventures България',
    titleBg: 'E RIDE PRO Mini R 72V | Kasta Ventures България',
    metaDesc: 'E RIDE PRO Mini R 72V — 8 kW peak in a compact frame. Off-road only. Kasta Ventures, official representative for Bulgaria.',
    metaDescBg: 'E RIDE PRO Mini R 72V — 8 kW пикова в компактна рамка. Само офроуд. Kasta Ventures — официален представител за България.',
    tagline: 'Small frame, real power. Off-road only.',
    taglineBg: 'Малка рамка, истинска мощност. Само офроуд.',
    description: `The Mini R is the way into the E RIDE PRO world. Power and top speed are adjustable, so a child can start slowly and an adult can still have 8 kW of fun on the same bike.\n\nNo hot exhaust to burn a leg on, no carburettor to clean, and quiet enough to keep the neighbours friendly. It fits in the boot of a car and makes an excellent pit bike.\n\nThe Mini is sold in the off-road version only — it is not registered for the road.`,
    descriptionBg: `Mini R е входът към света на E RIDE PRO. Мощността и максималната скорост се настройват, така че дете може да тръгне бавно, а възрастен пак да си направи удоволствието с 8 kW на същия мотор.\n\nНяма горещ ауспух, в който да се опариш, няма карбуратор за чистене, а е и достатъчно тих, че съседите да останат добри. Влиза в багажника на кола и става за отличен пит байк.\n\nMini се предлага само в офроуд версия — не се регистрира за път.`,
    specs: MINI_SPECS,
    faq: [
      FAQ_OFFROAD_WHERE,
      {
        q: 'Is it suitable for a child?',
        qBg: 'Става ли за дете?',
        a: 'Yes — power and top speed are adjustable, so it can be set low while a young rider learns and opened up later.',
        aBg: 'Да — мощността и максималната скорост се настройват, тоест може да се свали ниско, докато детето се учи, и да се отпуши по-късно.',
      },
      FAQ_WARRANTY,
    ],
    filters: ['all', 'mini', 'off-road'],
  },
]

/** Само моделите, които се показват публично. */
export const publishedProducts = products.filter((product) => product.published)

/** Реда, в който се подреждат семействата — от най-достъпното към флагмана. */
export const familyOrder: FamilyKey[] = ['ss-25', 'ss-30', 'sr', 'mini']

export const familyLabels: Record<FamilyKey, string> = {
  'ss-25': 'SS 2.5',
  'ss-30': 'SS 3.0',
  sr: 'SR',
  mini: 'Mini',
}

export const versionLabels: Record<VersionKey, { label: string; labelBg: string }> = {
  'off-road': { label: 'Off Road', labelBg: 'Офроуд' },
  l1e: { label: 'L1e · moped', labelBg: 'L1e · мопед' },
  l3e: { label: 'L3e · light motorcycle', labelBg: 'L3e · лек мотоциклет' },
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductGallery(product: Pick<Product, 'slug' | 'galleryCount' | 'gallerySlug'>): string[] {
  const folder = product.gallerySlug ?? product.slug
  return Array.from({ length: product.galleryCount }, (_, index) => {
    const fileNumber = String(index + 1).padStart(2, '0')
    return `/images/kasta/gallery/${folder}/${fileNumber}.webp`
  })
}

/** Ред от техническата таблица, търсен по етикет — за компактните карти. */
export function findSpec(product: Product, label: string): SpecRow | undefined {
  for (const group of product.specs) {
    const row = group.rows.find((item) => item.label === label)
    if (row) return row
  }
  return undefined
}
