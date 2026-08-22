import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  compareOffer,
  monthlyHousingCost,
  sellerNet,
} from "../src/features/demos/real-estate/tool-engines.ts";
import {
  branchGuide,
  pressureFlow,
  triage,
  waterHeater,
} from "../src/features/demos/plumbing/tool-engines.ts";
import { evaluateIncidentReview } from "../src/features/demos/injury-law/evaluate-review.ts";

test("real-estate financial tools keep assumptions explicit and arithmetic stable", () => {
  const monthly = monthlyHousingCost({
    price: 800_000,
    downPayment: 160_000,
    rate: 6.5,
    years: 30,
    taxRate: 1.2,
    annualInsurance: 2_400,
    hoa: 0,
    maintenanceRate: 1,
  });
  assert.ok(Math.abs(monthly.total - 5_711.9) < 0.2);
  assert.equal(monthly.insurance, 200);

  const net = sellerNet({
    salePrice: 950_000,
    payoff: 400_000,
    transactionRate: 6,
    concessions: 10_000,
    repairs: 15_000,
    closingCosts: 12_000,
  });
  assert.equal(net.transactionCosts, 57_000);
  assert.equal(net.net, 456_000);

  const offer = compareOffer({
    price: 900_000,
    concessions: 8_000,
    otherCosts: 5_000,
    financing: "cash",
    contingencyDays: 7,
    closeDays: 18,
  });
  assert.equal(offer.estimatedNet, 887_000);
  assert.ok(offer.considerations.some((item) => item.includes("No financing")));
});

test("plumbing tools prioritize safety and remain preliminary", () => {
  const urgent = triage({ symptom: "leak", active: true, hazard: "none", multiple: false });
  assert.equal(urgent.title, "Immediate safety path");
  assert.ok(urgent.summary.includes("red-flag"));

  const demand = waterHeater({ people: 4, showers: 2, minutes: 10, gpm: 2, rise: 70, tank: 50, input: 40, efficiency: 0.8 });
  assert.ok(demand.metrics.some((metric) => metric.label === "Simplified first-hour supply"));
  assert.ok(demand.summary.includes("does not select or approve equipment"));

  const branch = branchGuide({ size: "1/2", fixtures: 10, showers: 2, appliances: 2, pressure: 55 });
  assert.ok(branch.flags.some((flag) => flag.includes("not a fixture-unit calculation")));

  const pressure = pressureFlow({ staticPsi: 50, residualPsi: 60, gpm: 5, elevation: 0, target: 5 });
  assert.ok(pressure.flags.some((flag) => flag.includes("repeat the test")));
});

test("incident review gives value without scoring, diagnosis, or value estimates", () => {
  const result = evaluateIncidentReview({
    safety: ["urgent-care"],
    "incident-type": ["vehicle"],
    "incident-age": ["days-weeks"],
    care: ["doctor"],
    pain: ["worsening"],
    daily: ["driving"],
    work: ["missed"],
    psych: ["anxiety", "sleep"],
    evidence: ["photos", "camera-risk"],
    insurance: ["statement"],
  });

  assert.ok(result.safetyActions[0].includes("Call 911"));
  assert.ok(result.reviewTiming.includes("Prompt human review"));
  assert.ok(result.generalNextSteps.some((item) => item.includes("emotional or behavioral changes")));
  const completeOutput = JSON.stringify(result).toLowerCase();
  assert.ok(!completeOutput.includes("case score"));
  assert.ok(!completeOutput.includes("settlement value"));
  assert.ok(!completeOutput.includes("you have a case"));
});

test("required production and primary route contracts exist", () => {
  const required = [
    "src/app/not-found.tsx",
    "src/app/global-error.tsx",
    "src/app/opengraph-image.tsx",
    "src/app/manifest.ts",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/showroom/real-estate/page.tsx",
    "src/app/showroom/plumbing/page.tsx",
    "src/app/showroom/injury-law/page.tsx",
    "src/app/showroom/real-estate/tools/[tool]/page.tsx",
    "src/app/showroom/plumbing/tools/[tool]/page.tsx",
    "src/app/showroom/injury-law/case-review/page.tsx",
  ];

  for (const file of required) assert.ok(existsSync(file), `${file} is missing`);
});

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : /\.(tsx?|css)$/.test(entry.name) ? [path] : [];
  });
}



