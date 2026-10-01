# Brown AI Studio

A custom Jekyll site. The landing page is HTML and Liquid; articles and ordinary pages stay in Markdown. No Node build, JavaScript framework, or third-party font service is required. The former B* articles and URLs are preserved, except the unpublished Jekyll starter post and the private Prompts draft.

## Local preview

Use Ruby 3.2 or newer (Homebrew Ruby works). Install the gems once:

```sh
# On Apple Silicon with Homebrew Ruby:
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
BUNDLE_PATH=vendor/bundle bundle install
./scripts/serve
```

Open http://127.0.0.1:4000. Jekyll rebuilds after content edits; reload the browser to see them. Restart the server after changing `_config.yml`. Set `PORT=4001 ./scripts/serve` to use another port.

## Add a blog post

Create `_posts/YYYY-MM-DD-your-title.md`:

```yaml
---
title: Your post title
date: 2026-10-01 09:00:00 -0400
category: Article
author: Sam Dooman
description: A short preview for the blog.
---

Your Markdown goes here.
```

Posts automatically appear in `/blog/` and the RSS feed. The homepage deliberately has no blog feed. Existing Markdown articles keep their original URLs and are listed in `_data/writing.yml`. Posts with future dates appear once their date arrives. Add `published: false` to keep one unpublished. Put work in progress under `_drafts/` and pass `--drafts` to the preview command to include it.

## Add a page

Create `your-page.md`:

```yaml
---
layout: page
title: Your page title
permalink: /your-page/
eyebrow: OPTIONAL SMALL LABEL
description: Optional introductory text.
---

Your Markdown goes here.
```

Existing files using `layout: default` continue to work and can keep their own Markdown `# Heading`. The `page` layout renders the title for you.

## Where to edit

- `index.html`: landing page structure and copy.
- `_data/studio.yml`: program facts and FAQ answers.
- `_data/products.json`: all products, including full descriptions, cohort, founders, website, and interview links. Set `featured` to `true` to include a product in the homepage carousel. The Products page includes every record in a vertical list, grouped by cohort from newest to oldest.
- `_data/fellows.json`: founder names, profile links, and verified portraits. The 13 downloaded photos live in `assets/img/fellows/<person-name>.jpg`; the `photo` field points to that local file. `photo_source` and `photo_source_image` preserve provenance only and are never used as image URLs in the page. Profiles without a verified photo display initials.
- `_data/product_media.json`: product imagery, each website’s original palette, and source URLs. Assets are stored under `assets/img/products/`.
- `_includes/product-carousel.html` and `_includes/product-card.html`: shared product presentation. The full directory displays one combined summary and focus areas for each product; the homepage uses the shorter summary.
- `products.html`: Products page, preserving the original `/products/` URL.
- `assets/css/studio.css`: shared visual styles and responsive layouts.
- `_layouts/base.html`: shared navigation, metadata, and footer.
- `_config.yml`: brand metadata and the `application_url` shared by the application page’s three calls to action.
- `assets/js/studio.js`: mobile navigation and the product carousel. Rotation advances every 12 seconds while visible, pauses while hovered, and stops after manual navigation or keyboard focus. Reduced-motion users get manual navigation only.
- `assets/img/studio-social.svg` and `studio-social.png`: the program-branded link preview. The SVG is the editable source; export it at 1200 × 630 to update the PNG used by Open Graph and Twitter metadata in `_layouts/base.html`.
- `lecture.markdown`: the full-screen lecture slide at `/lecture/`, with a large QR code pointing to `https://brownai.studio`. Its `lecture: true` flag omits the shared navigation and footer for presenting.
- `assets/img/studio-qr.svg` and `studio-qr.png`: the branded QR code for slides and print, using the current B* mark and site colors. It has high error correction and a four-module quiet zone. On macOS, regenerate the SVG with `swift scripts/generate-studio-qr.swift`, then export the PNG with `rsvg-convert -w 1480 -h 1480 assets/img/studio-qr.svg -o assets/img/studio-qr.png` (requires librsvg). The generator contains the destination URL; update it if the domain changes.
- `_data/mentors.yml`: the mentor directory. Add a record with a name, degree, program, graduation year, photo, bio paragraphs, and links to add another mentor. Each subtitle is rendered from `degree`, `program`, and `graduation_year`.
- `mentors.html`: the mentor directory layout.
- `_data/writing.yml`: the original articles and resources linked from the blog, ordered newest first. Existing article dates come from their first addition in Git history and are also stored in each page’s front matter.
- `_private/prompts.txt`: the unpublished Prompts text, excluded from Jekyll builds and ignored by Git so future pushes do not expose it. Existing public Git history is unchanged.
- `_includes/byline.html`: article authorship. Existing writing has an explicit Sam Dooman author field.
- `assets/js/hero-network.js`: the homepage network animation. A spark follows a depth-first traversal, lighting branches and retracing them on backtracking. It pauses offscreen and when the tab is hidden; reduced-motion users see a static network.

## Draft details to review

- The $5,000 grant, 10-week duration, 1–2-person team size, and eligibility copy come from the previous site. Confirm details for the next cohort.
- The existing directory lists Fountainhead in 2026. The feature avoids calling it “last year” so the draft does not introduce a conflicting cohort date.
- The homepage carousel features Fountainhead, KADI, Word Golf, Pagio, and ForReelFlies. The Products page includes all 13 products; the ForReelFlies interview also remains in the writing archive.
- Product panels use imagery and colors from their public websites. PMARC and Mona have no website in the original directory, so they use simple text covers. Source URLs are retained in the media data for future updates.
- Thirteen founder portraits were verified through public LinkedIn, Brown, personal, and YC pages. The other ten profiles retain initials. Portrait provenance is recorded in `_data/fellows.json`; no login-only LinkedIn images are required at runtime.
- The site uses a brown palette. Each product’s panel retains its own brand colors.
- The application page links to the Google Form supplied for the program. Update `application_url` in `_config.yml` to change all three application calls to action together.
- The KADI summer interview is in `_posts/2026-09-30-kadi-summer-2026.md`, reconstructed from the June 18, July 16, and July 31 check-ins. Its product details and usage reflect those calls through July 31.
- Sam’s headshot comes from the Brown CS profile linked on his mentor card. The optimized image is stored locally as `assets/img/sam-dooman.jpg`.
- Sam’s bio is based on the existing site and the Brown CS profile; additional mentors can be added without changing the page layout.
- This is a local draft. No domain changes or publishing have been performed.

## Build

```sh
BUNDLE_PATH=vendor/bundle bundle exec jekyll build
```

Generated files go to ignored `_site/`. Existing hosting can keep using Jekyll or deploy that output. The build uses only the existing `jekyll-feed` plugin and standard Liquid templates.
