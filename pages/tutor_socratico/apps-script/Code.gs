/**
 * TUTOR SOCRÁTICO — Backend em Google Apps Script
 * ------------------------------------------------
 * Serve o conteúdo das habilidades (lido das abas "Habilidades", "Nos" e
 * "Opcoes") como JSON, e recebe/entrega o progresso dos alunos (abas
 * "Progresso" e "Historico").
 *
 * COMO USAR (resumo — detalhes completos no GUIA.md):
 *   1. Crie uma planilha Google nova.
 *   2. Extensões > Apps Script, cole este arquivo por cima do Code.gs.
 *   3. Rode a função `configurarPlanilha` uma vez (menu ▶ ao lado do nome
 *      da função, no editor) para criar as 4 abas com os cabeçalhos certos.
 *   4. Importe habilidades.csv / nos.csv / opcoes.csv nas abas correspondentes
 *      (Arquivo > Importar > Fazer upload > Substituir dados na aba atual).
 *   5. Implantar > Nova implantação > Tipo "App da Web".
 *      - Executar como: Eu
 *      - Quem pode acessar: Qualquer pessoa
 *   6. Copie a URL gerada e cole em js/data/api.js (APPS_SCRIPT_URL).
 */

const ABA_HABILIDADES = 'Habilidades';
const ABA_NOS = 'Nos';
const ABA_OPCOES = 'Opcoes';
const ABA_PROGRESSO = 'Progresso';
const ABA_HISTORICO = 'Historico';

// ---------------------------------------------------------------
// SETUP (rodar uma vez, manualmente, pelo editor do Apps Script)
// ---------------------------------------------------------------
function configurarPlanilha() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  criarAbaSeNaoExiste_(ss, ABA_HABILIDADES,
    ['id', 'titulo', 'descricao', 'prerequisitos', 'prioridade', 'status_inicial', 'ordem_sugerida']);
  criarAbaSeNaoExiste_(ss, ABA_NOS,
    ['habilidade_id', 'no_id', 'tipo', 'conta_pontuacao', 'texto', 'imagem_url', 'enunciado', 'explicacao']);
  criarAbaSeNaoExiste_(ss, ABA_OPCOES,
    ['habilidade_id', 'no_id_origem', 'ordem', 'texto', 'no_id_destino', 'correta', 'feedback']);
  criarAbaSeNaoExiste_(ss, ABA_PROGRESSO,
    ['aluno', 'turma', 'habilidade_id', 'score', 'status', 'tentativas_totais', 'atualizado_em']);
  criarAbaSeNaoExiste_(ss, ABA_HISTORICO,
    ['aluno', 'turma', 'data', 'habilidade_id', 'score', 'status', 'timestamp']);
  SpreadsheetApp.getUi().alert('Abas criadas/verificadas com sucesso. Agora importe os CSVs de migração.');
}

function criarAbaSeNaoExiste_(ss, nome, cabecalho) {
  let aba = ss.getSheetByName(nome);
  if (!aba) {
    aba = ss.insertSheet(nome);
    aba.appendRow(cabecalho);
    aba.setFrozenRows(1);
  }
  return aba;
}

// ---------------------------------------------------------------
// LEITURA GENÉRICA DE ABAS (linha 1 = cabeçalho -> array de objetos)
// ---------------------------------------------------------------
function lerAbaComoObjetos_(nomeAba) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName(nomeAba);
  if (!aba || aba.getLastRow() < 2) return [];
  const valores = aba.getRange(1, 1, aba.getLastRow(), aba.getLastColumn()).getValues();
  const cabecalho = valores[0].map(h => String(h).trim());
  const linhas = valores.slice(1);
  return linhas
    .filter(linha => linha.some(cel => String(cel).trim() !== ''))
    .map(linha => {
      const obj = {};
      cabecalho.forEach((chave, i) => { obj[chave] = linha[i]; });
      return obj;
    });
}

function paraBooleano_(v) {
  if (typeof v === 'boolean') return v;
  return String(v).trim().toUpperCase() === 'TRUE';
}

