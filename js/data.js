/* =========================================================
   UNCLE TOM — Mock data (demo only)
   In production this would come from the backend API.
   ========================================================= */

const IMG = {
  hero: 'assets/img/hero_observatory.jpg',
  milky: 'assets/img/milky_way.jpg',
  galaxy: 'assets/img/deep_galaxy.jpg',
  mountain: 'assets/img/mountain_stargazing.jpg',
  privateScope: 'assets/img/private_telescope.jpg',
  astro: 'assets/img/astrophotography.jpg',
  interior: 'assets/img/observatory_interior.jpg',
  ladakh: 'assets/img/dest_ladakh.jpg',
  atacama: 'assets/img/dest_atacama.jpg',
  canary: 'assets/img/dest_canary.jpg',
  hawaii: 'assets/img/dest_hawaii.jpg',
  rajasthan: 'assets/img/dest_rajasthan.jpg',
  outback: 'assets/img/dest_outback.jpg',
};

/* ---------------- Destinations ---------------- */
const DESTINATIONS = [
  {
    id: 'ladakh', name: 'Ladakh', country: 'India', image: IMG.ladakh,
    observatories: 4, skyRating: 9.8, bortle: 1, altitude: '4,500 m',
    desc: 'Home to Asia\'s first Dark Sky Reserve at Hanle — thin air, zero light pollution and 270+ clear nights a year.',
  },
  {
    id: 'atacama', name: 'Atacama Desert', country: 'Chile', image: IMG.atacama,
    observatories: 7, skyRating: 9.9, bortle: 1, altitude: '5,000 m',
    desc: 'The driest non-polar desert on Earth and the astronomy capital of the world. See the Magellanic Clouds.',
  },
  {
    id: 'canary', name: 'Canary Islands', country: 'Spain', image: IMG.canary,
    observatories: 5, skyRating: 9.5, bortle: 2, altitude: '2,396 m',
    desc: 'Observatories perched above a sea of clouds on La Palma — a protected Starlight Reserve.',
  },
  {
    id: 'hawaii', name: 'Hawaii', country: 'USA', image: IMG.hawaii,
    observatories: 6, skyRating: 9.6, bortle: 1, altitude: '4,207 m',
    desc: 'Mauna Kea\'s summit sits above 40% of Earth\'s atmosphere — sunset above the clouds, then pure darkness.',
  },
  {
    id: 'rajasthan', name: 'Rajasthan', country: 'India', image: IMG.rajasthan,
    observatories: 3, skyRating: 9.1, bortle: 2, altitude: '225 m',
    desc: 'Luxury desert camps in the Thar near Jaisalmer, with golden dunes under a blazing Milky Way.',
  },
  {
    id: 'outback', name: 'Australian Outback', country: 'Australia', image: IMG.outback,
    observatories: 4, skyRating: 9.7, bortle: 1, altitude: '520 m',
    desc: 'The southern Milky Way arching over ancient red rock — some of the darkest skies in the Southern Hemisphere.',
  },
];

