// Função para clonar objetos em profundidade
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Helper para criar opções de resposta.
// IMPORTANTE: `correta` agora é um campo EXPLÍCITO (antes era inferido
// adivinhando se o texto do `proximo` continha "corrige"/"recupera"/"errado").
export function op(id, texto, proximo, feedback = "", correta = true) {
  return { id, texto, proximo, feedback, correta };
}

// Helper para criar uma etapa de escolha múltipla.
// `contaPontuacao` decide se os acertos/erros dessa etapa entram na nota da
// conversa (40% da pontuação final). Perguntas de diagnóstico/calibração
// devem usar contaPontuacao = false.
export function etapaEscolha(id, tutor, opcoes, tipo = "escolha", imagem = null, contaPontuacao = true) {
  return { id, tipo, tutor, opcoes, imagem, contaPontuacao };
}

// Helper para criar uma etapa de avaliação final (Desafio Final).
export function etapaAvaliacao(id, tutor, enunciado, opcoes, correta, explicacao, imagem = null) {
  return {
    id,
    tipo: "avaliacao",
    tutor,
    imagem,
    contaPontuacao: true, // pontuação tratada à parte (peso de 60% no score final)
    questao: { enunciado, opcoes, correta, explicacao }
  };
}

// Helper para criar uma etapa de leitura/reflexão (apenas botão de continuar).
// Nunca conta pontuação: só existe uma opção, não há "erro" possível.
export function etapaTexto(id, tutor, proximo, tipo = "mensagem", imagem = null) {
  return {
    id,
    tipo,
    tutor,
    imagem,
    contaPontuacao: false,
    opcoes: [
      { id: 1, texto: "Entendido, continuar ➔", proximo, feedback: "Vamos seguir passo a passo.", correta: true }
    ]
  };
}
