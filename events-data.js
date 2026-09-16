/* ────────────────────────────────────────────────────────────────────────
   BANCO — Events data
   ────────────────────────────────────────────────────────────────────────
   Both events.html (the listing) and event.html (the single-event page)
   read from this one file. To add a real event, copy the EXAMPLE block
   below, fill in your own values, delete the /* and *­/ comment markers
   around it, and add a comma after the entry before it.

   Fields
   ------
   slug         url-safe id, e.g. "italian-wine-night". Becomes the event's
                address: banco-restaurant.ro/events/<slug>
   title        event name
   tag          short label shown as a pill, e.g. "Tasting", "Live music"
   dateStart    ISO date-time with the Bucharest offset — "+03:00" in
                summer (EEST), "+02:00" in winter (EET), e.g.
                "2026-09-12T19:00:00+03:00". Used to sort the event and to
                decide upcoming vs. past.
   dateEnd      optional, same format. Leave null if there's no end time —
                the event is then treated as over right after it starts.
   location     optional override. Leave null to show the default address
                (One Verdi Park, Barbu Văcărescu 164E, Bucharest).
   excerpt      one or two sentences, shown on the listing card.
   description  the full text shown on the event's own page. Separate
                paragraphs with a blank line (\n\n). Wrap one paragraph in
                asterisks — *like this* — to render it as the italic pull
                quote instead of a regular paragraph.
   cover        path to the main image, used on the card and, if present,
                first in the gallery — e.g. "/img/events/wine-night-1.jpg".
                Always start image paths with "/" (root-relative) — event
                pages live at /events/<slug>, and a path without the
                leading "/" resolves relative to that nested URL instead
                of the site root, so the image silently breaks.
   photos       array of 1 to 3 image paths for the event page gallery.
   youtubeId    optional. The part of a YouTube URL after "v=" — for
                https://www.youtube.com/watch?v=dQw4w9WgXcQ it's
                "dQw4w9WgXcQ". Leave null to skip the video.
   ──────────────────────────────────────────────────────────────────────── */

window.BANCO_DEFAULT_EVENT_LOCATION = "One Verdi Park, Barbu Văcărescu 164E, Bucharest";
window.BANCO_DEFAULT_EVENT_LOCATION_LINES = {
  en: ["BANCO at One Verdi Park", "Barbu Văcărescu 164E, Bucharest"],
  ro: ["BANCO la One Verdi Park", "Barbu Văcărescu 164E, București"]
};
window.BANCO_HOURS_LINE = { en: "10:00 – 22:00, daily", ro: "10:00 – 22:00, zilnic" };

window.BANCO_EVENTS = [

  {
    slug: "bucharest-food-week",
    title: "BANCO is part of Bucharest Food Week",
    tag: "Food Week",
    dateStart: "2026-09-14T10:00:00+03:00",
    dateEnd: "2026-09-20T22:00:00+03:00",
    location: null,
    excerpt: "One week, all across the city. Discover BANCO's special menu created for Bucharest Food Week, 14–20 September.",
    description: "BANCO is part of Bucharest Food Week.\n\nFrom 14 to 20 September, discover our special menu created for the occasion.\n\n*A good first visit should feel like the beginning of a habit.*\n\nBook your table at www.foodweek.ro or directly with us at +40 773 261 721.",
    cover: "/img/events/bucharest-food-week.png",
    photos: ["/img/events/bucharest-food-week.png"],
    youtubeId: null
  },

  {
    slug: "vlada-neagu-1909",
    title: "Vlada Neagu Returns — Live at BANCO",
    tag: "Live Music",
    dateStart: "2026-09-19T18:00:00+03:00",
    dateEnd: null,
    location: null,
    excerpt: "An autumn evening of piano, voice and dinner — Vlada Neagu returns to BANCO. Limited tables available.",
    description: "An autumn evening at BANCO.\n\nVlada Neagu returns this Saturday for an evening of piano, voice and dinner.\n\n*Some evenings are meant to be lingered over.*\n\nLimited tables available. Reservations at +40 773 261 721.",
    cover: "/img/events/vlada-neagu-1809.jpeg",
    photos: ["/img/events/vlada-neagu-1809.jpeg"],
    youtubeId: null
  },

  {
    slug: "vlada-neagu-live",
    title: "Vlada Neagu — Live at BANCO",
    tag: "Live Music",
    dateStart: "2026-08-29T19:00:00+03:00",
    dateEnd: null,
    location: null,
    excerpt: "Piano. Voice. Dinner. An intimate evening of live music from Vlada Neagu, paired with dinner at BANCO. Limited tables available.",
    description: "Piano. Voice. Dinner.\n\nJoin us for an intimate evening as Vlada Neagu performs live at BANCO — piano and voice woven through a dinner service in One Verdi Park.\n\nLimited tables available. Reserve yours.",
    cover: "/img/events/vlada-neagu-live.jpg",
    photos: ["/img/events/vlada-neagu-live.jpg"],
    youtubeId: null
  },

  // ── EXAMPLE — copy this block below the line above to add a real event.
  // Currently commented out, so it does not appear on the live site.
  /*
  {
    slug: "italian-wine-night",
    title: "Italian Wine Night",
    tag: "Tasting",
    dateStart: "2026-09-12T19:00:00+03:00",
    dateEnd: "2026-09-12T22:00:00+03:00",
    location: null,
    excerpt: "An evening built around Italian wine, paired with dishes chosen to match.",
    description: "First paragraph...\n\nSecond paragraph...",
    cover: "/img/events/wine-night-1.jpg",
    photos: ["/img/events/wine-night-1.jpg", "/img/events/wine-night-2.jpg"],
    youtubeId: null
  },
  */

];