/* ---------------- Telescopes ---------------- */
// optics: used to draw SVG optical diagrams  ->  'sct' | 'cdk' | 'refractor' | 'newtonian'
const TELESCOPES = [
  {
    id: 'celestron-edgehd', name: 'Celestron EdgeHD 14"', brand: 'Celestron', type: 'Schmidt-Cassegrain',
    optics: 'sct', aperture: 356, focalLength: 3910, mount: 'CGX-L Equatorial (GoTo)', weight: '20.4 kg',
    observatoryId: 'outback-skies', image: IMG.mountain, rating: 4.9, reviews: 318, available: true,
    sessionPrice: 5499, bestFor: ['Planets', 'Galaxies', 'Globular clusters'],
    blurb: 'Aplanatic Schmidt optics deliver a perfectly flat, coma-free field — razor sharp from centre to edge.',
  },
  {
    id: 'planewave-cdk24', name: 'PlaneWave CDK24', brand: 'PlaneWave', type: 'Corrected Dall-Kirkham',
    optics: 'cdk', aperture: 610, focalLength: 3962, mount: 'L-600 Direct Drive', weight: '108 kg',
    observatoryId: 'atacama-altiplano', image: IMG.interior, rating: 5.0, reviews: 204, available: true,
    sessionPrice: 14999, bestFor: ['Deep sky', 'Galaxies', 'Research-grade imaging'],
    blurb: 'A professional observatory instrument used by universities worldwide. Breathtaking deep-sky views.',
  },
  {
    id: 'meade-lx200', name: 'Meade LX200 16" ACF', brand: 'Meade', type: 'Schmidt-Cassegrain (ACF)',
    optics: 'sct', aperture: 406, focalLength: 4064, mount: 'Heavy-duty Fork (GoTo)', weight: '144 kg',
    observatoryId: 'roque-visitor', image: IMG.hero, rating: 4.8, reviews: 412, available: true,
    sessionPrice: 6999, bestFor: ['Moon', 'Planets', 'Nebulae'],
    blurb: 'Advanced Coma-Free optics on a rock-solid fork mount — the classic observatory workhorse.',
  },
  {
    id: 'takahashi-fsq', name: 'Takahashi FSQ-106EDX4', brand: 'Takahashi', type: 'Apochromatic Refractor',
    optics: 'refractor', aperture: 106, focalLength: 530, mount: 'EM-200 Temma3', weight: '6.9 kg',
    observatoryId: 'thar-star-camp', image: IMG.privateScope, rating: 4.9, reviews: 276, available: true,
    sessionPrice: 4499, bestFor: ['Astrophotography', 'Wide-field nebulae', 'Star clusters'],
    blurb: 'Legendary Petzval quadruplet with fluorite elements — the astrophotographer\'s dream instrument.',
  },
  {
    id: 'dobsonian-30', name: 'Obsession 30" Dobsonian', brand: 'Obsession', type: 'Dobsonian Reflector',
    optics: 'newtonian', aperture: 762, focalLength: 2540, mount: 'Alt-Az Dobsonian (tracking)', weight: '135 kg',
    observatoryId: 'hanle-dark-sky', image: IMG.astro, rating: 4.9, reviews: 389, available: false,
    sessionPrice: 3999, bestFor: ['Faint galaxies', 'Nebula detail', 'Visual observing'],
    blurb: 'A giant light bucket. Climb the ladder and see spiral arms in galaxies millions of light-years away.',
  },
];

// derived optical specs
TELESCOPES.forEach((t) => {
  t.focalRatio = (t.focalLength / t.aperture).toFixed(1);
  t.lightGathering = Math.round((t.aperture / 7) ** 2); // vs. dark-adapted human eye
  t.maxMag = t.aperture * 2;
  t.limitingMag = (7.5 + 5 * Math.log10(t.aperture / 10)).toFixed(1); // approx. faintest star visible
  t.resolution = (116 / t.aperture).toFixed(2); // Dawes limit (arcsec)
});

