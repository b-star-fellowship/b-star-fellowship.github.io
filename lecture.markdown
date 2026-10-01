---
layout: base
lecture: true
permalink: /lecture/
title: Build something that matters
description: A summer fellowship for Brown students. A request for products, research made useful, and creative work.
---

<div class="lecture-deck" data-lecture>
  <section class="lecture-slide lecture-opening" id="welcome" data-lecture-slide data-title="Your idea. Your summer." aria-labelledby="lecture-title">
    <div class="lecture-copy">
      <a class="wordmark" href="{{ site.url }}" aria-label="Brown AI Studio home">
        <img class="wordmark-symbol" src="{{ '/assets/img/studio-mark.svg' | relative_url }}" width="52" height="52" alt="" aria-hidden="true">
        <span>Brown<span class="wordmark-second">AI Studio</span></span>
      </a>
      <p class="eyebrow">YOUR IDEA. YOUR SUMMER.</p>
      <h1 id="lecture-title" tabindex="-1">Build something<br><span>that matters.</span></h1>
      <p class="lecture-description">A summer fellowship for Brown students. Bring your ideas to life with AI.</p>
      <dl class="lecture-facts">
        {% for stat in site.data.studio.stats limit:2 %}
        <div><dt>{{ stat.value }}</dt><dd>{{ stat.label }}</dd></div>
        {% endfor %}
      </dl>
    </div>
  </section>

  <section class="lecture-slide" id="request" data-lecture-slide data-title="Request for products" aria-labelledby="request-title">
    <header class="lecture-heading">
      <p class="eyebrow">AN INVITATION TO BUILD</p>
      <h2 id="request-title" tabindex="-1">Request for <em>products.</em></h2>
      <p>Some things we’d love to see you make.</p>
    </header>
    <ol class="lecture-requests">
      <li><a href="#startups"><span class="lecture-number">01</span><div><h3>Startups</h3><p>Find a problem. Build something people want.</p></div><span aria-hidden="true">↗</span></a></li>
      <li><a href="#research"><span class="lecture-number">02</span><div><h3>Productized or publicized research</h3><p>Help a Brown professor’s work reach more people.</p></div><span aria-hidden="true">↗</span></a></li>
      <li><a href="#creative"><span class="lecture-number">03</span><div><h3>Games, music &amp; art</h3><p>Make something people can play, hear, or experience.</p></div><span aria-hidden="true">↗</span></a></li>
    </ol>
    <p class="lecture-footnote">Inspired by <a href="https://www.ycombinator.com/rfs" target="_blank" rel="noopener noreferrer">Y Combinator’s Requests for Startups ↗</a>. Starting points, not a checklist.</p>
  </section>

  <section class="lecture-slide lecture-startups" id="startups" data-lecture-slide data-title="Startups" aria-labelledby="startups-title">
    <header class="lecture-heading">
      <p class="eyebrow">01 / STARTUPS</p>
      <h2 id="startups-title" tabindex="-1">Built by Brown students.</h2>
    </header>
    <div class="lecture-showcase" data-lecture-carousel role="region" aria-roledescription="carousel" aria-label="Student startups">
      <div class="lecture-product-toolbar" data-product-controls hidden>
        <div class="lecture-product-tabs" role="group" aria-label="Choose a student startup">
          <button type="button" data-product-to="0" aria-controls="lecture-fountainhead" aria-pressed="true">Fountainhead</button>
          <button type="button" data-product-to="1" aria-controls="lecture-kadi" aria-pressed="false">KADI</button>
        </div>
        <div class="lecture-product-navigation">
          <span data-product-count>1 / 2</span>
          <button class="icon-button" type="button" data-product-previous aria-label="Previous startup">{% include arrow.html direction="back" %}</button>
          <button class="icon-button" type="button" data-product-next aria-label="Next startup">{% include arrow.html %}</button>
        </div>
      </div>
      <div class="lecture-product-slides">
        {% assign lecture_product_ids = 'fountainhead,kadi' | split: ',' %}
        {% for product_id in lecture_product_ids %}
        {% assign product = site.data.products | where: 'id', product_id | first %}
        <article class="feature-card lecture-product" id="lecture-{{ product.id }}" data-lecture-product data-name="{{ product.name }}" role="group" aria-roledescription="slide" aria-label="{{ forloop.index }} of 2: {{ product.name }}">
          {% include product-card.html product=product %}
        </article>
        {% endfor %}
      </div>
      <p class="sr-only" data-product-status aria-live="polite" aria-atomic="true"></p>
    </div>
  </section>

  <section class="lecture-slide" id="research" data-lecture-slide data-title="Research, made useful" aria-labelledby="research-title">
    <header class="lecture-heading">
      <p class="eyebrow">02 / PRODUCTIZED OR PUBLICIZED RESEARCH</p>
      <h2 id="research-title" tabindex="-1">Great research.<br><em>A wider audience.</em></h2>
    </header>
    <div class="lecture-research-grid">
      <article class="lecture-oster">
        <p class="lecture-label">AN EXAMPLE AT BROWN</p>
        <h3>Emily Oster</h3>
        <p class="lecture-oster-role">Professor of Economics, Brown University</p>
        <p>Making research accessible through <a href="https://parentdata.org/" target="_blank" rel="noopener noreferrer">ParentData ↗</a> and books that help people understand evidence and make everyday decisions.</p>
        <div class="lecture-books" aria-label="Books by Emily Oster">
          <span><i>Expecting<br>Better</i></span><span><i>Cribsheet</i></span><span><i>The<br>Family Firm</i></span>
        </div>
        <a class="lecture-source" href="https://vivo.brown.edu/display/eoster1" target="_blank" rel="noopener noreferrer">About Emily at Brown ↗</a>
      </article>
      <div class="lecture-research-prompt">
        <h3>What could you make with a Brown professor?</h3>
        <ul>
          <li>An interactive explainer for a big idea.</li>
          <li>A visual way to explore a research dataset.</li>
          <li>An app that puts a finding to work.</li>
        </ul>
        <p class="lecture-permission"><strong>Start with a conversation.</strong> Get the professor’s permission before building on or publishing their work. Collaborate, credit, and check the interpretation together.</p>
      </div>
    </div>
  </section>

  <section class="lecture-slide" id="creative" data-lecture-slide data-title="Games, music & art" aria-labelledby="creative-title">
    <header class="lecture-heading">
      <p class="eyebrow">03 / GAMES, MUSIC &amp; ART</p>
      <h2 id="creative-title" tabindex="-1">Make room for <em>play.</em></h2>
      <p>A few things I’d be especially excited to see.</p>
    </header>
    <div class="lecture-creative-grid">
      <article class="lecture-music">
        <p class="lecture-label">ESPECIALLY INTERESTED IN</p>
        <svg class="lecture-wave" viewBox="0 0 600 150" fill="none" aria-hidden="true">
          <path d="M0 75 C30 75 30 20 60 20 S90 130 120 130 S150 5 180 5 S210 145 240 145 S270 30 300 30 S330 120 360 120 S390 50 420 50 S450 100 480 100 S510 65 540 65 S570 75 600 75" stroke="currentColor" stroke-width="2"/>
          <path d="M0 75 C30 75 30 130 60 130 S90 20 120 20 S150 145 180 145 S210 5 240 5 S270 120 300 120 S330 30 360 30 S390 100 420 100 S450 50 480 50 S510 85 540 85 S570 75 600 75" stroke="currentColor" stroke-width="2" opacity=".4"/>
          <path d="M0 75H600" stroke="currentColor" opacity=".2"/>
          <circle cx="180" cy="5" r="4" fill="currentColor"/><circle cx="300" cy="120" r="4" fill="currentColor"/><circle cx="420" cy="50" r="4" fill="currentColor"/>
        </svg>
        <h3>Music, made visible.</h3>
        <p><strong>Music visualizers</strong><br>Turn sound into motion, color, or a live performance.</p>
        <p><strong>Music data visualization</strong><br>Explore listening habits, musical structure, or connections between artists.</p>
      </article>
      <ul class="lecture-creative-ideas">
        <li><h3>Small, surprising games</h3><p>A daily puzzle, a shared world, an unusual mechanic.</p></li>
        <li><h3>New ways to make music</h3><p>Playful instruments, composition toys, collaborative sound.</p></li>
        <li><h3>Interactive &amp; generative art</h3><p>Work that responds to a person, a place, or a dataset.</p></li>
        <li><h3>Tools for other creators</h3><p>Help someone tell a story, sketch an idea, or try a new medium.</p></li>
      </ul>
    </div>
  </section>

  <section class="lecture-slide lecture-closing" id="your-interest" data-lecture-slide data-title="Follow your interest" aria-labelledby="closing-title">
    <p class="eyebrow">THE MOST IMPORTANT THING</p>
    <h2 id="closing-title" tabindex="-1">Build something<br>you’re <em>genuinely<br>interested in.</em></h2>
    <p class="lecture-closing-copy">Think of this program as an<br><strong>open curriculum for making products.</strong></p>
    <p class="lecture-closing-note">Your curiosity sets the direction.</p>
  </section>
