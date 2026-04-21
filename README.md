# MDLZ Gen AI EVP Intelligence Dashboard

A comprehensive employer brand intelligence dashboard analysing **Mondelēz International's** visibility and sentiment across 6 Gen AI platforms, 9 markets, and 12 competitor brands — with a focus on EVP driver performance.

## 🚀 Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/mdlz-dashboard)

Or manually:
1. Fork this repository
2. Go to [Netlify](https://app.netlify.com/) → **New site from Git**
3. Connect your GitHub account and select this repo
4. Build settings: Leave blank (static site)
5. Click **Deploy site**

## 📊 What's Inside

### Coverage
- **6 Gen AI Platforms**: ChatGPT (GPT-4o), Gemini Advanced, Perplexity AI, Claude 3.7 Sonnet, Microsoft Copilot, Meta AI
- **9 Markets**: US 🇺🇸 | UK 🇬🇧 | Brazil 🇧🇷 | Mexico 🇲🇽 | Poland 🇵🇱 | Philippines 🇵🇭 | Germany 🇩🇪 | India 🇮🇳 | Australia 🇦🇺
- **13 Brands**: MDLZ + Unilever, Mars, Danone, PepsiCo, Hershey, L'Oréal, Nestlé, P&G, Coca-Cola, Reckitt, Colgate, Kraft Heinz

### Dashboard Sections
| Section | Description |
|---------|-------------|
| **Overview** | Global KPIs, platform scores, market heatmap |
| **Gen AI Platforms** | Per-platform analysis with data source mapping |
| **Markets** | Country deep-dive with local language queries |
| **Competitors** | Full benchmarking with gap analysis |
| **EVP Drivers** | 8-driver performance matrix |
| **Inconsistencies** | 7 data conflicts identified across platforms |
| **Recommendations** | 10 prioritised, actionable improvements |

### EVP Drivers Analysed
1. 🏛️ Culture & Values
2. 📈 Career Growth
3. 💰 Compensation & Benefits
4. 🚀 Innovation & Impact
5. 🌍 DEI & Inclusion
6. ❤️ Wellbeing & Flexibility
7. 🌱 Purpose & Sustainability
8. ⭐ Leadership & Management

## 🛠️ Tech Stack

- **Pure HTML/CSS/JS** — no build tools, no dependencies
- **Google Fonts** (Syne, DM Sans, DM Mono) loaded via CSS
- **Static site** — deploys in seconds on Netlify

## 📁 File Structure

```
mdlz-dashboard/
├── index.html              # Main entry point
├── netlify.toml            # Netlify deployment config
├── css/
│   └── style.css           # Design system + all styles
├── js/
│   └── dashboard.js        # All rendering and interactivity
└── data/
    └── research-data.js    # All research data and scores
```

## 🔄 Updating Data

All scores and research data are in `data/research-data.js`. To update:
1. Open the file
2. Edit scores in the relevant object (e.g., `mdlzByPlatform`, `mdlzByMarket`)
3. Commit and push — Netlify auto-deploys

## 📋 Methodology

**Visibility Score**: % of relevant EVP queries (48 per platform per market) where MDLZ appears unprompted in the Gen AI response.

**Sentiment Score**: Weighted analysis of tone in Gen AI responses mentioning MDLZ, scored 0–100 (100 = entirely positive).

**Consistency Score**: Cross-market agreement rate — how consistently the platform returns similar information across markets.

Queries run in **local language** for BR (Portuguese), MX (Spanish), PL (Polish), DE (German). English used for US, UK, PH, IN, AU.

---

*Dashboard created for internal HR/EB strategy use. Data represents simulated Gen AI query research — April 2026.*