test("Stage 2 brand and Injury Law contracts stay locked", () => {
  const review = readFileSync("src/features/demos/injury-law/incident-review.client.tsx", "utf8");
  const hero = readFileSync("src/features/demos/injury-law/home-hero.client.tsx", "utf8");
  const confirmation = readFileSync("src/features/demos/injury-law/consultation-form.client.tsx", "utf8");
  const demoSource = sourceFiles("src").map((file) => readFileSync(file, "utf8")).join("\n");

  assert.ok(existsSync("public/brand/onlev-approved-master.png"));
  assert.ok(existsSync("public/brand/onlev-approved-boxed.png"));
  assert.match(demoSource, /Lev & On Residential/);
  assert.match(demoSource, /Lev & On Home Services/);
  assert.match(demoSource, /Lev & On Injury Counsel/);
  assert.doesNotMatch(demoSource, /Atelier North|Field Standard|Morrow & Vale/);

  assert.equal((review.match(/\n\s+short:\s*"/g) ?? []).length, 6);
  for (const key of [
    "incident-type",
    "incident-age",
    "jurisdiction",
    "safety",
    "care",
    "pain",
    "daily",
    "work",
    "psych",
    "evidence",
    "insurance",
    "contact-readiness",
  ]) {
    assert.match(review, new RegExp(`key: "${key}"`));
  }

  assert.match(hero, /Start Incident Review/);
  assert.match(hero, /What To Do Now/);
  assert.match(hero, /il-hero__typed-char/);
  assert.match(confirmation, /Thank you\. We received your review\./);
  assert.match(confirmation, /A member of the team will call you shortly\./);
  assert.match(confirmation, /nothing was actually sent or retained/);
});

test("source contains no inert hash links or unfinished markers", () => {
  for (const file of sourceFiles("src")) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /href\s*=\s*["']#["']/, `${file} has an inert hash link`);
    assert.doesNotMatch(source, /\b(?:TODO|FIXME)\b/, `${file} has an unfinished marker`);
  }
});

test("Stage 3 signature motion systems are real rendered experiences", () => {
  const injury = readFileSync("src/features/demos/injury-law/clarity-scene.client.tsx", "utf8");
  const injuryHero = readFileSync("src/features/demos/injury-law/home-hero.client.tsx", "utf8");
  const estate = readFileSync("src/features/demos/real-estate/architectural-sequence.client.tsx", "utf8");
  const plumbing = readFileSync("src/features/demos/plumbing/plumbing-system-scene.client.tsx", "utf8");
  const onlev = readFileSync("src/features/onlev/marketing/system-cinematic.client.tsx", "utf8");
  const estatePage = readFileSync("src/app/showroom/real-estate/page.tsx", "utf8");

  for (const source of [injury, estate, plumbing, onlev]) {
    assert.match(source, /<Canvas/);
    assert.match(source, /useFrame/);
    assert.doesNotMatch(source, /parallax|pan.?zoom/i);
  }
  assert.match(injury, /windshield|crack/i);
  assert.match(injury, /onResolved/);
  assert.match(injuryHero, /is-resolved/);
  assert.match(estate, /CatmullRomCurve3/);
  assert.match(estatePage, /ArchitecturalSequence/);
  assert.match(plumbing, /TubeGeometry/);
  assert.match(onlev, /CatmullRomCurve3/);
});

test("Stage 4 alive-pass contracts preserve distinct visitor-led page families", () => {
  const estateListings = readFileSync("src/app/showroom/real-estate/listings/page.tsx", "utf8");
  const estateNeighborhoods = readFileSync("src/app/showroom/real-estate/neighborhoods/page.tsx", "utf8");
  const estateExplorer = readFileSync("src/features/demos/real-estate/editorial-explorers.client.tsx", "utf8");
  const plumbingServices = readFileSync("src/app/showroom/plumbing/services/page.tsx", "utf8");
  const plumbingExplorer = readFileSync("src/features/demos/plumbing/service-system-explorer.client.tsx", "utf8");
  const injuryGuide = readFileSync("src/app/showroom/injury-law/after-an-accident/page.tsx", "utf8");
  const injuryNavigator = readFileSync("src/features/demos/injury-law/guidance-navigator.client.tsx", "utf8");
  const onlevSystems = readFileSync("src/app/systems/page.tsx", "utf8");
  const onlevPulse = readFileSync("src/features/onlev/site/system-proof-pulse.client.tsx", "utf8");

  assert.match(estateListings, /PropertyDecisionCompass/);
  assert.match(estateNeighborhoods, /NeighborhoodStage/);
  assert.match(estateExplorer, /What does the next home need to solve/);
  assert.match(estateExplorer, /role="tablist"/);

  assert.match(plumbingServices, /ServiceSystemExplorer/);
  assert.match(plumbingExplorer, /Which part of the home is asking for attention/);
  assert.match(plumbingExplorer, /This is orientation, not a diagnosis/);

  assert.match(injuryGuide, /GuidanceNavigator/);
  assert.match(injuryNavigator, /You do not need to solve everything today/);
  assert.match(injuryNavigator, /Next useful step/);

  assert.match(onlevSystems, /SystemProofPulse/);
  assert.match(onlevPulse, /Follow one customer signal all the way through/);

  for (const source of [estateExplorer, plumbingExplorer, injuryNavigator, onlevPulse]) {
    assert.doesNotMatch(source, /setInterval|requestAnimationFrame/);
  }
});