</div>

<aside class="lecture-rail" aria-label="Explore the fellowship">
  <a class="lecture-rail-brand" href="{{ site.url }}"><img src="{{ '/assets/img/studio-mark.svg' | relative_url }}" width="36" height="36" alt=""><span>Brown AI Studio</span></a>
  <figure class="lecture-code">
    <a class="lecture-qr" href="{{ site.url }}" aria-label="Explore Brown AI Studio">
      <img src="{{ '/assets/img/studio-qr.svg' | relative_url }}" width="740" height="740" alt="QR code with the Brown AI Studio logo. Scan to visit https://brownai.studio.">
    </a>
    <figcaption><p>Scan to explore the fellowship</p><a class="lecture-url" href="{{ site.url }}">brownai.studio {% include arrow.html direction="diagonal" %}</a></figcaption>
  </figure>
  <p class="lecture-rail-note">YOUR IDEA.<br>YOUR SUMMER.</p>
</aside>

<nav class="lecture-controls" data-lecture-controls aria-label="Presentation controls" hidden>
  <div class="lecture-mode" role="group" aria-label="Presentation mode">
    <button type="button" data-mode="slides" aria-pressed="true">Slides</button>
    <button type="button" data-mode="scroll" aria-pressed="false">Scroll</button>
  </div>
  <div class="lecture-progress"><span data-lecture-counter>01 / 06</span><span data-lecture-label>Your idea. Your summer.</span></div>
  <div class="lecture-navigation">
    <button class="lecture-fullscreen" type="button" data-fullscreen aria-label="Enter fullscreen" title="Fullscreen (F)" hidden>⛶</button>
    <button class="icon-button" type="button" data-lecture-previous aria-label="Previous slide" title="Previous slide (←)">{% include arrow.html direction="back" %}</button>
    <button class="icon-button" type="button" data-lecture-next aria-label="Next slide" title="Next slide (→ or Space)">{% include arrow.html %}</button>
  </div>
  <div class="lecture-progress-track" aria-hidden="true"><span data-lecture-progress></span></div>
</nav>
<p class="sr-only" data-lecture-status aria-live="polite" aria-atomic="true"></p>
