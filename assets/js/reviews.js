const reviews = [
  {
    "name": "Andre H.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "Three developers later",
    "text": "I was skeptical because we'd already paid to fix this twice. We had already paid three developers over nearly two years. One fixed the form but broke the gallery, another improved desktop and made mobile worse, and the third left behind custom code nobody wanted to touch. They mapped the failure points first, then gave each page a specific job. The audit uncovered two duplicate analytics tags, which explained a problem we had been blaming on something else. The process was organized enough that I never had to ask, “What are we waiting on?” It is the first version of the site I am not tempted to apologize for before someone opens it. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Dana N.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "Our site was hacked late on a Friday and visitors were being redirected to spam pages while our ads were still running. It was the kind of problem where every hour felt expensive. The annoying part was that each issue looked unrelated until somebody traced the full flow. They untangled the mobile flow first, then gave each page a specific job. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The explanations were plain English, which made approvals much faster on our side. There is less noise, fewer dead ends, and a much stronger sense of what to do next. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Theo J.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "Invisible unless you knew our name",
    "text": "The website looked respectable, but organic traffic was mostly people searching our exact business name. Important services barely had their own pages and the site gave Google very little context. They isolated the content gaps first, then ranked the fixes by impact. We had roughly 9 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The website stopped feeling like a maintenance project and started feeling like an asset. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Cole D.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "I was skeptical because we'd already paid to fix this twice. Our quote form technically worked, but on phones the keyboard covered fields, error messages jumped around, and the submit button sometimes vanished below a sticky bar. They isolated the mobile flow first, then built a sequence we could review step by step. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. A surprisingly useful change was moving proof beside the main call to action. They kept the parts that were already doing their job and only rebuilt what had a reason to change. They built around the content we actually had instead of filling gaps with generic marketing language. We now have landing pages I am comfortable sending paid traffic to. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Isabel Y.",
    "industry": "Roofing",
    "rating": 5,
    "title": "The technical work mattered",
    "text": "Years of WordPress plugins had turned simple updates into a gamble. The admin was slow, the front end was slower, and nobody knew which plugin was safe to remove. We tried one more quick patch before calling. That lasted about four days. They measured the form behavior first, then separated urgent work from nice-to-have work. A surprisingly useful change was moving proof beside the main call to action. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They kept the parts that were already doing their job and only rebuilt what had a reason to change. We now have landing pages I am comfortable sending paid traffic to. That sounds small until you realize how many customers were hitting the same issue every week. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Jordan D.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "Pretty site, confused customers",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. We had invested in a visually nice website, yet customers still called to ask things that were already on the page. The layout looked good in a screenshot but did not guide people very well. They prioritized the mobile flow first, then ranked the fixes by impact. The audit uncovered service pages competing for nearly the same search intent, which explained a problem we had been blaming on something else. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. They built around the content we actually had instead of filling gaps with generic marketing language. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The new version earns trust faster without trying so hard to look impressive. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Mira G.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "We were paying for Google Ads but sending most clicks to a generic homepage. The ad promised one service and the landing page opened with a completely different message. They untangled the scripts loading on every page first, then ranked the fixes by impact. One afternoon we tested 56 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Changes came in small checkpoints, so we could react before a bad idea became expensive. Updates do not feel dangerous anymore. I noticed the difference before looking at analytics because the questions customers asked us changed. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Natalie D.",
    "industry": "Photography",
    "rating": 5,
    "title": "A redesign wiped out old URLs",
    "text": "There wasn't one giant failure. It was a pile of little frustrations that had become normal to us. A previous redesign changed a lot of URLs without a redirect plan. Search Console filled with 404s and pages that used to rank simply disappeared from results. They cleaned up the failure points first, then gave each page a specific job. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. The site is faster, but the bigger win is that every page now has a job. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Alex N.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "Worth fixing the root problem",
    "text": "Desktop sales were acceptable, but mobile checkout had a cart drawer covering controls and shipping information appearing too late. People were abandoning after adding products. We tried one more quick patch before calling. That lasted about four days. They reproduced the navigation first, then gave each page a specific job. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. They showed the problem on real devices instead of describing it abstractly. They kept the parts that were already doing their job and only rebuilt what had a reason to change. People still browse, but far fewer get lost between the homepage and contact step. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Jordan G.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "A real cleanup",
    "text": "We had grown into multiple locations while the site still talked like a single neighborhood business. Customers could not tell which office served them and local pages were basically copies. They tested the old redirects first, then showed us which problems were symptoms and which were causes. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. The best improvement is that the site feels simpler even though it is doing more. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Rosa C.",
    "industry": "Clinic",
    "rating": 5,
    "title": "The forms said success but no email arrived",
    "text": "I had low expectations after two bad experiences with web projects. For months we thought demand had slowed down. Then a customer called to ask why we ignored a form submission, and we discovered some leads were never reaching our inbox. They audited the technical debt first, then built a sequence we could review step by step. We had roughly 56 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The new version earns trust faster without trying so hard to look impressive. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Ryan H.",
    "industry": "Construction",
    "rating": 5,
    "title": "Rebrand without throwing away SEO",
    "text": "We needed a complete visual update but already had valuable rankings. The scary part was changing the site without destroying URLs, internal links, metadata, or years of search history. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They traced the search structure first, then ranked the fixes by impact. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They cared about what happened after launch, not just getting screenshots approved. The explanations were plain English, which made approvals much faster on our side. I can finally send someone the website and let it explain the business without an extra paragraph from me. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. It was worth it just to stop worrying every time the site needed an update.",
    "sample": true
  },
  {
    "name": "Natalie V.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "The site was held together by patches",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. Every new feature had been added as another workaround. By the time we asked for help, changing one button could affect three unrelated sections. They audited the navigation first, then separated urgent work from nice-to-have work. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. The site finally feels like the company we run today. I noticed the difference before looking at analytics because the questions customers asked us changed. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Derek T.",
    "industry": "Accounting",
    "rating": 4,
    "title": "Lots of articles, almost no business impact",
    "text": "We had dozens of SEO posts bringing in traffic, but most were generic and disconnected from actual service pages. Reports looked busy; the phone did not. They traced the mobile flow first, then built a sequence we could review step by step. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. We finally had one person looking at the page, search intent, analytics, and customer behavior together. People still browse, but far fewer get lost between the homepage and contact step. That sounds small until you realize how many customers were hitting the same issue every week. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Ian W.",
    "industry": "Property Management",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. The clinic site had plenty of information, but scheduling took too many steps and the mobile experience felt dated. Staff kept answering questions the website should have answered. They untangled the scripts loading on every page first, then showed us which problems were symptoms and which were causes. The audit uncovered two duplicate analytics tags, which explained a problem we had been blaming on something else. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. We now have landing pages I am comfortable sending paid traffic to. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Andre N.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "Our menu was still a PDF",
    "text": "Customers on phones had to pinch and zoom a PDF menu, and half the time it was not the current version. Updating one price meant replacing a file and hoping every link pointed to it. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They compared the failure points first, then showed us which problems were symptoms and which were causes. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. I can finally send someone the website and let it explain the business without an extra paragraph from me. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Omar V.",
    "industry": "Photography",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "We do expensive custom work, but the website made us look like a small general contractor. The project photography was strong; everything around it was underselling us. They tested the scripts loading on every page first, then gave each page a specific job. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They cared about what happened after launch, not just getting screenshots approved. People still browse, but far fewer get lost between the homepage and contact step. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Chloe W.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "The website makes sense now",
    "text": "I did not want another developer who only fixed the exact symptom I pointed at. GA4, ad platforms, and a call tracker were all reporting different totals. Old tags were firing twice and we could not confidently tell which campaigns created actual leads. They tested the form behavior first, then gave each page a specific job. A surprisingly useful change was moving proof beside the main call to action. The audit uncovered service pages competing for nearly the same search intent, which explained a problem we had been blaming on something else. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. People still browse, but far fewer get lost between the homepage and contact step. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Jasmine W.",
    "industry": "Moving Company",
    "rating": 5,
    "title": "Two companies, two websites, one mess",
    "text": "After an acquisition we inherited a second site with overlapping services, conflicting brand language, duplicate pages, and inconsistent local listings. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They isolated the old redirects first, then ranked the fixes by impact. A surprisingly useful change was removing three competing popups. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Updates do not feel dangerous anymore. I noticed the difference before looking at analytics because the questions customers asked us changed. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Chris G.",
    "industry": "Solar",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "We had looked at the same site for so long that we stopped noticing how awkward it was. A customer told us they could not complete part of the site with a keyboard. That was the first time we realized accessibility was not just a compliance checkbox. They audited the navigation first, then ranked the fixes by impact. A surprisingly useful change was changing where reviews appeared. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. They built around the content we actually had instead of filling gaps with generic marketing language. We stopped treating SEO, design, and conversion as separate projects. The project actually got simpler as it went because we stopped trying to make every section do everything. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Derek G.",
    "industry": "Flooring",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "The admin area threw occasional 500 errors and every plugin update felt risky. We had backups, but no confidence that restoring one would actually put everything back correctly. They untangled the mobile flow first, then separated urgent work from nice-to-have work. One afternoon we tested 12 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. They cared about what happened after launch, not just getting screenshots approved. We finally had one person looking at the page, search intent, analytics, and customer behavior together. Customers are reaching the right service faster and asking better questions when they contact us. The project actually got simpler as it went because we stopped trying to make every section do everything. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Grace L.",
    "industry": "Dental",
    "rating": 5,
    "title": "Traffic dropped before busy season",
    "text": "I did not want another developer who only fixed the exact symptom I pointed at. Organic traffic slipped right before our busiest months. There was no dramatic penalty, just a collection of technical, content, and internal-linking problems that had quietly accumulated. They tested the tracking setup first, then gave each page a specific job. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They showed the problem on real devices instead of describing it abstractly. The website stopped feeling like a maintenance project and started feeling like an asset. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Dana R.",
    "industry": "Consulting",
    "rating": 5,
    "title": "Way less fragile",
    "text": "Our scheduler worked, but the moment someone clicked Book they landed in an interface that looked unrelated to us. The drop-off was obvious once we watched real users try it. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They reproduced the form behavior first, then showed us which problems were symptoms and which were causes. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Our marketing reports make more sense because tracking and page intent finally line up. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Paul M.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Finally matches the business",
    "text": "A past SEO vendor created city pages by swapping the city name in the same paragraph. They were technically unique URLs, but not genuinely useful pages. They cleaned up the technical debt first, then gave each page a specific job. One afternoon we tested 9 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The site finally feels like the company we run today. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Iris P.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "Not just a visual redesign",
    "text": "This had been sitting on my to-do list for over a year. The homepage had call now, book now, learn more, request a quote, free consultation, and get started buttons competing with each other. There was no obvious next step. They audited the form behavior first, then showed us which problems were symptoms and which were causes. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Omar G.",
    "industry": "Property Management",
    "rating": 5,
    "title": "The website still thought it was 2021",
    "text": "Old hours, temporary notices, outdated photos, and stale service details were still live years later. It made a healthy business look neglected. At first I assumed it was a small fix. It was not. They audited the content gaps first, then built a sequence we could review step by step. We had roughly 56 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. They cared about what happened after launch, not just getting screenshots approved. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Nick M.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "Great Google reviews, invisible on the site",
    "text": "I did not want another developer who only fixed the exact symptom I pointed at. We had years of strong customer feedback, but the website barely used it. New visitors saw a service list and phone number without the trust we had already earned elsewhere. They tested the scripts loading on every page first, then gave each page a specific job. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They built around the content we actually had instead of filling gaps with generic marketing language. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. The customer questions changed almost immediately, which was the first sign the new structure was working. That sounds small until you realize how many customers were hitting the same issue every week. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Leo R.",
    "industry": "Flooring",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "The firm had a lot of useful information, but the navigation mirrored internal practice-area terminology instead of the questions potential clients were actually asking. They mapped the content gaps first, then gave each page a specific job. A surprisingly useful change was changing where reviews appeared. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The explanations were plain English, which made approvals much faster on our side. The site finally feels like the company we run today. That sounds small until you realize how many customers were hitting the same issue every week. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "June K.",
    "industry": "Photography",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "I thought we needed a few visual changes. That was not really the problem. We had paid monthly SEO invoices for a long time and received polished PDFs full of charts. What we could not see was which pages changed, what was tested, or why leads should improve. They mapped the failure points first, then ranked the fixes by impact. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Ari Y.",
    "industry": "Real Estate",
    "rating": 4,
    "title": "Tablet exposed everything",
    "text": "Desktop looked okay and small phones were passable, but tablets produced huge gaps, broken card widths, and headlines colliding with buttons. At first I assumed it was a small fix. It was not. They compared the mobile flow first, then built a sequence we could review step by step. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The explanations were plain English, which made approvals much faster on our side. The new version earns trust faster without trying so hard to look impressive. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Peter P.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Our best photos were slowing the whole site",
    "text": "The portfolio needed large, detailed images, but they were uploaded directly from the photographer. Pages looked gorgeous after loading; the problem was how long that took. They traced the scripts loading on every page first, then built a sequence we could review step by step. The audit uncovered service pages competing for nearly the same search intent, which explained a problem we had been blaming on something else. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Updates do not feel dangerous anymore. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Anya P.",
    "industry": "Pest Control",
    "rating": 5,
    "title": "Forms were being sent from the wrong domain",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. Contact notifications were coming through an old email setup and some landed in spam. Customers assumed we were ignoring them when we genuinely never saw the message. They cleaned up the tracking setup first, then built a sequence we could review step by step. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. Changes came in small checkpoints, so we could react before a bad idea became expensive. They built around the content we actually had instead of filling gaps with generic marketing language. There is less noise, fewer dead ends, and a much stronger sense of what to do next. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Tina B.",
    "industry": "Insurance",
    "rating": 5,
    "title": "Finally matches the business",
    "text": "Our products looked good, but the pages were too thin. Buyers still emailed basic questions about sizing, materials, delivery, and returns before they felt safe ordering. The annoying part was that each issue looked unrelated until somebody traced the full flow. They cleaned up the mobile flow first, then built a sequence we could review step by step. A surprisingly useful change was cutting the navigation down. We had roughly 14 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The best improvement is that the site feels simpler even though it is doing more. The project actually got simpler as it went because we stopped trying to make every section do everything. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Max W.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "The homepage tried to contain the entire company",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. Over time every department had asked for one more section. The homepage became a wall of services, awards, announcements, testimonials, and promotions with no breathing room. They prioritized the old redirects first, then ranked the fixes by impact. A surprisingly useful change was changing where reviews appeared. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The best improvement is that the site feels simpler even though it is doing more. That sounds small until you realize how many customers were hitting the same issue every week. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Leah K.",
    "industry": "Solar",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "Several key pages ranked well, but lead volume stayed disappointing. The issue was not discovery anymore; it was what users saw and did after they arrived. They measured the technical debt first, then built a sequence we could review step by step. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The explanations were plain English, which made approvals much faster on our side. We stopped treating SEO, design, and conversion as separate projects. That sounds small until you realize how many customers were hitting the same issue every week. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Jordan Y.",
    "industry": "Flooring",
    "rating": 5,
    "title": "Every franchise location looked different",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. Local teams had edited their own pages for years. Messaging, photos, hours, calls to action, and even service names were inconsistent from one location to another. They prioritized the form behavior first, then separated urgent work from nice-to-have work. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. They showed the problem on real devices instead of describing it abstractly. The new version earns trust faster without trying so hard to look impressive. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Selena Y.",
    "industry": "Roofing",
    "rating": 5,
    "title": "Finally stable",
    "text": "We offered service in two languages, but translated pages were incomplete and internal links frequently returned visitors to the English site. The annoying part was that each issue looked unrelated until somebody traced the full flow. They reproduced the content gaps first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was cutting the navigation down. They cared about what happened after launch, not just getting screenshots approved. Changes came in small checkpoints, so we could react before a bad idea became expensive. Our lead quality improved because the site makes our priority services much clearer. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Victor J.",
    "industry": "Roofing",
    "rating": 5,
    "title": "Reviews were hidden where nobody went",
    "text": "We had years of positive feedback sitting on a testimonials page that almost no visitor opened. The strongest proof on the site was basically invisible. They measured the page hierarchy first, then built a sequence we could review step by step. A surprisingly useful change was giving each location its own useful content. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The new version earns trust faster without trying so hard to look impressive. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Tara G.",
    "industry": "Roofing",
    "rating": 5,
    "title": "Custom code with no owner",
    "text": "I kept putting this project off because I assumed it would turn into another headache. A former developer built several key features from scratch and then disappeared. There was no documentation, and every new developer quoted extra time just to understand what was there. They measured the conversion path first, then separated urgent work from nice-to-have work. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. There is less noise, fewer dead ends, and a much stronger sense of what to do next. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Jordan K.",
    "industry": "Photography",
    "rating": 5,
    "title": "The technical work mattered",
    "text": "The infection had been removed, but Google was still discovering thousands of junk URLs and strange titles. Cleanup had to continue after the server itself was safe. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They traced the technical debt first, then separated urgent work from nice-to-have work. We had roughly 18 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Our deadline was three weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Updates do not feel dangerous anymore. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Camila W.",
    "industry": "Consulting",
    "rating": 5,
    "title": "The business expanded faster than the website",
    "text": "What finally pushed me to act was hearing the same complaint from two customers in one week. We opened new service areas and hired more crews, but online we still looked like a single-location operation. The website had not caught up with the company. They reproduced the old redirects first, then gave each page a specific job. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. They built around the content we actually had instead of filling gaps with generic marketing language. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. It is the first version of the site I am not tempted to apologize for before someone opens it. The project actually got simpler as it went because we stopped trying to make every section do everything. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Adam D.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "Too many low-value leads",
    "text": "Lead volume was not terrible; lead quality was. The website treated every service equally even though we wanted to emphasize a smaller group of higher-value projects. They reproduced the form behavior first, then built a sequence we could review step by step. The audit uncovered a chain of old redirects, which explained a problem we had been blaming on something else. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. We finally had one person looking at the page, search intent, analytics, and customer behavior together. Our lead quality improved because the site makes our priority services much clearer. I noticed the difference before looking at analytics because the questions customers asked us changed. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Owen J.",
    "industry": "Moving Company",
    "rating": 5,
    "title": "The website makes sense now",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. Trusted experts, quality service, customer satisfaction—the whole site was filled with language anyone in our industry could claim. Nothing explained why we were actually different. They isolated the mobile flow first, then showed us which problems were symptoms and which were causes. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They built around the content we actually had instead of filling gaps with generic marketing language. It is the first version of the site I am not tempted to apologize for before someone opens it. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Adam C.",
    "industry": "Property Management",
    "rating": 5,
    "title": "Popups had taken over the phone screen",
    "text": "Chat, review prompts, discounts, cookie notices, and exit-intent offers were all layered on top of each other. On mobile, customers spent more time closing boxes than reading. The annoying part was that each issue looked unrelated until somebody traced the full flow. They measured the technical debt first, then gave each page a specific job. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. They kept the parts that were already doing their job and only rebuilt what had a reason to change. They showed the problem on real devices instead of describing it abstractly. Customers are reaching the right service faster and asking better questions when they contact us. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Jordan R.",
    "industry": "Electrical",
    "rating": 5,
    "title": "Not just a visual redesign",
    "text": "The business was adding recurring service for the first time. We needed to explain the new offer without making existing customers wonder whether regular service had disappeared. They traced the technical debt first, then separated urgent work from nice-to-have work. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. I can finally send someone the website and let it explain the business without an extra paragraph from me. I would hire them again.",
    "sample": true
  },
  {
    "name": "Mira S.",
    "industry": "Accounting",
    "rating": 5,
    "title": "Investor meetings made the old site embarrassing",
    "text": "There wasn't one giant failure. It was a pile of little frustrations that had become normal to us. The company had grown a lot, but our website still looked like the early-stage version. Before partnership meetings, we realized the first impression did not match the operation. They prioritized the old redirects first, then showed us which problems were symptoms and which were causes. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. Our deadline was three weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They built around the content we actually had instead of filling gaps with generic marketing language. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The new version earns trust faster without trying so hard to look impressive. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "June C.",
    "industry": "Solar",
    "rating": 5,
    "title": "Way less fragile",
    "text": "Informational articles were finally attracting readers, but there was no natural path from those articles to a relevant service, proof, or contact action. At first I assumed it was a small fix. It was not. They isolated the content gaps first, then separated urgent work from nice-to-have work. One afternoon we tested 12 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. They cared about what happened after launch, not just getting screenshots approved. The site finally feels like the company we run today. That sounds small until you realize how many customers were hitting the same issue every week. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Owen H.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "Site search made good content look bad",
    "text": "I had low expectations after two bad experiences with web projects. We had hundreds of useful pages and documents, but internal search returned old PDFs and irrelevant results first. People assumed the answer was not there. They compared the navigation first, then ranked the fixes by impact. I personally tried the final flow on our receptionist’s older Android, because that was where previous versions usually fell apart. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. Changes came in small checkpoints, so we could react before a bad idea became expensive. The site finally feels like the company we run today. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Natalie R.",
    "industry": "Private Practice",
    "rating": 4,
    "title": "Performance slowly regressed after launch",
    "text": "The redesign launched fast, then scripts, videos, tags, and widgets accumulated for six months. Nobody owned performance after launch, so the site quietly slowed down again. They cleaned up the old redirects first, then showed us which problems were symptoms and which were causes. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. One afternoon we tested 12 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They showed the problem on real devices instead of describing it abstractly. They kept the parts that were already doing their job and only rebuilt what had a reason to change. I can finally send someone the website and let it explain the business without an extra paragraph from me. I noticed the difference before looking at analytics because the questions customers asked us changed. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Chris W.",
    "industry": "Real Estate",
    "rating": 5,
    "title": "Our DIY site finally hit its ceiling",
    "text": "I kept putting this project off because I assumed it would turn into another headache. The original site was perfect when we started the business. Years later, new services, locations, staff, and marketing had outgrown a template we kept forcing to do more. They documented the form behavior first, then showed us which problems were symptoms and which were causes. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Luis P.",
    "industry": "Flooring",
    "rating": 5,
    "title": "Three developers later",
    "text": "We had already paid three developers over nearly two years. One fixed the form but broke the gallery, another improved desktop and made mobile worse, and the third left behind custom code nobody wanted to touch. The annoying part was that each issue looked unrelated until somebody traced the full flow. They prioritized the old redirects first, then separated urgent work from nice-to-have work. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. The explanations were plain English, which made approvals much faster on our side. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. We now have landing pages I am comfortable sending paid traffic to. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Derek V.",
    "industry": "Real Estate",
    "rating": 4,
    "title": "We should have done this sooner",
    "text": "Our site was hacked late on a Friday and visitors were being redirected to spam pages while our ads were still running. It was the kind of problem where every hour felt expensive. They prioritized the tracking setup first, then gave each page a specific job. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. They built around the content we actually had instead of filling gaps with generic marketing language. I can finally send someone the website and let it explain the business without an extra paragraph from me. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Leah J.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "Invisible unless you knew our name",
    "text": "I kept putting this project off because I assumed it would turn into another headache. The website looked respectable, but organic traffic was mostly people searching our exact business name. Important services barely had their own pages and the site gave Google very little context. They measured the failure points first, then built a sequence we could review step by step. Our deadline was three weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The audit uncovered a chain of old redirects, which explained a problem we had been blaming on something else. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. The site is faster, but the bigger win is that every page now has a job. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Ben F.",
    "industry": "Clinic",
    "rating": 5,
    "title": "The mobile form was costing us leads",
    "text": "Our quote form technically worked, but on phones the keyboard covered fields, error messages jumped around, and the submit button sometimes vanished below a sticky bar. The annoying part was that each issue looked unrelated until somebody traced the full flow. They untangled the old redirects first, then gave each page a specific job. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They kept the parts that were already doing their job and only rebuilt what had a reason to change. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Andre V.",
    "industry": "Construction",
    "rating": 5,
    "title": "No more guessing",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. Years of WordPress plugins had turned simple updates into a gamble. The admin was slow, the front end was slower, and nobody knew which plugin was safe to remove. They reproduced the tracking setup first, then built a sequence we could review step by step. A surprisingly useful change was moving proof beside the main call to action. One afternoon we tested 18 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. The new version earns trust faster without trying so hard to look impressive. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Paul W.",
    "industry": "Plumbing",
    "rating": 5,
    "title": "Finally matches the business",
    "text": "We had invested in a visually nice website, yet customers still called to ask things that were already on the page. The layout looked good in a screenshot but did not guide people very well. They tested the scripts loading on every page first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was moving proof beside the main call to action. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The process was organized enough that I never had to ask, “What are we waiting on?” It is the first version of the site I am not tempted to apologize for before someone opens it. That sounds small until you realize how many customers were hitting the same issue every week. It was worth it just to stop worrying every time the site needed an update.",
    "sample": true
  },
  {
    "name": "Theo P.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "A real cleanup",
    "text": "My main concern was not making things worse while trying to improve them. We were paying for Google Ads but sending most clicks to a generic homepage. The ad promised one service and the landing page opened with a completely different message. They traced the search structure first, then separated urgent work from nice-to-have work. One afternoon we tested 33 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Our lead quality improved because the site makes our priority services much clearer. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Maya S.",
    "industry": "Cleaning Company",
    "rating": 5,
    "title": "A redesign wiped out old URLs",
    "text": "A previous redesign changed a lot of URLs without a redirect plan. Search Console filled with 404s and pages that used to rank simply disappeared from results. We tried one more quick patch before calling. That lasted about four days. They traced the tracking setup first, then separated urgent work from nice-to-have work. A surprisingly useful change was making the quote form shorter. The explanations were plain English, which made approvals much faster on our side. Changes came in small checkpoints, so we could react before a bad idea became expensive. The site finally feels like the company we run today. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Jon S.",
    "industry": "Remodeling",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "Desktop sales were acceptable, but mobile checkout had a cart drawer covering controls and shipping information appearing too late. People were abandoning after adding products. They reproduced the technical debt first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Lena S.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "The website makes sense now",
    "text": "This had been sitting on my to-do list for over a year. We had grown into multiple locations while the site still talked like a single neighborhood business. Customers could not tell which office served them and local pages were basically copies. They isolated the conversion path first, then separated urgent work from nice-to-have work. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. A surprisingly useful change was rewriting the first screen. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Our staff spends noticeably less time explaining things the website should already make clear. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Rosa K.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "The forms said success but no email arrived",
    "text": "For months we thought demand had slowed down. Then a customer called to ask why we ignored a form submission, and we discovered some leads were never reaching our inbox. At first I assumed it was a small fix. It was not. They compared the technical debt first, then gave each page a specific job. A surprisingly useful change was changing where reviews appeared. One afternoon we tested 9 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They cared about what happened after launch, not just getting screenshots approved. The explanations were plain English, which made approvals much faster on our side. It is the first version of the site I am not tempted to apologize for before someone opens it. I noticed the difference before looking at analytics because the questions customers asked us changed. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Rosa G.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "Rebrand without throwing away SEO",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. We needed a complete visual update but already had valuable rankings. The scary part was changing the site without destroying URLs, internal links, metadata, or years of search history. They isolated the scripts loading on every page first, then gave each page a specific job. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They showed the problem on real devices instead of describing it abstractly. The site finally feels like the company we run today. That sounds small until you realize how many customers were hitting the same issue every week. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Cole V.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "Every new feature had been added as another workaround. By the time we asked for help, changing one button could affect three unrelated sections. They documented the old redirects first, then separated urgent work from nice-to-have work. One afternoon we tested 9 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The work felt less like decorating pages and more like removing friction one decision at a time. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. There is less noise, fewer dead ends, and a much stronger sense of what to do next. I noticed the difference before looking at analytics because the questions customers asked us changed. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Sam F.",
    "industry": "Insurance",
    "rating": 5,
    "title": "Lots of articles, almost no business impact",
    "text": "I had low expectations after two bad experiences with web projects. We had dozens of SEO posts bringing in traffic, but most were generic and disconnected from actual service pages. Reports looked busy; the phone did not. They reproduced the page hierarchy first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was rewriting the first screen. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Andre S.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "Finally stable",
    "text": "The clinic site had plenty of information, but scheduling took too many steps and the mobile experience felt dated. Staff kept answering questions the website should have answered. We tried one more quick patch before calling. That lasted about four days. They isolated the tracking setup first, then separated urgent work from nice-to-have work. The audit uncovered service pages competing for nearly the same search intent, which explained a problem we had been blaming on something else. They showed the problem on real devices instead of describing it abstractly. The work felt less like decorating pages and more like removing friction one decision at a time. People still browse, but far fewer get lost between the homepage and contact step. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Mateo W.",
    "industry": "Clinic",
    "rating": 5,
    "title": "Our menu was still a PDF",
    "text": "Customers on phones had to pinch and zoom a PDF menu, and half the time it was not the current version. Updating one price meant replacing a file and hoping every link pointed to it. They audited the form behavior first, then built a sequence we could review step by step. One afternoon we tested 12 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They kept the parts that were already doing their job and only rebuilt what had a reason to change. We now have landing pages I am comfortable sending paid traffic to. I would hire them again.",
    "sample": true
  },
  {
    "name": "Leo V.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "The website makes sense now",
    "text": "We had enough traffic to know the problem was not simply 'get more visitors.' We do expensive custom work, but the website made us look like a small general contractor. The project photography was strong; everything around it was underselling us. They cleaned up the search structure first, then ranked the fixes by impact. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. We had roughly 27 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The process was organized enough that I never had to ask, “What are we waiting on?” We stopped treating SEO, design, and conversion as separate projects. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Amir H.",
    "industry": "Insurance",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "GA4, ad platforms, and a call tracker were all reporting different totals. Old tags were firing twice and we could not confidently tell which campaigns created actual leads. The annoying part was that each issue looked unrelated until somebody traced the full flow. They cleaned up the old redirects first, then separated urgent work from nice-to-have work. We had roughly 14 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. They built around the content we actually had instead of filling gaps with generic marketing language. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Our staff spends noticeably less time explaining things the website should already make clear. I noticed the difference before looking at analytics because the questions customers asked us changed. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Megan Z.",
    "industry": "Roofing",
    "rating": 5,
    "title": "The technical work mattered",
    "text": "I had low expectations after two bad experiences with web projects. After an acquisition we inherited a second site with overlapping services, conflicting brand language, duplicate pages, and inconsistent local listings. They reproduced the tracking setup first, then gave each page a specific job. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. Changes came in small checkpoints, so we could react before a bad idea became expensive. People still browse, but far fewer get lost between the homepage and contact step. That sounds small until you realize how many customers were hitting the same issue every week. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Marcus K.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "Accessibility became real overnight",
    "text": "A customer told us they could not complete part of the site with a keyboard. That was the first time we realized accessibility was not just a compliance checkbox. They compared the content gaps first, then gave each page a specific job. I personally tried the final flow on our receptionist’s older Android, because that was where previous versions usually fell apart. We had roughly 18 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. They kept the parts that were already doing their job and only rebuilt what had a reason to change. The site is faster, but the bigger win is that every page now has a job. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Theo D.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "WordPress was one update away from trouble",
    "text": "I expected a redesign conversation. We ended up talking about how customers actually use the site. The admin area threw occasional 500 errors and every plugin update felt risky. We had backups, but no confidence that restoring one would actually put everything back correctly. They mapped the form behavior first, then gave each page a specific job. We had roughly 48 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. We now have landing pages I am comfortable sending paid traffic to. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Ryan H9.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "Organic traffic slipped right before our busiest months. There was no dramatic penalty, just a collection of technical, content, and internal-linking problems that had quietly accumulated. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They documented the content gaps first, then gave each page a specific job. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Our lead quality improved because the site makes our priority services much clearer. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Andre H1.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "No more guessing",
    "text": "Our scheduler worked, but the moment someone clicked Book they landed in an interface that looked unrelated to us. The drop-off was obvious once we watched real users try it. They documented the mobile flow first, then separated urgent work from nice-to-have work. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. Our staff spends noticeably less time explaining things the website should already make clear. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Leo W.",
    "industry": "Clinic",
    "rating": 5,
    "title": "Copy-paste location pages",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. A past SEO vendor created city pages by swapping the city name in the same paragraph. They were technically unique URLs, but not genuinely useful pages. They audited the old redirects first, then built a sequence we could review step by step. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. A surprisingly useful change was rewriting the first screen. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. It is the first version of the site I am not tempted to apologize for before someone opens it. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Daniel F.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "Every button was shouting",
    "text": "The homepage had call now, book now, learn more, request a quote, free consultation, and get started buttons competing with each other. There was no obvious next step. We tried one more quick patch before calling. That lasted about four days. They cleaned up the old redirects first, then separated urgent work from nice-to-have work. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The work felt less like decorating pages and more like removing friction one decision at a time. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. I noticed the difference before looking at analytics because the questions customers asked us changed. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Jasmine W4.",
    "industry": "Restaurant",
    "rating": 4,
    "title": "The website still thought it was 2021",
    "text": "This had been sitting on my to-do list for over a year. Old hours, temporary notices, outdated photos, and stale service details were still live years later. It made a healthy business look neglected. They traced the conversion path first, then ranked the fixes by impact. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. A surprisingly useful change was cutting the navigation down. They cared about what happened after launch, not just getting screenshots approved. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. The customer questions changed almost immediately, which was the first sign the new structure was working. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Evan R.",
    "industry": "Electrical",
    "rating": 5,
    "title": "Great Google reviews, invisible on the site",
    "text": "We had years of strong customer feedback, but the website barely used it. New visitors saw a service list and phone number without the trust we had already earned elsewhere. They mapped the technical debt first, then showed us which problems were symptoms and which were causes. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. Customers are reaching the right service faster and asking better questions when they contact us. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Ian T.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "Way less fragile",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. The firm had a lot of useful information, but the navigation mirrored internal practice-area terminology instead of the questions potential clients were actually asking. They measured the page hierarchy first, then ranked the fixes by impact. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. The process was organized enough that I never had to ask, “What are we waiting on?” Updates do not feel dangerous anymore. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Noah Y.",
    "industry": "Construction",
    "rating": 5,
    "title": "SEO reports with no clear work",
    "text": "We had paid monthly SEO invoices for a long time and received polished PDFs full of charts. What we could not see was which pages changed, what was tested, or why leads should improve. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They documented the navigation first, then ranked the fixes by impact. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. The best improvement is that the site feels simpler even though it is doing more. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Elena J.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "Tablet exposed everything",
    "text": "Desktop looked okay and small phones were passable, but tablets produced huge gaps, broken card widths, and headlines colliding with buttons. They documented the content gaps first, then ranked the fixes by impact. A surprisingly useful change was cutting the navigation down. They cared about what happened after launch, not just getting screenshots approved. The website stopped feeling like a maintenance project and started feeling like an asset. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Mira B.",
    "industry": "Clinic",
    "rating": 5,
    "title": "Way less fragile",
    "text": "By the time we reached out, I was tired of hearing that the issue was 'just the platform.' The portfolio needed large, detailed images, but they were uploaded directly from the photographer. Pages looked gorgeous after loading; the problem was how long that took. They documented the old redirects first, then built a sequence we could review step by step. One afternoon we tested 27 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The process was organized enough that I never had to ask, “What are we waiting on?” The best improvement is that the site feels simpler even though it is doing more. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Lena N.",
    "industry": "Home Services",
    "rating": 5,
    "title": "Forms were being sent from the wrong domain",
    "text": "Contact notifications were coming through an old email setup and some landed in spam. Customers assumed we were ignoring them when we genuinely never saw the message. We tried one more quick patch before calling. That lasted about four days. They prioritized the search structure first, then built a sequence we could review step by step. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The explanations were plain English, which made approvals much faster on our side. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. I can finally send someone the website and let it explain the business without an extra paragraph from me. I noticed the difference before looking at analytics because the questions customers asked us changed. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Elena Y.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "Product pages had photos but no answers",
    "text": "There wasn't one giant failure. It was a pile of little frustrations that had become normal to us. Our products looked good, but the pages were too thin. Buyers still emailed basic questions about sizing, materials, delivery, and returns before they felt safe ordering. They isolated the failure points first, then showed us which problems were symptoms and which were causes. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. We finally had one person looking at the page, search intent, analytics, and customer behavior together. Updates do not feel dangerous anymore. The project actually got simpler as it went because we stopped trying to make every section do everything. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Megan N.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "The homepage tried to contain the entire company",
    "text": "Over time every department had asked for one more section. The homepage became a wall of services, awards, announcements, testimonials, and promotions with no breathing room. They tested the tracking setup first, then gave each page a specific job. A surprisingly useful change was changing where reviews appeared. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. There is less noise, fewer dead ends, and a much stronger sense of what to do next. The project actually got simpler as it went because we stopped trying to make every section do everything. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Roman M.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "Ranking was not the same as converting",
    "text": "I was skeptical because we'd already paid to fix this twice. Several key pages ranked well, but lead volume stayed disappointing. The issue was not discovery anymore; it was what users saw and did after they arrived. They untangled the tracking setup first, then separated urgent work from nice-to-have work. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. Changes came in small checkpoints, so we could react before a bad idea became expensive. Mobile no longer feels like a compromised version of desktop. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Sam J.",
    "industry": "Property Management",
    "rating": 5,
    "title": "Every franchise location looked different",
    "text": "Local teams had edited their own pages for years. Messaging, photos, hours, calls to action, and even service names were inconsistent from one location to another. At first I assumed it was a small fix. It was not. They isolated the scripts loading on every page first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The site is faster, but the bigger win is that every page now has a job. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Camila S.",
    "industry": "Consulting",
    "rating": 5,
    "title": "Bilingual pages kept dumping people back into English",
    "text": "We offered service in two languages, but translated pages were incomplete and internal links frequently returned visitors to the English site. They measured the page hierarchy first, then built a sequence we could review step by step. A surprisingly useful change was removing three competing popups. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Updates do not feel dangerous anymore. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Priya Y.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "Reviews were hidden where nobody went",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. We had years of positive feedback sitting on a testimonials page that almost no visitor opened. The strongest proof on the site was basically invisible. They reproduced the form behavior first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. We had roughly 41 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The process was organized enough that I never had to ask, “What are we waiting on?” The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Our marketing reports make more sense because tracking and page intent finally line up. It was worth it just to stop worrying every time the site needed an update.",
    "sample": true
  },
  {
    "name": "Sofia Z.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "Not just a visual redesign",
    "text": "A former developer built several key features from scratch and then disappeared. There was no documentation, and every new developer quoted extra time just to understand what was there. The annoying part was that each issue looked unrelated until somebody traced the full flow. They reproduced the old redirects first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was making the quote form shorter. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. They built around the content we actually had instead of filling gaps with generic marketing language. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. I noticed the difference before looking at analytics because the questions customers asked us changed. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Alex C.",
    "industry": "Cleaning Company",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "I was skeptical because we'd already paid to fix this twice. The infection had been removed, but Google was still discovering thousands of junk URLs and strange titles. Cleanup had to continue after the server itself was safe. They audited the navigation first, then showed us which problems were symptoms and which were causes. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. We now have landing pages I am comfortable sending paid traffic to. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Monica C.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Not just a visual redesign",
    "text": "We opened new service areas and hired more crews, but online we still looked like a single-location operation. The website had not caught up with the company. They cleaned up the tracking setup first, then built a sequence we could review step by step. We had roughly 21 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. Our lead quality improved because the site makes our priority services much clearer. I noticed the difference before looking at analytics because the questions customers asked us changed. It was worth it just to stop worrying every time the site needed an update.",
    "sample": true
  },
  {
    "name": "Elena W.",
    "industry": "Property Management",
    "rating": 4,
    "title": "Too many low-value leads",
    "text": "We had enough traffic to know the problem was not simply 'get more visitors.' Lead volume was not terrible; lead quality was. The website treated every service equally even though we wanted to emphasize a smaller group of higher-value projects. They reproduced the mobile flow first, then ranked the fixes by impact. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. They cared about what happened after launch, not just getting screenshots approved. Our staff spends noticeably less time explaining things the website should already make clear. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Daniel L.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "Trusted experts, quality service, customer satisfaction—the whole site was filled with language anyone in our industry could claim. Nothing explained why we were actually different. The annoying part was that each issue looked unrelated until somebody traced the full flow. They untangled the form behavior first, then gave each page a specific job. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They showed the problem on real devices instead of describing it abstractly. People still browse, but far fewer get lost between the homepage and contact step. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Megan B.",
    "industry": "Construction",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "Chat, review prompts, discounts, cookie notices, and exit-intent offers were all layered on top of each other. On mobile, customers spent more time closing boxes than reading. They mapped the navigation first, then built a sequence we could review step by step. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. We stopped treating SEO, design, and conversion as separate projects. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Amir M.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "We were launching a membership",
    "text": "I normally don't leave detailed reviews, but there is a lot of context here. The business was adding recurring service for the first time. We needed to explain the new offer without making existing customers wonder whether regular service had disappeared. They measured the scripts loading on every page first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was cutting the navigation down. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The work felt less like decorating pages and more like removing friction one decision at a time. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. Updates do not feel dangerous anymore. I would hire them again.",
    "sample": true
  },
  {
    "name": "Elena Y6.",
    "industry": "Electrical",
    "rating": 5,
    "title": "The technical work mattered",
    "text": "The company had grown a lot, but our website still looked like the early-stage version. Before partnership meetings, we realized the first impression did not match the operation. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They compared the page hierarchy first, then ranked the fixes by impact. A surprisingly useful change was making the quote form shorter. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. Our lead quality improved because the site makes our priority services much clearer. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Tara B.",
    "industry": "Photography",
    "rating": 5,
    "title": "Better on every device",
    "text": "We had enough traffic to know the problem was not simply 'get more visitors.' Informational articles were finally attracting readers, but there was no natural path from those articles to a relevant service, proof, or contact action. They untangled the failure points first, then showed us which problems were symptoms and which were causes. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. They cared about what happened after launch, not just getting screenshots approved. The explanations were plain English, which made approvals much faster on our side. Our staff spends noticeably less time explaining things the website should already make clear. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Roman Y.",
    "industry": "Electrical",
    "rating": 4,
    "title": "Site search made good content look bad",
    "text": "We had hundreds of useful pages and documents, but internal search returned old PDFs and irrelevant results first. People assumed the answer was not there. They documented the mobile flow first, then separated urgent work from nice-to-have work. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Changes came in small checkpoints, so we could react before a bad idea became expensive. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The customer questions changed almost immediately, which was the first sign the new structure was working. That sounds small until you realize how many customers were hitting the same issue every week. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Dana D.",
    "industry": "Photography",
    "rating": 5,
    "title": "Finally matches the business",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. The redesign launched fast, then scripts, videos, tags, and widgets accumulated for six months. Nobody owned performance after launch, so the site quietly slowed down again. They mapped the old redirects first, then built a sequence we could review step by step. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The website stopped feeling like a maintenance project and started feeling like an asset. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Owen J1.",
    "industry": "Solar",
    "rating": 5,
    "title": "Our DIY site finally hit its ceiling",
    "text": "The original site was perfect when we started the business. Years later, new services, locations, staff, and marketing had outgrown a template we kept forcing to do more. The annoying part was that each issue looked unrelated until somebody traced the full flow. They audited the scripts loading on every page first, then gave each page a specific job. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. The work felt less like decorating pages and more like removing friction one decision at a time. Updates do not feel dangerous anymore. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Maya G.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "Three developers later",
    "text": "We had already paid three developers over nearly two years. One fixed the form but broke the gallery, another improved desktop and made mobile worse, and the third left behind custom code nobody wanted to touch. They documented the navigation first, then built a sequence we could review step by step. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Our lead quality improved because the site makes our priority services much clearer. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Rosa Z.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "I thought we needed a few visual changes. That was not really the problem. Our site was hacked late on a Friday and visitors were being redirected to spam pages while our ads were still running. It was the kind of problem where every hour felt expensive. They reproduced the navigation first, then built a sequence we could review step by step. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. It is the first version of the site I am not tempted to apologize for before someone opens it. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Amir F.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "Invisible unless you knew our name",
    "text": "The website looked respectable, but organic traffic was mostly people searching our exact business name. Important services barely had their own pages and the site gave Google very little context. At first I assumed it was a small fix. It was not. They tested the tracking setup first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was changing where reviews appeared. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. Changes came in small checkpoints, so we could react before a bad idea became expensive. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. Updates do not feel dangerous anymore. The project actually got simpler as it went because we stopped trying to make every section do everything. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Ian T5.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "I was skeptical because we'd already paid to fix this twice. Our quote form technically worked, but on phones the keyboard covered fields, error messages jumped around, and the submit button sometimes vanished below a sticky bar. They audited the tracking setup first, then showed us which problems were symptoms and which were causes. Our deadline was three weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. One afternoon we tested 48 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. Changes came in small checkpoints, so we could react before a bad idea became expensive. The work felt less like decorating pages and more like removing friction one decision at a time. Updates do not feel dangerous anymore. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Rosa S.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "Years of WordPress plugins had turned simple updates into a gamble. The admin was slow, the front end was slower, and nobody knew which plugin was safe to remove. They documented the scripts loading on every page first, then built a sequence we could review step by step. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. A surprisingly useful change was changing where reviews appeared. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The site finally feels like the company we run today. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Natalie R7.",
    "industry": "Home Services",
    "rating": 5,
    "title": "The website makes sense now",
    "text": "I expected a redesign conversation. We ended up talking about how customers actually use the site. We had invested in a visually nice website, yet customers still called to ask things that were already on the page. The layout looked good in a screenshot but did not guide people very well. They isolated the technical debt first, then ranked the fixes by impact. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Customers are reaching the right service faster and asking better questions when they contact us. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Dana Z.",
    "industry": "Remodeling",
    "rating": 5,
    "title": "Ads landing on the wrong page",
    "text": "We were paying for Google Ads but sending most clicks to a generic homepage. The ad promised one service and the landing page opened with a completely different message. The annoying part was that each issue looked unrelated until somebody traced the full flow. They mapped the technical debt first, then built a sequence we could review step by step. We had roughly 56 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. We finally had one person looking at the page, search intent, analytics, and customer behavior together. We stopped treating SEO, design, and conversion as separate projects. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Jordan Z.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "Way less fragile",
    "text": "A previous redesign changed a lot of URLs without a redirect plan. Search Console filled with 404s and pages that used to rank simply disappeared from results. They tested the navigation first, then gave each page a specific job. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Customers are reaching the right service faster and asking better questions when they contact us. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Chris Z.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "Checkout looked fine until you used a phone",
    "text": "We had enough traffic to know the problem was not simply 'get more visitors.' Desktop sales were acceptable, but mobile checkout had a cart drawer covering controls and shipping information appearing too late. People were abandoning after adding products. They prioritized the page hierarchy first, then gave each page a specific job. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The explanations were plain English, which made approvals much faster on our side. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. There is less noise, fewer dead ends, and a much stronger sense of what to do next. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Theo P2.",
    "industry": "Clinic",
    "rating": 5,
    "title": "Three locations, one generic website",
    "text": "We had grown into multiple locations while the site still talked like a single neighborhood business. Customers could not tell which office served them and local pages were basically copies. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They documented the tracking setup first, then gave each page a specific job. A surprisingly useful change was moving proof beside the main call to action. We had roughly 48 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. I can finally send someone the website and let it explain the business without an extra paragraph from me. That sounds small until you realize how many customers were hitting the same issue every week. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Ari D.",
    "industry": "Cleaning Company",
    "rating": 5,
    "title": "The forms said success but no email arrived",
    "text": "The first call felt different because nobody tried to sell me a package in the first five minutes. For months we thought demand had slowed down. Then a customer called to ask why we ignored a form submission, and we discovered some leads were never reaching our inbox. They measured the mobile flow first, then gave each page a specific job. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. The work felt less like decorating pages and more like removing friction one decision at a time. Our marketing reports make more sense because tracking and page intent finally line up. The project actually got simpler as it went because we stopped trying to make every section do everything. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Jordan F.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Rebrand without throwing away SEO",
    "text": "We needed a complete visual update but already had valuable rankings. The scary part was changing the site without destroying URLs, internal links, metadata, or years of search history. They traced the failure points first, then gave each page a specific job. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. A surprisingly useful change was moving proof beside the main call to action. The work felt less like decorating pages and more like removing friction one decision at a time. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. That sounds small until you realize how many customers were hitting the same issue every week. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Lena M.",
    "industry": "Insurance",
    "rating": 5,
    "title": "The site was held together by patches",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. Every new feature had been added as another workaround. By the time we asked for help, changing one button could affect three unrelated sections. They traced the tracking setup first, then separated urgent work from nice-to-have work. We had roughly 18 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. They built around the content we actually had instead of filling gaps with generic marketing language. The website stopped feeling like a maintenance project and started feeling like an asset. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Cole S.",
    "industry": "Construction",
    "rating": 5,
    "title": "Lots of articles, almost no business impact",
    "text": "We had dozens of SEO posts bringing in traffic, but most were generic and disconnected from actual service pages. Reports looked busy; the phone did not. The annoying part was that each issue looked unrelated until somebody traced the full flow. They untangled the mobile flow first, then ranked the fixes by impact. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Customers are reaching the right service faster and asking better questions when they contact us. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "June F.",
    "industry": "Construction",
    "rating": 5,
    "title": "Patients could read but not book",
    "text": "The clinic site had plenty of information, but scheduling took too many steps and the mobile experience felt dated. Staff kept answering questions the website should have answered. They cleaned up the failure points first, then separated urgent work from nice-to-have work. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. There is less noise, fewer dead ends, and a much stronger sense of what to do next. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Nina L.",
    "industry": "Med Spa",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "I came in with a very specific list and still missed the biggest problem. Customers on phones had to pinch and zoom a PDF menu, and half the time it was not the current version. Updating one price meant replacing a file and hoping every link pointed to it. They isolated the content gaps first, then built a sequence we could review step by step. We had roughly 9 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The part I expected to be complicated—rebuilding the forms—ended up being the part with the clearest plan. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They showed the problem on real devices instead of describing it abstractly. Our marketing reports make more sense because tracking and page intent finally line up. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Tina T.",
    "industry": "Remodeling",
    "rating": 5,
    "title": "The work looked premium, the site did not",
    "text": "We do expensive custom work, but the website made us look like a small general contractor. The project photography was strong; everything around it was underselling us. At first I assumed it was a small fix. It was not. They documented the navigation first, then separated urgent work from nice-to-have work. One afternoon we tested 56 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. People still browse, but far fewer get lost between the homepage and contact step. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Dana W.",
    "industry": "Plumbing",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. GA4, ad platforms, and a call tracker were all reporting different totals. Old tags were firing twice and we could not confidently tell which campaigns created actual leads. They cleaned up the conversion path first, then separated urgent work from nice-to-have work. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. They cared about what happened after launch, not just getting screenshots approved. The best improvement is that the site feels simpler even though it is doing more. I noticed the difference before looking at analytics because the questions customers asked us changed. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Isabel W.",
    "industry": "Photography",
    "rating": 5,
    "title": "Two companies, two websites, one mess",
    "text": "After an acquisition we inherited a second site with overlapping services, conflicting brand language, duplicate pages, and inconsistent local listings. They traced the conversion path first, then gave each page a specific job. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. One afternoon we tested 27 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Updates do not feel dangerous anymore. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "June S.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Accessibility became real overnight",
    "text": "What finally pushed me to act was hearing the same complaint from two customers in one week. A customer told us they could not complete part of the site with a keyboard. That was the first time we realized accessibility was not just a compliance checkbox. They cleaned up the content gaps first, then built a sequence we could review step by step. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. I can finally send someone the website and let it explain the business without an extra paragraph from me. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Peter J.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "The admin area threw occasional 500 errors and every plugin update felt risky. We had backups, but no confidence that restoring one would actually put everything back correctly. The annoying part was that each issue looked unrelated until somebody traced the full flow. They isolated the content gaps first, then gave each page a specific job. One afternoon we tested 14 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. There is less noise, fewer dead ends, and a much stronger sense of what to do next. I would hire them again.",
    "sample": true
  },
  {
    "name": "Mila Z.",
    "industry": "Accounting",
    "rating": 5,
    "title": "Finally stable",
    "text": "Organic traffic slipped right before our busiest months. There was no dramatic penalty, just a collection of technical, content, and internal-linking problems that had quietly accumulated. They isolated the scripts loading on every page first, then built a sequence we could review step by step. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. Customers are reaching the right service faster and asking better questions when they contact us. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Lena G.",
    "industry": "Clinic",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "I was skeptical because we'd already paid to fix this twice. Our scheduler worked, but the moment someone clicked Book they landed in an interface that looked unrelated to us. The drop-off was obvious once we watched real users try it. They measured the page hierarchy first, then ranked the fixes by impact. We had roughly 18 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Customers are reaching the right service faster and asking better questions when they contact us. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Max T.",
    "industry": "Property Management",
    "rating": 5,
    "title": "Copy-paste location pages",
    "text": "A past SEO vendor created city pages by swapping the city name in the same paragraph. They were technically unique URLs, but not genuinely useful pages. The annoying part was that each issue looked unrelated until somebody traced the full flow. They cleaned up the search structure first, then separated urgent work from nice-to-have work. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. One afternoon we tested 21 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They built around the content we actually had instead of filling gaps with generic marketing language. The best improvement is that the site feels simpler even though it is doing more. I noticed the difference before looking at analytics because the questions customers asked us changed. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Nick L.",
    "industry": "Fitness Studio",
    "rating": 5,
    "title": "Every button was shouting",
    "text": "This had been sitting on my to-do list for over a year. The homepage had call now, book now, learn more, request a quote, free consultation, and get started buttons competing with each other. There was no obvious next step. They measured the conversion path first, then ranked the fixes by impact. The audit uncovered a chain of old redirects, which explained a problem we had been blaming on something else. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The process was organized enough that I never had to ask, “What are we waiting on?” They kept the parts that were already doing their job and only rebuilt what had a reason to change. The website stopped feeling like a maintenance project and started feeling like an asset. I noticed the difference before looking at analytics because the questions customers asked us changed. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Leo H.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "The website still thought it was 2021",
    "text": "Old hours, temporary notices, outdated photos, and stale service details were still live years later. It made a healthy business look neglected. They isolated the technical debt first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was making the quote form shorter. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. They kept the parts that were already doing their job and only rebuilt what had a reason to change. The customer questions changed almost immediately, which was the first sign the new structure was working. The project actually got simpler as it went because we stopped trying to make every section do everything. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Camila Z.",
    "industry": "Property Management",
    "rating": 5,
    "title": "Great Google reviews, invisible on the site",
    "text": "By the time we reached out, I was tired of hearing that the issue was 'just the platform.' We had years of strong customer feedback, but the website barely used it. New visitors saw a service list and phone number without the trust we had already earned elsewhere. They cleaned up the page hierarchy first, then built a sequence we could review step by step. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Omar C.",
    "industry": "Pest Control",
    "rating": 5,
    "title": "Legal content nobody could navigate",
    "text": "The firm had a lot of useful information, but the navigation mirrored internal practice-area terminology instead of the questions potential clients were actually asking. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They reproduced the content gaps first, then gave each page a specific job. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. Our marketing reports make more sense because tracking and page intent finally line up. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Tara H.",
    "industry": "Solar",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "We had paid monthly SEO invoices for a long time and received polished PDFs full of charts. What we could not see was which pages changed, what was tested, or why leads should improve. They audited the mobile flow first, then separated urgent work from nice-to-have work. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Customers are reaching the right service faster and asking better questions when they contact us. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Camila Z4.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "Tablet exposed everything",
    "text": "This had been sitting on my to-do list for over a year. Desktop looked okay and small phones were passable, but tablets produced huge gaps, broken card widths, and headlines colliding with buttons. They isolated the old redirects first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. They cared about what happened after launch, not just getting screenshots approved. Our lead quality improved because the site makes our priority services much clearer. I would hire them again.",
    "sample": true
  },
  {
    "name": "Ari W.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "Our best photos were slowing the whole site",
    "text": "The portfolio needed large, detailed images, but they were uploaded directly from the photographer. Pages looked gorgeous after loading; the problem was how long that took. The annoying part was that each issue looked unrelated until somebody traced the full flow. They prioritized the failure points first, then gave each page a specific job. One afternoon we tested 27 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. They showed the problem on real devices instead of describing it abstractly. The process was organized enough that I never had to ask, “What are we waiting on?” The best improvement is that the site feels simpler even though it is doing more. I noticed the difference before looking at analytics because the questions customers asked us changed. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Kira K.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. Contact notifications were coming through an old email setup and some landed in spam. Customers assumed we were ignoring them when we genuinely never saw the message. They compared the navigation first, then ranked the fixes by impact. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. Our lead quality improved because the site makes our priority services much clearer. The project actually got simpler as it went because we stopped trying to make every section do everything. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Megan C.",
    "industry": "Insurance",
    "rating": 5,
    "title": "Product pages had photos but no answers",
    "text": "Our products looked good, but the pages were too thin. Buyers still emailed basic questions about sizing, materials, delivery, and returns before they felt safe ordering. They compared the scripts loading on every page first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on our receptionist’s older Android, because that was where previous versions usually fell apart. We had roughly 21 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The process was organized enough that I never had to ask, “What are we waiting on?” They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. People still browse, but far fewer get lost between the homepage and contact step. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Natalie Y.",
    "industry": "Solar",
    "rating": 5,
    "title": "The homepage tried to contain the entire company",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. Over time every department had asked for one more section. The homepage became a wall of services, awards, announcements, testimonials, and promotions with no breathing room. They untangled the search structure first, then showed us which problems were symptoms and which were causes. One afternoon we tested 41 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Our lead quality improved because the site makes our priority services much clearer. This was the first web project where I did not feel like I had to become the project manager.",
    "sample": true
  },
  {
    "name": "Sofia M.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "Ranking was not the same as converting",
    "text": "Several key pages ranked well, but lead volume stayed disappointing. The issue was not discovery anymore; it was what users saw and did after they arrived. The annoying part was that each issue looked unrelated until somebody traced the full flow. They reproduced the failure points first, then gave each page a specific job. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. I can finally send someone the website and let it explain the business without an extra paragraph from me. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Derek M.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "Local teams had edited their own pages for years. Messaging, photos, hours, calls to action, and even service names were inconsistent from one location to another. They reproduced the search structure first, then separated urgent work from nice-to-have work. The part I expected to be complicated—preserving old URLs—ended up being the part with the clearest plan. The work felt less like decorating pages and more like removing friction one decision at a time. We now have landing pages I am comfortable sending paid traffic to. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Jasmine T.",
    "industry": "Moving Company",
    "rating": 5,
    "title": "Bilingual pages kept dumping people back into English",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. We offered service in two languages, but translated pages were incomplete and internal links frequently returned visitors to the English site. They untangled the page hierarchy first, then showed us which problems were symptoms and which were causes. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. We now have landing pages I am comfortable sending paid traffic to. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Jordan K3.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "Reviews were hidden where nobody went",
    "text": "We had years of positive feedback sitting on a testimonials page that almost no visitor opened. The strongest proof on the site was basically invisible. We tried one more quick patch before calling. That lasted about four days. They measured the content gaps first, then separated urgent work from nice-to-have work. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. We had roughly 21 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Changes came in small checkpoints, so we could react before a bad idea became expensive. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Updates do not feel dangerous anymore. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Noah C.",
    "industry": "Consulting",
    "rating": 5,
    "title": "Better on every device",
    "text": "I came in with a very specific list and still missed the biggest problem. A former developer built several key features from scratch and then disappeared. There was no documentation, and every new developer quoted extra time just to understand what was there. They reproduced the mobile flow first, then ranked the fixes by impact. We had roughly 41 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. People still browse, but far fewer get lost between the homepage and contact step. That sounds small until you realize how many customers were hitting the same issue every week. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Tina W.",
    "industry": "HVAC",
    "rating": 5,
    "title": "Malware was gone, spam URLs were not",
    "text": "The infection had been removed, but Google was still discovering thousands of junk URLs and strange titles. Cleanup had to continue after the server itself was safe. They traced the form behavior first, then ranked the fixes by impact. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. They cared about what happened after launch, not just getting screenshots approved. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Our staff spends noticeably less time explaining things the website should already make clear. That sounds small until you realize how many customers were hitting the same issue every week. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Jon D.",
    "industry": "Jewelry",
    "rating": 5,
    "title": "The business expanded faster than the website",
    "text": "My main concern was not making things worse while trying to improve them. We opened new service areas and hired more crews, but online we still looked like a single-location operation. The website had not caught up with the company. They compared the search structure first, then separated urgent work from nice-to-have work. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. There is less noise, fewer dead ends, and a much stronger sense of what to do next. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Dana T.",
    "industry": "Dental",
    "rating": 5,
    "title": "Too many low-value leads",
    "text": "Lead volume was not terrible; lead quality was. The website treated every service equally even though we wanted to emphasize a smaller group of higher-value projects. We tried one more quick patch before calling. That lasted about four days. They cleaned up the failure points first, then separated urgent work from nice-to-have work. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. We stopped treating SEO, design, and conversion as separate projects. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Rosa Y.",
    "industry": "Home Services",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "Trusted experts, quality service, customer satisfaction—the whole site was filled with language anyone in our industry could claim. Nothing explained why we were actually different. They audited the mobile flow first, then ranked the fixes by impact. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. We did not wake up to magical rankings, but the foundation is finally coherent enough to build on. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Priya T.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "Popups had taken over the phone screen",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. Chat, review prompts, discounts, cookie notices, and exit-intent offers were all layered on top of each other. On mobile, customers spent more time closing boxes than reading. They reproduced the conversion path first, then built a sequence we could review step by step. A surprisingly useful change was rewriting the first screen. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The website stopped feeling like a maintenance project and started feeling like an asset. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Elena J1.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "We were launching a membership",
    "text": "The business was adding recurring service for the first time. We needed to explain the new offer without making existing customers wonder whether regular service had disappeared. At first I assumed it was a small fix. It was not. They isolated the old redirects first, then built a sequence we could review step by step. A surprisingly useful change was moving proof beside the main call to action. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The site is faster, but the bigger win is that every page now has a job. That sounds small until you realize how many customers were hitting the same issue every week. It was worth it just to stop worrying every time the site needed an update.",
    "sample": true
  },
  {
    "name": "Mila N.",
    "industry": "Law Firm",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "I came in with a very specific list and still missed the biggest problem. The company had grown a lot, but our website still looked like the early-stage version. Before partnership meetings, we realized the first impression did not match the operation. They untangled the old redirects first, then ranked the fixes by impact. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The site is faster, but the bigger win is that every page now has a job. I noticed the difference before looking at analytics because the questions customers asked us changed. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Evan Y.",
    "industry": "Insurance",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "Informational articles were finally attracting readers, but there was no natural path from those articles to a relevant service, proof, or contact action. They cleaned up the navigation first, then ranked the fixes by impact. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Our marketing reports make more sense because tracking and page intent finally line up. I noticed the difference before looking at analytics because the questions customers asked us changed. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Megan J.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "Finally stable",
    "text": "I had low expectations after two bad experiences with web projects. We had hundreds of useful pages and documents, but internal search returned old PDFs and irrelevant results first. People assumed the answer was not there. They prioritized the content gaps first, then ranked the fixes by impact. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. The work felt less like decorating pages and more like removing friction one decision at a time. The website stopped feeling like a maintenance project and started feeling like an asset. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Chris K.",
    "industry": "Solar",
    "rating": 5,
    "title": "A real cleanup",
    "text": "The redesign launched fast, then scripts, videos, tags, and widgets accumulated for six months. Nobody owned performance after launch, so the site quietly slowed down again. We tried one more quick patch before calling. That lasted about four days. They cleaned up the scripts loading on every page first, then separated urgent work from nice-to-have work. We had roughly 21 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Mobile no longer feels like a compromised version of desktop. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Evan B.",
    "industry": "Moving Company",
    "rating": 4,
    "title": "Our DIY site finally hit its ceiling",
    "text": "The original site was perfect when we started the business. Years later, new services, locations, staff, and marketing had outgrown a template we kept forcing to do more. They cleaned up the failure points first, then separated urgent work from nice-to-have work. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. They tested the boring stuff—forms, redirects, mobile spacing, tracking—which is exactly where our old projects usually fell apart. Our lead quality improved because the site makes our priority services much clearer. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Roman J.",
    "industry": "Pest Control",
    "rating": 5,
    "title": "Not just a visual redesign",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. We had already paid three developers over nearly two years. One fixed the form but broke the gallery, another improved desktop and made mobile worse, and the third left behind custom code nobody wanted to touch. They compared the mobile flow first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. The process was organized enough that I never had to ask, “What are we waiting on?” The best improvement is that the site feels simpler even though it is doing more. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Maya F.",
    "industry": "Pet Services",
    "rating": 5,
    "title": "Hacked on a Friday",
    "text": "Our site was hacked late on a Friday and visitors were being redirected to spam pages while our ads were still running. It was the kind of problem where every hour felt expensive. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They measured the content gaps first, then built a sequence we could review step by step. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. They cared about what happened after launch, not just getting screenshots approved. We stopped treating SEO, design, and conversion as separate projects. The project actually got simpler as it went because we stopped trying to make every section do everything. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Jon R.",
    "industry": "Solar",
    "rating": 5,
    "title": "Invisible unless you knew our name",
    "text": "We had enough traffic to know the problem was not simply 'get more visitors.' The website looked respectable, but organic traffic was mostly people searching our exact business name. Important services barely had their own pages and the site gave Google very little context. They untangled the old redirects first, then showed us which problems were symptoms and which were causes. A surprisingly useful change was moving proof beside the main call to action. One afternoon we tested 48 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The explanations were plain English, which made approvals much faster on our side. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. We stopped treating SEO, design, and conversion as separate projects. The project actually got simpler as it went because we stopped trying to make every section do everything. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Paul P.",
    "industry": "Real Estate",
    "rating": 5,
    "title": "The mobile form was costing us leads",
    "text": "Our quote form technically worked, but on phones the keyboard covered fields, error messages jumped around, and the submit button sometimes vanished below a sticky bar. They prioritized the mobile flow first, then showed us which problems were symptoms and which were causes. We had roughly 41 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The explanations were plain English, which made approvals much faster on our side. People still browse, but far fewer get lost between the homepage and contact step. That sounds small until you realize how many customers were hitting the same issue every week. I would hire them again.",
    "sample": true
  },
  {
    "name": "Leo G.",
    "industry": "Pet Services",
    "rating": 4,
    "title": "Plugin pileup",
    "text": "The first call felt different because nobody tried to sell me a package in the first five minutes. Years of WordPress plugins had turned simple updates into a gamble. The admin was slow, the front end was slower, and nobody knew which plugin was safe to remove. They untangled the search structure first, then ranked the fixes by impact. A surprisingly useful change was giving each location its own useful content. They showed the problem on real devices instead of describing it abstractly. The best improvement is that the site feels simpler even though it is doing more. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Omar W.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "Pretty site, confused customers",
    "text": "We had invested in a visually nice website, yet customers still called to ask things that were already on the page. The layout looked good in a screenshot but did not guide people very well. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They reproduced the page hierarchy first, then ranked the fixes by impact. A surprisingly useful change was rewriting the first screen. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The site finally feels like the company we run today. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Mila L.",
    "industry": "Remodeling",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "We were paying for Google Ads but sending most clicks to a generic homepage. The ad promised one service and the landing page opened with a completely different message. They documented the old redirects first, then built a sequence we could review step by step. One afternoon we tested 27 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. We now have landing pages I am comfortable sending paid traffic to. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Megan V.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "Finally stable",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. A previous redesign changed a lot of URLs without a redirect plan. Search Console filled with 404s and pages that used to rank simply disappeared from results. They untangled the technical debt first, then gave each page a specific job. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. Changes came in small checkpoints, so we could react before a bad idea became expensive. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Our marketing reports make more sense because tracking and page intent finally line up. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Jasmine N.",
    "industry": "Electrical",
    "rating": 5,
    "title": "Checkout looked fine until you used a phone",
    "text": "Desktop sales were acceptable, but mobile checkout had a cart drawer covering controls and shipping information appearing too late. People were abandoning after adding products. The annoying part was that each issue looked unrelated until somebody traced the full flow. They isolated the search structure first, then separated urgent work from nice-to-have work. One afternoon we tested 21 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. The audit uncovered a form endpoint that failed intermittently, which explained a problem we had been blaming on something else. They built around the content we actually had instead of filling gaps with generic marketing language. The work felt less like decorating pages and more like removing friction one decision at a time. People still browse, but far fewer get lost between the homepage and contact step. I noticed the difference before looking at analytics because the questions customers asked us changed. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Iris J.",
    "industry": "Home Services",
    "rating": 5,
    "title": "We should have done this sooner",
    "text": "We were not looking for something flashy; we wanted the site to stop fighting the business. We had grown into multiple locations while the site still talked like a single neighborhood business. Customers could not tell which office served them and local pages were basically copies. They untangled the page hierarchy first, then gave each page a specific job. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The process was organized enough that I never had to ask, “What are we waiting on?” The customer questions changed almost immediately, which was the first sign the new structure was working. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. I would hire them again.",
    "sample": true
  },
  {
    "name": "Evan N.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "A real cleanup",
    "text": "For months we thought demand had slowed down. Then a customer called to ask why we ignored a form submission, and we discovered some leads were never reaching our inbox. They compared the technical debt first, then ranked the fixes by impact. The part I expected to be complicated—rebuilding the forms—ended up being the part with the clearest plan. The audit uncovered images several megabytes larger than necessary, which explained a problem we had been blaming on something else. Nothing was hidden behind jargon. If something was a guess, they said it was a guess. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. We now have landing pages I am comfortable sending paid traffic to. That sounds small until you realize how many customers were hitting the same issue every week. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Grace H.",
    "industry": "Cleaning Company",
    "rating": 5,
    "title": "Rebrand without throwing away SEO",
    "text": "I normally don't leave detailed reviews, but there is a lot of context here. We needed a complete visual update but already had valuable rankings. The scary part was changing the site without destroying URLs, internal links, metadata, or years of search history. They compared the mobile flow first, then separated urgent work from nice-to-have work. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. Changes came in small checkpoints, so we could react before a bad idea became expensive. Our marketing reports make more sense because tracking and page intent finally line up. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Daniel S.",
    "industry": "HVAC",
    "rating": 5,
    "title": "The site was held together by patches",
    "text": "Every new feature had been added as another workaround. By the time we asked for help, changing one button could affect three unrelated sections. We tried one more quick patch before calling. That lasted about four days. They documented the search structure first, then built a sequence we could review step by step. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Mobile no longer feels like a compromised version of desktop. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Tara P.",
    "industry": "Property Management",
    "rating": 5,
    "title": "A real cleanup",
    "text": "We had dozens of SEO posts bringing in traffic, but most were generic and disconnected from actual service pages. Reports looked busy; the phone did not. They cleaned up the scripts loading on every page first, then gave each page a specific job. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. The website stopped feeling like a maintenance project and started feeling like an asset. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Noah M.",
    "industry": "Insurance",
    "rating": 5,
    "title": "Patients could read but not book",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. The clinic site had plenty of information, but scheduling took too many steps and the mobile experience felt dated. Staff kept answering questions the website should have answered. They mapped the technical debt first, then built a sequence we could review step by step. Our deadline was about six weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. A surprisingly useful change was rewriting the first screen. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. The visual work got attention, but the invisible cleanup is what made the biggest difference day to day. Our lead quality improved because the site makes our priority services much clearer. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Derek H.",
    "industry": "Plumbing",
    "rating": 5,
    "title": "Our menu was still a PDF",
    "text": "Customers on phones had to pinch and zoom a PDF menu, and half the time it was not the current version. Updating one price meant replacing a file and hoping every link pointed to it. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They documented the scripts loading on every page first, then showed us which problems were symptoms and which were causes. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. I personally tried the final flow on a slow hotel Wi-Fi connection, because that was where previous versions usually fell apart. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Mobile no longer feels like a compromised version of desktop. I noticed the difference before looking at analytics because the questions customers asked us changed. This one was money well spent.",
    "sample": true
  },
  {
    "name": "Mateo G.",
    "industry": "Real Estate",
    "rating": 5,
    "title": "No more guessing",
    "text": "I thought we needed a few visual changes. That was not really the problem. We do expensive custom work, but the website made us look like a small general contractor. The project photography was strong; everything around it was underselling us. They compared the technical debt first, then showed us which problems were symptoms and which were causes. The part I expected to be complicated—rebuilding the forms—ended up being the part with the clearest plan. A surprisingly useful change was moving proof beside the main call to action. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. The new version earns trust faster without trying so hard to look impressive. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Rachel B.",
    "industry": "Solar",
    "rating": 4,
    "title": "Analytics numbers did not agree",
    "text": "GA4, ad platforms, and a call tracker were all reporting different totals. Old tags were firing twice and we could not confidently tell which campaigns created actual leads. They audited the search structure first, then built a sequence we could review step by step. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. Changes came in small checkpoints, so we could react before a bad idea became expensive. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. The customer questions changed almost immediately, which was the first sign the new structure was working. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Mila Y.",
    "industry": "Flooring",
    "rating": 5,
    "title": "Two companies, two websites, one mess",
    "text": "What finally pushed me to act was hearing the same complaint from two customers in one week. After an acquisition we inherited a second site with overlapping services, conflicting brand language, duplicate pages, and inconsistent local listings. They mapped the technical debt first, then built a sequence we could review step by step. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. The work felt less like decorating pages and more like removing friction one decision at a time. The best improvement is that the site feels simpler even though it is doing more. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Iris F.",
    "industry": "Law Firm",
    "rating": 4,
    "title": "Accessibility became real overnight",
    "text": "A customer told us they could not complete part of the site with a keyboard. That was the first time we realized accessibility was not just a compliance checkbox. At first I assumed it was a small fix. It was not. They traced the old redirects first, then built a sequence we could review step by step. We had roughly 41 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. They cared about what happened after launch, not just getting screenshots approved. The new version earns trust faster without trying so hard to look impressive. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Julia L.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "WordPress was one update away from trouble",
    "text": "The admin area threw occasional 500 errors and every plugin update felt risky. We had backups, but no confidence that restoring one would actually put everything back correctly. They compared the tracking setup first, then gave each page a specific job. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. Our staff spends noticeably less time explaining things the website should already make clear. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Derek H1.",
    "industry": "Solar",
    "rating": 5,
    "title": "The technical work mattered",
    "text": "The first call felt different because nobody tried to sell me a package in the first five minutes. Organic traffic slipped right before our busiest months. There was no dramatic penalty, just a collection of technical, content, and internal-linking problems that had quietly accumulated. They isolated the page hierarchy first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on a laptop that had exposed bugs before, because that was where previous versions usually fell apart. The part I expected to be complicated—moving the domain—ended up being the part with the clearest plan. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. People still browse, but far fewer get lost between the homepage and contact step. I would recommend the process even to someone who is not sure they need a full redesign.",
    "sample": true
  },
  {
    "name": "Priya J.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "Booking felt like leaving our brand",
    "text": "Our scheduler worked, but the moment someone clicked Book they landed in an interface that looked unrelated to us. The drop-off was obvious once we watched real users try it. At first I assumed it was a small fix. It was not. They tested the mobile flow first, then gave each page a specific job. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. They showed the problem on real devices instead of describing it abstractly. I can finally send someone the website and let it explain the business without an extra paragraph from me. I noticed the difference before looking at analytics because the questions customers asked us changed. I would hire them again.",
    "sample": true
  },
  {
    "name": "Max T3.",
    "industry": "HVAC",
    "rating": 4,
    "title": "Copy-paste location pages",
    "text": "I normally don't leave detailed reviews, but there is a lot of context here. A past SEO vendor created city pages by swapping the city name in the same paragraph. They were technically unique URLs, but not genuinely useful pages. They audited the tracking setup first, then built a sequence we could review step by step. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. We had roughly 56 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. The visual upgrade is obvious; the reduction in day-to-day website problems is even better. That sounds small until you realize how many customers were hitting the same issue every week. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Alex V.",
    "industry": "Construction",
    "rating": 5,
    "title": "Every button was shouting",
    "text": "The homepage had call now, book now, learn more, request a quote, free consultation, and get started buttons competing with each other. There was no obvious next step. They documented the search structure first, then built a sequence we could review step by step. One afternoon we tested 18 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. We had roughly 33 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The work felt less like decorating pages and more like removing friction one decision at a time. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. Our lead quality improved because the site makes our priority services much clearer. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Nina G.",
    "industry": "Consulting",
    "rating": 4,
    "title": "The website still thought it was 2021",
    "text": "My main concern was not making things worse while trying to improve them. Old hours, temporary notices, outdated photos, and stale service details were still live years later. It made a healthy business look neglected. They prioritized the page hierarchy first, then gave each page a specific job. A surprisingly useful change was giving each location its own useful content. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. There is less noise, fewer dead ends, and a much stronger sense of what to do next. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Marcus S.",
    "industry": "Construction",
    "rating": 5,
    "title": "Great Google reviews, invisible on the site",
    "text": "We had years of strong customer feedback, but the website barely used it. New visitors saw a service list and phone number without the trust we had already earned elsewhere. At first I assumed it was a small fix. It was not. They isolated the old redirects first, then ranked the fixes by impact. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. The explanations were plain English, which made approvals much faster on our side. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. People still browse, but far fewer get lost between the homepage and contact step. I did not expect to care this much about page structure, but here we are.",
    "sample": true
  },
  {
    "name": "Luis Y.",
    "industry": "Pest Control",
    "rating": 5,
    "title": "The first fix that actually stuck",
    "text": "The firm had a lot of useful information, but the navigation mirrored internal practice-area terminology instead of the questions potential clients were actually asking. They prioritized the search structure first, then built a sequence we could review step by step. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. The work felt less like decorating pages and more like removing friction one decision at a time. Updates do not feel dangerous anymore. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Ben Y.",
    "industry": "Flooring",
    "rating": 5,
    "title": "SEO reports with no clear work",
    "text": "I came in with a very specific list and still missed the biggest problem. We had paid monthly SEO invoices for a long time and received polished PDFs full of charts. What we could not see was which pages changed, what was tested, or why leads should improve. They reproduced the scripts loading on every page first, then gave each page a specific job. A surprisingly useful change was moving proof beside the main call to action. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The work felt less like decorating pages and more like removing friction one decision at a time. They showed the problem on real devices instead of describing it abstractly. The customer questions changed almost immediately, which was the first sign the new structure was working. The difference is obvious when you actually use the site, not just when you compare screenshots.",
    "sample": true
  },
  {
    "name": "Paul S.",
    "industry": "Pest Control",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "Desktop looked okay and small phones were passable, but tablets produced huge gaps, broken card widths, and headlines colliding with buttons. At first I assumed it was a small fix. It was not. They measured the technical debt first, then ranked the fixes by impact. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. A surprisingly useful change was moving proof beside the main call to action. They showed the problem on real devices instead of describing it abstractly. The process was organized enough that I never had to ask, “What are we waiting on?” People still browse, but far fewer get lost between the homepage and contact step. That sounds small until you realize how many customers were hitting the same issue every week. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Alex D.",
    "industry": "Auto Repair",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "I did not want another developer who only fixed the exact symptom I pointed at. The portfolio needed large, detailed images, but they were uploaded directly from the photographer. Pages looked gorgeous after loading; the problem was how long that took. They isolated the content gaps first, then separated urgent work from nice-to-have work. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. We had roughly 9 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. Instead of stuffing more copy onto the page, they removed things until the next action became obvious. They showed the problem on real devices instead of describing it abstractly. People still browse, but far fewer get lost between the homepage and contact step. I noticed the difference before looking at analytics because the questions customers asked us changed. They earned my trust by being willing to say when something did not need changing.",
    "sample": true
  },
  {
    "name": "Jon M.",
    "industry": "Plumbing",
    "rating": 5,
    "title": "Forms were being sent from the wrong domain",
    "text": "Contact notifications were coming through an old email setup and some landed in spam. Customers assumed we were ignoring them when we genuinely never saw the message. They reproduced the mobile flow first, then built a sequence we could review step by step. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. We had roughly 41 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. They kept the parts that were already doing their job and only rebuilt what had a reason to change. We finally had one person looking at the page, search intent, analytics, and customer behavior together. We now have landing pages I am comfortable sending paid traffic to. No, it did not transform the business overnight, but it removed a lot of unnecessary friction. I appreciated that not every recommendation came with a bigger invoice attached.",
    "sample": true
  },
  {
    "name": "Owen Y.",
    "industry": "Property Management",
    "rating": 5,
    "title": "Product pages had photos but no answers",
    "text": "We were growing, but the site made every new marketing effort harder than it needed to be. Our products looked good, but the pages were too thin. Buyers still emailed basic questions about sizing, materials, delivery, and returns before they felt safe ordering. They isolated the failure points first, then ranked the fixes by impact. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They cared about what happened after launch, not just getting screenshots approved. Customers are reaching the right service faster and asking better questions when they contact us. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Kira T.",
    "industry": "Restaurant",
    "rating": 5,
    "title": "The homepage tried to contain the entire company",
    "text": "Over time every department had asked for one more section. The homepage became a wall of services, awards, announcements, testimonials, and promotions with no breathing room. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They prioritized the conversion path first, then ranked the fixes by impact. One afternoon we tested 56 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Customers are reaching the right service faster and asking better questions when they contact us. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Derek L.",
    "industry": "Clinic",
    "rating": 5,
    "title": "A much cleaner system",
    "text": "Several key pages ranked well, but lead volume stayed disappointing. The issue was not discovery anymore; it was what users saw and did after they arrived. They isolated the failure points first, then ranked the fixes by impact. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. They caught an issue we had assumed was an ad problem and proved it was actually happening after the click. Our marketing reports make more sense because tracking and page intent finally line up. I would rather have done one project like this than three cheap fixes.",
    "sample": true
  },
  {
    "name": "Derek S.",
    "industry": "Roofing",
    "rating": 5,
    "title": "Every franchise location looked different",
    "text": "I came in with a very specific list and still missed the biggest problem. Local teams had edited their own pages for years. Messaging, photos, hours, calls to action, and even service names were inconsistent from one location to another. They isolated the content gaps first, then gave each page a specific job. The part I expected to be complicated—compressing the photography—ended up being the part with the clearest plan. The audit uncovered scripts loading on pages that did not use them, which explained a problem we had been blaming on something else. They built around the content we actually had instead of filling gaps with generic marketing language. Design and SEO were discussed together, which sounds obvious but had never happened on our previous projects. There is less noise, fewer dead ends, and a much stronger sense of what to do next. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Priya S.",
    "industry": "Property Management",
    "rating": 5,
    "title": "A better experience, not just a prettier site",
    "text": "We offered service in two languages, but translated pages were incomplete and internal links frequently returned visitors to the English site. We tried one more quick patch before calling. That lasted about four days. They untangled the conversion path first, then built a sequence we could review step by step. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. One afternoon we tested 48 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They kept the parts that were already doing their job and only rebuilt what had a reason to change. Our lead quality improved because the site makes our priority services much clearer. That sounds small until you realize how many customers were hitting the same issue every week. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Dana G.",
    "industry": "Electrical",
    "rating": 5,
    "title": "Reviews were hidden where nobody went",
    "text": "There wasn't one giant failure. It was a pile of little frustrations that had become normal to us. We had years of positive feedback sitting on a testimonials page that almost no visitor opened. The strongest proof on the site was basically invisible. They untangled the mobile flow first, then built a sequence we could review step by step. A surprisingly useful change was rewriting the first screen. One afternoon we tested 41 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They built around the content we actually had instead of filling gaps with generic marketing language. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Customers are reaching the right service faster and asking better questions when they contact us. I noticed the difference before looking at analytics because the questions customers asked us changed. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "Theo Y.",
    "industry": "Construction",
    "rating": 5,
    "title": "Custom code with no owner",
    "text": "A former developer built several key features from scratch and then disappeared. There was no documentation, and every new developer quoted extra time just to understand what was there. They compared the tracking setup first, then gave each page a specific job. We had roughly 56 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. A surprisingly useful change was moving proof beside the main call to action. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They cared about what happened after launch, not just getting screenshots approved. It is the first version of the site I am not tempted to apologize for before someone opens it. That sounds small until you realize how many customers were hitting the same issue every week. No drama, no mystery, just a much better system.",
    "sample": true
  },
  {
    "name": "Owen C.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "Malware was gone, spam URLs were not",
    "text": "My main concern was not making things worse while trying to improve them. The infection had been removed, but Google was still discovering thousands of junk URLs and strange titles. Cleanup had to continue after the server itself was safe. They documented the search structure first, then showed us which problems were symptoms and which were causes. One afternoon we tested 9 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. We stopped treating SEO, design, and conversion as separate projects. The strongest compliment I can give is that the website finally feels boring to maintain—in a good way.",
    "sample": true
  },
  {
    "name": "Ian C.",
    "industry": "Private Practice",
    "rating": 5,
    "title": "The business expanded faster than the website",
    "text": "We opened new service areas and hired more crews, but online we still looked like a single-location operation. The website had not caught up with the company. The annoying part was that each issue looked unrelated until somebody traced the full flow. They prioritized the tracking setup first, then showed us which problems were symptoms and which were causes. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. They built around the content we actually had instead of filling gaps with generic marketing language. The explanations were plain English, which made approvals much faster on our side. Our lead quality improved because the site makes our priority services much clearer. The process mattered as much as the final design.",
    "sample": true
  },
  {
    "name": "Priya B.",
    "industry": "Dental",
    "rating": 5,
    "title": "Too many low-value leads",
    "text": "Lead volume was not terrible; lead quality was. The website treated every service equally even though we wanted to emphasize a smaller group of higher-value projects. They mapped the old redirects first, then separated urgent work from nice-to-have work. Our deadline was two months, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. I liked that the recommendation was not automatically “rebuild everything.” Some sections were perfectly fine and stayed. We now have landing pages I am comfortable sending paid traffic to. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Camila B.",
    "industry": "Accounting",
    "rating": 5,
    "title": "Our copy sounded exactly like competitors",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. Trusted experts, quality service, customer satisfaction—the whole site was filled with language anyone in our industry could claim. Nothing explained why we were actually different. They reproduced the content gaps first, then showed us which problems were symptoms and which were causes. Our deadline was five weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. We had roughly 18 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The explanations were plain English, which made approvals much faster on our side. The process was organized enough that I never had to ask, “What are we waiting on?” Mobile no longer feels like a compromised version of desktop. I am finally comfortable sending prospects straight to the site.",
    "sample": true
  },
  {
    "name": "Iris S.",
    "industry": "Electrical",
    "rating": 5,
    "title": "Popups had taken over the phone screen",
    "text": "Chat, review prompts, discounts, cookie notices, and exit-intent offers were all layered on top of each other. On mobile, customers spent more time closing boxes than reading. We tried one more quick patch before calling. That lasted about four days. They measured the conversion path first, then ranked the fixes by impact. I personally tried the final flow on my phone in the parking lot, because that was where previous versions usually fell apart. The part I expected to be complicated—changing the booking flow—ended up being the part with the clearest plan. We finally had one person looking at the page, search intent, analytics, and customer behavior together. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. There is less noise, fewer dead ends, and a much stronger sense of what to do next. That sounds small until you realize how many customers were hitting the same issue every week. We have already sent two other business owners their way.",
    "sample": true
  },
  {
    "name": "Sam Z.",
    "industry": "Clinic",
    "rating": 5,
    "title": "We were launching a membership",
    "text": "The funny part is that I contacted them for one problem and discovered three connected ones. The business was adding recurring service for the first time. We needed to explain the new offer without making existing customers wonder whether regular service had disappeared. They measured the content gaps first, then ranked the fixes by impact. A surprisingly useful change was changing where reviews appeared. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They pushed back on two ideas I requested because both would have made the page busier. I appreciated that. The process was organized enough that I never had to ask, “What are we waiting on?” Our marketing reports make more sense because tracking and page intent finally line up. The weirdest compliment is that I barely think about the website now, which is exactly what I wanted. The result looks better, but more importantly it behaves better.",
    "sample": true
  },
  {
    "name": "Sam J7.",
    "industry": "Dental",
    "rating": 5,
    "title": "Finally stable",
    "text": "The company had grown a lot, but our website still looked like the early-stage version. Before partnership meetings, we realized the first impression did not match the operation. They compared the technical debt first, then showed us which problems were symptoms and which were causes. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. One afternoon we tested 27 pages across an iPhone, Android phone, tablet, and old laptop and found issues that never appeared on my office monitor. We finally had one person looking at the page, search intent, analytics, and customer behavior together. They showed the problem on real devices instead of describing it abstractly. People still browse, but far fewer get lost between the homepage and contact step. I noticed the difference before looking at analytics because the questions customers asked us changed. It finally feels finished without feeling over-designed.",
    "sample": true
  },
  {
    "name": "Derek M8.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "Blog traffic had nowhere to go",
    "text": "I thought we needed a few visual changes. That was not really the problem. Informational articles were finally attracting readers, but there was no natural path from those articles to a relevant service, proof, or contact action. They reproduced the conversion path first, then ranked the fixes by impact. The part I expected to be complicated—cleaning the tracking setup—ended up being the part with the clearest plan. We were given a clear order of operations instead of a giant list of fifty things labeled urgent. Updates do not feel dangerous anymore. Wish we had done it before spending more on ads.",
    "sample": true
  },
  {
    "name": "Nick M9.",
    "industry": "HVAC",
    "rating": 5,
    "title": "Site search made good content look bad",
    "text": "We had hundreds of useful pages and documents, but internal search returned old PDFs and irrelevant results first. People assumed the answer was not there. I was ready to replace the entire site. They actually talked me out of replacing a few pieces that were still fine. They audited the conversion path first, then built a sequence we could review step by step. Our deadline was four weeks, and they adjusted the scope around what had to be stable first instead of pretending everything could happen at once. The timeline was realistic. When something needed more time, they told us before the deadline instead of after it. Changes came in small checkpoints, so we could react before a bad idea became expensive. We stopped treating SEO, design, and conversion as separate projects. If your site has been patched for years, deal with the structure before paying for another patch.",
    "sample": true
  },
  {
    "name": "Ava D.",
    "industry": "E-commerce",
    "rating": 5,
    "title": "This solved more than I expected",
    "text": "The redesign launched fast, then scripts, videos, tags, and widgets accumulated for six months. Nobody owned performance after launch, so the site quietly slowed down again. They measured the page hierarchy first, then ranked the fixes by impact. They left us with a short handoff document, so a simple text change no longer turns into a support ticket. They kept the parts that were already doing their job and only rebuilt what had a reason to change. People still browse, but far fewer get lost between the homepage and contact step. I am glad we fixed the foundation before trying to pour more traffic into it.",
    "sample": true
  },
  {
    "name": "June K2.",
    "industry": "Landscaping",
    "rating": 5,
    "title": "Our DIY site finally hit its ceiling",
    "text": "I was embarrassed to send people to the old site, which is a bad place to be when the website is supposed to sell for you. The original site was perfect when we started the business. Years later, new services, locations, staff, and marketing had outgrown a template we kept forcing to do more. They prioritized the search structure first, then showed us which problems were symptoms and which were causes. I personally tried the final flow on an iPad we use at the front desk, because that was where previous versions usually fell apart. We had roughly 12 important URLs that could not simply disappear, so the migration plan mattered as much as the new design. The handoff was cleaner than expected; our staff can now make ordinary edits without being afraid of breaking something. They kept the parts that were already doing their job and only rebuilt what had a reason to change. We now have landing pages I am comfortable sending paid traffic to. We have already sent two other business owners their way.",
    "sample": true
  }
];
function shuffleReviews(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){let j;if(window.crypto?.getRandomValues){const n=new Uint32Array(1);window.crypto.getRandomValues(n);j=n[0]%(i+1)}else j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function renderReviews(){const root=document.getElementById('reviewsRoot');if(!root)return;const randomized=shuffleReviews(reviews);let page=1;const per=20,pages=Math.ceil(randomized.length/per);const draw=()=>{const current=randomized.slice((page-1)*per,page*per);root.innerHTML=`<div class="grid grid-2 review-page-grid">${current.map(r=>`<article class="card reveal"><div class="review-head"><div class="avatar">${r.name[0]}</div><div><strong>${r.name}</strong><p class="fineprint">${r.industry} · Sample project story</p></div></div><div class="review-stars" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><h3>${r.title}</h3><p>${r.text}</p></article>`).join('')}</div><div class="pagination" aria-label="Review pagination">${Array.from({length:pages},(_,i)=>`<button class="page-btn ${i+1===page?'active':''}" data-page="${i+1}">${i+1}</button>`).join('')}</div>`;root.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{page=Number(b.dataset.page);draw();scrollTo({top:0,behavior:'smooth'});}));if(window.IntersectionObserver)document.querySelectorAll('.reveal').forEach(el=>setTimeout(()=>el.classList.add('show'),50));};draw();}
document.addEventListener('DOMContentLoaded',renderReviews);
