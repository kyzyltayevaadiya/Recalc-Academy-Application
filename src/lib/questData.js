// Central content for the RPG journey. All real details are semantic placeholders
// so they can be swapped in later without touching component structure.

import heroImg from "@/assets/images/hero.jpg";
import capitalImg from "@/assets/images/capital.jpg";
import academyImg from "@/assets/images/academy.jpg";
import portraitImg from "@/assets/images/portrait.png";

export const HERO = {
  title: "ADIYA'S QUEST",
  subtitle: "From ideas to impact. From challenges to opportunities.",
  tagline: "Welcome to...",
  startLabel: "START JOURNEY",
  introLine: "Every great journey begins before you know where it will lead.",
  questStarted: "Discover what happens when curiosity meets ambition.",
};

export const PROFILE = {
  portrait: portraitImg,
  name: "ADIYA KYZYLTAYEVA",
  class: "Finance · Private Equity · Investment Banking",
  level: "LV. 20 — FRESHMAN",
  location: "LOS ANGELES, USA",
  education: {
    degree: "WORLD BACHELOR IN BUSINESS (TRIPLE DEGREE)",
    schools: [
      { flag: "🇺🇸", name: "University of Southern California, LA", current: true },
      { flag: "🇭🇰", name: "Hong Kong University of Science and Technology" },
      { flag: "🇮🇹", name: "Bocconi University, Milan" },
    ],
  },
  currentQuest: "Take ownership stakes in companies and drive their growth. NYC.",
  intro:
    "I love building and growing! With no finance background, that drive attracted resources — full scholarships, highly selective grants, B2B investments in my startups, even a government contract. Now I want to learn the other side of that — instead of building myself, helping others use institutional capital to create and scale.",
  traits: [
    { label: "Curiosity", value: 9, max: 10 },
    { label: "Resilience", value: 10, max: 10 },
    { label: "Leadership", value: 8, max: 10 },
    { label: "Creativity", value: 9, max: 10 },
    { label: "Finance XP", value: 6, max: 10 },
    { label: "Ambition", value: 10, max: 10 },
  ],
  links: { cv: "/cv", linkedin: "https://www.linkedin.com/in/adiya-kyzyltayeva" },
};

// Academic background + languages, shown as the "CHARACTER RECORDS" panel
// right below the main character profile card.
export const RECORDS = {
  title: "CHARACTER RECORDS",
  subtitle: "ACADEMIC BACKGROUND & LANGUAGES",
  origin: { flag: "🇰🇿", country: "KAZAKHSTAN", language: "Kazakh" },
  school: {
    name: "Nazarbayev Intellectual School",
    program: "International Baccalaureate (IB)",
    hl: ["Business Management", "Math AA", "Physics"],
  },
  bestStudent: { rank: 1, of: 137, context: "GRADUATING CLASS RANK" },
  redDiploma: { label: "PERFECT GPA", sub: "Perfect High School GPA" },
  sat: { score: 1510, max: 1600 },
  ielts: { score: 8.0, max: 9.0 },
  languages: [
    { name: "Kazakh", level: "NATIVE · BILINGUAL", value: 10, max: 10 },
    { name: "Russian", level: "NATIVE · BILINGUAL", value: 10, max: 10 },
    { name: "English", level: "FLUENT", note: "IELTS 8.0", value: 9, max: 10 },
  ],
};

