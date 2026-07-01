import { ContentStore } from './data/store.js';
import { Api } from './data/api.js';
import { generateAdaptiveSession, avancarPara, calcularPontuacao, getEtapaAtual } from './engine/tutorCore.js';
import { UI } from './ui/render.js';

const appState = {
  aluno: null, progresso: {}, sessaoAtiva: null, historico: [], streak: 0
};

const app = {
  async init() {
    UI.mostrarCarregando('Carregando conteúdo…');
    this.loadLocalData();

    try {
      await ContentStore.carregar();
    } catch (err) {
      console.error('Falha ao carregar conteúdo (nem Apps Script nem fallback local funcionaram):', err);
    }

    this.garantirProgressoInicial();
    this.applyFontSize();
    this.applyDarkMode();

    if (appState.aluno && appState.aluno.nome) {
      document.getElementById('display-nome').textContent = appState.aluno.nome;
      document.getElementById('display-turma').textContent = `Turma ${appState.aluno.turma}`;
      document.getElementById('app-header').classList.remove('hidden');
      document.getElementById('app-nav').classList.remove('hidden');
      UI.atualizarStatusSync(Api.disponivel() ? 'sincronizando' : 'local');

      if (appState.sessaoAtiva && !appState.sessaoAtiva.concluida) {
        document.getElementById('active-session-box').classList.remove('hidden');
        const hab = ContentStore.habilidades[appState.sessaoAtiva.habilidadeId];
        document.getElementById('active-session-name').textContent = hab?.titulo || appState.sessaoAtiva.habilidadeId;
      }

      UI.esconderCarregando();
      this.switchView('view-home', document.querySelector('.nav-item.active'));
      UI.renderMotivational(appState);

      // Sincroniza com a planilha em segundo plano (não trava a interface).
      this.syncProgressoRemoto().then(() => {
        const viewHome = document.getElementById('view-home');
        if (viewHome && !viewHome.classList.contains('hidden')) UI.renderHome(appState, this);
      });
    } else {
      UI.esconderCarregando();
      document.getElementById('view-login').classList.remove('hidden');
    }
  },

  // Garante um registro de progresso para toda habilidade que veio do
  // ContentStore (roda depois do carregamento, já que antes as habilidades
  // não existiam de forma síncrona).
  garantirProgressoInicial() {
    Object.keys(ContentStore.habilidades).forEach(key => {
      if (!appState.progresso[key]) {
        appState.progresso[key] = { status: ContentStore.habilidades[key].status || 'novo', score: 0, tentativasTotais: 0 };
      }
    });
  },

  // Busca o progresso salvo na planilha (Apps Script) e mescla com o local,
  // sempre preservando a maior pontuação — nunca perde progresso feito em
  // outro dispositivo, nem o que acabou de ser feito offline neste.
  async syncProgressoRemoto() {
    if (!appState.aluno || !Api.disponivel()) {
      UI.atualizarStatusSync('local');
      return;
    }
    UI.atualizarStatusSync('sincronizando');
    try {
      const remoto = await Api.buscarProgresso(appState.aluno.nome, appState.aluno.turma);
      this.mesclarProgresso(remoto);
      UI.atualizarStatusSync('sincronizado');
    } catch (err) {
      console.warn('Progresso remoto indisponível agora, usando apenas o local:', err.message);
      UI.atualizarStatusSync('local');
    }
  },

  mesclarProgresso(remoto) {
    Object.entries(remoto.progresso || {}).forEach(([id, regRemoto]) => {
      const regLocal = appState.progresso[id];
      if (!regLocal || (regRemoto.score || 0) > (regLocal.score || 0)) {
        appState.progresso[id] = { ...regRemoto };
      }
    });

    const combinados = [...appState.historico, ...(remoto.historico || [])];
    const vistos = new Set();
    const unicos = combinados.filter(h => {
      const chave = `${h.data}|${h.habId}|${h.score}`;
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    });
    appState.historico = unicos.slice(0, 10);
    this.saveData();
  },

  changeFontSize(step) {
    let currentSize = parseInt(localStorage.getItem('socraticFontSize')) || 16;
    currentSize += step * 2;
    if (currentSize < 12) currentSize = 12;
    if (currentSize > 26) currentSize = 26;
    localStorage.setItem('socraticFontSize', currentSize);
    this.applyFontSize();
  },

  applyFontSize() {
    const size = localStorage.getItem('socraticFontSize') || 16;
    document.documentElement.style.fontSize = size + 'px';
  },

  // --- MODO ESCURO ---
  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('socraticDarkMode', isDark);
    const btn = document.getElementById('btn-dark-mode');
    if (btn) btn.textContent = isDark ? "☀️" : "🌙";
  },

  applyDarkMode() {
    const isDark = localStorage.getItem('socraticDarkMode') === 'true';
    if (isDark) document.body.classList.add('dark-mode');
    const btn = document.getElementById('btn-dark-mode');
    if (btn) btn.textContent = isDark ? "☀️" : "🌙";
  },

  // -------------------
  loadLocalData() {
    const data = localStorage.getItem('socraticTutorData');
    if (data) Object.assign(appState, JSON.parse(data));
  },

  saveData() { localStorage.setItem('socraticTutorData', JSON.stringify(appState)); },

  login() {
    const nome = document.getElementById('input-nome').value.trim();
    const turma = document.getElementById('select-turma').value;
    if (!nome) return alert('Por favor, informe o seu nome!');
    appState.aluno = { nome, turma };
    this.saveData();
    location.reload();
  },

  logout() {
    if (confirm('Tem a certeza? Isto irá apagar o seu progresso salvo NESTE dispositivo (o que já estiver sincronizado com a planilha continua lá).')) {
      localStorage.removeItem('socraticTutorData');
      location.reload();
    }
  },

  switchView(viewId, navElement) {
    if (appState.sessaoAtiva && viewId !== 'view-study' && viewId !== 'view-login') this.saveData();
    ['view-login', 'view-home', 'view-study', 'view-dashboard'].forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');

    if (navElement) {
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      navElement.classList.add('active');
    }

    if (viewId === 'view-home') UI.renderHome(appState, this);
    if (viewId === 'view-dashboard') UI.renderDashboard(appState);
    if (viewId === 'view-study' && (!appState.sessaoAtiva || appState.sessaoAtiva.concluida)) {
      alert('Escolha um assunto no seu Plano de Estudos para começar!');
      this.switchView('view-home', document.querySelector('.nav-item'));
    }
  },

  startSession(id) {
    appState.sessaoAtiva = generateAdaptiveSession(id);
    document.getElementById('active-session-box').classList.add('hidden');
    this.saveData();
    this.switchView('view-study', document.querySelectorAll('.nav-item')[1]);
    UI.renderTutorStep(appState, this);
  },

  resumeSession() {
    if (!appState.sessaoAtiva) return;
    document.getElementById('active-session-box').classList.add('hidden');
    this.switchView('view-study', document.querySelectorAll('.nav-item')[1]);
    UI.renderTutorStep(appState, this);
  },

  // `etapa` é a etapa de onde o aluno está saindo — o motor usa
  // etapa.contaPontuacao e opcaoSelecionada.correta (campos explícitos) para
  // decidir a pontuação, em vez de adivinhar pelo nome do ID de destino.
  handleOptionClick(opcaoSelecionada, etapa) {
    const chatBox = document.getElementById('chat-box');
    const optsBox = document.getElementById('options-box');

    const usrMsg = document.createElement('div');
    usrMsg.className = 'chat-bubble user';
    usrMsg.innerHTML = opcaoSelecionada.texto;
    chatBox.appendChild(usrMsg);
    optsBox.innerHTML = '';

    appState.sessaoAtiva.tentativasEtapa++;
    const acertou = opcaoSelecionada.correta !== false;

    setTimeout(() => {
      if (opcaoSelecionada.feedback) {
        const feedMsg = document.createElement('div');
        feedMsg.className = 'chat-bubble tutor';
        feedMsg.style.fontWeight = "bold";
        feedMsg.style.color = acertou ? "var(--success)" : "var(--warning)";
        feedMsg.innerHTML = opcaoSelecionada.feedback;
        chatBox.appendChild(feedMsg);
        if (window.MathJax) { window.MathJax.typesetPromise(); }
      }

      const btnAvancar = document.createElement('button');
      btnAvancar.className = 'btn fade-in';
      btnAvancar.style.width = '100%';
      btnAvancar.style.marginTop = '15px';
      btnAvancar.textContent = "Continuar ➔";
      btnAvancar.onclick = () => {
        avancarPara(appState.sessaoAtiva, opcaoSelecionada, etapa);
        this.saveData();
        UI.renderTutorStep(appState, this);
      };
      optsBox.appendChild(btnAvancar);

      chatBox.parentElement.scrollTop = chatBox.parentElement.scrollHeight;
    }, 500);
  },

  handleAvaliacaoResposta(opt, questao) {
    appState.sessaoAtiva.tentativasEtapa++;
    const acertou = (opt.id === questao.correta);
    const chatBox = document.getElementById('chat-box'); // Antes não existia essa variável: o scroll automático quebrava silenciosamente aqui.
    const optsBox = document.getElementById('options-box');
    optsBox.innerHTML = '';

    const tentativasAtuais = appState.sessaoAtiva.tentativasEtapa;
    const etapaAtual = getEtapaAtual(appState.sessaoAtiva);

    const usrMsg = document.createElement('div');
    usrMsg.className = 'chat-bubble user';
    usrMsg.innerHTML = opt.texto;
    chatBox.appendChild(usrMsg);

    setTimeout(() => {
      const resultMsg = document.createElement('div');
      resultMsg.className = 'chat-bubble tutor';

      if (acertou) {
        resultMsg.style.color = 'var(--success)';
        resultMsg.innerHTML = `🎉 <strong>Correto!</strong><br>${questao.explicacao}`;
        chatBox.appendChild(resultMsg);
        if (window.MathJax) { window.MathJax.typesetPromise(); }

        const btnConcluir = document.createElement('button');
        btnConcluir.className = 'btn fade-in';
        btnConcluir.style.width = '100%';
        btnConcluir.style.marginTop = '15px';
        btnConcluir.textContent = "Concluir Sessão ➔";
        btnConcluir.onclick = () => {
          avancarPara(appState.sessaoAtiva, { proximo: 'fim', correta: true }, etapaAtual);
          this.concluirSessao(true, tentativasAtuais);
        };
        optsBox.appendChild(btnConcluir);

      } else {
        resultMsg.style.color = 'var(--danger)';
        resultMsg.innerHTML = `<strong>Pense bem!</strong><br>${questao.explicacao}`;
        chatBox.appendChild(resultMsg);
        if (window.MathJax) { window.MathJax.typesetPromise(); }

        const btnTentar = document.createElement('button');
        btnTentar.className = 'btn fade-in';
        btnTentar.style.width = '100%';
        btnTentar.style.marginTop = '15px';

        if (tentativasAtuais >= 3) {
          btnTentar.textContent = "Finalizar Tentativas ➔";
          btnTentar.onclick = () => {
            avancarPara(appState.sessaoAtiva, { proximo: 'fim', correta: false }, etapaAtual);
            this.concluirSessao(false, tentativasAtuais);
          };
        } else {
          btnTentar.textContent = "Tentar Novamente ➔";
          btnTentar.onclick = () => {
            UI.renderTutorStep(appState, this);
          };
        }
        optsBox.appendChild(btnTentar);
      }

      chatBox.parentElement.scrollTop = chatBox.parentElement.scrollHeight;
    }, 500);
  },

  concluirSessao(sucessoAvaliacao, tentativasAtuais = 1) {
    const pontuacaoConversa = calcularPontuacao(appState.sessaoAtiva);

    let scoreAvaliacao = 0;
    if (sucessoAvaliacao) {
      if (tentativasAtuais === 1) scoreAvaliacao = 100;
      else if (tentativasAtuais === 2) scoreAvaliacao = 75;
      else scoreAvaliacao = 50;
    } else {
      scoreAvaliacao = 10;
    }

    // 60% de peso na avaliação final e 40% na conversa socrática
    let scoreFinal = Math.round((pontuacaoConversa * 0.4) + (scoreAvaliacao * 0.6));

    // REDE DE SEGURANÇA: se o aluno acertou a avaliação final à primeira, nunca recebe menos que 75%
    if (sucessoAvaliacao && tentativasAtuais === 1 && scoreFinal < 75) {
      scoreFinal = 75;
    }

    const habId = appState.sessaoAtiva.habilidadeId;
    const progressoAtual = appState.progresso[habId];

    progressoAtual.score = Math.max(progressoAtual.score, scoreFinal);
    progressoAtual.tentativasTotais++;

    if (progressoAtual.score >= 75) progressoAtual.status = 'concluido';
    else if (progressoAtual.score >= 50) progressoAtual.status = 'em_desenvolvimento';
    else progressoAtual.status = 'revisar';

    const entradaHistorico = { data: new Date().toLocaleDateString('pt-BR'), habId: habId, score: scoreFinal, status: progressoAtual.status };
    appState.historico.unshift(entradaHistorico);
    if (appState.historico.length > 10) appState.historico.pop();

    appState.sessaoAtiva = null;
    appState.streak++;
    this.saveData();

    // Sincroniza com a planilha (Apps Script) em segundo plano. Se falhar
    // (sem internet, script fora do ar, etc.), o progresso já está garantido
    // localmente e será reenviado na próxima vez que o app carregar.
    if (appState.aluno) {
      UI.atualizarStatusSync('sincronizando');
      Api.salvarProgresso({
        aluno: appState.aluno.nome,
        turma: appState.aluno.turma,
        habilidadeId: habId,
        score: progressoAtual.score,
        status: progressoAtual.status,
        tentativasTotais: progressoAtual.tentativasTotais,
        historicoEntry: entradaHistorico
      }).then(res => UI.atualizarStatusSync(res.ok ? 'sincronizado' : 'local'));
    }

    if (scoreFinal >= 75 && typeof confetti !== 'undefined') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      alert(`Sessão concluída! Pontuação Socrática: ${scoreFinal}%`);
      this.switchView('view-dashboard', document.querySelectorAll('.nav-item')[2]);
    }, 1000);
  }
};

window.app = app;
document.addEventListener("DOMContentLoaded", () => { app.init(); });
