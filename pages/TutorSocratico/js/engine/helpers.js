// Função para clonar objetos em profundidade
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Helper para criar opções de resposta
export function op(id, texto, proximo, feedback = "") {
  return { id, texto, proximo, feedback };
}

// Helper para criar uma etapa de escolha múltipla (agora aceita imagem opcional)
export function etapaEscolha(id, tutor, opcoes, tipo = "aprofundamento", imagem = null) {
  return { id, tipo, tutor, opcoes, imagem };
}

// Helper para criar uma etapa de avaliação final (agora aceita imagem opcional)
export function etapaAvaliacao(id, tutor, enunciado, opcoes, correta, explicacao, imagem = null) {
  return {
    id,
    tipo: "avaliacao",
    tutor,
    imagem, // Adicionado aqui
    questao: { enunciado, opcoes, correta, explicacao }
  };
}

// Helper para criar uma etapa de leitura/reflexão (apenas botão de continuar)
// Helper para criar uma etapa de leitura/reflexão (agora aceita imagem opcional)
export function etapaTexto(id, tutor, proximo, tipo = "reflexao", imagem = null) {
  return {
    id,
    tipo,
    tutor,
    imagem, // Adicionado aqui
    opcoes: [
      { id: 1, texto: "Entendido, continuar ➔", proximo, feedback: "Vamos seguir passo a passo." }
    ]
  };
}