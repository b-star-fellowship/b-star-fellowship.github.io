---
layout: default

# [Word Golf (2025)](https://word.golf)

word.golf is an online sport played with pretrained word embeddings. There are five rounds: in each, a source and target word with low cosine similarity are used. Word golf is played by finding the closest word out of a 4 by 7 grid: for instance, danger -> fragile -> falter -> linger is one path, which intuits ‘fragile’ is a bridge word between the source and target. When the target shows up in the nearest neighbors, it is made easily visible to avoid frustrating the user. As a nod to the ‘golf’ aspect, there is always a two-click path from the source to the target.

### When did you launch, and who did you launch to?

Julian: It started off with just friends. We would notify our friends of updates and play races with them. For existing users, some didn’t give us their email when making an account, but the new “race” button on the top of the screen made it obvious there was something new.  

Eric: We released major new versions in June and July, adding persistence, account functionality, and improving the UI and user experience.  

---

### How many active users do you currently have?

Eric: About 30 daily active users, 200 weekly, and maybe 500 in the last month.  

---

### What is the breakdown of how many are strangers versus friends?

Julian: Daily players are mostly strangers. Exact breakdown is unclear because of anonymous accounts, but it’s at least two-thirds strangers.  

---

### What is the cost to run your service?

Julian: Around $1 a day for the application and database. The database has plenty of space left, so we can support many more users with the current setup.  

---

### What are you using for serving, hosting, and database?

Eric: We’re using DigitalOcean.

---

### What are the next steps or ideas you’re excited to work on for Word Golf in the future?

Julian: I’ve been working on a prompt maker and revising the UI to make it less intimidating for new users.  

Eric: I’m experimenting with a new game involving sentence embeddings, and want to create enriching online experiences that use shared knowledge about language in interesting ways.

---

### (Re: Eric's demo) Oh that's awesome, so you're thinking you'll build a portfolio of interesting word games / experiences / art?

Eric:  Yeah, and we should be able to cross promote them to each others' audiences.

---

### How did you two split up the work?

Julian: Eric did a lot of the front-end work, and I handled user authentication and back-end. For features, I made the first version of the catalog, and Eric made the race part. We split by front-end vs. back-end or by features themselves.  

---

### Were there any surprises or counterintuitive learnings from looking at the data?

Eric: Yes. I thought posters and passive advertising would be best, and while they do bring visits, we learned that contacting people with established user bases is more effective for gaining engaged users.  

---

### Were there any product ideas or experiments that didn’t work out?

Julian: We tried adding a skip button and a back feature, but they cluttered the UI and weren’t useful since the game already skips after 12 jumps. We also had to revise the tutorial many times based on direct user testing.  

Eric: I experimented with changing the core embeddings to find more interesting connections, but it’s hard to innovate effectively at the embeddings level.  

---

### What has been your favorite and least favorite part of working on a startup?

Julian: My favorite moment was waking up after Eric emailed the comic creator and seeing 100 people had played overnight. Also, seeing people enjoy new features you built is really rewarding.  

Eric: My favorite part is directly seeing my work impact users. Least favorite is when you work hard on something that never ends up making a difference in the product.  

---

### What unsolicited advice do you have for other students considering building a software product or starting their own company?

Julian: Talking to users has been incredibly helpful. We could quickly get feedback and test ideas directly with people.  

Eric: Know why you’re building something and who you’re building it for. At first, I thought this game could appeal to everyone, but it’s more effective to identify specific audiences who would engage deeply.  

---

### If you were me, what would you do differently for this summer program?

Julian: Maybe have demos once a month or every three weeks so everyone can share their product’s evolution. It would create more community and mutual support.  

Eric: More interactions between different groups of fellows. Seeing others’ struggles and learning from them is really valuable.  

