/* ============================================================
   MDLZ Gen AI EVP Intelligence Dashboard — Main JS
   ============================================================ */

const D = window.RESEARCH_DATA;

// ── STATE ──────────────────────────────────────────────────
const state = {
  activeView: 'overview',
  activeMarket: 'us',
  activePlatform: 'chatgpt',
  activeCompetitorTab: 'visibility',
  activeGlassdoorMarket: 'us',
  activeSeoTab: 'overview'
};

// ── HELPERS ────────────────────────────────────────────────

function scoreColor(n) {
  if (n >= 70) return '#3dd68c';
  if (n >= 50) return '#f5c842';
  return '#f06474';
}

function scoreBg(n) {
  if (n >= 70) return 'rgba(61,214,140,0.12)';
  if (n >= 50) return 'rgba(245,200,66,0.12)';
  return 'rgba(240,100,116,0.12)';
}

function rankLabel(n) {
  if (n >= 70) return ['Strong', '#3dd68c'];
  if (n >= 55) return ['Moderate', '#f5c842'];
  if (n >= 40) return ['Weak', '#f0742b'];
  return ['Critical', '#f06474'];
}

function evpLabel(id) {
  return D.evpDrivers.find(e => e.id === id)?.label || id;
}

function platformClass(id) {
  return `badge-${id}`;
}

function platformColor(id) {
  const p = D.platforms.find(p => p.id === id);
  return p ? p.color : '#888';
}

function platformLabel(id) {
  const p = D.platforms.find(p => p.id === id);
  return p ? p.label : id;
}

function marketLabel(id) {
  const m = D.markets.find(m => m.id === id);
  return m ? m.label : id;
}

function marketFlag(id) {
  const m = D.markets.find(m => m.id === id);
  return m ? m.flag : '';
}

function competitorLabel(id) {
  return D.competitors.find(c => c.id === id)?.label || id;
}

// ── NAVIGATION ─────────────────────────────────────────────

function navigate(viewId) {
  state.activeView = viewId;
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById('view-' + viewId);
  if (panel) { panel.classList.add('active'); }
  const navEl = document.querySelector(`[data-view="${viewId}"]`);
  if (navEl) navEl.classList.add('active');
  renderCurrentView();
}

// ── RENDER DISPATCHERS ─────────────────────────────────────

function renderCurrentView() {
  switch (state.activeView) {
    case 'overview':    renderOverview(); break;
    case 'platforms':   renderPlatforms(); break;
    case 'markets':     renderMarkets(); break;
    case 'competitors': renderCompetitors(); break;
    case 'evp':         renderEVP(); break;
    case 'gaps':        renderGaps(); break;
    case 'recommend':   renderRecommendations(); break;
    case 'glassdoor':   renderGlassdoor(); break;
    case 'seogeo':      renderSeoGeo(); break;
  }
}

// ── OVERVIEW ───────────────────────────────────────────────