// Milestones along the horseback "journey trail" scene, oldest to newest —
// pulled directly from the resume, no invented figures.
export const JOURNEY = {
  title: "THE TRAIL SO FAR",
  chapter: "THE MAP",
  intro: "Every marker on this trail is a real stop — click one to see what happened there.",
  milestones: [
    {
      id: "foundations",
      icon: "swords",
      year: "6 YEARS",
      title: "Debate Club & Varsity Athletics",
      org: "Founder & Captain, Debate Club · Varsity Athlete — 5 Teams",
      location: "Astana, Kazakhstan",
      bullets: [
        "Founded and captained the Debate Club; won the National Debate Championship and earned National Best Speaker honors multiple times (10+ national awards).",
        "Designed training curricula and coached teammates to regional victories, including on unfamiliar motions.",
        "Reselected annually to varsity rosters across 5 sports (basketball, soccer, table tennis, chess) over 6 years — core rotation player on a basketball team that went undefeated to Regional and National Championship titles (20+ competing schools).",
      ],
    },
    {
      id: "investing",
      icon: "trending-up",
      year: "2020 — PRESENT",
      title: "Independent Investment Portfolio Management",
      org: "Self-Directed Investor",
      location: "Astana, Kazakhstan",
      bullets: [
        "Independently manages a personal brokerage account since age 14.",
        "Built an investment strategy to hedge personal savings against Kazakhstan's high inflation.",
        "Developed financial literacy through self-directed research rather than formal training.",
      ],
    },
    {
      id: "nuris",
      icon: "cpu",
      year: "OCT 2022 — MAR 2023",
      title: "IDA TECH — NURIS Hardware Challenge 3.0",
      org: "Team Lead & Co-Founder (IHT Central Asia)",
      location: "Astana, Kazakhstan",
      bullets: [
        "Led an all-female high school team to win ₸300,000 for a 3D-printed skull fixation prototype for neurosurgery.",
        "Developed the prototype with accredited medical specialists.",
        "The only high school team — and only all-women team — competing against university-level participants.",
      ],
    },
    {
      id: "biotech-venture",
      icon: "leaf",
      year: "MAY 2023 — AUG 2025",
      title: "Biotech & Environmental Education Venture",
      org: "Co-Founder",
      location: "Astana, Kazakhstan",
      bullets: [
        "Co-led a venture addressing an ecological crisis in Kazakhstan, securing ~$13,000 in R&D funding through Turaqty Jol, the country's largest UNESCO-backed ecoventure competition.",
        "Represented the project internationally.",
        "Co-built a practice-based “bioacademy” with 20+ partner organizations, mentoring younger students toward medicine and STEM careers.",
      ],
    },
    {
      id: "autism-venture",
      icon: "heart-pulse",
      year: "APR 2023 — JUN 2025",
      title: "AI-Based Early Autism Detection Venture",
      org: "Founder & Executive Director",
      location: "Astana, Kazakhstan",
      bullets: [
        "Founded and led product development from concept through pilot; ranked top-10 among 128 applicant companies evaluated by Astana Hub, the Government of Astana, and Astana Innovations — the only top-10 startup to secure 3 governmental clinic partnerships (peer average: 1).",
        "Directed fundraising and stakeholder relations: secured ~$12,000 in funding and negotiated a business-to-government contract with Kazakhstan's Ministries of Health and Digitalization, coordinating a two-month pilot across three major clinics.",
        "Won Kazakhstan's national “Best Social Project 2024” award (Capital Health Forum), becoming the youngest winner in the award's history; represented the venture on EuroNews, at TEDx Astana, and across 8+ additional media features.",
      ],
    },
    {
      id: "second-chance",
      icon: "globe",
      year: "JUN 2025 — JUL 2026",
      title: "Second Chance at Higher Ed",
      org: "Lead Intern & Assistant to the Executive Director",
      location: "Remote / International",
      bullets: [
        "Earned a place in a global fellowship among 401 applicants across 60+ countries (<10% acceptance rate); advanced to sole Lead Intern for consistently reliable, high-quality work.",
        "Coordinated and mentored incoming interns across a cohort spanning the US, Hong Kong, and Europe, managing competing priorities under minimal oversight.",
        "Independently secured $3,000 in gap-year funding for a fellow student through outreach to a personal mentor contact.",
      ],
    },
    {
      id: "wbb",
      icon: "graduation-cap",
      year: "EXPECTED JUN 2030",
      title: "World Bachelor in Business — Triple Degree",
      org: "USC Marshall · HKUST · Bocconi",
      location: "Los Angeles · Hong Kong · Milan",
      bullets: [
        "Earned admission to one of the world's most selective undergraduate business programs (~10% acceptance rate).",
        "Awarded a merit scholarship — among the highest the program has granted to a student from Asia.",
      ],
    },
  ],
};

