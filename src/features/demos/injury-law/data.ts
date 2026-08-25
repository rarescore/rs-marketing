export const injuryBase = "";
export const firmName = "Lev & On Law Firm";
export const lawPhoneDisplay = "(818) 913-6158";
export const lawPhoneHref = "tel:+18189136158";

export type PracticeArea = {
  slug: string;
  name: string;
  short: string;
  involves: string;
  firstSteps: string[];
  records: string[];
  insurance: string;
  injuries: string[];
  review: string[];
  faqs: { question: string; answer: string }[];
};

const sharedFaqs = [
  { question: "Does requesting a review mean the firm represents me?", answer: "No. Representation begins only after conflicts are checked, the firm offers representation, and both sides sign an agreement." },
  { question: "What should I bring to the first call?", answer: "Share the basic date and location, the people involved, available insurance information, and what records already exist. Do not delay the call because the file is incomplete." },
];

export const practiceAreas: PracticeArea[] = [
  {
    slug: "car-accidents", name: "Car accidents", short: "Focused guidance after rear-end, intersection, freeway, and multi-vehicle crashes.",
    involves: "Car-crash reviews often begin with competing accounts, changing symptoms, damaged vehicles, police records, and several layers of insurance communication.",
    firstSteps: ["Address urgent medical and safety needs", "Photograph the vehicles, road, signals, and visible damage", "Save the exchange information and report number"],
    records: ["Original photographs and dash-camera files", "Witness names and nearby camera locations", "Medical, repair, rental, and work-loss records"],
    insurance: "Liability, uninsured or underinsured motorist, medical-payment, collision, and rideshare or employer coverage may need to be identified without assuming which policy applies.",
    injuries: ["Neck and back injuries", "Broken bones and joint injuries", "Head injuries and concussion symptoms"],
    review: ["How the collision occurred", "What evidence may disappear", "Which policies and parties require investigation"], faqs: sharedFaqs,
  },
  {
    slug: "truck-accidents", name: "Truck accidents", short: "Commercial-vehicle crashes where records, ownership, and preservation move quickly.",
    involves: "A commercial crash may involve the driver, carrier, vehicle owner, maintenance providers, cargo records, electronic logs, and corporate insurers.",
    firstSteps: ["Prioritize care and safe transportation", "Keep every company name and identifying number visible at the scene", "Preserve notices, photographs, and witness details"],
    records: ["Vehicle and trailer markings", "Electronic-log and inspection records", "Dispatch, maintenance, and cargo information"],
    insurance: "Commercial policies and multiple business relationships can make coverage analysis more complex than a two-car collision.",
    injuries: ["Traumatic brain injuries", "Spinal and orthopedic injuries", "Multiple-impact trauma"],
    review: ["Carrier and vehicle ownership", "Driver qualification and hours", "Maintenance, loading, and electronic evidence"], faqs: sharedFaqs,
  },
  {
    slug: "motorcycle-accidents", name: "Motorcycle accidents", short: "Evidence-led review when visibility, road conditions, and serious injury are central.",
    involves: "Motorcycle cases often turn on visibility, lane position, roadway conditions, protective equipment, vehicle movement, and biased assumptions about riders.",
    firstSteps: ["Seek appropriate care", "Preserve the motorcycle, helmet, clothing, and camera footage", "Record road defects, debris, lighting, and sight lines"],
    records: ["Helmet and riding equipment", "Bike damage and inspection records", "Route, weather, camera, and witness information"],
    insurance: "The driver’s liability coverage and the rider’s own uninsured or underinsured coverage may both require review.",
    injuries: ["Road-rash and soft-tissue injuries", "Fractures and crush injuries", "Head, spine, and internal injuries"],
    review: ["Vehicle movements and sight lines", "Roadway and traffic-control conditions", "The physical evidence on the motorcycle and equipment"], faqs: sharedFaqs,
  },
  {
    slug: "rideshare-accidents", name: "Rideshare accidents", short: "Uber and Lyft incidents where app status can change the insurance picture.",
    involves: "A rideshare collision can involve a passenger, driver, another vehicle, the platform, and insurance that changes with the driver’s app status.",
    firstSteps: ["Screenshot trip and driver details", "Preserve app messages, receipts, and support communications", "Document every involved vehicle and insurer"],
    records: ["Trip receipt and app screenshots", "Driver and vehicle identifiers", "Platform and insurer correspondence"],
    insurance: "Coverage may depend on whether the driver was offline, waiting for a request, traveling to a pickup, or carrying a passenger.",
    injuries: ["Whiplash and soft-tissue injuries", "Head and facial injuries", "Fractures and mobility limitations"],
    review: ["App and trip status", "All available personal and platform policies", "Passenger, driver, and third-party accounts"], faqs: sharedFaqs,
  },
  {
    slug: "pedestrian-accidents", name: "Pedestrian accidents", short: "Urgent preservation of camera, roadway, and driver evidence after a pedestrian impact.",
    involves: "Pedestrian incidents require careful attention to crossings, visibility, signals, driver movement, nearby cameras, and severe physical consequences.",
    firstSteps: ["Address emergency care", "Identify cameras before recordings are overwritten", "Preserve clothing, devices, and location photographs"],
    records: ["Scene measurements and photographs", "Signal timing and roadway design information", "Witness, camera, and device data"],
    insurance: "Driver liability coverage, household auto coverage, and other available benefits may need review depending on the circumstances.",
    injuries: ["Lower-extremity injuries", "Head and brain injuries", "Spinal, pelvic, and internal injuries"],
    review: ["Crossing and signal conditions", "Driver visibility and distraction evidence", "Long-term care and mobility effects"], faqs: sharedFaqs,
  },
  {
    slug: "bicycle-accidents", name: "Bicycle accidents", short: "Crash analysis that preserves the bicycle, route, cameras, and vehicle evidence.",
    involves: "Bicycle crashes may involve unsafe passing, turns, doors, bike-lane conflicts, roadway defects, or a vehicle leaving the scene.",
    firstSteps: ["Seek care and move out of danger", "Do not repair or discard the bicycle or helmet", "Record the route, lane, signs, and camera locations"],
    records: ["Bicycle and helmet condition", "Ride-app and device data", "Vehicle, witness, and roadway evidence"],
    insurance: "Auto liability and uninsured motorist coverage may be relevant even though the injured person was riding a bicycle.",
    injuries: ["Shoulder, wrist, and hand injuries", "Head injuries", "Fractures and road-rash injuries"],
    review: ["Road position and vehicle movement", "Bicycle and vehicle damage patterns", "Camera, device, and witness evidence"], faqs: sharedFaqs,
  },
  {
    slug: "unsafe-property", name: "Unsafe property and falls", short: "Premises incidents where notice, control, and the changing condition matter.",
    involves: "Falls and other property incidents may involve spills, broken surfaces, poor lighting, missing warnings, security failures, or unsafe maintenance.",
    firstSteps: ["Report the incident and request a copy", "Photograph the condition before it changes", "Keep footwear, clothing, receipts, and witness details"],
    records: ["Condition and location photographs", "Incident, inspection, and maintenance records", "Ownership and control information"],
    insurance: "Property, business, contractor, and management-company policies may be involved, and the responsible entity may not be obvious from the location alone.",
    injuries: ["Hip, knee, and ankle injuries", "Wrist and shoulder injuries", "Head and spinal injuries"],
    review: ["Who controlled the area", "How long the condition existed", "Inspection, notice, warning, and repair practices"], faqs: sharedFaqs,
  },
  {
    slug: "serious-injuries", name: "Serious injuries", short: "Long-horizon planning when an injury changes work, mobility, or daily care.",
    involves: "Life-changing injuries require a record that connects medical needs, daily function, work, caregiving, equipment, transportation, and future support.",
    firstSteps: ["Follow qualified medical guidance", "Choose one person to organize records", "Track new care, equipment, transportation, and home-support needs"],
    records: ["Care plans and specialist records", "Accessibility and caregiving costs", "Work, education, and daily-function changes"],
    insurance: "Multiple liability and first-party policies, healthcare benefits, liens, and future-care issues may require coordinated review.",
    injuries: ["Brain and spinal-cord injuries", "Amputation and severe orthopedic injury", "Burns, organ damage, and permanent impairment"],
    review: ["Medical and functional prognosis", "Long-term support and economic needs", "All potentially responsible parties and coverage"], faqs: sharedFaqs,
  },
  {
    slug: "wrongful-death", name: "Wrongful death", short: "Careful, family-centered guidance after a fatal incident.",
    involves: "A fatal incident creates legal questions alongside grief, family responsibilities, official investigations, household changes, and financial uncertainty.",
    firstSteps: ["Let immediate family needs come first", "Designate one trusted contact for records and calls", "Preserve official notices, reports, and expense records"],
    records: ["Official and medical records", "Household and financial documents", "Incident evidence and communications"],
    insurance: "Available coverage depends on how the death occurred, the responsible parties, and the policies connected to them.",
    injuries: ["Fatal roadway incidents", "Fatal premises incidents", "Loss connected to serious injury"],
    review: ["Who has legal authority to act", "Evidence, responsibility, and available coverage", "Family and financial consequences recognized by applicable law"], faqs: sharedFaqs,
  },
];

