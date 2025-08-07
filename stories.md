---
layout: default
---

# For Reel Flies - August 7th
## Matthew Bockelmann:
A lot of my friends and their parents use the Peloton app for yoga. I was wondering if they are on your radar as a competitor. Is their app a paid subscription?

## Sam:
It's not shocking to me that they're popular. Peloton had a meteoric rise during COVID. I think you can get their digital-only content for about $13 a month now, which is still more expensive than us, but not by much.

What's interesting about Peloton is that people really bonded with their instructors for the classes, which created a strong sense of loyalty. That's not our thing; our value is in full customization through an algorithm, not a single personality. We try to get it as close as possible to a studio experience. So for people who want one instructor they really like, it's harder for them to switch to us. But a lot of people just starting out pick us because the infinite customization is way better.  So they're def a competitor but not quite as big a competitor as free workouts on YouTube.

## Matthew Bockelmann:
How do you guys handle the music in the app? Could you run an API through Spotify so people could play their own playlists? I have some hot yoga experience, and I prefer more upbeat music I can sing along to in my head, whereas for a relaxing stretch, I'd want something calmer. It seems like you need both.

## Sam:
Technically, integrating with something like Spotify is finnicky. On phones, you can't control the volume of two apps at once to mix them properly. You could do what Google Maps does and "duck" the volume of the music app when the instructor is speaking, but that doesn't always sound great.

Carlos, one of the founders, has been our primary music curator. In the early days, they went to a lot of yoga classes, looked at instructors' playlists, and curated what they thought was the best default music. We’ve tried pop music in the yoga app, but people mostly hate it. What's likely is that to replicate the studio environment, we need to be opinionated and have taste about what makes a good yoga practice.  So we built our own solution for music to make sure it's as good as possible, which involved a lot of technical (and legal) work but ended up being worth it.

## Ryan Klivansky:
We've had people sign up as regular users instead of vendors because they missed the "become a vendor" button. We were planning on just sending them a message to explain the process. This also got us thinking about communicating with all our users. How do you handle mass emails to users?

## Sam:
The success rates for getting people to do stuff is super low.  For example, the purchase rate for our sale emails is around 0.5% of recipients will actually purchase a yearly subscription.

At our scale, you can't just write a script to fetch all users and send an email. You have to build internal tools. I built a "mass user email tool" for us to handle this. When you're sending millions of emails, you have to worry about a few things. First is just server capacity. You also need to translate the email and ensure the translations are good.

When we launched our HIIT app, the email used the phrase "get your butt in gear." A Russian user emailed us and said, "Hey, love what you're doing, but just so you know, this sentence in Russian translates to 'you're going to put something in our asses.'" We were like, "Okay, thank you for letting us know," and then got a new Russian translator and built a review step into our translation process.

We also learned that sending the email at 6:00 a.m. local time is best.  We observed sending emails during the day, people are at work and are less likely to act on it. So then you have to batch sends by time zone, which creates its own challenges when you realize how unevenly users are distributed across time zones.

## Matthew Bockelmann:
We've had a lot of interest from people in Sweden who want to be vendors. We're not even launched in the US yet, so I just told them we'd get to Europe eventually. How does payment and stuff work for you internationally? Does it just go through PayPal?

## Sam:
Stripe has been gradually eating the world's payment systems, so we just use Stripe and PayPal as much as possible. I would not recommend implementing the PayPal API for you guys yet. When we did it back in 2018, it gave us about a 20% bump in sales (worth it), but that was four years after we launched.

In the beginning, we were just on Stripe, which at the time was only credit cards. That meant there were places like the Netherlands and India, where credit cards aren't a big thing, where we just weren't accepting money for a while. For you guys, Stripe will probably be fine for Sweden. I'd be more worried about the international shipping labels and costs.

But definitely keep those international people in your system. Have them sign up, track what country they're in, and then you can send an email blast later when you decide it's the right time to expand.

# Wordgolf - July 16th
## Eric Xia:
We were thinking about using AI to generate images for the different words in our game to make the creative path-finding aspect more visual and sharable. My co-founder wasn't a fan, and I also started having second thoughts about quality control and how our user base, who seems to be anti-AI, would react to it.

