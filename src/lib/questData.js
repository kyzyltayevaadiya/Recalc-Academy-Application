// Central content for the RPG journey. All real details are semantic placeholders
// so they can be swapped in later without touching component structure.

export const HERO = {
  title: "ADIYA'S QUEST",
  subtitle: "From ideas to impact. From challenges to opportunities.",
  tagline: "The Capital Chronicle",
  startLabel: "START JOURNEY",
  profileLabel: "View Character Profile",
  introLine: "Every great journey begins before you know where it will lead.",
  questStarted: "Discover what happens when curiosity meets ambition.",
};

export const PROFILE = {
  name: "[ADIYA]",
  class: "Entrepreneur · Builder · Future Investor",
  level: "LV. 19 — Aspiring Capitalist",
  location: "[YOUR CITY, COUNTRY]",
  currentQuest: "Break into finance and learn from exceptional people.",
  intro:
    "[ONE-LINE INTRODUCTION — who you are, what you build, and where you're heading. A sentence or two that frames the whole journey.]",
  traits: [
    { label: "Curiosity", value: 9, max: 10 },
    { label: "Resilience", value: 10, max: 10 },
    { label: "Leadership", value: 8, max: 10 },
    { label: "Creativity", value: 9, max: 10 },
    { label: "Finance XP", value: 6, max: 10 },
    { label: "Ambition", value: 10, max: 10 },
  ],
  links: { cv: "[CV LINK]", linkedin: "[LINKEDIN]" },
};

export const CHAPTERS = [
  { id: "hero", label: "Title", map: "Title" },
  { id: "profile", label: "Profile", map: "Hero" },
  { id: "origin", label: "Chapter I — Origin", map: "Village" },
  { id: "forest-passage", label: "Chapter II — The Unknown", map: "Forest" },
  { id: "forest", label: "The Crossroads", map: "Crossroads" },
  { id: "mountain", label: "Chapter III — The Climb", map: "Mountain" },
  { id: "dragon", label: "Chapter IV — The Encounter", map: "Dragon" },
  { id: "battle", label: "Chapter IV — Boss Battle", map: "Boss" },
  { id: "loot", label: "Chapter V — Loot", map: "Treasure" },
  { id: "inventory", label: "Inventory", map: "Inventory" },
  { id: "questlog", label: "Quest Log", map: "Quests" },
  { id: "flight", label: "Chapter VI — Dragon Flight", map: "Flight" },
  { id: "arrival", label: "Chapter VI — Arrival", map: "Arrival" },
  { id: "capital", label: "The City of Capital", map: "Capital" },
  { id: "whyfinance", label: "Why Finance", map: "Campfire" },
  { id: "academy-gates", label: "Chapter VII — Dawn", map: "Dawn" },
  { id: "academy", label: "Chapter VII — Academy", map: "Academy" },
  { id: "finalboss", label: "Final Boss", map: "Mirror" },
  { id: "finale", label: "The Next Level", map: "Finale" },
];

export const ORIGIN = {
  title: "WHERE THE JOURNEY BEGAN",
  chapter: "CHAPTER I",
  body:
    "[A short, warm origin story — where you grew up, the first sparks of curiosity, the people or moments that planted ambition. Keep it human and specific, not a list.]",
  objects: [
    {
      icon: "school",
      title: "Schoolhouse",
      tag: "EDUCATION",
      text: "[EDUCATION — school, degree, years, and the one thing that lit you up academically.]",
    },
    {
      icon: "book",
      title: "Old Book",
      tag: "EARLY ACHIEVEMENT",
      text: "[ACHIEVEMENT — a concrete early win: grades, competition, scholarship, project.]",
    },
    {
      icon: "signpost",
      title: "Signpost",
      tag: "EARLY INTERESTS",
      text: "[What fascinated you early — numbers, building things, markets, solving problems.]",
    },
    {
      icon: "house",
      title: "Home",
      tag: "PERSONAL",
      text: "[A personal detail that grounds the story — family, values, a formative moment.]",
    },
  ],
};