/* ---------------- Observatories ---------------- */
const OBSERVATORIES = [
  {
    id: 'hanle-dark-sky', name: 'Hanle Dark Sky Observatory', location: 'Hanle, Ladakh', country: 'India',
    region: 'Asia', destination: 'ladakh', image: IMG.ladakh, rating: 4.96, reviews: 2140, priceFrom: 3499,
    availability: 'Available Tonight', telescopeTypes: ['Dobsonian', 'Reflector'],
    experienceTypes: ['Guided Tour', 'Naked Eye', 'Deep Sky'], telescopes: ['dobsonian-30'],
    telescopeInfo: '30" Dobsonian + 6 visitor telescopes', altitude: '4,500 m', bortle: 1,
  },
  {
    id: 'atacama-altiplano', name: 'Atacama Altiplano Observatory', location: 'San Pedro de Atacama', country: 'Chile',
    region: 'South America', destination: 'atacama', image: IMG.atacama, rating: 4.98, reviews: 1873, priceFrom: 11999,
    availability: 'Limited Slots', telescopeTypes: ['Dall-Kirkham', 'Reflector'],
    experienceTypes: ['Deep Sky', 'Private Session', 'Guided Tour'], telescopes: ['planewave-cdk24'],
    telescopeInfo: 'PlaneWave CDK24 + 10 visitor telescopes', altitude: '2,450 m', bortle: 1,
  },
  {
    id: 'roque-visitor', name: 'Roque de los Muchachos Centre', location: 'La Palma, Canary Islands', country: 'Spain',
    region: 'Europe', destination: 'canary', image: IMG.canary, rating: 4.93, reviews: 1562, priceFrom: 7999,
    availability: 'Available Tonight', telescopeTypes: ['Schmidt-Cassegrain', 'Reflector'],
    experienceTypes: ['Guided Tour', 'Private Session'], telescopes: ['meade-lx200'],
    telescopeInfo: 'Meade LX200 16" ACF + solar telescopes', altitude: '2,396 m', bortle: 2,
  },
  {
    id: 'mauna-kea', name: 'Mauna Kea Summit Experience', location: 'Big Island, Hawaii', country: 'USA',
    region: 'North America', destination: 'hawaii', image: IMG.hawaii, rating: 4.94, reviews: 3011, priceFrom: 9999,
    availability: 'Limited Slots', telescopeTypes: ['Schmidt-Cassegrain', 'Refractor'],
    experienceTypes: ['Guided Tour', 'Naked Eye'], telescopes: ['meade-lx200'],
    telescopeInfo: '11" & 14" portable telescopes at 4,200 m', altitude: '4,207 m', bortle: 1,
  },
  {
    id: 'thar-star-camp', name: 'Thar Desert Star Camp', location: 'Jaisalmer, Rajasthan', country: 'India',
    region: 'Asia', destination: 'rajasthan', image: IMG.rajasthan, rating: 4.89, reviews: 984, priceFrom: 2999,
    availability: 'Available Tonight', telescopeTypes: ['Refractor', 'Dobsonian'],
    experienceTypes: ['Astrophotography', 'Naked Eye', 'Guided Tour'], telescopes: ['takahashi-fsq'],
    telescopeInfo: 'Takahashi FSQ-106 + imaging rigs', altitude: '225 m', bortle: 2,
  },
  {
    id: 'outback-skies', name: 'Outback Skies Observatory', location: 'Red Centre, Northern Territory', country: 'Australia',
    region: 'Oceania', destination: 'outback', image: IMG.outback, rating: 4.95, reviews: 1290, priceFrom: 8499,
    availability: 'Fully Booked', telescopeTypes: ['Schmidt-Cassegrain'],
    experienceTypes: ['Deep Sky', 'Guided Tour', 'Astrophotography'], telescopes: ['celestron-edgehd'],
    telescopeInfo: 'Celestron EdgeHD 14" + binocular stations', altitude: '520 m', bortle: 1,
  },
  {
    id: 'spiti-highland', name: 'Spiti Highland Observatory', location: 'Kaza, Spiti Valley', country: 'India',
    region: 'Asia', destination: 'ladakh', image: IMG.mountain, rating: 4.87, reviews: 742, priceFrom: 4999,
    availability: 'Available Tonight', telescopeTypes: ['Refractor', 'Dobsonian'],
    experienceTypes: ['Naked Eye', 'Guided Tour'], telescopes: ['dobsonian-30'],
    telescopeInfo: '12" Dobsonian + 4" refractors', altitude: '3,800 m', bortle: 1,
  },
  {
    id: 'celestia-private', name: 'Celestia Private Observatory', location: 'Coorg, Karnataka', country: 'India',
    region: 'Asia', destination: 'rajasthan', image: IMG.interior, rating: 4.97, reviews: 468, priceFrom: 15999,
    availability: 'Limited Slots', telescopeTypes: ['Dall-Kirkham', 'Refractor'],
    experienceTypes: ['Private Session', 'Deep Sky', 'Astrophotography'], telescopes: ['planewave-cdk24', 'takahashi-fsq'],
    telescopeInfo: 'PlaneWave CDK24 under a 5 m dome', altitude: '1,150 m', bortle: 3,
  },
];