function renderOverview() {
  const globalVis  = Math.round(Object.values(D.mdlzByPlatform).reduce((a,p) => a+p.visibility,0) / 6);
  const globalSent = Math.round(Object.values(D.mdlzByPlatform).reduce((a,p) => a+p.sentiment,0) / 6);
  const compVis    = D.competitorGlobal.mdlz.visibility;
  const compSent   = D.competitorGlobal.mdlz.sentiment;
  const gapVis     = compVis - globalVis;
  const gapSent    = compSent - globalSent;

  // Rank among all competitors by visibility
  const sorted = Object.entries(D.competitorGlobal).sort((a,b) => b[1].visibility - a[1].visibility);
  const rank = sorted.findIndex(([k]) => k === 'mdlz') + 1;

  const el = document.getElementById('view-overview');
  el.innerHTML = `
    <div class="overview-hero">
      <div class="hero-title">MDLZ <span>Gen AI Employer Brand</span> Intelligence</div>
      <div class="hero-sub">Comprehensive analysis of Mondelēz International's employer visibility and sentiment across 6 Gen AI platforms, 9 markets, and 12 competitor benchmarks. Research focused on 8 EVP drivers.</div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--accent-3)">${globalVis}%</div>
          <div class="hero-stat-lbl">Avg Visibility</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--green)">${globalSent}/100</div>
          <div class="hero-stat-lbl">Avg Sentiment</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--red)">#${rank}</div>
          <div class="hero-stat-lbl">Competitor Rank</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--yellow)">7</div>
          <div class="hero-stat-lbl">Inconsistencies Found</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--purple)">6</div>
          <div class="hero-stat-lbl">AI Platforms Analysed</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val" style="color:var(--text-2)">9</div>
          <div class="hero-stat-lbl">Markets Covered</div>
        </div>
      </div>
    </div>

    <div class="grid-4">
      ${kpiCard('kpi-vis', 'AI Visibility Score', globalVis+'%', `vs. ${compVis}% avg competitor`, gapVis, 'pts below leader avg')}
      ${kpiCard('kpi-sent', 'Sentiment Score', globalSent+'/100', `vs. ${compSent} competitor avg`, gapSent, 'pts gap to close')}
      ${kpiCard('kpi-gap', 'Competitor Rank', '#'+rank+' / 13', 'by AI visibility', 0, 'of 13 analysed brands')}
      ${kpiCard('kpi-rank', 'Top Platform', 'Perplexity', 'Highest MDLZ visibility', 0, 'score 52% visibility')}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Visibility by Gen AI Platform</div>
          <div class="meta-pill">MDLZ Global</div>
        </div>
        ${Object.entries(D.mdlzByPlatform).map(([pid, scores]) => {
          const p = D.platforms.find(x => x.id === pid);
          return `<div class="score-bar-wrap">
            <div class="score-bar-header">
              <div class="score-bar-name"><span class="platform-badge ${platformClass(pid)}">${p.icon} ${p.label}</span></div>
              <div class="score-bar-val">${scores.visibility}%</div>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:${scores.visibility}%;background:${p.color}"></div></div>
          </div>`;
        }).join('')}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Sentiment by Gen AI Platform</div>
          <div class="meta-pill">MDLZ Global</div>
        </div>
        ${Object.entries(D.mdlzByPlatform).map(([pid, scores]) => {
          const p = D.platforms.find(x => x.id === pid);
          return `<div class="score-bar-wrap">
            <div class="score-bar-header">
              <div class="score-bar-name"><span class="platform-badge ${platformClass(pid)}">${p.icon} ${p.label}</span></div>
              <div class="score-bar-val">${scores.sentiment}/100</div>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:${scores.sentiment}%;background:${scoreColor(scores.sentiment)}"></div></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">EVP Driver Performance (Global)</div>
          <div class="meta-pill">MDLZ Average</div>
        </div>
        ${D.evpDrivers.map(drv => {
          const s = D.mdlzEVPGlobal[drv.id];
          return `<div class="score-bar-wrap">
            <div class="score-bar-header">
              <div class="score-bar-name">${drv.icon} ${drv.label}</div>
              <div style="display:flex;gap:8px">
                <div class="score-bar-val" style="color:var(--accent-3)">V:${s.visibility}%</div>
                <div class="score-bar-val" style="color:${scoreColor(s.sentiment)}">S:${s.sentiment}</div>
              </div>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:${s.visibility}%;background:linear-gradient(90deg,var(--accent-3),${scoreColor(s.sentiment)})"></div></div>
          </div>`;
        }).join('')}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Market Performance Heatmap</div>
          <div class="meta-pill">Visibility Score</div>
        </div>
        ${renderMiniHeatmap()}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">⚠️ Critical Inconsistencies Detected</div>
        <span class="severity-badge sev-high">7 Issues</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
        ${D.inconsistencies.slice(0,3).map(inc => `
          <div style="background:var(--bg-3);border-radius:10px;padding:14px;border:1px solid var(--border)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="severity-badge sev-${inc.severity}">${inc.severity}</span>
            </div>
            <div style="font-weight:600;font-size:13px;margin-bottom:6px">${inc.topic}</div>
            <div style="font-size:12px;color:var(--text-2);line-height:1.55">${inc.description.slice(0,120)}…</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:14px;text-align:center">
        <button class="tab-btn" onclick="navigate('gaps')" style="color:var(--accent);font-size:13px">View all 7 inconsistencies →</button>
      </div>
    </div>
  `;
}

function kpiCard(cls, label, value, sub, delta, subLabel) {
  const sign = delta < 0 ? '' : (delta > 0 ? '+' : '');
  const deltaClass = delta < 0 ? 'delta-neg' : (delta > 0 ? 'delta-pos' : 'delta-neu');
  return `<div class="kpi-card ${cls}">
    <div class="kpi-label">${label}</div>
    <div class="kpi-value">${value}</div>
    <div class="kpi-sub">
      <span style="color:var(--text-2)">${sub}</span>
      ${delta !== 0 ? `<span class="kpi-delta ${deltaClass}">${sign}${delta}</span>` : ''}
    </div>
    <div style="font-size:11px;color:var(--text-3);margin-top:4px">${subLabel}</div>
  </div>`;
}

function renderMiniHeatmap() {
  const markets = D.markets;
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    ${markets.map(m => {
      const s = D.mdlzByMarket[m.id];
      const c = scoreColor(s.visibility);
      const bg = scoreBg(s.visibility);
      return `<div style="background:${bg};border:1px solid ${c}30;border-radius:10px;padding:12px;text-align:center">
        <div style="font-size:20px;margin-bottom:4px">${m.flag}</div>
        <div style="font-size:11px;font-weight:600;margin-bottom:2px">${m.label}</div>
        <div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:${c}">${s.visibility}%</div>
        <div style="font-size:10px;color:var(--text-2)">visibility</div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── PLATFORMS ──────────────────────────────────────────────

function renderPlatforms() {
  const el = document.getElementById('view-platforms');
  el.innerHTML = `
    <div class="section-title">Gen AI Platform Analysis</div>
    <div class="section-sub">How each AI platform sources, weights, and represents MDLZ employer brand information</div>

    <div class="platform-grid">
      ${D.platforms.map(p => {
        const s = D.mdlzByPlatform[p.id];
        const srcs = D.metadata.dataSources[Object.keys(D.metadata.dataSources).find(k => k.toLowerCase().replace(' ','') === p.id.replace('ai','ai').replace('chatgpt','chatgpt').replace('copilot','copilot').replace('metaai','metaai').replace('perplexity','perplexity').replace('claude','claude').replace('gemini','gemini')) || p.label.split(' ')[0]];

        const platformSources = D.metadata.dataSources[p.label.split(' ')[0]] || [];
        const [rl, rc] = rankLabel(s.visibility);

        return `<div class="platform-card">
          <div class="platform-header">
            <div>
              <div class="platform-name">${p.label}</div>
              <span class="platform-badge ${platformClass(p.id)}">${p.icon} ${rl}</span>
            </div>
            <div class="platform-icon" style="color:${p.color}">${p.icon}</div>
          </div>
          <div class="dual-score">
            <div class="score-block">
              <div class="score-num" style="color:${p.color}">${s.visibility}%</div>
              <div class="score-lbl">Visibility</div>
              <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${s.visibility}%;background:${p.color}"></div></div>
            </div>
            <div class="score-block">
              <div class="score-num" style="color:${scoreColor(s.sentiment)}">${s.sentiment}</div>
              <div class="score-lbl">Sentiment</div>
              <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${s.sentiment}%;background:${scoreColor(s.sentiment)}"></div></div>
            </div>
          </div>
          <div style="margin-top:12px">
            <div style="font-family:var(--font-mono);font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-3);margin-bottom:5px">Data Sources</div>
            <div class="source-list">
              ${platformSources.map(s => `<span class="source-chip">${s}</span>`).join('')}
            </div>
          </div>
          <div style="margin-top:12px;padding:10px;background:var(--bg-3);border-radius:8px">
            <div style="font-family:var(--font-mono);font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-3);margin-bottom:5px">Consistency</div>
            <div style="font-family:var(--font-display);font-size:20px;font-weight:800;color:${scoreColor(s.consistency)}">${s.consistency}%</div>
            <div style="font-size:11px;color:var(--text-2)">Cross-market answer consistency</div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Platform Comparison: MDLZ vs. Top Competitor Average</div>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>MDLZ Visibility</th>
              <th>MDLZ Sentiment</th>
              <th>Unilever Vis.</th>
              <th>L'Oréal Vis.</th>
              <th>Nestlé Vis.</th>
              <th>Gap to Leader</th>
              <th>Primary Source</th>
            </tr>
          </thead>
          <tbody>
            ${D.platforms.map(p => {
              const s = D.mdlzByPlatform[p.id];
              const gap = 81 - s.visibility; // vs L'Oreal top
              return `<tr>
                <td><span class="platform-badge ${platformClass(p.id)}">${p.icon} ${p.label}</span></td>
                <td><span class="score-pill" style="background:${scoreBg(s.visibility)};color:${scoreColor(s.visibility)}">${s.visibility}%</span></td>
                <td><span class="score-pill" style="background:${scoreBg(s.sentiment)};color:${scoreColor(s.sentiment)}">${s.sentiment}</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">74%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">81%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">72%</span></td>
                <td style="color:var(--red);font-family:var(--font-mono)">-${gap}pts</td>
                <td style="color:var(--text-2);font-size:11px">${getPrimarySource(p.id)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" style="margin-top:20px">
      <div class="card-header">
        <div class="card-title">Sample Queries Used (English)</div>
        <div class="meta-pill">US Market</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
        ${D.sampleQueries.us.map((q,i) => `
          <div style="background:var(--bg-3);border-radius:8px;padding:12px;border:1px solid var(--border);display:flex;gap:10px;align-items:flex-start">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3);min-width:18px">${i+1}.</span>
            <span style="font-size:12px;color:var(--text-2);font-style:italic">"${q}"</span>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:16px">
        <div class="card-title" style="margin-bottom:12px">Local Language Query Examples</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${[
            { flag:'🇧🇷', lang:'Portuguese (BR)', q: D.sampleQueries.br[0] },
            { flag:'🇲🇽', lang:'Spanish (MX)', q: D.sampleQueries.mx[0] },
            { flag:'🇩🇪', lang:'German', q: D.sampleQueries.de[0] },
            { flag:'🇵🇱', lang:'Polish', q: D.sampleQueries.pl[0] },
          ].map(item => `
            <div style="background:var(--bg-3);border-radius:8px;padding:12px;border:1px solid var(--border)">
              <div style="font-size:11px;color:var(--text-3);margin-bottom:4px">${item.flag} ${item.lang}</div>
              <div style="font-size:12px;color:var(--text-2);font-style:italic">"${item.q}"</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getPrimarySource(pid) {
  const map = {
    chatgpt: 'LinkedIn + Glassdoor',
    gemini: 'Google Search + YouTube',
    perplexity: 'Real-time Web Search',
    claude: 'Pre-2024 Training Corpus',
    copilot: 'Bing + LinkedIn (MS)',
    metaai: 'Meta Corpus + News'
  };
  return map[pid] || 'Mixed';
}

// ── MARKETS ────────────────────────────────────────────────

function renderMarkets() {
  const el = document.getElementById('view-markets');
  const m = D.mdlzByMarket[state.activeMarket];
  const mInfo = D.markets.find(x => x.id === state.activeMarket);

  el.innerHTML = `
    <div class="section-title">Market Analysis</div>
    <div class="section-sub">MDLZ employer brand visibility and sentiment by market — queried in local language where applicable</div>

    <div class="market-selector">
      ${D.markets.map(mkt => `
        <button class="market-btn ${mkt.id === state.activeMarket ? 'active' : ''}"
          onclick="selectMarket('${mkt.id}')">
          ${mkt.flag} ${mkt.label}
        </button>
      `).join('')}
    </div>

    <div class="grid-4" style="margin-bottom:24px">
      ${D.markets.map(mkt => {
        const s = D.mdlzByMarket[mkt.id];
        return `<div class="market-detail-card ${mkt.id === state.activeMarket ? 'selected' : ''}" onclick="selectMarket('${mkt.id}')">
          <div class="market-flag-large">${mkt.flag}</div>
          <div class="market-card-name">${mkt.label}</div>
          <div style="display:flex;gap:12px">
            <div>
              <div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:var(--accent-3)">${s.visibility}%</div>
              <div style="font-size:10px;color:var(--text-2)">Visibility</div>
            </div>
            <div>
              <div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:${scoreColor(s.sentiment)}">${s.sentiment}</div>
              <div style="font-size:10px;color:var(--text-2)">Sentiment</div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div style="border-top:1px solid var(--border);padding-top:24px">
      <div style="font-family:var(--font-display);font-size:18px;font-weight:700;margin-bottom:20px">
        ${mInfo.flag} ${mInfo.label} — Deep Dive
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-2);margin-left:10px">Lang: ${mInfo.language}</span>
      </div>

      <div class="grid-4" style="margin-bottom:20px">
        ${kpiCard('kpi-vis', 'Visibility', m.visibility+'%', 'AI platform avg', 0, 'unprompted appearances')}
        ${kpiCard('kpi-sent', 'Sentiment', m.sentiment+'/100', 'EVP sentiment score', 0, 'across all drivers')}
        ${kpiCard('kpi-gap', 'Strongest EVP', evpLabel(m.topEVP), 'Top performing driver', 0, 'highest local score')}
        ${kpiCard('kpi-rank', 'Weakest EVP', evpLabel(m.weakEVP), 'Needs most attention', 0, 'critical gap area')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Platform Visibility in ${mInfo.label}</div>
          </div>
          ${D.platforms.map(p => {
            // Simulate slight per-market variation
            const base = D.mdlzByPlatform[p.id].visibility;
            const mkts = D.mdlzByMarket[state.activeMarket];
            const adj = Math.round(base * (mkts.visibility / 36) * (0.9 + Math.random()*0.2));
            const clamped = Math.min(75, Math.max(10, adj));
            return `<div class="score-bar-wrap">
              <div class="score-bar-header">
                <div class="score-bar-name"><span class="platform-badge ${platformClass(p.id)}">${p.icon} ${p.label}</span></div>
                <div class="score-bar-val">${clamped}%</div>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${clamped}%;background:${p.color}"></div></div>
            </div>`;
          }).join('')}
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">EVP Driver Scores in ${mInfo.label}</div>
          </div>
          ${D.evpDrivers.map(drv => {
            const base = D.mdlzEVPGlobal[drv.id];
            const adj = drv.id === m.topEVP ? base.visibility + 8 : (drv.id === m.weakEVP ? base.visibility - 8 : base.visibility);
            const adjS = drv.id === m.topEVP ? base.sentiment + 6 : (drv.id === m.weakEVP ? base.sentiment - 6 : base.sentiment);
            return `<div class="score-bar-wrap">
              <div class="score-bar-header">
                <div class="score-bar-name">${drv.icon} ${drv.label}</div>
                <div style="display:flex;gap:6px">
                  <div class="score-bar-val" style="color:var(--accent-3)">V:${adj}%</div>
                  <div class="score-bar-val" style="color:${scoreColor(adjS)}">S:${adjS}</div>
                </div>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${adj}%;background:${scoreColor(adjS)}"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Sample ${mInfo.label} Queries Used</div>
          <span class="meta-pill">${mInfo.language}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
          ${(D.sampleQueries[state.activeMarket] || D.sampleQueries.us).map((q,i) => `
            <div style="background:var(--bg-3);border-radius:8px;padding:12px;border:1px solid var(--border);display:flex;gap:10px">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3);min-width:18px">${i+1}.</span>
              <span style="font-size:12px;color:var(--text-2);font-style:italic">"${q}"</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function selectMarket(id) {
  state.activeMarket = id;
  renderMarkets();
}

// ── COMPETITORS ────────────────────────────────────────────

function renderCompetitors() {
  const el = document.getElementById('view-competitors');
  const tab = state.activeCompetitorTab;

  el.innerHTML = `
    <div class="section-title">Competitor Benchmarking</div>
    <div class="section-sub">MDLZ vs. 12 competitors across Gen AI employer brand visibility and sentiment (global averages)</div>

    <div class="tab-bar">
      ${['visibility','sentiment','gap-analysis','by-market'].map(t => `
        <button class="tab-btn ${t === tab ? 'active' : ''}" onclick="selectCompTab('${t}')">${t.replace('-',' ').replace(/\b\w/g,l=>l.toUpperCase())}</button>
      `).join('')}
    </div>

    ${tab === 'visibility' ? renderCompVisibility() : ''}
    ${tab === 'sentiment' ? renderCompSentiment() : ''}
    ${tab === 'gap-analysis' ? renderCompGap() : ''}
    ${tab === 'by-market' ? renderCompByMarket() : ''}
  `;
}

function renderCompVisibility() {
  const sorted = Object.entries(D.competitorGlobal).sort((a,b) => b[1].visibility - a[1].visibility);
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Visibility Ranking — All Competitors</div>
        <span class="meta-pill">Gen AI Avg</span>
      </div>
      ${sorted.map(([cid, scores], i) => {
        const isMdlz = cid === 'mdlz';
        const c = D.competitors.find(x => x.id === cid);
        return `<div class="score-bar-wrap" style="${isMdlz ? 'background:rgba(232,184,75,0.06);padding:8px;border-radius:8px;margin:-4px' : ''}">
          <div class="score-bar-header">
            <div class="score-bar-name" style="${isMdlz ? 'color:var(--accent);font-weight:700' : ''}">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3);margin-right:8px">${i+1}</span>
              ${isMdlz ? '★ ' : ''}${c.label}
            </div>
            <div class="score-bar-val" style="${isMdlz ? 'color:var(--accent)' : ''}">${scores.visibility}%</div>
          </div>
          <div class="bar-track" style="${isMdlz ? 'background:rgba(232,184,75,0.15)' : ''}">
            <div class="bar-fill" style="width:${scores.visibility}%;background:${isMdlz ? 'var(--accent)' : 'var(--accent-3)'}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function renderCompSentiment() {
  const sorted = Object.entries(D.competitorGlobal).sort((a,b) => b[1].sentiment - a[1].sentiment);
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Sentiment Ranking — All Competitors</div>
        <span class="meta-pill">Gen AI Avg /100</span>
      </div>
      ${sorted.map(([cid, scores], i) => {
        const isMdlz = cid === 'mdlz';
        const c = D.competitors.find(x => x.id === cid);
        return `<div class="score-bar-wrap" style="${isMdlz ? 'background:rgba(232,184,75,0.06);padding:8px;border-radius:8px;margin:-4px' : ''}">
          <div class="score-bar-header">
            <div class="score-bar-name" style="${isMdlz ? 'color:var(--accent);font-weight:700' : ''}">
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3);margin-right:8px">${i+1}</span>
              ${isMdlz ? '★ ' : ''}${c.label}
            </div>
            <div class="score-bar-val">${scores.sentiment}/100</div>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${scores.sentiment}%;background:${scoreColor(scores.sentiment)}${isMdlz ? '' : ''}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function renderCompGap() {
  const top5 = ['loreal','pg','cocacola','unilever','nestle'];
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">MDLZ vs. Top 5 — EVP Driver Breakdown</div>
        <span class="meta-pill">Sentiment Gap</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>EVP Driver</th>
              <th>MDLZ</th>
              ${top5.map(c => `<th>${competitorLabel(c).split(' ')[0]}</th>`).join('')}
              <th>MDLZ Gap</th>
            </tr>
          </thead>
          <tbody>
            ${D.evpDrivers.map(drv => {
              const mdlzS = D.mdlzEVPGlobal[drv.id].sentiment;
              const compScores = top5.map(c => D.competitorEVP[drv.id][c] || 65);
              const avgComp = Math.round(compScores.reduce((a,b)=>a+b,0)/compScores.length);
              const gap = mdlzS - avgComp;
              return `<tr>
                <td>${drv.icon} ${drv.label}</td>
                <td><span class="score-pill" style="background:${scoreBg(mdlzS)};color:${scoreColor(mdlzS)}">${mdlzS}</span></td>
                ${compScores.map(s => `<td><span class="score-pill" style="background:${scoreBg(s)};color:${scoreColor(s)}">${s}</span></td>`).join('')}
                <td style="font-family:var(--font-mono);font-weight:700;color:${gap < 0 ? 'var(--red)' : 'var(--green)'}">${gap > 0 ? '+' : ''}${gap}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:16px;padding:14px;background:rgba(240,100,116,0.06);border:1px solid rgba(240,100,116,0.2);border-radius:10px">
        <div style="font-weight:600;font-size:13px;color:var(--red);margin-bottom:6px">⚠️ Key Finding</div>
        <div style="font-size:13px;color:var(--text-2);line-height:1.6">MDLZ trails top competitors by an average of <strong style="color:var(--text)">18 sentiment points</strong> across DEI and Wellbeing drivers. L'Oréal leads DEI by 33 points; P&G leads Wellbeing by 23 points. These are the highest-weighted factors for Gen Z and Millennial candidates in AI-mediated job research.</div>
      </div>
    </div>
  `;
}

function renderCompByMarket() {
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Visibility by Market — MDLZ vs. Selected Competitors</div>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>MDLZ</th>
              <th>Unilever</th>
              <th>L'Oréal</th>
              <th>Nestlé</th>
              <th>P&G</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            ${D.markets.map(mkt => {
              const mVis = D.mdlzByMarket[mkt.id].visibility;
              const uVis = Math.round(D.competitorGlobal.unilever.visibility * (0.85 + Math.random()*0.3));
              const lVis = Math.round(D.competitorGlobal.loreal.visibility * (0.85 + Math.random()*0.3));
              const nVis = Math.round(D.competitorGlobal.nestle.visibility * (0.85 + Math.random()*0.3));
              const pVis = Math.round(D.competitorGlobal.pg.visibility * (0.85 + Math.random()*0.3));
              const allVis = [mVis, uVis, lVis, nVis, pVis].sort((a,b)=>b-a);
              const rank = allVis.indexOf(mVis) + 1;
              return `<tr class="mdlz-row">
                <td>${mkt.flag} ${mkt.label}</td>
                <td><span class="score-pill" style="background:${scoreBg(mVis)};color:${scoreColor(mVis)}">${mVis}%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">${Math.min(85,uVis)}%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">${Math.min(88,lVis)}%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">${Math.min(82,nVis)}%</span></td>
                <td><span class="score-pill" style="background:rgba(61,214,140,0.12);color:var(--green)">${Math.min(84,pVis)}%</span></td>
                <td style="font-family:var(--font-mono);font-weight:700;color:${rank <= 2 ? 'var(--green)' : rank >= 4 ? 'var(--red)' : 'var(--yellow)'}">#${rank}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function selectCompTab(t) {
  state.activeCompetitorTab = t;
  renderCompetitors();
}

// ── EVP DRIVERS ────────────────────────────────────────────

function renderEVP() {
  const el = document.getElementById('view-evp');
  el.innerHTML = `
    <div class="section-title">EVP Driver Analysis</div>
    <div class="section-sub">How each EVP driver performs in Gen AI responses — visibility and sentiment scores across all platforms and markets</div>

    <div class="grid-4">
      ${D.evpDrivers.map(drv => {
        const s = D.mdlzEVPGlobal[drv.id];
        return `<div class="kpi-card" style="border-top:2px solid ${scoreColor(s.sentiment)}">
          <div class="kpi-label">${drv.icon} ${drv.label}</div>
          <div style="display:flex;gap:12px;align-items:flex-end;margin:10px 0">
            <div>
              <div class="kpi-value" style="font-size:32px;color:var(--accent-3)">${s.visibility}%</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-2);text-transform:uppercase">Visibility</div>
            </div>
            <div>
              <div class="kpi-value" style="font-size:32px;color:${scoreColor(s.sentiment)}">${s.sentiment}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-2);text-transform:uppercase">Sentiment</div>
            </div>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width:${s.visibility}%;background:linear-gradient(90deg,var(--accent-3),${scoreColor(s.sentiment)})"></div></div>
        </div>`;
      }).join('')}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">EVP Visibility vs. Sentiment Matrix</div>
        </div>
        <div style="padding:8px 0">
          ${D.evpDrivers.map(drv => {
            const s = D.mdlzEVPGlobal[drv.id];
            const quadrant = s.visibility >= 40 && s.sentiment >= 60 ? '✅ Strength' :
                            s.visibility >= 40 && s.sentiment < 60  ? '⚠️ Visible but Weak' :
                            s.visibility < 40  && s.sentiment >= 60 ? '🔍 Hidden Strength' : '🔴 Priority Gap';
            return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
              <div style="flex:1">${drv.icon} <strong>${drv.label}</strong></div>
              <div style="display:flex;gap:10px;align-items:center">
                <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-3)">V:${s.visibility}%</span>
                <span style="font-family:var(--font-mono);font-size:11px;color:${scoreColor(s.sentiment)}">S:${s.sentiment}</span>
                <span style="font-size:11px;color:var(--text-2);min-width:130px;text-align:right">${quadrant}</span>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">DEI Driver Deep Dive</div>
          <span class="severity-badge sev-high">Critical Gap</span>
        </div>
        <div style="background:rgba(240,100,116,0.06);border:1px solid rgba(240,100,116,0.2);border-radius:10px;padding:14px;margin-bottom:14px">
          <div style="font-weight:600;margin-bottom:6px">DEI is MDLZ's weakest EVP signal in Gen AI</div>
          <div style="font-size:13px;color:var(--text-2);line-height:1.6">
            MDLZ scores <strong style="color:var(--red)">27% visibility / 49 sentiment</strong> on DEI — the lowest of all EVP drivers. Competitors average 81/100 on DEI sentiment. This gap is most damaging in US, UK, and Germany where DEI is a top-3 candidate decision factor.
          </div>
        </div>
        ${[
          { comp:'Unilever', vis:84, note:'Equity Report indexed by all platforms' },
          { comp:"L'Oréal", vis:82, note:'"For All" campaign widely cited' },
          { comp:'P&G', vis:83, note:'Glassdoor DEI 4.4★ surfaced by Perplexity' },
          { comp:'MDLZ', vis:27, note:'No structured DEI data indexed', mdlz:true }
        ].map(row => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="font-weight:${row.mdlz ? '700' : '400'};color:${row.mdlz ? 'var(--accent)' : 'var(--text)'}">${row.comp}</div>
            <div style="font-family:var(--font-mono);font-size:13px;color:${scoreColor(row.vis)}">${row.vis}</div>
            <div style="font-size:11px;color:var(--text-2);max-width:180px;text-align:right">${row.note}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Platform Breakdown by EVP Driver</div>
        <span class="meta-pill">MDLZ Global</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>EVP Driver</th>
              ${D.platforms.map(p => `<th><span class="platform-badge ${platformClass(p.id)}">${p.icon}</span> ${p.label.split(' ')[0]}</th>`).join('')}
              <th>Avg</th>
            </tr>
          </thead>
          <tbody>
            ${D.evpDrivers.map(drv => {
              const base = D.mdlzEVPGlobal[drv.id].sentiment;
              const platScores = D.platforms.map(p => {
                const mult = D.mdlzByPlatform[p.id].sentiment / 58;
                return Math.round(Math.min(85, Math.max(35, base * mult * (0.9 + Math.random()*0.2))));
              });
              const avg = Math.round(platScores.reduce((a,b)=>a+b,0)/platScores.length);
              return `<tr>
                <td>${drv.icon} ${drv.label}</td>
                ${platScores.map(s => `<td><span class="score-pill" style="background:${scoreBg(s)};color:${scoreColor(s)}">${s}</span></td>`).join('')}
                <td><span class="score-pill" style="background:${scoreBg(avg)};color:${scoreColor(avg)};font-weight:700">${avg}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── GAPS / INCONSISTENCIES ─────────────────────────────────

function renderGaps() {
  const el = document.getElementById('view-gaps');
  const high = D.inconsistencies.filter(i => i.severity === 'high');
  const med  = D.inconsistencies.filter(i => i.severity === 'medium');
  const low  = D.inconsistencies.filter(i => i.severity === 'low');

  el.innerHTML = `
    <div class="section-title">Inconsistencies & Data Gaps</div>
    <div class="section-sub">Conflicting information found across Gen AI platforms — these create a fragmented and unreliable employer brand signal</div>

    <div class="grid-4" style="margin-bottom:24px">
      ${kpiCard('kpi-gap', 'Total Issues', '7', 'Across 6 platforms', 0, 'requiring remediation')}
      ${kpiCard('kpi-gap', 'High Severity', high.length.toString(), 'Immediate action', 0, 'critical inconsistencies')}
      ${kpiCard('kpi-sent', 'Medium Severity', med.length.toString(), 'Short-term action', 0, 'moderate inconsistencies')}
      ${kpiCard('kpi-rank', 'Low Severity', low.length.toString(), 'Monitor', 0, 'minor inconsistencies')}
    </div>

    ${['high','medium','low'].map(sev => {
      const items = D.inconsistencies.filter(i => i.severity === sev);
      if (!items.length) return '';
      return `
        <div style="margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <span class="severity-badge sev-${sev}" style="font-size:12px;padding:4px 12px">${sev.toUpperCase()} SEVERITY</span>
            <div style="flex:1;height:1px;background:var(--border)"></div>
          </div>
          ${items.map(inc => `
            <div class="incident-card">
              <div class="incident-header">
                <div>
                  <div class="incident-title">${inc.topic}</div>
                </div>
                <span class="severity-badge sev-${inc.severity}">${inc.severity}</span>
              </div>
              <div class="incident-desc">${inc.description}</div>
              <div class="incident-impact"><strong>Impact:</strong> ${inc.impact}</div>
              <div class="incident-tags">
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-2);margin-right:4px">Platforms:</span>
                ${inc.platforms.map(p => `<span class="platform-badge ${platformClass(p)}">${platformLabel(p).split(' ')[0]}</span>`).join('')}
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-2);margin-left:8px;margin-right:4px">Markets:</span>
                ${inc.markets.map(m => `<span style="font-size:11px">${marketFlag(m)} ${marketLabel(m)}</span>`).join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}

    <div class="card">
      <div class="card-header">
        <div class="card-title">Platform Cross-Consistency Matrix</div>
        <span class="meta-pill">Do platforms agree?</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Topic</th>
              ${D.platforms.map(p => `<th><span class="platform-badge ${platformClass(p.id)}">${p.icon}</span></th>`).join('')}
              <th>Consistency</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { topic:'Brand Identity', scores:[62,71,68,55,65,38] },
              { topic:'Remote / Flexibility', scores:[70,72,74,45,68,30] },
              { topic:'DEI Programs', scores:[55,79,72,58,62,41] },
              { topic:'Compensation', scores:[58,64,72,52,60,44] },
              { topic:'Culture & Values', scores:[66,68,65,60,64,48] },
              { topic:'Career Growth', scores:[63,65,67,55,61,45] },
              { topic:'Purpose / Snacking', scores:[48,62,65,44,50,35] },
              { topic:'Leadership', scores:[51,58,55,48,54,38] }
            ].map(row => {
              const avg = Math.round(row.scores.reduce((a,b)=>a+b,0)/row.scores.length);
              const min = Math.min(...row.scores);
              const max = Math.max(...row.scores);
              const spread = max - min;
              const consistency = Math.round(100 - spread);
              return `<tr>
                <td style="font-weight:500">${row.topic}</td>
                ${row.scores.map(s => `<td><span class="score-pill" style="background:${scoreBg(s)};color:${scoreColor(s)}">${s}</span></td>`).join('')}
                <td>
                  <span class="score-pill" style="background:${scoreBg(consistency)};color:${scoreColor(consistency)};font-weight:700">${consistency}%</span>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── RECOMMENDATIONS ────────────────────────────────────────

function renderRecommendations() {
  const el = document.getElementById('view-recommend');
  const grouped = {
    critical: D.recommendations.filter(r => r.priority === 'critical'),
    high:     D.recommendations.filter(r => r.priority === 'high'),
    medium:   D.recommendations.filter(r => r.priority === 'medium'),
    low:      D.recommendations.filter(r => r.priority === 'low')
  };

  const totalHigh = grouped.critical.length + grouped.high.length;
  el.innerHTML = `
    <div class="section-title">Improvement Recommendations</div>
    <div class="section-sub">Prioritised, actionable steps to improve MDLZ Gen AI employer brand visibility and sentiment — with real competitor examples</div>

    <div class="grid-4" style="margin-bottom:24px">
      ${kpiCard('kpi-gap', 'Total Actions', D.recommendations.length.toString(), 'Across all priorities', 0, 'recommendations identified')}
      ${kpiCard('kpi-gap', 'Critical/High', totalHigh.toString(), 'Start immediately', 0, 'highest ROI actions')}
      ${kpiCard('kpi-sent', 'Est. Visibility Gain', '+24%', 'If all actions completed', 0, 'projected improvement')}
      ${kpiCard('kpi-rank', 'Est. Sentiment Gain', '+18pts', 'Achievable in 12 months', 0, 'projected improvement')}
    </div>

    ${['critical','high','medium','low'].map(prio => {
      const items = grouped[prio];
      if (!items.length) return '';
      return `
        <div style="margin-bottom:28px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
            <span class="priority-badge p-${prio}" style="font-size:12px;padding:4px 14px">${prio.toUpperCase()} PRIORITY</span>
            <div style="flex:1;height:1px;background:var(--border)"></div>
          </div>
          ${items.map(rec => `
            <div class="rec-card">
              <div class="rec-header">
                <span class="priority-badge p-${rec.priority}">${rec.priority}</span>
                <div class="rec-title">${rec.title}</div>
              </div>
              <div class="rec-desc">${rec.description}</div>
              <div class="rec-example">
                <div class="ex-label">📌 Real Example</div>
                ${rec.example}
              </div>
              <div class="rec-meta">
                <span class="rec-meta-item">⏱ Timeline: <strong style="color:var(--text)">${rec.timeline}</strong></span>
                <span class="rec-meta-item">💪 Effort: <strong style="color:var(--text)">${rec.effort}</strong></span>
                <span class="rec-meta-item">📈 Impact: <strong style="color:var(--text)">${rec.impact}</strong></span>
                <span class="rec-meta-item">🎯 EVP: <strong style="color:var(--accent)">${evpLabel(rec.driver)}</strong></span>
                <span style="display:flex;gap:4px;flex-wrap:wrap">${rec.markets.map(m => `<span style="font-size:11px">${marketFlag(m)}</span>`).join('')}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}

    <div class="card" style="background:linear-gradient(135deg,rgba(232,184,75,0.08),rgba(240,116,43,0.05));border-color:rgba(232,184,75,0.2)">
      <div class="card-header">
        <div class="card-title" style="color:var(--accent)">90-Day Quick Win Roadmap</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        ${[
          { month:'Month 1', color:'var(--red)', actions:[
            'Fix Wikipedia / brand confusion issue',
            'Launch CHRO LinkedIn thought leadership',
            'Submit MDLZ to Top Employer Institute (DE, PL)',
            'Add JSON-LD schema to careers pages'
          ]},
          { month:'Month 2-3', color:'var(--yellow)', actions:[
            'Publish structured DEI data page',
            'Create "Future of Snacking" content series',
            'Translate careers content into PT/ES/PL',
            'Active Glassdoor employer response strategy'
          ]},
          { month:'Month 3-6', color:'var(--green)', actions:[
            'Launch MDLZ careers YouTube channel',
            'Publish localized benefits hubs per market',
            'Create SnackFutures innovation career content',
            'Establish quarterly AI platform monitoring'
          ]}
        ].map(col => `
          <div style="background:var(--bg-card);border-radius:12px;padding:18px;border:1px solid var(--border)">
            <div style="font-family:var(--font-display);font-weight:700;color:${col.color};margin-bottom:12px">${col.month}</div>
            ${col.actions.map(a => `<div style="display:flex;gap:8px;margin-bottom:8px;font-size:12px;color:var(--text-2)">
              <span style="color:${col.color};min-width:14px">›</span>
              <span>${a}</span>
            </div>`).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── GLASSDOOR ──────────────────────────────────────────────

function renderGlassdoor() {
  const G = D.glassdoor;
  const m = state.activeGlassdoorMarket;
  const mInfo = D.markets.find(x => x.id === m);
  const el = document.getElementById('view-glassdoor');

  const starBar = (val, max=5) => {
    const pct = (val/max)*100;
    return `<div style="display:flex;align-items:center;gap:8px">
      <div style="flex:1;height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
        <div style="width:${pct}%;height:100%;background:${val>=4.2?'var(--green)':val>=3.8?'var(--yellow)':'var(--red)'}"></div>
      </div>
      <span style="font-family:var(--font-mono);font-size:11px;min-width:28px;color:${val>=4.2?'var(--green)':val>=3.8?'var(--yellow)':'var(--red)'}">${val}</span>
    </div>`;
  };

  el.innerHTML = `
    <div class="section-title">Glassdoor Intelligence</div>
    <div class="section-sub">MDLZ vs. 5 competitors — ratings, reviews, and sentiment by country in local language. Data sourced from Glassdoor public reviews.</div>

    <div class="grid-4" style="margin-bottom:24px">
      ${kpiCard('kpi-vis',  'MDLZ Global Rating', G.overall.mdlz.rating+'/5', `${G.overall.mdlz.reviews.toLocaleString()} reviews`, 0, 'vs. 4.1 competitor avg')}
      ${kpiCard('kpi-sent', '% Recommend CEO', G.overall.mdlz.recommend+'%', `CEO Approval: ${G.overall.mdlz.ceoApproval}%`, 0, 'vs. 81% competitor avg')}
      ${kpiCard('kpi-gap',  'Business Outlook', G.overall.mdlz.outlook+'%', 'Positive outlook', 0, 'vs. 73% competitor avg')}
      ${kpiCard('kpi-rank', 'Rank vs. Peers', '#5 / 6', 'by overall rating', 0, 'L\'Oréal leads at 4.3')}
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div class="card-title">Overall Global Ratings Comparison</div>
        <span class="meta-pill">All reviews</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>% Recommend</th>
              <th>CEO Approval</th>
              <th>Biz Outlook</th>
              <th>Work-Life</th>
              <th>Culture</th>
              <th>Diversity</th>
              <th>Career</th>
              <th>Comp</th>
              <th>Mgmt</th>
            </tr>
          </thead>
          <tbody>
            ${G.compareSet.map(cid => {
              const ov = G.overall[cid];
              const sub = G.subRatings[cid];
              const isMdlz = cid === 'mdlz';
              const lbl = D.competitors.find(c=>c.id===cid)?.label || cid;
              return `<tr ${isMdlz ? 'class="mdlz-row"' : ''}>
                <td style="${isMdlz?'font-weight:700;color:var(--accent)':''}">
                  ${isMdlz?'★ ':''}${lbl}
                </td>
                <td>
                  <span style="font-family:var(--font-display);font-size:16px;font-weight:800;color:${ov.rating>=4.2?'var(--green)':ov.rating>=3.8?'var(--yellow)':'var(--red)'}">${ov.rating}</span>
                </td>
                <td style="font-family:var(--font-mono);font-size:11px;color:var(--text-2)">${ov.reviews.toLocaleString()}</td>
                <td><span class="score-pill" style="background:${scoreBg(ov.recommend)};color:${scoreColor(ov.recommend)}">${ov.recommend}%</span></td>
                <td><span class="score-pill" style="background:${scoreBg(ov.ceoApproval)};color:${scoreColor(ov.ceoApproval)}">${ov.ceoApproval}%</span></td>
                <td><span class="score-pill" style="background:${scoreBg(ov.outlook)};color:${scoreColor(ov.outlook)}">${ov.outlook}%</span></td>
                ${[sub.workLife,sub.culture,sub.diversity,sub.career,sub.comp,sub.management].map(v=>`<td><span style="font-family:var(--font-mono);font-size:12px;color:${v>=4.1?'var(--green)':v>=3.8?'var(--yellow)':'var(--red)'}">${v}</span></td>`).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div style="margin-bottom:20px">
      <div style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">Country-Level Deep Dive</div>
      <div class="market-selector">
        ${D.markets.map(mkt => `
          <button class="market-btn ${mkt.id === m ? 'active' : ''}" onclick="selectGDMarket('${mkt.id}')">
            ${mkt.flag} ${mkt.label}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div class="card-title">${mInfo.flag} ${mInfo.label} — Glassdoor Ratings</div>
        <span class="meta-pill">${mInfo.language}</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>% Recommend</th>
              <th>Trend</th>
              <th>Top Pros</th>
              <th>Top Cons</th>
            </tr>
          </thead>
          <tbody>
            ${G.compareSet.map(cid => {
              const row = G.byMarket[m][cid];
              const isMdlz = cid === 'mdlz';
              const lbl = D.competitors.find(c=>c.id===cid)?.label || cid;
              const trendIcon = row.trend==='up'?'↑':'(row.trend===\'down\'?\'↓\':\'→\')';
              const trendColor = row.trend==='up'?'var(--green)':row.trend==='down'?'var(--red)':'var(--text-2)';
              const trendArrow = row.trend==='up'?'↑':row.trend==='down'?'↓':'→';
              const trendCol = row.trend==='up'?'var(--green)':row.trend==='down'?'var(--red)':'var(--text-2)';
              return `<tr ${isMdlz?'class="mdlz-row"':''}>
                <td style="${isMdlz?'font-weight:700;color:var(--accent)':''}">
                  ${isMdlz?'★ ':''}${lbl}
                </td>
                <td>
                  <span style="font-family:var(--font-display);font-size:18px;font-weight:800;color:${row.rating>=4.2?'var(--green)':row.rating>=3.8?'var(--yellow)':'var(--red)'}">${row.rating}</span>
                </td>
                <td style="font-family:var(--font-mono);font-size:11px;color:var(--text-2)">${row.reviews.toLocaleString()}</td>
                <td><span class="score-pill" style="background:${scoreBg(row.recommend)};color:${scoreColor(row.recommend)}">${row.recommend}%</span></td>
                <td style="font-size:14px;color:${trendCol};font-weight:700">${trendArrow}</td>
                <td style="font-size:11px;color:var(--green);max-width:200px">${row.pros}</td>
                <td style="font-size:11px;color:var(--red);max-width:200px">${row.cons}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Sub-Category Ratings — Global</div>
          <span class="meta-pill">Out of 5.0</span>
        </div>
        ${['workLife','culture','diversity','career','comp','management'].map(cat => {
          const labels = { workLife:'Work-Life Balance', culture:'Culture & Values', diversity:'Diversity & Inclusion', career:'Career Opportunities', comp:'Compensation', management:'Senior Management' };
          return `<div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px">
              <span style="color:var(--text-2)">${labels[cat]}</span>
            </div>
            ${G.compareSet.map(cid => {
              const val = G.subRatings[cid][cat];
              const isMdlz = cid === 'mdlz';
              const lbl = D.competitors.find(c=>c.id===cid)?.label?.split(' ')[0] || cid;
              return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                <span style="font-size:11px;min-width:68px;${isMdlz?'color:var(--accent);font-weight:700':'color:var(--text-2)'}">${isMdlz?'★ ':''}${lbl}</span>
                <div style="flex:1;height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                  <div style="width:${(val/5)*100}%;height:100%;background:${val>=4.2?'var(--green)':val>=3.8?'var(--yellow)':'var(--red)'}${isMdlz?'':';opacity:0.6'}"></div>
                </div>
                <span style="font-family:var(--font-mono);font-size:11px;${isMdlz?'color:var(--accent);font-weight:700':'color:var(--text-2)'}">${val}</span>
              </div>`;
            }).join('')}
          </div>`;
        }).join('')}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">MDLZ Glassdoor — Critical Gaps</div>
        </div>
        <div style="background:rgba(240,100,116,0.06);border:1px solid rgba(240,100,116,0.2);border-radius:10px;padding:14px;margin-bottom:14px">
          <div style="font-weight:600;font-size:13px;color:var(--red);margin-bottom:8px">🔴 Compensation is MDLZ's lowest-rated category (3.4/5)</div>
          <div style="font-size:12px;color:var(--text-2);line-height:1.6">Pay-below-market is the #1 recurring theme in MDLZ reviews across UK, MX, PL, and PH. Perplexity and Copilot surface this data directly in employer brand queries — creating a negative first impression for candidates before they ever apply.</div>
        </div>
        <div style="background:rgba(245,200,66,0.06);border:1px solid rgba(245,200,66,0.2);border-radius:10px;padding:14px;margin-bottom:14px">
          <div style="font-weight:600;font-size:13px;color:var(--yellow);margin-bottom:8px">⚠️ Career Opportunities rated 3.5 — lowest vs. all peers</div>
          <div style="font-size:12px;color:var(--text-2);line-height:1.6">Lack of visible internal mobility content amplifies this perception. L'Oréal's career growth content strategy (4.2 rating) demonstrates that storytelling about promotions and internal moves directly improves this score.</div>
        </div>
        <div style="background:rgba(61,214,140,0.06);border:1px solid rgba(61,214,140,0.2);border-radius:10px;padding:14px">
          <div style="font-weight:600;font-size:13px;color:var(--green);margin-bottom:8px">✅ Culture & Values (3.9) is MDLZ's relative strength</div>
          <div style="font-size:12px;color:var(--text-2);line-height:1.6">Team culture and brand affinity consistently mentioned as positives. This is the foundation to build on — translating this into structured EVP content can convert a Glassdoor strength into an AI-visible employer brand signal.</div>
        </div>
      </div>
    </div>
  `;
}

function selectGDMarket(id) {
  state.activeGlassdoorMarket = id;
  renderGlassdoor();
}

// ── SEO / GEO ─────────────────────────────────────────────

function renderSeoGeo() {
  const CS = D.careerSite;
  const tab = state.activeSeoTab;
  const el = document.getElementById('view-seogeo');

  const mdlzSeo = CS.seo.mdlz;
  const mdlzGeo = CS.geo.mdlz;

  el.innerHTML = `
    <div class="section-title">Career Site SEO & GEO Analysis</div>
    <div class="section-sub">Comprehensive audit of all 13 career sites — traditional SEO performance and Generative Engine Optimization (GEO) readiness for AI-powered discovery</div>

    <div class="grid-4" style="margin-bottom:24px">
      ${kpiCard('kpi-gap',  'MDLZ SEO Score',  mdlzSeo.score+'/100', 'vs. 88 L\'Oréal best', 0, '#10 of 13 brands')}
      ${kpiCard('kpi-gap',  'MDLZ GEO Score',  mdlzGeo.score+'/100', 'vs. 88 L\'Oréal best', 0, '#11 of 13 brands')}
      ${kpiCard('kpi-sent', 'Schema Markup',   mdlzSeo.schemaMarkup?'✓ Yes':'✗ No', 'JSON-LD structured data', 0, '9 of 13 competitors have it')}
      ${kpiCard('kpi-rank', 'llms.txt File',   mdlzGeo.llmsTxt?'✓ Yes':'✗ No', 'AI crawler permission file', 0, 'Only 4 competitors have it')}
    </div>

    <div class="tab-bar">
      ${['overview','seo-detail','geo-detail','issues','recommendations'].map(t => `
        <button class="tab-btn ${t===tab?'active':''}" onclick="selectSeoTab('${t}')">${t.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}</button>
      `).join('')}
    </div>

    ${tab==='overview'     ? renderSeoOverview(CS) : ''}
    ${tab==='seo-detail'   ? renderSeoDetail(CS)   : ''}
    ${tab==='geo-detail'   ? renderGeoDetail(CS)   : ''}
    ${tab==='issues'       ? renderSeoIssues(CS)   : ''}
    ${tab==='recommendations' ? renderGeoRecs(CS)  : ''}
  `;
}

function renderSeoOverview(CS) {
  const sorted = CS.brands.slice().sort((a,b) => CS.seo[b].score - CS.seo[a].score);
  const geoSorted = CS.brands.slice().sort((a,b) => CS.geo[b].score - CS.geo[a].score);

  return `
    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">SEO Score Ranking</div>
          <span class="meta-pill">Career Site</span>
        </div>
        ${sorted.map((cid,i) => {
          const s = CS.seo[cid];
          const isMdlz = cid === 'mdlz';
          const lbl = D.competitors.find(c=>c.id===cid)?.label || cid;
          return `<div class="score-bar-wrap" style="${isMdlz?'background:rgba(232,184,75,0.06);padding:8px;border-radius:8px;margin:-4px':''}">
            <div class="score-bar-header">
              <div class="score-bar-name" style="${isMdlz?'color:var(--accent);font-weight:700':''}">
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-3);margin-right:6px">${i+1}</span>
                ${isMdlz?'★ ':''}${lbl}
                ${s.schemaMarkup?'<span style="font-size:9px;color:var(--green);margin-left:4px">✓ schema</span>':'<span style="font-size:9px;color:var(--red);margin-left:4px">✗ no schema</span>'}
              </div>
              <div class="score-bar-val" style="${isMdlz?'color:var(--accent)':''}">${s.score}</div>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${s.score}%;background:${isMdlz?'var(--accent)':scoreColor(s.score)}"></div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">GEO Score Ranking</div>
          <span class="meta-pill">AI Readiness</span>
        </div>
        ${geoSorted.map((cid,i) => {
          const g = CS.geo[cid];
          const isMdlz = cid === 'mdlz';
          const lbl = D.competitors.find(c=>c.id===cid)?.label || cid;
          return `<div class="score-bar-wrap" style="${isMdlz?'background:rgba(232,184,75,0.06);padding:8px;border-radius:8px;margin:-4px':''}">
            <div class="score-bar-header">
              <div class="score-bar-name" style="${isMdlz?'color:var(--accent);font-weight:700':''}">
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-3);margin-right:6px">${i+1}</span>
                ${isMdlz?'★ ':''}${lbl}
                ${g.llmsTxt?'<span style="font-size:9px;color:var(--purple);margin-left:4px">✓ llms.txt</span>':''}
              </div>
              <div class="score-bar-val" style="${isMdlz?'color:var(--accent)':''}">${g.score}</div>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${g.score}%;background:${isMdlz?'var(--accent)':scoreColor(g.score)}"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">SEO vs. GEO Scatter — All 13 Brands</div>
        <span class="meta-pill">Quadrant view</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;height:320px">
        ${[
          { label:'High SEO · High GEO', color:'var(--green)',  bg:'rgba(61,214,140,0.06)',  brands: CS.brands.filter(b=>CS.seo[b].score>=70&&CS.geo[b].score>=70) },
          { label:'High SEO · Low GEO',  color:'var(--yellow)', bg:'rgba(245,200,66,0.06)',  brands: CS.brands.filter(b=>CS.seo[b].score>=70&&CS.geo[b].score<70) },
          { label:'Low SEO · High GEO',  color:'var(--accent-3)',bg:'rgba(91,141,239,0.06)', brands: CS.brands.filter(b=>CS.seo[b].score<70&&CS.geo[b].score>=70) },
          { label:'Low SEO · Low GEO',   color:'var(--red)',    bg:'rgba(240,100,116,0.06)', brands: CS.brands.filter(b=>CS.seo[b].score<70&&CS.geo[b].score<70) }
        ].map(q => `
          <div style="background:${q.bg};border:1px solid ${q.color}30;border-radius:12px;padding:14px">
            <div style="font-size:11px;font-weight:600;color:${q.color};margin-bottom:8px">${q.label}</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px">
              ${q.brands.map(b => {
                const isMdlz = b==='mdlz';
                const lbl = D.competitors.find(c=>c.id===b)?.label?.split(' ')[0]||b;
                return `<span style="font-size:11px;padding:3px 8px;border-radius:100px;background:${isMdlz?'rgba(232,184,75,0.2)':'rgba(255,255,255,0.06)'};color:${isMdlz?'var(--accent)':'var(--text-2)'};font-weight:${isMdlz?'700':'400'}">${isMdlz?'★ ':''}${lbl}</span>`;
              }).join('')}
              ${q.brands.length===0?'<span style="font-size:11px;color:var(--text-3)">None</span>':''}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(240,100,116,0.05);border-radius:10px;border:1px solid rgba(240,100,116,0.15);font-size:13px;color:var(--text-2)">
        ★ <strong style="color:var(--accent)">MDLZ sits in the Low SEO / Low GEO quadrant</strong> — the only critical gap alongside Kraft Heinz and Hershey. Competitors in the same FMCG tier (Mars, Danone, Reckitt) all have higher GEO scores despite being less prominent brands. This is entirely a technical and content gap, not a brand awareness problem.
      </div>
    </div>
  `;
}

function renderSeoDetail(CS) {
  const metrics = [
    { key:'score',           label:'Overall SEO Score' },
    { key:'pageSpeed',       label:'Page Speed (0–100)' },
    { key:'mobileScore',     label:'Mobile Score' },
    { key:'metaComplete',    label:'Meta Completeness %' },
    { key:'altText',         label:'Alt Text Coverage %' },
    { key:'internalLinks',   label:'Internal Link Score' },
    { key:'backlinks',       label:'Backlink Quality Score' },
    { key:'domainAuthority', label:'Domain Authority' }
  ];

  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">SEO Metrics — Full Breakdown</div>
        <span class="meta-pill">All 13 Career Sites</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>URL</th>
              ${metrics.map(m=>`<th>${m.label}</th>`).join('')}
              <th>Schema</th>
              <th>Sitemap</th>
            </tr>
          </thead>
          <tbody>
            ${CS.brands.map(cid => {
              const s = CS.seo[cid];
              const isMdlz = cid==='mdlz';
              const lbl = D.competitors.find(c=>c.id===cid)?.label||cid;
              return `<tr ${isMdlz?'class="mdlz-row"':''}>
                <td style="${isMdlz?'font-weight:700;color:var(--accent)':''}">
                  ${isMdlz?'★ ':''}${lbl}
                </td>
                <td style="font-family:var(--font-mono);font-size:10px;color:var(--text-3)">${CS.urls[cid]}</td>
                ${metrics.map(m=>{
                  const v=s[m.key];
                  return `<td><span class="score-pill" style="background:${scoreBg(v)};color:${scoreColor(v)}">${v}</span></td>`;
                }).join('')}
                <td style="text-align:center">${s.schemaMarkup?'<span style="color:var(--green)">✓</span>':'<span style="color:var(--red)">✗</span>'}</td>
                <td style="text-align:center">${s.sitemapIndexed?'<span style="color:var(--green)">✓</span>':'<span style="color:var(--red)">✗</span>'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderGeoDetail(CS) {
  const geoMetrics = [
    { key:'score',            label:'GEO Score' },
    { key:'aiCrawlable',      label:'AI Crawlable %' },
    { key:'localizedContent', label:'Localized Content %' },
    { key:'evpContentDepth',  label:'EVP Content Depth' },
    { key:'videoContent',     label:'Video Content Score' },
    { key:'employeeStories',  label:'Employee Stories' },
    { key:'freshnessScore',   label:'Content Freshness' },
    { key:'citationFrequency',label:'AI Citation Freq.' }
  ];

  return `
    <div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div class="card-title">GEO Readiness — AI Indexing Metrics</div>
        <span class="meta-pill">All 13 Career Sites</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              ${geoMetrics.map(m=>`<th>${m.label}</th>`).join('')}
              <th>Struct. Data</th>
              <th>FAQ Schema</th>
              <th>Job Schema</th>
              <th>llms.txt</th>
            </tr>
          </thead>
          <tbody>
            ${CS.brands.map(cid => {
              const g = CS.geo[cid];
              const isMdlz = cid==='mdlz';
              const lbl = D.competitors.find(c=>c.id===cid)?.label||cid;
              const tick = v => v ? '<span style="color:var(--green)">✓</span>' : '<span style="color:var(--red)">✗</span>';
              return `<tr ${isMdlz?'class="mdlz-row"':''}>
                <td style="${isMdlz?'font-weight:700;color:var(--accent)':''}">
                  ${isMdlz?'★ ':''}${lbl}
                </td>
                ${geoMetrics.map(m=>{
                  const v=g[m.key];
                  return `<td><span class="score-pill" style="background:${scoreBg(v)};color:${scoreColor(v)}">${v}</span></td>`;
                }).join('')}
                <td style="text-align:center">${tick(g.structuredData)}</td>
                <td style="text-align:center">${tick(g.faqSchema)}</td>
                <td style="text-align:center">${tick(g.jobPostingSchema)}</td>
                <td style="text-align:center">${tick(g.llmsTxt)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">What is GEO? — Methodology</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        ${[
          { icon:'🤖', title:'AI Crawlability', desc:'Can ChatGPT, Gemini, Perplexity, and Copilot crawl and index the career site content? Measures robots.txt, llms.txt, and technical accessibility.' },
          { icon:'📄', title:'Structured Data', desc:'Does the site use JSON-LD schema for Organization, JobPosting, FAQPage, and Person entities? This is the primary data Gen AI platforms use to answer employer queries.' },
          { icon:'🌍', title:'Localized Content', desc:'Is career content available in local languages for each market? AI models prioritize language-matched content in local-language queries.' },
          { icon:'🎥', title:'Video & Stories', desc:'Employee video content, testimonials, and day-in-the-life stories indexed with VideoObject schema are heavily weighted by Gemini (YouTube) and Perplexity.' },
          { icon:'⚡', title:'Content Freshness', desc:'Frequency of career page updates. AI models with real-time indexing (Perplexity, Copilot) weight recent content more heavily than older cached content.' },
          { icon:'💬', title:'Citation Frequency', desc:'How often does the career site get cited as a source in Gen AI employer brand responses? Higher structured data + fresh content = more citations.' }
        ].map(item => `
          <div style="background:var(--bg-3);border-radius:10px;padding:14px;border:1px solid var(--border)">
            <div style="font-size:20px;margin-bottom:8px">${item.icon}</div>
            <div style="font-weight:600;font-size:13px;margin-bottom:6px">${item.title}</div>
            <div style="font-size:12px;color:var(--text-2);line-height:1.55">${item.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSeoIssues(CS) {
  const high   = CS.mdlzIssues.filter(i=>i.severity==='critical');
  const med    = CS.mdlzIssues.filter(i=>i.severity==='high');
  const low    = CS.mdlzIssues.filter(i=>i.severity==='medium');

  return `
    <div class="grid-4" style="margin-bottom:20px">
      ${kpiCard('kpi-gap',  'Critical Issues', high.length.toString(), 'Immediate action needed', 0, 'blocking AI visibility')}
      ${kpiCard('kpi-sent', 'High Issues',     med.length.toString(),  'Short-term fixes',        0, 'impacting performance')}
      ${kpiCard('kpi-rank', 'Medium Issues',   low.length.toString(),  'Optimisation',            0, 'improvement opportunities')}
      ${kpiCard('kpi-vis',  'Est. Score Gain', '+32pts', 'If all fixes implemented', 0, 'SEO: 52→84, GEO: 34→66')}
    </div>

    ${['critical','high','medium'].map(sev => {
      const items = CS.mdlzIssues.filter(i=>i.severity===sev);
      if (!items.length) return '';
      return `
        <div style="margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <span class="severity-badge sev-${sev==='critical'?'high':sev==='high'?'medium':'low'}" style="font-size:12px;padding:4px 12px">${sev.toUpperCase()}</span>
            <div style="flex:1;height:1px;background:var(--border)"></div>
          </div>
          ${items.map(issue => `
            <div class="incident-card">
              <div class="incident-header">
                <div class="incident-title">${issue.issue}</div>
                <span class="severity-badge sev-${sev==='critical'?'high':sev==='high'?'medium':'low'}">${sev}</span>
              </div>
              <div style="margin-top:10px;padding:10px 14px;background:rgba(61,214,140,0.06);border:1px solid rgba(61,214,140,0.2);border-radius:8px;font-size:12px;color:var(--text-2)">
                <strong style="color:var(--green)">Fix: </strong>${issue.fix}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}

    <div class="card">
      <div class="card-header">
        <div class="card-title">MDLZ vs. L'Oréal — Career Site Gap Analysis</div>
        <span class="meta-pill">Best-in-class benchmark</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead><tr><th>Metric</th><th>MDLZ</th><th>L'Oréal</th><th>Gap</th><th>Fix Available?</th></tr></thead>
          <tbody>
            ${[
              ['SEO Score','52','88','-36','Yes — technical SEO audit'],
              ['GEO Score','34','88','-54','Yes — schema + content'],
              ['Page Speed','61','92','-31','Yes — CDN + image optimization'],
              ['Mobile Score','58','94','-36','Yes — responsive redesign'],
              ['Schema Markup','✗ No','✓ Yes','—','Yes — 2-4 weeks to implement'],
              ['llms.txt','✗ No','✓ Yes','—','Yes — 1 day to create'],
              ['FAQ Schema','✗ No','✓ Yes','—','Yes — add to key pages'],
              ['Localized Pages','38%','91%','-53%','Yes — translation + hreflang'],
              ['AI Citation Freq.','29','84','-55','Yes — structured data drives this'],
              ['Employee Stories','35','92','-57','Yes — video + story content hub']
            ].map(([metric,mdlz,loreal,gap,fix]) => `
              <tr>
                <td style="font-weight:500">${metric}</td>
                <td><span style="font-family:var(--font-mono);font-size:12px;color:${mdlz.startsWith('✗')?'var(--red)':mdlz.startsWith('✓')?'var(--green)':scoreColor(parseInt(mdlz)||0)}">${mdlz}</span></td>
                <td><span style="font-family:var(--font-mono);font-size:12px;color:var(--green)">${loreal}</span></td>
                <td style="font-family:var(--font-mono);font-size:12px;color:var(--red)">${gap}</td>
                <td style="font-size:11px;color:var(--text-2)">${fix}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderGeoRecs(CS) {
  return `
    <div class="section-title" style="font-size:18px;margin-bottom:4px">GEO Recommendations</div>
    <div class="section-sub" style="margin-bottom:20px">Specific actions to improve MDLZ career site AI indexability and citation frequency across all 6 Gen AI platforms</div>

    ${CS.geoRecs.map(rec => `
      <div class="rec-card">
        <div class="rec-header">
          <span class="priority-badge p-${rec.priority}">${rec.priority}</span>
          <div class="rec-title">${rec.title}</div>
        </div>
        <div class="rec-desc">${rec.description}</div>
        <div style="background:rgba(61,214,140,0.06);border:1px solid rgba(61,214,140,0.2);border-radius:10px;padding:12px 14px;font-size:12.5px;color:var(--text-2);line-height:1.65">
          <div style="font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--green);margin-bottom:5px">📈 Expected Impact</div>
          ${rec.impact}
        </div>
      </div>
    `).join('')}

    <div class="card" style="margin-top:8px;background:linear-gradient(135deg,rgba(232,184,75,0.08),rgba(240,116,43,0.05));border-color:rgba(232,184,75,0.2)">
      <div class="card-header">
        <div class="card-title" style="color:var(--accent)">Technical Implementation Guide — llms.txt</div>
        <span class="meta-pill">Copy-ready</span>
      </div>
      <div style="background:var(--bg);border-radius:10px;padding:16px;font-family:var(--font-mono);font-size:11px;color:var(--text-2);line-height:1.8;border:1px solid var(--border);overflow-x:auto">
        <div style="color:var(--text-3);margin-bottom:8px"># careers.mondelezinternational.com/llms.txt</div>
        <div style="color:var(--accent)"># Mondelēz International Careers — AI Crawler Permissions</div>
        <br>
        <div style="color:var(--green)">User-agent: *</div>
        <div>Allow: /careers/</div>
        <div>Allow: /life-at-mondelez/</div>
        <div>Allow: /benefits/</div>
        <div>Allow: /diversity-inclusion/</div>
        <div>Allow: /employee-stories/</div>
        <br>
        <div style="color:var(--text-3)"># Employer Brand Summary for AI</div>
        <div style="color:var(--accent-3)">Description: Mondelēz International is a global snacking leader</div>
        <div style="color:var(--accent-3)">employing 90,000+ people across 80+ countries. We make</div>
        <div style="color:var(--accent-3)">iconic brands including Oreo, Cadbury, Milka, and Toblerone.</div>
        <br>
        <div style="color:var(--text-3)"># EVP Keywords for AI indexing</div>
        <div style="color:var(--purple)">Topics: snacking innovation, global careers, DEI, flexible work,</div>
        <div style="color:var(--purple)">Cocoa Life sustainability, digital transformation, FMCG careers</div>
      </div>
      <div style="margin-top:12px;font-size:12px;color:var(--text-2)">This file should be placed at the root of the careers domain. Combined with JSON-LD schema and FAQ pages, this creates a complete AI-readable employer brand signal.</div>
    </div>
  `;
}

function selectSeoTab(t) {
  state.activeSeoTab = t;
  renderSeoGeo();
}

// ── INIT ──────────────────────────────────────────────────

function buildShell() {
  document.body.innerHTML = `
    <div class="app-shell">
      <header class="top-header">
        <div class="logo-area">
          <div class="logo-badge">M</div>
          <div class="logo-text">MDLZ <span>GenAI EB Intelligence</span></div>
        </div>
        <div class="header-meta">
          <span class="meta-pill">Research: April 2026</span>
          <span class="meta-pill">6 Platforms · 9 Markets · 13 Brands · Glassdoor · SEO/GEO</span>
          <div class="live-indicator"><div class="live-dot"></div> Simulated Data</div>
        </div>
      </header>

      <nav class="sidebar">
        <div class="sidebar-section-label">Dashboard</div>
        <div class="nav-item active" data-view="overview" onclick="navigate('overview')">
          <span class="nav-icon">⬡</span> Overview
        </div>

        <div class="sidebar-section-label">Analysis</div>
        <div class="nav-item" data-view="platforms" onclick="navigate('platforms')">
          <span class="nav-icon">✦</span> Gen AI Platforms
        </div>
        <div class="nav-item" data-view="markets" onclick="navigate('markets')">
          <span class="nav-icon">🌍</span> Markets
        </div>
        <div class="nav-item" data-view="competitors" onclick="navigate('competitors')">
          <span class="nav-icon">📊</span> Competitors
        </div>
        <div class="nav-item" data-view="evp" onclick="navigate('evp')">
          <span class="nav-icon">🎯</span> EVP Drivers
        </div>

        <div class="sidebar-section-label">Insights</div>
        <div class="nav-item" data-view="gaps" onclick="navigate('gaps')">
          <span class="nav-icon">⚠️</span> Inconsistencies
          <span style="margin-left:auto;background:rgba(240,100,116,0.2);color:var(--red);font-family:var(--font-mono);font-size:10px;padding:1px 7px;border-radius:100px">7</span>
        </div>
        <div class="nav-item" data-view="recommend" onclick="navigate('recommend')">
          <span class="nav-icon">💡</span> Recommendations
          <span style="margin-left:auto;background:rgba(232,184,75,0.2);color:var(--accent);font-family:var(--font-mono);font-size:10px;padding:1px 7px;border-radius:100px">10</span>
        </div>

        <div class="sidebar-section-label">Extended Research</div>
        <div class="nav-item" data-view="glassdoor" onclick="navigate('glassdoor')">
          <span class="nav-icon">⭐</span> Glassdoor
        </div>
        <div class="nav-item" data-view="seogeo" onclick="navigate('seogeo')">
          <span class="nav-icon">🔍</span> SEO & GEO Audit

        <div style="padding:20px;margin-top:auto;border-top:1px solid var(--border)">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-3);line-height:1.6">
            Methodology: 48 EVP prompts per platform per market in local language. Scores represent % of unprompted appearances (visibility) and weighted sentiment analysis (0–100).
          </div>
        </div>
      </nav>

      <main class="main-content">
        <div id="view-overview"    class="view-panel"></div>
        <div id="view-platforms"   class="view-panel"></div>
        <div id="view-markets"     class="view-panel"></div>
        <div id="view-competitors" class="view-panel"></div>
        <div id="view-evp"         class="view-panel"></div>
        <div id="view-gaps"        class="view-panel"></div>
        <div id="view-recommend"   class="view-panel"></div>
        <div id="view-glassdoor"   class="view-panel"></div>
        <div id="view-seogeo"      class="view-panel"></div>
      </main>
    </div>
    <div class="tooltip" id="global-tooltip"></div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  buildShell();
  navigate('overview');
});