export const FOREST = {
  title: "STEPPING INTO THE UNKNOWN",
  chapter: "CHAPTER II",
  body:
    "[The moment you left the comfortable path — first venture, first risk, first time building something real. Show initiative through the story, not by saying 'I am proactive.']",
  roads: [
    { label: "SAFE ROAD", desc: "Stay on the known path." },
    { label: "UNKNOWN ROAD", desc: "Build something from nothing." },
  ],
  chosen: "UNKNOWN ROAD",
  notification: "COURAGE +1",
  decisions: [
    "[DECISION 1 — a real choice that pushed you outside your comfort zone, with what you did and what it cost.]",
    "[DECISION 2 — another initiative: a project, a side hustle, a team you assembled, a skill you taught yourself.]",
    "[DECISION 3 — the leap that eventually led toward building a startup.]",
  ],
};

export const MOUNTAIN = {
  title: "THE CLIMB",
  chapter: "CHAPTER III",
  body:
    "Each checkpoint is a real milestone. The altitude is metaphor for effort — the higher you climb, the more you can see.",
  checkpoints: [
    { tag: "BASE CAMP", title: "First Meaningful Project", text: "[First real project — what it was, your role, the result.]" },
    { tag: "CHECKPOINT I", title: "New Skill Learned", text: "[A skill you taught yourself to unblock the next step.]" },
    { tag: "CHECKPOINT II", title: "Leadership Experience", text: "[When you led others — team size, what you shipped.]" },
    { tag: "CHECKPOINT III", title: "Major Achievement", text: "[A measurable result: users, revenue, placement, impact.]" },
    { tag: "SUMMIT", title: "The Realization", text: "[The moment you knew you wanted to push far beyond where you were.]" },
  ],
  dragonReveal: "Something enormous appears on the horizon.",
};

export const DRAGON = {
  title: "THE STARTUP",
  chapter: "BOSS BATTLE",
  bossName: "UNCERTAINTY",
  intro:
    "[STARTUP NAME] — [one line on what it was and who it was for]. The dragon is every hard thing that came with building it.",
  rounds: [
    {
      attack: "NO RESOURCES",
      response: "RESOURCEFULNESS",
      detail: "[WHAT I DID with no budget/team — the scrappy move that kept it alive.]",
    },
    {
      attack: "UNCERTAINTY",
      response: "ITERATION",
      detail: "[How you tested, learned, and changed direction based on real signal.]",
    },
    {
      attack: "FAILURE",
      response: "LEARN → ADAPT → TRY AGAIN",
      detail: "[A real failure and what you changed because of it.]",
    },
    {
      attack: "NO CLEAR ROADMAP",
      response: "BUILD ONE",
      detail: "[How you created structure where none existed — process, plan, priorities.]",
    },
  ],
  result:
    "[RESULT — measurable: revenue, users, growth, team size, competition placement. Be honest. Not everything worked.]",
  transformation:
    "The challenge didn't disappear. I learned how to use it. The dragon became the thing I ride forward.",
};

export const LOOT = {
  title: "SKILLS ACQUIRED",
  xp: 2500,
  skills: [
    "ENTREPRENEURSHIP",
    "PROBLEM SOLVING",
    "LEADERSHIP",
    "FINANCIAL THINKING",
    "COMMUNICATION",
    "EXECUTION",
    "RESILIENCE",
    "ADAPTABILITY",
  ],
  tree: [
    { branch: "BUSINESS", nodes: ["Validated an idea", "Shipped a product", "[RESULT]"] },
    { branch: "FINANCE", nodes: ["Built a model", "[FINANCE PROJECT]", "Read the markets"] },
    { branch: "LEADERSHIP", nodes: ["Led a team of [N]", "[OUTCOME]"] },
    { branch: "TECHNOLOGY", nodes: ["Shipped [STACK]", "[IMPACT]"] },
    { branch: "COMMUNICATION", nodes: ["Pitched to [AUDIENCE]", "[RESULT]"] },
  ],
};

