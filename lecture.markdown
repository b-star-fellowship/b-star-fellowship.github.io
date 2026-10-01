---
layout: base
lecture: true
permalink: /lecture/
title: Build something that matters
description: A summer fellowship for Brown students. Scan to explore Brown AI Studio.
---

<section class="lecture-stage" aria-labelledby="lecture-title">
  <div class="lecture-copy">
    <a class="wordmark" href="{{ site.url }}" aria-label="Brown AI Studio home">
      <img class="wordmark-symbol" src="{{ '/assets/img/studio-mark.svg' | relative_url }}" width="52" height="52" alt="" aria-hidden="true">
      <span>Brown<span class="wordmark-second">AI Studio</span></span>
    </a>
    <p class="eyebrow">YOUR IDEA. YOUR SUMMER.</p>
    <h1 id="lecture-title">Build something<br><span>that matters.</span></h1>
    <p class="lecture-description">A summer fellowship for Brown students. Bring your ideas to life with AI.</p>
    <dl class="lecture-facts">
      {% for stat in site.data.studio.stats limit:2 %}
      <div><dt>{{ stat.value }}</dt><dd>{{ stat.label }}</dd></div>
      {% endfor %}
    </dl>
  </div>
  <figure class="lecture-code">
    <a class="lecture-qr" href="{{ site.url }}" aria-label="Explore Brown AI Studio">
      <img src="{{ '/assets/img/studio-qr.svg' | relative_url }}" width="740" height="740" alt="QR code with the Brown AI Studio logo. Scan to visit https://brownai.studio.">
    </a>
    <figcaption>
      <p>Scan to explore the fellowship</p>
      <a class="lecture-url" href="{{ site.url }}">brownai.studio {% include arrow.html direction="diagonal" %}</a>
    </figcaption>
  </figure>
</section>
