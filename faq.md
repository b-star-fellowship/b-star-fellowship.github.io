---
layout: page
title: Frequently asked questions.
permalink: /faq/
eyebrow: BROWN AI STUDIO / FAQ
---
{% for item in site.data.studio.questions %}
## {{ item.question }}

{{ item.answer }}
{% if item.link %}
[{{ item.link_label }}]({{ item.link | relative_url }})
{% endif %}
{% endfor %}

[Learn about becoming a Brown AI Fellow]({{ '/apply/' | relative_url }})
