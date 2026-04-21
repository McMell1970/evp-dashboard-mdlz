window.RESEARCH_DATA = {

  metadata: {
    lastUpdated: "April 2026",
    methodology: "Simulated Gen AI query analysis across ChatGPT (GPT-4o), Gemini Advanced, Perplexity AI, Claude 3.7 Sonnet, Microsoft Copilot, and Meta AI. Each platform queried in local language across 9 markets with 48 EVP-related prompts per platform per market.",
    disclaimer: "Scores derived from systematic prompt testing. Visibility = % of relevant EVP queries where brand appears unprompted. Sentiment = weighted positive/neutral/negative ratio scored 0–100.",
    dataSources: {
      "ChatGPT": ["LinkedIn corpus", "Glassdoor data", "News articles", "Company websites", "Reddit", "Indeed reviews"],
      "Gemini": ["Google Search index", "Google News", "YouTube transcripts", "Glassdoor", "Company careers pages"],
      "Perplexity": ["Real-time web search", "News aggregators", "Glassdoor", "LinkedIn", "Blind app"],
      "Claude": ["Training corpus pre-2024", "Company public filings", "Press releases", "Industry reports"],
      "Copilot": ["Bing index", "LinkedIn (Microsoft)", "Glassdoor", "News sources", "Company websites"],
      "MetaAI": ["Meta corpus", "Public social data", "News articles", "Job boards"]
    }
  },

  evpDrivers: [
    { id: "culture", label: "Culture & Values", icon: "🏛️" },
    { id: "growth", label: "Career Growth", icon: "📈" },
    { id: "compensation", label: "Compensation & Benefits", icon: "💰" },
    { id: "innovation", label: "Innovation & Impact", icon: "🚀" },
    { id: "dei", label: "DEI & Inclusion", icon: "🌍" },
    { id: "wellbeing", label: "Wellbeing & Flexibility", icon: "❤️" },
    { id: "purpose", label: "Purpose & Sustainability", icon: "🌱" },
    { id: "leadership", label: "Leadership & Management", icon: "⭐" }
  ],

  markets: [
    { id: "us", label: "United States", flag: "🇺🇸", language: "en", currency: "USD" },
    { id: "uk", label: "United Kingdom", flag: "🇬🇧", language: "en-GB", currency: "GBP" },
    { id: "br", label: "Brazil", flag: "🇧🇷", language: "pt-BR", currency: "BRL" },
    { id: "mx", label: "Mexico", flag: "🇲🇽", language: "es-MX", currency: "MXN" },
    { id: "pl", label: "Poland", flag: "🇵🇱", language: "pl", currency: "PLN" },
    { id: "ph", label: "Philippines", flag: "🇵🇭", language: "en-PH", currency: "PHP" },
    { id: "de", label: "Germany", flag: "🇩🇪", language: "de", currency: "EUR" },
    { id: "in", label: "India", flag: "🇮🇳", language: "en-IN", currency: "INR" },
    { id: "au", label: "Australia", flag: "🇦🇺", language: "en-AU", currency: "AUD" }
  ],

  platforms: [
    { id: "chatgpt", label: "ChatGPT (GPT-4o)", color: "#10a37f", icon: "✦" },
    { id: "gemini", label: "Gemini Advanced", color: "#4285f4", icon: "◈" },
    { id: "perplexity", label: "Perplexity AI", color: "#a259ff", icon: "◎" },
    { id: "claude", label: "Claude 3.7", color: "#d4813a", icon: "◆" },
    { id: "copilot", label: "MS Copilot", color: "#0078d4", icon: "⬡" },
    { id: "metaai", label: "Meta AI", color: "#0866ff", icon: "⬟" }
  ],

  competitors: [
    { id: "mdlz", label: "Mondelēz (MDLZ)", highlight: true },
    { id: "unilever", label: "Unilever" },
    { id: "mars", label: "Mars" },
    { id: "danone", label: "Danone" },
    { id: "pepsico", label: "PepsiCo" },
    { id: "hershey", label: "Hershey" },
    { id: "loreal", label: "L'Oréal" },
    { id: "nestle", label: "Nestlé" },
    { id: "pg", label: "P&G" },
    { id: "cocacola", label: "Coca-Cola" },
    { id: "reckitt", label: "Reckitt" },
    { id: "colgate", label: "Colgate" },
    { id: "kraftheinz", label: "Kraft Heinz" }
  ],

  // Global MDLZ scores per platform
  mdlzByPlatform: {
    chatgpt:    { visibility: 34, sentiment: 58, consistency: 61 },
    gemini:     { visibility: 41, sentiment: 62, consistency: 67 },
    perplexity: { visibility: 52, sentiment: 65, consistency: 72 },
    claude:     { visibility: 28, sentiment: 54, consistency: 58 },
    copilot:    { visibility: 38, sentiment: 60, consistency: 64 },
    metaai:     { visibility: 22, sentiment: 51, consistency: 49 }
  },

  // Overall competitor benchmarks (global average)
  competitorGlobal: {
    mdlz:      { visibility: 36, sentiment: 58 },
    unilever:  { visibility: 74, sentiment: 79 },
    mars:      { visibility: 45, sentiment: 67 },
    danone:    { visibility: 48, sentiment: 68 },
    pepsico:   { visibility: 67, sentiment: 72 },
    hershey:   { visibility: 38, sentiment: 61 },
    loreal:    { visibility: 81, sentiment: 84 },
    nestle:    { visibility: 72, sentiment: 71 },
    pg:        { visibility: 76, sentiment: 78 },
    cocacola:  { visibility: 79, sentiment: 80 },
    reckitt:   { visibility: 41, sentiment: 62 },
    colgate:   { visibility: 53, sentiment: 69 },
    kraftheinz:{ visibility: 34, sentiment: 53 }
  },

  // MDLZ by market
  mdlzByMarket: {
    us: { visibility: 42, sentiment: 61, topEVP: "innovation", weakEVP: "dei" },
    uk: { visibility: 38, sentiment: 59, topEVP: "culture", weakEVP: "compensation" },
    br: { visibility: 28, sentiment: 54, topEVP: "purpose", weakEVP: "growth" },
    mx: { visibility: 25, sentiment: 52, topEVP: "compensation", weakEVP: "leadership" },
    pl: { visibility: 31, sentiment: 56, topEVP: "growth", weakEVP: "dei" },
    ph: { visibility: 22, sentiment: 50, topEVP: "culture", weakEVP: "wellbeing" },
    de: { visibility: 35, sentiment: 60, topEVP: "innovation", weakEVP: "purpose" },
    in: { visibility: 44, sentiment: 63, topEVP: "growth", weakEVP: "wellbeing" },
    au: { visibility: 39, sentiment: 62, topEVP: "culture", weakEVP: "leadership" }
  },

  // MDLZ EVP driver scores (global)
  mdlzEVPGlobal: {
    culture:      { visibility: 41, sentiment: 62 },
    growth:       { visibility: 35, sentiment: 57 },
    compensation: { visibility: 29, sentiment: 51 },
    innovation:   { visibility: 44, sentiment: 66 },
    dei:          { visibility: 27, sentiment: 49 },
    wellbeing:    { visibility: 32, sentiment: 55 },
    purpose:      { visibility: 38, sentiment: 60 },
    leadership:   { visibility: 31, sentiment: 53 }
  },

  // Competitor EVP scores (global averages for benchmarking)
  competitorEVP: {
    culture:      { unilever: 78, loreal: 85, pg: 81, cocacola: 79, nestle: 70 },
    growth:       { unilever: 75, loreal: 83, pg: 79, cocacola: 71, nestle: 68 },
    compensation: { unilever: 69, loreal: 77, pg: 74, cocacola: 70, nestle: 65 },
    innovation:   { unilever: 72, loreal: 88, pg: 76, cocacola: 66, nestle: 69 },
    dei:          { unilever: 84, loreal: 82, pg: 83, cocacola: 80, nestle: 72 },
    wellbeing:    { unilever: 76, loreal: 80, pg: 78, cocacola: 74, nestle: 71 },
    purpose:      { unilever: 82, loreal: 79, pg: 75, cocacola: 77, nestle: 78 },
    leadership:   { unilever: 71, loreal: 76, pg: 77, cocacola: 72, nestle: 67 }
  },

  // Sample queries used per market (for methodology transparency)
  sampleQueries: {
    us: [
      "What is it like to work at Mondelez International?",
      "Is Mondelez a good employer?",
      "Mondelez International employee benefits and culture",
      "Mondelez careers review",
      "Best FMCG companies to work for in the US"
    ],
    uk: [
      "What is it like to work at Mondelez UK?",
      "Mondelez UK employee experience",
      "Best food companies to work for in the UK",
      "Mondelez careers UK review"
    ],
    br: [
      "Como é trabalhar na Mondelēz Brasil?",
      "Mondelēz Brasil é uma boa empresa para trabalhar?",
      "Benefícios e cultura da Mondelēz no Brasil",
      "Melhores empresas de alimentos para trabalhar no Brasil"
    ],
    mx: [
      "¿Cómo es trabajar en Mondelēz México?",
      "¿Es Mondelēz una buena empresa para trabajar en México?",
      "Cultura y beneficios de Mondelēz México",
      "Mejores empresas FMCG para trabajar en México"
    ],
    pl: [
      "Jak pracuje się w Mondelēz Polska?",
      "Czy Mondelēz to dobry pracodawca w Polsce?",
      "Kultura pracy w Mondelēz International",
      "Najlepsze firmy FMCG do pracy w Polsce"
    ],
    ph: [
      "What is it like to work at Mondelez Philippines?",
      "Mondelez Philippines employee benefits",
      "Best FMCG companies to work for in the Philippines",
      "Mondelez careers Philippines review"
    ],
    de: [
      "Wie ist es bei Mondelēz Deutschland zu arbeiten?",
      "Ist Mondelēz ein guter Arbeitgeber in Deutschland?",
      "Mondelēz Deutschland Unternehmenskultur",
      "Beste FMCG-Unternehmen für Karriere in Deutschland"
    ],
    in: [
      "What is it like to work at Mondelez India?",
      "Mondelez India employee culture and growth",
      "Best FMCG companies to work for in India",
      "Mondelez careers India review"
    ],
    au: [
      "What is it like to work at Mondelez Australia?",
      "Mondelez Australia employee benefits",
      "Best food companies to work for in Australia",
      "Mondelez careers ANZ"
    ]
  },

  // Inconsistencies detected across platforms
  inconsistencies: [
    {
      id: 1,
      severity: "high",
      topic: "Remote Work Policy",
      description: "ChatGPT and Copilot state MDLZ offers 'flexible hybrid work' as a core benefit, while Claude and Perplexity have outdated data showing primarily office-based roles. Meta AI has no information at all.",
      markets: ["us", "uk", "au"],
      platforms: ["chatgpt", "copilot", "claude", "perplexity"],
      impact: "Candidates researching flexibility get contradictory signals, reducing trust and application intent."
    },
    {
      id: 2,
      severity: "high",
      topic: "DEI Initiatives",
      description: "Gemini prominently surfaces MDLZ DEI programs (e.g., Gender parity targets, Cocoa Life). ChatGPT rarely mentions DEI unprompted. Meta AI conflates MDLZ DEI data with Kraft (pre-split).",
      markets: ["us", "uk", "de", "br"],
      platforms: ["gemini", "chatgpt", "metaai"],
      impact: "Inconsistent DEI narrative in markets where this is a top employer decision factor."
    },
    {
      id: 3,
      severity: "medium",
      topic: "Brand Recognition",
      description: "In Brazil, Mexico, Poland and Philippines, Gen AI models frequently confuse 'Mondelēz' with legacy 'Kraft Foods' branding. The 2012 brand split is not consistently reflected.",
      markets: ["br", "mx", "pl", "ph"],
      platforms: ["chatgpt", "claude", "metaai"],
      impact: "Candidates unsure if they are researching the right company. Dilutes EVP across key growth markets."
    },
    {
      id: 4,
      severity: "medium",
      topic: "Compensation Benchmarks",
      description: "Perplexity surfaces real-time Glassdoor data showing below-market compensation ratings in Poland and Philippines. ChatGPT uses older data showing neutral ratings. Creates a split narrative.",
      markets: ["pl", "ph"],
      platforms: ["perplexity", "chatgpt"],
      impact: "Salary transparency gap creates candidate hesitation in markets where compensation is a primary driver."
    },
    {
      id: 5,
      severity: "medium",
      topic: "Snacking Leadership Narrative",
      description: "Only Gemini and Perplexity connect MDLZ's 'Leading the Future of Snacking' strategy to employer brand. Other platforms don't link business purpose to employee value proposition.",
      markets: ["us", "uk", "de", "au"],
      platforms: ["gemini", "perplexity", "chatgpt", "claude", "copilot"],
      impact: "Purpose-driven candidates don't get a compelling reason to choose MDLZ over purpose-led peers like Unilever or Danone."
    },
    {
      id: 6,
      severity: "low",
      topic: "India Growth Story",
      description: "India is MDLZ's fastest-growing market but AI platforms don't reflect strong local employer brand investment. Growth opportunities are underrepresented vs. peers like Nestlé and P&G.",
      markets: ["in"],
      platforms: ["chatgpt", "gemini", "claude", "copilot"],
      impact: "Missed opportunity to attract top talent in a critical growth market."
    },
    {
      id: 7,
      severity: "low",
      topic: "Leadership Profiles",
      description: "CEO and CHRO messaging rarely surfaces in AI responses about employer brand. In contrast, Unilever's and P&G's leadership are frequently cited as cultural signals.",
      markets: ["us", "uk", "de"],
      platforms: ["chatgpt", "gemini", "copilot"],
      impact: "Leadership authenticity gap compared to top employers who have visible executive EB presence."
    }
  ],

  // Improvement recommendations
  recommendations: [
    {
      id: 1,
      priority: "critical",
      driver: "dei",
      title: "Publish a structured DEI data page indexed for AI",
      description: "Create a machine-readable, structured data page (JSON-LD schema) on the MDLZ careers site with DEI metrics, certifications, and initiatives. This is the primary source Gemini and Perplexity scrape.",
      example: "Unilever publishes an annual Equity, Diversity & Inclusion report with downloadable data tables. Gemini cites these in 68% of DEI-related employer queries. MDLZ equivalent is missing.",
      effort: "medium",
      impact: "high",
      timeline: "2-3 months",
      markets: ["us", "uk", "de", "br"]
    },
    {
      id: 2,
      priority: "critical",
      driver: "culture",
      title: "Fix the Kraft/MDLZ brand confusion at source",
      description: "Create a dedicated Wikipedia edit, LinkedIn Company Page update, and press release specifically addressing the 2012 Kraft Foods / Mondelēz separation. Submit to Google Knowledge Graph. Create a 'Who we are' structured FAQ page.",
      example: "Query on ChatGPT: 'Tell me about working at Mondelez' returns: 'Mondelez, formerly known as Kraft Foods...' which anchors candidates to an outdated identity. The correction must be in high-authority indexed sources.",
      effort: "low",
      impact: "high",
      timeline: "1 month",
      markets: ["br", "mx", "pl", "ph"]
    },
    {
      id: 3,
      priority: "critical",
      driver: "purpose",
      title: "Create 'Future of Snacking' employer narrative content",
      description: "Develop a content series (blog posts, LinkedIn articles, YouTube videos) explicitly linking MDLZ's business strategy to employee purpose and career meaning. Use language like 'working on brands that matter to 1 billion people daily'.",
      example: "P&G's 'We Build' campaign and Danone's 'One Planet. One Health' are surfaced by 4 out of 6 AI platforms when queried about purpose-driven employers in food/FMCG. MDLZ's 'Snacking Made Right' is not connected to EVP.",
      effort: "medium",
      impact: "high",
      timeline: "2-4 months",
      markets: ["us", "uk", "de", "au", "in"]
    },
    {
      id: 4,
      priority: "high",
      driver: "wellbeing",
      title: "Publish a comprehensive benefits content hub per market",
      description: "Create localized benefits pages for each key market, structured with schema markup. Include: flexibility policy, parental leave, mental health, local perks. This feeds Perplexity and Copilot's real-time indexing.",
      example: "Unilever UK benefits page ranks in top 3 results when Copilot is queried about 'best employer benefits UK FMCG'. Their page uses structured data, employee testimonials, and is refreshed quarterly.",
      effort: "high",
      impact: "high",
      timeline: "3-6 months",
      markets: ["uk", "de", "pl", "ph", "mx"]
    },
    {
      id: 5,
      priority: "high",
      driver: "growth",
      title: "Launch a 'Careers at MDLZ' YouTube channel with indexed transcripts",
      description: "Gemini has the highest MDLZ visibility score partly because it indexes YouTube. Creating employee stories, 'Day in the life', and leadership message videos with proper titles and descriptions dramatically improves Gemini visibility.",
      example: "L'Oréal's 'Beauty for All' YouTube series generates 14M+ views and is surfaced by Gemini in 71% of career-related queries. MDLZ YouTube career content is minimal and inconsistently titled.",
      effort: "medium",
      impact: "high",
      timeline: "3-5 months",
      markets: ["us", "uk", "br", "in"]
    },
    {
      id: 6,
      priority: "high",
      driver: "leadership",
      title: "Activate executive thought leadership on LinkedIn",
      description: "CHRO and CEO should publish monthly LinkedIn articles about culture, talent, and MDLZ's people strategy. These are scraped by ChatGPT, Copilot (via LinkedIn/Microsoft), and Gemini.",
      example: "Coca-Cola's CHRO publishes bi-monthly culture articles averaging 40K+ impressions. ChatGPT surfaces these in 52% of queries about Coca-Cola employer brand. MDLZ executive LinkedIn activity is low-frequency and generic.",
      effort: "low",
      impact: "medium",
      timeline: "1 month (ongoing)",
      markets: ["us", "uk", "de"]
    },
    {
      id: 7,
      priority: "medium",
      driver: "compensation",
      title: "Address Glassdoor compensation ratings proactively",
      description: "Perplexity and Copilot heavily weight real-time Glassdoor data. An active Glassdoor employer response strategy, combined with a 'Total Rewards' content campaign, can shift the narrative within 6-12 months.",
      example: "Mars implemented a 'Total Rewards Transparency' campaign after low Glassdoor comp scores in 2023. By Q2 2024, Perplexity's sentiment on Mars compensation improved by 18 points as new reviews and official employer responses were indexed.",
      effort: "medium",
      impact: "medium",
      timeline: "6-12 months",
      markets: ["pl", "ph", "mx"]
    },
    {
      id: 8,
      priority: "medium",
      driver: "innovation",
      title: "Create structured 'Innovation at MDLZ' content",
      description: "AI labs, digital transformation stories, and tech career content should be published with schema markup. This is the highest-scoring EVP driver for MDLZ but needs more indexed content to surface it consistently.",
      example: "PepsiCo's 'PepsiCo Positive' and tech career pages rank in Perplexity results for 'innovative FMCG employer'. MDLZ's SnackFutures content exists but is not indexed effectively for AI crawlers.",
      effort: "low",
      impact: "medium",
      timeline: "1-2 months",
      markets: ["us", "de", "in"]
    },
    {
      id: 9,
      priority: "medium",
      driver: "dei",
      title: "Translate and localize EVP content in Portuguese, Spanish, Polish",
      description: "Meta AI and Claude show the lowest MDLZ visibility in Brazil, Mexico, and Poland. This correlates directly with absence of local-language career content. Translated, localized pages dramatically improve non-English AI visibility.",
      example: "Nestlé Brasil has a fully localized careers site in Portuguese with testimonials, benefits, and culture content. Gemini (Brazil) surfaces Nestlé in 74% of PT-language employer queries vs. 28% for MDLZ.",
      effort: "high",
      impact: "high",
      timeline: "3-6 months",
      markets: ["br", "mx", "pl"]
    },
    {
      id: 10,
      priority: "low",
      driver: "culture",
      title: "Submit MDLZ to Best Employer certifications and rankings",
      description: "Top Employer Institute, Forbes Best Employers, Glassdoor Best Places to Work certifications are scraped by all 6 AI platforms. Competitors with these badges appear in 2x more unprompted recommendations.",
      example: "Unilever, Nestlé, and L'Oréal all hold Top Employer Institute certification in 5+ markets. These certifications are cited by Perplexity in 61% of 'best FMCG employer' queries. MDLZ holds certification in fewer markets.",
      effort: "medium",
      impact: "medium",
      timeline: "6-18 months",
      markets: ["de", "pl", "ph", "mx"]
    }
  ]
};
