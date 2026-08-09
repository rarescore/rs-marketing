# Review randomization QA

- 200 total review fixtures
- 200 unique review bodies
- Length mix:
  - 50 micro reviews (<=30 words)
  - 63 reviews at 31–60 words
  - 52 reviews at 61–100 words
  - 25 reviews at 101–180 words
  - 10 story reviews at 181+ words
- Overall range: 13–221 words
- Source order is shuffled so topics and lengths are not grouped.
- Reviews are also shuffled once per browser session with a random session seed.
- Pagination remains stable during the same session so moving between pages does not reshuffle underneath the visitor.
- Fixtures remain marked fictional in source and should not be presented as verified testimonials.
