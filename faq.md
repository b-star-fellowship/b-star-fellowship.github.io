---
layout: page
title: A few good questions.
permalink: /faq/
eyebrow: BROWN AI STUDIO / FAQ
---
{% for item in site.data.studio.questions %}
## {{ item.question }}

{{ item.answer }}
{% endfor %}

[Learn about becoming a Brown AI Fellow]({{ '/apply/' | relative_url }})

## What happened to B*?

B*, the Brown Startup Fellowship, is now Brown AI Studio. Participants are Brown AI Fellows. The new name keeps the same invitation at its heart: build something.