## Sam:
At Down Dog, we experimented with using generative AI for our meditations. The goal was to have a calm, pleasing visual that wasn't too in-your-face. While it didn't seem to hurt our metrics like retention or practice completion, we definitely got more negative feedback on that than on other features.

The nice thing for us was that we had a fixed number of meditations, so we could quality-check the visuals. With your game, you have a combinatorial explosion of possible paths, meaning you'd be generating images every time. You wouldn't be able to QA the full set of things that users are seeing, so you can't guarantee the quality. I'd probably put that idea on the back burner for now.

## Eric Xia:
We've got about 50 daily active users and we're debating our next move. Should we focus on improving and iterating on Wordgolf, or should we start building out other games to create an ecosystem? A new game might bring in more users, but I'm also worried about spreading our resources too thin.

## Sam:
This is the exact dilemma we faced at Down Dog. The vision was always to take a small set of media and reuse it to create as much fitness content as possible, across yoga, HIIT, barre, all of it.

But we started with yoga to prove out the idea. The app launched in the fall of 2015, but we didn't officially start working on new fitness types like HIIT and barre until 2019. It took us four years of focusing just on the yoga product. In that time, we were constantly iterating and building out the core infrastructure, which ended up being useful for the other apps later on. If we had tried to start building HIIT and barre back in 2017, I suspect it would have been a huge mistake. We likely wouldn't have launched a bunch of important features within the main yoga app in time for New Year's resolutions season. There's an art to figuring out when to expand your core offering, and for us, iterating on the flagship product first was the right call.

## Eric Xia:
We're thinking about how to best communicate with our users. I was worried that emailing them too often, like every time we ship a small new feature, would come off as desperate. We're trying to figure out when it's appropriate to reach out.

## Sam:
Don't underestimate the personal touch, even at scale. We ran an experiment last year at Down Dog. We set up a system to automatically email every user who turned off their subscription's auto-renewal. The email came directly from our founder, Carlos, and said something like, "Hey, I'm Carlos, the founder of Down Dog. I noticed you turned your subscription off and was wondering if there was anything we could do to keep your business. We'd love to hear from you."

The replies went straight to his inbox, so he was reading probably 20 of these a day. From that feedback, we found two small things we could change that kept a couple of people. Mostly, people said they couldn't afford it, so we just gave them free access. We haven't finished the experiment, but I suspect we'll probably retain 10-15% of those people in the long run. It was incredibly useful.

So, maybe don't email about every little tweak. But for a big new feature? Or if a user was playing every day for a week and then suddenly stopped? A personal email asking what happened can be really powerful. You don't have to sound desperate, just say, "Hey, we saw you were really engaged and now you're not. Did anything change? We'd love to hear your thoughts." People are busy; you have to reach out if you want them to re-engage.


# Pagio - July 14th
## Jerry & Adithya:
We're exploring ways to drive a big push for engagement at the end of our weekly competitions. One idea is to let users form teams on the last day, creating a "crazy rush for points" as they try to sign up friends to get a score multiplier.

## Sam:
I really like that idea of creating urgency. Generally speaking, anything with a sense of urgency seems to have a strong impact on user behavior. At Down Dog, when we run sales, we'll send a notification when the sale starts, and then another "last chance" notification before it ends. We do the same with our daily practice challenges. We ran experiments and found that sending push notifications in the morning and a "last chance" reminder in the evening dramatically works. Each of those notifications bumped our practice completion rate by 2% to 5%. So that last-minute push is powerful. You could do something similar, like having "double points for the next three hours" to give players who are behind a chance to catch up, kind of like a "double XP weekend" in video games.

# ForReelFlies - July 11th
## Matthew Bockelmann:
We just finished the first version of the site, and are planning to do a refactor for the backend, and then reach out to Matt's fly tier friends to get them onboarded.  We expect to get to that stage in two weeks or so, once we build out the onboarding to Stripe to collect their banking information.

## Sam:
Why wait 2 weeks?  Seems to me you don't need to build a stripe flow to launch the site, you just need that for automatically paying out your friends.  Since they're your friends, try go get everything you need (listings, images, mailing address) up front and then manually "onboard" them into your system in a quick and dirty way.  That way you can launch faster, and defer the engineering work for when you need it.  See Paul Graham's [Do Things That Don't Scale](https://paulgraham.com/ds.html)