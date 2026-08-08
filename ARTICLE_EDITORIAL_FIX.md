# Article Editorial + Pricing Legibility Pass

## Article visual system
- Replaced all previous article imagery with 11 unique LG-branded editorial visuals.
- Each article image is 1600×1000 WebP with an 800×500 mobile variant.
- Visuals use the site's black / white / crimson art direction and are topic-specific.
- Updated image alt text to describe the new visuals accurately.

## Article pages
- Removed the giant ghost/background typography from the article reading experience.
- Rebuilt the hero as a stable two-column layout: title/meta on the left, image on the right.
- The hero collapses to a clean single-column layout on tablet/mobile.
- Reading content is constrained to a comfortable width with a desktop-only sticky table of contents.
- Removed absolute-positioned decorative layers from article content, preventing title/image/content collisions.
- Rebuilt the static prerendered article template and CSS so the SEO HTML matches the React design.

## Article previews
- Homepage research preview is now a compact four-card editorial row.
- Article library uses a compact three-column grid rather than oversized featured cards.
- Mobile previews become app-like horizontal image/text rows for faster scanning.

## Pricing
- Collapsed plan labels now use short, readable names: Website, Foundation, Growth, Advanced.
- Labels are horizontal rather than rotated/clipped.
- Expanded cards still show the full plan name and existing content.

## Validation
- Regenerated static article HTML, sitemap, RSS and robots files.
- Verified 11 unique desktop article images and 11 mobile variants.
- CSS brace counts validated.
- SEO generation script passes Node syntax validation.