/* ---------------- Experiences ---------------- */
const EXPERIENCES = [
  {
    id: 'milky-way-observation', title: 'Milky Way Observation', category: 'Naked Eye',
    location: 'Hanle, Ladakh', destination: 'ladakh', observatoryId: 'hanle-dark-sky', telescopeId: 'dobsonian-30',
    rating: 4.97, reviews: 1284, price: 4499, duration: '3 hours', maxGuests: 12,
    image: IMG.milky, gallery: [IMG.milky, IMG.ladakh, IMG.mountain, IMG.galaxy, IMG.hero],
    tagline: 'Watch the galactic core rise over the Himalayas from India\'s darkest sky.',
    description: 'Lie back on heated loungers at 4,500 m as our astronomer guides you through the Milky Way — from the dusty lanes of Sagittarius to the Andromeda Galaxy, 2.5 million light-years away. Laser-guided constellation storytelling, followed by close-up views through a giant 30-inch Dobsonian telescope.',
    targets: ['Milky Way core', 'Andromeda Galaxy (M31)', 'Saturn & its rings', 'Pleiades (M45)'],
    badge: 'Bestseller',
  },
  {
    id: 'deep-sky-galaxy-tour', title: 'Deep Sky Galaxy Tour', category: 'Deep Sky',
    location: 'Atacama Desert, Chile', destination: 'atacama', observatoryId: 'atacama-altiplano', telescopeId: 'planewave-cdk24',
    rating: 4.95, reviews: 862, price: 12999, duration: '4 hours', maxGuests: 8,
    image: IMG.galaxy, gallery: [IMG.galaxy, IMG.atacama, IMG.interior, IMG.milky, IMG.hero],
    tagline: 'Journey to galaxies millions of light-years away through a research-grade telescope.',
    description: 'Guided by a professional astronomer, explore spiral galaxies, nebulae and globular clusters through the PlaneWave CDK24 — an instrument used by universities. Includes live camera imaging, so you leave with your own deep-sky photograph.',
    targets: ['Whirlpool Galaxy (M51)', 'Omega Centauri', 'Carina Nebula', 'Large Magellanic Cloud'],
    badge: 'Premium',
  },
  {
    id: 'mountain-stargazing', title: 'Mountain Stargazing Camp', category: 'Adventure',
    location: 'Spiti Valley, Himachal', destination: 'ladakh', observatoryId: 'spiti-highland', telescopeId: 'dobsonian-30',
    rating: 4.89, reviews: 643, price: 6999, duration: 'Overnight', maxGuests: 10,
    image: IMG.mountain, gallery: [IMG.mountain, IMG.milky, IMG.ladakh, IMG.galaxy, IMG.hero],
    tagline: 'Sleep under the stars at 3,800 m with snow peaks glowing in starlight.',
    description: 'An overnight high-altitude camp with heated tents, a campfire dinner, and an all-night observing session. Wake up at 4 AM for the pre-dawn planets, then watch sunrise light up the Himalayan peaks.',
    targets: ['Jupiter & Galilean moons', 'Orion Nebula (M42)', 'Double Cluster', 'Meteor sightings'],
    badge: 'Adventure',
  },
  {
    id: 'private-telescope', title: 'Private Telescope Experience', category: 'Private',
    location: 'La Palma, Canary Islands', destination: 'canary', observatoryId: 'roque-visitor', telescopeId: 'meade-lx200',
    rating: 4.98, reviews: 412, price: 18999, duration: '2.5 hours', maxGuests: 4,
    image: IMG.privateScope, gallery: [IMG.privateScope, IMG.canary, IMG.interior, IMG.galaxy, IMG.milky],
    tagline: 'Your own astronomer, your own telescope, on a luxury terrace above the clouds.',
    description: 'An intimate, fully private session for up to four guests. Champagne and gourmet canapés on a heated terrace, a personal astronomer, and exclusive access to a 16-inch observatory telescope. Perfect for proposals and anniversaries.',
    targets: ['Lunar craters close-up', 'Ring Nebula (M57)', 'Albireo double star', 'Saturn'],
    badge: 'Luxury',
  },
  {
    id: 'astrophotography-night', title: 'Astrophotography Night', category: 'Photography',
    location: 'Jaisalmer, Rajasthan', destination: 'rajasthan', observatoryId: 'thar-star-camp', telescopeId: 'takahashi-fsq',
    rating: 4.92, reviews: 538, price: 8499, duration: '5 hours', maxGuests: 6,
    image: IMG.astro, gallery: [IMG.astro, IMG.rajasthan, IMG.milky, IMG.galaxy, IMG.privateScope],
    tagline: 'Capture star trails and the Milky Way over golden dunes with a pro photographer.',
    description: 'A hands-on workshop for all skill levels. Learn camera settings, composition and tracking, then shoot through a Takahashi FSQ-106 imaging rig. Includes a post-processing session and edited files delivered to your inbox.',
    targets: ['Star trails around Polaris', 'Milky Way panorama', 'Andromeda Galaxy', 'Orion Nebula'],
    badge: 'Workshop',
  },
  {
    id: 'guided-observatory-tour', title: 'Guided Observatory Tour', category: 'Guided Tour',
    location: 'Mauna Kea, Hawaii', destination: 'hawaii', observatoryId: 'mauna-kea', telescopeId: 'meade-lx200',
    rating: 4.94, reviews: 1907, price: 9999, duration: '3.5 hours', maxGuests: 15,
    image: IMG.interior, gallery: [IMG.interior, IMG.hawaii, IMG.hero, IMG.galaxy, IMG.milky],
    tagline: 'Go behind the scenes of a working observatory, then stargaze above the clouds.',
    description: 'Tour a working research observatory, watch the sunset from 4,200 m above a sea of clouds, and enjoy guided stargazing through professional telescopes. Hot drinks and arctic parkas provided.',
    targets: ['Sunset above the clouds', 'Southern Cross', 'Jupiter', 'Globular cluster M13'],
    badge: 'Popular',
  },
  {
    id: 'outback-safari', title: 'Outback Dark Sky Safari', category: 'Deep Sky',
    location: 'Red Centre, Australia', destination: 'outback', observatoryId: 'outback-skies', telescopeId: 'celestron-edgehd',
    rating: 4.93, reviews: 721, price: 10999, duration: '4 hours', maxGuests: 10,
    image: IMG.outback, gallery: [IMG.outback, IMG.galaxy, IMG.milky, IMG.mountain, IMG.hero],
    tagline: 'The southern Milky Way over ancient red rock, told through Aboriginal sky stories.',
    description: 'Combine Indigenous astronomy storytelling with telescope views of southern sky treasures. A bush-tucker dinner under the stars precedes a guided session with a Celestron EdgeHD 14".',
    targets: ['Emu in the Sky', 'Jewel Box Cluster', 'Eta Carinae', 'Small Magellanic Cloud'],
    badge: 'Cultural',
  },
  {
    id: 'southern-skies', title: 'Southern Skies & Magellanic Clouds', category: 'Naked Eye',
    location: 'Atacama Desert, Chile', destination: 'atacama', observatoryId: 'atacama-altiplano', telescopeId: 'planewave-cdk24',
    rating: 4.91, reviews: 455, price: 7499, duration: '3 hours', maxGuests: 14,
    image: IMG.atacama, gallery: [IMG.atacama, IMG.galaxy, IMG.interior, IMG.milky, IMG.hero],
    tagline: 'See two neighbouring galaxies with your naked eye in the driest desert on Earth.',
    description: 'A naked-eye and binocular tour of the southern hemisphere\'s finest sights, followed by telescope views. Ideal for first-time stargazers and families.',
    targets: ['Large & Small Magellanic Clouds', 'Southern Cross', 'Tarantula Nebula', '47 Tucanae'],
    badge: 'Family',
  },
  {
    id: 'above-the-clouds', title: 'Sunset & Stars Above the Clouds', category: 'Guided Tour',
    location: 'Mauna Kea, Hawaii', destination: 'hawaii', observatoryId: 'mauna-kea', telescopeId: 'meade-lx200',
    rating: 4.96, reviews: 1123, price: 11499, duration: '6 hours', maxGuests: 12,
    image: IMG.hawaii, gallery: [IMG.hawaii, IMG.canary, IMG.interior, IMG.galaxy, IMG.milky],
    tagline: 'Golden-hour summit views followed by an unforgettable night of stargazing.',
    description: 'Ride a 4x4 to the summit for sunset above the clouds, then descend to 2,800 m for a guided stargazing session with hot dinner and premium telescopes.',
    targets: ['Sunset & Earth\'s shadow', 'Orion Nebula', 'Pleiades', 'Saturn'],
    badge: 'Signature',
  },
];

