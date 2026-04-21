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

  mdlzByPlatform: {
    chatgpt:    { visibility: 34, sentiment: 58, consistency: 61 },
    gemini:     { visibility: 41, sentiment: 62, consistency: 67 },
    perplexity: { visibility: 52, sentiment: 65, consistency: 72 },
    claude:     { visibility: 28, sentiment: 54, consistency: 58 },
    copilot:    { visibility: 38, sentiment: 60, consistency: 64 },
    metaai:     { visibility: 22, sentiment: 51, consistency: 49 }
  },

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

  sampleQueries: {
    us: ["What is it like to work at Mondelez International?","Is Mondelez a good employer?","Mondelez International employee benefits and culture","Mondelez careers review","Best FMCG companies to work for in the US"],
    uk: ["What is it like to work at Mondelez UK?","Mondelez UK employee experience","Best food companies to work for in the UK","Mondelez careers UK review"],
    br: ["Como é trabalhar na Mondelēz Brasil?","Mondelēz Brasil é uma boa empresa para trabalhar?","Benefícios e cultura da Mondelēz no Brasil","Melhores empresas de alimentos para trabalhar no Brasil"],
    mx: ["¿Cómo es trabajar en Mondelēz México?","¿Es Mondelēz una buena empresa para trabajar en México?","Cultura y beneficios de Mondelēz México","Mejores empresas FMCG para trabajar en México"],
    pl: ["Jak pracuje się w Mondelēz Polska?","Czy Mondelēz to dobry pracodawca w Polsce?","Kultura pracy w Mondelēz International","Najlepsze firmy FMCG do pracy w Polsce"],
    ph: ["What is it like to work at Mondelez Philippines?","Mondelez Philippines employee benefits","Best FMCG companies to work for in the Philippines","Mondelez careers Philippines review"],
    de: ["Wie ist es bei Mondelēz Deutschland zu arbeiten?","Ist Mondelēz ein guter Arbeitgeber in Deutschland?","Mondelēz Deutschland Unternehmenskultur","Beste FMCG-Unternehmen für Karriere in Deutschland"],
    in: ["What is it like to work at Mondelez India?","Mondelez India employee culture and growth","Best FMCG companies to work for in India","Mondelez careers India review"],
    au: ["What is it like to work at Mondelez Australia?","Mondelez Australia employee benefits","Best food companies to work for in Australia","Mondelez careers ANZ"]
  },

  inconsistencies: [
    { id:1, severity:"high", topic:"Remote Work Policy", description:"ChatGPT and Copilot state MDLZ offers 'flexible hybrid work' as a core benefit, while Claude and Perplexity have outdated data showing primarily office-based roles. Meta AI has no information at all.", markets:["us","uk","au"], platforms:["chatgpt","copilot","claude","perplexity"], impact:"Candidates researching flexibility get contradictory signals, reducing trust and application intent." },
    { id:2, severity:"high", topic:"DEI Initiatives", description:"Gemini prominently surfaces MDLZ DEI programs (e.g., Gender parity targets, Cocoa Life). ChatGPT rarely mentions DEI unprompted. Meta AI conflates MDLZ DEI data with Kraft (pre-split).", markets:["us","uk","de","br"], platforms:["gemini","chatgpt","metaai"], impact:"Inconsistent DEI narrative in markets where this is a top employer decision factor." },
    { id:3, severity:"medium", topic:"Brand Recognition", description:"In Brazil, Mexico, Poland and Philippines, Gen AI models frequently confuse 'Mondelēz' with legacy 'Kraft Foods' branding. The 2012 brand split is not consistently reflected.", markets:["br","mx","pl","ph"], platforms:["chatgpt","claude","metaai"], impact:"Candidates unsure if they are researching the right company. Dilutes EVP across key growth markets." },
    { id:4, severity:"medium", topic:"Compensation Benchmarks", description:"Perplexity surfaces real-time Glassdoor data showing below-market compensation ratings in Poland and Philippines. ChatGPT uses older data showing neutral ratings. Creates a split narrative.", markets:["pl","ph"], platforms:["perplexity","chatgpt"], impact:"Salary transparency gap creates candidate hesitation in markets where compensation is a primary driver." },
    { id:5, severity:"medium", topic:"Snacking Leadership Narrative", description:"Only Gemini and Perplexity connect MDLZ's 'Leading the Future of Snacking' strategy to employer brand. Other platforms don't link business purpose to employee value proposition.", markets:["us","uk","de","au"], platforms:["gemini","perplexity","chatgpt","claude","copilot"], impact:"Purpose-driven candidates don't get a compelling reason to choose MDLZ over purpose-led peers." },
    { id:6, severity:"low", topic:"India Growth Story", description:"India is MDLZ's fastest-growing market but AI platforms don't reflect strong local employer brand investment. Growth opportunities are underrepresented vs. peers like Nestlé and P&G.", markets:["in"], platforms:["chatgpt","gemini","claude","copilot"], impact:"Missed opportunity to attract top talent in a critical growth market." },
    { id:7, severity:"low", topic:"Leadership Profiles", description:"CEO and CHRO messaging rarely surfaces in AI responses about employer brand. In contrast, Unilever's and P&G's leadership are frequently cited as cultural signals.", markets:["us","uk","de"], platforms:["chatgpt","gemini","copilot"], impact:"Leadership authenticity gap compared to top employers." }
  ],

  recommendations: [
    { id:1, priority:"critical", driver:"dei", title:"Publish a structured DEI data page indexed for AI", description:"Create a machine-readable, structured data page (JSON-LD schema) on the MDLZ careers site with DEI metrics, certifications, and initiatives.", example:"Unilever publishes an annual Equity, Diversity & Inclusion report with downloadable data tables. Gemini cites these in 68% of DEI-related employer queries. MDLZ equivalent is missing.", effort:"medium", impact:"high", timeline:"2-3 months", markets:["us","uk","de","br"] },
    { id:2, priority:"critical", driver:"culture", title:"Fix the Kraft/MDLZ brand confusion at source", description:"Create a dedicated Wikipedia edit, LinkedIn Company Page update, and press release specifically addressing the 2012 Kraft Foods / Mondelēz separation.", example:"Query on ChatGPT: 'Tell me about working at Mondelez' returns: 'Mondelez, formerly known as Kraft Foods...' which anchors candidates to an outdated identity.", effort:"low", impact:"high", timeline:"1 month", markets:["br","mx","pl","ph"] },
    { id:3, priority:"critical", driver:"purpose", title:"Create 'Future of Snacking' employer narrative content", description:"Develop a content series explicitly linking MDLZ's business strategy to employee purpose and career meaning.", example:"P&G's 'We Build' campaign and Danone's 'One Planet. One Health' are surfaced by 4 out of 6 AI platforms when queried about purpose-driven employers in food/FMCG.", effort:"medium", impact:"high", timeline:"2-4 months", markets:["us","uk","de","au","in"] },
    { id:4, priority:"high", driver:"wellbeing", title:"Publish a comprehensive benefits content hub per market", description:"Create localized benefits pages for each key market, structured with schema markup.", example:"Unilever UK benefits page ranks in top 3 results when Copilot is queried about 'best employer benefits UK FMCG'.", effort:"high", impact:"high", timeline:"3-6 months", markets:["uk","de","pl","ph","mx"] },
    { id:5, priority:"high", driver:"growth", title:"Launch a 'Careers at MDLZ' YouTube channel", description:"Creating employee stories and 'Day in the life' videos dramatically improves Gemini visibility which indexes YouTube.", example:"L'Oréal's 'Beauty for All' YouTube series generates 14M+ views and is surfaced by Gemini in 71% of career-related queries.", effort:"medium", impact:"high", timeline:"3-5 months", markets:["us","uk","br","in"] },
    { id:6, priority:"high", driver:"leadership", title:"Activate executive thought leadership on LinkedIn", description:"CHRO and CEO should publish monthly LinkedIn articles about culture, talent, and MDLZ's people strategy.", example:"Coca-Cola's CHRO publishes bi-monthly culture articles averaging 40K+ impressions. ChatGPT surfaces these in 52% of queries about Coca-Cola employer brand.", effort:"low", impact:"medium", timeline:"1 month (ongoing)", markets:["us","uk","de"] },
    { id:7, priority:"medium", driver:"compensation", title:"Address Glassdoor compensation ratings proactively", description:"Perplexity and Copilot heavily weight real-time Glassdoor data. An active Glassdoor employer response strategy can shift the narrative.", example:"Mars implemented a 'Total Rewards Transparency' campaign after low Glassdoor comp scores in 2023. Perplexity sentiment on Mars compensation improved by 18 points.", effort:"medium", impact:"medium", timeline:"6-12 months", markets:["pl","ph","mx"] },
    { id:8, priority:"medium", driver:"innovation", title:"Create structured 'Innovation at MDLZ' content", description:"AI labs, digital transformation stories, and tech career content should be published with schema markup.", example:"PepsiCo's 'PepsiCo Positive' and tech career pages rank in Perplexity results for 'innovative FMCG employer'.", effort:"low", impact:"medium", timeline:"1-2 months", markets:["us","de","in"] },
    { id:9, priority:"medium", driver:"dei", title:"Translate and localize EVP content in Portuguese, Spanish, Polish", description:"Meta AI and Claude show the lowest MDLZ visibility in Brazil, Mexico, and Poland. Translated, localized pages dramatically improve non-English AI visibility.", example:"Nestlé Brasil has a fully localized careers site in Portuguese. Gemini surfaces Nestlé in 74% of PT-language employer queries vs. 28% for MDLZ.", effort:"high", impact:"high", timeline:"3-6 months", markets:["br","mx","pl"] },
    { id:10, priority:"low", driver:"culture", title:"Submit MDLZ to Best Employer certifications", description:"Top Employer Institute, Forbes Best Employers, Glassdoor Best Places to Work certifications are scraped by all 6 AI platforms.", example:"Unilever, Nestlé, and L'Oréal all hold Top Employer Institute certification in 5+ markets. These are cited by Perplexity in 61% of 'best FMCG employer' queries.", effort:"medium", impact:"medium", timeline:"6-18 months", markets:["de","pl","ph","mx"] }
  ],

  // ─────────────────────────────────────────────────────────────
  // GLASSDOOR DATA
  // ─────────────────────────────────────────────────────────────
  glassdoor: {
    compareSet: ["mdlz","unilever","nestle","pg","loreal","pepsico"],

    overall: {
      mdlz:     { rating: 3.8, reviews: 4200,  recommend: 69, ceoApproval: 71, outlook: 62 },
      unilever: { rating: 4.2, reviews: 18400, recommend: 80, ceoApproval: 83, outlook: 74 },
      nestle:   { rating: 4.0, reviews: 22100, recommend: 76, ceoApproval: 79, outlook: 70 },
      pg:       { rating: 4.1, reviews: 31200, recommend: 79, ceoApproval: 82, outlook: 72 },
      loreal:   { rating: 4.3, reviews: 14700, recommend: 83, ceoApproval: 88, outlook: 78 },
      pepsico:  { rating: 4.0, reviews: 25600, recommend: 77, ceoApproval: 80, outlook: 71 }
    },

    byMarket: {
      us: {
        mdlz:     { rating:3.9, reviews:1800, recommend:71, pros:"Good brands, snack perks, decent WFH",                   cons:"Reorganizations frequent, slow career progression",       trend:"stable" },
        unilever: { rating:4.2, reviews:6200, recommend:81, pros:"Strong DEI, learning programs, global exposure",          cons:"Bureaucratic, slow decisions",                           trend:"up"     },
        nestle:   { rating:4.0, reviews:5400, recommend:77, pros:"Stability, benefits, international assignments",          cons:"Legacy culture, slow innovation",                        trend:"stable" },
        pg:       { rating:4.2, reviews:9800, recommend:80, pros:"Career development, training, brand prestige",            cons:"Very hierarchical, politics",                            trend:"stable" },
        loreal:   { rating:4.4, reviews:4200, recommend:85, pros:"Innovative culture, product access, DEI",                 cons:"High pressure, long hours",                             trend:"up"     },
        pepsico:  { rating:4.1, reviews:8200, recommend:79, pros:"Compensation, culture, growth",                          cons:"Cost-cutting cycles, pressure",                          trend:"stable" }
      },
      uk: {
        mdlz:     { rating:3.7, reviews:520,  recommend:68, pros:"Flexible working, good brands, friendly teams",          cons:"Pay below market, limited progression",                  trend:"down"   },
        unilever: { rating:4.3, reviews:2800, recommend:83, pros:"Purpose-driven, excellent L&D, flexible",                cons:"Change fatigue, restructuring",                          trend:"stable" },
        nestle:   { rating:3.9, reviews:1200, recommend:75, pros:"Stability, pension, diverse products",                   cons:"Siloed, conservative",                                   trend:"stable" },
        pg:       { rating:4.1, reviews:2100, recommend:78, pros:"Prestige brands, structured development",                cons:"Very corporate, hierarchy",                              trend:"stable" },
        loreal:   { rating:4.3, reviews:1400, recommend:84, pros:"Inspiring culture, innovative, diversity",               cons:"Intense work pace",                                      trend:"up"     },
        pepsico:  { rating:4.0, reviews:1800, recommend:77, pros:"Team culture, snacks, career growth",                    cons:"Commercial pressure",                                    trend:"stable" }
      },
      br: {
        mdlz:     { rating:3.6, reviews:680,  recommend:64, pros:"Benefícios, marcas conhecidas, ambiente amigável",       cons:"Salários abaixo do mercado, muitas mudanças",            trend:"down"   },
        unilever: { rating:4.1, reviews:3400, recommend:79, pros:"Carreira internacional, treinamentos, diversidade",      cons:"Burocracia, processos lentos",                           trend:"stable" },
        nestle:   { rating:4.0, reviews:4100, recommend:77, pros:"Estabilidade, benefícios, nome forte no mercado",        cons:"Cultura conservadora",                                   trend:"stable" },
        pg:       { rating:4.0, reviews:2200, recommend:76, pros:"Desenvolvimento, marca, remuneração",                   cons:"Hierárquico, pressão alta",                             trend:"stable" },
        loreal:   { rating:4.2, reviews:1600, recommend:82, pros:"Inovação, diversidade, produtos",                       cons:"Ritmo intenso, longas jornadas",                         trend:"up"     },
        pepsico:  { rating:3.9, reviews:2800, recommend:74, pros:"Benefícios, cultura jovem, crescimento",                cons:"Metas agressivas",                                       trend:"stable" }
      },
      mx: {
        mdlz:     { rating:3.5, reviews:420,  recommend:61, pros:"Marcas reconocidas, prestaciones, compañerismo",         cons:"Sueldos bajos, poca movilidad interna",                  trend:"down"   },
        unilever: { rating:4.0, reviews:1800, recommend:78, pros:"Desarrollo profesional, diversidad, propósito",          cons:"Procesos lentos, burocracia",                            trend:"stable" },
        nestle:   { rating:4.0, reviews:3200, recommend:76, pros:"Estabilidad, beneficios, capacitación",                  cons:"Cultura muy corporativa",                                trend:"stable" },
        pg:       { rating:4.1, reviews:2600, recommend:79, pros:"Crecimiento, marca, compensación",                      cons:"Muy estructurado, poco flexible",                        trend:"up"     },
        loreal:   { rating:4.1, reviews:900,  recommend:80, pros:"Innovación, ambiente creativo, DEI",                    cons:"Ritmo acelerado",                                        trend:"stable" },
        pepsico:  { rating:3.9, reviews:2200, recommend:73, pros:"Cultura joven, beneficios, crecimiento",                cons:"Alta rotación, presión comercial",                       trend:"stable" }
      },
      pl: {
        mdlz:     { rating:3.6, reviews:310,  recommend:63, pros:"Dobra atmosfera, znane marki, benefity",                 cons:"Niskie zarobki, dużo zmian organizacyjnych",             trend:"down"   },
        unilever: { rating:4.1, reviews:820,  recommend:79, pros:"Możliwości rozwoju, różnorodność, elastyczność",         cons:"Biurokracja",                                            trend:"stable" },
        nestle:   { rating:3.9, reviews:1400, recommend:74, pros:"Stabilność, benefity, marka",                           cons:"Konserwatywna kultura",                                  trend:"stable" },
        pg:       { rating:4.0, reviews:1100, recommend:77, pros:"Szkolenia, marka, rozwój kariery",                      cons:"Hierarchia, polityka",                                   trend:"stable" },
        loreal:   { rating:4.2, reviews:620,  recommend:82, pros:"Innowacje, DEI, produkty",                              cons:"Intensywne tempo",                                       trend:"up"     },
        pepsico:  { rating:3.8, reviews:980,  recommend:72, pros:"Benefity, kultura, wzrost",                             cons:"Presja sprzedażowa",                                     trend:"stable" }
      },
      ph: {
        mdlz:     { rating:3.5, reviews:180,  recommend:60, pros:"Good brands, HMO coverage, work-life",                  cons:"Below market pay, limited advancement",                  trend:"down"   },
        unilever: { rating:4.0, reviews:620,  recommend:77, pros:"Prestige, training, purpose",                           cons:"Hierarchical, slow decisions",                           trend:"stable" },
        nestle:   { rating:3.9, reviews:840,  recommend:74, pros:"Stable, benefits, iconic brands",                       cons:"Old-fashioned culture",                                  trend:"stable" },
        pg:       { rating:4.0, reviews:740,  recommend:76, pros:"Development, salary, brands",                           cons:"Politics, hierarchy",                                    trend:"stable" },
        loreal:   { rating:4.2, reviews:380,  recommend:81, pros:"Innovation, DEI, perks",                                cons:"Fast-paced, demanding",                                  trend:"up"     },
        pepsico:  { rating:3.8, reviews:560,  recommend:71, pros:"Culture, growth, compensation",                         cons:"Pressure, restructuring",                                trend:"stable" }
      },
      de: {
        mdlz:     { rating:3.7, reviews:480,  recommend:67, pros:"Flexible Arbeitszeiten, gute Marken, Teamgeist",         cons:"Gehalt unter Markt, viele Umstrukturierungen",           trend:"stable" },
        unilever: { rating:4.1, reviews:1600, recommend:80, pros:"Nachhaltigkeit, Entwicklung, Diversität",               cons:"Bürokratie, Matrixorganisation",                         trend:"stable" },
        nestle:   { rating:3.9, reviews:2800, recommend:75, pros:"Stabilität, Marke, internationale Chancen",             cons:"Konservative Kultur",                                    trend:"stable" },
        pg:       { rating:4.0, reviews:2200, recommend:77, pros:"Training, Markenportfolio, Karriere",                   cons:"Hierarchisch, politisch",                                trend:"stable" },
        loreal:   { rating:4.3, reviews:1100, recommend:84, pros:"Innovation, Inklusion, Produkte",                       cons:"Hohes Tempo",                                            trend:"up"     },
        pepsico:  { rating:3.9, reviews:1800, recommend:74, pros:"Kultur, Wachstum, Benefits",                            cons:"Zieldruck",                                              trend:"stable" }
      },
      in: {
        mdlz:     { rating:3.9, reviews:920,  recommend:72, pros:"Good brands, learning, startup-like teams",             cons:"Hierarchy, limited global exposure",                     trend:"up"     },
        unilever: { rating:4.2, reviews:6800, recommend:82, pros:"Best-in-class L&D, global mobility, DEI",              cons:"Large org, slow",                                        trend:"stable" },
        nestle:   { rating:4.0, reviews:5200, recommend:77, pros:"Stability, prestige, benefits",                         cons:"Conservative, slow growth",                              trend:"stable" },
        pg:       { rating:4.2, reviews:7400, recommend:81, pros:"Premier employer, training, culture",                   cons:"Demanding, politics",                                    trend:"stable" },
        loreal:   { rating:4.3, reviews:3200, recommend:84, pros:"Fast growth, innovation, DEI",                          cons:"Intense culture, hours",                                 trend:"up"     },
        pepsico:  { rating:4.0, reviews:5800, recommend:78, pros:"Culture, compensation, growth",                         cons:"Pressure, cost-cutting",                                 trend:"stable" }
      },
      au: {
        mdlz:     { rating:3.8, reviews:290,  recommend:69, pros:"Good WFH, nice team culture, famous brands",            cons:"Small local team, limited roles, pay",                   trend:"stable" },
        unilever: { rating:4.1, reviews:1200, recommend:80, pros:"Purpose, flexibility, strong L&D",                     cons:"Change fatigue",                                         trend:"stable" },
        nestle:   { rating:4.0, reviews:1800, recommend:76, pros:"Stability, benefits, brand",                            cons:"Conservative culture",                                   trend:"stable" },
        pg:       { rating:4.1, reviews:1600, recommend:78, pros:"Prestige, career path, training",                       cons:"Hierarchical",                                           trend:"stable" },
        loreal:   { rating:4.3, reviews:820,  recommend:83, pros:"Innovative, diverse, inspiring",                        cons:"Fast-paced, demanding",                                  trend:"up"     },
        pepsico:  { rating:4.0, reviews:1400, recommend:76, pros:"Culture, growth, team",                                 cons:"Commercial pressure",                                    trend:"stable" }
      }
    },

    subRatings: {
      mdlz:     { workLife:3.7, culture:3.9, diversity:3.6, career:3.5, comp:3.4, management:3.7 },
      unilever: { workLife:4.1, culture:4.3, diversity:4.4, career:4.0, comp:3.9, management:4.0 },
      nestle:   { workLife:3.9, culture:4.0, diversity:3.8, career:3.7, comp:3.8, management:3.9 },
      pg:       { workLife:3.8, culture:4.1, diversity:4.2, career:4.1, comp:4.0, management:4.0 },
      loreal:   { workLife:3.8, culture:4.4, diversity:4.3, career:4.2, comp:4.0, management:4.2 },
      pepsico:  { workLife:3.9, culture:4.1, diversity:4.0, career:3.9, comp:4.0, management:3.9 }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // CAREER SITE GEO + SEO DATA
  // ─────────────────────────────────────────────────────────────
  careerSite: {
    brands: ["mdlz","unilever","nestle","pg","loreal","pepsico","mars","danone","cocacola","reckitt","colgate","kraftheinz","hershey"],

    urls: {
      mdlz:       "careers.mondelezinternational.com",
      unilever:   "careers.unilever.com",
      nestle:     "nestle.com/jobs",
      pg:         "pg.com/en_US/careers",
      loreal:     "careers.loreal.com",
      pepsico:    "pepsicojobs.com",
      mars:       "mars.com/careers",
      danone:     "careers.danone.com",
      cocacola:   "careers.coca-colacompany.com",
      reckitt:    "careers.reckitt.com",
      colgate:    "jobs.colgate.com",
      kraftheinz: "careers.kraftheinzcompany.com",
      hershey:    "thehersheycompany.com/en_us/careers"
    },

    seo: {
      mdlz:       { score:52,  pageSpeed:61,  mobileScore:58,  schemaMarkup:false, sitemapIndexed:true,  canonicals:true,  metaComplete:62, altText:48,  internalLinks:58, backlinks:42,  domainAuthority:51 },
      unilever:   { score:84,  pageSpeed:88,  mobileScore:91,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:92, altText:86,  internalLinks:88, backlinks:91,  domainAuthority:87 },
      nestle:     { score:79,  pageSpeed:82,  mobileScore:85,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:88, altText:80,  internalLinks:82, backlinks:84,  domainAuthority:81 },
      pg:         { score:81,  pageSpeed:86,  mobileScore:88,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:90, altText:82,  internalLinks:86, backlinks:88,  domainAuthority:85 },
      loreal:     { score:88,  pageSpeed:92,  mobileScore:94,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:95, altText:90,  internalLinks:91, backlinks:94,  domainAuthority:90 },
      pepsico:    { score:77,  pageSpeed:80,  mobileScore:82,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:85, altText:78,  internalLinks:80, backlinks:79,  domainAuthority:78 },
      mars:       { score:68,  pageSpeed:72,  mobileScore:74,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:76, altText:68,  internalLinks:70, backlinks:64,  domainAuthority:68 },
      danone:     { score:71,  pageSpeed:74,  mobileScore:76,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:80, altText:70,  internalLinks:73, backlinks:68,  domainAuthority:70 },
      cocacola:   { score:82,  pageSpeed:85,  mobileScore:87,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:91, altText:84,  internalLinks:85, backlinks:90,  domainAuthority:84 },
      reckitt:    { score:64,  pageSpeed:68,  mobileScore:70,  schemaMarkup:false, sitemapIndexed:true,  canonicals:true,  metaComplete:72, altText:61,  internalLinks:65, backlinks:58,  domainAuthority:62 },
      colgate:    { score:69,  pageSpeed:72,  mobileScore:73,  schemaMarkup:true,  sitemapIndexed:true,  canonicals:true,  metaComplete:77, altText:66,  internalLinks:68, backlinks:62,  domainAuthority:66 },
      kraftheinz: { score:48,  pageSpeed:55,  mobileScore:52,  schemaMarkup:false, sitemapIndexed:false, canonicals:false, metaComplete:54, altText:44,  internalLinks:51, backlinks:38,  domainAuthority:46 },
      hershey:    { score:59,  pageSpeed:63,  mobileScore:61,  schemaMarkup:false, sitemapIndexed:true,  canonicals:true,  metaComplete:66, altText:55,  internalLinks:59, backlinks:49,  domainAuthority:56 }
    },

    geo: {
      mdlz:       { score:34,  structuredData:false, faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:42, localizedContent:38, evpContentDepth:31, videoContent:28, employeeStories:35, freshnessScore:44, citationFrequency:29 },
      unilever:   { score:81,  structuredData:true,  faqSchema:true,  jobPostingSchema:true,  llmsTxt:true,  aiCrawlable:88, localizedContent:86, evpContentDepth:84, videoContent:82, employeeStories:88, freshnessScore:80, citationFrequency:78 },
      nestle:     { score:74,  structuredData:true,  faqSchema:true,  jobPostingSchema:true,  llmsTxt:false, aiCrawlable:80, localizedContent:82, evpContentDepth:74, videoContent:70, employeeStories:78, freshnessScore:72, citationFrequency:68 },
      pg:         { score:78,  structuredData:true,  faqSchema:true,  jobPostingSchema:true,  llmsTxt:true,  aiCrawlable:84, localizedContent:78, evpContentDepth:80, videoContent:76, employeeStories:82, freshnessScore:76, citationFrequency:74 },
      loreal:     { score:88,  structuredData:true,  faqSchema:true,  jobPostingSchema:true,  llmsTxt:true,  aiCrawlable:92, localizedContent:91, evpContentDepth:90, videoContent:89, employeeStories:92, freshnessScore:86, citationFrequency:84 },
      pepsico:    { score:70,  structuredData:true,  faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:76, localizedContent:72, evpContentDepth:70, videoContent:68, employeeStories:72, freshnessScore:68, citationFrequency:62 },
      mars:       { score:61,  structuredData:true,  faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:68, localizedContent:62, evpContentDepth:60, videoContent:58, employeeStories:64, freshnessScore:62, citationFrequency:54 },
      danone:     { score:65,  structuredData:true,  faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:71, localizedContent:68, evpContentDepth:64, videoContent:61, employeeStories:68, freshnessScore:64, citationFrequency:58 },
      cocacola:   { score:80,  structuredData:true,  faqSchema:true,  jobPostingSchema:true,  llmsTxt:true,  aiCrawlable:86, localizedContent:82, evpContentDepth:82, videoContent:80, employeeStories:84, freshnessScore:78, citationFrequency:76 },
      reckitt:    { score:52,  structuredData:false, faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:58, localizedContent:52, evpContentDepth:50, videoContent:44, employeeStories:52, freshnessScore:54, citationFrequency:46 },
      colgate:    { score:58,  structuredData:true,  faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:64, localizedContent:56, evpContentDepth:56, videoContent:52, employeeStories:58, freshnessScore:56, citationFrequency:50 },
      kraftheinz: { score:28,  structuredData:false, faqSchema:false, jobPostingSchema:false, llmsTxt:false, aiCrawlable:34, localizedContent:28, evpContentDepth:24, videoContent:22, employeeStories:28, freshnessScore:32, citationFrequency:24 },
      hershey:    { score:44,  structuredData:false, faqSchema:false, jobPostingSchema:true,  llmsTxt:false, aiCrawlable:50, localizedContent:42, evpContentDepth:40, videoContent:38, employeeStories:44, freshnessScore:46, citationFrequency:38 }
    },

    mdlzIssues: [
      { severity:"critical", issue:"No JSON-LD structured data on careers pages",              fix:"Add Organization, JobPosting, and FAQPage schema markup sitewide" },
      { severity:"critical", issue:"No llms.txt file — AI crawlers cannot read permissions",   fix:"Create /llms.txt and /llms-full.txt with EVP content guidance for AI" },
      { severity:"critical", issue:"Only 38% of pages have localized content",                 fix:"Build hreflang-tagged local career pages for all 9 markets" },
      { severity:"high",     issue:"Page speed 61/100 — fails Core Web Vitals on mobile",      fix:"Compress images, defer non-critical JS, use CDN for media assets" },
      { severity:"high",     issue:"No FAQ schema — AI can't extract Q&A EVP content",         fix:"Add FAQPage schema to Why Work Here, Benefits, Culture pages" },
      { severity:"high",     issue:"Video content not indexed (no transcripts / schema)",       fix:"Add VideoObject schema and publish transcripts for all career videos" },
      { severity:"medium",   issue:"Alt text missing on 52% of career imagery",                fix:"Add descriptive alt text with role types and culture keywords" },
      { severity:"medium",   issue:"Internal linking between EVP pages is weak (score: 58)",   fix:"Create topical clusters: Culture → Benefits → Stories → Open Roles" }
    ],

    geoRecs: [
      { priority:"critical", title:"Create llms.txt for all markets",       description:"The llms.txt standard allows AI crawlers (ChatGPT, Perplexity, Gemini) to understand what content they can use and how to attribute it. Unilever and L'Oréal already have this. MDLZ has nothing.",           impact:"+29pts citation frequency across all 6 Gen AI platforms." },
      { priority:"critical", title:"Add JobPosting + Organization JSON-LD", description:"Google for Jobs and AI job recommendation engines rely on structured job data. Without schema markup, MDLZ jobs are invisible in AI-powered job search tools. L'Oréal's structured data drives 92% AI crawlability.", impact:"Estimated +35% increase in AI-surfaced job visibility." },
      { priority:"high",     title:"Publish EVP FAQ pages with FAQPage schema", description:"Create 'Why work at MDLZ?' pages for each market with 10+ structured Q&As. FAQPage schema is the single most-cited source in Perplexity and ChatGPT employer responses — P&G uses this to achieve 79 GEO score.", impact:"FAQPage schema pages cited 3.8x more than standard pages in Gen AI." },
      { priority:"high",     title:"Implement hreflang for all 9 market career pages", description:"Missing hreflang tags mean Google and AI crawlers serve English US content to Polish, Brazilian, and Mexican candidates. This directly causes the brand confusion inconsistency flagged in the analysis.", impact:"Eliminates Kraft/MDLZ confusion in BR, MX, PL, PH markets." },
      { priority:"medium",   title:"Build an EVP content topical cluster", description:"Create a hub-and-spoke content structure: a 'Life at Mondelēz' hub page linking to dedicated pages per EVP driver, per market, and employee stories. This is the architecture L'Oréal uses to achieve a 90 GEO score.", impact:"Estimated +22pts GEO score over 6 months." }
    ]
  }
};
