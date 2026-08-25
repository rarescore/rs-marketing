import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("required production routes, media, and lead pipeline exist",()=>{for(const file of ["src/app/(law)/page.tsx","src/app/(law)/actions.ts","src/app/(law)/consultation/page.tsx","src/app/(law)/practice-areas/[slug]/page.tsx","src/app/(law)/resources/[slug]/page.tsx","src/app/(law)/privacy/page.tsx","src/app/not-found.tsx","src/lib/intake/email.ts","public/video/injury-law/accident-sequence.mp4",".env.example"])assert.ok(existsSync(file),`${file} is missing`);});
test("inquiries use the approved email-only destination",()=>{const email=readFileSync("src/lib/intake/email.ts","utf8");const action=readFileSync("src/app/(law)/actions.ts","utf8");assert.match(email,/hello\.rarescore@gmail\.com/);assert.doesNotMatch(action,/DATABASE_URL|neon|postgres/i);});
function sourceFiles(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{const path=join(directory,entry.name);return entry.isDirectory()?sourceFiles(path):/\.(tsx?|css)$/.test(entry.name)?[path]:[];});}
test("production source has no legacy brand or unfinished markers",()=>{for(const file of sourceFiles("src")){const source=readFileSync(file,"utf8");assert.doesNotMatch(source,/Morrow|Vale|System Lens|demo-preview/i,`${file} contains legacy copy`);assert.doesNotMatch(source,/href\s*=\s*["']#["']/,`${file} has an inert hash link`);assert.doesNotMatch(source,/\b(?:TODO|FIXME)\b/,`${file} has an unfinished marker`);}});
