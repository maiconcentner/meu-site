import { HABILIDADES, ORDEM_SUGERIDA } from './legado/habilidades.js';
import { SESSOES } from './legado/sessoes.js';
import fs from 'fs';

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function toCsvRow(arr) { return arr.map(csvEscape).join(',') + '\r\n'; }

const ERRO_PADRAO = /(corrige|recupera|errado)/i;

// ---------------------------------------------------------------
// PASSO 1: uma ÚNICA transformação normalizada (fonte única de verdade).
// Tanto os CSVs (para Google Sheets) quanto o content-fallback.json
// (pacote local para o app funcionar offline/antes do Apps Script) são
// derivados DESTA MESMA estrutura, para nunca ficarem inconsistentes
// entre si.
// ---------------------------------------------------------------
const habilidadesNormalizadas = {};
const ordemComIndice = [];
Object.entries(HABILIDADES).forEach(([id, h]) => {
  habilidadesNormalizadas[id] = {
    titulo: h.titulo,
    descricao: h.descricao,
    prerequisitos: h.prerequisitos || [],
    prioridade: h.prioridade,
    status: h.status
  };
  ordemComIndice.push({ id, ordem: ORDEM_SUGERIDA.indexOf(id) });
});
ordemComIndice.sort((a, b) => a.ordem - b.ordem);
const ordemSugeridaNormalizada = ordemComIndice.map(o => o.id);

const sessoesNormalizadas = {};
let stats = { skills: 0, nos: 0, opcoes: 0, avaliacoes: 0 };

Object.entries(SESSOES).forEach(([habId, sessao]) => {
  stats.skills++;
  const etapasNormalizadas = [];

  sessao.etapas.forEach(etapa => {
    stats.nos++;

    if (etapa.tipo === 'avaliacao') {
      stats.avaliacoes++;
      const opcoesForm = etapa.questao.opcoes.map(o => ({ id: o.id, texto: o.texto }));
      etapasNormalizadas.push({
        id: etapa.id,
        tipo: 'avaliacao',
        contaPontuacao: true,
        tutor: etapa.tutor || '',
        imagem: etapa.imagem || null,
        questao: {
          enunciado: etapa.questao.enunciado,
          opcoes: opcoesForm,
          correta: etapa.questao.correta,
          explicacao: etapa.questao.explicacao
        }
      });
      stats.opcoes += opcoesForm.length;

    } else if (etapa.tipo === 'reflexao') {
      const opt = etapa.opcoes[0];
      etapasNormalizadas.push({
        id: etapa.id,
        tipo: 'mensagem',
        contaPontuacao: false,
        tutor: etapa.tutor || '',
        imagem: etapa.imagem || null,
        opcoes: [{ id: 1, texto: opt.texto, proximo: opt.proximo, correta: true, feedback: opt.feedback || '' }]
      });
      stats.opcoes++;

    } else {
      // 'pergunta_diagnostica' ou 'aprofundamento' (etapaEscolha)
      const contaPontuacao = etapa.tipo !== 'pergunta_diagnostica';
      const opcoesNormalizadas = etapa.opcoes.map((opt, i) => {
        stats.opcoes++;
        // Semântica IMPLÍCITA original (nome do nó de destino) tornada EXPLÍCITA:
        const correta = !ERRO_PADRAO.test(opt.proximo);
        return { id: i + 1, texto: opt.texto, proximo: opt.proximo, correta, feedback: opt.feedback || '' };
      });
      etapasNormalizadas.push({
        id: etapa.id,
        tipo: 'escolha',
        contaPontuacao,
        tutor: etapa.tutor || '',
        imagem: etapa.imagem || null,
        opcoes: opcoesNormalizadas
      });
    }
  });

  sessoesNormalizadas[habId] = {
    id: habId,
    titulo: habilidadesNormalizadas[habId]?.titulo || habId,
    etapas: etapasNormalizadas
  };
});

console.log('Normalização concluída:', JSON.stringify(stats, null, 2));

// ---------------------------------------------------------------
// PASSO 2a: content-fallback.json (consumido direto pelo ContentStore)
// ---------------------------------------------------------------
const fallback = {
  geradoEm: new Date().toISOString(),
  habilidades: habilidadesNormalizadas,
  ordemSugerida: ordemSugeridaNormalizada,
  sessoes: sessoesNormalizadas
};
fs.writeFileSync('/home/claude/projeto/js/data/content-fallback.json', JSON.stringify(fallback, null, 2));
console.log('content-fallback.json gerado com', Object.keys(sessoesNormalizadas).length, 'habilidades.');

// ---------------------------------------------------------------
// PASSO 2b: CSVs para importar nas abas do Google Sheets
// ---------------------------------------------------------------
let habCsv = toCsvRow(['id', 'titulo', 'descricao', 'prerequisitos', 'prioridade', 'status_inicial', 'ordem_sugerida']);
Object.entries(habilidadesNormalizadas).forEach(([id, h]) => {
  habCsv += toCsvRow([id, h.titulo, h.descricao, h.prerequisitos.join(';'), h.prioridade, h.status, ordemSugeridaNormalizada.indexOf(id)]);
});
fs.writeFileSync('/home/claude/projeto/migracao/habilidades.csv', habCsv);

let nosCsv = toCsvRow(['habilidade_id', 'no_id', 'tipo', 'conta_pontuacao', 'texto', 'imagem_url', 'enunciado', 'explicacao']);
let opcoesCsv = toCsvRow(['habilidade_id', 'no_id_origem', 'ordem', 'texto', 'no_id_destino', 'correta', 'feedback']);

Object.entries(sessoesNormalizadas).forEach(([habId, sessao]) => {
  sessao.etapas.forEach(etapa => {
    const enunciado = etapa.questao ? etapa.questao.enunciado : '';
    const explicacao = etapa.questao ? etapa.questao.explicacao : '';
    nosCsv += toCsvRow([habId, etapa.id, etapa.tipo, etapa.contaPontuacao ? 'TRUE' : 'FALSE', etapa.tutor, etapa.imagem || '', enunciado, explicacao]);

    if (etapa.tipo === 'avaliacao') {
      etapa.questao.opcoes.forEach(opt => {
        const correta = (opt.id === etapa.questao.correta) ? 'TRUE' : 'FALSE';
        opcoesCsv += toCsvRow([habId, etapa.id, opt.id, opt.texto, '', correta, '']);
      });
    } else {
      etapa.opcoes.forEach(opt => {
        const correta = etapa.tipo === 'mensagem' ? '' : (opt.correta ? 'TRUE' : 'FALSE');
        opcoesCsv += toCsvRow([habId, etapa.id, opt.id, opt.texto, opt.proximo, correta, opt.feedback]);
      });
    }
  });
});

fs.writeFileSync('/home/claude/projeto/migracao/nos.csv', nosCsv);
fs.writeFileSync('/home/claude/projeto/migracao/opcoes.csv', opcoesCsv);
console.log('CSVs gerados: habilidades.csv, nos.csv, opcoes.csv');