const EXP_CATEGORIES = ['All', 'Naked Eye', 'Deep Sky', 'Private', 'Photography', 'Guided Tour', 'Adventure'];

const INCLUDED = [
  'Professional astronomer guide', 'Premium telescope access', 'Hot beverages & snacks',
  'Thermal blankets & parkas', 'Laser-guided constellation tour', 'Digital star map & photo souvenir',
];
const BRING = [
  'Warm layers — temperatures drop fast at night', 'Comfortable closed shoes',
  'Red-light torch (we can provide one)', 'Camera or smartphone with night mode', 'Valid ID for park entry',
];

/* ---------------- Events ---------------- */
// art: 'img' uses image; 'eclipse' | 'sun' use CSS-rendered covers
const EVENTS = [
  {
    id: 'solar-observation-day', title: 'Solar Observation Day', date: '2026-10-24', time: '10:00 AM',
    location: 'Roque de los Muchachos, La Palma', observatoryId: 'roque-visitor', duration: '4 hours',
    seats: 40, booked: 26, price: 2499, art: 'sun', category: 'Solar',
    desc: 'Safely observe sunspots, solar flares and prominences through H-alpha solar telescopes.',
  },
  {
    id: 'new-moon-stargazing', title: 'New Moon Stargazing', date: '2026-11-09', time: '8:00 PM',
    location: 'Hanle, Ladakh', observatoryId: 'hanle-dark-sky', duration: '5 hours',
    seats: 60, booked: 51, price: 3999, art: 'img', image: IMG.milky, category: 'Dark Sky',
    desc: 'The darkest night of the month — perfect for the faintest galaxies and the Milky Way at its best.',
  },
  {
    id: 'deep-sky-weekend', title: 'Deep Sky Weekend', date: '2026-11-13', endDate: '2026-11-15', time: '7:30 PM',
    location: 'Atacama Desert, Chile', observatoryId: 'atacama-altiplano', duration: '3 nights',
    seats: 24, booked: 19, price: 34999, art: 'img', image: IMG.galaxy, category: 'Retreat',
    desc: 'A three-night retreat with research telescopes, astronomer talks and luxury desert lodging.',
  },
  {
    id: 'astrophotography-workshop', title: 'Astrophotography Workshop', date: '2026-12-05', time: '6:30 PM',
    location: 'Jaisalmer, Rajasthan', observatoryId: 'thar-star-camp', duration: '6 hours',
    seats: 20, booked: 8, price: 7999, art: 'img', image: IMG.astro, category: 'Workshop',
    desc: 'Master Milky Way and deep-sky photography with award-winning astrophotographers.',
  },
  {
    id: 'geminid-meteor-shower', title: 'Geminid Meteor Shower', date: '2026-12-13', time: '9:00 PM',
    location: 'Spiti Valley, Himachal', observatoryId: 'spiti-highland', duration: 'All night',
    seats: 50, booked: 37, price: 4999, art: 'meteor', image: IMG.mountain, category: 'Meteor Shower',
    desc: 'The year\'s richest meteor shower — up to 120 meteors per hour from a high-altitude camp.',
  },
  {
    id: 'lunar-eclipse-night', title: 'Lunar Eclipse Night', date: '2027-02-20', time: '10:30 PM',
    location: 'Mauna Kea, Hawaii', observatoryId: 'mauna-kea', duration: '4 hours',
    seats: 80, booked: 44, price: 5999, art: 'eclipse', category: 'Eclipse',
    desc: 'Watch the Moon slip into Earth\'s shadow with live telescope views and expert commentary.',
  },
  {
    id: 'perseid-meteor-shower', title: 'Perseid Meteor Shower', date: '2027-08-12', time: '10:00 PM',
    location: 'Red Centre, Australia', observatoryId: 'outback-skies', duration: 'All night',
    seats: 70, booked: 22, price: 5499, art: 'meteor', image: IMG.outback, category: 'Meteor Shower',
    desc: 'Lie back under outback skies as the Perseids streak overhead — up to 100 meteors per hour.',
  },
];

