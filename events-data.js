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
                paragraphs with a blank line (\n\n).
   cover        path to the main image, used on the card and, if present,
                first in the gallery — e.g. "img/events/wine-night-1.jpg"
   photos       array of 1 to 3 image paths for the event page gallery.
   youtubeId    optional. The part of a YouTube URL after "v=" — for
                https://www.youtube.com/watch?v=dQw4w9WgXcQ it's
                "dQw4w9WgXcQ". Leave null to skip the video.
   ──────────────────────────────────────────────────────────────────────── */

window.BANCO_DEFAULT_EVENT_LOCATION = "One Verdi Park, Barbu Văcărescu 164E, Bucharest";

window.BANCO_EVENTS = [

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
    cover: "img/events/wine-night-1.jpg",
    photos: ["img/events/wine-night-1.jpg", "img/events/wine-night-2.jpg"],
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

/* "12 September 2026" / "12 September 2026, 19:00" if a time is present. */
window.bancoFormatEventDate = function (ev, opts) {
  opts = opts || {};
  var start = new Date(ev.dateStart);
  var datePart = start.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  if (opts.withTime === false) return datePart;
  var timePart = start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
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
