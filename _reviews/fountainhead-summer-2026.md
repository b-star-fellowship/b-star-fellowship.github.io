---
title: "Fountainhead: A summer of building for screenwriters"
date: 2026-10-10 09:00:00 -0400
category: Fellow interview
author: Sam Dooman
description: "Chris and Bryan Zou on building a free screenwriting editor, getting collaboration to work, and reaching 500 accounts during their summer fellowship."
---

Chris Zou started Fountainhead because he wanted a better place to write his films. This summer, he and his brother Bryan worked on making it a place other writers could depend on, too. That meant debugging a release that had to be rolled back, building version history, making promotional films, and watching a filmmaking class spend a day writing together in their editor.

<figure class="article-video">
  <video controls playsinline preload="none" width="960" height="720" poster="{{ '/assets/img/posts/fountainhead-summer-2026/chris-introduction.jpg' | relative_url }}" aria-label="Chris introduces Fountainhead and his journey as a filmmaker">
    <source src="{{ '/assets/video/fountainhead-summer-2026/chris-introduction.mp4' | relative_url }}" type="video/mp4">
    <a href="{{ '/assets/video/fountainhead-summer-2026/chris-introduction.mp4' | relative_url }}">Watch Chris introduce Fountainhead.</a>
  </video>
  <figcaption>Chris on filmmaking and why he built Fountainhead.</figcaption>
</figure>

### Sam: What is Fountainhead, and why did you start building it?

**Chris:** It's a free screenwriting editor for the next generation of filmmakers. The idea is to give writers the tools they need, including unlimited scripts, without making them pay just to get started.

It came out of my own process. When I was writing my second feature, I got frustrated with the restrictions in the editor I was using, and I couldn't afford the industry standard. I kept looking for alternatives and couldn't find something that really worked for me. So we started building it.

Being a filmmaker is a big part of this. I'm writing scripts myself, talking to other writers, and trying to make something we'd actually want to use.

### Sam: What did launching look like this summer?

**Chris:** The editor was already public, but in June we tried to push about two months of updates at once, including collaboration. It went badly. Lines duplicated, errors appeared that we hadn't seen before, and opening a corrupted script could crash the server. We rolled everything back. As far as we knew, no users' scripts were affected, but it was stressful.

**Bryan:** A lot of the trouble involved importing a script and replacing the existing document. We also had problems with how page breaks interacted with collaboration. Something that looked like a formatting change could cause duplicated text when it synced.

By the July 9 call, we'd fixed the import issues and had collaboration running in production. I found someone online who had run into the same problem and shared a repository with a solution. That helped us get past one of the big blockers. We also had to work through more syncing issues before the production version worked.

### Sam: What was hardest about getting through that?

**Bryan:** Some bugs were hard to reproduce. Something would work, then you'd type one thing and it would break. And I didn't want to give up on replacing a document during import. It seemed like it should be straightforward, and we'd already spent so much time debugging it.

**Chris:** I was more ready to remove that option. You could still import into a new document. But even when I commented it out, another bug appeared: pushing a line onto the next page could duplicate it. It felt like we kept finding more holes to patch.

### Sam: What were the three biggest product improvements?

**Bryan:** First, **getting collaboration into the live editor**. Writers could work on a script together, and we spent a lot of time getting importing and syncing to behave.

Second, **version history**. We built snapshots, previews of earlier versions, and a way to restore them. We also added a view of what changed between versions. By late July, snapshots were being saved automatically based on editing activity and when a writing session ended.

Third, **a desktop app with offline writing**. We had a downloadable build to test on the July 29 call, though it wasn't publicly launched yet. It saved local copies of scripts you'd opened so you could keep working without an internet connection.

<figure class="article-video">
  <video controls playsinline preload="none" width="1280" height="720" poster="{{ '/assets/img/posts/fountainhead-summer-2026/bryan-building-timelapse.jpg' | relative_url }}" aria-label="Silent time lapse of Bryan working on Fountainhead">
    <source src="{{ '/assets/video/fountainhead-summer-2026/bryan-building-timelapse.mp4' | relative_url }}" type="video/mp4">
    <a href="{{ '/assets/video/fountainhead-summer-2026/bryan-building-timelapse.mp4' | relative_url }}">Watch Bryan's time lapse.</a>
  </video>
  <figcaption>A time lapse from Bryan's summer building Fountainhead.</figcaption>
