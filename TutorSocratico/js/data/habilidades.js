export const ORDEM_SUGERIDA = [
  "EF.09.MAT.2.92",   // Produtos Notáveis
  "EF.09.MAT.2.93",   // Fatoração
  "EF.09.MAT.2.94",   // Simplificação
  "EF.09.MAT.3.100",  // Pitágoras
  "EF.09.MAT.3.101",  // Relações métricas
  "EF.09.MAT.3.99",   // Semelhança
  "EF.09.MAT.3.102",  // Tales
  "EF.09.MAT.2.96",  // Ângulos notáveis
  "EF.09.MAT.3.98"    // Circunferência
];

export const HABILIDADES = {
  "EF.09.MAT.2.92": { titulo: "Produtos Notáveis", status: "revisar", prioridade: 1, prerequisitos: [], descricao: "Reconhecer e calcular produtos notáveis." },
  "EF.09.MAT.2.93": { titulo: "Fatoração e Equação do 2º Grau", status: "revisar", prioridade: 2, prerequisitos: ["EF.09.MAT.2.92"], descricao: "Fatorar expressões algébricas." },
  "EF.09.MAT.2.94": { titulo: "Simplificação de Expressões", status: "revisar", prioridade: 3, prerequisitos: ["EF.09.MAT.2.93"], descricao: "Simplificar expressões algébricas." },
  "EF.09.MAT.3.101": { titulo: "Relações Métricas no Triângulo Retângulo", status: "novo", prioridade: 4, prerequisitos: ["EF.09.MAT.3.100"], descricao: "Calcular relações métricas no triângulo retângulo." },
  "EF.09.MAT.3.99": { titulo: "Semelhança de Triângulos", status: "novo", prioridade: 5, prerequisitos: [], descricao: "Reconhecer condições de semelhança entre triângulos." },
  "EF.09.MAT.3.102": { titulo: "Teorema de Tales", status: "novo", prioridade: 6, prerequisitos: ["EF.09.MAT.3.99"], descricao: "Aplicar o Teorema de Tales em problemas de proporcionalidade." },
  "EF.09.MAT.2.96": { titulo: "Ângulos Notáveis (30°, 45°, 60°)", status: "novo", prioridade: 7, prerequisitos: [], descricao: "Resolver problemas com razões trigonométricas." },
  "EF.09.MAT.3.98": { titulo: "Arcos e Ângulos da Circunferência", status: "novo", prioridade: 8, prerequisitos: [], descricao: "Calcular ângulos centrais e inscritos." },
  "EF.09.MAT.3.100": { titulo: "Teorema de Pitágoras", status: "novo", prioridade: 3.5, prerequisitos: [], descricao: "Relação algébrica e demonstração geométrica." }
};