export const CHAPTERS = [
  { id: "hero", label: "Title", map: "Title" },
  { id: "profile", label: "Profile", map: "Hero" },
  { id: "journey", label: "The Trail So Far", map: "Trail" },
  { id: "forest-passage", label: "Chapter I — The Unknown", map: "Forest" },
  { id: "forest", label: "The Crossroads", map: "Crossroads" },
  { id: "mountain", label: "Chapter II — The Climb", map: "Mountain" },
  { id: "dragon", label: "Chapter III — The Encounter", map: "Dragon" },
  { id: "battle", label: "Chapter III — Boss Battle", map: "Boss" },
  { id: "loot", label: "Chapter IV — Loot", map: "Treasure" },
  { id: "inventory", label: "Inventory", map: "Inventory" },
  { id: "questlog", label: "Quest Log", map: "Quests" },
  { id: "flight", label: "Chapter V — Dragon Flight", map: "Flight" },
  { id: "arrival", label: "Chapter V — Arrival", map: "Arrival" },
  { id: "capital", label: "The City of Capital", map: "Capital" },
  { id: "whyfinance", label: "Why Finance", map: "Campfire" },
  { id: "academy-gates", label: "Chapter VI — Dawn", map: "Dawn" },
  { id: "academy", label: "Chapter VI — Academy", map: "Academy" },
  { id: "finalboss", label: "Final Boss", map: "Mirror" },
  { id: "finale", label: "The Next Level", map: "Finale" },
];

export const FOREST = {
  title: "STEPPING INTO THE UNKNOWN",
  chapter: "CHAPTER I",
  memory:
    "Until sixth grade, my world was small and safe: local school, home, family down the hall. Then came an offer that changed everything — a spot at the most selective school in the country. Fully funded. But it was far — almost outside the city — and it meant boarding. No parents nearby. Just me, at twelve years old, walking into one of the most competitive environments I'd ever face.",
  body:
    "Getting in wasn't automatic. Nazarbayev Intellectual School — the country's top IB institution — admits students through a national selection process: five exams, covering Math, Spatial Thinking, English, Russian, and Kazakh. Acceptance rate: under 14%.\n\nPassing meant more than a diploma. It meant full funding, an IB curriculum most schools in the country couldn't offer, access to national and international competitions, and a network of the most driven students in Kazakhstan — resources and opportunities that simply weren't available on the path I already knew.",
  forkLabel: "THE FORK",
  forkIntro: "Two paths stood in front of me.",
  roads: [
    { label: "🛡️ Path A — Stay", desc: "Stay home. Stay close to family. Stay at the level I already knew." },
    { label: "⚔️ Path B — Leave", desc: "Move away at 12. Live far from everyone I knew, abandon my friends from school. Compete in a fully selective, high-pressure environment — on my own." },
  ],
  chosen: "⚔️ Path B — Leave",
  notification: "COURAGE +1",
  decisions: [
    {
      title: "Age 12: Choosing the Harder School",
      body: "Left home and family to attend Kazakhstan's most selective school — full scholarship, <14% acceptance rate. This planted the core lesson: choosing difficulty on purpose pays off.",
    },
    {
      title: "Ages 13–16: Competing Beyond the Curriculum",
      body: "Repeatedly entered Olympiads (Biology, Math — 1st–3rd place, 2020–2023), joined debate, and applied to National Geographic Kazakhstan's \"Young Explorers\" research course.",
      traits: "Curiosity: assigned work → sought-out research. Communication: first steps into debate. Initiative: one-off wins → repeated, self-driven entry.",
    },
    {
      title: "Ages 16–17: Competing in Adult, International Arenas",
      body: "Led a high-school team to win the NURIS Hardware Challenge 3.0 against university competitors, ranked top 10% globally at CERN & DESY's Beamline for Schools, made Kazakhstan's National Debate Pre-Team, and delivered two TEDx talks.",
      traits: "Curiosity: spans hardware, physics, medicine. Communication: debate club → public stage. Initiative: entering competitions → leading a team into one Adiya wasn't \"qualified\" for, and winning.",
    },
    {
      title: "Ages 17–18: Choosing Finance as the Arena",
      body: "Attended HSE's Summer Bridge School as the only student from Kazakhstan, then applied to WBB, Jane Street's IN FOCUS, Girls Who Invest, and the Recalc Finance Accelerator — narrowing a broad pattern of competing into one specific industry Adiya had quietly trained for since managing her own brokerage account at 14.",
      traits: "Curiosity: broad → markets and capital specifically. Ambition: proving Adiya can compete → building the exact career path. Initiative: entering open competitions → earning her way into gate-kept rooms.",
    },
  ],
};