// ---------------------------------------------------------------
// MONTAGEM DO CONTEÚDO (Habilidades + Nos + Opcoes -> mesmo formato
// usado pelo motor do front-end: { habilidades, ordemSugerida, sessoes })
// ---------------------------------------------------------------
function montarConteudo_() {
  const habilidadesLinhas = lerAbaComoObjetos_(ABA_HABILIDADES);
  const nosLinhas = lerAbaComoObjetos_(ABA_NOS);
  const opcoesLinhas = lerAbaComoObjetos_(ABA_OPCOES);

  const habilidades = {};
  const ordemComIndice = [];
  habilidadesLinhas.forEach(h => {
    const id = String(h.id).trim();
    if (!id) return;
    habilidades[id] = {
      titulo: h.titulo,
      descricao: h.descricao,
      prerequisitos: h.prerequisitos ? String(h.prerequisitos).split(';').map(s => s.trim()).filter(Boolean) : [],
      prioridade: Number(h.prioridade) || 0,
      status: h.status_inicial || 'novo'
    };
    ordemComIndice.push({ id, ordem: Number(h.ordem_sugerida) });
  });
  ordemComIndice.sort((a, b) => a.ordem - b.ordem);
  const ordemSugerida = ordemComIndice.map(o => o.id);

  // Agrupa opções por (habilidade_id, no_id_origem)
  const opcoesPorNo = {};
  opcoesLinhas.forEach(o => {
    const chave = o.habilidade_id + '||' + o.no_id_origem;
    if (!opcoesPorNo[chave]) opcoesPorNo[chave] = [];
    opcoesPorNo[chave].push({
      texto: o.texto,
      destino: o.no_id_destino,
      correta: paraBooleano_(o.correta),
      feedback: o.feedback || ''
    });
  });

  // Agrupa nós por habilidade, na ordem em que aparecem na planilha
  const sessoes = {};
  nosLinhas.forEach(n => {
    const habId = String(n.habilidade_id).trim();
    const noId = String(n.no_id).trim();
    if (!habId || !noId) return;
    if (!sessoes[habId]) {
      sessoes[habId] = { id: habId, titulo: (habilidades[habId] || {}).titulo || habId, etapas: [] };
    }
    const chave = habId + '||' + noId;
    const opcoesDoNo = opcoesPorNo[chave] || [];

    const etapa = {
      id: noId,
      tipo: n.tipo,
      contaPontuacao: paraBooleano_(n.conta_pontuacao),
      tutor: n.texto || '',
      imagem: n.imagem_url || null
    };

    if (n.tipo === 'avaliacao') {
      const opcoesForm = opcoesDoNo.map((o, i) => ({ id: i + 1, texto: o.texto, correta: o.correta }));
      const idxCorreta = opcoesForm.findIndex(o => o.correta);
      etapa.questao = {
        enunciado: n.enunciado || '',
        opcoes: opcoesForm.map(o => ({ id: o.id, texto: o.texto })),
        correta: idxCorreta >= 0 ? opcoesForm[idxCorreta].id : 1,
        explicacao: n.explicacao || ''
      };
    } else {
      etapa.opcoes = opcoesDoNo.map((o, i) => ({
        id: i + 1,
        texto: o.texto,
        proximo: o.destino,
        correta: o.correta,
        feedback: o.feedback
      }));
    }

    sessoes[habId].etapas.push(etapa);
  });

  return { habilidades, ordemSugerida, sessoes, geradoEm: new Date().toISOString() };
}

// ---------------------------------------------------------------
// PROGRESSO DE UM ALUNO
// ---------------------------------------------------------------
function obterProgressoAluno_(aluno, turma) {
  const progressoLinhas = lerAbaComoObjetos_(ABA_PROGRESSO)
    .filter(p => p.aluno === aluno && p.turma === turma);
  const progresso = {};
  progressoLinhas.forEach(p => {
    progresso[p.habilidade_id] = {
      score: Number(p.score) || 0,
      status: p.status,
      tentativasTotais: Number(p.tentativas_totais) || 0
    };
  });

  const historico = lerAbaComoObjetos_(ABA_HISTORICO)
    .filter(h => h.aluno === aluno && h.turma === turma)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10)
    .map(h => ({ data: h.data, habId: h.habilidade_id, score: Number(h.score), status: h.status }));

  return { progresso, historico };
}

function salvarProgresso_(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const abaProgresso = ss.getSheetByName(ABA_PROGRESSO);
  const abaHistorico = ss.getSheetByName(ABA_HISTORICO);
  const agora = new Date().toISOString();

  // Upsert na aba Progresso (procura linha existente aluno+turma+habilidade)
  const dados = abaProgresso.getDataRange().getValues();
  let linhaEncontrada = -1;
  for (let i = 1; i < dados.length; i++) {
    if (dados[i][0] === payload.aluno && dados[i][1] === payload.turma && dados[i][2] === payload.habilidadeId) {
      linhaEncontrada = i + 1; // 1-indexed no Sheets
      break;
    }
  }
  const novaLinha = [payload.aluno, payload.turma, payload.habilidadeId, payload.score, payload.status, payload.tentativasTotais, agora];
  if (linhaEncontrada > 0) {
    abaProgresso.getRange(linhaEncontrada, 1, 1, novaLinha.length).setValues([novaLinha]);
  } else {
    abaProgresso.appendRow(novaLinha);
  }

  // Sempre adiciona uma linha nova no Histórico (log de sessões)
  if (payload.historicoEntry) {
    abaHistorico.appendRow([
      payload.aluno, payload.turma, payload.historicoEntry.data,
      payload.historicoEntry.habId, payload.historicoEntry.score, payload.historicoEntry.status, agora
    ]);
  }

  return { ok: true };
}

// ---------------------------------------------------------------
// ENDPOINTS HTTP
// ---------------------------------------------------------------
function doGet(e) {
  try {
    const action = e.parameter.action;
    let resposta;

    if (action === 'conteudo') {
      resposta = montarConteudo_();
    } else if (action === 'progresso') {
      const aluno = e.parameter.aluno || '';
      const turma = e.parameter.turma || '';
      resposta = obterProgressoAluno_(aluno, turma);
    } else {
      resposta = { erro: 'Ação desconhecida. Use ?action=conteudo ou ?action=progresso' };
    }

    return ContentService.createTextOutput(JSON.stringify(resposta))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ erro: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // O front-end envia Content-Type: text/plain de propósito, para evitar
    // o preflight CORS (OPTIONS) que o Apps Script não trata. Por isso
    // fazemos o parse manual do corpo aqui.
    const payload = JSON.parse(e.postData.contents);
    let resposta;

    if (payload.action === 'salvarProgresso') {
      resposta = salvarProgresso_(payload);
    } else {
      resposta = { erro: 'Ação desconhecida.' };
    }

    return ContentService.createTextOutput(JSON.stringify(resposta))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ erro: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
