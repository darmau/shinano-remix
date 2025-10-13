 - [High] app/routes/$lang.signup.tsx:132 & app/routes/$lang.login.tsx:113 – both actions throw a function instead of a Response, so any unexpected intent raises a runtime exception instead of a 400 response.
  - [High] app/components/CTA.tsx:4 – imports {action} from $lang._index, but that route exports no action; build will fail with “export not found”.
  - [High] app/routes/$lang.signup.tsx:83-112 – success branch drops the Supabase headers and posts username/email directly to ${bark}/… without encoding or error handling; the request fails if the env var is missing or data
    contains /, and the session cookie (if ever issued) is lost.
  - [High] app/routes/$lang.article.[rss.xml].tsx:107-132 – the RSS item template misses the closing </p> and the default enclosure URL is …/https://img.darmau.co/…, producing invalid feed markup.
  - [High] app/components/Profile.tsx:24-35 & app/components/Footer.tsx:73 – navigation links are relative (${lang}/…) so visiting /en/thoughts keeps users on a nested path like /en/thoughts/en/login.
  - [Med] app/components/GallerySlide.tsx:49 & 116-130 – maxWidth lacks units, the responsive set key is secSet instead of srcSet, and the third variant reports width 1440 but calculates height for 1920px; masonry slides never get
    proper sources.
  - [Med] app/components/ResponsiveImage.tsx:47 and app/components/GalleryImage.tsx:47 – sizes="… , 2x" is not a valid descriptor, preventing the browser from selecting the right resource.
  - [Med] app/components/Navbar.tsx:28-30 – path.split('/')[2] leaves the homepage tab unhighlighted unless the URL ends with a trailing slash.
  - [Med] app/components/Mapbox.tsx:2 – mapbox-gl is imported at module scope; on the Cloudflare Workers SSR build it tries to touch window/document and will crash unless guarded with a client-only dynamic import.

  Next Steps

  1. Fix the broken exports, error handling, and encoding quirks above, then rerun typecheck/build.
  2. Re-run UI in dev after the responsive-image and routing tweaks to verify navigation and galleries behave correctly.