/* ---------------- Reviews ---------------- */
const REVIEWS = [
  { name: 'Ananya R.', city: 'Bengaluru', rating: 5, date: 'Sep 2026', text: 'Seeing Saturn\'s rings with my own eyes made me tear up. The guide was incredible and the booking was effortless.' },
  { name: 'Daniel K.', city: 'London', rating: 5, date: 'Aug 2026', text: 'Felt like a luxury travel brand, not a tour. Every detail — from the blankets to the hot chocolate — was perfect.' },
  { name: 'Meera S.', city: 'Mumbai', rating: 5, date: 'Aug 2026', text: 'The sky-conditions forecast was spot on. We rescheduled once for free and got a perfectly clear night.' },
];

/* ---------------- Sky conditions (mock "tonight" forecast per destination) ---------------- */
const CONDITIONS = {
  ladakh:    { cloud: 3,  visibility: 48, temp: -4, humidity: 18, wind: 9,  seeing: 0.6, seeingScore: 5, bortle: 1, transparency: 'Excellent' },
  atacama:   { cloud: 0,  visibility: 60, temp: 6,  humidity: 6,  wind: 12, seeing: 0.5, seeingScore: 5, bortle: 1, transparency: 'Exceptional' },
  canary:    { cloud: 12, visibility: 35, temp: 8,  humidity: 34, wind: 18, seeing: 0.8, seeingScore: 4, bortle: 2, transparency: 'Very Good' },
  hawaii:    { cloud: 8,  visibility: 42, temp: 3,  humidity: 22, wind: 15, seeing: 0.7, seeingScore: 5, bortle: 1, transparency: 'Excellent' },
  rajasthan: { cloud: 15, visibility: 28, temp: 17, humidity: 30, wind: 7,  seeing: 1.2, seeingScore: 4, bortle: 2, transparency: 'Good' },
  outback:   { cloud: 5,  visibility: 50, temp: 14, humidity: 20, wind: 10, seeing: 0.9, seeingScore: 4, bortle: 1, transparency: 'Excellent' },
};