/* ── Shared helpers — used by both events.html and event.html ────────── */

/* An event counts as upcoming until its end time (or, with no end time,
   its start time) has passed. */
window.bancoEventStatus = function (ev, now) {
  now = now || new Date();
  var end = new Date(ev.dateEnd || ev.dateStart);
  return end >= now ? "upcoming" : "past";
};

window.bancoEventLocation = function (ev) {
  return ev.location || window.BANCO_DEFAULT_EVENT_LOCATION;
};

/* Two-line address for the event page's facts card: ["BANCO at One Verdi
   Park", "Barbu Văcărescu 164E, Bucharest"] by default, or ["BANCO",
   ev.location] when an event overrides the location. `lang` is "en" or
   "ro" (default "en"); a location override is shown as-is regardless of
   language, since it's free text the event author wrote. */
window.bancoEventLocationLines = function (ev, lang) {
  lang = lang === "ro" ? "ro" : "en";
  if (ev.location) return ["BANCO", ev.location];
  return window.BANCO_DEFAULT_EVENT_LOCATION_LINES[lang];
};

/* Second line of the facts card's "Date & time" cell. Multi-day events
   (a week-long menu takeover) show the restaurant's standing hours,
   since visitors can come any time during the run; single-day events
   show the specific start time. `lang` is "en" or "ro" (default "en"). */
window.bancoFormatEventTimeLine = function (ev, lang) {
  lang = lang === "ro" ? "ro" : "en";
  var start = new Date(ev.dateStart);
  var end = ev.dateEnd ? new Date(ev.dateEnd) : null;
  if (end && end.toDateString() !== start.toDateString()) return window.BANCO_HOURS_LINE[lang];
  return start.toLocaleTimeString(lang === "ro" ? "ro-RO" : "en-GB", { hour: "2-digit", minute: "2-digit" });
};

/* "12 September 2026" / "12 September 2026, 19:00" if a time is present.
   When dateEnd falls on a different calendar day than dateStart (a
   multi-day event, e.g. a week-long menu takeover), renders as a range
   instead: "14 – 20 September 2026". Pass opts.lang = "ro" for Romanian
   month names ("12 septembrie 2026"); defaults to English. */
window.bancoFormatEventDate = function (ev, opts) {
  opts = opts || {};
  var locale = opts.lang === "ro" ? "ro-RO" : "en-GB";
  var start = new Date(ev.dateStart);
  var end = ev.dateEnd ? new Date(ev.dateEnd) : null;

  if (end && end.toDateString() !== start.toDateString()) {
    var sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    var startPart = start.toLocaleDateString(locale, sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" });
    var endPart = end.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
    return startPart + " – " + endPart;
  }

  var datePart = start.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  if (opts.withTime === false) return datePart;
  var timePart = start.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  return datePart + ", " + timePart;
};

/* Sorted copies of the event list: soonest-first for upcoming, most-recent-
   first for past. Never mutates window.BANCO_EVENTS. */
window.bancoSplitEvents = function (now) {
  now = now || new Date();
  var upcoming = [], past = [];
  window.BANCO_EVENTS.forEach(function (ev) {
    (window.bancoEventStatus(ev, now) === "upcoming" ? upcoming : past).push(ev);
  });
  upcoming.sort(function (a, b) { return new Date(a.dateStart) - new Date(b.dateStart); });
  past.sort(function (a, b) { return new Date(b.dateStart) - new Date(a.dateStart); });
  return { upcoming: upcoming, past: past };
};
