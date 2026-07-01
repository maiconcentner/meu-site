import { ContentStore } from '../data/store.js';
import { deepClone, op, etapaEscolha, etapaTexto, etapaAvaliacao } from './helpers.js';

// Função de segurança caso uma habilidade ainda não tenha árvore mapeada
// na planilha (ex: o professor acabou de criar a linha em "Habilidades"
// mas ainda não escreveu os nós dela em "Nos"/"Opcoes").
function criarSessaoFallback(id) {
  const h = ContentStore.habilidades[id];
  return {
    id, titulo: h?.titulo || id, objetivo: h?.descricao || "Sessão de estudo.",
    etapas: [
      etapaEscolha("e1", `Vamos estudar ${h?.titulo || id}. Antes de começar, como se sente sobre este assunto?`, [
        op(1, "Tenho segurança.", "e2"), op(2, "Tenho alguma dúvida.", "e2"), op(3, "Estou a começar agora.", "e2")
      ], "escolha", null, false), // contaPontuacao = false: é diagnóstico, não conteúdo
      etapaTexto("e2", `O nosso plano será: identificar a ideia principal, testar um exemplo, observar um erro comum e fechar com uma verificação. O objetivo não é decorar, mas entender o 'porquê'.`, "e3"),
      etapaEscolha("e3", `Se tivesse que explicar este tema, o que seria mais importante: a regra pronta ou a relação entre as partes?`, [
        op(1, "A relação entre as partes.", "e4", "Excelente. Entender relações dá mais autonomia.", true),
        op(2, "A regra pronta.", "e4r", "A regra ajuda, mas vamos ver por que funciona.", false)
      ]),
      etapaTexto("e4r", `As regras são úteis, mas aprendemos melhor quando percebemos o padrão que as gerou. Vamos treinar isso.`, "e4"),
      etapaAvaliacao("e4", `Fechamento rápido:`, `Qual é a melhor postura para aprender ${h?.titulo || id}?`, [
        { id: 1, texto: "Decorar sem questionar." }, { id: 2, texto: "Observar padrões, testar ideias e justificar." }, { id: 3, texto: "Tentar adivinhar respostas." }
      ], 2, `O foco é raciocinar, justificar passos e aprender com os erros.`)
    ]
  };
}

export const SessionFactory = {
  getSession(id) {
    if (ContentStore.sessoes[id]) return deepClone(ContentStore.sessoes[id]);
    const fallback = criarSessaoFallback(id);
    ContentStore.sessoes[id] = fallback; // Guarda em cache de memória
    return deepClone(fallback);
  },
  createSessionState(id) {
    const sessao = this.getSession(id);
    return {
      habilidadeId: id, sessaoId: sessao.id, etapaAtualId: sessao.etapas[0].id,
      tentativasEtapa: 0, acertos: 0, erros: 0, pontuacao: 0,
      concluida: false, historico: [], iniciadaEm: new Date().toISOString()
    };
  }
};

export function generateAdaptiveSession(id) { return SessionFactory.createSessionState(id); }
export function getSessaoById(id) { return SessionFactory.getSession(id); }
export function getEtapaAtual(sessionState) {
  const sessao = getSessaoById(sessionState.habilidadeId);
  return sessao.etapas.find(e => e.id === sessionState.etapaAtualId);
}

/**
 * Avança a sessão para a próxima etapa.
 *
 * `opcaoSelecionada` é o objeto de opção que o aluno escolheu — precisa ter
 * `.proximo` e, opcionalmente, `.correta` (default true). `etapaAtual` é a
 * etapa de onde ele está saindo — precisa ter `.contaPontuacao` (default true).
 *
 * Antes essa função recebia um booleano `acertou` já calculado em outro lugar
 * (adivinhado a partir do nome do ID de destino). Agora a decisão vem de um
 * campo de dado explícito, então uma habilidade nova cadastrada na planilha
 * não depende de seguir nenhuma convenção de nomenclatura escondida.
 */
export function avancarPara(sessionState, opcaoSelecionada, etapaAtual) {
  const proximoId = opcaoSelecionada.proximo;
  const acertou = opcaoSelecionada.correta !== false;
  const contaPontuacao = etapaAtual?.contaPontuacao !== false;

  sessionState.historico.push({ etapaId: sessionState.etapaAtualId, proximoId, acertou, timestamp: new Date().toISOString() });

  if (contaPontuacao && proximoId !== 'fim') {
    if (acertou) sessionState.acertos += 1;
    else sessionState.erros += 1;
  }

  sessionState.etapaAtualId = proximoId;
  sessionState.tentativasEtapa = 0;

  const sessao = getSessaoById(sessionState.habilidadeId);
  const existe = sessao.etapas.some(e => e.id === proximoId);
  if (!existe || proximoId === 'fim') {
    sessionState.concluida = true;
    sessionState.finalizadaEm = new Date().toISOString();
  }
  return sessionState;
}

export function calcularPontuacao(sessionState) {
  const total = sessionState.acertos + sessionState.erros;
  if (total === 0) return 0;
  sessionState.pontuacao = Math.round((sessionState.acertos / total) * 100);
  return sessionState.pontuacao;
}

export function habilidadeDesbloqueada(habilidadeId, progresso) {
  const habilidade = ContentStore.habilidades[habilidadeId];
  if (!habilidade || !habilidade.prerequisitos || habilidade.prerequisitos.length === 0) return true;
  return habilidade.prerequisitos.every(pr => {
    const reg = progresso?.[pr];
    return reg && reg.status === 'concluido';
  });
}

export function sugerirProximaHabilidade(progresso = {}) {
  for (const id of ContentStore.ordemSugerida) {
    const reg = progresso[id];
    if (reg?.status === 'concluido') continue;
    if (habilidadeDesbloqueada(id, progresso)) return id;
  }
  return ContentStore.ordemSugerida[0];
}
