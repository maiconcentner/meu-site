document.addEventListener('DOMContentLoaded', function() {

    // --- 0. SEGURANÇA E UX ---
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag])
        );
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const styleFix = document.createElement('style');
    styleFix.innerHTML = `
        .action-icon-btn { 
            position: relative; 
            z-index: 10; 
            transition: all 0.2s ease !important; 
        }
        .action-icon-btn:hover { 
            background-color: var(--border-focus) !important; 
            transform: scale(1.15) !important; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(styleFix);

    // --- 1. SELEÇÃO DOS ELEMENTOS DO DOM ---
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn'); 
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn'); 
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); 
    const downloadDeclarationBtn = document.getElementById('download-declaration-btn');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const syncPromptsBtn = document.getElementById('sync-prompts-btn');
    const promptsTbody = document.getElementById('prompts-tbody');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const createPromptBtn = document.getElementById('create-prompt-btn'); 
    const searchPromptsInput = document.getElementById('search-prompts');
    const filterType = document.getElementById('filter-type'); 
    const sortPrompts = document.getElementById('sort-prompts'); 

    const statTotalPrompts = document.getElementById('stat-total-prompts');
    const statTopPhase = document.getElementById('stat-top-phase');
    const statTopIa = document.getElementById('stat-top-ia');
    const importBackupBtn = document.getElementById('import-backup-btn');
    const exportBackupBtn = document.getElementById('export-backup-btn');
    const importBackupFile = document.getElementById('import-backup-file');

    const promptViewModal = document.getElementById('prompt-view-modal');
    const closeViewModalBtn = document.getElementById('close-view-modal-btn');
    const viewModalTitle = document.getElementById('view-modal-title');
    const editPromptId = document.getElementById('edit-prompt-id');
    const editPromptTipo = document.getElementById('edit-prompt-tipo');
    const editPromptNome = document.getElementById('edit-prompt-nome');
    const editPromptIa = document.getElementById('edit-prompt-ia');
    const editPromptTags = document.getElementById('edit-prompt-tags');
    const editPromptObjetivo = document.getElementById('edit-prompt-objetivo');
    const editPromptTexto = document.getElementById('edit-prompt-texto');
    
    const modalCopyBtn = document.getElementById('modal-copy-btn');
    const modalCopyGenericBtn = document.getElementById('modal-copy-generic-btn');
    const modalDeleteBtn = document.getElementById('modal-delete-btn');
    const modalEditBtn = document.getElementById('modal-edit-btn');
    const modalSaveBtn = document.getElementById('modal-save-btn');
    const toastNotification = document.getElementById('toast-notification'); 

    const variableModal = document.getElementById('variable-modal');
    const closeVariableModalBtn = document.getElementById('close-variable-modal-btn');
    const variableInputsContainer = document.getElementById('variable-inputs-container');
    const confirmVariableCopyBtn = document.getElementById('confirm-variable-copy-btn');

    const floatingFeedbackBtn = document.getElementById('floating-feedback-btn');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const formFeedback = document.getElementById('form-feedback');
    const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
    const feedbackStatusMsg = document.getElementById('feedback-status-msg');

    const fileUploadInput = document.getElementById('file-upload');
    const uploadStatus = document.getElementById('upload-status');
    const fileUploadStyle = document.getElementById('file-upload-style'); 
    const uploadStatusStyle = document.getElementById('upload-status-style'); 

    const categorySelect = document.getElementById('prompt-category');
    const phaseContainer = document.getElementById('phase-container');
    const phaseSelect = document.getElementById('research-phase');
    
    const protocolContainer = document.getElementById('protocol-container');
    const protocolSelect = document.getElementById('research-protocol');
    const personaSelect = document.getElementById('academic-persona');
    const courseSelect = document.getElementById('course');
    const outputFormatSelect = document.getElementById('output-format'); 
    const researchProblemTextarea = document.getElementById('research-problem');
    const chapterThemeInput = document.getElementById('chapter-theme');
    const baseReferencesTextarea = document.getElementById('base-references');
    const charCounter = document.getElementById('char-counter'); 
    const fewShotTextarea = document.getElementById('few-shot-examples'); 
    const cotCheckbox = document.getElementById('chain-of-thought');
    const stepBackCheckbox = document.getElementById('step-back-abstraction'); 
    const iterativeCheckbox = document.getElementById('iterative-interaction');
    const generatedPromptTextarea = document.getElementById('generated-prompt');
    const parameterHintDiv = document.getElementById('parameter-hint'); 

    // --- DICIONÁRIO DE DADOS (4 CATEGORIAS DISTINTAS) ---
    const BANCO_DE_PROMPTS = {
        "Artigo Científico e Pesquisa": {
            "ideacao": { 
                nome: "Fase 1: Ideação e Estruturação (Problema e Objetivos)",
                instrucaoBase: "Analisar o problema de pesquisa proposto. Sugerir refinamentos lógicos. Formular possíveis objetivos gerais e específicos. Levantar hipóteses baseando-se estritamente nas variáveis.", 
                exigeProtocolo: false, 
                calibragemSimulada: "Pensamento divergente e heurístico. Explore conexões conceituais inusitadas.", 
                dicaUI: "💡 Dica: Configure a Temperature entre 0.7 e 0.8." 
            },
            "busca": { 
                nome: "Fase 2: Levantamento Bibliográfico (Uso no Perplexity/Copilot)",
                instrucaoBase: "Atuar como um assistente de pesquisa com acesso à internet. Buscar artigos revisados por pares. Extrair: Título, Autor(es), Ano, Resumo e Link direto/DOI.", 
                exigeProtocolo: true, 
                calibragemSimulada: "Rigor investigativo extremo. Precisão é inegociável.", 
                dicaUI: "🚨 ATENÇÃO: Cole no Perplexity AI (Modo Pro) ou Copilot." 
            },
            "rsl": { 
                nome: "Fase 3: Revisão de Literatura (Extração de textos)",
                instrucaoBase: "Extrair os objetivos, metodologia, amostragem e conclusões das referências. Sintetizar convergências e divergências.", 
                exigeProtocolo: true, 
                calibragemSimulada: "Pensamento estritamente convergente. Nível de criatividade ZERO.", 
                dicaUI: "💡 Dica: Configure a Temperature para 0.0." 
            },
            "metodologia": { 
                nome: "Fase 4: Metodologia e Coleta de Dados",
                instrucaoBase: "Avaliar abordagem metodológica. Estruturar proposta de desenho experimental aplicável ao problema.", 
                exigeProtocolo: false, 
                calibragemSimulada: "Foque na viabilidade técnica, reprodutibilidade e rigor epistemológico.", 
                dicaUI: "💡 Dica: Utilize Temperature baixa (0.1 a 0.2)." 
            },
            "escrita": { 
                nome: "Fase 5: Escrita Argumentativa e Discussão",
                instrucaoBase: "Redigir texto acadêmico focado no tema. Usar paráfrase indireta complexa.", 
                exigeProtocolo: false, 
                calibragemSimulada: "Equilíbrio entre precisão factual e fluidez retórica.", 
                dicaUI: "💡 Dica: Ideal é Temperature em torno de 0.3 a 0.4." 
            },
            "revisao": { 
                nome: "Fase 6: Revisão, Adequação e Resumo (Abstract)",
                instrucaoBase: "Revisar criticamente o texto. Eliminar clichês e redundâncias. Otimizar coesão.", 
                exigeProtocolo: false, 
                calibragemSimulada: "Filtro de otimização sintática. Densidade informacional alta.", 
                dicaUI: "💡 Dica: Mantenha a Temperature baixa (0.2)." 
            }
        },
        "Memorial de Formação e Prática": {
            "memorial_intro": {
                nome: "Fase A: Introdução (Autobiografia)",
                instrucaoBase: "Redigir a introdução de um Memorial de Formação. Adote obrigatoriamente a primeira pessoa do singular (Eu). Descreva a minha trajetória pessoal e profissional de forma fluida. Estruture o texto para apresentar sutilmente como as etapas seguintes do documento estão organizadas.",
                exigeProtocolo: false,
                calibragemSimulada: "Tom reflexivo, autobiográfico e engajador, focando no desenvolvimento pessoal.",
                dicaUI: "💡 Dica: Preencha as 'Referências Base' com tópicos rápidos sobre sua vida e carreira."
            },
            "memorial_desc_tarefa": {
                nome: "Fase B: Descrição de Tarefa (Unidade Curricular)",
                instrucaoBase: "Descrever detalhadamente uma tarefa realizada. Apresente o objetivo pedagógico e relate, em primeira pessoa, o processo de realização na prática.",
                exigeProtocolo: false,
                calibragemSimulada: "Tom descritivo e objetivo, focado na transposição didática do que foi executado.",
                dicaUI: "💡 Dica: No campo 'Tema Específico', coloque o nome da Tarefa executada."
            },
            "memorial_reflexao": {
                nome: "Fase C: Reflexão Fundamentada (O coração do Módulo)",
                instrucaoBase: "Redigir uma profunda reflexão fundamentada. Articule a minha vivência prática com os referenciais teóricos. Discuta analiticamente como os conteúdos impactaram o meu conhecimento.",
                exigeProtocolo: false,
                calibragemSimulada: "Alta densidade teórica aliada à reflexão empírica em primeira pessoa.",
                dicaUI: "💡 Dica: Cole os trechos dos autores estudados nas 'Referências Base'."
            },
            "memorial_sintese_modulo": {
                nome: "Fase D: Síntese de Módulo (Considerações Gerais)",
                instrucaoBase: "Analisar a minha trajetória formativa ao longo de todo o módulo estudado e redigir uma síntese das reflexões acerca da mudança na prática docente.",
                exigeProtocolo: false,
                calibragemSimulada: "Tom analítico e integrador conectando as experiências.",
                dicaUI: "💡 Dica: Resuma os principais aprendizados do módulo nas referências."
            },
            "memorial_in_loco": {
                nome: "Fase E: Formação In Loco (Relato Prático de Campo)",
                instrucaoBase: "Relatar a experiência vivenciada na escola. Estruture o texto em primeira pessoa contemplando a descrição exata, a evidência gerada e a reflexão sobre a aplicabilidade em sala.",
                exigeProtocolo: false,
                calibragemSimulada: "Tom empírico, imersivo e voltado para a aplicação prática.",
                dicaUI: "💡 Dica: Relate como os alunos reagiram na vida real nas 'Referências Base'."
            },
            "memorial_final": {
                nome: "Fase F: Considerações Finais (Expectativas x Resultados)",
                instrucaoBase: "Redigir o encerramento do Memorial. Sintetize em primeira pessoa os aspectos mais relevantes do meu desenvolvimento e trace perspectivas futuras.",
                exigeProtocolo: false,
                calibragemSimulada: "Tom conclusivo, inspirador e prospectivo.",
                dicaUI: "💡 Dica: Liste suas expectativas iniciais nas referências, a IA fará o resto."
            }
        },
        "Planejamento de Aulas (Tradicional)": {
            "plan_padrao_objetivos": {
                nome: "Fase 1: Alinhamento de Objetivos e BNCC",
                instrucaoBase: "Analisar o componente curricular proposto. Mapear as habilidades da BNCC e estruturar os objetivos gerais e específicos desdobrados através dos níveis da Taxonomia de Bloom.",
                exigeProtocolo: false,
                calibragemSimulada: "Rigor instrucional normativo e alinhamento pedagógico preciso.",
                dicaUI: "💡 Dica: Use uma Temperature moderada (0.4 a 0.5) para alinhar à BNCC."
            },
            "plan_padrao_didatica": {
                nome: "Fase 2: Sequência Didática Ativa",
                instrucaoBase: "Construir uma sequência didática em 3 momentos: Introdução (engajamento), Desenvolvimento (atividades orientadas) e Conclusão (sistematização). Sugira metodologias ativas compatíveis.",
                exigeProtocolo: false,
                calibragemSimulada: "Criatividade didática, clareza operacional e foco no protagonismo.",
                dicaUI: "💡 Dica: Suba a Temperature (0.6 a 0.7) para metodologias criativas."
            },
            "plan_padrao_avaliacao": {
                nome: "Fase 3: Avaliação e Recursos",
                instrucaoBase: "Determinar os recursos didáticos e estruturar o processo de avaliação formativa, indicando critérios de sucesso claros e propostas de rubricas.",
                exigeProtocolo: false,
                calibragemSimulada: "Visão diagnóstica, clareza métrica e avaliação inclusiva.",
                dicaUI: "💡 Dica: Mantenha a Temperature baixa (0.2) para critérios realistas."
            }
        },
        "Planejamento de Aulas (Reverso)": {
            "reverso_fase1": {
                nome: "Fase 1: Identificar Resultados Desejados (BNCC e Metas)",
                instrucaoBase: "A partir dos metadados e do contexto fornecidos, mapear as competências e habilidades da BNCC para o componente curricular indicado. Formule os resultados essenciais de aprendizagem e as 'Perguntas Essenciais' duradouras da unidade.",
                exigeProtocolo: false,
                calibragemSimulada: "Visão no objetivo final (Backward Design de Wiggins & McTighe).",
                dicaUI: "💡 Dica: A Fase 1 foca em CLAREAR aonde os alunos precisam chegar no final da etapa."
            },
            "reverso_fase2": {
                nome: "Fase 2: Determinar Evidências (Avaliações SESI/Formativa)",
                instrucaoBase: "Com base nas habilidades fornecidas, estruturar o que servirá de evidência aceitável de que o aprendizado ocorreu. Especifique avaliações formativas, projetos, fichas de erro ou modelos de avaliação somativa (ex: padrão AvaliaSESI) adequadas à unidade.",
                exigeProtocolo: false,
                calibragemSimulada: "Foco analítico em métricas de avaliação educacional e rubricas.",
                dicaUI: "💡 Dica: Cole informações específicas de avaliações da escola no último campo."
            },
            "reverso_fase3": {
                nome: "Fase 3: Planejar Experiências de Aprendizagem (Rotina)",
                instrucaoBase: "Usando os metadados (Duração e Número de Aulas), projete um roteiro progressivo das aulas. Foque em indicar qual conteúdo didático, páginas de livro ou metodologias ativas devem ser aplicadas em cada semana para preparar o aluno para a avaliação definida na Fase 2.",
                exigeProtocolo: false,
                calibragemSimulada: "Organização cronológica rigorosa e transposição didática aplicável.",
                dicaUI: "💡 Dica: A IA fará um esqueleto lógico para validar sua estratégia de tempo."
            },
            "reverso_txt": {
                nome: "Fase 4: GERAR PLANO COMPLETO FORMATADO (.txt)",
                instrucaoBase: "Atue como um Especialista em Planejamento Reverso. A partir dos metadados fornecidos e da análise obrigatória do arquivo PDF/documento anexado a este chat (contendo o livro ou lista de exercícios base), você deve ORQUESTRAR E GERAR O PLANO DE AULA COMPLETO.\n\nREGRAS DE FORMATAÇÃO ESTRITA:\n1. O plano DEVE CLONAR RIGOROSAMENTE A ESTRUTURA VISUAL fornecida em <style_examples>.\n2. Mantenha o Cabeçalho intacto preenchendo as variáveis de contexto.\n3. Estruture a rotina exatamente com as tags: 'Semanas', 'Aulas', '> Objetivo:', '> Livro:', '> Atividade extra:', '> Espaço:' e '> Destaque/Dica:'.\n4. Inclua a seção final 'OBSERVAÇÕES FINAIS' formatada conforme o modelo.\n5. Você deve extrair temas/exercícios do documento anexo para preencher o plano com precisão técnica.\n6. A saída deve ser entregue em 'raw text' plano, pronto para cópia como .txt.",
                exigeProtocolo: false,
                calibragemSimulada: "Precisão cirúrgica na clonagem do template visual e distribuição lógica de carga horária.",
                dicaUI: "🚨 IMPORTANTE: Suba o seu PDF no Perplexity. E cole um arquivo .txt de exemplo antigo na caixa 'Exemplos de Estilo'!"
            }
        }
    };

    // --- DICIONÁRIO DA INTERFACE (PASSO 2 CUSTOMIZADO PARA CADA CATEGORIA) ---
    const UI_DINAMICA_PASSO2 = {
        "Artigo Científico e Pesquisa": {
            niveisLabel: "Nível da Pesquisa",
            niveis: [
                {val: "Artigo Científico", text: "Artigo Científico"},
                {val: "Dissertação de Mestrado", text: "Dissertação de Mestrado"},
                {val: "Tese de Doutorado", text: "Tese de Doutorado"},
                {val: "Monografia / TCC", text: "Monografia / TCC"}
            ],
            problemaLabel: "Problema de Pesquisa / Pergunta Central",
            problemaPlaceholder: "Qual a principal lacuna que sua pesquisa busca preencher?",
            temaLabel: "Tema Específico (Capítulo/Seção atual)",
            temaPlaceholder: "Ex: Metodologia de Coleta, Introdução, Discussão dos Resultados",
            refLabel: "Área de Referências Base <span style='color:red'>*</span>",
            refPlaceholder: "REGRAS ANTIALUCINAÇÃO: Cole aqui resumos ou dados reais.",
            personas: [
                {val: "phd_experiente", text: "PhD com 40 anos de experiência na área"},
                {val: "metodologista", text: "Especialista em Metodologia Científica"},
                {val: "revisor_critico", text: "Revisor Crítico de Artigos (Blind Reviewer)"},
                {val: "escritor_avancado", text: "Escritor Científico Avançado (Paráfrase Indireta)"}
            ]
        },
        "Memorial de Formação e Prática": {
            niveisLabel: "Nível da Formação / Documento",
            niveis: [
                {val: "Memorial de Especialização (Pós-Graduação)", text: "Memorial de Especialização (Pós-Graduação)"},
                {val: "Memorial Formativo / Descritivo", text: "Memorial Formativo / Descritivo"},
                {val: "Relatório de Prática Docente", text: "Relatório de Prática Docente"}
            ],
            problemaLabel: "Objetivo Central / Foco da Reflexão",
            problemaPlaceholder: "Ex: Relatar a aplicação da Tarefa X e como isso mudou minha visão sobre frações.",
            temaLabel: "Nome da Tarefa / Unidade Curricular",
            temaPlaceholder: "Ex: Tarefa Preliminar UC01, Reflexão do Módulo I",
            refLabel: "Área de Relatos, Evidências e Teoria <span style='color:red'>*</span>",
            refPlaceholder: "Cole aqui suas anotações de aula, como os alunos reagiram, ou citações dos textos lidos.",
            personas: [
                {val: "professor_reflexivo", text: "Professor Pesquisador (Foco Prático/Reflexivo)"},
                {val: "escritor_autobiografico", text: "Escritor Autobiográfico (Foco Narrativo Pessoal)"}
            ]
        },
        "Planejamento de Aulas (Tradicional)": {
            niveisLabel: "Segmento Escolar / Ano",
            niveis: [
                {val: "Educação Infantil", text: "Educação Infantil"},
                {val: "Ensino Fundamental I", text: "Ensino Fundamental I (1º ao 5º ano)"},
                {val: "Ensino Fundamental II", text: "Ensino Fundamental II (6º ao 9º ano)"},
                {val: "Ensino Médio", text: "Ensino Médio"},
                {val: "Ensino Superior / Técnico", text: "Ensino Superior / Técnico"}
            ],
            problemaLabel: "Objetivos Gerais da Aula e Foco Principal",
            problemaPlaceholder: "Ex: Desenvolver a compreensão de frações equivalentes através de representações visuais.",
            temaLabel: "Componente Curricular e Objeto de Conhecimento",
            temaPlaceholder: "Ex: Matemática - Introdução às Frações",
            refLabel: "Diretrizes Pedagógicas, Recursos e Observações <span style='color:red'>*</span>",
            refPlaceholder: "Cole aqui as diretrizes da escola, rascunhos de atividades ou páginas do livro didático.",
            personas: [
                {val: "designer_pedagogico", text: "Designer Instrucional / Especialista em Didática"},
                {val: "professor_mentor", text: "Professor Mentor (Foco em Regência e Engajamento)"}
            ]
        },
        "Planejamento de Aulas (Reverso)": {
            niveisLabel: "Modalidade / Turma",
            niveis: [
                {val: "Ensino Fundamental II (6º ao 9º ano)", text: "Ensino Fundamental II (6º ao 9º ano)"},
                {val: "Ensino Médio", text: "Ensino Médio"},
                {val: "Educação Infantil", text: "Educação Infantil"},
                {val: "Ensino Fundamental I", text: "Ensino Fundamental I"},
                {val: "Ensino Superior / Técnico", text: "Ensino Superior / Técnico"}
            ],
            problemaLabel: "Metadados (Etapa, Unidade, Duração, Nº de Aulas)",
            problemaPlaceholder: "Ex: Etapa 2, Unidade 5, 05/05 a 29/05, 16 aulas.",
            temaLabel: "Componente Curricular e Unidade Temática",
            temaPlaceholder: "Ex: Matemática - Trigonometria no Triângulo Retângulo",
            refLabel: "Competências, Habilidades (BNCC) e Orientações de Avaliação <span style='color:red'>*</span>",
            refPlaceholder: "Cole aqui as marcações (ex: EF.09.MAT.2.96), as avaliações que deseja aplicar (ex: AvaliaSESI) e as observações finais.",
            personas: [
                {val: "designer_reverso", text: "Especialista em Backward Design (Wiggins & McTighe)"},
                {val: "designer_pedagogico", text: "Designer Instrucional / Especialista em Didática"}
            ]
        }
    };

    const descricoesPersonas = {
        "phd_experiente": "PhD Sênior com 40 anos de experiência acadêmica na área, rigor metodológico.",
        "metodologista": "Especialista em Metodologia Científica com foco na validade do desenho de pesquisa.",
        "revisor_critico": "Revisor Crítico de Periódico (Blind Reviewer) implacável na detecção de falhas lógicas.",
        "escritor_avancado": "Editor Científico Chefe especializado em redação de alto impacto.",
        "professor_reflexivo": "Professor da Educação Básica refletindo profundamente sobre sua prática pedagógica e transposição didática, usando obrigatoriamente a primeira pessoa.",
        "escritor_autobiografico": "Autor especialista em memoriais, narrativas de vida e trajetórias de formação.",
        "designer_pedagogico": "Designer Instrucional Sênior, especialista em metodologias ativas e engenharia de sequências didáticas alinhadas à BNCC.",
        "professor_mentor": "Professor Mentor especialista em gestão de sala de aula e regência aplicada.",
        "designer_reverso": "Designer Instrucional especializado no método Backward Design (Wiggins e McTighe), focando implacavelmente na definição das evidências de avaliação antes de estruturar a rotina das aulas."
    };

    // --- ARQUITETURA DE DOMÍNIOS ---
    // Fonte única de verdade sobre "o que é cada tipo de trabalho". Usado para:
    // 1) Gerar tags de histórico com sentido (em vez de "histórico, artigo" genérico);
    // 2) Adaptar os rótulos do modal de Edição/Visualização da Biblioteca;
    // 3) Adaptar os nomes das variáveis no motor de "Copiar como Template".
    // Isso evita ter a mesma checagem (isMemorial/isTradicional/isReverso) repetida
    // em vários lugares do código, e torna trivial adicionar um novo domínio no futuro.
    const DOMAIN_SCHEMAS = {
        artigo: {
            tagKey: 'artigo',
            label: 'Artigo Científico',
            icon: '📄',
            objetivoLabel: 'Problema de Pesquisa / Pergunta Central',
            objetivoPlaceholder: 'Qual a principal lacuna que sua pesquisa busca preencher?',
            varProblema: 'Problema de Pesquisa',
            varTema: 'Tema Específico',
            varRef: 'Referências Base'
        },
        memorial: {
            tagKey: 'memorial',
            label: 'Memorial de Formação',
            icon: '📖',
            objetivoLabel: 'Objetivo Central do Relato',
            objetivoPlaceholder: 'Ex: Refletir sobre minha trajetória nesta unidade curricular.',
            varProblema: 'Objetivo Central',
            varTema: 'Nome da Tarefa',
            varRef: 'Relatos e Evidências'
        },
        plan_tradicional: {
            tagKey: 'planejamento-tradicional',
            label: 'Planejamento Tradicional',
            icon: '🏫',
            objetivoLabel: 'Objetivos Gerais da Aula e Foco Principal',
            objetivoPlaceholder: 'Ex: Desenvolver a compreensão de frações equivalentes.',
            varProblema: 'Objetivos e Foco Principal',
            varTema: 'Componente Curricular',
            varRef: 'Diretrizes Pedagógicas'
        },
        plan_reverso: {
            tagKey: 'planejamento-reverso',
            label: 'Planejamento Reverso',
            icon: '🔄',
            objetivoLabel: 'Metadados (Duração e Nº de Aulas)',
            objetivoPlaceholder: 'Ex: Etapa 2, Unidade 5, 16 aulas, de 05/05 a 29/05.',
            varProblema: 'Metadados (Duração e Aulas)',
            varTema: 'Unidade Temática',
            varRef: 'Habilidades BNCC e Avaliações'
        },
        personalizado: {
            tagKey: 'personalizado',
            label: 'Personalizado',
            icon: '✨',
            objetivoLabel: 'Objetivo',
            objetivoPlaceholder: 'Descreva o objetivo principal deste prompt.',
            varProblema: 'Problema de Pesquisa',
            varTema: 'Tema Específico',
            varRef: 'Referências Base'
        }
    };

    // Detecta o domínio de um prompt a partir das suas tags (string "memorial, fase a" etc.)
    function detectDomain(tagsString) {
        const t = (tagsString || '').toLowerCase();
        if (t.includes('memorial')) return DOMAIN_SCHEMAS.memorial;
        if (t.includes('tradicional')) return DOMAIN_SCHEMAS.plan_tradicional;
        if (t.includes('reverso')) return DOMAIN_SCHEMAS.plan_reverso;
        if (t.includes('artigo')) return DOMAIN_SCHEMAS.artigo;
        return DOMAIN_SCHEMAS.personalizado;
    }

    // Converte o texto "Artigo Científico e Pesquisa" / "Memorial de Formação e Prática" / etc.
    // (vindo do <select> de categoria) para a chave correspondente em DOMAIN_SCHEMAS.
    function domainFromCategoryText(categoryText) {
        const t = (categoryText || '').toLowerCase();
        if (t.includes('memorial')) return DOMAIN_SCHEMAS.memorial;
        if (t.includes('tradicional')) return DOMAIN_SCHEMAS.plan_tradicional;
        if (t.includes('reverso')) return DOMAIN_SCHEMAS.plan_reverso;
        if (t.includes('artigo')) return DOMAIN_SCHEMAS.artigo;
        return DOMAIN_SCHEMAS.personalizado;
    }

    // Atualiza o "crachá" de tipo + o rótulo/placeholder do campo Objetivo dentro do
    // modal de Edição/Visualização da Biblioteca, de acordo com o domínio detectado.
    function applyDomainToEditModal(domain) {
        const badge = document.getElementById('edit-modal-domain-badge');
        if (badge) badge.innerHTML = `<span aria-hidden="true">${domain.icon}</span> ${domain.label}`;

        const objetivoLabelEl = document.querySelector('label[for="edit-prompt-objetivo"]');
        if (objetivoLabelEl) objetivoLabelEl.textContent = domain.objetivoLabel;
        if (editPromptObjetivo) editPromptObjetivo.placeholder = domain.objetivoPlaceholder;
    }

    // --- 1.1 INICIALIZAÇÃO DOS MENUS EM CASCATA E DA UI DINÂMICA ---
    function initCascadingDropdowns() {
        if (!categorySelect) return;
        
        categorySelect.innerHTML = '<option value="" disabled selected>Primeiro, selecione a categoria...</option>';
        Object.keys(BANCO_DE_PROMPTS).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            phaseSelect.innerHTML = '<option value="" disabled selected>Agora, selecione a etapa...</option>';
            
            if (selectedCategory && BANCO_DE_PROMPTS[selectedCategory]) {
                const phases = BANCO_DE_PROMPTS[selectedCategory];
                
                Object.keys(phases).forEach(phaseKey => {
                    const option = document.createElement('option');
                    option.value = phaseKey;
                    option.textContent = phases[phaseKey].nome;
                    phaseSelect.appendChild(option);
                });
                
                phaseContainer.classList.remove('hidden');

                const ui = UI_DINAMICA_PASSO2[selectedCategory];
                if (ui) {
                    const labelCurso = document.querySelector('label[for="course"]');
                    if(labelCurso) labelCurso.innerHTML = ui.niveisLabel;
                    
                    courseSelect.innerHTML = '';
                    ui.niveis.forEach(n => {
                        const opt = document.createElement('option');
                        opt.value = n.val;
                        opt.textContent = n.text;
                        courseSelect.appendChild(opt);
                    });
                    courseSelect.selectedIndex = 0; 

                    const labelProblema = document.querySelector('label[for="research-problem"]');
                    if (labelProblema) labelProblema.innerHTML = ui.problemaLabel;
                    researchProblemTextarea.placeholder = ui.problemaPlaceholder;

                    const labelTema = document.querySelector('label[for="chapter-theme"]');
                    if (labelTema) labelTema.innerHTML = ui.temaLabel;
                    chapterThemeInput.placeholder = ui.temaPlaceholder;

                    const labelRef = document.querySelector('label[for="base-references"]');
                    if (labelRef) labelRef.innerHTML = ui.refLabel;
                    baseReferencesTextarea.placeholder = ui.refPlaceholder;

                    personaSelect.innerHTML = '';
                    ui.personas.forEach(p => {
                        const opt = document.createElement('option');
                        opt.value = p.val;
                        opt.textContent = p.text;
                        personaSelect.appendChild(opt);
                    });
                    personaSelect.selectedIndex = 0; 
                }

            } else {
                phaseContainer.classList.add('hidden');
                protocolContainer.classList.add('hidden');
            }
            
            phaseSelect.value = "";
            protocolContainer.classList.add('hidden');
            protocolSelect.value = 'nenhum';
        });

        phaseSelect.addEventListener('change', function() {
            const selectedCategory = categorySelect.value;
            const selectedPhase = this.value;
            
            if (selectedCategory && selectedPhase) {
                const rule = BANCO_DE_PROMPTS[selectedCategory][selectedPhase];
                if (rule && rule.exigeProtocolo) {
                    protocolContainer.classList.remove('hidden');
                } else {
                    protocolContainer.classList.add('hidden');
                    protocolSelect.value = 'nenhum';
                }
            }
        });
    }

    initCascadingDropdowns();

    // --- 1.15 GERADOR DE DECLARAÇÃO METODOLÓGICA (ABNT PERSONALIZADA) ---
    const declarationModal = document.getElementById('declaration-modal');
    const closeDeclarationModalBtn = document.getElementById('close-declaration-modal-btn');
    const confirmDeclarationBtn = document.getElementById('confirm-declaration-btn');
    const declAuthorInput = document.getElementById('decl-author-name');
    const declInstitutionInput = document.getElementById('decl-institution');
    const declAiToolInput = document.getElementById('decl-ai-tool');
    const declScopeInput = document.getElementById('decl-scope');

    if(downloadDeclarationBtn && declarationModal) {
        downloadDeclarationBtn.addEventListener('click', function() {
            declarationModal.classList.remove('hidden');
            setTimeout(() => { const f = declarationModal.querySelector('input, textarea, button'); if(f) f.focus(); }, 50);
        });
    }
    if(closeDeclarationModalBtn) closeDeclarationModalBtn.addEventListener('click', () => declarationModal.classList.add('hidden'));

    if(confirmDeclarationBtn) {
        confirmDeclarationBtn.addEventListener('click', function(e) {
            const autor = (declAuthorInput && declAuthorInput.value.trim()) || '';
            const instituicao = (declInstitutionInput && declInstitutionInput.value.trim()) || '';
            const ferramentaIA = (declAiToolInput && declAiToolInput.value.trim()) || '[Inserir o nome da IA utilizada]';
            const escopo = (declScopeInput && declScopeInput.value.trim()) || 'revisão gramatical, estruturação de tópicos e refinamento retórico';
            const formato = document.querySelector('input[name="decl-format"]:checked');
            const usarDocx = formato && formato.value === 'docx';

            if (usarDocx) {
                gerarDocxDeclaracao(autor, instituicao, ferramentaIA, escopo);
                declarationModal.classList.add('hidden');
                return;
            }

            // Formato .txt (padrão)
            const hoje = new Date();
            const dataAcesso = hoje.toLocaleDateString('pt-BR');
            const anoAtual = hoje.getFullYear();

            const declaracaoTexto = `DECLARAÇÃO METODOLÓGICA DE USO DE INTELIGÊNCIA ARTIFICIAL\n\nEm conformidade com as diretrizes éticas do COPE (Committee on Publication Ethics) e recomendações da APA (American Psychological Association), eu, ${autor}${instituicao ? ` (${instituicao})` : ''}, declaro que o uso de ferramentas de Inteligência Artificial (IA) neste trabalho ocorreu estritamente sob os seguintes parâmetros:\n\n1. ESCOPO DE UTILIZAÇÃO:\nA IA foi utilizada exclusivamente como ferramenta de processamento de linguagem natural para ${escopo}, não figurando como autora ou coautora de nenhuma seção deste trabalho.\n\n2. ORIGEM DOS DADOS (ANTI-ALUCINAÇÃO):\nTodo o conteúdo factual, dados primários, referenciais teóricos e conclusões inseridos nos prompts são de autoria intelectual e/ou fruto de pesquisa empírica prévia conduzida pelo próprio pesquisador. A IA não gerou dados, metodologias ou citações de forma autônoma.\n\n3. REVISÃO HUMANA:\nO resultado gerado pela ferramenta foi submetido a escrutínio crítico, revisão de precisão e readequação de estilo pelo pesquisador, que assume a responsabilidade integral pelo conteúdo final apresentado.\n\n4. FERRAMENTA(S) UTILIZADA(S):\n- Plataforma de Engenharia de Prompt Acadêmica (Sobre Exatas) para estruturação metodológica das requisições.\n- Modelo(s) de Linguagem: ${ferramentaIA}.\n\nCITAÇÃO RECOMENDADA (ABNT):\nGERMANO, Maicon Centner. Plataforma de Engenharia de Prompt Acadêmica. Sobre Exatas, Jaú, ${anoAtual}. Disponível em: <https://www.sobrexatas.com.br>. Acesso em: ${dataAcesso}.\n\n_________________________________________\n${autor}\n${instituicao ? instituicao + '\n' : ''}${dataAcesso}\n`;

            const blob = new Blob([declaracaoTexto], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Declaracao_Uso_IA_${autor.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            declarationModal.classList.add('hidden');
            window.showToast("📄 Declaração personalizada baixada com sucesso!");
        });
    }

    // --- 1.5 SISTEMA DE NOTIFICAÇÃO TOAST ---
    window.showToast = function(message) {
        if(!toastNotification) return;
        toastNotification.textContent = message;
        toastNotification.classList.remove('hidden');
        
        setTimeout(() => toastNotification.classList.add('show'), 10);
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
            setTimeout(() => toastNotification.classList.add('hidden'), 300); 
        }, 3000);
    };

    // --- 1.6 LÓGICA DE ABAS ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            const targetContent = document.getElementById(button.dataset.target);
            if(targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
                // Move o foco para o primeiro elemento interativo da aba,
                // para que usuários de teclado/leitor de tela não fiquem presos na navbar.
                const firstFocusable = targetContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
            }
        });

        // Navegação por setas entre abas (padrão WAI-ARIA Tabs Pattern)
        button.addEventListener('keydown', (e) => {
            const idx = [...tabButtons].indexOf(button);
            if (e.key === 'ArrowRight') { e.preventDefault(); tabButtons[(idx + 1) % tabButtons.length].click(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length].click(); }
        });
    });

    // --- 1.7 MOTOR DE VARIÁVEIS INTELIGENTES E CÓPIA GENÉRICA ---
    let pendingCopyText = "";

    window.makePromptGeneric = function(text, tags = "") {
        const domain = detectDomain(tags);
        const { varProblema, varTema, varRef } = domain;

        let genericText = text;
        genericText = genericText.replace(/(<research_problem>)(.*?)(<\/research_problem>)/gs, `$1\n{{${varProblema}}}\n$3`);
        genericText = genericText.replace(/(<current_section_theme>)(.*?)(<\/current_section_theme>)/gs, `$1\n{{${varTema}}}\n$3`);
        genericText = genericText.replace(/(\[INÍCIO DOS DADOS PRIMÁRIOS - ÚNICA FONTE DE VERDADE\]\n)(.*?)(\n\[FIM DOS DADOS PRIMÁRIOS\])/gs, `$1{{${varRef}}}$3`);
        genericText = genericText.replace(/(")(.*?)("\n<\/style_examples>)/gs, '$1{{Exemplos de Estilo (Obrigatorio no Reverso)}}$3');
        return genericText;
    };

    window.copyToClipboard = function(text) {
        const regex = /{{([^}]+)}}/g;
        const variables = [...new Set(Array.from(text.matchAll(regex), m => m[1]))];

        if (variables.length > 0 && variableModal) {
            pendingCopyText = text;
            variableInputsContainer.innerHTML = '';
            
            variables.forEach(v => {
                let isTextarea = (
                    v.includes('Referências') || 
                    v.includes('Problema') || 
                    v.includes('Estilo') ||
                    v.includes('Relatos') ||
                    v.includes('Diretrizes') ||
                    v.includes('Habilidades BNCC')
                );
                
                variableInputsContainer.innerHTML += `
                    <label style="display:block; margin-top:15px; font-weight:600; color:var(--text-primary); font-size:0.9rem;">${v}</label>
                    ${isTextarea 
                        ? `<textarea class="var-input" data-var="${v}" placeholder="Cole aqui o seu(ua) ${v}..." rows="3" style="width:100%; padding:10px; border-radius:6px; border:1px solid var(--border-light); background:var(--input-bg); color:var(--text-primary); margin-top:5px; font-family:'Poppins', sans-serif; resize:vertical;"></textarea>`
                        : `<input type="text" class="var-input" data-var="${v}" placeholder="Digite o seu(ua) ${v}..." style="width:100%; padding:10px; border-radius:6px; border:1px solid var(--border-light); background:var(--input-bg); color:var(--text-primary); margin-top:5px; font-family:'Poppins', sans-serif;">`
                    }
                `;
            });
            variableModal.classList.remove('hidden');
            setTimeout(() => { const f = variableModal.querySelector('input, textarea, button'); if(f) f.focus(); }, 50);
            
            setTimeout(() => {
                const firstInput = document.querySelector('.var-input');
                if(firstInput) firstInput.focus();
            }, 100);
        } else {
            executeCopy(text);
        }
    };

    function executeCopy(text) {
        navigator.clipboard.writeText(text).then(() => {
            window.showToast("✅ Prompt copiado para a área de transferência!");
        });
    }

    if(closeVariableModalBtn) closeVariableModalBtn.addEventListener('click', () => variableModal.classList.add('hidden'));

    if(confirmVariableCopyBtn) {
        confirmVariableCopyBtn.addEventListener('click', () => {
            let finalText = pendingCopyText;
            const inputs = document.querySelectorAll('.var-input');
            
            inputs.forEach(input => {
                const varValue = input.value.trim() || `[${input.getAttribute('data-var')} NÃO PREENCHIDO]`; 
                const varName = input.getAttribute('data-var');
                const regexReplace = new RegExp(`{{${varName}}}`, 'g');
                finalText = finalText.replace(regexReplace, varValue);
            });
            
            executeCopy(finalText);
            variableModal.classList.add('hidden');
            
            if(modalCopyBtn && !promptViewModal.classList.contains('hidden')) {
                const originalText = modalCopyBtn.innerHTML;
                modalCopyBtn.innerHTML = '✅ Copiado!';
                setTimeout(() => modalCopyBtn.innerHTML = originalText, 2000);
            }
        });
    }

    // --- 2. LÓGICA DO GERENCIADOR DE PROMPTS E ANALYTICS ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzS7AUmnHVyoYQM1XKfm9LCj3qW2xPv3jiZV--mNKfDt5SfGksYkGOwPEfdcVC8Ver_fw/exec';
    
    let globalPromptsCache = []; 
    let allPrompts = []; 

    function updateDashboard() {
        if(!statTotalPrompts) return;
        const localPrompts = JSON.parse(localStorage.getItem('academic_local_prompts')) || [];
        
        statTotalPrompts.textContent = localPrompts.length;

        const labelCard2 = statTopPhase ? statTopPhase.nextElementSibling : null;
        const labelCard3 = statTopIa ? statTopIa.nextElementSibling : null;

        if(localPrompts.length === 0) {
            if(statTopPhase) statTopPhase.textContent = '-';
            if(statTopIa) statTopIa.textContent = '-';
            if(labelCard2) labelCard2.textContent = 'Foco de Produção';
            if(labelCard3) labelCard3.textContent = 'Etapa Mais Usada';
            return;
        }

        let contagemArtigo = 0;
        let contagemMemorial = 0;
        let contagemPlanejamento = 0;
        const phaseCounts = {};

        const nomesCurtosFases = {
            "Artigo - Fase 1": "Ideação",
            "Artigo - Fase 2": "Levantamento",
            "Artigo - Fase 3": "Revisão Lit.",
            "Artigo - Fase 4": "Metodologia",
            "Artigo - Fase 5": "Escrita Arg.",
            "Artigo - Fase 6": "Revisão Final",
            "Memorial - Fase A": "Introdução",
            "Memorial - Fase B": "Desc. Tarefa",
            "Memorial - Fase C": "Reflexão Fund.",
            "Memorial - Fase D": "Síntese Mód.",
            "Memorial - Fase E": "Prática In Loco",
            "Memorial - Fase F": "Consid. Finais",
            "Plan. Tradicional - Fase 1": "Tradicional: Objetivos",
            "Plan. Tradicional - Fase 2": "Tradicional: Seq. Didática",
            "Plan. Tradicional - Fase 3": "Tradicional: Avaliação",
            "Plan. Reverso - Fase 1": "Reverso: BNCC",
            "Plan. Reverso - Fase 2": "Reverso: Evidências",
            "Plan. Reverso - Fase 3": "Reverso: Rotina",
            "Plan. Reverso - Fase 4": "Plano Reverso (.txt)"
        };

        localPrompts.forEach(p => {
            let nomeStr = p.nome || "";
            let categoryPrefix = "Personalizado";

            if (nomeStr.includes('[Memorial]')) {
                contagemMemorial++;
                categoryPrefix = "Memorial";
            } else if (nomeStr.includes('[Artigo]')) {
                contagemArtigo++;
                categoryPrefix = "Artigo";
            } else if (nomeStr.includes('[Plan. Tradicional]')) {
                contagemPlanejamento++;
                categoryPrefix = "Plan. Tradicional";
            } else if (nomeStr.includes('[Plan. Reverso]')) {
                contagemPlanejamento++;
                categoryPrefix = "Plan. Reverso";
            }
            
            let phase = "Personalizado";
            if(nomeStr.includes('] ')) {
                let textoAposColchete = nomeStr.split('] ')[1]; 
                let faseExtraida = textoAposColchete.split(':')[0].trim(); 
                let chaveCombinada = `${categoryPrefix} - ${faseExtraida}`;
                phase = nomesCurtosFases[chaveCombinada] || faseExtraida;
            } else if(p.tags) {
                let tag = p.tags.split(',')[0].trim();
                phase = tag;
            }

            phaseCounts[phase] = (phaseCounts[phase] || 0) + 1;
        });

        const totalCategorizados = contagemArtigo + contagemMemorial + contagemPlanejamento;
        if (totalCategorizados > 0) {
            const max = Math.max(contagemArtigo, contagemMemorial, contagemPlanejamento);
            if (max === contagemMemorial) {
                statTopPhase.textContent = `${Math.round((contagemMemorial/totalCategorizados)*100)}% Memorial`;
            } else if (max === contagemArtigo) {
                statTopPhase.textContent = `${Math.round((contagemArtigo/totalCategorizados)*100)}% Artigo`;
            } else {
                statTopPhase.textContent = `${Math.round((contagemPlanejamento/totalCategorizados)*100)}% Planos`;
            }
        } else {
            statTopPhase.textContent = "Personalizado";
        }
        if(labelCard2) labelCard2.textContent = 'Foco de Produção';

        const topPhase = Object.keys(phaseCounts).reduce((a, b) => phaseCounts[a] > phaseCounts[b] ? a : b);
        statTopIa.textContent = topPhase;
        if(labelCard3) labelCard3.textContent = 'Etapa Mais Usada';
    }

    async function loadAllPrompts(syncCloud = false) {
        const syncBanner = document.getElementById('sync-status-banner');
        if (promptsTbody && syncCloud) {
            promptsTbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Sincronizando com a Nuvem... ⏳</td></tr>';
            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, { method: "GET" });
                if (response.ok) {
                    const result = await response.json();
                    if(result.status === 'sucesso') {
                        globalPromptsCache = result.dados;
                        if (syncBanner) syncBanner.classList.add('hidden');
                    } else {
                        throw new Error('Resposta da nuvem sem status de sucesso.');
                    }
                } else {
                    throw new Error('HTTP ' + response.status);
                }
            } catch (err) {
                console.warn("Nuvem inacessível no momento, carregando apenas locais:", err);
                if (syncBanner) syncBanner.classList.remove('hidden');
                window.showToast("⚠️ Não foi possível conectar à nuvem. Mostrando apenas seus prompts locais.");
            }
        }

        const localPrompts = JSON.parse(localStorage.getItem('academic_local_prompts')) || [];
        allPrompts = [...globalPromptsCache, ...localPrompts];
        
        applyFiltersAndSort(); 
        updateDashboard(); 
    }

    function applyFiltersAndSort() {
        if(!promptsTbody) return;
        let filtered = [...allPrompts];
        
        const term = searchPromptsInput ? searchPromptsInput.value.toLowerCase() : '';
        const type = filterType ? filterType.value : 'todos';
        const sort = sortPrompts ? sortPrompts.value : 'recentes';

        if(term) {
            filtered = filtered.filter(p => 
                (p.nome && p.nome.toLowerCase().includes(term)) || 
                (p.objetivo && p.objetivo.toLowerCase().includes(term)) || 
                (p.tags && p.tags.toLowerCase().includes(term))
            );
        }

        if(type !== 'todos') filtered = filtered.filter(p => p.tipo === type);

        if(sort === 'az') filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        else if (sort === 'za') filtered.sort((a, b) => b.nome.localeCompare(a.nome));

        renderLibrary(filtered);
    }

    function renderLibrary(promptsToRender) {
        if(!promptsTbody) return;
        promptsTbody.innerHTML = '';
        
        if (promptsToRender.length === 0) {
            promptsTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: var(--text-secondary);">Nenhum prompt encontrado com estes filtros.</td></tr>';
            return;
        }

        promptsToRender.forEach(p => {
            const row = document.createElement('tr');
            row.style.cursor = 'pointer';
            row.title = "Clique para visualizar este prompt";
            
            row.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    window.openPromptModal(p.id);
                }
            });

            const listaTags = p.tags ? p.tags.split(',').map(t => `<span class="tag-chip">#${escapeHTML(t.trim())}</span>`).join('') : '';

            let botoesAcao = '';
            if (p.tipo === 'global') {
                botoesAcao = `
                    <button class="action-icon-btn" title="Visualizar" onclick="event.stopPropagation(); window.openPromptModal('${p.id}')">👁️</button>
                    <button class="action-icon-btn" title="Clonar para Editar" onclick="event.stopPropagation(); window.clonePrompt('${p.id}')">🔄</button>
                    <button class="action-icon-btn" title="Copiar Original" onclick="event.stopPropagation(); window.copyPromptById('${p.id}', false)">📋</button>
                    <button class="action-icon-btn" title="Copiar como Template" onclick="event.stopPropagation(); window.copyPromptById('${p.id}', true)">🪄</button>
                    <button class="action-icon-btn" title="Compartilhar no WhatsApp" onclick="event.stopPropagation(); window.sharePrompt('${p.id}')">💬</button>
                `;
            } else {
                botoesAcao = `
                    <button class="action-icon-btn" title="Editar Localmente" onclick="event.stopPropagation(); window.editPrompt('${p.id}')">✏️</button>
                    <button class="action-icon-btn" title="Excluir" onclick="event.stopPropagation(); window.deletePrompt('${p.id}')">🗑️</button>
                    <button class="action-icon-btn" title="Copiar Original" onclick="event.stopPropagation(); window.copyPromptById('${p.id}', false)">📋</button>
                    <button class="action-icon-btn" title="Copiar como Template" onclick="event.stopPropagation(); window.copyPromptById('${p.id}', true)">🪄</button>
                    <button class="action-icon-btn" title="Compartilhar no WhatsApp" onclick="event.stopPropagation(); window.sharePrompt('${p.id}')">💬</button>
                `;
            }

            row.innerHTML = `
                <td><span class="badge badge-${p.tipo}">${p.tipo}</span></td>
                <td><strong>${escapeHTML(p.nome)}</strong></td>
                <td>${escapeHTML(p.objetivo)}</td>
                <td><span class="ia-chip">${escapeHTML(p.ia_recomendada)}</span></td>
                <td>${listaTags}</td>
                <td>${p.data_atualizacao}</td>
                <td style="white-space: nowrap;">${botoesAcao}</td>
            `;
            promptsTbody.appendChild(row);
        });
    }

    window.copyPromptById = function(id, isGeneric) {
        const p = allPrompts.find(x => String(x.id) === String(id));
        if(!p) return;
        const finalPromptText = isGeneric ? window.makePromptGeneric(p.prompt_texto, p.tags) : p.prompt_texto;
        window.copyToClipboard(finalPromptText);
    };

    window.sharePrompt = function(promptId) {
        const p = allPrompts.find(x => String(x.id) === String(promptId));
        if(!p) return;
        const message = `🎓 *Plataforma Sobre Exatas - Prompt Acadêmico*\n\n*Nome:* ${p.nome}\n*Objetivo:* ${p.objetivo}\n\n*O Prompt:*\n${p.prompt_texto}\n\n🔗 _Acesse: https://www.sobrexatas.com.br_`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
    };

    if(searchPromptsInput) searchPromptsInput.addEventListener('input', debounce(applyFiltersAndSort, 300));
    if(filterType) filterType.addEventListener('change', applyFiltersAndSort);
    if(sortPrompts) sortPrompts.addEventListener('change', applyFiltersAndSort);
    if(syncPromptsBtn) syncPromptsBtn.addEventListener('click', () => loadAllPrompts(true));

    // --- FUNÇÕES DE EXPORTAR E IMPORTAR BACKUP (JSON) ---
    if(exportBackupBtn) {
        exportBackupBtn.addEventListener('click', () => {
            const backupData = {
                version: "1.0",
                date: new Date().toISOString(),
                local_prompts: JSON.parse(localStorage.getItem('academic_local_prompts')) || [],
                context: {
                    problem: localStorage.getItem('academic_problem') || "",
                    theme: localStorage.getItem('academic_theme') || "",
                    course: localStorage.getItem('academic_course') || "",
                    references: localStorage.getItem('academic_references') || "",
                    fewshot: localStorage.getItem('academic_fewshot') || ""
                }
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = `Backup_SobreExatas_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.showToast("📤 Backup exportado com sucesso!");
        });
    }

    if(importBackupBtn && importBackupFile) {
        importBackupBtn.addEventListener('click', () => importBackupFile.click());

        importBackupFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(!file) return;

            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    if(data.local_prompts && Array.isArray(data.local_prompts)) {
                        localStorage.setItem('academic_local_prompts', JSON.stringify(data.local_prompts));
                    }
                    
                    if(data.context) {
                        if(data.context.problem) localStorage.setItem('academic_problem', data.context.problem);
                        if(data.context.theme) localStorage.setItem('academic_theme', data.context.theme);
                        if(data.context.course) localStorage.setItem('academic_course', data.context.course);
                        if(data.context.references) localStorage.setItem('academic_references', data.context.references);
                        if(data.context.fewshot) localStorage.setItem('academic_fewshot', data.context.fewshot);
                        
                        if(researchProblemTextarea) researchProblemTextarea.value = data.context.problem;
                        if(chapterThemeInput) chapterThemeInput.value = data.context.theme;
                        if(courseSelect) courseSelect.value = data.context.course;
                        if(baseReferencesTextarea) baseReferencesTextarea.value = data.context.references;
                        if(fewShotTextarea) fewShotTextarea.value = data.context.fewshot;
                    }

                    loadAllPrompts(false); 
                    window.showToast("📥 Backup restaurado com sucesso!");
                } catch(err) {
                    alert("Erro ao ler o arquivo de backup. Verifique se é um arquivo JSON válido do Sobre Exatas.");
                    console.error(err);
                } finally {
                    importBackupFile.value = ''; 
                }
            };
            reader.readAsText(file);
        });
    }

    // --- MODAL DE PROMPTS (AÇÕES DE EDITAR/CLONAR/EXCLUIR) ---
    function toggleModalEditMode(isEditing) {
        const inputs = [editPromptNome, editPromptIa, editPromptTags, editPromptObjetivo, editPromptTexto];
        inputs.forEach(input => {
            if (isEditing) {
                input.removeAttribute('readonly');
                input.style.border = "1px solid var(--border-focus)";
                input.style.backgroundColor = "var(--input-bg)";
            } else {
                input.setAttribute('readonly', 'true');
                input.style.border = "1px solid var(--border-light)";
                input.style.backgroundColor = "var(--bg-main)";
            }
        });

        if(isEditing) {
            modalEditBtn.classList.add('hidden');
            modalSaveBtn.classList.remove('hidden');
        } else {
            modalEditBtn.classList.remove('hidden');
            modalSaveBtn.classList.add('hidden');
        }
    }

    window.openPromptModal = function(promptId) {
        const p = allPrompts.find(x => String(x.id) === String(promptId));
        if(!p) return;
        editPromptId.value = p.id;
        editPromptTipo.value = p.tipo;
        editPromptNome.value = p.nome;
        editPromptIa.value = p.ia_recomendada;
        editPromptTags.value = p.tags;
        editPromptObjetivo.value = p.objetivo;
        editPromptTexto.value = p.prompt_texto;
        applyDomainToEditModal(detectDomain(p.tags));
        
        if (p.tipo === 'global') {
            viewModalTitle.textContent = 'Prompt Global (Somente Leitura)';
            modalDeleteBtn.classList.add('hidden');
            modalEditBtn.classList.add('hidden');
        } else {
            viewModalTitle.textContent = 'Meu Prompt Local';
            modalDeleteBtn.classList.remove('hidden');
            modalEditBtn.classList.remove('hidden');
        }
        
        toggleModalEditMode(false);
        promptViewModal.classList.remove('hidden');
        // Foco automático: o primeiro elemento interativo do modal recebe foco
        // ao abrir, para que Tab/Shift-Tab funcionem corretamente a partir daí.
        setTimeout(() => { const f = promptViewModal.querySelector('button, input, textarea, select'); if(f) f.focus(); }, 50);
    };

    if(modalEditBtn) {
        modalEditBtn.addEventListener('click', () => {
            viewModalTitle.textContent = 'Editando Meu Prompt Local';
            toggleModalEditMode(true);
        });
    }

    window.clonePrompt = function(promptId) {
        const p = allPrompts.find(x => String(x.id) === String(promptId));
        if(!p) return;
        editPromptId.value = 'local_clone_' + Date.now();
        editPromptTipo.value = 'local';
        editPromptNome.value = p.nome + ' (Cópia)';
        editPromptIa.value = p.ia_recomendada;
        editPromptTags.value = p.tags;
        editPromptObjetivo.value = p.objetivo;
        editPromptTexto.value = p.prompt_texto;
        applyDomainToEditModal(detectDomain(p.tags));
        
        viewModalTitle.textContent = 'Clonando Prompt... (Salvará como Local)';
        modalDeleteBtn.classList.add('hidden');
        
        toggleModalEditMode(true);
        promptViewModal.classList.remove('hidden');
    };

    window.editPrompt = function(promptId) {
        const p = allPrompts.find(x => String(x.id) === String(promptId));
        if(!p) return;
        editPromptId.value = p.id;
        editPromptTipo.value = p.tipo;
        editPromptNome.value = p.nome;
        editPromptIa.value = p.ia_recomendada;
        editPromptTags.value = p.tags;
        editPromptObjetivo.value = p.objetivo;
        editPromptTexto.value = p.prompt_texto;
        applyDomainToEditModal(detectDomain(p.tags));
        
        viewModalTitle.textContent = 'Editando Meu Prompt Local';
        modalDeleteBtn.classList.remove('hidden');
        
        toggleModalEditMode(true);
        promptViewModal.classList.remove('hidden');
    };

    window.deletePrompt = function(promptId) {
        if(confirm("Tem certeza que deseja EXCLUIR permanentemente este prompt?")) {
            let localPrompts = JSON.parse(localStorage.getItem('academic_local_prompts')) || [];
            localPrompts = localPrompts.filter(p => String(p.id) !== String(promptId));
            localStorage.setItem('academic_local_prompts', JSON.stringify(localPrompts));
            
            window.showToast("🗑️ Prompt excluído com sucesso!");
            loadAllPrompts(false); 
        }
    };

    if(modalSaveBtn) {
        modalSaveBtn.addEventListener('click', () => {
            const id = editPromptId.value;
            let localPrompts = JSON.parse(localStorage.getItem('academic_local_prompts')) || [];
            const index = localPrompts.findIndex(p => String(p.id) === String(id));

            const promptData = {
                id: id,
                nome: editPromptNome.value || 'Sem Nome',
                ia_recomendada: editPromptIa.value,
                tags: editPromptTags.value,
                objetivo: editPromptObjetivo.value,
                prompt_texto: editPromptTexto.value,
                tipo: 'local',
                data_atualizacao: new Date().toLocaleDateString('pt-BR')
            };

            if (index > -1) {
                localPrompts[index] = promptData; 
            } else {
                localPrompts.unshift(promptData); 
            }

            localStorage.setItem('academic_local_prompts', JSON.stringify(localPrompts));
            window.showToast("💾 Salvo na Biblioteca Local com sucesso!");
            promptViewModal.classList.add('hidden');
            
            loadAllPrompts(false);
        });
    }

    if(modalDeleteBtn) {
        modalDeleteBtn.addEventListener('click', () => {
            window.deletePrompt(editPromptId.value);
            promptViewModal.classList.add('hidden');
        });
    }

    if(createPromptBtn) {
        createPromptBtn.addEventListener('click', () => {
            createPromptBtn.classList.remove('hidden'); 
            
            viewModalTitle.textContent = "Criar Novo Prompt Manual";
            editPromptId.value = 'local_manual_' + Date.now();
            editPromptTipo.value = 'local';
            
            editPromptNome.value = '';
            editPromptIa.value = 'ChatGPT / Claude';
            editPromptTags.value = 'personalizado';
            editPromptObjetivo.value = '';
            editPromptTexto.value = '';
            applyDomainToEditModal(DOMAIN_SCHEMAS.personalizado);
            
            modalDeleteBtn.classList.add('hidden'); 
            toggleModalEditMode(true);
            promptViewModal.classList.remove('hidden');
        });
    }

    if (editPromptTags) {
        editPromptTags.addEventListener('input', () => applyDomainToEditModal(detectDomain(editPromptTags.value)));
    }

    if(closeViewModalBtn) closeViewModalBtn.addEventListener('click', () => promptViewModal.classList.add('hidden'));
    
    if(modalCopyBtn) {
        modalCopyBtn.addEventListener('click', () => {
            window.copyToClipboard(editPromptTexto.value);
        });
    }

    if(modalCopyGenericBtn) {
        modalCopyGenericBtn.addEventListener('click', () => {
            const genericText = window.makePromptGeneric(editPromptTexto.value, editPromptTags.value);
            window.copyToClipboard(genericText);
        });
    }

    window.addEventListener('click', (event) => {
        if (promptViewModal && event.target === promptViewModal) promptViewModal.classList.add('hidden');
        if (variableModal && event.target === variableModal) variableModal.classList.add('hidden');
        if (feedbackModal && event.target === feedbackModal) feedbackModal.classList.add('hidden');
        if (declarationModal && event.target === declarationModal) declarationModal.classList.add('hidden');
    });

    if(exportExcelBtn) {
        exportExcelBtn.addEventListener('click', () => {
            if (allPrompts.length === 0) return alert("Não há prompts para exportar.");
            
            const excelData = allPrompts.map(p => ({
                "ID do Sistema": p.id,
                "Origem": p.tipo === 'global' ? 'Nuvem' : 'Local',
                "Nome do Prompt": p.nome,
                "Objetivo (Problema)": p.objetivo,
                "IA Recomendada": p.ia_recomendada,
                "Tags": p.tags,
                "Data de Atualização": p.data_atualizacao,
                "Texto do Prompt": p.prompt_texto
            }));

            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Meus Prompts");
            XLSX.writeFile(wb, "Biblioteca_SobreExatas.xlsx");
            
            window.showToast("⬇️ Tabela baixada com sucesso!");
        });
    }

    // --- EXPORTAR BIBLIOTECA EM .DOCX ---
    // Gera um documento Word real (HTML Word ML) sem depender de biblioteca externa.
    // Compatível com Microsoft Word, LibreOffice e Google Docs (via upload).
    function gerarDocxPrompts(prompts) {
        if (!prompts || prompts.length === 0) return alert("Não há prompts para exportar.");

        const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const linhas = prompts.map(p => `
            <h2 style="font-family:Arial;font-size:13pt;color:#1A3A6B;">${esc(p.nome)}</h2>
            <table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial;font-size:10pt;">
              <tr><td width="160" style="background:#f0f4ff;font-weight:bold;">Tipo</td><td>${esc(p.tipo === 'global' ? 'Nuvem / Global' : 'Local')}</td></tr>
              <tr><td style="background:#f0f4ff;font-weight:bold;">Objetivo</td><td>${esc(p.objetivo)}</td></tr>
              <tr><td style="background:#f0f4ff;font-weight:bold;">IA Recomendada</td><td>${esc(p.ia_recomendada)}</td></tr>
              <tr><td style="background:#f0f4ff;font-weight:bold;">Tags</td><td>${esc(p.tags)}</td></tr>
              <tr><td style="background:#f0f4ff;font-weight:bold;">Atualizado em</td><td>${esc(p.data_atualizacao)}</td></tr>
            </table>
            <p style="font-family:Courier New,monospace;font-size:9pt;background:#f9f9f9;padding:8pt;border:1pt solid #ccc;white-space:pre-wrap;">${esc(p.prompt_texto)}</p>
            <br style="page-break-after:avoid;">
        `).join('<hr style="border:1pt solid #1A3A6B;margin:20pt 0;">');

        const html = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="UTF-8">
            <title>Biblioteca Sobre Exatas</title>
            <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom></w:WordDocument></xml><![endif]-->
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: Arial, sans-serif; font-size: 11pt; }
                h1 { font-size: 16pt; color: #1A3A6B; border-bottom: 2pt solid #1A3A6B; padding-bottom: 6pt; }
            </style>
            </head>
            <body>
            <h1>📚 Biblioteca de Prompts — Sobre Exatas</h1>
            <p style="color:#555;font-size:9pt;">Exportado em ${new Date().toLocaleString('pt-BR')} · ${prompts.length} prompt(s)</p>
            ${linhas}
            </body></html>`;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Biblioteca_SobreExatas_${new Date().toLocaleDateString('pt-BR').replace(/\//g,'-')}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        window.showToast("📄 Biblioteca exportada como Word (.doc) com sucesso!");
    }

    // Exportar declaração em DOCX também
    function gerarDocxDeclaracao(autor, instituicao, ferramentaIA, escopo) {
        const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const hoje = new Date();
        const dataAcesso = hoje.toLocaleDateString('pt-BR');
        const anoAtual = hoje.getFullYear();

        const html = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="UTF-8">
            <title>Declaração de Uso de IA</title>
            <style>
                @page { size: A4; margin: 3cm; }
                body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; }
                h1 { font-size: 14pt; text-align: center; text-transform: uppercase; font-weight: bold; }
                h2 { font-size: 11pt; text-transform: uppercase; font-weight: bold; margin-top: 16pt; }
                .abnt { font-family: "Courier New", monospace; font-size: 10pt; background: #f0f0f0; padding: 8pt; border-left: 3pt solid #1A3A6B; }
                .assinatura { margin-top: 40pt; border-top: 1pt solid #000; width: 60%; }
            </style>
            </head><body>
            <h1>Declaração Metodológica de Uso de Inteligência Artificial</h1>
            <br>
            <p>Em conformidade com as diretrizes éticas do COPE (<i>Committee on Publication Ethics</i>) e recomendações da APA (<i>American Psychological Association</i>), eu, <strong>${esc(autor)}</strong>${instituicao ? ` (${esc(instituicao)})` : ''}, declaro que o uso de ferramentas de Inteligência Artificial (IA) neste trabalho ocorreu estritamente sob os seguintes parâmetros:</p>

            <h2>1. Escopo de Utilização</h2>
            <p>A IA foi utilizada exclusivamente como ferramenta de processamento de linguagem natural para ${esc(escopo)}, não figurando como autora ou coautora de nenhuma seção deste trabalho.</p>

            <h2>2. Origem dos Dados (Anti-Alucinação)</h2>
            <p>Todo o conteúdo factual, dados primários, referenciais teóricos e conclusões inseridos nos prompts são de autoria intelectual e/ou fruto de pesquisa empírica prévia conduzida pelo próprio pesquisador. A IA não gerou dados, metodologias ou citações de forma autônoma.</p>

            <h2>3. Revisão Humana</h2>
            <p>O resultado gerado pela ferramenta foi submetido a escrutínio crítico, revisão de precisão e readequação de estilo pelo pesquisador, que assume a responsabilidade integral pelo conteúdo final apresentado.</p>

            <h2>4. Ferramenta(s) Utilizada(s)</h2>
            <p>— Plataforma de Engenharia de Prompt Acadêmica (<i>Sobre Exatas</i>) para estruturação metodológica das requisições.<br>
            — Modelo(s) de Linguagem: <strong>${esc(ferramentaIA)}</strong>.</p>

            <h2>Citação Recomendada (ABNT)</h2>
            <p class="abnt">GERMANO, Maicon Centner. <strong>Plataforma de Engenharia de Prompt Acadêmica</strong>. Sobre Exatas, Jaú, ${anoAtual}. Disponível em: &lt;https://www.sobrexatas.com.br&gt;. Acesso em: ${dataAcesso}.</p>

            <br><br>
            <div class="assinatura">
                <p>${esc(autor)}<br>${instituicao ? esc(instituicao) + '<br>' : ''}${dataAcesso}</p>
            </div>
            </body></html>`;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Declaracao_Uso_IA_${autor.replace(/\s+/g,'_')}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        window.showToast("📄 Declaração gerada em Word (.doc) com sucesso!");
    }

    // Botão de exportar biblioteca em Word (injeta na área de ações da biblioteca)
    const exportDocxBtn = document.getElementById('export-docx-btn');
    if (exportDocxBtn) {
        exportDocxBtn.addEventListener('click', () => gerarDocxPrompts(allPrompts));
    }

    // --- 3. LÓGICA DE TEMA (DARK/LIGHT MODE) ---
    // Padrão: Modo Escuro nativo. Se o usuário nunca escolheu nada neste navegador,
    // respeitamos a preferência do sistema operacional; só caímos para o claro
    // se o sistema explicitamente preferir "light".
    const savedTheme = localStorage.getItem('academic-prompt-theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const shouldStartDark = savedTheme ? (savedTheme === 'dark') : !systemPrefersLight;

    if (shouldStartDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<span aria-hidden="true">☀️</span> Modo Claro';
    } else {
        themeToggleBtn.innerHTML = '<span aria-hidden="true">🌓</span> Modo Escuro';
    }

    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('academic-prompt-theme', 'light');
            themeToggleBtn.innerHTML = '<span aria-hidden="true">🌓</span> Modo Escuro';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('academic-prompt-theme', 'dark');
            themeToggleBtn.innerHTML = '<span aria-hidden="true">☀️</span> Modo Claro';
        }
    });

    // --- 4. AUTO-SALVAMENTO E RESTAURAÇÃO COMPLETA DO ESTADO ---
    // Antes só textos eram restaurados ao recarregar a página; os selects (Categoria,
    // Fase, Persona, Formato, Protocolo) e os checkboxes voltavam ao padrão, perdendo
    // o contexto. Agora restauramos tudo, respeitando a ordem de dependência: a
    // Categoria precisa disparar 'change' primeiro (ela é quem popula as opções de
    // Fase e os rótulos dinâmicos do Passo 2) antes de aplicarmos os demais valores.
    function restoreFullFormState() {
        const savedCategory = localStorage.getItem('academic_category');
        const savedPhase = localStorage.getItem('academic_phase');
        const savedProtocol = localStorage.getItem('academic_protocol');
        const savedPersona = localStorage.getItem('academic_persona');
        const savedCourse = localStorage.getItem('academic_course');
        const savedOutputFormat = localStorage.getItem('academic_output_format');
        const savedCot = localStorage.getItem('academic_cot');
        const savedStepBack = localStorage.getItem('academic_stepback');
        const savedIterative = localStorage.getItem('academic_iterative');

        if (researchProblemTextarea && localStorage.getItem('academic_problem')) researchProblemTextarea.value = localStorage.getItem('academic_problem');
        if (chapterThemeInput && localStorage.getItem('academic_theme')) chapterThemeInput.value = localStorage.getItem('academic_theme');
        if (baseReferencesTextarea && localStorage.getItem('academic_references')) baseReferencesTextarea.value = localStorage.getItem('academic_references');
        if (fewShotTextarea && localStorage.getItem('academic_fewshot')) fewShotTextarea.value = localStorage.getItem('academic_fewshot');

        if (savedCategory && categorySelect && categorySelect.querySelector(`option[value="${CSS.escape(savedCategory)}"]`)) {
            categorySelect.value = savedCategory;
            categorySelect.dispatchEvent(new Event('change')); // popula Fase + rótulos do Passo 2 + opções de Curso/Nível

            if (savedPhase && phaseSelect && phaseSelect.querySelector(`option[value="${CSS.escape(savedPhase)}"]`)) {
                phaseSelect.value = savedPhase;
                phaseSelect.dispatchEvent(new Event('change')); // mostra/esconde o seletor de protocolo
            }
            // O Curso/Nível só pode ser restaurado DEPOIS do 'change' da categoria,
            // pois é nesse momento que suas opções são reconstruídas dinamicamente.
            if (savedCourse && courseSelect && courseSelect.querySelector(`option[value="${CSS.escape(savedCourse)}"]`)) {
                courseSelect.value = savedCourse;
            }
            if (savedPersona && personaSelect && personaSelect.querySelector(`option[value="${CSS.escape(savedPersona)}"]`)) {
                personaSelect.value = savedPersona;
            }
            if (savedProtocol && protocolSelect) protocolSelect.value = savedProtocol;
        }

        if (savedOutputFormat && outputFormatSelect) outputFormatSelect.value = savedOutputFormat;
        if (cotCheckbox) cotCheckbox.checked = (savedCot === 'true');
        if (stepBackCheckbox) stepBackCheckbox.checked = (savedStepBack === 'true');
        if (iterativeCheckbox) iterativeCheckbox.checked = (savedIterative === 'true');
    }
    restoreFullFormState();

    if(researchProblemTextarea) researchProblemTextarea.addEventListener('input', () => localStorage.setItem('academic_problem', researchProblemTextarea.value));
    if(chapterThemeInput) chapterThemeInput.addEventListener('input', () => localStorage.setItem('academic_theme', chapterThemeInput.value));
    if(courseSelect) courseSelect.addEventListener('change', () => localStorage.setItem('academic_course', courseSelect.value));
    if(baseReferencesTextarea) baseReferencesTextarea.addEventListener('input', () => localStorage.setItem('academic_references', baseReferencesTextarea.value));
    if(fewShotTextarea) fewShotTextarea.addEventListener('input', () => localStorage.setItem('academic_fewshot', fewShotTextarea.value));
    if(categorySelect) categorySelect.addEventListener('change', () => localStorage.setItem('academic_category', categorySelect.value));
    if(phaseSelect) phaseSelect.addEventListener('change', () => localStorage.setItem('academic_phase', phaseSelect.value));
    if(protocolSelect) protocolSelect.addEventListener('change', () => localStorage.setItem('academic_protocol', protocolSelect.value));
    if(personaSelect) personaSelect.addEventListener('change', () => localStorage.setItem('academic_persona', personaSelect.value));
    if(outputFormatSelect) outputFormatSelect.addEventListener('change', () => localStorage.setItem('academic_output_format', outputFormatSelect.value));
    if(cotCheckbox) cotCheckbox.addEventListener('change', () => localStorage.setItem('academic_cot', cotCheckbox.checked));
    if(stepBackCheckbox) stepBackCheckbox.addEventListener('change', () => localStorage.setItem('academic_stepback', stepBackCheckbox.checked));
    if(iterativeCheckbox) iterativeCheckbox.addEventListener('change', () => localStorage.setItem('academic_iterative', iterativeCheckbox.checked));

    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(confirm('Tem certeza que deseja limpar todo o painel? (Sua Biblioteca de Prompts não será apagada).')) {
                researchProblemTextarea.value = '';
                chapterThemeInput.value = '';
                baseReferencesTextarea.value = '';
                fewShotTextarea.value = '';
                generatedPromptTextarea.value = '';
                
                ['academic_problem', 'academic_theme', 'academic_references', 'academic_fewshot',
                 'academic_category', 'academic_phase', 'academic_protocol', 'academic_persona',
                 'academic_course', 'academic_output_format', 'academic_cot', 'academic_stepback',
                 'academic_iterative'].forEach(key => localStorage.removeItem(key));
                
                updateCharCounter();
                if(parameterHintDiv) parameterHintDiv.classList.add('hidden');
                
                window.showToast("🧹 Formulário resetado com sucesso.");
            }
        });
    }

    // --- 5. CONTADOR VISUAL DE CARACTERES ---
    function updateCharCounter() {
        if (!charCounter || !baseReferencesTextarea) return;
        const length = baseReferencesTextarea.value.length;
        charCounter.textContent = `${length} caracteres (Mín. 50 exigidos)`;
        
        if (length < 50) charCounter.style.color = '#ef4444';
        else charCounter.style.color = '#10b981';
    }
    if(baseReferencesTextarea) {
        baseReferencesTextarea.addEventListener('input', updateCharCounter);
        updateCharCounter(); 
    }

    // --- 6. MOTOR DE EXTRAÇÃO DE ARQUIVOS ---
    async function processFileExtraction(file, targetTextarea, statusElem, isAppend = true) {
        const MAX_PDF_PAGES = 50; 
        const MAX_TEXT_CHARS = 100000; 
        let isTruncated = false;

        statusElem.textContent = 'Extraindo texto... ⏳';
        statusElem.style.color = 'var(--border-focus)';

        try {
            let extractedText = '';

            if (file.type === 'text/plain') {
                extractedText = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = e => resolve(e.target.result);
                    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de texto.'));
                    reader.readAsText(file);
                });
            } else if (file.name.endsWith('.docx')) {
                extractedText = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        mammoth.extractRawText({ arrayBuffer: e.target.result })
                            .then(result => resolve(result.value))
                            .catch(err => reject(err));
                    };
                    reader.onerror = () => reject(new Error('Falha ao ler o arquivo Word.'));
                    reader.readAsArrayBuffer(file);
                });
            } else if (file.type === 'application/pdf') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const pagesToRead = Math.min(pdf.numPages, MAX_PDF_PAGES);
                if (pdf.numPages > MAX_PDF_PAGES) isTruncated = true;
                
                for (let i = 1; i <= pagesToRead; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    extractedText += pageText + '\n';
                }
            } else {
                throw new Error('Formato não suportado. Envie .txt, .docx ou .pdf');
            }

            if (extractedText.length > MAX_TEXT_CHARS) {
                extractedText = extractedText.substring(0, MAX_TEXT_CHARS);
                isTruncated = true;
            }

            if (extractedText && extractedText.trim().length > 0) {
                if(isAppend) {
                    const currentText = targetTextarea.value.trim();
                    const separator = currentText.length > 0 ? '\n\n--- [NOVO DOCUMENTO] ---\n\n' : '';
                    targetTextarea.value = currentText + separator + extractedText.trim();
                } else {
                    targetTextarea.value = extractedText.trim();
                }
                
                targetTextarea.dispatchEvent(new Event('input')); 
                
                if (isTruncated) {
                    statusElem.textContent = '⚠️ Arquivo grande. Apenas parte foi extraída para evitar travamento.';
                    statusElem.style.color = '#d97706'; 
                } else {
                    statusElem.textContent = '✅ Sucesso!';
                    statusElem.style.color = '#10b981'; 
                }
            } else {
                throw new Error('Nenhum texto legível foi encontrado.');
            }
        } catch (error) {
            console.error(error);
            statusElem.textContent = '❌ Erro: ' + error.message;
            statusElem.style.color = '#ef4444';
        } finally {
            setTimeout(() => {
                statusElem.textContent = 'Ou cole o texto manualmente na caixa abaixo.';
                statusElem.style.color = 'var(--text-secondary)';
            }, 6000);
        }
    }

    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;
            processFileExtraction(file, baseReferencesTextarea, uploadStatus, true);
            fileUploadInput.value = ''; 
        });
    }

    if (fileUploadStyle) {
        fileUploadStyle.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;
            processFileExtraction(file, fewShotTextarea, uploadStatusStyle, false); 
            fileUploadStyle.value = ''; 
        });
    }

    // --- 8. MOTOR DE CONSTRUÇÃO DE PROMPT E AUTO-SALVAMENTO ---
    if(generateBtn) {
        generateBtn.addEventListener('click', function() {
            const category = categorySelect ? categorySelect.value : null;
            const fase = phaseSelect.value;
            const persona = personaSelect.value;
            const course = courseSelect.value;
            const outputFormat = outputFormatSelect.value;
            const researchProblem = researchProblemTextarea.value.trim();
            const chapterTheme = chapterThemeInput.value.trim();
            const baseReferences = baseReferencesTextarea.value.trim();
            const fewShot = fewShotTextarea.value.trim();
            const protocolo = protocolSelect.value;

            if (!category || !fase) return alert("Por favor, selecione a Categoria e a Etapa Metodológica no Passo 1."), categorySelect.focus();

            const rule = BANCO_DE_PROMPTS[category][fase];

            const requiredFields = [
                { element: researchProblemTextarea, value: researchProblem },
                { element: chapterThemeInput, value: chapterTheme }
            ];

            if (fase !== 'busca' && fase !== 'ideacao' && fase !== 'memorial_intro') {
                requiredFields.push({ element: baseReferencesTextarea, value: baseReferences });
            }

            let isValid = true;
            requiredFields.forEach(field => field.element.classList.remove('input-error'));
            requiredFields.forEach(field => {
                if (!field.value) { field.element.classList.add('input-error'); isValid = false; }
            });

            if (!isValid) return window.showToast("❌ Preencha os campos obrigatórios em vermelho.");
            
            if (fase !== 'busca' && fase !== 'ideacao' && fase !== 'memorial_intro' && baseReferences.length < 50) {
                baseReferencesTextarea.classList.add('input-error');
                return alert("AVISO: O volume de referências ou diretrizes fornecido é insuficiente para a IA processar sem alucinar. Cole mais informações no campo correspondente.");
            }

            let promptFinal = "";
            const isJson = (outputFormat === 'json');
            const hasTriggers = (iterativeCheckbox && iterativeCheckbox.checked) || (cotCheckbox && cotCheckbox.checked) || (stepBackCheckbox && stepBackCheckbox.checked);

            promptFinal += `<system_prompt>\nVocê é uma Inteligência Artificial operando sob diretrizes acadêmicas e pedagógicas estritas.\n`;
            promptFinal += `<role>Atue estritamente como: ${descricoesPersonas[persona]}</role>\n`;
            promptFinal += `<calibration_parameters>${rule.calibragemSimulada}</calibration_parameters>\n`;
            
            promptFinal += `<safety_and_integrity_locks>\n`;
            
            if (fase === 'busca' || fase === 'reverso_txt') {
                promptFinal += `1. DIRETRIZ DE LEITURA DE ANEXOS E BUSCA: Você DEVE processar o arquivo PDF/documento anexado a este chat como sua principal fonte de verdade bibliográfica para extrair os conteúdos e exercícios.\n`;
            } else {
                promptFinal += `1. ANTI-ALUCINAÇÃO EXTREMA: É terminantemente proibido inventar dados. A sua ÚNICA fonte de verdade é a tag <reference_material>.\n`;
            }
            promptFinal += `2. FILTRO DE ESTILO: Aja como um humano. Proibido usar clichês genéricos detectáveis de IA (ex: "em suma", "é importante ressaltar").\n`;
            promptFinal += `3. ORIGINALIDADE: Faça paráfrase indireta de alto nível.\n</safety_and_integrity_locks>\n`;

            promptFinal += `<output_format>\n`;
            if (isJson) {
                promptFinal += `Retorne a saída EXCLUSIVAMENTE em formato JSON puro e validado. Siga estritamente este Schema:\n{\n`;
                if (stepBackCheckbox && stepBackCheckbox.checked) promptFinal += `  "step_back_abstraction": "String",\n`;
                if (cotCheckbox && cotCheckbox.checked) promptFinal += `  "chain_of_thought": "String",\n`;
                if (fase === 'busca') promptFinal += `  "artigos_encontrados": [{"titulo": "String", "autor_e_ano": "String", "resumo_achados": "String", "link_ou_doi": "String"}]\n`;
                else promptFinal += `  "conteudo_estruturado": "String",\n  "sintese_didatica": "String"\n`;
                promptFinal += `}\n`;
            } else if (outputFormat === 'tabela') {
                promptFinal += `Retorne os dados estruturados obrigatoriamente em uma Tabela Markdown para facilitar a leitura.\n`;
            } else if (outputFormat === 'topicos') {
                promptFinal += `Retorne a saída estruturada inteiramente em Bullet Points (Tópicos) concisos.\n`;
            } else {
                promptFinal += `Retorne a saída em Texto Livre contínuo estruturado de forma fluida e profissional.\n`;
            }
            promptFinal += `</output_format>\n</system_prompt>\n\n`;

            promptFinal += `<context>\n<education_segment>${course}</education_segment>\n<research_problem>${researchProblem}</research_problem>\n<current_section_theme>${chapterTheme}</current_section_theme>\n</context>\n\n`;

            if (fewShot) promptFinal += `<style_examples>\nAbaixo o TEMPLATE EXATO de estilo e formatação que você DEVE clonar rigorosamente na saída:\n\n${fewShot}\n</style_examples>\n\n`;
            if (baseReferences) promptFinal += `<reference_material>\n[INÍCIO DOS DADOS PRIMÁRIOS - ÚNICA FONTE DE VERDADE]\n${baseReferences}\n[FIM DOS DADOS PRIMÁRIOS]\n</reference_material>\n\n`;

            promptFinal += `<task>\n${rule.instrucaoBase}\n`;
            if (rule.exigeProtocolo && protocolo !== "nenhum") promptFinal += `\n**FRAMEWORK METODOLÓGICO EXIGIDO:** Use o protocolo ${protocolo}.\n`;
            promptFinal += `</task>\n\n`;

            if (hasTriggers && !isJson) {
                promptFinal += `<advanced_reasoning_triggers>\nAtenção aos gatilhos cognitivos:\n`;
                if (stepBackCheckbox && stepBackCheckbox.checked) promptFinal += `- [STEP-BACK ABSTRACTION]: Explique os princípios gerais ou a teoria de base antes de responder.\n`;
                if (cotCheckbox && cotCheckbox.checked) promptFinal += `- [CHAIN OF THOUGHT]: Exiba o seu raciocínio lógico passo a passo primeiro.\n`;
                if (iterativeCheckbox && iterativeCheckbox.checked) promptFinal += `- [MODO ITERATIVO ATIVADO]: Faça até 3 perguntas críticas antes de iniciar a tarefa.\n`;
                promptFinal += `</advanced_reasoning_triggers>`;
            }

            generatedPromptTextarea.value = promptFinal;
            
            // AUTO-SALVAMENTO NO HISTÓRICO LOCAL COM NOMENCLATURA LIMPA
            let categoryTexto = categorySelect.options[categorySelect.selectedIndex].text;
            if(categoryTexto.includes("Artigo")) categoryTexto = "Artigo";
            else if(categoryTexto.includes("Memorial")) categoryTexto = "Memorial";
            else if(categoryTexto.includes("Tradicional")) categoryTexto = "Plan. Tradicional";
            else if(categoryTexto.includes("Reverso")) categoryTexto = "Plan. Reverso";

            const faseTexto = phaseSelect.options[phaseSelect.selectedIndex].text.split(':')[0]; 
            const nomeHistorico = `[${categoryTexto}] ${faseTexto}`; 
            
            const iaRecomendada = (fase === 'busca' || fase === 'reverso_txt') ? 'Perplexity / Claude 3' : 'ChatGPT / Claude';

            // Tags descritivas por tipo de trabalho (sem o prefixo redundante "histórico").
            // Ex: "artigo, fase 2: levantamento bibliográfico" / "planejamento-reverso, fase 1: ..."
            const domainGerado = domainFromCategoryText(categoryTexto);
            const tagsGeradas = `${domainGerado.tagKey}, ${faseTexto.toLowerCase().trim()}`;
            
            const novoPrompt = {
                id: 'hist_' + Date.now(),
                nome: nomeHistorico,
                objetivo: researchProblem || 'Gerado automaticamente',
                ia_recomendada: iaRecomendada,
                tags: tagsGeradas,
                prompt_texto: promptFinal,
                tipo: 'local', 
                data_atualizacao: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})
            };

            const localPrompts = JSON.parse(localStorage.getItem('academic_local_prompts')) || [];
            localPrompts.unshift(novoPrompt); 
            localStorage.setItem('academic_local_prompts', JSON.stringify(localPrompts));
            
            loadAllPrompts(false); 

            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            if (fase === 'busca' || fase === 'reverso_txt') {
                parameterHintDiv.style.backgroundColor = isDarkMode ? '#422006' : '#fffbeb';
                parameterHintDiv.style.color = isDarkMode ? '#fde047' : '#92400e';
                parameterHintDiv.style.borderLeftColor = isDarkMode ? '#ca8a04' : '#ffc107';
            } else {
                parameterHintDiv.style.backgroundColor = ''; 
                parameterHintDiv.style.color = '';
                parameterHintDiv.style.borderLeftColor = '';
            }

            // Aviso específico para o Planejamento Reverso Fase 4 (reverso_txt):
            // este prompt foi projetado para que a IA consuma o PDF do material didático
            // como fonte primária. Sem ele, a saída vai ser genérica demais.
            const avisoReverso = fase === 'reverso_txt'
                ? '\n\n📎 ATENÇÃO: Esta fase usa seu material didático como fonte primária. ' +
                  'Ao colar este prompt no ChatGPT ou Claude, lembre-se de ANEXAR O PDF do ' +
                  'livro/apostila junto à mensagem. Sem o arquivo, a IA usará conhecimento ' +
                  'genérico e o plano ficará desconectado do seu conteúdo real.'
                : '';

            parameterHintDiv.innerHTML = rule.dicaUI + " (Salvo no Histórico da Biblioteca!)" + 
                (avisoReverso ? `<br><br><strong>📎 ATENÇÃO – Fase 4 Reverso:</strong> Ao enviar para o ChatGPT/Claude, <strong>anexe o PDF</strong> do seu livro ou apostila. Sem ele, a IA usará conhecimento genérico e o plano não vai refletir o seu conteúdo real.` : '');
            parameterHintDiv.classList.remove('hidden');

            generatedPromptTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            window.showToast("✨ Prompt gerado e salvo no histórico!");
        });
    }

    if(copyBtn) {
        copyBtn.addEventListener('click', function() {
            if(!generatedPromptTextarea.value) return window.showToast("❌ Gere um prompt primeiro!");
            
            window.copyToClipboard(generatedPromptTextarea.value);
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copiado com Sucesso! ✅';
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            generatedPromptTextarea.style.backgroundColor = isDarkMode ? '#172554' : '#e7f3ff';
            setTimeout(() => generatedPromptTextarea.style.backgroundColor = isDarkMode ? '#0f172a' : '#ffffff', 300);
            setTimeout(() => copyBtn.textContent = originalText, 2500);
        });
    }

    if(downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if(!generatedPromptTextarea.value) return window.showToast("❌ Gere um prompt primeiro!");
            const blob = new Blob([generatedPromptTextarea.value], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Prompt_Academico_${phaseSelect.value || "geral"}.txt`;
            document.body.appendChild(a); 
            a.click(); 
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if(floatingFeedbackBtn) {
        floatingFeedbackBtn.addEventListener('click', function() {
            feedbackModal.classList.remove('hidden');
            feedbackStatusMsg.classList.add('hidden');
            formFeedback.reset(); 
        });
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', () => feedbackModal.classList.add('hidden'));

    if(formFeedback) {
        formFeedback.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const originalBtnText = submitFeedbackBtn.innerHTML;
            submitFeedbackBtn.innerHTML = 'Enviando... ⏳';
            submitFeedbackBtn.disabled = true;
            feedbackStatusMsg.classList.add('hidden');

            fetch('https://script.google.com/macros/s/AKfycbxgYjv2MshGhF_oqkWYxZdEwJZLWk6uPIWb6CHyxMAsM3uLX9KjnCwlBeUCOi_Eluelig/exec', {
                method: 'POST',
                body: JSON.stringify({
                    tipo: document.getElementById('feedback-type').value,
                    email: document.getElementById('feedback-email').value,
                    mensagem: document.getElementById('feedback-message').value
                }),
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            }).then(response => response.json()).then(data => {
                if(data.status === 'sucesso') {
                    feedbackStatusMsg.textContent = 'Feedback enviado com sucesso! Muito obrigado.';
                    feedbackStatusMsg.className = 'status-success';
                    feedbackStatusMsg.classList.remove('hidden');
                    formFeedback.reset();
                    setTimeout(() => feedbackModal.classList.add('hidden'), 3000);
                } else throw new Error('A API retornou erro.');
            }).catch(error => {
                feedbackStatusMsg.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
                feedbackStatusMsg.className = 'status-error';
                feedbackStatusMsg.classList.remove('hidden');
            }).finally(() => {
                submitFeedbackBtn.innerHTML = originalBtnText;
                submitFeedbackBtn.disabled = false;
            });
        });
    }

    loadAllPrompts(true);
});