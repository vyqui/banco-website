# Netlify Functions

`netlify.toml` points here (`functions = "netlify/functions"`). The folder exists so
that path resolves on Netlify's build servers, where the repo is checked out at
`/opt/build/repo`.

## Missing functions

`admin.html` calls two endpoints that are **not committed yet**:

| Endpoint                        | Used by                              | Called at        |
|---------------------------------|--------------------------------------|------------------|
| `/.netlify/functions/ga-stats`  | Google Analytics panel               | `admin.html:160` |
| `/.netlify/functions/gmb-stats` | Google Business rating and reviews   | `admin.html:194` |

They only ever existed on the original author's machine
(`/Users/rares/Documents/Claude/banco/netlify/functions`), so they were never part of
the repository. Until the two files are added here, both endpoints return 404.

The admin dashboard degrades gracefully in the meantime:

- Traffic statistics fall back to the Supabase tracker (`admin.html:213-215`).
- The Google Business panel shows "Neconfigurat încă".

## Environment variables

`GA_PROPERTY_ID` and `GA_SA_KEY` are already configured on the Netlify site, so
`ga-stats` will have its credentials as soon as the file is committed. `gmb-stats`
additionally needs a Google Places API key.