</figure>

**Chris:** Version history had already been useful for me, even just writing my content scripts. And the desktop app came directly from conversations with users. Being able to write offline was the number one feature the people I spoke with wanted.

### Sam: Were there features you had to simplify?

**Bryan:** Version history was a good example. We wanted to show exactly who made each change. We could identify who inserted text, but tracking who deleted it was much harder with the library we were using. We couldn't find an existing solution that did everything we wanted.

We also compared versions line by line. Comparing every character or word could get slow on a long screenplay. Even the demo made it obvious that speed needed attention.

**Chris:** We were okay with showing deletions without identifying the person who made them for now. I didn't think knowing exactly who deleted a particular line was worth holding up the rest of the feature.

### Sam: How many people were using it by the end of July? Any paying?

**Chris:** We reached 500 accounts a couple of days before the July 29 call. In June, we were at about 415, and growth had slowed after we turned off ads. So getting to 500 felt good.

Those were total accounts. One of the things we talked about was getting a better picture of actual writing. Our earlier time-spent metric could keep counting while someone had a document open without doing anything.

The editor was free. We were still figuring out what people might eventually pay for. We'd attracted people partly because they wanted a free alternative, so we couldn't assume they'd all start paying for add-ons.

### Sam: What did experimenting with Google ads teach you?

**Chris:** Search ads had brought people in, and turning them off made the difference pretty obvious. By the June 18 call, we'd gained about 15–20 accounts since switching them off. There were still occasional signups without promotion, but growth was much slower.

In July, I kept feeling the urge to turn ads back on because I knew they could bring in users. But I wanted to give organic growth a real try. The videos I was making were for social posts; the paid advertising we'd discussed was search ads. I wanted to see whether I could reach other filmmakers through the work itself.

There were small signs that it could work. By July 9, I had about 60 TikTok followers and estimated that we'd gotten around six new users from it. It wasn't a big audience, but real people were finding the product. By late July, people were naming Instagram and TikTok when they signed up.

We also needed to understand what happened after someone created an account. In June, our activity numbers told us people were logging in, but they didn't tell us enough about who was actually writing. Getting more signups and getting people to work on their scripts were two things we needed to look at separately.

<figure class="article-photo">
  <a href="{{ '/assets/img/posts/fountainhead-summer-2026/analytics-october-2026.png' | relative_url }}" aria-label="View the full-size Fountainhead analytics dashboard">
    <img src="{{ '/assets/img/posts/fountainhead-summer-2026/analytics-october-2026.png' | relative_url }}" alt="Fountainhead analytics showing 749 total accounts, new users per day, daily active users, weekly active writers and writing time, and desktop versus web usage." width="1233" height="833" loading="lazy" decoding="async">
  </a>
  <figcaption>Fountainhead's user analytics</figcaption>
</figure>

### Sam: What was behind the jump to 500? Any favorite user stories?

**Chris:** A filmmaking friend was teaching a summer course for high school students in New Jersey. He had the class sign up and use Fountainhead to collaborate. We got about 20 new accounts in one day and recorded roughly 31 hours of active writing across the users that day, which was a record for us.

He sent us really positive messages about the students' experience. He also reported trouble with some sharing links, which Bryan tested, although we couldn't reproduce it. It was exciting to see a whole class using the collaboration we'd been working on.

It immediately made us wonder how many other filmmaking classes might use it. We'd started reaching out to teachers, though getting responses during the summer was difficult.

### Sam: How did you find writers to talk to, and what did you learn?

**Chris:** I sent an email to 280 people who hadn't logged in for a while, asking to meet and talk about why they weren't using the app. I set up a scheduling link and made myself available. Nobody booked a call.

Then I separately emailed nine power users, and two booked calls. They were young students looking for a free alternative, and both conversations made the demand for a downloadable app much clearer. They wanted to write offline.

That was useful because it gave us a concrete reason to build the desktop version. I also heard that some writers preferred the feel of a desktop app over a website, even when the functionality was similar.