export const INVENTORY = {
  title: "INVENTORY",
  items: [
    { icon: "🏆", name: "[AWARD]", rarity: "LEGENDARY", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "📜", name: "[CERTIFICATION]", rarity: "RARE", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "🚀", name: "[STARTUP]", rarity: "EPIC", year: "[YEAR]", role: "Founder", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "🧪", name: "[PROJECT]", rarity: "RARE", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "🎓", name: "[EDUCATION]", rarity: "EPIC", year: "[YEAR]", role: "Student", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "💼", name: "[EXPERIENCE]", rarity: "RARE", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "📊", name: "[FINANCE PROJECT]", rarity: "EPIC", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
    { icon: "🌍", name: "[EXTRACURRICULAR]", rarity: "COMMON", year: "[YEAR]", role: "[ROLE]", result: "[RESULT]", learned: "[LESSON]" },
  ],
};

export const QUESTLOG = {
  title: "QUEST LOG",
  completed: [
    { name: "Launch first project", date: "[MONTH YEAR]", detail: "[WHAT + RESULT]" },
    { name: "Build startup MVP", date: "[MONTH YEAR]", detail: "[WHAT + RESULT]" },
    { name: "Lead a team", date: "[MONTH YEAR]", detail: "[TEAM SIZE + OUTCOME]" },
    { name: "[ACHIEVEMENT]", date: "[MONTH YEAR]", detail: "[WHAT + RESULT]" },
  ],
  current: "BREAK INTO FINANCE",
  next: "RECALC ACADEMY",
};

export const CAPITAL = {
  title: "THE CITY OF CAPITAL",
  chapter: "CHAPTER VI",
  intro:
    "The medieval town matures into a financial metropolis. Wooden shops become exchanges. Coins become capital. This is where my interest in finance took shape.",
  buildings: [
    { name: "THE MARKETPLACE", tag: "MARKETS", text: "[How I started following markets, what I trade/track, what I learned about price action.]" },
    { name: "THE VALUATION TOWER", tag: "VALUATION", text: "[A company I analyzed — thesis, model, what I concluded.]" },
    { name: "THE HOUSE OF CAPITAL", tag: "CAPITAL ALLOCATION", text: "[How I think about where capital should go and why — a real example.]" },
    { name: "THE DEAL ROOM", tag: "DEAL-MAKING", text: "[A negotiation, deal, or partnership I shaped and the outcome.]" },
  ],
  merchantPrompt: "Where should 1,000 gold coins be invested?",
};

export const WHY_FINANCE = {
  title: "WHY THIS PATH?",
  body:
    "I didn't start with finance. I started by building — and building taught me to understand businesses. Understanding businesses taught me to ask why some survive and others don't. That question led to capital, to risk, to growth — and that's where finance lives.",
  constellations: ["BUSINESS", "CAPITAL", "STRATEGY", "PEOPLE", "RISK", "GROWTH"],
  formed: "FINANCE",
};

export const ACADEMY = {
  title: "THE NEXT QUEST",
  chapter: "CHAPTER VII",
  name: "[ACADEMY NAME]",
  reasons: [
    "[Why I want to join — specific, credible, not flattery.]",
    "[What I want to learn — the gap I'm trying to close.]",
    "[Why this environment fits my goals — cohort, mentorship, intensity.]",
    "[What experiences I bring — what I can contribute to the cohort.]",
    "[The person I hope to become — and how the academy is the bridge.]",
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
  academyName: "[ACADEMY NAME]",
  primaryCta: "LET'S BEGIN THE NEXT CHAPTER",
  secondary: { cv: "[CV LINK]", linkedin: "[LINKEDIN]", email: "[EMAIL]" },
  saved: "Progress saved.",
};

export const ACHIEVEMENTS = [
  { id: "start", title: "Quest Started", desc: "You pressed START.", icon: "▶" },
  { id: "curiosity", title: "Curiosity", desc: "You explored a hidden object.", icon: "🌿" },
  { id: "dragon", title: "Dragon Tamed", desc: "You turned a challenge into leverage.", icon: "🐉" },
  { id: "treasure", title: "Treasure Opened", desc: "You claimed your skills.", icon: "💎" },
  { id: "academy", title: "Gates Reached", desc: "You found the next level.", icon: "🏰" },
];

export const IMAGE_URLS = {
  hero: "https://media.base44.com/images/public/6aaf7af1cb9cc0b6d5ca34aa/ac814b896_generated_f4e4f450.jpg",
  dragon: "https://media.base44.com/images/public/6aaf7af1cb9cc0b6d5ca34aa/65a410a58_generated_79653030.jpg",
  capital: "https://media.base44.com/images/public/6aaf7af1cb9cc0b6d5ca34aa/0122808e9_generated_5dc7bf64.jpg",
  academy: "https://media.base44.com/images/public/6aaf7af1cb9cc0b6d5ca34aa/3e32ae00f_generated_3fb2064a.jpg",
};