
<h1 align="center">
  <br>
  <img src="https://github.com/burst-your-bubble/App/blob/master/static/favicon.ico" alt="Burst Your Bubble" width="200"></a>
  <br>
  Burst Your Bubble
  <br>
</h1>

<h4 align="center">Being in America is hard, and let's be honest, as immigrants, we can use all the support we can get when trying to make it here. That is why our app strives to connect new immigrants to others who have been in their shoes and build relationships earlier on in their journey to achieve a successful integration into American society.</h4>

<p align="center">
  <a href="#inspiration">Inspiration</a> •
  <a href="#what-it-does">What It Does</a> •
  <a href="#how-we-built-it">How We Build It</a> •
  <a href="#challenges-we-ran-into">Challenges We Ran Into</a> •
  <a href="#accomplishments-were-proud-of">Accomplishments we're proud of</a> •
  <a href="#what-we-learnt">What we learnt</a>
  <a href="#whats-next">What's next</a>
</p>

## Inspiration
The inspiration for this project comes from a combination of 2 sources: research and personal life experience. While much of this is driven by personal encounters and accounts, we've backed it with research done in immigrant psychology and sociology.

There's a lot to draw on when it comes to personal experience, but our inspiration starts with one of our own teammates. Ritvik has been an international student in the United States since 2015, but even before that has moved around quite a bit. His family lived in various parts of India, Nigeria, and the United Arab Emirates. One of the most significant challenges he's faced being in a new place is gaining a sense of belonging. The result of consistently navigating various cultures and figuring out how to best interact within each one is the loss of individuality and affiliation.

The "honeymoon" phase of immigration is great but it's hard to maintain the momentum forever. Soon after arriving in the United States, immigrants are faced with culture shock and the realities of life in the US. This is the toughest phase of moving to another country, and studies have shown that being part of a community in this period help people regain their confidence in what they know, and feel more comfortable navigating their daily challenges.

The vision here is this: bring each immigrant in the United States to an autonomous phase where they feel confident to express their negative and positive emotions and move more freely through the "cultural maze". By bringing new immigrants closer to the communities they identify with on their arrival to the United States, we're able to help them build a foundation of confidence and trust.

## What It Does

* This app helps new immigrants find a community in their area.
* Based on languages and self described tags, users can "discover" other users (mentors or mentees) with similar attributes.

* Users can look through a "Discover" feed, which lists potential people to connect to.  These people are found through their langues and tags. Each profile show's the person's tags and a small bio.

* The resources page gives users preset resources, like quick clicks to emergency numbers and quick links to translating systems.
* Also gives users the option to create their own resources, which can include important addresses, phone numbers, and links.


## How We Built It

In building this app, we wanted to emphasize accessibility.  Because of this, we decide to create an Android App because Android is about 88% of the world's OS Market share.

We're using Firebase for our cloud storage and authentication, Google Translate API for localization, and various Android frameworks such as ButterKnife and MakeRamen to streamline some code components.

Our design is entirely original and emulates the Material Design tenants. We used AdobeXD and Zeplin to facilitate the design cycle and communication with developers.

## Challenges We Ran Into

Hackathons are an amazing forum to achieve primarily 1 thing: commit to a vision and drive it forward. For us this vision has always been bringing immigrants in the US to a point where they're confident of their place in this new society. We started off with a a [lot of ideas](https://funretro.io/publicboard/1fkgfJG5MpatQ3tXzVhgiz8hU8G2/f2f2576f-f5a7-4625-af91-caa630715f01) to get at this but needed to work on a high impact and value project.

We went through iterations of voting and discussions and landed on the idea of build a community platform powered by immigrants for immigrants. With this idea at hand, we worked on mapping user stories to understand where our app can have a competitive advantage. We initially had a much more elaborate platform in mind, but we scaled and prioritized the messaging platform for maximum initial impact.