export type Resource = {
  slug: string; title: string; category: string; readTime: string; summary: string;
  answer: string; steps: string[]; mistakes: string[]; whenCounselHelps: string;
  sources: { label: string; href: string }[];
  relatedAreas: string[]; relatedArticles: string[];
};

const caDmv = { label: "California DMV — Traffic Accident Information", href: "https://www.dmv.ca.gov/portal/vehicle-registration/reporting-traffic-accident/" };
const caInsurance = { label: "California Department of Insurance — Auto Insurance", href: "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/" };
const caBar = { label: "State Bar of California — Finding the Right Lawyer", href: "https://www.calbar.ca.gov/public/free-legal-information/before-selecting-an-attorney" };

export const resources: Resource[] = [
  ["after-car-accident-california", "What to do after a car accident in California", "Immediate steps", "8 min", "A direct checklist for safety, records, reporting, and early insurance contact.", "Start with safety and medical needs, then preserve accurate scene and contact information before it disappears.", ["Call 911 when injuries or roadway danger require it", "Exchange driver, vehicle, and insurance information", "Photograph the scene and keep the report details"], ["Arguing about fault at the scene", "Editing original photographs", "Waiting to identify nearby cameras"], "Counsel may help when injuries, disputed fault, commercial vehicles, inadequate insurance, or broad releases create questions.", [caDmv, caInsurance], ["car-accidents"], ["evidence-after-accident", "insurance-adjuster-call"]],
  ["evidence-after-accident", "What evidence should you preserve after an accident?", "Evidence", "7 min", "What to keep, what can disappear, and how to preserve originals.", "Preserve original scene files, witness and camera information, damaged property, reports, and dated records of the effects that follow.", ["Keep original photo and video files", "Write down witness and camera locations", "Save reports, estimates, bills, and insurer messages"], ["Repairing or discarding physical evidence too quickly", "Relying on social-media copies", "Assuming a business will preserve video without notice"], "Counsel may identify time-sensitive evidence and send appropriate preservation requests.", [caDmv], ["car-accidents", "truck-accidents", "unsafe-property"], ["after-car-accident-california", "document-pain-treatment"]],
  ["insurance-adjuster-call", "Should you speak with the insurance adjuster?", "Insurance", "6 min", "How to prepare before a recorded statement, authorization, or release.", "You may need to communicate basic facts, but you do not need to guess, minimize symptoms, or sign a broad document you do not understand.", ["Ask whether the call is recorded", "Request copies of documents before signing", "Keep notes of names, dates, and requests"], ["Estimating facts you do not know", "Signing a broad medical authorization without review", "Assuming every adjuster represents your interests"], "Counsel may explain obligations, review releases, and handle disputed or detailed communications.", [caInsurance], ["car-accidents", "rideshare-accidents"], ["partial-fault-california", "uninsured-driver"]],
  ["partial-fault-california", "What happens if you may be partially at fault?", "Responsibility", "7 min", "Why uncertainty about fault should not stop a careful review.", "Your first impression is not a legal determination. Multiple actions, evidence sources, and California’s comparative-fault rules may require evaluation.", ["Preserve what each person did before impact", "Identify independent witnesses and cameras", "Avoid turning uncertainty into a recorded conclusion"], ["Assuming an apology decides legal fault", "Ignoring another party’s conduct", "Discarding a claim before evidence is reviewed"], "Counsel may compare the available evidence with California law and explain how shared responsibility could affect options.", [caBar], ["car-accidents", "motorcycle-accidents", "bicycle-accidents"], ["evidence-after-accident", "insurance-adjuster-call"]],
  ["document-pain-treatment", "How to document pain, treatment, and daily limitations", "Health records", "7 min", "A factual record of appointments, restrictions, and daily changes without self-diagnosis.", "Use short dated notes describing observable changes, care received, instructions, missed activities, and help you needed.", ["Keep appointment and medication records", "Record concrete changes in sleep, work, driving, and household tasks", "Tell clinicians about new or worsening concerns"], ["Trying to diagnose yourself", "Writing exaggerated or absolute descriptions", "Posting private recovery details publicly"], "Counsel may help organize records and identify gaps, while medical decisions remain with qualified healthcare professionals.", [caBar], ["serious-injuries"], ["evidence-after-accident", "medical-bills-after-accident"]],
  ["uninsured-driver", "What happens when the other driver is uninsured?", "Insurance", "7 min", "Potential coverage questions when the responsible driver has little or no insurance.", "Your own policy may include uninsured or underinsured motorist protection, but coverage depends on the policy and facts.", ["Notify your insurer without guessing about details", "Request the declarations and applicable policy language", "Preserve information about every involved driver and vehicle"], ["Assuming no other coverage exists", "Accepting a coverage position without the policy", "Missing contractual notice requirements"], "Counsel may identify policies, review coverage positions, and explain claim requirements.", [caInsurance], ["car-accidents", "pedestrian-accidents", "bicycle-accidents"], ["insurance-adjuster-call"]],
  ["rideshare-accident-guide", "What to know after a rideshare accident", "Rideshare", "8 min", "How app status, trip records, and multiple insurers can shape the review.", "Save the trip record and app communications immediately because the driver’s status can affect which coverage may apply.", ["Screenshot the trip and driver profile", "Report the crash through appropriate channels", "Keep communications from the platform and insurers"], ["Deleting the app or trip receipt", "Assuming the platform automatically accepts responsibility", "Speaking for another person in the vehicle"], "Counsel may investigate app status and coordinate competing insurers.", [caInsurance], ["rideshare-accidents"], ["insurance-adjuster-call", "evidence-after-accident"]],
  ["medical-bills-after-accident", "How medical bills may be handled after an accident", "Costs", "8 min", "An overview of health insurance, medical-payment coverage, liens, and claim reimbursement questions.", "Bills may move through health coverage, medical-payment benefits, provider arrangements, or later claim resolution; the path varies by policy and provider.", ["Keep every bill and explanation of benefits", "Ask providers where claims were submitted", "Track payments, balances, and reimbursement requests"], ["Ignoring bills while a claim is pending", "Assuming the liability insurer pays bills as they arrive", "Paying the same balance twice"], "Counsel may help identify payment sources and account for liens or reimbursement claims.", [caInsurance], ["car-accidents", "serious-injuries"], ["document-pain-treatment"]],
  ["consultation-questions", "Questions to ask during a personal injury consultation", "Consultation", "6 min", "A short list for understanding experience, communication, fees, and next steps.", "Use the consultation to understand who will evaluate the matter, how communication works, what costs may arise, and what happens next.", ["Ask who will handle the evaluation", "Ask how fees and case costs work", "Ask what information would help the next review"], ["Relying only on slogans", "Assuming a consultation guarantees representation", "Leaving without understanding the next step"], "Speaking with counsel can turn a general web search into advice tied to the actual facts and jurisdiction.", [caBar], ["car-accidents", "serious-injuries"], ["claim-process-overview"]],
  ["claim-process-overview", "How a personal injury claim generally progresses", "Process", "9 min", "The common stages from intake and investigation through resolution or litigation.", "A matter typically moves through intake, evidence collection, treatment documentation, insurance evaluation, negotiation, and—when appropriate—litigation, but no two timelines are identical.", ["Complete conflicts and intake review", "Preserve evidence and document care", "Evaluate responsibility, coverage, and losses"], ["Expecting a fixed timeline", "Assuming filing a claim guarantees payment", "Making major decisions without current information"], "Counsel can explain which stages apply, what decisions belong to the client, and how deadlines affect the plan.", [caBar], ["car-accidents", "unsafe-property", "wrongful-death"], ["consultation-questions"]],
].map(([slug,title,category,readTime,summary,answer,steps,mistakes,whenCounselHelps,sources,relatedAreas,relatedArticles]) => ({ slug,title,category,readTime,summary,answer,steps,mistakes,whenCounselHelps,sources,relatedAreas,relatedArticles } as Resource));