export const MOUNTAIN = {
  title: "THE CLIMB",
  chapter: "CHAPTER II",
  narration:
    "There was a problem I noticed that almost no one around me was paying attention to: autism spectrum diagnosis in my country happened too late, and with each new generation, cases kept rising. I didn't know where to start. I only knew that someone had to.",
  stages: [
    {
      tag: "STAGE 1",
      title: "Research",
      text: "For several years, I studied the problem itself: why ASD rates were rising in the new generation, why diagnosis in the country lagged so far behind that children were losing critical time for early intervention. It was scientific work with no ready-made answer at the end — but without understanding the problem, there was nothing to solve it with.",
      progress: 15,
      tone: "ice",
    },
    {
      tag: "STAGE 2",
      title: "The First Wall",
      text: "The research moved forward. Progress on actually solving the problem didn't. Understanding the problem alone changed nothing. That's when I asked myself the question that redirected everything: what if I stopped just studying it, and tried to solve it instead?\n\nI put together a team. We started sketching out early versions of a solution — and rewrote them again, and again, and again. Not a single draft survived first contact with reality.",
      progress: 35,
      tone: "ice",
    },
    {
      tag: "STAGE 3",
      title: "Trial by Fire",
      text: "To learn how to turn an idea into a product that could actually reach the market, we started applying to competitions and accelerators one after another — each one adding something the team was missing without real-world experience.",
      tone: "ember",
    },
    {
      tag: "STAGE 4",
      title: "So Close",
      text: "Technovation Girls. National round. Some of the highest scores of any participant that year. We were one step away from the global stage.\n\nAnd we didn't make it.\n\nAfter years of work, it would have been easier to stop here than to keep going. It felt like there was simply no path forward.",
      progress: 68,
      tone: "crimson",
    },
    {
      tag: "STAGE 5",
      title: "One Last Shot",
      text: "That's when my mentor refused to let me stop. She insisted there was one more chance — the \"Astana Smart City\" accelerator. The problem was, we didn't meet half the selection criteria. The team was too young, too inexperienced, without the background usually required.\n\nWe agreed: this was the last attempt. If it didn't work, I could walk away with a clear conscience.\n\nWe applied. And got in!",
      tone: "gold",
    },
  ],
  cliffhanger: "But we didn't expect what happened next…",
  dragonReveal: "Something enormous appears on the horizon.",
};