Additionally, we spent a lot of time thinking about a compassionate user interface that doesn't put our users through another form. To build confidence and belonging, our onboarding takes a non traditional route by offering the product up front and then prompting a sign on request. We want our users to know that at Pave It Forward, it's their unique story that matters and we want to bring that forward at every point.

The technology behind our platform is optimized for security and accessibility. For security, we worked on abstracting a lot of unique identifying factors and replaced them with either generic ones or our custom UUIDs. Coming up with this such system at a scale is challenging because as more individuals join our platform, the ambiguity of who you are talking to increases. In order to bring back a personal touch, we implemented our own interest tags that allow users to understand each other up front without giving up personal (and sometimes sensitive) information. As for accessibility, we made our application highly backward compatible, sacrificing certain frameworks only available in newer versions of Android OS for a more primitive but easily accessible platform for anyone who signs on.  

We've had 31 hours to design and develop our idea. There're are some future elements missing, but the platform is solid. It is built to scale and serve an immigrant community that has ever changing needs.

## Accomplishments we're proud of

We leveraged the Google Translate API to translate our entire App to other languages.  The six language preferences were chosen because they are the world's most commonly spoken languages.  By increasing the language options in this app, we have eliminated english language proficiency as a requirement to use our app, which increases accessibility.

Another main focus we had was privacy.  Our whole app is accessible to people by just giving their first name.  We did this with the hope that not needing to disclose too much personal information will keep people from being fearful to join our app.  We were successfully able to create private messaging, and we also successfully stored the passwords where us as admins can't even access them.

We are very proud of our messaging system that we created.  We successfully implemented private messaging that has real-time updates and is sorted by time.


## What's next
We initially had many different aspects to the app, including events and locations.
However, we decided that the first step to building the user base of this app was to focus on the initial community building, which can be facilitated by the mentor/ mentee aspect.
Once this begins to be established, these other aspects will be implemented to help strengthen and grow the community.

* Events:
  - A person can search for events according to people, tags, and locations.
  - A person can create events.
   - The availability of the event can be changed. Certain friends can be invited, only people who subscribe to a specific tag can attend, or anyone interested can attend.
This "Events" feature will help facilitate community growth by giving people the opportunity to branch out from their initial mentor/ mentee group.

* Places:
  - People can look up cultural locations like temples or specialty markets
  - People can mark places with tags so others in the community can also enjoy.
The "Places" feature will help people have easier access to places that will help their transition.  An immigrant who is tired of eating American food can use this feature to search up restaurants or markets that sell foods and goods from their original home.  A Shia Muslim can find a Mosque specific to their version of Islam.  A place that is hostile towards immigrants can be marked so new immigrants know to avoid it.

* Mentor Groups:
  - Mentors can open these groups to connect their mentees to each other to expand their community network
  - Mentors and mentees can create events for their groups to facilitate friendship and community strengthening.
  - Groups can come together to create larger events for the greater community.
The mentor groups feature will continue to help the immigrant network grow.  Eventually, after paving their way, these mentees may choose to become mentors themselves, and will one day help a new immigrant with their transition into the community.

## The Team
From Carleton College, part of Carleton's Developers Exchange

---
> [Ritvik Kar](https://ritvik0.wixsite.com/ritvikkar) &nbsp;&middot;&nbsp;
> Senior, Computer Science and Cinema & Media Studies Major

> Thomas Scruggs &nbsp;&middot;&nbsp;
> Senior, Computer Science

> Anton Nagy &nbsp;&middot;&nbsp;
> Senior, Computer Science

> Aidan White &nbsp;&middot;&nbsp;
> Senior, Computer Science

> Noah Someck &nbsp;&middot;&nbsp;
> Senior, Computer Science, Philosophy minor

> Kevin Christianson &nbsp;&middot;&nbsp;
> Senior, Computer Science

> Alexis Engel &nbsp;&middot;&nbsp;
> Sophomore, Computer Science