### Sam: We tried that desktop build together. How close was it?

**Bryan:** We could download it, sign in, join the same script, and write together. We also added an activity area so you could accept a shared-script invitation inside the app.

But trying it on other computers showed us things we still needed to fix. There were installation warnings, and Google sign-in sometimes needed the app to be closed and reopened before it worked. We needed to sort those out before releasing it.

Offline writing also had limits. You could work on scripts you'd already opened and saved locally. If someone else edited the online copy while you were offline, our first version asked which copy to keep. It didn't merge the two versions; the unselected copy would be discarded. A better way to handle those conflicts was something to work on later.

### Sam: Chris, how did being a filmmaker shape the way you tried to find users?

**Chris:** I felt like it should be a big advantage. I'm making a tool for filmmakers, so I should be able to make videos that connect with them. But that didn't automatically translate into growth, which was frustrating.

We did a shoot around my neighborhood after July 4. We found interesting locations and used a rusty typewriter as part of the concept. I was working on a film about how I got into filmmaking and why I started Fountainhead, along with shorter social posts.

Later, I rebuilt the editor's interface in After Effects for a product animation. I brought the designs over from Figma and ended up with about 520 layers. It took roughly a day and a half. It was a lot of work, but very satisfying.

By late July, new users were naming Instagram and TikTok in onboarding, and filmmaker friends I hadn't spoken to in a while were signing up. Posting was uncomfortable because people I knew could see it. But that felt like a ticket you had to pay.

<figure class="article-video">
  <video controls playsinline preload="none" width="960" height="720" poster="{{ '/assets/img/posts/fountainhead-summer-2026/screenwriting-promo.jpg' | relative_url }}" aria-label="Chris's promotional film for Fountainhead">
    <source src="{{ '/assets/video/fountainhead-summer-2026/screenwriting-promo.mp4' | relative_url }}" type="video/mp4">
    <a href="{{ '/assets/video/fountainhead-summer-2026/screenwriting-promo.mp4' | relative_url }}">Watch the Fountainhead promotional film.</a>
  </video>
  <figcaption>Chris puts his filmmaking skills to work introducing Fountainhead to other writers.</figcaption>
</figure>

### Sam: What surprised you about what users wanted?

**Chris:** The offline request was one. Another was the response to community features. I was thinking about a way to see what your friends were writing, a little like seeing what friends are listening to on Spotify, and to request access to their scripts.

I brought it up with the two users I interviewed. One thought it sounded fun. The other said they wouldn't use it because writing felt too personal, and they didn't want friends watching what they were working on. So even among people who liked the editor, the reaction was very different. The community idea still needed a lot more thought.

### Sam: How did you split the work between the two of you?

**Chris:** Earlier in the summer, we were both dealing with the product and its bugs. By late July, Bryan was doing the product development, and I was handling the content, outreach, user conversations, and other work around it. I was starting to feel like things slowed down whenever I couldn't get to them.

**Bryan:** I was working on version history and then the desktop app. That involved adapting the web app, changing how sign-in worked, and adding local storage for offline writing.

### Sam: What would you tell another student building a software product?

**Bryan:** Look for people who have run into the same technical problem. Finding that repository helped us get importing working. At the same time, some things we wanted to do with version history didn't have an obvious existing solution. We had to decide how much to take on right then.

**Chris:** Talk to people who are actually using what you've built. The two power-user calls gave us a clear feature to work on. And be willing to put your work out there. I wanted the marketing to come naturally because I'm a filmmaker, but it still took experimenting and posting things that felt uncomfortable.

### Sam: What's next for Fountainhead?

**Chris:** Get the desktop app ready to launch and keep building on the people who are already writing with us. Beyond that, we were considering two directions.

One was community: helping writers connect and share their work. The other was Fountainhead Studio, extending the screenplay into the work of making a film—breakdowns, shot lists, schedules, and budgets. There could eventually be tools to identify characters, locations, and props from a script. Those were ideas we were exploring, not finished products.

I want Fountainhead to be more than a cheaper editor. We have young filmmakers starting to write with us. The question is what else we can help them do.

---

Meet Chris and Bryan in the [2026 product directory]({{ '/products/#fountainhead' | relative_url }}).