export const DRAGON = {
  title: "THE STARTUP",
  chapter: "BOSS BATTLE",
  bossName: "UNCERTAINTY",
  intro:
    "AI-Based Early Autism Detection Venture — built to get screening into the hands of families faster than the system usually allows. I treated every challenge to finish the Astana Smart City Governmental Accelerator as a dragon fight.",
  rounds: [
    {
      title: "“You Don’t Belong Here”",
      tag: "Insufficient credibility. Insufficient resources.",
      situation: "Selected among ~40 teams out of 100+ applicants — but almost every other team was an established, operating company. The minimum competitor age was 28; most were 35–40+. My team: high schoolers with a pre-seed idea. We were not taken seriously from day one.",
      response: "I didn't try to look older or more experienced than I was. I let the results speak instead — and committed to three months of weekly tracking sessions where I'd have to prove it, over and over, in front of everyone.",
    },
    {
      title: "Weekly Public Judgment",
      tag: "Brutal, public scrutiny — every single week.",
      situation: "Every Sunday morning, half the cohort gathered. Each team presented their week's results on stage — what was planned, what was delivered. Most teams finished in 15–20 minutes. My team was regularly grilled for 40 minutes to 2 hours — the harshest questioning in the room, every week, while also finishing my final year of IB and doing TV appearances on the side.",
      response: "I stopped treating it as personal and started treating it as training. Every brutal session taught me to defend results under pressure, adapt fast, and deliver on tight deadlines — skills no classroom could have given me.",
    },
    {
      title: "“You Won’t Be Able To”",
      tag: "Doubt from the top.",
      situation: "The program required partnerships with established specialists in our field — something we had none of. When I said we'd secure a collaboration with the country's largest autism support foundation, my tracker told me flatly: “You can try. I'm fairly sure you won't manage it.”",
      response: "I took it personally — as a challenge, not an insult. I went straight to the foundation's head office, met with their representatives, and pitched the project's purpose and social significance myself. By the next tracking session, I had the partnership signed.",
    },
    {
      title: "“Do You Really Think You Can Handle That?”",
      tag: "Being underestimated at the moment that mattered most.",
      situation: "Only 10 of the 30+ remaining companies would be cleared to pursue a real government contract. Asked how many clinics I could realistically cover, my tracker pushed: “Do you believe in yourself enough to handle three?” I didn't know yet that every other company was proposing just one institution.",
      response: "I said yes — and meant it. I was the only founder who submitted a proposal covering three government institutions instead of one. It got approved. My startup ended up piloting across three major clinics plus two additional departments — effectively five points of operation, while every competitor ran one.",
    },
    {
      title: "The System Itself",
      tag: "Bureaucracy, institutional resistance, and a funding gap.",
      situation: "Running the actual pilot meant fighting an entrenched medical system that resisted change at every level, dealing with senior hospital directors who rarely took a teenage founder seriously, and facing a government restructuring that delayed funding entirely — forcing me to find emergency outside financing just to launch the pilot on time. Most companies at this stage quietly dropped out.",
      response: "I stayed flexible instead of rigid, found creative funding to cover the gap, and kept pushing through every bureaucratic layer until I reached the people who could actually approve what a local office couldn't. I didn't quit — even when quitting was the easier, more common choice.",
    },
  ],
  result:
    "Ranked top-10 of 128 companies, secured 3 government clinic partnerships, and won Kazakhstan's national 'Best Social Project 2024' award — the youngest winner in its history, featured on EuroNews, at TEDx Astana, and in 8+ additional media outlets.",
  transformation:
    "The challenge didn't disappear. I learned how to use it. The dragon became the thing I ride forward.",
};

export const LOOT = {
  title: "SKILLS ACQUIRED",
  xp: 2500,
  skills: [
    "ENTREPRENEURSHIP",
    "FUNDRAISING",
    "STAKEHOLDER MANAGEMENT",
    "TEAM LEADERSHIP",
    "FINANCIAL LITERACY",
    "PUBLIC SPEAKING",
    "CROSS-CULTURAL COLLABORATION",
    "EXECUTION UNDER PRESSURE",
  ],
  tree: [
    { branch: "BUSINESS", nodes: ["Founded & led 2 ventures, idea to pilot", "Ranked top-10 of 128 applicant companies", "Negotiated a government contract at 19"] },
    { branch: "FINANCE", nodes: ["Self-managed a brokerage account since age 14", "Raised ~$25,000 combined across two ventures", "Built financial literacy through self-directed research"] },
    { branch: "LEADERSHIP", nodes: ["Led an all-female team to a national hardware win", "Mentored an intern cohort across US / Hong Kong / Europe", "Captained a National Debate Championship team"] },
    { branch: "TECHNOLOGY", nodes: ["Directed an AI-based screening product to pilot", "Co-built a 3D-printed medical device prototype"] },
    { branch: "COMMUNICATION", nodes: ["Pitched to two government ministries — and won", "National Best Speaker, 10+ national debate awards"] },
  ],
};

