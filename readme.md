# Brown AI Studio

A custom Jekyll site. The landing page is HTML and Liquid; articles and ordinary pages stay in Markdown. No Node build, JavaScript framework, or third-party font service is required. The former B* content and URLs are preserved, except the unpublished Jekyll starter post.

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
category: Studio notes
description: A short preview for the journal and homepage.
---

Your Markdown goes here.
```

Posts automatically appear in `/blog/`, the RSS feed, and the latest-note slot on the homepage. Posts with future dates appear once their date arrives. Add `published: false` to keep one unpublished. Put work in progress under `_drafts/` and pass `--drafts` to the preview command to include it.

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
- `_data/studio.yml`: program facts, FAQ answers, and featured-project copy.
- `work/fountainhead.md`: Markdown fellow spotlight.
- `assets/css/studio.css`: shared visual styles and responsive layouts.
- `_layouts/base.html`: shared navigation, metadata, and footer.
- `_config.yml`: brand metadata, contact email, and application status/link.
- `assets/js/studio.js`: small mobile-navigation enhancement. FAQs use native HTML details.
- `_includes/sculpture.svg`: original vector hero artwork. Its slow rotation respects reduced-motion preferences.

## Draft details to review

- The $5,000 grant, 10-week duration, 1–2-person team size, and eligibility copy come from the previous site. Confirm details for the next cohort.
- The existing directory lists Fountainhead in 2026. The feature avoids calling it “last year” so the draft does not introduce a conflicting cohort date.
- The Fountainhead editor illustration is an explicitly labeled concept, not a product screenshot. The spotlight uses only existing directory information; expand it with a founder interview and real product images when ready.
- The old application link was for 2025. Put the current URL in `application_url` when ready; the fellowship page then displays an application button. Until then it uses the existing public contact email.
- The announcement post is proposed rebrand copy for local review.
- This is a local draft. No domain changes or publishing have been performed.

## Build

```sh
BUNDLE_PATH=vendor/bundle bundle exec jekyll build
```

Generated files go to ignored `_site/`. Existing hosting can keep using Jekyll or deploy that output. The build uses only the existing `jekyll-feed` plugin and standard Liquid templates.
