import { ContentStore } from '../data/store.js';
import { sugerirProximaHabilidade, habilidadeDesbloqueada, getSessaoById, getEtapaAtual } from '../engine/tutorCore.js';

let chartInstance = null;

export const UI = {
  renderMotivational(appState) {
    const msgs = [`Bom dia, ${appState.aluno.nome}! Hoje é um ótimo dia para evoluir. 🎯`, `Lembre-se: errar faz parte da aprendizagem! Vamos a isso. 💡`];
    document.getElementById('motivational-box').textContent = msgs[Math.floor(Math.random() * msgs.length)];
  },

  renderHome(appState, callbacks) {
    const HABILIDADES = ContentStore.habilidades;
    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    const sugestaoAtual = sugerirProximaHabilidade(appState.progresso);
    const sortedKeys = Object.keys(HABILIDADES).sort((a, b) => {
      const statusOrder = { "revisar": 1, "novo": 2, "concluido": 3 };
      const sa = appState.progresso[a].status;
      const sb = appState.progresso[b].status;
      if (statusOrder[sa] !== statusOrder[sb]) return statusOrder[sa] - statusOrder[sb];
      return HABILIDADES[a].prioridade - HABILIDADES[b].prioridade;
    });

    sortedKeys.forEach(id => {
      const hab = HABILIDADES[id];
      const progresso = appState.progresso[id];
      const unlocked = habilidadeDesbloqueada(id, appState.progresso);
      const isSugestao = (id === sugestaoAtual);

      const bloqueadoHtml = !unlocked ? `<div class="lock-icon" title="Conclua os pré-requisitos">🔒</div>` : '';
      const sugestaoHtml = isSugestao ? `<div style="position:absolute; top:-10px; right:10px; background:var(--warning); color:#fff; font-size:0.7rem; padding:3px 8px; border-radius:10px; font-weight:bold;">🌟 Recomendado</div>` : '';

      let badgeClass = progresso.status;
      let badgeText = progresso.status.charAt(0).toUpperCase() + progresso.status.slice(1);
      if (progresso.status === 'em_desenvolvimento') { badgeClass = 'revisar'; badgeText = 'Em Desenvolvimento'; }

      const card = document.createElement('div');
      card.className = `skill-card status-${progresso.status} ${!unlocked ? 'locked' : ''}`;
      if (isSugestao) card.style.border = "2px solid var(--warning)";

      card.innerHTML = `
        ${sugestaoHtml} ${bloqueadoHtml}
        <div class="skill-title">${hab.titulo}</div>
        <div class="skill-desc">${hab.descricao}</div>
        <div class="badge ${badgeClass}">${badgeText}</div>
      `;

      if (unlocked) card.onclick = () => callbacks.startSession(id);
      else card.onclick = () => alert(`🔒 Bloqueado. Conclua os pré-requisitos primeiro.`);
      container.appendChild(card);
    });
  },

  renderTutorStep(appState, callbacks) {
    const hab = ContentStore.habilidades[appState.sessaoAtiva.habilidadeId];
    document.getElementById('study-title').textContent = hab?.titulo || appState.sessaoAtiva.habilidadeId;

    const sessaoDef = getSessaoById(appState.sessaoAtiva.habilidadeId);
    const idxAtual = sessaoDef.etapas.findIndex(e => e.id === appState.sessaoAtiva.etapaAtualId);
    const progresso = Math.max(10, ((idxAtual + 1) / sessaoDef.etapas.length) * 100);
    document.getElementById('study-progress').style.width = `${progresso}%`;

    const etapa = getEtapaAtual(appState.sessaoAtiva);
    const chatBox = document.getElementById('chat-box');
    const optsBox = document.getElementById('options-box');

    chatBox.innerHTML = '';
    optsBox.innerHTML = '';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-bubble tutor';
    msgDiv.innerHTML = etapa.tutor;

    if (etapa.imagem) {
      const img = document.createElement('img');
      img.src = etapa.imagem;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      img.style.marginTop = '10px';
      img.style.border = '1px solid var(--gray-light)';
      msgDiv.appendChild(img);
    }

    chatBox.appendChild(msgDiv);

    if (etapa.tipo === 'avaliacao') {
      this.renderAvaliacao(etapa, callbacks);
    } else {
      etapa.opcoes.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = etapa.opcoes.length === 1 ? opt.texto : `${idx + 1}. ${opt.texto}`;
        btn.onclick = () => callbacks.handleOptionClick(opt, etapa);
        optsBox.appendChild(btn);
      });
    }

    if (window.MathJax) { window.MathJax.typesetPromise(); }
  },

  renderAvaliacao(etapa, callbacks) {
    const chatBox = document.getElementById('chat-box');
    const optsBox = document.getElementById('options-box');

    const qBox = document.createElement('div');
    // Antes: qBox.style.background = '#e0f2fe' (cor fixa, ficava clara demais no modo escuro).
    // Agora usa uma classe que respeita as variáveis de tema (ver styles.css).
    qBox.className = 'chat-bubble tutor desafio-final';
    qBox.innerHTML = `<strong>Desafio Final:</strong><br>${etapa.questao.enunciado}`;

    if (etapa.imagem) {
      const img = document.createElement('img');
      img.src = etapa.imagem;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      img.style.marginTop = '10px';
      qBox.appendChild(img);
    }

    chatBox.appendChild(qBox);

    etapa.questao.opcoes.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `${idx + 1}. ${opt.texto}`;
      btn.onclick = () => callbacks.handleAvaliacaoResposta(opt, etapa.questao);
      optsBox.appendChild(btn);
    });

    if (window.MathJax) { window.MathJax.typesetPromise(); }
  },

  renderDashboard(appState) {
    const HABILIDADES = ContentStore.habilidades;
    const stats = { total: 0, concluidas: 0, revisao: 0, somaScore: 0 };
    const keys = Object.keys(HABILIDADES);

    keys.forEach(k => {
      stats.total++;
      const p = appState.progresso[k];
      if (p.status === 'concluido') stats.concluidas++;
      if (p.status === 'revisar' || p.status === 'em_desenvolvimento') stats.revisao++;
      stats.somaScore += p.score || 0;
    });

    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-concluidas').textContent = stats.concluidas;
    document.getElementById('stat-revisao').textContent = stats.revisao;
    document.getElementById('stat-pontuacao').textContent = stats.total ? `${Math.round(stats.somaScore / stats.total)}%` : '0%';

    this.renderChart(keys, appState);
    this.renderHistory(appState);
    this.checkAchievements(stats.concluidas, appState);
  },

  renderChart(keys, appState) {
    const HABILIDADES = ContentStore.habilidades;
    if (chartInstance) chartInstance.destroy();
    const labels = keys.map(k => (HABILIDADES[k]?.titulo || k).split(' ')[0]);
    const data = keys.map(k => appState.progresso[k]?.score || 0);

    if (typeof Chart === 'undefined') return;

    const ctx = document.getElementById('radarChart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'radar',
      data: { labels: labels, datasets: [{ label: 'Domínio (%)', data: data, backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: 'rgba(37, 99, 235, 1)', pointBackgroundColor: 'rgba(37, 99, 235, 1)', borderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 100, ticks: { stepSize: 20, display: false } } }, plugins: { legend: { display: false } } }
    });
  },

  renderHistory(appState) {
    const HABILIDADES = ContentStore.habilidades;
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';
    if (appState.historico.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhuma sessão ainda.</td></tr>';
      return;
    }
    appState.historico.forEach(h => {
      const statusIcon = h.score >= 75 ? '🟢' : h.score >= 50 ? '🟡' : '🔴';
      const titulo = HABILIDADES[h.habId]?.titulo || h.habId;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${h.data}</td><td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${titulo}</td><td>${h.score}% ${statusIcon}</td>`;
      tbody.appendChild(tr);
    });
  },

  checkAchievements(concluidas, appState) {
    if (appState.historico.length > 0) document.getElementById('ach-1').classList.add('unlocked');
    if (appState.streak >= 5) document.getElementById('ach-2').classList.add('unlocked');
    if (concluidas >= 1) document.getElementById('ach-3').classList.add('unlocked');
    if (concluidas === Object.keys(ContentStore.habilidades).length) document.getElementById('ach-4').classList.add('unlocked');
  },

  // --- Tela de carregamento inicial (busca conteúdo/progresso no Apps Script) ---
  mostrarCarregando(mensagem) {
    const el = document.getElementById('view-loading');
    if (!el) return;
    el.classList.remove('hidden');
    const msgEl = document.getElementById('loading-message');
    if (msgEl) msgEl.textContent = mensagem;
  },
  esconderCarregando() {
    const el = document.getElementById('view-loading');
    if (el) el.classList.add('hidden');
  },

  // --- Indicador de sincronização (canto do header) ---
  atualizarStatusSync(status) {
    const el = document.getElementById('sync-status');
    if (!el) return;
    const mapa = {
      'sincronizado': { texto: '☁️ Sincronizado', classe: 'sync-ok' },
      'local': { texto: '📴 Somente local', classe: 'sync-off' },
      'sincronizando': { texto: '🔄 Sincronizando…', classe: 'sync-pending' }
    };
    const info = mapa[status] || mapa['local'];
    el.textContent = info.texto;
    el.className = `sync-status ${info.classe}`;
  }
};