export const ARTIFACT = {
  name: "OFFICIAL GOVERNMENT DECREE",
  rarity: "LEGENDARY",
  subtitle: "Public Health Administration of the City of Astana",
  translation: {
    heading: "Conclusion on the Results of the “Autism Spectrum” Pilot Project for Early Autism Diagnosis",
    paragraphs: [
      "The Public Health Administration of the City of Astana reports the following regarding the pilot of the “Autism Spectrum” application.",
      "The pilot ran from October 10 to November 11, 2024, across three municipal medical institutions under the Astana City Akimat: City Polyclinic No. 4, City Polyclinic No. 6, and City Polyclinic No. 11.",
      "Participating specialists — general practitioners and pediatricians — were equipped with informational materials and QR codes for the application. Patients were given a self-assessment system that identifies gaps in social communication and social-emotional reciprocity.",
      "The pilot proved its relevance and demand: it significantly reduces doctors’ paperwork, makes diagnosis and monitoring more efficient, and helps families get timely feedback and plan next steps for their child’s development.",
      "Noted limitation: the application ran on Android only, with no other operating systems supported.",
      "Conclusion: the pilot confirmed the system’s potential to optimize healthcare processes, with cross-platform support recommended to maximize its effectiveness.",
    ],
    signOff: "A. Rustemova, Head of the Public Health Administration of the City of Astana",
  },
};

export const INVENTORY = {
  title: "INVENTORY",
  items: [
    { icon: "🏆", name: "Best Social Project 2024", rarity: "LEGENDARY", year: "2024", role: "Founder & Executive Director", result: "Youngest winner in the award's history (Capital Health Forum)", learned: "How to turn a pilot into a nationally recognized program." },
    { icon: "🥇", name: "NURIS Hardware Challenge 3.0", rarity: "EPIC", year: "2022–2023", role: "Team Lead & Co-Founder", result: "₸300,000 won for a 3D-printed skull-fixation prototype", learned: "Technical ambition beats resource gaps when the team is right." },
    { icon: "🚀", name: "AI-Based Early Autism Detection Venture", rarity: "EPIC", year: "2023–2025", role: "Founder", result: "Top-10 of 128 companies; 3 government clinic partnerships", learned: "How to sell an idea to an institution, not just a customer." },
    { icon: "🌱", name: "Biotech & Environmental Education Venture", rarity: "RARE", year: "2023–2025", role: "Co-Founder", result: "~$13,000 R&D funding; 20+ partner organizations", learned: "Impact scales through partnerships, not solo effort." },
    { icon: "🎓", name: "World Bachelor in Business", rarity: "LEGENDARY", year: "2026–2030", role: "Student · USC · HKUST · Bocconi", result: "~10% acceptance rate; merit scholarship", learned: "The value of a foundation broad enough to specialize later." },
    { icon: "💼", name: "Second Chance at Higher Ed Fellowship", rarity: "RARE", year: "2025–2026", role: "Lead Intern", result: "Selected from 401 applicants across 60+ countries", learned: "Reliability is its own kind of leadership." },
    { icon: "🎤", name: "National Debate Championship", rarity: "EPIC", year: "High School", role: "Founder & Captain", result: "10+ national awards, multiple Best Speaker titles", learned: "How to think on your feet under real pressure." },
    { icon: "🏀", name: "Varsity Athletics — 5 Teams", rarity: "RARE", year: "6 years", role: "Varsity Athlete", result: "Regional/National recognition every season", learned: "Discipline compounds across everything else you do." },
  ],
};

export const QUESTLOG = {
  title: "QUEST LOG",
  completed: [
    { name: "Won NURIS Hardware Challenge 3.0", date: "Mar 2023", detail: "₸300,000 for a 3D-printed medical device prototype, built with an all-female high school team." },
    { name: "Founded AI-Based Early Autism Detection Venture", date: "Apr 2023", detail: "Idea to pilot across 3 government clinics; ~$12,000 raised." },
    { name: "Won 'Best Social Project 2024'", date: "2024", detail: "Youngest winner in the award's history; featured on EuroNews and at TEDx Astana." },
    { name: "Admitted to World Bachelor in Business", date: "2026", detail: "Triple-degree program at USC · HKUST · Bocconi (~10% acceptance rate), merit scholarship." },
  ],
  current: "LEAD INTERN — SECOND CHANCE AT HIGHER ED",
  next: "RECALC ACADEMY",
};