export const processStages = [
  ["Tell us what happened", "Call or complete the three-question review. The first conversation stays focused on what matters now."],
  ["Speak with our intake team", "We gather the information needed for an attorney to evaluate the situation."],
  ["Attorney evaluation", "A lawyer reviews timing, injuries, available evidence, responsibility, and coverage."],
  ["Understand your options", "The firm explains whether it can assist and what may happen next."],
  ["Move forward together", "If representation is offered and accepted in writing, the legal work begins."],
] as const;

export const homeFaqs = [
  ["Is the case review free?", "There is no charge to request an initial case review. Fee arrangements are discussed before any representation begins."],
  ["What if I am not sure who caused the accident?", "Uncertainty should not stop you from preserving evidence or asking for a review. Fault depends on facts and applicable law, not a single checkbox."],
  ["Will submitting the form make me a client?", "No. The form requests contact from the intake team. Representation requires conflicts review, an offer from the firm, and a signed agreement."],
  ["What if the accident happened recently?", "Address urgent care and safety first. Early contact may help identify scene evidence, cameras, witnesses, and reporting steps before records disappear."],
  ["Should I wait until treatment is finished?", "You do not need a complete medical file to request a call. Seek appropriate medical care and keep the records you receive."],
] as const;

export function getPracticeArea(slug: string) { return practiceAreas.find((item) => item.slug === slug); }
export function getResource(slug: string) { return resources.find((item) => item.slug === slug); }