/* ---------------- Partner Portal Mock Data (Slide 2 & 4) ---------------- */
const PARTNER_DATA = {
  observatory: {
    name: 'Hanle Dark Sky Reserve Observatory',
    location: 'Hanle, Ladakh, India (4,500m)',
    bortle: 1,
    status: 'Operational · Clear Skies',
    activeTelescopes: 4,
    totalBookingsMonth: 148,
    revenueMonth: 584000,
  },
  upcomingSlots: [
    { id: 'SL-101', time: 'Tonight 08:30 PM', exp: 'Milky Way Observation', guests: '8 / 12 booked', status: 'Confirmed', revenue: '₹35,992' },
    { id: 'SL-102', time: 'Tonight 11:00 PM', exp: 'Deep Sky Galaxy Tour', guests: '6 / 8 booked', status: 'Confirmed', revenue: '₹77,994' },
    { id: 'SL-103', time: 'Tomorrow 09:00 PM', exp: 'Private Telescope Session', guests: '4 / 4 (Sold Out)', status: 'Confirmed', revenue: '₹75,996' },
    { id: 'SL-104', time: 'Tomorrow 11:30 PM', exp: 'Astrophotography Night', guests: '5 / 6 booked', status: 'Open', revenue: '₹42,495' },
  ],
  telescopeFleet: [
    { name: 'Obsession 30" Dobsonian', type: 'Deep Sky Light Bucket', status: 'Online', calibDate: '07 Oct 2026', health: '100%' },
    { name: 'Celestron EdgeHD 14"', type: 'Planetary GoTo SCT', status: 'Online', calibDate: '06 Oct 2026', health: '98%' },
    { name: 'Takahashi FSQ-106EDX4', type: 'Fluorite Astrograph', status: 'Online', calibDate: '05 Oct 2026', health: '100%' },
    { name: 'Solar H-Alpha Scope 90mm', type: 'Daytime Solar Prominence', status: 'Standby', calibDate: '04 Oct 2026', health: '95%' },
  ]
};