export const CAPITAL = {
  title: "THE CITY OF CAPITAL",
  chapter: "CHAPTER V",
  intro:
    "The medieval town matures into a financial metropolis. Wooden shops become exchanges. Coins become capital. I've been trading in this world since I was fourteen.",
  buildings: [
    { name: "THE MARKETPLACE", tag: "MARKETS", text: "Opened my own brokerage account at 14 and have managed it independently ever since — building a strategy to hedge personal savings against Kazakhstan's high inflation, learning the market by doing rather than just reading about it." },
    { name: "THE VALUATION TOWER", tag: "VALUATION", text: "Every venture I've built has forced me to price it: what it's worth, what it costs to run, what a partner or government would need to see before committing funding." },
    { name: "THE HOUSE OF CAPITAL", tag: "CAPITAL ALLOCATION", text: "Across two ventures I've had to decide where every dollar goes — clinic pilots over marketing, medical accreditation over polish. Capital allocation stopped being theoretical the moment it was my own budget." },
    { name: "THE DEAL ROOM", tag: "DEAL-MAKING", text: "Negotiated a business-to-government contract with Kazakhstan's Ministries of Health and Digitalization — the kind of deal that doesn't come with a template." },
  ],
  merchantPrompt: "Where should 1,000 gold coins be invested?",
};

export const WHY_FINANCE = {
  title: "WHY THIS PATH?",
  body:
    "I didn't start with finance. I started by building — two ventures, real budgets, real government stakeholders — and building taught me to understand businesses. Understanding businesses taught me to ask why some get funded and others don't. That question led to capital, to risk, to growth — and that's where finance lives.",
  constellations: ["BUSINESS", "CAPITAL", "STRATEGY", "PEOPLE", "RISK", "GROWTH"],
  formed: "FINANCE",
};

export const ACADEMY = {
  title: "THE NEXT QUEST",
  chapter: "CHAPTER VI",
  name: "RECALC ACADEMY",
  reasons: [
    "I've built two ventures and raised real funding — what I haven't had is structured time with people who allocate capital for a living, and I want that gap closed deliberately, not by accident.",
    "I want to learn how professional investors actually think about risk, valuation, and timing — not just how founders pitch for it.",
    "A World Bachelor in Business gave me three countries and three business schools; I'm looking for an environment just as intense and just as selective to go deeper into finance specifically.",
    "I bring what most applicants won't: a track record of turning ~$25,000 in combined funding and a government contract into results before turning 20.",
    "I want to become the kind of investor who still remembers what it felt like to be on the other side of the table, asking someone to believe in an idea with no track record yet.",
  ],
};

export const FINAL_BOSS = {
  title: "FINAL BOSS DISCOVERED",
  name: "THE PERSON I HAVEN'T BECOME YET",
  stats: [
    { label: "Knowledge", value: 5, max: 10 },
    { label: "Experience", value: 5, max: 10 },
    { label: "Network", value: 4, max: 10 },
    { label: "Financial Expertise", value: 5, max: 10 },
    { label: "Judgment", value: 5, max: 10 },
  ],
  lines: [
    "Some battles aren't meant to be won today.",
    "They're the reason you keep playing.",
  ],
};

export const FINALE = {
  academyName: "RECALC ACADEMY",
  primaryCta: "LET'S BEGIN THE NEXT CHAPTER",
  secondary: { cv: "/cv", linkedin: "https://www.linkedin.com/in/adiya-kyzyltayeva", email: "kyzyltay@usc.edu" },
  saved: "Progress saved.",
};

export const ACHIEVEMENTS = [
  { id: "start", title: "Quest Started", desc: "You pressed START.", icon: "▶" },
  { id: "journey", title: "Trail Traced", desc: "You followed the trail to the end.", icon: "🐎" },
  { id: "dragon", title: "Dragon Tamed", desc: "You turned a challenge into leverage.", icon: "🐉" },
  { id: "treasure", title: "Treasure Opened", desc: "You claimed your skills.", icon: "💎" },
  { id: "academy", title: "Gates Reached", desc: "You found the next level.", icon: "🏰" },
];

export const IMAGE_URLS = {
  hero: heroImg,
  capital: capitalImg,
  academy: academyImg,
};