/* ---------------- Admin Dashboard Mock Data (Slide 2, 3, 6 & 13) ---------------- */
const ADMIN_DATA = {
  kpis: {
    totalRevenue: '₹24,85,600',
    totalBookings: '1,420',
    partnerObservatories: '38 Active',
    avgRating: '4.94 / 5.0'
  },
  microservices: [
    { name: 'Booking Engine (EKS)', status: 'Healthy', latency: '32ms', p99: '45ms', traffic: '180 req/s' },
    { name: 'Payment Service (Razorpay/Stripe)', status: 'Healthy', latency: '120ms', p99: '185ms', traffic: '42 req/s' },
    { name: 'Astronomy & Weather Service (NASA/OpenWeather)', status: 'Healthy', latency: '48ms', p99: '65ms', traffic: '240 req/s' },
    { name: 'AI Recommendation Engine (OpenAI API)', status: 'Healthy', latency: '160ms', p99: '210ms', traffic: '55 req/s' },
    { name: 'Kafka Event Bus (Amazon MSK)', status: 'Healthy', latency: '4ms lag', p99: '8ms', traffic: '1.2k msg/s' },
    { name: 'PostgreSQL RDS (Multi-AZ)', status: 'Healthy', latency: '12ms', p99: '20ms', traffic: '450 tps' }
  ],
  liveKafkaEvents: [
    { topic: 'booking.created', payload: 'UT-78A9B2 · Milky Way Tour · Ladakh', time: 'Just now' },
    { topic: 'payment.success', payload: '₹8,998 via UPI (Razorpay)', time: '2m ago' },
    { topic: 'weather.updated', payload: 'Hanle Bortle 1 · Cloud Cover 3%', time: '5m ago' },
    { topic: 'notification.sent', payload: 'SMS & WhatsApp e-ticket dispatched', time: '6m ago' }
  ]
};

/* ---------------- AI Assistant Knowledge Base (Slide 11 & 12) ---------------- */
const AI_FAQ = [
  {
    q: 'Which telescope is best for seeing Saturn\'s rings?',
    a: 'For planetary observation like Saturn\'s rings and Jupiter\'s Great Red Spot, the **Celestron EdgeHD 14"** or **Meade LX200 16"** is ideal! With high focal length (3910mm+) and sharp contrast, you can clearly see the Cassini Division and Saturn\'s moons.'
  },
  {
    q: 'When is the best time to see the Milky Way in Ladakh?',
    a: 'The peak Milky Way core viewing season in Ladakh (Hanle & Spiti) runs from **April to October**. New moon weeks are best because there is zero moonlight to wash out the galactic dust lanes!'
  },
  {
    q: 'What is a Bortle Class 1 sky?',
    a: 'The Bortle Dark-Sky Scale measures light pollution from Class 9 (bright city center) to **Class 1 (pure pristine dark sky)**. At Class 1 sites like Hanle (Ladakh) and Atacama, the Milky Way casts shadows on the ground and distant galaxies are visible to the naked eye!'
  },
  {
    q: 'How does the Clear-Sky Guarantee work?',
    a: 'If cloud cover exceeds 40% during your booked experience, our Clear-Sky Guarantee automatically lets you reschedule to the next clear night for free, or claim a 100% instant refund with one click.'
  }
];

