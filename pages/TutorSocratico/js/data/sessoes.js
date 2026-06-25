// Importamos as funções que nos ajudam a construir as sessões
import { op, etapaEscolha, etapaAvaliacao, etapaTexto } from '../engine/helpers.js';

export const SESSOES = {
  "EF.09.MAT.2.92": {
    id: "EF.09.MAT.2.92",
    titulo: "Produtos Notáveis",
    objetivo: "Reconhecer, interpretar e calcular produtos notáveis entendendo cada etapa do raciocínio.",
    etapas: [
      // 1. Diagnóstico inicial de postura
      etapaEscolha(
        "e1",
        "Quando você vê uma expressão como \\( (a + b)^2 \\), qual dessas frases mais combina com o que acontece na sua cabeça?",
        [
          op(1, "Eu travo. Não sei por onde começar.", "e2_nao_sabe", "Ótimo ponto de partida: vamos construir desde o começo."),
          op(2, "Penso em 'elevar cada termo' e pronto.", "e2_erro_inicial", "Essa é uma ideia comum. Vamos investigar se está faltando algo."),
          op(3, "Penso em multiplicar \\( (a+b) \\) por \\( (a+b) \\), usando o 'chuveirinho'.", "e2_caminho_bom", "Muito bem, você já pensa na estrutura do produto."),
          op(4, "Eu já conheço a regra pronta e uso direto.", "e2_avancado", "Excelente, vamos ver se você também entende a origem da regra.")
        ],
        "pergunta_diagnostica"
      ),

      // 2. Caminho para quem não sabe
      etapaTexto(
        "e2_nao_sabe",
        "Produtos notáveis são multiplicações que aparecem tanto no dia a dia da álgebra que ganham um nome especial. Mas na origem são apenas multiplicações entre expressões. Vamos começar com uma pergunta bem simples:",
        "e3_nao_sabe_q1"
      ),

      etapaEscolha(
        "e3_nao_sabe_q1",
        "Você lembra o que significa o símbolo \\( ^2 \\) em matemática?",
        [
          op(1, "É 'vezes ele mesmo', ou seja, multiplicar o número por ele mesmo.", "e3_nao_sabe_q2", "Perfeito. Esse é o ponto crucial."),
          op(2, "É 'vezes dois'.", "e3_nao_sabe_corrige", "Esse é um erro comum. Vamos ajustar isso."),
          op(3, "Não tenho certeza.", "e3_nao_sabe_corrige", "Sem problema. Vamos clarear essa ideia.")
        ]
      ),

      etapaTexto(
        "e3_nao_sabe_corrige",
        "Quando você vê \\( x^2 \\), isso significa \\( x \\cdot x \\). Não é \\( x \\cdot 2 \\). É multiplicar o número por ele mesmo. Da mesma forma, \\( (a + b)^2 \\) significa \\( (a + b)(a + b) \\).",
        "e3_nao_sabe_q2"
      ),

      etapaTexto(
        "e3_nao_sabe_q2",
        "Então a primeira tradução importante é: \\( (a + b)^2 = (a + b)(a + b) \\). A partir daqui, nossa tarefa é multiplicar essa soma por ela mesma. Vamos agora alinhar isso com quem teve outras respostas.",
        "e3_distributiva_intro"
      ),

      // 3. Caminho para quem tinha a ideia incorreta
      etapaTexto(
        "e2_erro_inicial",
        "Se você pensa em 'elevar cada termo' e escrever \\( a^2 + b^2 \\), vale uma pergunta: onde ficam os produtos entre termos diferentes? Em uma multiplicação de somas, cada termo da primeira soma deve encontrar cada termo da segunda. Vamos explicitar essa estrutura.",
        "e3_distributiva_intro"
      ),

      // 4. Caminho para quem já pensava na distributiva
      etapaTexto(
        "e2_caminho_bom",
        "Excelente. Pensar em \\( (a + b)(a + b) \\) é o passo certo. Nosso objetivo agora é fazer essa multiplicação com calma, sem pular etapas, para que a regra do produto notável faça sentido.",
        "e3_distributiva_intro"
      ),

      // 5. Caminho para quem disse que já sabe a regra
      etapaTexto(
        "e2_avancado",
        "Ótimo que você já conhece a regra. Mas vamos fazer um exercício de 'engenheiro da matemática': em vez de só usar a fórmula, vamos reconstruí-la. Assim, se um dia você esquecer a forma exata, consegue recriar a regra com tranquilidade.",
        "e3_distributiva_intro"
      ),

      // 6. Introdução explícita à distributiva
      etapaTexto(
        "e3_distributiva_intro",
        "Vamos escrever a multiplicação devagar: \\( (a + b)(a + b) \\).<br><br>Primeiro, pense no termo \\( a \\) da primeira expressão. Ele precisa multiplicar os dois termos da segunda: \\( a \\cdot a \\) e \\( a \\cdot b \\).<br><br>Depois, pense no termo \\( b \\) da primeira expressão. Ele também precisa multiplicar os dois termos da segunda: \\( b \\cdot a \\) e \\( b \\cdot b \\).<br><br>Agora vamos listar o resultado dessa multiplicação completa.",
        "e3_distributiva"
      ),

      etapaEscolha(
        "e3_distributiva",
        "Qual lista representa corretamente todos os produtos obtidos de \\( (a + b)(a + b) \\)?",
        [
          op(1, "\\( a \\cdot a \\), \\( a \\cdot b \\), \\( b \\cdot a \\), \\( b \\cdot b \\)", "e4_agrupamento", "Perfeito. Esses são os quatro produtos que surgem."),
          op(2, "\\( a \\cdot a \\), \\( b \\cdot b \\)", "e4_recuperacao_parcial", "Você anotou apenas os extremos. Faltaram os cruzamentos."),
          op(3, "\\( a \\cdot b \\) e \\( b \\cdot a \\) apenas.", "e4_recuperacao_parcial", "Você anotou apenas os cruzados. Faltaram os quadrados.")
        ]
      ),

      etapaTexto(
        "e4_recuperacao_parcial",
        "Em \\( (a + b)(a + b) \\), temos dois termos em cada soma. Cada um precisa multiplicar os dois da outra expressão. Isso gera 4 produtos: \\( a \\cdot a \\), \\( a \\cdot b \\), \\( b \\cdot a \\) e \\( b \\cdot b \\). Vamos reescrever esses produtos usando notação de potência.",
        "e4_agrupamento"
      ),

      etapaEscolha(
        "e4_agrupamento",
        "Reescrevendo os quatro produtos com notação mais comum, ficamos com:",
        [
          op(1, "\\( a^2 \\), \\( ab \\), \\( ba \\), \\( b^2 \\)", "e5_agrupa_ab", "Correto. Agora vamos analisar \\( ab \\) e \\( ba \\)."),
          op(2, "\\( a^2 \\), \\( b^2 \\), \\( 2ab \\)", "e5_agrupa_ab_recupera", "Você já deu um passo à frente, mas vamos chegar a \\( 2ab \\) com calma."),
          op(3, "\\( a^2 \\), \\( a^2 \\), \\( b^2 \\), \\( b^2 \\)", "e5_agrupa_ab_recupera", "Você repetiu os quadrados. Vamos olhar os cruzados.")
        ]
      ),

      etapaTexto(
        "e5_agrupa_ab_recupera",
        "Os quatro produtos podem ser escritos como \\( a^2 \\), \\( ab \\), \\( ba \\), \\( b^2 \\). Os termos \\( ab \\) e \\( ba \\) são iguais em valor: multiplicar \\( a \\) por \\( b \\) ou \\( b \\) por \\( a \\) resulta o mesmo número. A diferença está apenas na ordem escrita.",
        "e5_agrupa_ab"
      ),

      etapaEscolha(
        "e5_agrupa_ab",
        "Sabendo que \\( ab \\) e \\( ba \\) têm o mesmo valor, o que acontece quando agrupamos os termos \\( ab \\) e \\( ba \\)?",
        [
          op(1, "Eles se somam e viram \\( 2ab \\).", "e6_forma_padrao", "Isso mesmo. É daí que nasce o termo do meio."),
          op(2, "Um cancela o outro e desaparecem.", "e5_agrupa_ab_corrige", "Isso só aconteceria se um fosse \\( +ab \\) e o outro \\( -ab \\)."),
          op(3, "Eles viram \\( a^2 \\).", "e5_agrupa_ab_corrige", "O termo \\( a^2 \\) vem de \\( a \\cdot a \\), não de \\( ab \\).")
        ]
      ),

      etapaTexto(
        "e5_agrupa_ab_corrige",
        "Como \\( ab \\) e \\( ba \\) são ambos positivos em \\( (a + b)(a + b) \\), eles se somam: \\( ab + ba = 2ab \\). Não há cancelamento, e sim soma.",
        "e6_forma_padrao"
      ),

      etapaTexto(
        "e6_forma_padrao",
        "Agora podemos escrever o resultado completo da multiplicação:<br><br>\\[ (a + b)(a + b) = <br><br> a^2 + ab + ba + b^2 \\]<br><br>Agrupando \\( ab \\) e \\( ba \\), obtemos \\( a^2 + 2ab + b^2 \\).<br><br>Essa é a forma padronizada do produto notável \\( (a + b)^2 \\).",
        "e7_geometria"
      ),

      // 7. Conexão com geometria – passo a passo (AGORA COM A IMAGEM INJETADA)
      etapaTexto(
        "e7_geometria",
        "Vamos agora ver a mesma ideia por outro ângulo, usando geometria, para reforçar o sentido.<br><br>Imagine um quadrado de lado \\( (a + b) \\). Divida esse lado em duas partes: um segmento de comprimento \\( a \\) e outro de comprimento \\( b \\).<br><br>Ao traçar linhas internas, o quadrado se divide em:<br><br>- Um quadrado de lado \\( a \\) (área \\( a^2 \\));<br><br>- Um quadrado de lado \\( b \\) (área \\( b^2 \\));<br><br>- Dois retângulos de lados \\( a \\) e \\( b \\) (área \\( ab \\) cada).<br><br>Observe a imagem e vamos traduzir isso em linguagem algébrica.",
        "e8_geometria_q1",
        "reflexao", // <-- 4º parâmetro (tipo)
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6e614336d63de13b4e54265a250f394d14630078.jpg" // <-- 5º parâmetro (imagem)
      ),

      etapaEscolha(
        "e8_geometria_q1",
        "Somando as áreas dessas quatro regiões, qual expressão você obtém para a área total do quadrado de lado \\( (a + b) \\)?",
        [
          op(1, "\\( a^2 + ab + ab + b^2 \\)", "e8_geometria_q2", "Correto. Isso é igual à área total \\( (a + b)^2 \\)."),
          op(2, "\\( a^2 + b^2 \\)", "e8_geometria_corrige", "Você esqueceu os dois retângulos \\( ab \\)."),
          op(3, "\\( 2a + 2b \\)", "e8_geometria_corrige", "Isso lembra perímetro, não área.")
        ]
      ),

      etapaTexto(
        "e8_geometria_corrige",
        "O quadrado é formado por quatro regiões: dois quadrados pequenos (\\( a^2 \\) e \\( b^2 \\)) e dois retângulos \\( ab \\). Portanto, a área total é \\( a^2 + ab + ab + b^2 \\).",
        "e8_geometria_q2"
      ),

      etapaEscolha(
        "e8_geometria_q2",
        "Agrupando os termos \\( ab \\) e \\( ab \\) outra vez, qual forma final você obtém para a área desse quadrado?",
        [
          op(1, "\\( a^2 + 2ab + b^2 \\)", "e9_conexao_regras", "Perfeito. É a mesma expressão que encontramos pela multiplicação."),
          op(2, "\\( a^2 + b^2 \\)", "e8_geometria_corrige2", "Vamos lembrar dos dois retângulos novamente."),
          op(3, "\\( 2(a + b) \\)", "e8_geometria_corrige2", "Perímetro não é área.")
        ]
      ),

      etapaTexto(
        "e8_geometria_corrige2",
        "A presença dos dois retângulos \\( ab \\) é essencial para representar a área total. Sem eles, você não está contando todo o quadrado.",
        "e9_conexao_regras"
      ),

      etapaTexto(
        "e9_conexao_regras",
        "Você viu o mesmo resultado por dois caminhos: pela distributiva e pela decomposição geométrica.<br><br>Isso mostra que a 'regra' \\( (a + b)^2 = a^2 + 2ab + b^2 \\) não é um truque sem sentido; ela é a síntese de uma estrutura bem definida.",
        "e10_comparar_outros"
      ),

      // 8. Comparar com outros produtos notáveis
      etapaEscolha(
        "e10_comparar_outros",
        "Agora vamos comparar com outros produtos notáveis. Qual expressão você acha que gera a forma \\( a^2 - b^2 \\)?",
        [
          op(1, "\\( (a + b)(a - b) \\)", "e11_diferenca_quadrados", "Correto. Essa é a diferença de quadrados."),
          op(2, "\\( (a - b)^2 \\)", "e10_corrige_outros", "Essa gera \\( a^2 - 2ab + b^2 \\)."),
          op(3, "\\( (a + b)^2 \\)", "e10_corrige_outros", "Essa gera \\( a^2 + 2ab + b^2 \\).")
        ]
      ),

      etapaTexto(
        "e10_corrige_outros",
        "Vale lembrar:<br><br>- \\( (a + b)^2 = a^2 + 2ab + b^2 \\)<br><br>- \\( (a - b)^2 = a^2 - 2ab + b^2 \\)<br><br>- \\( (a + b)(a - b) = a^2 - b^2 \\)",
        "e11_diferenca_quadrados"
      ),

      etapaTexto(
        "e11_diferenca_quadrados",
        "Em \\( (a + b)(a - b) \\), os termos do meio se anulam: \\( a^2 - ab + ba - b^2 \\). Como \\( -ab \\) e \\( +ba \\) têm sinais opostos e mesmo valor absoluto, eles somam zero. Isso mostra por que o resultado é \\( a^2 - b^2 \\).<br><br>Observe a imagem para ver como essa diferença de quadrados funciona na prática geométrica. Perceba que o sinal muda todo o comportamento dos termos do meio!",
        "e12_erro_x_5",
        "reflexao", // <-- 4º parâmetro (tipo)
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e0dfd2fbb473d4d2a8d5d6c1116f7147ce7d65c4.jpg" // <-- 5º parâmetro (imagem)
      ),

      // 9. Focar em erro clássico com pergunta socrática
      etapaEscolha(
        "e12_erro_x_5",
        "Um colega seu escreveu: \\( (x + 5)^2 = x^2 + 25 \\). Qual pergunta você faria para ajudá-lo a perceber o que está faltando?",
        [
          op(1, "Onde foram parar os produtos cruzados \\( x \\cdot 5 \\) e \\( 5 \\cdot x \\)?", "e13_pesquisa", "Excelente pergunta. Ela obriga o colega a reconstruir a distributiva."),
          op(2, "Você decorou a fórmula errada?", "e12_corrige_pergunta", "Isso culpa o colega, mas não o ajuda a pensar melhor."),
          op(3, "Quer que eu te dê a resposta?", "e12_corrige_pergunta", "Nosso objetivo é que ele mesmo reconstrua.")
        ]
      ),

      etapaTexto(
        "e12_corrige_pergunta",
        "No método socrático, preferimos perguntas que levem o colega a olhar de novo para a estrutura do cálculo, em vez de simplesmente dizer 'está errado'.",
        "e13_pesquisa"
      ),

      // 10. Momento de pesquisa / atividade externa
      etapaTexto(
        "e13_pesquisa",
        "Se você sente que ainda está inseguro, pare um pouco e faça esta mini-pesquisa: <br><br> 1. Escreva num caderno as multiplicações \\( (x + 2)(x + 2) \\), \\( (x + 3)(x + 3) \\), \\( (x + 5)(x + 5) \\). <br><br> 2. Expanda cada uma usando o 'chuveirinho'.<br><br>3. Observe os padrões que aparecem nos termos.<br><br>Quando terminar, volte aqui e veja se consegue reconhecer o padrão \\( (a + b)^2 = a^2 + 2ab + b^2 \\) sem olhar nenhuma fórmula pronta.",
        "e14_aplicar"
      ),

      // 11. Aplicação em exemplos numéricos / algébricos
      etapaEscolha(
        "e14_aplicar",
        "Agora vamos aplicar a regra explicitamente. Qual é a expansão correta de \\( (x + 3)^2 \\)?",
        [
          op(1, "\\( x^2 + 9 \\)", "e14_feedback_errado1", "Você considerou apenas os quadrados. Faltou o termo do meio."),
          op(2, "\\( x^2 + 6x + 9 \\)", "e14_feedback_correto", "Muito bem! Você aplicou corretamente o padrão."),
          op(3, "\\( x^2 + 3x + 9 \\)", "e14_feedback_errado2", "Faltou perceber que o termo do meio é \\( 2 \\cdot x \\cdot 3 \\), não apenas \\( x \\cdot 3 \\)."),
          op(4, "\\( x^2 - 6x + 9 \\)", "e14_feedback_errado3", "Esse padrão aparece em \\( (x - 3)^2 \\), não em \\( (x + 3)^2 \\).")
        ]
      ),

      etapaTexto(
        "e14_feedback_errado1",
        "Você acertou os quadrados \\( x^2 \\) e \\( 9 \\), mas esqueceu os produtos cruzados \\( x \\cdot 3 \\) e \\( 3 \\cdot x \\). Eles aparecem duas vezes e somam \\( 6x \\). Refazer a multiplicação \\( (x + 3)(x + 3) \\) passo a passo pode te ajudar.",
        "e15_desafio_extra"
      ),

      etapaTexto(
        "e14_feedback_errado2",
        "Na multiplicação \\( (x + 3)(x + 3) \\), os produtos cruzados são \\( x \\cdot 3 \\) e \\( 3 \\cdot x \\). Cada um vale \\( 3x \\). Somando, temos \\( 6x \\). Por isso o termo do meio é \\( 6x \\).",
        "e15_desafio_extra"
      ),

      etapaTexto(
        "e14_feedback_errado3",
        "O sinal negativo no termo do meio aparece em \\( (x - 3)^2 \\), porque aí os produtos cruzados são \\( x \\cdot (-3) \\) e \\( (-3) \\cdot x \\), ambos negativos. Em \\( (x + 3)^2 \\), os produtos cruzados são positivos.",
        "e15_desafio_extra"
      ),

      etapaTexto(
        "e14_feedback_correto",
        "Excelente! Mas lembre: dominar produtos notáveis não é só acertar uma conta. É saber reconstruir a regra, reconhecer padrões e evitar erros clássicos.",
        "e15_desafio_extra"
      ),

      // 12. Desafio extra para quem está mais seguro
      etapaEscolha(
        "e15_desafio_extra",
        "Vamos aumentar um pouco o desafio. Qual é a expansão correta de \\( (2x - 5)^2 \\)?",
        [
          op(1, "\\( 4x^2 - 10x + 25 \\)", "e15_feedback_errado_a", "Observe o termo do meio: ele parece diferente do padrão \\( a^2 - 2ab + b^2 \\)."),
          op(2, "\\( 4x^2 - 20x + 25 \\)", "e15_feedback_correto_a", "Muito bom. Você aplicou o padrão com \\( a = 2x \\) e \\( b = 5 \\)."),
          op(3, "\\( 4x^2 + 20x + 25 \\)", "e15_feedback_errado_b", "Cuidado com o sinal. Aqui temos \\( (a - b)^2 \\)."),
          op(4, "\\( 4x^2 + 10x + 25 \\)", "e15_feedback_errado_b", "Também não bate com o padrão \\( (a - b)^2 \\).")
        ]
      ),

      etapaTexto(
        "e15_feedback_errado_a",
        "Em \\( (2x - 5)^2 \\), temos \\( a = 2x \\) e \\( b = 5 \\). O padrão \\( (a - b)^2 = a^2 - 2ab + b^2 \\) nos dá: \\( a^2 = 4x^2 \\), \\( 2ab = 2 \\cdot 2x \\cdot 5 = 20x \\). Então o termo do meio é \\( -20x \\), não \\( -10x \\).",
        "e16_reflexao_final"
      ),

      etapaTexto(
        "e15_feedback_errado_b",
        "Para \\( (2x - 5)^2 \\), o termo do meio é negativo porque a expressão é uma diferença. \\( a = 2x \\), \\( b = 5 \\), então \\( 2ab = 20x \\). O termo do meio é \\( -20x \\).",
        "e16_reflexao_final"
      ),

      etapaTexto(
        "e15_feedback_correto_a",
        "Excelente! Você aplicou a ideia geral a um exemplo mais complexo: \\( (2x - 5)^2 = 4x^2 - 20x + 25 \\).",
        "e16_reflexao_final"
      ),

      // 13. Reflexão final e avaliação
      etapaEscolha(
        "e16_reflexao_final",
        "Para fechar esta habilidade, qual frase melhor representa o que você aprendeu sobre produtos notáveis?",
        [
          op(1, "São multiplicações tão frequentes que ganham uma forma padrão, mas que eu consigo reconstruir usando distributiva e geometria.", "e_final", "Essa visão dá segurança para resolver problemas novos."),
          op(2, "São fórmulas prontas que eu devo decorar sem pensar muito.", "e_final", "Você pode até usar fórmulas, mas entender sua origem dá mais autonomia."),
          op(3, "São truques que só servem para prova.", "e_final", "Na verdade, elas aparecem em vários problemas algébricos e geométricos.")
        ]
      ),

      etapaAvaliacao(
        "e_final",
        "Agora vamos registrar um resultado objetivo desta sessão.",
        "Analise as afirmativas e marque a alternativa correta:",
        [
          { id: 1, texto: "\\( (a + b)^2 = a^2 + 2ab + b^2 \\)" },
          { id: 2, texto: "\\( (a - b)^2 = a^2 - 2ab + b^2 \\)" },
          { id: 3, texto: "\\( (a + b)(a - b) = a^2 - b^2 \\)" },
          { id: 4, texto: "Todas as afirmativas acima estão corretas." }
        ],
        4,
        "Cada uma das três expressões representa um produto notável: quadrado da soma, quadrado da diferença e diferença de quadrados. Todas são corretas."
      )
    ]
  },

  "EF.09.MAT.2.93": {
    id: "EF.09.MAT.2.93",
    titulo: "Fatoração e Equação do 2º Grau",
    objetivo: "Fatorar expressões algébricas relacionando-as aos produtos notáveis e usar essa fatoração na resolução de equações do 2º grau.",
    etapas: [
      etapaEscolha(
        "e1",
        "Quando você vê uma expressão como \\( x^2 + 6x + 9 \\), qual dessas frases mais combina com o que acontece na sua cabeça?",
        [
          op(1, "Eu travo. Não sei por onde começar.", "e2_nao_sabe", "Ótimo ponto de partida. Vamos construir a ideia passo a passo."),
          op(2, "Penso em tentar 'juntar tudo' ou fazer alguma conta direta.", "e2_nao_sabe", "Vamos ver se faz sentido tratar isso como 'uma coisa só' ou se há estrutura escondida."),
          op(3, "Penso que isso pode ser o resultado de algum produto notável, como \\( (x+3)^2 \\).", "e2_produto_notavel", "Ótimo, você já suspeita da origem da expressão."),
          op(4, "Vejo que é um polinômio de 2º grau, mas não sei como fatorar.", "e2_polinomio", "Excelente, você já identifica o tipo. Falta conectar com a fatoração."),
          op(5, "Minha primeira ideia é aplicar Bhaskara direto.", "e2_bhaskara", "Bhaskara ajuda, mas vamos ver um caminho mais estrutural primeiro.")
        ],
        "pergunta_diagnostica"
      ),

      etapaTexto(
        "e2_nao_sabe",
        "Antes de qualquer conta, vamos dar um passo atrás e olhar a expressão.<br><br>\\( x^2 + 6x + 9 \\) é composta de três termos diferentes. Em vez de tentar 'somar tudo', vamos entender que tipo de termos são e como eles se organizam.",
        "e3_tipo_termos",
        "reflexao"
      ),

      etapaTexto(
        "e2_produto_notavel",
        "Boa percepção: muitos polinômios de 2º grau são, na verdade, resultados de produtos notáveis que você já estudou.<br><br>Vamos verificar se isso acontece com \\( x^2 + 6x + 9 \\), sem pular etapas.",
        "e3_tipo_termos",
        "reflexao"
      ),

      etapaTexto(
        "e2_polinomio",
        "Reconhecer que \\( x^2 + 6x + 9 \\) é um polinômio de 2º grau é um excelente começo.<br><br>Nosso objetivo agora é perguntar: existe uma maneira de escrever essa expressão na forma de produto, talvez usando produtos notáveis?",
        "e3_tipo_termos",
        "reflexao"
      ),

      etapaTexto(
        "e2_bhaskara",
        "A fórmula de <strong>Bhaskara</strong> é uma ferramenta poderosa, mas aqui queremos desenvolver uma visão mais algébrica: enxergar padrões que permitem fatorar sem depender sempre de fórmulas.<br><br>Isso ajuda você a entender melhor de onde vêm as raízes.",
        "e3_tipo_termos",
        "reflexao"
      ),

      etapaEscolha(
        "e3_tipo_termos",
        "Vamos analisar os três termos de \\( x^2 + 6x + 9 \\). Como você descreveria cada um deles?",
        [
          op(1, "Todos são 'do mesmo tipo', só com números diferentes.", "e3_corrige_tipos", "Vamos diferenciar melhor potência, variável e constante."),
          op(2, "\\( x^2 \\) é termo quadrático, \\( 6x \\) é termo linear e \\( 9 \\) é termo constante.", "e4_quadrado_perfeito", "Perfeito. Essa é a estrutura típica de um polinômio de 2º grau."),
          op(3, "Não sei bem como classificar.", "e3_corrige_tipos", "Sem problema. Vamos organizar isso juntos.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e3_corrige_tipos",
        "Num polinômio como \\( x^2 + 6x + 9 \\), temos:<ul><li><strong>\\( x^2 \\)</strong>: termo quadrático (variável ao quadrado);</li><li><strong>\\( 6x \\)</strong>: termo linear (variável na primeira potência);</li><li><strong>\\( 9 \\)</strong>: termo constante (não tem variável).</li></ul>Identificar isso é importante antes de tentar fatorar.",
        "e4_quadrado_perfeito",
        "reflexao"
      ),

      etapaEscolha(
        "e4_quadrado_perfeito",
        "Agora lembre-se do produto notável <strong>\\( (a + b)^2 = a^2 + 2ab + b^2 \\)</strong>. Você acha que \\( x^2 + 6x + 9 \\) pode se encaixar nesse padrão?",
        [
          op(1, "Não, não vejo relação.", "e4_recupera_padroes", "Vamos comparar termo a termo com \\( a^2 + 2ab + b^2 \\)."),
          op(2, "Estou em dúvida. Pode ser ou não.", "e4_recupera_padroes", "Ótimo, a dúvida é um bom ponto para investigar com calma."),
          op(3, "Sim, parece um quadrado perfeito.", "e5_identifica_a_b", "Boa suspeita. Vamos identificar \\( a \\) e \\( b \\).")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e4_recupera_padroes",
        "No padrão \\( a^2 + 2ab + b^2 \\), o primeiro termo é um quadrado perfeito, o último também, e o termo do meio costuma ser o dobro do produto desses dois 'raios'.<br><br>Vamos testar isso em \\( x^2 + 6x + 9 \\).",
        "e5_identifica_a_b",
        "reflexao"
      ),

      etapaTexto(
        "e5_identifica_a_b",
        "Imagine um quadrado de lado \\( (a + b) \\). A área total é \\( (a + b)^2 \\). Se você divide o lado em duas partes, \\( a \\) e \\( b \\), esse quadrado se decompõe em:<ul><li>Um quadrado de área <strong>\\( a^2 \\)</strong>;</li><li>Um quadrado de área <strong>\\( b^2 \\)</strong>;</li><li>Dois retângulos de área <strong>\\( ab \\)</strong>.</li></ul>Observe a figura abaixo e pense em como isso se relaciona com \\( x^2 + 6x + 9 \\).",
        "e5_identifica_a_b_q",
        "reflexao",
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6e614336d63de13b4e54265a250f394d14630078.jpg"
      ),

      etapaEscolha(
        "e5_identifica_a_b_q",
        "Se \\( x^2 \\) corresponde a \\( a^2 \\) e \\( 9 \\) corresponde a \\( b^2 \\), quais valores de \\( a \\) e \\( b \\) fazem sentido?",
        [
          op(1, "\\( a = 3 \\) e \\( b = x \\).", "e5_corrige_ab", "A ordem pode ser trocada, mas é mais natural deixar a variável como \\( a \\)."),
          op(2, "\\( a = x^2 \\) e \\( b = 9 \\).", "e5_corrige_ab", "Se \\( a = x^2 \\), então \\( a^2 = x^4 \\), o que não bate com \\( x^2 \\)."),
          op(3, "\\( a = x \\) e \\( b = 3 \\).", "e6_confere_meio", "Boa escolha. Agora vamos conferir o termo do meio usando \\( 2ab \\).")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e5_corrige_ab",
        "Se \\( a^2 = x^2 \\), então <strong>\\( a = x \\)</strong>. Se \\( b^2 = 9 \\), então <strong>\\( b = 3 \\)</strong>.<br><br>Por isso faz mais sentido usar \\( a = x \\) e \\( b = 3 \\).",
        "e6_confere_meio",
        "reflexao"
      ),

      etapaEscolha(
        "e6_confere_meio",
        "Com \\( a = x \\) e \\( b = 3 \\), qual é o valor de \\( 2ab \\)?",
        [
          op(1, "\\( 2ab = 5x \\).", "e6_corrige_meio", "Refaça a conta: \\( 2 \\cdot x \\cdot 3 \\)."),
          op(2, "\\( 2ab = 2x + 3 \\).", "e6_corrige_meio", "Aqui não estamos somando, estamos multiplicando."),
          op(3, "\\( 2ab = 2 \\cdot x \\cdot 3 = 6x \\).", "e7_conclui_quadrado_perfeito", "Perfeito. O termo do meio coincide com \\( 6x \\).")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e6_corrige_meio",
        "No termo \\( 2ab \\), trabalhamos com multiplicação: <strong>\\( 2 \\cdot x \\cdot 3 = 6x \\)</strong>.<br><br>Esse resultado precisa coincidir com o termo do meio do polinômio para que ele seja um quadrado perfeito.",
        "e7_conclui_quadrado_perfeito",
        "reflexao"
      ),

      etapaTexto(
        "e7_conclui_quadrado_perfeito",
        "Agora podemos juntar tudo:<ul><li>\\( x^2 \\) é \\( a^2 \\) para \\( a = x \\);</li><li>\\( 9 \\) é \\( b^2 \\) para \\( b = 3 \\);</li><li>\\( 6x \\) é \\( 2ab \\) para \\( a = x \\) e \\( b = 3 \\).</li></ul>Isso mostra que \\( x^2 + 6x + 9 \\) se encaixa exatamente no padrão \\( a^2 + 2ab + b^2 \\) e, portanto:<br><br>\\[ x^2 + 6x + 9 = (x + 3)^2 \\]",
        "e8_significado_fatorar",
        "reflexao"
      ),

      etapaEscolha(
        "e8_significado_fatorar",
        "Quando escrevemos \\( x^2 + 6x + 9 = (x + 3)^2 \\), o que significa 'fatorar' essa expressão?",
        [
          op(1, "Significa apenas 'deixar menor'.", "e8_corrige_significado", "Nem sempre a forma fatorada é 'menor'; ela é mais estruturada."),
          op(2, "Significa já resolver a equação.", "e8_corrige_significado", "Resolver equação usa fatoração, mas não é a mesma coisa."),
          op(3, "Significa reescrever o polinômio como um produto, em vez de soma de termos.", "e9_reverso", "Exatamente. Fatorar é enxergar a expressão em forma de produto.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e8_corrige_significado",
        "<strong>Fatorar</strong> é reescrever uma expressão de forma equivalente, mas em forma de produto de fatores.<br><br>Essa forma é especialmente útil para entender raízes e propriedades do polinômio.",
        "e9_reverso",
        "reflexao"
      ),

      etapaTexto(
        "e9_reverso",
        "Você já viu o caminho da expressão expandida para a fatorada. Vamos agora confirmar o caminho inverso:<br><br>Partindo de \\( (x + 3)^2 \\) e voltando para \\( x^2 + 6x + 9 \\), para ter certeza de que a equivalência faz sentido.",
        "e10_reexpansao",
        "reflexao"
      ),

      etapaEscolha(
        "e10_reexpansao",
        "Se você expandir \\( (x + 3)^2 \\), qual expressão obtém?",
        [
          op(1, "\\( x^2 + 9 \\).", "e10_corrige_reexpansao", "Você esqueceu os produtos cruzados \\( x \\cdot 3 \\) e \\( 3 \\cdot x \\)."),
          op(2, "\\( x^2 + 3x + 9 \\).", "e10_corrige_reexpansao", "Faltou multiplicar por 2 no termo do meio."),
          op(3, "\\( x^2 + 6x + 9 \\).", "e10_confirma_equiv", "Perfeito. Isso confirma a equivalência.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e10_corrige_reexpansao",
        "Expanda mentalmente \\( (x + 3)(x + 3) \\):<br><br>\\[ x \\cdot x + x \\cdot 3 + 3 \\cdot x + 3 \\cdot 3 \\]<br><br>\\[ x^2 + 3x + 3x + 9 = x^2 + 6x + 9 \\]<br><br>É esse vai-e-volta que garante confiança na fatoração.",
        "e10_confirma_equiv",
        "reflexao"
      ),

      etapaTexto(
        "e10_confirma_equiv",
        "Quando você domina tanto a expansão quanto a fatoração, passa a enxergar \\( x^2 + 6x + 9 \\) e \\( (x + 3)^2 \\) como duas maneiras equivalentes de representar a mesma ideia algébrica.",
        "e11_equacao_2grau",
        "reflexao"
      ),

      etapaEscolha(
        "e11_equacao_2grau",
        "Considere a equação \\( x^2 + 6x + 9 = 0 \\). Se já sabemos que \\( x^2 + 6x + 9 = (x + 3)^2 \\), qual é o caminho mais natural para resolver essa equação?",
        [
          op(1, "Substituir e escrever \\( (x + 3)^2 = 0 \\), depois perguntar quando um quadrado é zero.", "e12_produto_nulo", "Excelente abordagem."),
          op(2, "Dividir tudo por 9 para simplificar.", "e11_corrige_equacao", "Dividir não explora bem a estrutura do quadrado perfeito."),
          op(3, "Aplicar Bhaskara direto e ignorar a fatoração.", "e11_corrige_equacao", "Vamos aproveitar que já temos uma forma fatorada simples.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e11_corrige_equacao",
        "Fatorar antes de aplicar fórmulas pode simplificar muito o processo.<br><br>Aqui, a forma \\( (x + 3)^2 = 0 \\) nos dá uma pista direta sobre a solução.",
        "e12_produto_nulo",
        "reflexao"
      ),

      etapaEscolha(
        "e12_produto_nulo",
        "Se \\( (x + 3)^2 = 0 \\), o que isso nos diz sobre \\( x + 3 \\)?",
        [
          op(1, "Que \\( x + 3 \\) pode ser qualquer número.", "e12_corrige_produto_nulo", "Se a base fosse qualquer número não nulo, o quadrado não seria zero."),
          op(2, "Que \\( x + 3 \\) é necessariamente positivo.", "e12_corrige_produto_nulo", "Aqui estamos impondo que o quadrado seja zero, não apenas positivo."),
          op(3, "Que \\( x + 3 \\) precisa ser zero, porque um quadrado só é zero quando a base é zero.", "e13_encontra_raiz", "Correto. Esse é o princípio central.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e12_corrige_produto_nulo",
        "Se \\( A^2 = 0 \\), então \\( A = 0 \\). Esse raciocínio vale para qualquer número real.<br><br>Por isso, de \\( (x + 3)^2 = 0 \\) concluímos que <strong>\\( x + 3 = 0 \\)</strong>.",
        "e13_encontra_raiz",
        "reflexao"
      ),

      etapaEscolha(
        "e13_encontra_raiz",
        "Resolvendo \\( x + 3 = 0 \\), qual é o valor de \\( x \\)?",
        [
          op(1, "\\( x = 3 \\).", "e13_corrige_raiz", "Cuidado: precisamos 'anular' o \\(+3\\)."),
          op(2, "\\( x = -3 \\).", "e14_interpreta_raiz", "Perfeito. Essa é a raiz da equação."),
          op(3, "\\( x = 0 \\).", "e13_corrige_raiz", "Verifique: \\( 0 + 3 \\) resulta em 0?")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e13_corrige_raiz",
        "Para que \\( x + 3 \\) seja zero, precisamos somar um número que 'anule' o 3. Esse número é <strong>\\( -3 \\)</strong>.",
        "e14_interpreta_raiz",
        "reflexao"
      ),

      etapaTexto(
        "e14_interpreta_raiz",
        "Assim, a equação \\( x^2 + 6x + 9 = 0 \\) tem uma única raiz real: <strong>\\( x = -3 \\)</strong>.<br><br>Dizemos que é uma raiz dupla, pois ela aparece duas vezes na forma \\( (x + 3)(x + 3) = 0 \\).",
        "e15_outros_exemplos",
        "reflexao"
      ),

      etapaEscolha(
        "e15_outros_exemplos",
        "Agora vamos ver se você consegue aplicar o mesmo raciocínio em outro exemplo.<br><br>O polinômio \\( x^2 - 10x + 25 \\) pode ser escrito como:",
        [
          op(1, "\\( (x + 5)^2 \\).", "e15_feedback_errado1", "Verifique o sinal do termo do meio."),
          op(2, "\\( (x - 5)^2 \\).", "e15_feedback_correto1", "Muito bem, isso indica outro trinômio quadrado perfeito."),
          op(3, "\\( (x - 25)^2 \\).", "e15_feedback_errado1", "Observe qual número ao quadrado dá 25."),
          op(4, "Não sei, não parece produto notável.", "e15_feedback_errado1", "Vamos analisar termo a termo.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e15_feedback_errado1",
        "Em \\( x^2 - 10x + 25 \\), temos \\( a^2 = x^2 \\) e \\( b^2 = 25 \\), logo \\( a = x \\) e \\( b = 5 \\).<br><br>O termo do meio precisa coincidir com \\( -2ab = -2 \\cdot x \\cdot 5 = -10x \\). Por isso a forma fatorada é <strong>\\( (x - 5)^2 \\)</strong>.",
        "e15_feedback_correto1",
        "reflexao"
      ),

      etapaTexto(
        "e15_feedback_correto1",
        "Como \\( x^2 - 10x + 25 = (x - 5)^2 \\), a equação \\( x^2 - 10x + 25 = 0 \\) tem raiz dupla <strong>\\( x = 5 \\)</strong>.<br><br>Mais uma vez, a fatoração torna a solução muito clara.",
        "e16_diferenca_quadrados",
        "reflexao"
      ),

      etapaTexto(
        "e16_diferenca_quadrados",
        "Nem todo polinômio fatorável é quadrado perfeito. Um padrão muito importante é a <strong>diferença de quadrados</strong>: \\( a^2 - b^2 = (a + b)(a - b) \\).<br><br>Observe a figura abaixo e pense em como ela ajuda a visualizar \\( a^2 - b^2 \\).",
        "e17_diferenca_quadrados_q",
        "reflexao",
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e0dfd2fbb473d4d2a8d5d6c1116f7147ce7d65c4.jpg"
      ),

      etapaEscolha(
        "e17_diferenca_quadrados_q",
        "Qual das afirmativas abaixo descreve melhor a relação \\( a^2 - b^2 = (a + b)(a - b) \\)?",
        [
          op(1, "Ela diz apenas que \\( a^2 \\) é maior que \\( b^2 \\).", "e17_corrige_dif", "Isso não captura o padrão de fatoração."),
          op(2, "Ela mostra que a diferença de duas áreas quadradas pode ser vista como o produto da soma e da diferença dos lados.", "e18_reflexao_final", "Excelente leitura geométrica."),
          op(3, "Ela é um truque sem sentido, usado só em exercícios.", "e17_corrige_dif", "Na verdade, essa relação aparece em muitos problemas reais.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e17_corrige_dif",
        "A identidade \\( a^2 - b^2 = (a + b)(a - b) \\) é muito mais que um truque: ela conecta áreas, fatores e simplificações algébricas em diversos contextos.",
        "e18_reflexao_final",
        "reflexao"
      ),

      etapaEscolha(
        "e18_reflexao_final",
        "Depois de tudo isso, qual frase melhor representa o papel da fatoração em equações de 2º grau?",
        [
          op(1, "Ela é apenas uma etapa burocrática antes de aplicar fórmulas.", "e_final", "Na prática, muitas vezes dispensa fórmulas."),
          op(2, "Ela só serve para polinômios 'bonitinhos'.", "e_final", "Mesmo polinômios sem produto notável podem se beneficiar da tentativa de fatoração."),
          op(3, "Ela permite enxergar o polinômio como produto, facilitando encontrar raízes pelo princípio do produto nulo.", "e_final", "Excelente síntese.")
        ],
        "aprofundamento"
      ),

      etapaAvaliacao(
        "e_final",
        "Agora vamos registrar um resultado objetivo desta sessão.",
        "Analise as afirmações abaixo e marque a alternativa correta:",
        [
          { id: 1, texto: "Se \\( x^2 - 10x + 25 = 0 \\), então \\( (x - 5)^2 = 0 \\) e a única solução é \\( x = 5 \\)." },
          { id: 2, texto: "Se \\( x^2 + 6x + 9 = 0 \\), então \\( (x + 3)^2 = 0 \\) e a única solução é \\( x = -3 \\)." },
          { id: 3, texto: "Trinômios que se encaixam em \\( a^2 \\pm 2ab + b^2 \\) podem ser fatorados como \\( (a \\pm b)^2 \\)." },
          { id: 4, texto: "Todas as afirmativas acima estão corretas." }
        ],
        4,
        "Esses exemplos mostram a ligação direta entre produtos notáveis, fatoração e resolução de equações do 2º grau.",
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6e614336d63de13b4e54265a250f394d14630078.jpg"
      )
    ]
  },

  "EF.09.MAT.2.94": {
  id: "EF.09.MAT.2.94",
  titulo: "Simplificação de Expressões Algébricas",
  objetivo: "Simplificar expressões algébricas identificando fatores comuns, produtos notáveis, simplificando frações e calculando valores numéricos com segurança.",
  etapas: [
    // 1. Diagnóstico inicial
    etapaEscolha(
      "e1",
      "Quando você vê uma expressão como \\( 3x^2 + 6x \\), \\( 2x^2 + 8x + 8 \\) ou \\( \\frac{3x^2}{6x} \\), qual dessas atitudes mais parece com você?",
      [
        op(1, "Eu travo e só penso em 'fazer alguma conta' sem saber qual.", "e2_nao_sabe", "Ótimo ponto de partida. Vamos descobrir o que significa simplificar."),
        op(2, "Eu tento somar tudo direto, como se fosse um número só.", "e2_somar", "Vamos ver quando somar faz sentido e quando não."),
        op(3, "Eu já olho se tem fator comum ou se parece com produto notável.", "e2_avancado", "Excelente. Vamos aprofundar esse olhar."),
        op(4, "Eu penso primeiro em substituir um valor para \\( x \\) e calcular.", "e2_valor_numerico", "Boa estratégia, mas simplificar antes costuma reduzir erros.")
      ],
      "pergunta_diagnostica"
    ),

    // 2. Caminho para quem não sabe / tenta somar
    etapaTexto(
      "e2_nao_sabe",
      "Simplificar uma expressão algélica não é 'fazer qualquer conta' nem 'somar tudo'. É reescrever a mesma expressão de modo mais organizado, revelando fatores comuns, produtos notáveis ou frações reduzidas.",
      "e3_expressao_visao",
      "reflexao"
    ),

    etapaTexto(
      "e2_somar",
      "Somar todos os termos funciona quando eles são semelhantes, como \\( 3x + 2x = 5x \\). Mas em \\( 3x^2 + 6x \\), os termos têm graus diferentes e não podem ser simplesmente somados. Vamos aprender a olhar para a estrutura antes de somar.",
      "e3_expressao_visao",
      "reflexao"
    ),

    // 3. Caminho para quem já olha padrão / valor numérico
    etapaTexto(
      "e2_avancado",
      "Ótimo que você já busca fatores comuns e produtos notáveis. Nesta habilidade, vamos consolidar esses atalhos, cuidar da simplificação de frações e do cálculo de valor numérico com prioridade de operações.",
      "e3_expressao_visao",
      "reflexao"
    ),

    etapaTexto(
      "e2_valor_numerico",
      "Calcular valor numérico é importante, mas fazer isso sobre uma expressão simplificada costuma ser mais fácil e menos sujeito a erros de sinais ou ordens de operações. Vamos treinar simplificação antes da substituição.",
      "e3_expressao_visao",
      "reflexao"
    ),

    etapaTexto(
      "e3_expressao_visao",
      "Vamos começar com uma expressão simples: \\( 3x^2 + 6x \\). Em vez de somar, faremos três perguntas:<br><br> -> que tipos de termos são esses? <br><br> -> existe algo repetido em todos eles? <br><br> -> posso escrever essa expressão como produto de fatores?",
      "e3_tipo_termos",
      "reflexao"
    ),

    // 4. Tipos de termos
    etapaEscolha(
      "e3_tipo_termos",
      "Em \\( 3x^2 + 6x \\), como você classificaria cada termo?",
      [
        op(1, "Ambos são termos quadráticos.", "e3_corrige_tipo", "Veja a diferença entre \\( x^2 \\) e \\( x \\)."),
        op(2, "O primeiro é quadrático e o segundo é linear.", "e4_fator_comum_simples", "Correto: isso é típico de expressões de 2º grau."),
        op(3, "São apenas 'números com letras', não sei classificar.", "e3_corrige_tipo", "Vamos organizar essa ideia.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e3_corrige_tipo",
      "Em \\( 3x^2 + 6x \\): <br><br> -> \\( 3x^2 \\) é termo quadrático (variável ao quadrado); <br><br> -> \\( 6x \\) é termo linear (variável na primeira potência). Reconhecer isso ajuda a escolher estratégias de simplificação.",
      "e4_fator_comum_simples",
      "reflexao"
    ),

    // 5. Fator comum simples
    etapaTexto(
      "e4_fator_comum_simples",
      "Agora vamos procurar fatores comuns. Em \\( 3x^2 + 6x \\), pergunte:<br><br> -> que número aparece em todos os coeficientes? <br><br> -> que letra aparece em todos os termos?",
      "e4_escolha_fator",
      "reflexao"
    ),

    etapaEscolha(
      "e4_escolha_fator",
      "Qual dos candidatos abaixo pode ser fator comum em \\( 3x^2 + 6x \\)?",
      [
        op(1, "Apenas \\( x \\).", "e4_corrige_fator", "Veja que os números 3 e 6 também têm algo em comum."),
        op(2, "Apenas \\( 3 \\).", "e4_corrige_fator", "Observe que a letra x também se repete."),
        op(3, "\\( 3x \\).", "e5_fator_em_evidencia", "Perfeito: 3 aparece em ambos os coeficientes e x em ambos os termos.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e4_corrige_fator",
      "Fator comum é tudo aquilo que aparece em todos os termos ao mesmo tempo. Em \\( 3x^2 + 6x \\), tanto o número 3 quanto a letra x aparecem em todos os termos, então \\( 3x \\) é um bom candidato.",
      "e5_fator_em_evidencia",
      "reflexao"
    ),

    etapaEscolha(
      "e5_fator_em_evidencia",
      "Colocando \\( 3x \\) em evidência em \\( 3x^2 + 6x \\), qual forma você obtém?",
      [
        op(1, "\\( 3x(x + 2) \\).", "e6_interpreta_fatoracao", "Correto: dividindo cada termo por \\( 3x \\), obtemos \\( x \\) e \\( 2 \\)."),
        op(2, "\\( 3x(x^2 + 2x) \\).", "e5_corrige_evidencia", "Você ainda não dividiu os termos pelo fator comum."),
        op(3, "\\( x(3x + 6) \\).", "e5_corrige_evidencia", "Isso é fatoração parcial: ainda podemos colocar \\( 3 \\) em evidência.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e5_corrige_evidencia",
      "Para colocar \\( 3x \\) em evidência, dividimos cada termo por \\( 3x \\): \\( 3x^2 ÷  3x = x \\) e \\( 6x ÷  3x = 2 \\). Assim, \\( 3x^2 + 6x = 3x(x + 2) \\).",
      "e6_interpreta_fatoracao",
      "reflexao"
    ),

    etapaTexto(
      "e6_interpreta_fatoracao",
      "Escrever \\( 3x^2 + 6x = 3x(x + 2) \\) é uma simplificação: a expressão fica em forma de produto, o que ajuda tanto na leitura da estrutura quanto em cálculos de valor numérico e resolução de equações.",
      "e7_valor_numerico_simples",
      "reflexao"
    ),

    // 6. Valor numérico: checando equivalência
    etapaEscolha(
      "e7_valor_numerico_simples",
      "Se \\( x = 2 \\), qual é o valor numérico de \\( 3x^2 + 6x \\)?",
      [
        op(1, "24", "e7_feedback_valor_correto", "Correto: \\( 3 \\cdot 4 + 12 = 12 + 12 = 24 \\)."),
        op(2, "12", "e7_corrige_valor", "Revise o cálculo de \\( x^2 \\)."),
        op(3, "36", "e7_corrige_valor", "Veja se não multiplicou algo a mais.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_corrige_valor",
      "Substituindo \\( x = 2 \\) em \\( 3x^2 + 6x \\): <br><br> \\( 3 \\cdot 2^2 + 6 \\cdot 2 = <br><br> 3 \\cdot 4 + 12 = 12 + 12 = 24 \\).",
      "e7_feedback_valor_correto",
      "reflexao"
    ),

    etapaTexto(
      "e7_feedback_valor_correto",
      "Agora use a forma fatorada \\( 3x(x + 2) \\) com \\( x = 2 \\): \\( 3 \\cdot 2 \\cdot (2 + 2) = <br><br> 3 \\cdot 2 \\cdot 4 = <br><br> 6 \\cdot 4 = 24 \\). A igualdade entre os valores mostra que as duas formas são equivalentes.",
      "e8_pesquisa_rapida",
      "reflexao"
    ),

    // 7. Momento de pesquisa / treino autônomo
    etapaTexto(
      "e8_pesquisa_rapida",
      "Se você sente insegurança com fator comum, faça uma mini-lista em um caderno: <br><br> -> escreva três expressões, por exemplo \\( 4x^2 + 8x \\), \\( 5x^2 + 15x \\) e \\( 6x^2 + 9x \\); <br><br> -> tente identificar o maior fator comum em cada uma; <br><br> -> reescreva todas em forma de produto. Depois volte aqui e compare suas respostas com a forma do tutor.",
      "e9_expressao_mais_complexa",
      "reflexao"
    ),

    // 8. Expressão mais complexa com produto notável
    etapaTexto(
      "e9_expressao_mais_complexa",
      "Vamos analisar agora \\( 2x^2 + 8x + 8 \\). Em vez de somar tudo, vamos seguir uma sequência: <br><br> -> procurar fator comum; <br><br> -> olhar para o polinômio dentro do parêntese; <br><br> -> verificar se há produto notável.",
      "e9_escolha_caminho",
      "reflexao"
    ),

    etapaEscolha(
      "e9_escolha_caminho",
      "Qual estratégia você usaria primeiro para simplificar \\( 2x^2 + 8x + 8 \\)?",
      [
        op(1, "Procurar fator comum em todos os termos.", "e10_fator_comum2", "Bom começo. Fator comum costuma simplificar bastante."),
        op(2, "Tentar encaixar direto em \\( (x + a)^2 \\).", "e10_quadrado_direto", "Vamos primeiro ver se há um fator que pode ser colocado em evidência."),
        op(3, "Calcular valor numérico com algum \\( x \\) e não mexer na forma.", "e10_valor_direto", "Vamos além do valor numérico: queremos compreender a estrutura.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e10_valor_direto",
      "Calcular valor numérico é apenas uma parte do trabalho. Simplificar a expressão ajuda a enxergar padrões e reaproveitar raciocínios em diferentes problemas.",
      "e10_fator_comum2",
      "reflexao"
    ),

    etapaTexto(
      "e10_quadrado_direto",
      "Antes de tentar encaixar \\( 2x^2 + 8x + 8 \\) em \\( (x + a)^2 \\), vale verificar se há algum fator comum que possa ser colocado em evidência.",
      "e10_fator_comum2",
      "reflexao"
    ),

    etapaEscolha(
      "e10_fator_comum2",
      "Qual é o maior fator comum que aparece em todos os termos de \\( 2x^2 + 8x + 8 \\)?",
      [
        op(1, "Apenas \\( x \\).", "e10_corrige_comum2", "Observe os números 2, 8 e 8."),
        op(2, "Apenas \\( 2 \\).", "e11_evidencia2", "Correto: 2 divide todos os coeficientes."),
        op(3, "\\( 2x \\).", "e10_corrige_comum2", "Veja se todos os termos têm x.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e10_corrige_comum2",
      "Em \\( 2x^2 + 8x + 8 \\), os coeficientes 2, 8 e 8 são todos múltiplos de 2, mas nem todos têm x. Por isso o maior fator comum é \\( 2 \\), não \\( 2x \\).",
      "e11_evidencia2",
      "reflexao"
    ),

    etapaEscolha(
      "e11_evidencia2",
      "Colocando \\( 2 \\) em evidência em \\( 2x^2 + 8x + 8 \\), qual forma correta você obtém?",
      [
        op(1, "\\( 2(x^2 + 4x + 4) \\).", "e12_quadrado_perfeito2", "Perfeito: cada termo foi dividido por 2."),
        op(2, "\\( 2(x^2 + 8x + 8) \\).", "e11_corrige_evidencia2", "Você apenas repetiu a expressão dentro do parêntese."),
        op(3, "\\( 2(x^2 + 6x + 4) \\).", "e11_corrige_evidencia2", "Reveja as divisões por 2.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e11_corrige_evidencia2",
      "Dividindo cada termo de \\( 2x^2 + 8x + 8 \\) por 2: <br><br> -> \\( 2x^2 / 2 = x^2 \\); <br><br> -> \\( 8x / 2 = 4x \\); <br><br> -> \\( 8 / 2 = 4 \\). Assim, \\( 2x^2 + 8x + 8 = 2(x^2 + 4x + 4) \\).",
      "e12_quadrado_perfeito2",
      "reflexao"
    ),

    etapaTexto(
      "e12_quadrado_perfeito2",
      "Agora, dentro do parêntese, temos \\( x^2 + 4x + 4 \\). Essa expressão lembra o padrão \\( a^2 + 2ab + b^2 \\). Vamos conferir se ela é um trinômio quadrado perfeito.",
      "e13_confere_quadrado2",
      "reflexao"
    ),

    etapaEscolha(
      "e13_confere_quadrado2",
      "Se \\( x^2 + 4x + 4 \\) é do tipo \\( a^2 + 2ab + b^2 \\), quais valores de \\( a \\) e \\( b \\) fazem sentido?",
      [
        op(1, "\\( a = x \\) e \\( b = 2 \\).", "e14_forma_final2", "Boa escolha. Verifique \\( 2ab \\)."),
        op(2, "\\( a = 2 \\) e \\( b = x \\).", "e13_corrige_quadrado2", "A ordem dos termos fica um pouco confusa."),
        op(3, "\\( a = x^2 \\) e \\( b = 4 \\).", "e13_corrige_quadrado2", "Se \\( a = x^2 \\), então \\( a^2 = x^4 \\), o que não bate com \\( x^2 \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e13_corrige_quadrado2",
      "Em \\( x^2 + 4x + 4 \\), o primeiro termo é \\( x^2 \\), então faz sentido pensar \\( a = x \\). O último termo é 4, então \\( b = 2 \\). O termo do meio deve ser \\( 2ab = 2 \\cdot x \\cdot 2 = 4x \\), que coincide com o termo da expressão.",
      "e14_forma_final2",
      "reflexao"
    ),

    etapaTexto(
      "e14_forma_final2",
      "Concluímos que \\( x^2 + 4x + 4 = (x + 2)^2 \\). Então a expressão original \\( 2x^2 + 8x + 8 \\) pode ser escrita como:<br><br>\\[ 2x^2 + 8x + 8 = <br><br> 2(x^2 + 4x + 4) = <br><br> 2(x + 2)^2. \\]",
      "e15_reflexao_produtos",
      "reflexao"
    ),

    etapaTexto(
      "e15_reflexao_produtos",
      "Perceba que a simplificação passou por duas etapas: <br><br> -> fator comum em evidência; <br><br> -> reconhecimento de trinômio quadrado perfeito. Essa combinação é muito poderosa para dominar descritores de fatoração e simplificação.",
      "e16_valor_numerico2",
      "reflexao"
    ),

    etapaEscolha(
      "e16_valor_numerico2",
      "Se \\( x = -2 \\), qual é o valor numérico de \\( 2(x + 2)^2 \\)?",
      [
        op(1, "0", "e16_feedback_valor2_certo", "Correto: \\( x + 2 = 0 \\), então o quadrado é 0 e o produto também."),
        op(2, "8", "e16_feedback_valor2_errado", "Reveja o valor de \\( x + 2 \\) para \\( x = -2 \\)."),
        op(3, "4", "e16_feedback_valor2_errado", "Quando a base do quadrado é 0, o resultado não pode ser 4.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e16_feedback_valor2_errado",
      "Com \\( x = -2 \\), temos \\( x + 2 = 0 \\). Logo \\( (x + 2)^2 = 0^2 = 0 \\) e \\( 2 \\cdot 0 = 0 \\).",
      "e16_feedback_valor2_certo",
      "reflexao"
    ),

    etapaTexto(
      "e16_feedback_valor2_certo",
      "A forma simplificada \\( 2(x + 2)^2 \\) torna evidente que quando \\( x = -2 \\), o valor da expressão é 0, pois o fator \\( (x + 2)^2 \\) zera o produto.",
      "e17_fracao_simples",
      "reflexao"
    ),

    // 9. Simplificação de frações algébricas
    etapaTexto(
      "e17_fracao_simples",
      "Outro campo importante da simplificação é trabalhar com frações algélicas. Vamos começar com \\( \\frac{3x^2}{6x} \\) e pensar em fator comum na forma de fração.",
      "e17_escolha_fracao",
      "reflexao"
    ),

    etapaEscolha(
      "e17_escolha_fracao",
      "Como você simplificaria \\( \\frac{3x^2}{6x} \\)?",
      [
        op(1, "Dividindo numerador e denominador por 3x.", "e18_fracao_correta", "Excelente: isso usa fator comum na fração."),
        op(2, "Somando 3x^2 com 6x.", "e17_corrige_fracao", "Soma não é simplificação de fração."),
        op(3, "Substituindo x por um número qualquer e calculando.", "e17_corrige_fracao", "Isso dá um valor numérico, mas não simplifica a expressão.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e17_corrige_fracao",
      "Para simplificar uma fração algélica, não somamos numerador e denominador. Buscamos fatores comuns e usamos a divisão para reduzir a fração.",
      "e18_fracao_correta",
      "reflexao"
    ),

    etapaTexto(
      "e18_fracao_correta",
      "Dividindo numerador e denominador por 3x:<br><br>\\[ \\frac{3x^2}{6x} = \\frac{3x^2 \\div 3x}{6x \\div 3x} = \\frac{x}{2}. \\]<br><br>Assim, a expressão simplificada é \\( \\frac{x}{2} \\).",
      "e19_fracao_composta",
      "reflexao"
    ),

    // 10. Fração um pouco mais composta
    etapaTexto(
      "e19_fracao_composta",
      "Vamos complicar um pouco: <br><br> \\( \\frac{2x^2 + 8x}{4x} \\) <br><br> Podemos aplicar a mesma lógica: fatorar o numerador e depois simplificar a fração.",
      "e19_escolha_fracao_composta",
      "reflexao"
    ),

    etapaEscolha(
      "e19_escolha_fracao_composta",
      "Qual das estratégias abaixo faz mais sentido para simplificar <br><br> \\( \\frac{2x^2 + 8x}{4x} \\)?",
      [
        op(1, "Fatorar o numerador colocando \\( 2x \\) em evidência antes de simplificar.", "e20_fracao_composta_fatora", "Essa abordagem organiza bem a expressão."),
        op(2, "Dividir \\( 2x^2 + 8x \\) por 4x termo a termo direto.", "e20_fracao_composta_direto", "Também funciona, mas fique atento aos detalhes."),
        op(3, "Somar numerador e denominador.", "e19_corrige_composta", "Somar não é simplificar fração.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e19_corrige_composta",
      "Somar numerador e denominador muda completamente a expressão, não a simplifica. Nosso objetivo é reduzir a fração, mantendo equivalência.",
      "e20_fracao_composta_fatora",
      "reflexao"
    ),

    etapaTexto(
      "e20_fracao_composta_fatora",
      "No numerador, \\( 2x^2 + 8x \\) tem fator comum \\( 2x \\): <br><br> \\( 2x^2 + 8x = 2x(x + 4) \\). Então:<br><br>\\[ \\frac{2x^2 + 8x}{4x} = \\frac{2x(x + 4)}{4x}. \\]<br><br>Agora, podemos simplificar dividindo numerador e denominador por 2x.",
      "e21_fracao_composta_simplifica",
      "reflexao"
    ),

    etapaTexto(
      "e20_fracao_composta_direto",
      "Dividindo termo a termo: \\( \\frac{2x^2}{4x} = \\frac{x}{2} \\) e \\( \\frac{8x}{4x} = 2 \\). Juntando:<br><br>\\[ \\frac{2x^2 + 8x}{4x} = \\frac{x}{2} + 2. \\]<br><br>Vamos comparar essa forma com a obtida via fatoração.",
      "e21_fracao_composta_simplifica",
      "reflexao"
    ),

    etapaTexto(
      "e21_fracao_composta_simplifica",
      "Voltando à forma fatorada: \\( \\frac{2x(x + 4)}{4x} \\). Dividindo numerador e denominador por 2x, obtemos:<br><br>\\[ \\frac{2x(x + 4) \\div 2x}{4x \\div 2x} = \\frac{x + 4}{2}. \\]<br><br>Verifique que \\( \\frac{x + 4}{2} \\) e \\( \\frac{x}{2} + 2 \\) são equivalentes.",
      "e22_reflexao_fracoes",
      "reflexao"
    ),

    etapaTexto(
      "e22_reflexao_fracoes",
      "Multiplicando \\( \\frac{x}{2} + 2 \\) por 2 para juntar os termos: <br><br> \\( \\frac{x}{2} + 2 = \\frac{x}{2} + \\frac{4}{2} = \\frac{x + 4}{2} \\). Então as formas \\( \\frac{x + 4}{2} \\) e \\( \\frac{x}{2} + 2 \\) representam a mesma expressão simplificada.",
      "e23_reflexao_final",
      "reflexao"
    ),

    // 11. Reflexão final + avaliação
    etapaEscolha(
      "e23_reflexao_final",
      "Depois desta sessão, qual frase melhor representa o que significa simplificar uma expressão algélica?",
      [
        op(1, "Significa reescrever a expressão de forma equivalente, mas mais organizada, revelando fatores comuns, produtos notáveis e frações reduzidas.", "e_final", "Excelente síntese."),
        op(2, "Significa apenas calcular um valor numérico qualquer.", "e_final", "Calcular valor numérico é uma etapa, não a definição de simplificação."),
        op(3, "Significa sempre diminuir os números da expressão.", "e_final", "Às vezes os números mudam, mas o mais importante é a estrutura.")
      ],
      "aprofundamento"
    ),

    etapaAvaliacao(
      "e_final",
      "Agora vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "Em \\( 3x^2 + 6x \\), o fator comum \\( 3x \\) permite escrever a expressão como \\( 3x(x + 2) \\)." },
        { id: 2, texto: "Em \\( 2x^2 + 8x + 8 \\), colocar \\( 2 \\) em evidência leva a \\( 2(x^2 + 4x + 4) \\), que é \\( 2(x + 2)^2 \\)." },
        { id: 3, texto: "Na fração \\( \\frac{3x^2}{6x} \\), dividir numerador e denominador por \\( 3x \\) resulta em \\( \\frac{x}{2} \\)." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas afirmações mostram o uso de fator comum, produtos notáveis e simplificação de frações algélicas para dominar a habilidade de simplificar expressões.",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6e614336d63de13b4e54265a250f394d14630078.jpg"
    )
  ]
  },

  "EF.09.MAT.3.100": {
    id: "EF.09.MAT.3.100",
    titulo: "Teorema de Pitágoras: Álgebra e Geometria",
    objetivo: "Relacionar a fórmula \\( c^2 = a^2 + b^2 \\) com a interpretação geométrica em termos de áreas de quadrados construídos sobre os lados de um triângulo retângulo, reconhecendo sua validade para qualquer triângulo retângulo.",
    etapas: [

      // ─── DIAGNÓSTICO ───────────────────────────────────────────────
      etapaEscolha(
        "e1",
        "Quando você pensa no Teorema de Pitágoras, o que vem primeiro à sua cabeça?",
        [
          op(1, "A fórmula \\( a^2 + b^2 = c^2 \\), mas sem saber de onde ela vem.", "e2_formula_sem_origem", "Ótimo. Vamos descobrir de onde essa fórmula nasce."),
          op(2, "Quadrados desenhados sobre os lados do triângulo.", "e2_quadrados", "Excelente. Você já tem uma intuição geométrica importante."),
          op(3, "Nada. Nunca vi ou não me lembro.", "e2_nunca_viu", "Tudo bem. Vamos construir a ideia do zero, com imagens."),
          op(4, "Sei calcular, mas não sei por que a fórmula é verdadeira.", "e2_calcula_sem_entender", "Essa é exatamente a questão desta sessão: entender a validade.")
        ],
        "pergunta_diagnostica"
      ),

      // ─── CAMINHOS DO DIAGNÓSTICO ────────────────────────────────────
      etapaTexto(
        "e2_formula_sem_origem",
        "A fórmula \\( a^2 + b^2 = c^2 \\) não surgiu do nada. Ela descreve uma relação geométrica real entre áreas. Antes de calcular qualquer coisa, vamos ver o que essa equação está dizendo visualmente.",
        "e3_triangulo_retangulo",
        "reflexao"
      ),

      etapaTexto(
        "e2_quadrados",
        "Você já tem a intuição certa. Os quadrados construídos sobre os lados do triângulo são exatamente a chave para entender por que \\( a^2 + b^2 = c^2 \\) é verdadeiro. Vamos aprofundar essa visão.",
        "e3_triangulo_retangulo",
        "reflexao"
      ),

      etapaTexto(
        "e2_nunca_viu",
        "Vamos começar com calma. Um triângulo retângulo é qualquer triângulo que tem um ângulo de exatamente 90°. Esse tipo de triângulo esconde uma relação surpreendente entre os comprimentos dos seus lados.",
        "e3_triangulo_retangulo",
        "reflexao"
      ),

      etapaTexto(
        "e2_calcula_sem_entender",
        "Saber calcular é o primeiro passo. Mas entender por que a fórmula é verdadeira é o que transforma uma receita em matemática de verdade. Vamos usar geometria para justificar a álgebra.",
        "e3_triangulo_retangulo",
        "reflexao"
      ),

      // ─── ANATOMIA DO TRIÂNGULO RETÂNGULO ───────────────────────────
      etapaTexto(
        "e3_triangulo_retangulo",
        "O triângulo retângulo tem três lados com nomes específicos:<br><br>" +
        "-> Hipotenusa: o lado oposto ao ângulo reto. É sempre o maior lado.<br><br>" +
        "-> Catetos: os dois outros lados, que formam o ângul o reto entre si." +
        "Observe o diagrama abaixo e identifique cada parte.",
        "e3_identificar_lados",
        "reflexao",
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Pythagorean.svg"
      ),

      etapaEscolha(
        "e3_identificar_lados",
        "Em um triângulo retângulo, qual dos lados é sempre a hipotenusa?",
        [
          op(1, "O menor lado do triângulo.", "e3_corrige_lados", "Esse seria um dos catetos, não a hipotenusa."),
          op(2, "Qualquer lado, dependendo de como o triângulo está orientado.", "e3_corrige_lados", "Não: a hipotenusa é sempre o lado oposto ao ângulo reto, independente de orientação."),
          op(3, "O maior lado, oposto ao ângulo reto.", "e4_enunciado_algebrico", "Correto. A hipotenusa é sempre oposta ao ângulo de 90°.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e3_corrige_lados",
        "A hipotenusa é sempre o lado oposto ao ângulo reto (90°). Independente de como o triângulo está posicionado na página, basta localizar o ângulo reto e o lado oposto a ele será a hipotenusa.",
        "e4_enunciado_algebrico",
        "reflexao"
      ),

      // ─── ENUNCIADO ALGÉBRICO ────────────────────────────────────────
      etapaTexto(
        "e4_enunciado_algebrico",
        "O Teorema de Pitágoras diz:<br><br>" +
        "-> Em todo triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.<br><br>" +
        "Se chamamos a hipotenusa de \\( c \\) e os catetos de \\( a \\) e \\( b \\), a relação algébrica é:<br><br>" +
        "\\( c^2 = a^2 + b^2 \\).<br><br><br><br>" +
        "Até aqui temos apenas a equação. A grande pergunta é: o que \\( a^2 \\), \\( b^2 \\) e \\( c^2 \\) representam geometricamente?",
        "e5_o_que_significa_quadrado",
        "reflexao"
      ),

      // ─── O QUE É "ELEVAR AO QUADRADO" GEOMETRICAMENTE ──────────────
      etapaEscolha(
        "e5_o_que_significa_quadrado",
        "Na expressão \\( c^2 \\), o que significa geometricamente elevar um comprimento ao quadrado?",
        [
          op(1, "Significa dobrar o comprimento.", "e5_corrige_quadrado", "Dobrar seria \\( 2c \\), não \\( c^2 \\)."),
          op(2, "Significa a área de um quadrado de lado \\( c \\).", "e6_demonstracao_geometrica", "Exatamente. \\( c^2 \\) é a área do quadrado cujo lado mede \\( c \\)."),
          op(3, "Não tem significado geométrico, é só uma operação.", "e5_corrige_quadrado", "Tem sim: toda potência de segundo grau corresponde a uma área.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e5_corrige_quadrado",
        "Quando escrevemos \\( c^2 \\), estamos calculando a área de um quadrado cujo lado mede \\( c \\). O mesmo vale para \\( a^2 \\) e \\( b^2 \\). Isso transforma a equação algébrica em uma afirmação sobre áreas.",
        "e6_demonstracao_geometrica",
        "reflexao"
      ),

      // ─── DEMONSTRAÇÃO GEOMÉTRICA POR ÁREAS (TRÊS QUADRADOS) ────────
      etapaTexto(
        "e6_demonstracao_geometrica",
        "Agora a equação \\( c^2 = a^2 + b^2 \\) pode ser lida como:<br><br>" +
        "-> A área do quadrado construído sobre a hipotenusa é igual à soma das áreas dos quadrados construídos sobre os dois catetos.<br><br><br><br>" +
        "Na figura, você vê um triângulo retângulo e, sobre cada lado, um quadrado. As áreas dos quadrados dos catetos se somam e cobrem exatamente a área do quadrado da hipotenusa.",
        "e6_interpreta_figura",
        "reflexao",
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Pythagorean.svg"
      ),

      etapaEscolha(
        "e6_interpreta_figura",
        "Na demonstração geométrica com três quadrados, o quadrado construído sobre a hipotenusa representa, em linguagem algébrica:",
        [
          op(1, "\\( 2c \\), o dobro da hipotenusa.", "e6_corrige_figura", "Não: o quadrado construído sobre um lado representa o quadrado desse comprimento, ou seja, \\( c^2 \\)."),
          op(2, "\\( c^2 \\), a área do quadrado de lado \\( c \\).", "e7_verificacao_numerica", "Exato. Essa conexão entre a figura e a álgebra é o coração da demonstração."),
          op(3, "A soma dos perímetros de todos os lados.", "e6_corrige_figura", "Perímetro usa somas de comprimentos, aqui estamos falando de áreas.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e6_corrige_figura",
        "O quadrado construído sobre um lado de comprimento \\( c \\) tem área \\( c \\times c = c^2 \\). Os quadrados sobre os catetos têm áreas \\( a^2 \\) e \\( b^2 \\). A demonstração geométrica mostra que a área do quadrado da hipotenusa é exatamente igual a \\( a^2 + b^2 \\).",
        "e7_verificacao_numerica",
        "reflexao"
      ),

      // ─── VERIFICAÇÃO NUMÉRICA NA TERNA 3–4–5 (LINHA A LINHA) ───────
      etapaTexto(
        "e7_verificacao_numerica",
        "Vamos verificar a validade do teorema com a terna pitagórica (3, 4, 5).<br><br>" +
        "Considere um triângulo retângulo com catetos \\( a = 3 \\) e \\( b = 4 \\) e hipotenusa \\( c = 5 \\).<br><br><br><br>" +
        "1) \\( a^2 = 3^2 = 9 \\)<br><br>" +
        "2) \\( b^2 = 4^2 = 16 \\)<br><br>" +
        "3) \\( a^2 + b^2 = 9 + 16 = 25 \\)<br><br>" +
        "4) \\( c^2 = 5^2 = 25 \\)<br><br><br><br>" +
        "Como \\( a^2 + b^2 = c^2 \\), as áreas se encaixam e confirmam o Teorema de Pitágoras para esse triângulo.",
        "e7_confirma_345",
        "reflexao"
      ),

      etapaEscolha(
        "e7_confirma_345",
        "Com os valores \\( 9 \\), \\( 16 \\) e \\( 25 \\), o Teorema de Pitágoras é verificado?",
        [
          op(1, "Não, porque os números são muito diferentes entre si.", "e7_corrige_345", "Compare a soma das duas áreas menores com a área maior."),
          op(2, "Sim, porque \\( 9 + 16 = 25 \\), ou seja, \\( a^2 + b^2 = c^2 \\).", "e8_validade_geral", "Perfeito. A igualdade confirma o teorema numericamente."),
          op(3, "Não dá para saber sem saber o ângulo reto.", "e7_corrige_345", "O ângulo reto já está garantido pela definição do triângulo retângulo.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e7_corrige_345",
        "Reorganizando os cálculos:<br><br>" +
        "1) \\( a^2 = 9 \\)<br><br>" +
        "2) \\( b^2 = 16 \\)<br><br>" +
        "3) \\( a^2 + b^2 = 9 + 16 = 25 \\)<br><br>" +
        "4) \\( c^2 = 25 \\)<br><br><br><br>" +
        "Logo, \\( a^2 + b^2 = c^2 \\).",
        "e8_validade_geral",
        "reflexao"
      ),

      // ─── VALIDADE PARA QUALQUER TRIÂNGULO RETÂNGULO ─────────────────
      etapaTexto(
        "e8_validade_geral",
        "O exemplo (3, 4, 5) confirma numericamente, mas o Teorema de Pitágoras é válido para qualquer triângulo retângulo, com qualquer medida de catetos, não apenas para ternas com números inteiros.",
        "e8_outro_exemplo",
        "reflexao"
      ),

      etapaEscolha(
        "e8_outro_exemplo",
        "Um triângulo retângulo tem catetos \\( a = 1 \\) e \\( b = 1 \\). Qual seria a hipotenusa, e isso confirma que o teorema funciona fora das ternas inteiras?",
        [
          op(1, "\\( c = 2 \\), mas o teorema só funciona para números inteiros.", "e8_corrige_outro_exemplo", "Reveja: \\( 1^2 + 1^2 = 2 \\), então \\( c = \\sqrt{2} \\), não 2."),
          op(2, "\\( c = \\sqrt{2} \\), e o teorema funciona mesmo com resultado irracional.", "e9_triangulo_invalido", "Correto. O teorema vale para qualquer triângulo retângulo, mesmo que a hipotenusa seja irracional."),
          op(3, "Não é possível calcular porque \\( \\sqrt{2} \\) não é um número.", "e8_corrige_outro_exemplo", "\\( \\sqrt{2} \\) é um número real, apenas irracional.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e8_corrige_outro_exemplo",
        "1) \\( a^2 = 1^2 = 1 \\)<br><br>" +
        "2) \\( b^2 = 1^2 = 1 \\)<br><br>" +
        "3) \\( c^2 = a^2 + b^2 = 1 + 1 = 2 \\)<br><br>" +
        "4) \\( c = \\sqrt{2} \\)<br><br><br><br>" +
        "Mesmo assim, a igualdade \\( c^2 = a^2 + b^2 \\) continua verdadeira. O teorema funciona para qualquer triângulo retângulo.",
        "e9_triangulo_invalido",
        "reflexao"
      ),

      // ─── RECONHECER QUANDO O TEOREMA SE APLICA ─────────────────────
      etapaEscolha(
        "e9_triangulo_invalido",
        "Para qual dos triângulos abaixo o Teorema de Pitágoras se aplica diretamente?",
        [
          op(1, "Um triângulo com ângulos 60°, 60° e 60°.", "e9_corrige_invalido", "Esse é um triângulo equilátero, sem ângulo reto. Pitágoras não se aplica diretamente."),
          op(2, "Um triângulo com ângulos 90°, 45° e 45°.", "e10_reciproca", "Correto: tem ângulo de 90°, então é retângulo e o teorema se aplica."),
          op(3, "Um triângulo com ângulos 30°, 60° e 90°.", "e10_reciproca", "Correto também: tem ângulo de 90°, portanto é retângulo.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e9_corrige_invalido",
        "O Teorema de Pitágoras aplica-se somente a triângulos retângulos, ou seja, aqueles que possuem exatamente um ângulo de 90°.",
        "e10_reciproca",
        "reflexao"
      ),

      // ─── RECÍPROCA DO TEOREMA ───────────────────────────────────────
      etapaTexto(
        "e10_reciproca",
        "O Teorema de Pitágoras também funciona no sentido inverso, chamado recíproca:<br><br>" +
        "-> Se três lados \\( a \\), \\( b \\) e \\( c \\) satisfazem \\( a^2 + b^2 = c^2 \\), então o triângulo formado por eles é necessariamente retângulo.<br><br>" +
        "Isso permite verificar se um triângulo é retângulo sem medir ângulos.",
        "e10_reciproca_q",
        "reflexao"
      ),

      etapaEscolha(
        "e10_reciproca_q",
        "Um triângulo tem lados medindo 6, 8 e 10. Ele é retângulo?",
        [
          op(1, "Não é possível saber sem medir os ângulos.", "e10_corrige_reciproca", "A recíproca do teorema permite decidir isso apenas com os comprimentos dos lados."),
          op(2, "Não, porque os lados não são (3, 4, 5).", "e10_corrige_reciproca", "Os lados (6, 8, 10) são o dobro de (3, 4, 5). Verifique se satisfazem \\( a^2 + b^2 = c^2 \\)."),
          op(3, "Sim, porque \\( 6^2 + 8^2 = 36 + 64 = 100 = 10^2 \\).", "e11_problema_aplicado", "Perfeito. A recíproca confirma que é retângulo sem precisar medir ângulos.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e10_corrige_reciproca",
        "1) \\( 6^2 = 36 \\)<br><br>" +
        "2) \\( 8^2 = 64 \\)<br><br>" +
        "3) \\( 36 + 64 = 100 \\)<br><br>" +
        "4) \\( 10^2 = 100 \\)<br><br><br><br>" +
        "Como \\( a^2 + b^2 = c^2 \\), a recíproca do Teorema de Pitágoras garante que o triângulo é retângulo.",
        "e11_problema_aplicado",
        "reflexao"
      ),

      // ─── APLICAÇÃO: PROBLEMA CONTEXTUALIZADO ───────────────────────
      etapaTexto(
        "e11_problema_aplicado",
        "O Teorema de Pitágoras aparece em situações reais toda vez que precisamos calcular uma distância com ângulo reto envolvido. Veja a imagem abaixo: uma escada apoia-se numa parede vertical, formando um triângulo retângulo com o chão.",
        "e11_problema_escada",
        "reflexao",
        "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e7c0a808dfaa68caf4b855731b29f7e7b1678967.jpg"
      ),

      etapaEscolha(
        "e11_problema_escada",
        "Uma escada de 13 m apoia-se em uma parede. O pé da escada está a 5 m da base da parede. A que altura o topo da escada chega na parede?",
        [
          op(1, "8 m.", "e11_corrige_escada", "Você subtraiu os comprimentos direto. Precisamos trabalhar com os quadrados."),
          op(2, "18 m.", "e11_corrige_escada", "Você somou os comprimentos. Lembre-se: \\( b^2 = c^2 - a^2 \\)."),
          op(3, "12 m.", "e12_reflexao_algebra_geometria", "Correto: \\( b^2 = 13^2 - 5^2 = 169 - 25 = 144 \\), logo \\( b = 12 \\) m.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e11_corrige_escada",
        "Dados:<br><br>" +
        "-> \\( c = 13 \\) (hipotenusa)<br><br>" +
        "-> \\( a = 5 \\) (cateto na base)<br><br>" +
        "-> \\( b \\) (altura)<br><br><br><br>" +
        "1) \\( c^2 = 13^2 = 169 \\)<br><br>" +
        "2) \\( a^2 = 5^2 = 25 \\)<br><br>" +
        "3) \\( b^2 = c^2 - a^2 = 169 - 25 = 144 \\)<br><br>" +
        "4) \\( b = \\sqrt{144} = 12 \\)<br><br><br><br>" +
        "O topo da escada chega a \\( 12 \\) m de altura na parede.",
        "e12_reflexao_algebra_geometria",
        "reflexao"
      ),

      // ─── REFLEXÃO: ÁLGEBRA E GEOMETRIA JUNTAS ──────────────────────
      etapaTexto(
        "e12_reflexao_algebra_geometria",
        "Ao longo da sessão:<br><br>" +
        "-> Partimos da fórmula \\( c^2 = a^2 + b^2 \\);<br><br>" +
        "-> Interpretamos \\( a^2 \\), \\( b^2 \\), \\( c^2 \\) como áreas de quadrados sobre os lados;<br><br>" +
        "-> Verificamos com exemplos numéricos (3,4,5), (6,8,10), (1,1,\\(\\sqrt{2}\\));<br><br>" +
        "-> Usamos a recíproca para identificar triângulos retângulos;<br><br>" +
        "-> Aplicamos o teorema em um problema real.<br><br>" +
        "Isso é relacionar álgebra e geometria no Teorema de Pitágoras.",
        "e13_sintese_final",
        "reflexao"
      ),

      // ─── REFLEXÃO FINAL ────────────────────────────────────────────
      etapaEscolha(
        "e13_sintese_final",
        "Qual das afirmações abaixo melhor descreve a relação entre a representação algébrica e geométrica do Teorema de Pitágoras?",
        [
          op(1, "A fórmula \\( c^2 = a^2 + b^2 \\) é apenas uma receita de cálculo, sem conexão com a geometria.", "e13_reforca_sintese", "Vamos revisitar essa conexão antes de concluir."),
          op(2, "A fórmula algébrica e a demonstração geométrica por áreas são duas formas de expressar a mesma verdade: a área do quadrado da hipotenusa iguala a soma das áreas dos quadrados dos catetos.", "e_final", "Excelente síntese. Você está pronto para o desafio final."),
          op(3, "A geometria é uma ilustração sem rigor, e só a álgebra comprova o teorema.", "e13_reforca_sintese", "Tanto a álgebra quanto a geometria são formas rigorosas de demonstrar o teorema.")
        ],
        "aprofundamento"
      ),

      etapaTexto(
        "e13_reforca_sintese",
        "A equação \\( c^2 = a^2 + b^2 \\) descreve precisamente a relação entre as áreas dos três quadrados construídos sobre os lados do triângulo retângulo. A geometria não apenas ilustra, ela demonstra. As duas linguagens, algébrica e geométrica, expressam a mesma verdade matemática.",
        "e_final",
        "reflexao"
      ),

      // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
      etapaAvaliacao(
        "e_final",
        "Vamos registrar um resultado objetivo desta sessão.",
        "Analise as afirmações abaixo e marque a alternativa correta:",
        [
          { id: 1, texto: "Na demonstração geométrica, \\( c^2 \\) representa a área do quadrado construído sobre a hipotenusa, e \\( a^2 + b^2 \\) representa a soma das áreas dos quadrados sobre os catetos." },
          { id: 2, texto: "O Teorema de Pitágoras é válido para qualquer triângulo retângulo, inclusive quando a hipotenusa é um número irracional como \\( \\sqrt{2} \\)." },
          { id: 3, texto: "Pela recíproca do teorema, se três lados satisfazem \\( a^2 + b^2 = c^2 \\), o triângulo é necessariamente retângulo, sem precisar medir ângulos." },
          { id: 4, texto: "Todas as afirmativas acima estão corretas." }
        ],
        4,
        "Essas três afirmativas cobrem exatamente o descritor da habilidade: relacionar a representação algébrica com a demonstração geométrica e reconhecer a validade do teorema.",
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Pythagorean.svg"
      )
    ]
  },

  "EF.09.MAT.3.101": {
  id: "EF.09.MAT.3.101",
  titulo: "Relações Métricas no Triângulo Retângulo",
  objetivo: "Compreender e demonstrar relações métricas no triângulo retângulo, incluindo altura relativa à hipotenusa e projeções dos catetos, usando semelhança de triângulos e o Teorema de Pitágoras.",

  etapas: [

    // ─── DIAGNÓSTICO ───────────────────────────────────────────────
    etapaEscolha(
      "e1",
      "Quando aparece um triângulo retângulo com altura traçada na hipotenusa, com letras como \\( a, b, c, h, m, n \\), qual dessas atitudes parece mais com você?",
      [
        op(1, "Eu travo. Vejo muitas letras e não sei por onde começar.", "e2_nao_sabe", "Ótimo ponto de partida. Vamos organizar esses elementos."),
        op(2, "Eu tento aplicar direto alguma fórmula decorada, sem entender de onde veio.", "e2_formula_sem_sentido", "Vamos ver de onde as fórmulas nascem."),
        op(3, "Eu sei que existe semelhança de triângulos ali, mas não consigo usar.", "e2_semelhanca_confusa", "Perfeito. Vamos usar a semelhança como motor das relações."),
        op(4, "Eu me sinto confortável com relação, projeção, altura, mas às vezes confundo os símbolos.", "e2_avancado", "Ótimo. Vamos sistematizar tudo bem devagar.")
      ],
      "pergunta_diagnostica"
    ),

    // ─── CAMINHOS DO DIAGNÓSTICO ────────────────────────────────────
    etapaTexto(
      "e2_nao_sabe",
      "Quando olhamos para um triângulo retângulo com altura na hipotenusa, aparecem novos segmentos além dos três lados principais. Se tentarmos decorar fórmulas sem entender de onde vêm, fica confuso. Vamos primeiro enxergar quem é quem nessa figura.",
      "e3_figura_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_formula_sem_sentido",
      "As fórmulas \\( h^2 = m\\cdot n \\), \\( b^2 = a\\cdot m \\), \\( c^2 = a\\cdot n \\), \\( b\\cdot c = a\\cdot h \\) parecem um monte de letras soltas. Todas elas nascem da semelhança entre três triângulos. Se entendermos essa semelhança, as fórmulas deixam de ser decoradas.",
      "e3_figura_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_semelhanca_confusa",
      "Você já percebe que há semelhança entre os triângulos formados pela altura da hipotenusa. O que falta é transformar essa semelhança em proporções claras, linha a linha, até chegar às fórmulas métricas.",
      "e3_figura_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_avancado",
      "Ótimo. Vamos pegar o que você já sabe, organizar a figura, escrever as semelhanças e ver cada relação métrica surgindo como consequência, sem decorar nada isolado.",
      "e3_figura_base",
      "reflexao"
    ),

    // ─── FIGURA BASE COM NOTAÇÃO ────────────────────────────────────
    etapaTexto(
      "e3_figura_base",
      "Observe a figura padrão das relações métricas. Temos um triângulo retângulo \\( ABC \\) com ângulo reto em \\( A \\). A hipotenusa é \\( BC \\) e foi dividida pela altura \\( h \\) em dois segmentos: \\( BD = n \\) e \\( DC = m \\). Os catetos são \\( AB = c \\) e \\( AC = b \\).",
      "e3_identificar_notacao",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    ),

    etapaEscolha(
      "e3_identificar_notacao",
      "Na figura, quais segmentos são os catetos e qual é a hipotenusa do triângulo original \\( ABC \\)?",
      [
        op(1, "Catetos: \\( b \\) e \\( c \\); hipotenusa: \\( a \\).", "e4_semelhanca_triangulos", "Correto. \\( b \\) e \\( c \\) partem do ângulo reto, \\( a = BC \\) é o lado oposto."),
        op(2, "Catetos: \\( m \\) e \\( n \\); hipotenusa: \\( h \\).", "e3_corrige_notacao", "Veja que \\( m \\) e \\( n \\) são partes da hipotenusa, e \\( h \\) é a altura."),
        op(3, "Catetos: \\( h \\) e \\( a \\); hipotenusa: \\( b \\).", "e3_corrige_notacao", "Repare na posição do ângulo reto e quem é o maior lado.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e3_corrige_notacao",
      "No triângulo original \\( ABC \\):<br><br>" +
      "-> Os catetos são \\( AB = c \\) e \\( AC = b \\), que formam o ângulo reto.<br><br>" +
      "-> A hipotenusa é \\( BC = a \\), o lado oposto ao ângulo de 90°.<br><br>" +
      "-> A altura \\( h \\) sai de \\( A \\) e cai na hipotenusa, dividindo-a em \\( BD = n \\) e \\( DC = m \\).",
      "e4_semelhanca_triangulos",
      "reflexao"
    ),

    // ─── SEMELHANÇA DOS TRÊS TRIÂNGULOS ─────────────────────────────
    etapaTexto(
      "e4_semelhanca_triangulos",
      "Ao traçar a altura \\( h \\), surgem dois triângulos menores: \\( ABD \\) e \\( ADC \\). Ambos são retângulos e semelhantes entre si e ao triângulo \\( ABC \\). A partir dessa semelhança, nascem todas as relações métricas.",
      "e4_escolha_semelhanca",
      "reflexao"
    ),

    etapaEscolha(
      "e4_escolha_semelhanca",
      "Qual par de triângulos abaixo é semelhante ao triângulo original \\( ABC \\)?",
      [
        op(1, "Apenas \\( ABD \\).", "e4_corrige_semelhanca", "Veja que \\( ADC \\) também é retângulo e compartilha ângulos com \\( ABC \\)."),
        op(2, "Apenas \\( ADC \\).", "e4_corrige_semelhanca", "Veja que \\( ABD \\) também é retângulo e compartilha ângulos com \\( ABC \\)."),
        op(3, "Os dois triângulos menores: \\( ABD \\) e \\( ADC \\).", "e5_escreve_semelhancas", "Isso mesmo. Ambos são semelhantes a \\( ABC \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e4_corrige_semelhanca",
      "Ao traçar a altura, os triângulos \\( ABD \\) e \\( ADC \\) são ambos retângulos e compartilham ângulos com \\( ABC \\). Isso garante que todos são semelhantes entre si.",
      "e5_escreve_semelhancas",
      "reflexao"
    ),

    // ─── ESCRITA DAS SEMELHANÇAS ────────────────────────────────────
    etapaTexto(
      "e5_escreve_semelhancas",
      "Vamos escrever uma das semelhanças explicitamente. Compare o triângulo maior \\( ABC \\) com o triângulo \\( ABD \\):<br><br>" +
      "-> Ângulo em \\( A \\) é reto nos dois.<br><br>" +
      "-> Ângulo em \\( B \\) é comum.<br><br>" +
      "Então podemos escrever:<br><br>" +
      "1) \\( \\triangle ABC \\sim \\triangle ABD \\).<br><br><br><br>" +
      "Fazendo o mesmo com \\( ADC \\):<br><br>" +
      "2) \\( \\triangle ABC \\sim \\triangle ADC \\).<br><br><br><br>" +
      "Essas semelhanças vão gerar proporções de lados.",
      "e6_relacao_altura",
      "reflexao"
    ),

    // ─── RELAÇÃO DA ALTURA: h² = m·n ────────────────────────────────
    etapaTexto(
      "e6_relacao_altura",
      "Vamos começar pela relação da altura \\( h \\). A ideia é pensar na altura como cateto em um dos triângulos menores e usar a semelhança para ligar \\( h \\) às projeções \\( m \\) e \\( n \\).",
      "e6_escolha_altura",
      "reflexao"
    ),

    etapaEscolha(
      "e6_escolha_altura",
      "Em qual triângulo \\( h \\) aparece como lado diretamente associado às projeções \\( m \\) e \\( n \\)?",
      [
        op(1, "No triângulo \\( ABD \\), como cateto entre \\( c \\) e \\( n \\).", "e7_deduz_h2_mn", "Isso mesmo: \\( h \\) está ligado a \\( n \\)."),
        op(2, "No triângulo \\( ADC \\), como cateto entre \\( b \\) e \\( m \\).", "e7_deduz_h2_mn", "Correto: \\( h \\) também está ligado a \\( m \\)."),
        op(3, "Nos dois: \\( h \\) é cateto em \\( ABD \\) e em \\( ADC \\).", "e7_deduz_h2_mn", "Exato. Vamos usar os dois para chegar em \\( h^2 = m\\cdot n \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_deduz_h2_mn",
      "Usando semelhança, podemos escrever proporções entre os triângulos menores:<br><br><br><br>" +
      "No triângulo \\( ABD \\):<br><br>" +
      "1) \\( \\frac{h}{n} = \\frac{c}{a} \\)<br><br><br><br>" +
      "No triângulo \\( ADC \\):<br><br>" +
      "2) \\( \\frac{h}{m} = \\frac{b}{a} \\)<br><br><br><br>" +
      "Multiplicando as duas igualdades membro a membro, obtemos uma relação envolvendo \\( h^2 \\), \\( m \\) e \\( n \\).",
      "e7_escolha_h2_mn",
      "reflexao"
    ),

    etapaEscolha(
      "e7_escolha_h2_mn",
      "Ao multiplicar as duas proporções \\( \\frac{h}{n} = \\frac{c}{a} \\) e \\( \\frac{h}{m} = \\frac{b}{a} \\), qual expressão envolvendo \\( h^2 \\) e \\( m \\cdot n \\) aparece?",
      [
        op(1, "\\( h^2 = m + n \\).", "e7_corrige_h2_mn", "Essa é a soma das projeções, não o produto."),
        op(2, "\\( h^2 = m \\cdot n \\).", "e8_aplica_h2_mn", "Correto: surge a relação \\( h^2 = m\\cdot n \\)."),
        op(3, "\\( h^2 = a^2 \\).", "e7_corrige_h2_mn", "Isso seria o Teorema de Pitágoras, não a relação da altura.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_corrige_h2_mn",
      "Multiplicando:<br><br>" +
      "1) \\( \\frac{h}{n} = \\frac{c}{a} \\)<br><br>" +
      "2) \\( \\frac{h}{m} = \\frac{b}{a} \\)<br><br><br><br>" +
      "Temos \\( \\frac{h}{n} \\cdot \\frac{h}{m} = \\frac{c}{a} \\cdot \\frac{b}{a} \\)<br><br>" +
      "\\( \\Rightarrow \\frac{h^2}{mn} = \\frac{bc}{a^2} \\)<br><br><br><br>" +
      "Combinando com \\( a^2 = b^2 + c^2 \\), obtemos \\( h^2 = m\\cdot n \\).",
      "e8_aplica_h2_mn",
      "reflexao"
    ),

    etapaTexto(
      "e8_aplica_h2_mn",
      "A relação \\( h^2 = m \\cdot n \\) diz: o quadrado da altura relativa à hipotenusa é igual ao produto das projeções dos catetos sobre a hipotenusa. Vamos testá-la com um exemplo numérico.",
      "e8_exemplo_h2_mn",
      "reflexao"
    ),

    etapaEscolha(
      "e8_exemplo_h2_mn",
      "Em um triângulo retângulo, a hipotenusa mede \\( a = 13 \\), e as projeções dos catetos sobre a hipotenusa são \\( m = 4 \\) e \\( n = 9 \\). Qual é a altura \\( h \\)?",
      [
        op(1, "\\( h = 36 \\).", "e8_corrige_exemplo_h", "36 seria \\( h^2 \\), não \\( h \\)."),
        op(2, "\\( h = 13 \\).", "e8_corrige_exemplo_h", "Você somou as projeções, mas a relação usa o produto."),
        op(3, "\\( h = 6 \\).", "e9_relacao_catetos", "Correto: \\( h^2 = 4 \\cdot 9 = 36 \\), logo \\( h = 6 \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e8_corrige_exemplo_h",
      "Usando \\( h^2 = m \\cdot n \\):<br><br>" +
      "1) \\( h^2 = 4 \\cdot 9 = 36 \\)<br><br>" +
      "2) \\( h = \\sqrt{36} = 6 \\)<br><br><br><br>" +
      "A altura relativa à hipotenusa mede 6 unidades.",
      "e9_relacao_catetos",
      "reflexao"
    ),

    // ─── RELAÇÕES DOS CATETOS: b² = a·m, c² = a·n ───────────────────
    etapaTexto(
      "e9_relacao_catetos",
      "Agora vamos às relações que ligam catetos e projeções:<br><br>" +
      "-> \\( b^2 = a \\cdot m \\)<br><br>" +
      "-> \\( c^2 = a \\cdot n \\)<br><br>" +
      "Ambas nascem de proporções de semelhança entre o triângulo original e cada triângulo menor.",
      "e9_escolha_cateto_relacao",
      "reflexao"
    ),

    etapaEscolha(
      "e9_escolha_cateto_relacao",
      "Qual proporção de semelhança leva diretamente à relação \\( b^2 = a \\cdot m \\)?",
      [
        op(1, "\\( \\frac{b}{a} = \\frac{a}{b} \\).", "e9_corrige_cateto_relacao", "Isso não envolve \\( m \\)."),
        op(2, "\\( \\frac{b}{a} = \\frac{m}{b} \\).", "e10_deduz_b2_am", "Perfeito: isso liga \\( b \\), \\( a \\) e \\( m \\)."),
        op(3, "\\( \\frac{b}{m} = \\frac{a}{n} \\).", "e9_corrige_cateto_relacao", "Mistura \\( m \\) e \\( n \\) de forma confusa.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_cateto_relacao",
      "Para chegar em \\( b^2 = a \\cdot m \\), precisamos de uma proporção que tenha \\( b \\) no numerador e no denominador, além de \\( a \\) e \\( m \\). A relação \\( \\frac{b}{a} = \\frac{m}{b} \\) é a mais direta.",
      "e10_deduz_b2_am",
      "reflexao"
    ),

    etapaTexto(
      "e10_deduz_b2_am",
      "Partindo da semelhança entre \\( \\triangle ABC \\) e \\( \\triangle ADC \\), obtemos:<br><br>" +
      "1) \\( \\frac{b}{a} = \\frac{m}{b} \\)<br><br><br><br>" +
      "Multiplicando cruzado:<br><br>" +
      "2) \\( b^2 = a \\cdot m \\)<br><br><br><br>" +
      "De forma análoga, usando o triângulo \\( ABD \\): \\( c^2 = a \\cdot n \\).",
      "e10_exemplo_catetos",
      "reflexao"
    ),

    etapaEscolha(
      "e10_exemplo_catetos",
      "Em um triângulo retângulo, a hipotenusa mede \\( a = 13 \\), e as projeções são \\( m = 4 \\) e \\( n = 9 \\). Qual é o valor de \\( b \\), usando \\( b^2 = a \\cdot m \\)?",
      [
        op(1, "\\( b = 52 \\).", "e10_corrige_exemplo_b", "52 seria \\( b^2 \\), não \\( b \\)."),
        op(2, "\\( b = 2\\sqrt{13} \\).", "e11_produto_catetos", "Correto: \\( b^2 = 13 \\cdot 4 = 52 \\), então \\( b = \\sqrt{52} = 2\\sqrt{13} \\)."),
        op(3, "\\( b = 26 \\).", "e10_corrige_exemplo_b", "Reveja o cálculo da raiz quadrada de 52.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e10_corrige_exemplo_b",
      "Aplicando \\( b^2 = a \\cdot m \\):<br><br>" +
      "1) \\( b^2 = 13 \\cdot 4 = 52 \\)<br><br>" +
      "2) \\( 52 = 4 \\cdot 13 \\)<br><br>" +
      "3) \\( b = \\sqrt{52} = \\sqrt{4 \\cdot 13} = 2\\sqrt{13} \\)<br><br><br><br>" +
      "Assim, \\( b = 2\\sqrt{13} \\).",
      "e11_produto_catetos",
      "reflexao"
    ),

    // ─── PRODUTO DOS CATETOS: b·c = a·h ─────────────────────────────
    etapaTexto(
      "e11_produto_catetos",
      "Uma relação muito prática é \\( b \\cdot c = a \\cdot h \\): o produto dos catetos é igual ao produto da hipotenusa pela altura relativa a ela. Essa relação também nasce da semelhança e combina as ideias anteriores.",
      "e11_escolha_produto",
      "reflexao"
    ),

    etapaEscolha(
      "e11_escolha_produto",
      "Em um triângulo retângulo com catetos \\( b = 6 \\) e \\( c = 8 \\) e hipotenusa \\( a = 10 \\), qual é a altura \\( h \\), usando \\( b \\cdot c = a \\cdot h \\)?",
      [
        op(1, "\\( h = 24 \\).", "e11_corrige_produto", "24 é o valor de \\( b \\cdot c \\), ainda falta dividir por \\( a \\)."),
        op(2, "\\( h = 4{,}8 \\).", "e12_problema_integra", "Correto: \\( 6 \\cdot 8 = 10 \\cdot h \\), então \\( h = 48 / 10 = 4{,}8 \\)."),
        op(3, "\\( h = 7 \\).", "e11_corrige_produto", "Reveja a divisão: \\( h = 48 / 10 \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e11_corrige_produto",
      "Aplicando \\( b \\cdot c = a \\cdot h \\):<br><br>" +
      "1) \\( 6 \\cdot 8 = 10 \\cdot h \\)<br><br>" +
      "2) \\( 48 = 10h \\)<br><br>" +
      "3) \\( h = 48 / 10 = 4{,}8 \\)<br><br><br><br>" +
      "A altura relativa à hipotenusa mede 4,8 unidades.",
      "e12_problema_integra",
      "reflexao"
    ),

    // ─── PROBLEMA INTEGRANDO TODAS AS RELAÇÕES ─────────────────────
    etapaTexto(
      "e12_problema_integra",
      "Vamos integrar todas as relações em um único problema. Considere um triângulo retângulo com catetos \\( b = 9 \\) e \\( c = 12 \\). Primeiro vamos achar a hipotenusa, depois a altura e, por fim, as projeções \\( m \\) e \\( n \\).",
      "e12_hipotenusa_integra",
      "reflexao"
    ),

    etapaEscolha(
      "e12_hipotenusa_integra",
      "Com catetos \\( b = 9 \\) e \\( c = 12 \\), qual é a hipotenusa \\( a \\)?",
      [
        op(1, "\\( a = 21 \\).", "e12_corrige_hipotenusa", "Você somou os catetos direto."),
        op(2, "\\( a = 15 \\).", "e13_altura_integra", "Correto: \\( a^2 = 9^2 + 12^2 = 81 + 144 = 225 \\), logo \\( a = 15 \\)."),
        op(3, "\\( a = \\sqrt{225} \\).", "e12_corrige_hipotenusa", "\\( \\sqrt{225} = 15 \\), então podemos simplificar.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e12_corrige_hipotenusa",
      "Calculando a hipotenusa:<br><br>" +
      "1) \\( a^2 = 9^2 + 12^2 = 81 + 144 = 225 \\)<br><br>" +
      "2) \\( a = \\sqrt{225} = 15 \\)<br><br><br><br>" +
      "Logo, \\( a = 15 \\).",
      "e13_altura_integra",
      "reflexao"
    ),

    etapaEscolha(
      "e13_altura_integra",
      "Usando \\( b \\cdot c = a \\cdot h \\) com \\( b = 9 \\), \\( c = 12 \\) e \\( a = 15 \\), qual é a altura \\( h \\)?",
      [
        op(1, "\\( h = 36 \\).", "e13_corrige_altura", "Esse valor não é compatível com a dimensão do triângulo. Reveja o cálculo."),
        op(2, "\\( h = 7{,}2 \\).", "e14_projecoes_integra", "Correto: \\( 9 \\cdot 12 = 15 \\cdot h \\) -> \\( 108 = 15h \\) -> \\( h = 108/15 = 7{,}2 \\)."),
        op(3, "\\( h = 108 \\).", "e13_corrige_altura", "108 é o produto dos catetos, falta dividir por \\( a \\).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e13_corrige_altura",
      "Aplicando \\( b \\cdot c = a \\cdot h \\):<br><br>" +
      "1) \\( 9 \\cdot 12 = 15 \\cdot h \\)<br><br>" +
      "2) \\( 108 = 15h \\)<br><br>" +
      "3) \\( h = 108 / 15 = 7{,}2 \\)<br><br><br><br>" +
      "Portanto, \\( h = 7{,}2 \\).",
      "e14_projecoes_integra",
      "reflexao"
    ),

    etapaTexto(
      "e14_projecoes_integra",
      "Sabemos que \\( h^2 = m \\cdot n \\) e que \\( a = m + n \\). Com \\( a = 15 \\) e \\( h = 7{,}2 \\), podemos encontrar \\( m \\) e \\( n \\) (as projeções), resolvendo um sistema simples.",
      "e14_escolha_projecoes",
      "reflexao"
    ),

    etapaEscolha(
      "e14_escolha_projecoes",
      "Sabendo que \\( h^2 = m \\cdot n \\) e \\( m + n = a = 15 \\), que conjunto de equações traduz essa situação?",
      [
        op(1, "\\( m^2 + n^2 = 15 \\) e \\( h = m + n \\).", "e14_corrige_projecoes", "Misturou somas e quadrados de forma incorreta."),
        op(2, "\\( m + n = 15 \\) e \\( m \\cdot n = h^2 = 51{,}84 \\).", "e15_sintese_final", "Correto. Essas são as relações que ligam altura e projeções."),
        op(3, "\\( m - n = 15 \\) e \\( m \\cdot n = h \\).", "e14_corrige_projecoes", "O sinal e o uso de \\( h \\) estão incorretos.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e14_corrige_projecoes",
      "As equações certas são:<br><br>" +
      "1) \\( m + n = a = 15 \\)<br><br>" +
      "2) \\( m \\cdot n = h^2 = 7{,}2^2 = 51{,}84 \\)<br><br><br><br>" +
      "Elas ligam altura, projeções e hipotenusa.",
      "e15_sintese_final",
      "reflexao"
    ),

    // ─── SÍNTESE FINAL ──────────────────────────────────────────────
    etapaEscolha(
      "e15_sintese_final",
      "Depois desta sessão, qual frase melhor resume a lógica das relações métricas no triângulo retângulo?",
      [
        op(1, "São fórmulas desconectadas que precisamos decorar separadamente.", "e15_reforca_sintese", "Na verdade, todas vêm da mesma ideia de semelhança de triângulos."),
        op(2, "Todas as relações métricas nascem da semelhança entre os três triângulos formados pela altura da hipotenusa, combinada com o Teorema de Pitágoras.", "e_final", "Excelente síntese."),
        op(3, "Só a relação \\( c^2 = a^2 + b^2 \\) é importante; o resto é detalhe.", "e15_reforca_sintese", "As outras relações ampliam o poder de Pitágoras em problemas mais ricos.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e15_reforca_sintese",
      "Todas as relações métricas — \\( h^2 = m \\cdot n \\), \\( b^2 = a \\cdot m \\), \\( c^2 = a \\cdot n \\), \\( b \\cdot c = a \\cdot h \\) — nascem da mesma raiz: a semelhança entre os triângulos \\( ABC \\), \\( ABD \\) e \\( ADC \\), combinada com o Teorema de Pitágoras. Não são fórmulas isoladas.",
      "e_final",
      "reflexao"
    ),

    // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
    etapaAvaliacao(
      "e_final",
      "Vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "A relação \\( h^2 = m \\cdot n \\) expressa que o quadrado da altura relativa à hipotenusa é igual ao produto das projeções dos catetos sobre a hipotenusa." },
        { id: 2, texto: "As relações \\( b^2 = a \\cdot m \\) e \\( c^2 = a \\cdot n \\) ligam cada cateto à hipotenusa e à sua projeção, e surgem de proporções de semelhança." },
        { id: 3, texto: "A relação \\( b \\cdot c = a \\cdot h \\) conecta o produto dos catetos com o produto da hipotenusa pela altura, sendo útil para encontrar \\( h \\) quando conhecemos \\( a \\), \\( b \\) e \\( c \\)." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas três afirmações cobrem os descritores centrais desta habilidade: usar semelhança de triângulos para demonstrar e aplicar as relações métricas no triângulo retângulo.",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    )
  ]
  },

  "EF.09.MAT.3.99": {
  id: "EF.09.MAT.3.99",
  titulo: "Condições de Semelhança de Triângulos",
  objetivo: "Reconhecer, em figuras e problemas, as condições para que dois triângulos sejam semelhantes (AA, LAL, LLL), identificando ângulos correspondentes e proporções de lados.",

  etapas: [

    // ─── DIAGNÓSTICO ───────────────────────────────────────────────
    etapaEscolha(
      "e1",
      "Quando você escuta que dois triângulos são \"semelhantes\", o que isso significa para você?",
      [
        op(1, "Só penso que eles têm 'formato parecido', sem saber a definição.", "e2_formato_parecido", "Vamos transformar esse 'parecido' em algo matemático."),
        op(2, "Acho que são congruentes (iguais), não vejo diferença.", "e2_confunde_congruencia", "Vamos separar semelhança de congruência."),
        op(3, "Sei que tem relação com ângulos e lados proporcionais, mas não lembro as condições.", "e2_sabe_meio", "Ótimo; vamos organizar as condições AA, LAL e LLL."),
        op(4, "Me sinto seguro com semelhança, mas às vezes erro na identificação dos lados correspondentes.", "e2_avancado", "Perfeito; vamos treinar esse detalhe.")
      ],
      "pergunta_diagnostica"
    ),

    // ─── CAMINHOS DO DIAGNÓSTICO ────────────────────────────────────
    etapaTexto(
      "e2_formato_parecido",
      "Na matemática, \"parecido\" não é suficiente. Dizemos que dois triângulos são semelhantes quando têm a mesma forma, o que significa:<br><br>" +
      "-> mesmos ângulos;<br><br>" +
      "-> lados em proporção.<br><br>" +
      "Vamos tornar essa ideia mais precisa.",
      "e3_intuicao_semelhanca",
      "reflexao"
    ),

    etapaTexto(
      "e2_confunde_congruencia",
      "Triângulos congruentes são exatamente iguais em tamanho e forma.<br><br>" +
      "Triângulos semelhantes têm a mesma forma, mas podem ter tamanhos diferentes (um pode ser maior ou menor).<br><br>" +
      "Nos dois casos, os ângulos são iguais, mas os lados, na semelhança, entram em proporção.",
      "e3_intuicao_semelhanca",
      "reflexao"
    ),

    etapaTexto(
      "e2_sabe_meio",
      "Você já ouviu falar em ângulos iguais e lados proporcionais, que é a base da semelhança de triângulos.<br><br>" +
      "Vamos organizar isso nas três condições principais: AA, LAL e LLL.",
      "e3_intuicao_semelhanca",
      "reflexao"
    ),

    etapaTexto(
      "e2_avancado",
      "Vamos usar exemplos visuais para reforçar as condições de semelhança e treinar a identificação correta dos lados correspondentes, que é o ponto em que mais surgem erros.",
      "e3_intuicao_semelhanca",
      "reflexao"
    ),

    // ─── INTUIÇÃO: MESMA FORMA, TAMANHO DIFERENTE ───────────────────
    etapaTexto(
      "e3_intuicao_semelhanca",
      "Imagine um triângulo e depois uma versão ampliada dele, como se você tivesse dado zoom na figura.<br><br>" +
      "Os ângulos permanecem os mesmos, mas os lados aumentam todos na mesma proporção.<br><br>" +
      "Isso é um exemplo clássico de triângulos semelhantes.",
      "e3_imagem_basica",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/09f697a265827bbfb3c30f31eb3c119b6e82f96a.jpg"
    ),

    etapaEscolha(
      "e3_imagem_basica",
      "Se um triângulo é uma versão ampliada de outro, o que precisa acontecer com os ângulos e com os lados para que sejam semelhantes?",
      [
        op(1, "Os ângulos podem mudar, desde que os lados sejam múltiplos.", "e3_corrige_imagem", "Se os ângulos mudam, a forma muda; deixamos de ter semelhança."),
        op(2, "Os ângulos devem ser iguais, e os lados devem estar em proporção.", "e4_definicao_formal", "Exatamente. Mesmos ângulos e lados proporcionais."),
        op(3, "Os lados devem ser todos iguais, e os ângulos podem variar.", "e3_corrige_imagem", "Lados iguais e ângulos diferentes não fazem sentido em triângulos.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e3_corrige_imagem",
      "Para que dois triângulos sejam semelhantes:<br><br>" +
      "-> todos os ângulos correspondentes devem ser iguais;<br><br>" +
      "-> os comprimentos dos lados correspondentes devem estar em uma mesma proporção (por exemplo, todos dobrados ou todos pela metade).",
      "e4_definicao_formal",
      "reflexao"
    ),

    // ─── DEFINIÇÃO FORMAL + NOTAÇÃO ─────────────────────────────────
    etapaTexto(
      "e4_definicao_formal",
      "Formalmente, dizemos que dois triângulos \\( \\triangle ABC \\) e \\( \\triangle DEF \\) são semelhantes quando:<br><br>" +
      "-> \\( \\angle A = \\angle D \\), \\( \\angle B = \\angle E \\), \\( \\angle C = \\angle F \\);<br><br>" +
      "-> \\( \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} \\).<br><br>" +
      "Essa igualdade de ângulos e proporção de lados define a semelhança.",
      "e4_condicoes_resumo",
      "reflexao"
    ),

    etapaTexto(
      "e4_condicoes_resumo",
      "Existem três formas práticas de reconhecer que dois triângulos são semelhantes:<br><br>" +
      "-> Condição AA: dois ângulos de um são iguais a dois ângulos do outro;<br><br>" +
      "-> Condição LAL: um ângulo igual e os lados que o formam proporcionais;<br><br>" +
      "-> Condição LLL: os três lados proporcionais.<br><br>" +
      "Vamos examinar cada uma delas com calma.",
      "e5_condicao_AA",
      "reflexao"
    ),

    // ─── CONDIÇÃO AA (ÂNGULO–ÂNGULO) ────────────────────────────────
    etapaTexto(
      "e5_condicao_AA",
      "Condição AA (ângulo–ângulo):<br><br>" +
      "Se dois ângulos de um triângulo são iguais a dois ângulos de outro triângulo, então os triângulos são semelhantes.<br><br>" +
      "Isso funciona porque a soma dos ângulos internos é sempre 180°, então o terceiro ângulo também será igual.",
      "e5_escolha_AA",
      "reflexao"
    ),

    etapaEscolha(
      "e5_escolha_AA",
      "Se em dois triângulos sabemos que:<br><br>" +
      "-> \\( \\angle A = \\angle D \\);<br><br>" +
      "-> \\( \\angle B = \\angle E \\);<br><br>" +
      "O que podemos concluir?",
      [
        op(1, "Nada, precisamos de mais informações sobre lados.", "e5_corrige_AA", "A soma de 180° garante que o terceiro ângulo também coincide."),
        op(2, "Os triângulos são semelhantes (condição AA).", "e6_condicao_LAL", "Correto. AA é suficiente para semelhança."),
        op(3, "Os triângulos são congruentes.", "e5_corrige_AA", "Congruência exige igualdade de lados também.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e5_corrige_AA",
      "Se dois ângulos de um triângulo são iguais a dois ângulos de outro, o terceiro ângulo também será igual, pois a soma é 180° em ambos.<br><br>" +
      "Com três ângulos iguais, os triângulos têm a mesma forma e, portanto, são semelhantes (condição AA).",
      "e6_condicao_LAL",
      "reflexao"
    ),

    // ─── CONDIÇÃO LAL (LADO–ÂNGULO–LADO) ───────────────────────────
    etapaTexto(
      "e6_condicao_LAL",
      "Condição LAL (lado–ângulo–lado):<br><br>" +
      "Se um ângulo de um triângulo é igual a um ângulo de outro triângulo, e os lados que formam esse ângulo estão em proporção, então os triângulos são semelhantes.<br><br>" +
      "Importante: os lados proporcionalmente iguais devem ser os que estão 'colados' no ângulo conhecido.",
      "e6_escolha_LAL",
      "reflexao"
    ),

    etapaEscolha(
      "e6_escolha_LAL",
      "Em dois triângulos, temos:<br><br>" +
      "-> \\( \\angle B = \\angle E \\);<br><br>" +
      "-> \\( \\frac{AB}{DE} = \\frac{BC}{EF} \\).<br><br>" +
      "Isso garante que os triângulos são semelhantes?",
      [
        op(1, "Sim, pela condição LAL (lados que formam o ângulo B/E).", "e7_condicao_LLL", "Correto: um ângulo igual + lados adjacentes proporcionais."),
        op(2, "Não, só AA pode garantir semelhança.", "e6_corrige_LAL", "LAL também é uma condição suficiente."),
        op(3, "Não, precisaríamos de todos os três lados proporcionais.", "e6_corrige_LAL", "LAL já é suficiente, desde que os lados sejam adjacentes ao ângulo.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e6_corrige_LAL",
      "Quando um ângulo é comum e os lados que formam esse ângulo estão em proporção, a forma do triângulo fica determinada (mesmo que o tamanho mude).<br><br>" +
      "Isso torna LAL uma condição suficiente de semelhança.",
      "e7_condicao_LLL",
      "reflexao"
    ),

    // ─── CONDIÇÃO LLL (LADO–LADO–LADO) ─────────────────────────────
    etapaTexto(
      "e7_condicao_LLL",
      "Condição LLL (lado–lado–lado):<br><br>" +
      "Se os três lados de um triângulo são proporcionais aos três lados de outro triângulo (na mesma ordem), então os dois triângulos são semelhantes.<br><br>" +
      "Isso significa que existe um único fator de escala que transforma um triângulo no outro.",
      "e7_escolha_LLL",
      "reflexao"
    ),

    etapaEscolha(
      "e7_escolha_LLL",
      "Dois triângulos têm lados:<br><br>" +
      "Triângulo 1: 3, 4, 5<br><br>" +
      "Triângulo 2: 6, 8, 10<br><br>" +
      "Esses triângulos são semelhantes?",
      [
        op(1, "Sim, porque cada lado do segundo é o dobro do correspondente no primeiro.", "e8_exemplo_LLL_detalhe", "Correto: fator de escala 2 e mesma forma."),
        op(2, "Não, porque os ângulos podem ser diferentes.", "e7_corrige_LLL", "Se os lados são proporcionais, os ângulos ficam determinados e iguais."),
        op(3, "Só podemos garantir congruência, não semelhança.", "e7_corrige_LLL", "Congruência exigiria lados iguais, não apenas proporcionais.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_corrige_LLL",
      "Quando todos os lados correspondentes são proporcionais, como (3,4,5) e (6,8,10), existe um fator de escala que leva um triângulo ao outro.<br><br>" +
      "Isso garante que os ângulos também são iguais e, portanto, os triângulos são semelhantes (condição LLL).",
      "e8_exemplo_LLL_detalhe",
      "reflexao"
    ),

    etapaTexto(
      "e8_exemplo_LLL_detalhe",
      "Verificando a proporção dos lados:<br><br>" +
      "1) \\( \\frac{3}{6} = \\frac{1}{2} \\)<br><br>" +
      "2) \\( \\frac{4}{8} = \\frac{1}{2} \\)<br><br>" +
      "3) \\( \\frac{5}{10} = \\frac{1}{2} \\)<br><br>" +
      "Todos os quocientes são iguais (1/2).<br><br>" +
      "Logo, os triângulos têm lados em proporção e são semelhantes pela condição LLL.",
      "e9_identificar_correspondencia",
      "reflexao"
    ),

    // ─── IDENTIFICAR LADOS CORRESPONDENTES ──────────────────────────
    etapaTexto(
      "e9_identificar_correspondencia",
      "Reconhecer semelhança não é só dizer \"AA\", \"LAL\" ou \"LLL\". Também é crucial:<br><br>" +
      "-> saber quais lados correspondem entre si;<br><br>" +
      "-> escrever proporções na ordem correta.<br><br>" +
      "Vamos treinar isso com um par de triângulos rotulados.",
      "e9_escolha_correspondencia",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/09f697a265827bbfb3c30f31eb3c119b6e82f96a.jpg"
    ),

    etapaEscolha(
      "e9_escolha_correspondencia",
      "Suponha que \\( \\triangle ABC \\sim \\triangle DEF \\), com a correspondência A↔D, B↔E, C↔F.<br><br>" +
      "Qual proporção de lados está escrita corretamente?",
      [
        op(1, "\\( \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} \\).", "e10_exemplo_proporcao", "Perfeito: segue a ordem das letras na nomeação da semelhança."),
        op(2, "\\( \\frac{AB}{EF} = \\frac{BC}{DE} = \\frac{AC}{DF} \\).", "e9_corrige_correspondencia", "Misturou os lados correspondentes; não segue a ordem A↔D, B↔E, C↔F."),
        op(3, "Qualquer ordem serve, desde que todas as frações sejam iguais.", "e9_corrige_correspondencia", "A ordem importa: cada lado deve ser comparado com o seu correspondente.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_correspondencia",
      "Quando escrevemos \\( \\triangle ABC \\sim \\triangle DEF \\), estamos dizendo:<br><br>" +
      "-> A ↔ D;<br><br>" +
      "-> B ↔ E;<br><br>" +
      "-> C ↔ F.<br><br>" +
      "Isso significa que AB corresponde a DE, BC a EF e AC a DF.<br><br>" +
      "As proporções devem respeitar essa ordem.",
      "e10_exemplo_proporcao",
      "reflexao"
    ),

    etapaTexto(
      "e10_exemplo_proporcao",
      "Exemplo numérico:<br><br>" +
      "Se \\( \\triangle ABC \\sim \\triangle DEF \\), com<br><br>" +
      "AB = 4, BC = 6, AC = 8<br><br>" +
      "DE = 2, EF = 3, DF = 4,<br><br>" +
      "então:<br><br>" +
      "1) \\( \\frac{AB}{DE} = \\frac{4}{2} = 2 \\)<br><br>" +
      "2) \\( \\frac{BC}{EF} = \\frac{6}{3} = 2 \\)<br><br>" +
      "3) \\( \\frac{AC}{DF} = \\frac{8}{4} = 2 \\)<br><br>" +
      "Todas as frações dão 2, confirmando a semelhança pela condição LLL.",
      "e11_problema_contextual",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: SEMELHANÇA PARA MEDIR ALTURA ─────────
    etapaTexto(
      "e11_problema_contextual",
      "Em aplicações, usamos semelhança para encontrar medidas que não conseguimos medir diretamente.<br><br>" +
      "Por exemplo, calcular a altura de um prédio usando a sombra dele e a sombra de um objeto menor conhecido.",
      "e11_escolha_contexto",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e7c0a808dfaa68caf4b855731b29f7e7b1678967.jpg"
    ),

    etapaEscolha(
      "e11_escolha_contexto",
      "Suponha:<br><br>" +
      "-> Um poste de 2 m faz uma sombra de 1 m.<br><br>" +
      "-> Um prédio faz uma sombra de 5 m.<br><br>" +
      "Os triângulos formados (posto–sombra–sol e prédio–sombra–sol) são semelhantes?<br><br>",
      [
        op(1, "Sim, porque ambos têm o mesmo ângulo em relação ao Sol e estão sobre o mesmo chão.", "e12_calculo_altura_predio", "Correto: isso garante ângulos iguais; os triângulos são semelhantes."),
        op(2, "Não, porque o prédio é mais alto.", "e11_corrige_contexto", "Ser maior não impede semelhança; basta mesma forma."),
        op(3, "Não podemos saber sem medir todos os ângulos.", "e11_corrige_contexto", "A situação física garante ângulos iguais (raios solares paralelos).")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e11_corrige_contexto",
      "Quando o Sol está em uma certa posição, os raios solares chegam paralelos tanto no poste quanto no prédio.<br><br>" +
      "Isso faz com que os ângulos da base e do topo sejam iguais nos dois casos, e ambos estão sobre um chão horizontal.<br><br>" +
      "Assim, os triângulos formados são semelhantes.",
      "e12_calculo_altura_predio",
      "reflexao"
    ),

    etapaTexto(
      "e12_calculo_altura_predio",
      "Como os triângulos são semelhantes, podemos usar proporção de lados:<br><br>" +
      "Poste: altura 2 m, sombra 1 m;<br><br>" +
      "Prédio: altura H, sombra 5 m.<br><br>" +
      "Proporção:<br><br>" +
      "1) \\( \\frac{2}{1} = \\frac{H}{5} \\)<br><br>" +
      "2) \\( 2 \\cdot 5 = 1 \\cdot H \\)<br><br>" +
      "3) \\( H = 10 \\)<br><br>" +
      "Logo, o prédio mede 10 m de altura.",
      "e13_sintese",
      "reflexao"
    ),

    // ─── SÍNTESE FINAL ──────────────────────────────────────────────
    etapaEscolha(
      "e13_sintese",
      "Depois desta sessão, qual frase melhor resume as condições para que dois triângulos sejam semelhantes?",
      [
        op(1, "Basta que os triângulos tenham o mesmo perímetro.", "e13_corrige_sintese", "Perímetros iguais não garantem mesma forma."),
        op(2, "Precisamos de ângulos correspondentes iguais e lados correspondentes proporcionais, o que pode ser verificado por AA, LAL ou LLL.", "e_final", "Excelente síntese."),
        op(3, "Só AA funciona; LAL e LLL não garantem semelhança.", "e13_corrige_sintese", "LAL e LLL também são condições suficientes.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e13_corrige_sintese",
      "As três condições clássicas de semelhança são:<br><br>" +
      "-> AA: dois ângulos iguais em cada triângulo;<br><br>" +
      "-> LAL: um ângulo igual e lados adjacentes proporcionais;<br><br>" +
      "-> LLL: três lados proporcionais.<br><br>" +
      "Todas garantem que os triângulos têm mesma forma.",
      "e_final",
      "reflexao"
    ),

    // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
    etapaAvaliacao(
      "e_final",
      "Vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "Se dois ângulos de um triângulo são iguais a dois ângulos de outro, os triângulos são semelhantes pela condição AA." },
        { id: 2, texto: "Se os três lados de um triângulo são proporcionais aos três lados de outro, os triângulos são semelhantes pela condição LLL." },
        { id: 3, texto: "Se um ângulo é comum e os lados que formam esse ângulo estão em proporção, os triângulos são semelhantes pela condição LAL." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas afirmações cobrem as três condições clássicas de semelhança de triângulos: AA, LAL e LLL.",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Pythagorean.svg"
    )
  ]
},

  "EF.09.MAT.3.102": {
  id: "EF.09.MAT.3.102",
  titulo: "Teorema de Tales: Proporcionalidade em Retas Paralelas",
  objetivo: "Utilizar o Teorema de Tales na resolução de problemas de proporcionalidade e semelhança envolvendo feixe de retas paralelas interceptadas por transversais.",

  etapas: [

    // ─── DIAGNÓSTICO ───────────────────────────────────────────────
    etapaEscolha(
      "e1",
      "Quando você ouve \"Teorema de Tales\" em geometria, o que vem à sua mente?",
      [
        op(1, "Nada específico, só lembro do nome do matemático.", "e2_nada_especifico", "Tudo bem, vamos construir a ideia do zero."),
        op(2, "Lembro de retas paralelas cortadas por transversais, mas não sei montar as proporções.", "e2_retaseproporcao", "Ótimo ponto de partida, vamos organizar as frações."),
        op(3, "Penso em segmentos proporcionais, mas às vezes confundo quais segmentos comparar.", "e2_confusao_segmentos", "Vamos focar na identificação dos segmentos correspondentes."),
        op(4, "Me sinto seguro com o Teorema de Tales e já o uso em problemas de semelhança de triângulos.", "e2_avancado", "Excelente, vamos refinar com problemas mais ricos.")
      ],
      "pergunta_diagnostica"
    ),

    etapaTexto(
      "e2_nada_especifico",
      "O Teorema de Tales aparece quando temos um feixe de retas paralelas cortado por duas (ou mais) retas transversais.<br><br>" +
      "Nessa situação, os segmentos formados nas transversais ficam em proporção.<br><br>" +
      "Vamos ver isso em uma figura simples.",
      "e3_figura_basica",
      "reflexao"
    ),

    etapaTexto(
      "e2_retaseproporcao",
      "Você já lembra do cenário certo: retas paralelas cortadas por transversais.<br><br>" +
      "O Teorema de Tales garante proporcionalidade entre os segmentos dessas transversais.<br><br>" +
      "Vamos trabalhar principalmente em como montar as frações na ordem correta.",
      "e3_figura_basica",
      "reflexao"
    ),

    etapaTexto(
      "e2_confusao_segmentos",
      "Saber que \"há proporção\" é apenas metade do caminho.<br><br>" +
      "O mais importante é reconhecer quais segmentos são correspondentes entre si na figura, e então montar a proporção com clareza.",
      "e3_figura_basica",
      "reflexao"
    ),

    etapaTexto(
      "e2_avancado",
      "Vamos usar o Teorema de Tales tanto em figuras planas e semelhança de triângulos como em problemas cotidianos (mapas, escalas, construção, etc.), reforçando a leitura geométrica das proporções.",
      "e3_figura_basica",
      "reflexao"
    ),

    // ─── FIGURA BÁSICA: FEIXE DE RETAS CORTADO POR DUAS TRANSVERSAIS ─
    etapaTexto(
      "e3_figura_basica",
      "Observe a figura: três retas paralelas formam um feixe.<br><br>" +
      "Duas retas transversais cortam esse feixe, criando segmentos nas transversais.<br><br>" +
      "Chamemos os segmentos da primeira transversal de \\( a \\) e \\( b \\), e os da segunda de \\( c \\) e \\( d \\).",
      "e3_enunciado_tales",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    ),

    etapaTexto(
      "e3_enunciado_tales",
      "Enunciado do Teorema de Tales:<br><br>" +
      "Um feixe de retas paralelas determina, sobre duas retas transversais, segmentos proporcionais.<br><br>" +
      "Isso significa que:<br><br>" +
      "\\( \\frac{a}{b} = \\frac{c}{d} \\).",
      "e4_escolha_enunciado",
      "reflexao"
    ),

    etapaEscolha(
      "e4_escolha_enunciado",
      "Qual frase traduz corretamente o Teorema de Tales?",
      [
        op(1, "Um feixe de retas paralelas determina sobre duas transversais segmentos proporcionais.", "e5_interpretar_figura", "Essa é a forma clássica do enunciado."),
        op(2, "Qualquer conjunto de três retas produz segmentos iguais em qualquer figura.", "e4_corrige_enunciado", "Não basta ter três retas; é preciso paralelismo e transversais."),
        op(3, "Todo triângulo retângulo tem lados proporcionais.", "e4_corrige_enunciado", "Isso é Pitágoras, não Tales.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e4_corrige_enunciado",
      "O Teorema de Tales não fala de triângulos nem de qualquer conjunto de retas.<br><br>" +
      "Ele exige:<br><br>" +
      "-> um feixe de retas paralelas;<br><br>" +
      "-> duas retas transversais que cortam esse feixe;<br><br>" +
      "-> segmentos correspondentes nas transversais em proporção.",
      "e5_interpretar_figura",
      "reflexao"
    ),

    // ─── INTERPRETAR UMA FIGURA NUMÉRICA SIMPLES ────────────────────
    etapaTexto(
      "e5_interpretar_figura",
      "Considere a figura com três paralelas e duas transversais:<br><br>" +
      "Na primeira transversal, os segmentos medem 3 cm e 5 cm.<br><br>" +
      "Na segunda transversal, o segmento correspondente ao 3 cm mede 6 cm, e o outro é desconhecido (\\( x \\)).<br><br>" +
      "Pela proporcionalidade, podemos escrever a razão entre os segmentos.",
      "e5_montar_proporcao_simples",
      "reflexao"
    ),

    etapaEscolha(
      "e5_montar_proporcao_simples",
      "Qual proporção está corretamente montada para essa situação?",
      [
        op(1, "\\( \\frac{3}{5} = \\frac{6}{x} \\).", "e6_resolver_proporcao_simples", "Correto: 3 corresponde a 6, 5 corresponde a \\( x \\)."),
        op(2, "\\( \\frac{3}{6} = \\frac{5}{x} \\).", "e5_corrige_proporcao_simples", "Essa comparação inverte a ordem dos correspondentes."),
        op(3, "\\( \\frac{5}{3} = \\frac{6}{x} \\).", "e5_corrige_proporcao_simples", "A proporção deixa de associar os segmentos na mesma posição sobre as transversais.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e5_corrige_proporcao_simples",
      "Para montar a proporção, é importante alinhar segmentos correspondentes:<br><br>" +
      "-> 3 cm na primeira transversal corresponde a 6 cm na segunda;<br><br>" +
      "-> 5 cm na primeira transversal corresponde a \\( x \\) na segunda.<br><br>" +
      "Por isso escrevemos \\( \\frac{3}{5} = \\frac{6}{x} \\).",
      "e6_resolver_proporcao_simples",
      "reflexao"
    ),

    etapaTexto(
      "e6_resolver_proporcao_simples",
      "Resolvendo a proporção \\( \\frac{3}{5} = \\frac{6}{x} \\):<br><br>" +
      "1) Multiplicação cruzada: \\( 3 \\cdot x = 5 \\cdot 6 \\)<br><br>" +
      "2) \\( 3x = 30 \\)<br><br>" +
      "3) \\( x = 30 / 3 = 10 \\)<br><br>" +
      "O segmento desconhecido mede 10 cm.",
      "e7_tales_semelhanca_triangulos",
      "reflexao"
    ),

    // ─── CONEXÃO COM SEMELHANÇA DE TRIÂNGULOS ───────────────────────
    etapaTexto(
      "e7_tales_semelhanca_triangulos",
      "O Teorema de Tales também pode ser visto como um caso particular de semelhança de triângulos.<br><br>" +
      "Se prolongarmos as transversais até formar triângulos com as paralelas, obtemos triângulos semelhantes, e as proporções de Tales surgem dessas semelhanças.",
      "e7_escolha_semelhanca",
      "reflexao"
    ),

    etapaEscolha(
      "e7_escolha_semelhanca",
      "Por que triângulos formados por um feixe de paralelas e duas transversais são semelhantes?",
      [
        op(1, "Porque compartilham ângulos e têm lados correspondentes em proporção.", "e8_exemplo_semelhanca", "Exato: isso é semelhança AA + LAL."),
        op(2, "Porque todo triângulo é automaticamente semelhante a qualquer outro.", "e7_corrige_semelhanca", "Semelhança exige condições específicas (ângulos/lados)."),
        op(3, "Porque o Teorema de Tales diz isso sem precisar ver ângulos.", "e7_corrige_semelhanca", "O teorema afirma a proporcionalidade, que pode ser vista via semelhança.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_corrige_semelhanca",
      "Triângulos são semelhantes quando têm ângulos correspondentes iguais e lados correspondentes proporcionais.<br><br>" +
      "No contexto de retas paralelas cortadas por transversais, os ângulos iguais aparecem pelo paralelismo, e daí vêm as proporções.",
      "e8_exemplo_semelhanca",
      "reflexao"
    ),

    etapaTexto(
      "e8_exemplo_semelhanca",
      "Imagine dois triângulos formados pelas mesmas paralelas e transversais.<br><br>" +
      "Eles compartilham ângulos correspondentes e têm os lados sobre as transversais relacionados pelos Teorema de Tales.<br><br>" +
      "Isso mostra a ligação entre Tales (segmentos proporcionais) e semelhança de triângulos.",
      "e9_problema_escala_mapa",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: MAPA/ESCALA COM TALES ─────────────────
    etapaTexto(
      "e9_problema_escala_mapa",
      "O Teorema de Tales aparece em problemas de escala e mapas, onde retas paralelas representam, por exemplo, linhas de latitude ou ruas paralelas, e transversais representam avenidas ou segmentos de medição.<br><br>" +
      "Vamos ver um exemplo prático.",
      "e9_escolha_mapa",
      "reflexao"
    ),

    etapaEscolha(
      "e9_escolha_mapa",
      "Em um mapa, duas avenidas paralelas são cortadas por duas ruas transversais, formando segmentos medidos em centímetros no papel:<br><br>" +
      "Na primeira rua, os trechos entre as avenidas medem 4 cm e 6 cm.<br><br>" +
      "Na segunda rua, o trecho correspondente ao 4 cm mede 2 cm.<br><br>" +
      "Qual deve ser o outro trecho na segunda rua para manter a proporcionalidade?",
      [
        op(1, "3 cm.", "e10_resolucao_mapa", "Vamos conferir pela proporção."),
        op(2, "\\( x \\) tal que \\( \\frac{4}{6} = \\frac{2}{x} \\).", "e10_resolucao_mapa", "Correto, essa é a igualdade que devemos resolver."),
        op(3, "Não há como saber sem a escala do mapa.", "e9_corrige_mapa", "A escala não muda a proporção entre os segmentos no papel.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_mapa",
      "Mesmo sem saber a escala do mapa, o Teorema de Tales garante que:<br><br>" +
      "\\( \\frac{4}{6} = \\frac{2}{x} \\).<br><br>" +
      "A escala entra depois, para transformar centímetros do mapa em metros reais.",
      "e10_resolucao_mapa",
      "reflexao"
    ),

    etapaTexto(
      "e10_resolucao_mapa",
      "Resolvendo \\( \\frac{4}{6} = \\frac{2}{x} \\):<br><br>" +
      "1) Multiplicação cruzada: \\( 4 \\cdot x = 6 \\cdot 2 \\)<br><br>" +
      "2) \\( 4x = 12 \\)<br><br>" +
      "3) \\( x = 12 / 4 = 3 \\)<br><br>" +
      "O segundo trecho na segunda rua deve medir 3 cm no mapa para manter a proporcionalidade.",
      "e11_problema_construcao",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: CONSTRUÇÃO / DIVISÃO EM PARTES IGUAIS ─
    etapaTexto(
      "e11_problema_construcao",
      "Em construção civil, o Teorema de Tales é usado para dividir uma viga ou um terreno em partes proporcionais, traçando retas paralelas e transversais.<br><br>" +
      "Vamos considerar um exemplo de divisão de comprimento em partes iguais usando paralelas.",
      "e11_escolha_construcao",
      "reflexao"
    ),

    etapaEscolha(
      "e11_escolha_construcao",
      "Um engenheiro precisa dividir uma viga de 9 m em três partes iguais, mas só pode trabalhar em escala num desenho.<br><br>" +
      "Ele desenha a viga como um segmento AB e traça uma transversal a partir de A.<br><br>" +
      "Nessa transversal, marca três segmentos iguais e traça paralelas para encontrar pontos C e D em AB.<br><br>" +
      "Que propriedade garante que os segmentos AC, CD e DB terão o mesmo comprimento?",
      [
        op(1, "Teorema de Tales, pois um feixe de paralelas determina segmentos proporcionais nas transversais.", "e12_reflexao_tales_semelhanca", "Exatamente: as paralelas garantem que a divisão é proporcional."),
        op(2, "Teorema de Pitágoras, pois os segmentos formam triângulos retângulos.", "e11_corrige_construcao", "Pitágoras trata de triângulos retângulos, não dessa divisão em feixe de paralelas."),
        op(3, "Apenas a soma dos comprimentos, sem precisar de nenhum teorema.", "e11_corrige_construcao", "Sem paralelismo e proporcionalidade, não há garantia geométrica da igualdade.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e11_corrige_construcao",
      "Ao marcar segmentos iguais em uma transversal e traçar retas paralelas, o Teorema de Tales garante que os segmentos correspondentes na viga ficam proporcionais.<br><br>" +
      "Assim, dividir a transversal em três partes iguais implica dividir o segmento AB em três partes iguais.",
      "e12_reflexao_tales_semelhanca",
      "reflexao"
    ),

    // ─── REFLEXÃO: TALES, PROPORÇÃO E SEMELHANÇA ────────────────────
    etapaTexto(
      "e12_reflexao_tales_semelhanca",
      "Ao longo desta sessão, você viu que:<br><br>" +
      "-> O Teorema de Tales fala de feixe de retas paralelas e transversais, gerando segmentos proporcionais;<br><br>" +
      "-> Essas proporções podem ser vistas também como consequência da semelhança de triângulos;<br><br>" +
      "-> Em problemas práticos (mapas, construção, escalas), Tales é a ferramenta que conecta medidas geométricas e numéricas.",
      "e13_sintese_final",
      "reflexao"
    ),

    // ─── SÍNTESE FINAL ──────────────────────────────────────────────
    etapaEscolha(
      "e13_sintese_final",
      "Qual afirmação melhor resume o uso do Teorema de Tales em problemas?",
      [
        op(1, "Ele serve apenas para decorar frações, sem interpretação geométrica.", "e13_corrige_sintese", "O teorema nasce da geometria de paralelas e transversais."),
        op(2, "Ele permite montar proporções corretas entre segmentos de transversais de um feixe de paralelas, conectando geometria e números.", "e_final", "Boa síntese."),
        op(3, "Ele é usado apenas em exercícios de prova, sem ligação com situações reais.", "e13_corrige_sintese", "Vimos aplicações em mapas, construção e escalas.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e13_corrige_sintese",
      "O Teorema de Tales é um teorema geométrico que garante proporcionalidade entre segmentos gerados por retas paralelas e transversais.<br><br>" +
      "A partir dele, montamos proporções como \\( \\frac{a}{b} = \\frac{c}{d} \\), resolvemos incógnitas e interpretamos situações reais com apoio da geometria.",
      "e_final",
      "reflexao"
    ),

    // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
    etapaAvaliacao(
      "e_final",
      "Vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "Um feixe de retas paralelas determina, sobre duas retas transversais, segmentos proporcionais." },
        { id: 2, texto: "Em um feixe de paralelas cortadas por duas transversais, a razão entre dois segmentos quaisquer de uma transversal é igual à razão entre os segmentos correspondentes da outra." },
        { id: 3, texto: "O Teorema de Tales pode ser usado para encontrar medidas desconhecidas em situações de mapas, escalas e construção, montando e resolvendo proporções." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas afirmativas descrevem o enunciado e o uso do Teorema de Tales em problemas de proporcionalidade e semelhança envolvendo feixe de retas paralelas e transversais.",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    )
  ]
},

  "EF.09.MAT.2.96": {
  id: "EF.09.MAT.2.96",
  titulo: "Trigonometria no Triângulo Retângulo: seno, cosseno e tangente",
  objetivo: "Relacionar as medidas e os ângulos do triângulo retângulo, aplicando as razões trigonométricas seno, cosseno e tangente na resolução de problemas.",

  etapas: [

    // ─── DIAGNÓSTICO ───────────────────────────────────────────────
    etapaEscolha(
      "e1",
      "Quando aparecem as palavras seno, cosseno e tangente, o que você sente?",
      [
        op(1, "Pânico. Vejo fórmulas sen, cos, tg, mas não entendo o que significam.", "e2_panico", "Vamos começar pela ideia geométrica, não pela fórmula decorada."),
        op(2, "Lembro que tem a ver com triângulo retângulo, mas não sei qual razão usar em cada problema.", "e2_sabe_meio", "Ótimo ponto de partida. Vamos organizar 'quando usar qual'."),
        op(3, "Sei as fórmulas básicas, mas me confundo na hora de relacionar com ângulos e lados.", "e2_confusao", "Vamos fixar o papel de cada lado em relação ao ângulo."),
        op(4, "Me sinto à vontade com trigonometria no triângulo retângulo.", "e2_avancado", "Excelente, vamos trabalhar problemas mais ricos.")
      ],
      "pergunta_diagnostica"
    ),

    etapaTexto(
      "e2_panico",
      "Seno, cosseno e tangente não são \"três fórmulas estranhas\".<br><br>" +
      "Eles são apenas frações entre lados de um triângulo retângulo, ligadas a um ângulo agudo desse triângulo.<br><br>" +
      "Vamos construir essa ideia a partir da figura.",
      "e3_triangulo_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_sabe_meio",
      "Você já associa trigonometria ao triângulo retângulo, o que é ótimo.<br><br>" +
      "O próximo passo é saber identificar, em cada problema, qual razão usar (seno, cosseno ou tangente) a partir de quais lados aparecem.",
      "e3_triangulo_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_confusao",
      "Saber as fórmulas é útil, mas o essencial é enxergar quem é hipotenusa, quem é cateto oposto e quem é cateto adjacente em relação ao ângulo dado.<br><br>" +
      "A partir disso, as razões trigonométricas ficam naturais.",
      "e3_triangulo_base",
      "reflexao"
    ),

    etapaTexto(
      "e2_avancado",
      "Vamos revisar rapidamente as razões trigonométricas e, em seguida, trabalhar problemas de altura, distância e inclinação que exploram bem essas relações.",
      "e3_triangulo_base",
      "reflexao"
    ),

    // ─── TRIÂNGULO BASE E NOMES DOS LADOS ──────────────────────────
    etapaTexto(
      "e3_triangulo_base",
      "Considere um triângulo retângulo \\( ABC \\), com ângulo reto em \\( C \\).<br><br>" +
      "-> Hipotenusa: lado oposto ao ângulo reto, aqui \\( AB \\).<br><br>" +
      "-> Catetos: \\( AC \\) e \\( BC \\), que formam o ângulo de 90°. <br><br>" +
      "Olhe agora para um dos ângulos agudos, por exemplo \\( \\angle A \\).",
      "e3_identificar_oposto_adjacente",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    ),

    etapaEscolha(
      "e3_identificar_oposto_adjacente",
      "Em relação ao ângulo \\( \\angle A \\):<br><br>" +
      "-> qual lado é o cateto oposto?<br><br>" +
      "-> qual é o cateto adjacente?<br><br>",
      [
        op(1, "Cateto oposto: \\( BC \\); cateto adjacente: \\( AC \\).", "e4_definicao_razoes", "Perfeito. A hipotenusa continua sendo \\( AB \\)."),
        op(2, "Cateto oposto: \\( AC \\); cateto adjacente: \\( BC \\).", "e3_corrige_oposto_adjacente", "Repare qual lado não encosta no \\( \\angle A \\)."),
        op(3, "Hipotenusa: \\( AC \\); catetos: \\( AB \\) e \\( BC \\).", "e3_corrige_oposto_adjacente", "A hipotenusa é sempre o lado oposto ao ângulo reto.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e3_corrige_oposto_adjacente",
      "Em relação ao ângulo \\( \\angle A \\):<br><br>" +
      "-> o cateto oposto é o lado que não encosta no vértice A, ou seja, \\( BC \\);<br><br>" +
      "-> o cateto adjacente é o lado que encosta em A e faz parte do ângulo, \\( AC \\);<br><br>" +
      "-> a hipotenusa continua sendo \\( AB \\), oposta ao ângulo reto.",
      "e4_definicao_razoes",
      "reflexao"
    ),

    // ─── DEFINIÇÃO DAS RAZÕES TRIGONOMÉTRICAS ──────────────────────
    etapaTexto(
      "e4_definicao_razoes",
      "No triângulo retângulo, as principais razões trigonométricas para um ângulo agudo \\( \\theta \\) são:<br><br>" +
      "Seno:<br><br>" +
      "\\( \\text{sen}(\\theta) = \\frac{\\text{cateto oposto}}{\\text{hipotenusa}} \\)<br><br>" +
      "Cosseno:<br><br>" +
      "\\( \\cos(\\theta) = \\frac{\\text{cateto adjacente}}{\\text{hipotenusa}} \\)<br><br>" +
      "Tangente:<br><br>" +
      "\\( \\tan(\\theta) = \\frac{\\text{cateto oposto}}{\\text{cateto adjacente}} \\).[web:151][web:153][web:156][web:155][web:158]",
      "e4_escolha_definicao",
      "reflexao"
    ),

    etapaEscolha(
      "e4_escolha_definicao",
      "Qual das opções identifica corretamente seno, cosseno e tangente de um ângulo \\( \\theta \\) em um triângulo retângulo?",
      [
        op(1, "Seno: oposto/hipotenusa; Cosseno: adjacente/hipotenusa; Tangente: oposto/adjacente.", "e5_aplicar_definicao_simples", "Isso mesmo."),
        op(2, "Seno: hipotenusa/oposto; Cosseno: hipotenusa/adjacente; Tangente: adjacente/oposto.", "e4_corrige_definicao", "As razões sempre são \"cateto sobre\" outro lado, não o inverso."),
        op(3, "Todas são hipotenusa sobre algum cateto.", "e4_corrige_definicao", "A tangente não envolve hipotenusa, só catetos.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e4_corrige_definicao",
      "As razões trigonométricas são divisões entre lados do triângulo retângulo:<br><br>" +
      "-> seno: cateto oposto sobre hipotenusa;<br><br>" +
      "-> cosseno: cateto adjacente sobre hipotenusa;<br><br>" +
      "-> tangente: cateto oposto sobre cateto adjacente.<br><br>" +
      "Não usamos hipotenusa na tangente.",
      "e5_aplicar_definicao_simples",
      "reflexao"
    ),

    // ─── APLICAR AS RAZÕES EM UM EXEMPLO SIMPLES ────────────────────
    etapaTexto(
      "e5_aplicar_definicao_simples",
      "Suponha um triângulo retângulo em que, para um ângulo \\( \\theta \\):<br><br>" +
      "-> cateto oposto mede 3;<br><br>" +
      "-> cateto adjacente mede 4;<br><br>" +
      "-> hipotenusa mede 5.<br><br>" +
      "Vamos escrever sen(\\( \\theta \\)), cos(\\( \\theta \\)) e tan(\\( \\theta \\)).",
      "e5_escolha_exemplo_simples",
      "reflexao"
    ),

    etapaEscolha(
      "e5_escolha_exemplo_simples",
      "Com oposto = 3, adjacente = 4 e hipotenusa = 5, quais são as razões de \\( \\theta \\)?",
      [
        op(1, "sen(\\( \\theta \\)) = 3/5, cos(\\( \\theta \\)) = 4/5, tan(\\( \\theta \\)) = 3/4.", "e6_relacionar_angulo_medida", "Correto."),
        op(2, "sen(\\( \\theta \\)) = 5/3, cos(\\( \\theta \\)) = 5/4, tan(\\( \\theta \\)) = 4/3.", "e5_corrige_exemplo_simples", "Inverteu as frações."),
        op(3, "sen(\\( \\theta \\)) = 3/4, cos(\\( \\theta \\)) = 4/3, tan(\\( \\theta \\)) = 5/4.", "e5_corrige_exemplo_simples", "Essas razões não seguem as definições.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e5_corrige_exemplo_simples",
      "Usando as definições:<br><br>" +
      "-> sen(\\( \\theta \\)) = oposto/hipotenusa = 3/5;<br><br>" +
      "-> cos(\\( \\theta \\)) = adjacente/hipotenusa = 4/5;<br><br>" +
      "-> tan(\\( \\theta \\)) = oposto/adjacente = 3/4.<br><br>" +
      "Esses valores descrevem como o ângulo \\( \\theta \\) \"vê\" os lados do triângulo.",
      "e6_relacionar_angulo_medida",
      "reflexao"
    ),

    // ─── RELAÇÃO ENTRE ÂNGULO E TAMANHO DOS LADOS ───────────────────
    etapaTexto(
      "e6_relacionar_angulo_medida",
      "Para um mesmo triângulo, cada ângulo agudo tem seu próprio seno, cosseno e tangente.<br><br>" +
      "Isso significa que, conhecendo um ângulo e um lado, podemos descobrir os outros lados usando as razões trigonométricas.[web:151][web:153][web:156]",
      "e6_escolha_relacao",
      "reflexao"
    ),

    etapaEscolha(
      "e6_escolha_relacao",
      "Se conhecemos o ângulo \\( \\theta \\) e o valor da hipotenusa, e queremos encontrar o cateto adjacente, qual razão faz mais sentido usar?",
      [
        op(1, "Seno, pois envolve oposto e hipotenusa.", "e6_corrige_relacao", "Você precisa relacionar adjacente com hipotenusa."),
        op(2, "Cosseno, pois relaciona cateto adjacente e hipotenusa.", "e7_problema_escada", "Exato: cos(\\( \\theta \\)) = adjacente/hipotenusa."),
        op(3, "Tangente, pois não usa a hipotenusa.", "e6_corrige_relacao", "Tangente não aproveita a informação da hipotenusa.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e6_corrige_relacao",
      "Para encontrar o cateto adjacente a partir da hipotenusa e do ângulo, usamos o cosseno:<br><br>" +
      "\\( \\cos(\\theta) = \\frac{\\text{adjacente}}{\\text{hipotenusa}} \\).<br><br>" +
      "Assim, adjacente = \\( \\cos(\\theta) \\cdot \\) hipotenusa.",
      "e7_problema_escada",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: ESCADA / RAMPA ────────────────────────
    etapaTexto(
      "e7_problema_escada",
      "Uma escada encosta em uma parede formando um ângulo de 60° com o chão.<br><br>" +
      "A escada mede 4 m (hipotenusa).<br><br>" +
      "Qual é a distância do pé da escada até a parede (cateto adjacente)?<br><br>" +
      "Use o valor aproximado \\( \\cos(60°) = 0{,}5 \\).[web:151][web:153][web:156]",
      "e7_escolha_escada",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e7c0a808dfaa68caf4b855731b29f7e7b1678967.jpg"
    ),

    etapaEscolha(
      "e7_escolha_escada",
      "Com hipotenusa = 4 m e \\( \\cos(60°) = 0{,}5 \\), qual é o cateto adjacente?",
      [
        op(1, "2 m.", "e8_corrige_escada", "Vamos conferir pelo cálculo passo a passo."),
        op(2, "2 m (pois adjacente = cos(60°) · 4 = 0,5 · 4 = 2).", "e8_problema_altura", "Correto: aplicamos cosseno diretamente."),
        op(3, "8 m.", "e8_corrige_escada", "Essa seria a hipotenusa multiplicada por 2, sem relação com o cosseno.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e8_corrige_escada",
      "Aplicando a fórmula:<br><br>" +
      "1) \\( \\cos(60°) = \\frac{\\text{adjacente}}{\\text{hipotenusa}} \\)<br><br>" +
      "2) \\( 0{,}5 = \\frac{\\text{adjacente}}{4} \\)<br><br>" +
      "3) adjacente = \\( 0{,}5 \\cdot 4 = 2 \\)<br><br>" +
      "A distância do pé da escada até a parede é de 2 m.",
      "e8_problema_altura",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: ALTURA POR SENO ──────────────────────
    etapaTexto(
      "e8_problema_altura",
      "Agora queremos a altura que o topo da escada atinge na parede (cateto oposto).<br><br>" +
      "Use \\( \\sin(60°) \\approx 0{,}866 \\).<br><br>" +
      "Hipotenusa continua sendo 4 m.",
      "e8_escolha_altura",
      "reflexao"
    ),

    etapaEscolha(
      "e8_escolha_altura",
      "Com hipotenusa = 4 m e \\( \\sin(60°) \\approx 0{,}866 \\), qual é o cateto oposto (altura)?",
      [
        op(1, "3,464 m (aprox.).", "e9_corrige_altura", "Vamos ver o cálculo passo a passo."),
        op(2, "3,464 m (pois oposto = sen(60°) · 4 = 0,866 · 4).", "e9_relacao_tangente", "Correto: aplica-se seno para obter a altura."),
        op(3, "1,732 m.", "e9_corrige_altura", "Esse é metade do valor correto; reveja a multiplicação.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_altura",
      "Aplicando a fórmula:<br><br>" +
      "1) \\( \\sin(60°) = \\frac{\\text{oposto}}{\\text{hipotenusa}} \\)<br><br>" +
      "2) \\( 0{,}866 = \\frac{\\text{oposto}}{4} \\)<br><br>" +
      "3) oposto = \\( 0{,}866 \\cdot 4 = 3{,}464 \\) (aprox.)<br><br>" +
      "Logo, o topo da escada atinge aproximadamente 3,464 m de altura.",
      "e9_relacao_tangente",
      "reflexao"
    ),

    // ─── RELAÇÃO COM TANGENTE E INCLINAÇÃO ─────────────────────────
    etapaTexto(
      "e9_relacao_tangente",
      "A tangente de um ângulo em um triângulo retângulo mede a \"inclinação\": é a razão entre cateto oposto e cateto adjacente.<br><br>" +
      "\\( \\tan(\\theta) = \\frac{\\text{oposto}}{\\text{adjacente}} \\).[web:151][web:153][web:156][web:158]",
      "e9_escolha_tangente",
      "reflexao"
    ),

    etapaEscolha(
      "e9_escolha_tangente",
      "Se em um triângulo retângulo, para certo ângulo \\( \\theta \\), oposto = 3 e adjacente = 4, qual é \\( \\tan(\\theta) \\)?",
      [
        op(1, "3/4.", "e10_problema_rampa", "Correto: oposto/adjacente."),
        op(2, "4/3.", "e9_corrige_tangente", "Inverteu os lados na razão."),
        op(3, "3/5.", "e9_corrige_tangente", "Incluiu hipotenusa, que não aparece na tangente.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_tangente",
      "Tangente sempre é cateto oposto sobre cateto adjacente:<br><br>" +
      "Se oposto = 3 e adjacente = 4:<br><br>" +
      "\\( \\tan(\\theta) = 3/4 \\).<br><br>" +
      "Essa razão é muito usada para modelar inclinações de rampas e estradas.",
      "e10_problema_rampa",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: RAMPA / ACLIVE ───────────────────────
    etapaTexto(
      "e10_problema_rampa",
      "Uma rampa liga dois níveis de um prédio.<br><br>" +
      "Ela sobe 1,5 m de altura (cateto oposto) em um deslocamento horizontal de 3 m (cateto adjacente).<br><br>" +
      "A tangente do ângulo \\( \\theta \\) que a rampa faz com o chão é:<br><br>" +
      "\\( \\tan(\\theta) = \\frac{1{,}5}{3} = 0{,}5 \\).",
      "e10_escolha_rampa",
      "reflexao"
    ),

    etapaEscolha(
      "e10_escolha_rampa",
      "O que significa dizer que \\( \\tan(\\theta) = 0{,}5 \\) para essa rampa?",
      [
        op(1, "Que para cada 1 m na horizontal, a rampa sobe 0,5 m na vertical.", "e11_reflexao_trigonometria", "Boa interpretação geométrica da tangente."),
        op(2, "Que a rampa tem 0,5 m de comprimento total.", "e10_corrige_rampa", "Esse valor é uma razão, não o comprimento da rampa."),
        op(3, "Que o ângulo \\( \\theta \\) mede 0,5°.", "e10_corrige_rampa", "Tangente não é o valor do ângulo em graus, mas a razão entre lados.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e10_corrige_rampa",
      "A igualdade \\( \\tan(\\theta) = 0{,}5 \\) não diz que o ângulo mede 0,5° nem que a rampa tem 0,5 m de comprimento.<br><br>" +
      "Ela diz que, para cada 1 unidade na horizontal, a rampa sobe 0,5 unidade na vertical.<br><br>" +
      "É uma razão entre lados, não uma medida absoluta.",
      "e11_reflexao_trigonometria",
      "reflexao"
    ),

    // ─── REFLEXÃO: LIGAR ÂNGULO, LADOS E RAZÕES ─────────────────────
    etapaTexto(
      "e11_reflexao_trigonometria",
      "Você viu que:<br><br>" +
      "-> seno, cosseno e tangente são razões entre lados de um triângulo retângulo, ligadas a um ângulo agudo;<br><br>" +
      "-> conhecendo um ângulo e um lado, podemos usar essas razões para encontrar outros lados;<br><br>" +
      "-> essas ideias aparecem em problemas de escada, altura, distância e inclinação.",
      "e12_sintese_final",
      "reflexao"
    ),

    // ─── SÍNTESE FINAL ──────────────────────────────────────────────
    etapaEscolha(
      "e12_sintese_final",
      "Qual das afirmações abaixo melhor descreve a trigonometria no triângulo retângulo?",
      [
        op(1, "É apenas um conjunto de fórmulas de sen, cos e tg para decorar.", "e12_corrige_sintese", "Na verdade, são relações geométricas entre lados e ângulos."),
        op(2, "É o estudo das relações entre ângulos e lados de triângulos retângulos, usando seno, cosseno e tangente como razões entre catetos e hipotenusa.", "e_final", "Excelente síntese."),
        op(3, "Serve apenas para calcular comprimento de hipotenusa.", "e12_corrige_sintese", "Usamos também para catetos, alturas, distâncias horizontais etc.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e12_corrige_sintese",
      "Trigonometria no triângulo retângulo não é um \"pacote de fórmulas\" desconectado.<br><br>" +
      "Ela descreve, com seno, cosseno e tangente, como cada ângulo enxerga os lados (catetos e hipotenusa), permitindo resolver problemas de altura, distância e inclinação.",
      "e_final",
      "reflexao"
    ),

    // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
    etapaAvaliacao(
      "e_final",
      "Vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "Em um triângulo retângulo, sen(\\( \\theta \\)) é a razão entre o cateto oposto ao ângulo \\( \\theta \\) e a hipotenusa." },
        { id: 2, texto: "Em um triângulo retângulo, cos(\\( \\theta \\)) é a razão entre o cateto adjacente ao ângulo \\( \\theta \\) e a hipotenusa." },
        { id: 3, texto: "Em um triângulo retângulo, tan(\\( \\theta \\)) é a razão entre o cateto oposto e o cateto adjacente ao ângulo \\( \\theta \\)." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas afirmativas cobrem exatamente o descritor: relacionar medidas e ângulos do triângulo retângulo, aplicando seno, cosseno e tangente na resolução de problemas.",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/37c2fea1e64a930b3ead306f510e711213551d86.jpg"
    )
  ]
},

  "EF.09.MAT.3.98": {
  id: "EF.09.MAT.3.98",
  titulo: "Arcos e Ângulos na Circunferência: central e inscrito",
  objetivo: "Relacionar as medidas de arcos e ângulos centrais e inscritos da circunferência, utilizando meios físicos e software de geometria dinâmica para elaborar e resolver problemas.",

  etapas: [

    // ─── DIAGNÓSTICO ───────────────────────────────────────────────
    etapaEscolha(
      "e1",
      "Quando você vê uma circunferência com arcos e ângulos desenhados, o que acontece?",
      [
        op(1, "Eu não sei diferenciar ângulo central de ângulo inscrito.", "e2_nao_diferencia", "Vamos começar pelas definições claras."),
        op(2, "Eu sei identificar, mas não lembro as relações entre ângulo e arco.", "e2_sabe_meio", "Ótimo, vamos fixar as fórmulas e seu sentido geométrico."),
        op(3, "Eu lembro que o ângulo inscrito \"vale metade\", mas não estou seguro quando isso se aplica.", "e2_meia_duvida", "Vamos ver exatamente quando e por quê."),
        op(4, "Me sinto à vontade com arcos e ângulos na circunferência.", "e2_avancado", "Excelente, vamos trabalhar problemas com mais etapas e uso de software.")
      ],
      "pergunta_diagnostica"
    ),

    etapaTexto(
      "e2_nao_diferencia",
      "Na circunferência, os ângulos mais importantes são:<br><br>" +
      "-> o ângulo central, com vértice no centro;<br><br>" +
      "-> o ângulo inscrito, com vértice na própria circunferência.<br><br>" +
      "Cada um deles se relaciona com um arco, e é essa relação que vamos explorar.",
      "e3_definicoes_basicas",
      "reflexao"
    ),

    etapaTexto(
      "e2_sabe_meio",
      "Você já reconhece que existem diferentes tipos de ângulos na circunferência.<br><br>" +
      "Agora vamos organizar:<br><br>" +
      "-> como cada tipo é definido;<br><br>" +
      "-> qual é a relação numérica entre o ângulo e o arco correspondente.",
      "e3_definicoes_basicas",
      "reflexao"
    ),

    etapaTexto(
      "e2_meia_duvida",
      "A frase \"o inscrito vale metade\" está quase certa, mas precisa de contexto:<br><br>" +
      "-> metade de quê?<br><br>" +
      "-> em relação a qual arco?<br><br>" +
      "Vamos tornar essa ideia precisa, usando figuras e, depois, software de geometria dinâmica.",
      "e3_definicoes_basicas",
      "reflexao"
    ),

    etapaTexto(
      "e2_avancado",
      "Vamos revisar rapidamente a relação entre ângulo central, ângulo inscrito e arcos, e em seguida propor problemas mais elaborados, incluindo a exploração dinâmica (por exemplo, GeoGebra).",
      "e3_definicoes_basicas",
      "reflexao"
    ),

    // ─── DEFINIÇÕES BÁSICAS ─────────────────────────────────────────
    etapaTexto(
      "e3_definicoes_basicas",
      "Ângulo central:<br><br>" +
      "-> vértice no centro da circunferência;<br><br>" +
      "-> seus lados são raios.<br><br>" +
      "Ângulo inscrito:<br><br>" +
      "-> vértice em um ponto da circunferência;<br><br>" +
      "-> seus lados são cordas (secantes à circunferência).[web:161][web:163][web:166]",
      "e3_figura_central_inscrito",
      "reflexao",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/09f697a265827bbfb3c30f31eb3c119b6e82f96a.jpg"
    ),

    etapaEscolha(
      "e3_figura_central_inscrito",
      "Na figura, qual ângulo é central e qual é inscrito?",
      [
        op(1, "O ângulo com vértice no centro é central; o com vértice na circunferência é inscrito.", "e4_relacao_central_arco", "Exatamente."),
        op(2, "O ângulo maior é sempre inscrito e o menor é sempre central.", "e3_corrige_central_inscrito", "O tamanho não define o tipo, e sim a posição do vértice."),
        op(3, "Qualquer ângulo desenhado perto do círculo é inscrito.", "e3_corrige_central_inscrito", "Precisamos olhar para o vértice, não para a \"proximidade\".")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e3_corrige_central_inscrito",
      "Para identificar:<br><br>" +
      "-> olhe para o vértice do ângulo;<br><br>" +
      "-> se o vértice está no centro da circunferência, o ângulo é central;<br><br>" +
      "-> se o vértice está em um ponto da circunferência, o ângulo é inscrito.<br><br>" +
      "O tamanho do ângulo não determina o tipo.",
      "e4_relacao_central_arco",
      "reflexao"
    ),

    // ─── RELAÇÃO ENTRE ÂNGULO CENTRAL E ARCO ────────────────────────
    etapaTexto(
      "e4_relacao_central_arco",
      "Teorema para o ângulo central:<br><br>" +
      "A medida de um arco de circunferência é igual à medida do ângulo central correspondente.<br><br>" +
      "Ou seja, se o ângulo central mede 80°, o arco que ele intercepta também mede 80°.[web:161][web:163][web:166]",
      "e4_escolha_central_arco",
      "reflexao"
    ),

    etapaEscolha(
      "e4_escolha_central_arco",
      "Se o ângulo central \\( \\widehat{AOB} \\) mede 120°, qual é a medida do arco \\( \\widehat{AB} \\) correspondente?",
      [
        op(1, "120°.", "e5_relacao_inscrito_arco", "Correto: arco e ângulo central têm mesma medida."),
        op(2, "60°.", "e4_corrige_central_arco", "60° será importante para ângulo inscrito, não para o central."),
        op(3, "240°.", "e4_corrige_central_arco", "240° seria o arco complementar; aqui queremos o arco interceptado diretamente.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e4_corrige_central_arco",
      "Por definição:<br><br>" +
      "-> o ângulo central e o arco correspondente têm a mesma medida;<br><br>" +
      "-> se \\( \\widehat{AOB} = 120° \\), então o arco \\( \\widehat{AB} \\) também mede 120°.<br><br>" +
      "Não há fator de 1/2 aqui.",
      "e5_relacao_inscrito_arco",
      "reflexao"
    ),

    // ─── RELAÇÃO ENTRE ÂNGULO INSCRITO E ARCO ───────────────────────
    etapaTexto(
      "e5_relacao_inscrito_arco",
      "Teorema para o ângulo inscrito:<br><br>" +
      "A medida de um ângulo inscrito é igual à metade da medida do arco correspondente.<br><br>" +
      "Equivalente: a medida do arco é o dobro da medida do ângulo inscrito.[web:161][web:163][web:164][web:166]",
      "e5_escolha_inscrito_arco",
      "reflexao"
    ),

    etapaEscolha(
      "e5_escolha_inscrito_arco",
      "Se o arco \\( \\widehat{AB} \\) mede 120°, qual é a medida de um ângulo inscrito \\( \\widehat{APB} \\) que intercepta esse mesmo arco?",
      [
        op(1, "60°.", "e6_exemplo_central_inscrito", "Correto: ângulo inscrito = metade do arco."),
        op(2, "120°.", "e5_corrige_inscrito_arco", "Esse valor é o do ângulo central, não do inscrito."),
        op(3, "240°.", "e5_corrige_inscrito_arco", "240° seria um arco maior, não o ângulo inscrito.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e5_corrige_inscrito_arco",
      "Se o arco mede 120°:<br><br>" +
      "-> o ângulo central correspondente mede 120°;<br><br>" +
      "-> qualquer ângulo inscrito que intercepte esse arco mede metade: 60°.<br><br>" +
      "Por isso, dizemos que \"o inscrito vale metade do arco\".",
      "e6_exemplo_central_inscrito",
      "reflexao"
    ),

    // ─── EXEMPLO: COMPARAR CENTRAL E INSCRITO NO MESMO ARCO ─────────
    etapaTexto(
      "e6_exemplo_central_inscrito",
      "Vamos resumir o exemplo com arco de 120°:<br><br>" +
      "-> \\( \\widehat{AOB} \\) (central) = 120°;<br><br>" +
      "-> \\( \\widehat{APB} \\) (inscrito, interceptando o mesmo arco) = 60°;<br><br>" +
      "Logo, o ângulo central é o dobro do inscrito, e o inscrito é metade do central.",
      "e7_problema_simples_arco_inscrito",
      "reflexao"
    ),

    etapaTexto(
      "e7_problema_simples_arco_inscrito",
      "Problema rápido:<br><br>" +
      "Em uma circunferência, o ângulo inscrito \\( \\widehat{APB} \\) mede 35°. Qual é a medida do arco \\( \\widehat{AB} \\) correspondente?",
      "e7_escolha_problema_simples",
      "reflexao"
    ),

    etapaEscolha(
      "e7_escolha_problema_simples",
      "Se o ângulo inscrito é 35°, qual é a medida do arco correspondente?",
      [
        op(1, "35°.", "e7_corrige_problema_simples", "35° seria a medida do próprio ângulo, não do arco."),
        op(2, "70°.", "e8_problema_simples_central", "Correto: arco = 2 × 35°."),
        op(3, "17,5°.", "e7_corrige_problema_simples", "17,5° seria metade, e aqui queremos o dobro.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e7_corrige_problema_simples",
      "Para o ângulo inscrito:<br><br>" +
      "-> Ângulo inscrito = 1/2 × arco<br><br>" +
      "Logo:<br><br>" +
      "1) 35° = 1/2 × arco<br><br>" +
      "2) arco = 2 × 35° = 70°.",
      "e8_problema_simples_central",
      "reflexao"
    ),

    etapaTexto(
      "e8_problema_simples_central",
      "Se o arco \\( \\widehat{AB} \\) mede 70°, então:<br><br>" +
      "-> o ângulo central correspondente também mede 70°;<br><br>" +
      "-> o ângulo inscrito que vê esse arco mede 35°.<br><br>" +
      "Você pode testar isso movendo o ponto P sobre a circunferência em um software de geometria dinâmica.",
      "e9_uso_software_dinamico",
      "reflexao"
    ),

    // ─── USO DE SOFTWARE DE GEOMETRIA DINÂMICA ──────────────────────
    etapaTexto(
      "e9_uso_software_dinamico",
      "Em um software como GeoGebra, você pode:<br><br>" +
      "-> desenhar uma circunferência;<br><br>" +
      "-> marcar dois pontos A e B na circunferência;<br><br>" +
      "-> criar o ângulo central \\( \\widehat{AOB} \\) e medir seu valor;<br><br>" +
      "-> criar um ponto P móvel na circunferência e o ângulo inscrito \\( \\widehat{APB} \\).<br><br>" +
      "Movendo P, você observa que o ângulo inscrito se mantém com metade da medida do arco AB.",
      "e9_escolha_software",
      "reflexao"
    ),

    etapaEscolha(
      "e9_escolha_software",
      "Qual é o principal objetivo de usar um software de geometria dinâmica nesse contexto?",
      [
        op(1, "Ver dinamicamente que, para qualquer posição de P, o ângulo inscrito que vê o mesmo arco tem metade da medida do ângulo central/arco.", "e10_problema_contextual_setor", "Correto: o foco é observar a relação se mantendo."),
        op(2, "Evitar qualquer cálculo, deixando que o software faça tudo sozinho.", "e9_corrige_software", "O software é ferramenta de observação e confirmação, não substituto de raciocínio."),
        op(3, "Desenhar apenas círculos bonitos sem relação com ângulos.", "e9_corrige_software", "Queremos trabalhar relações matemáticas entre arco e ângulo.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e9_corrige_software",
      "O software de geometria dinâmica é usado para:<br><br>" +
      "-> construir figuras com precisão;<br><br>" +
      "-> mover pontos e observar como medidas variam;<br><br>" +
      "-> confirmar relações como \"central = arco\" e \"inscrito = metade\".<br><br>" +
      "Ele não substitui o cálculo, mas ajuda a enxergar a geometria.",
      "e10_problema_contextual_setor",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: SETOR CIRCULAR / PLACA ────────────────
    etapaTexto(
      "e10_problema_contextual_setor",
      "Considere uma placa circular de trânsito.<br><br>" +
      "O gráfico interno ocupa um setor circular cujo ângulo central mede 90°.<br><br>" +
      "Um ângulo inscrito desenhado sobre a borda da placa intercepta exatamente o mesmo arco do gráfico.<br><br>" +
      "Qual é a medida desse ângulo inscrito?",
      "e10_escolha_setor",
      "reflexao"
    ),

    etapaEscolha(
      "e10_escolha_setor",
      "Se o ângulo central é 90°, qual é a medida de um ângulo inscrito que vê o mesmo arco?",
      [
        op(1, "45°.", "e11_problema_contextual_arco", "Correto: inscrito = metade do central."),
        op(2, "90°.", "e10_corrige_setor", "Essa é a medida do ângulo central, não do inscrito."),
        op(3, "180°.", "e10_corrige_setor", "180° seria o arco maior da semicircunferência, não o inscrito.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e10_corrige_setor",
      "Se o ângulo central mede 90°, o arco correspondente também mede 90°.<br><br>" +
      "O ângulo inscrito que vê esse arco tem metade da medida do arco: 45°.<br><br>" +
      "Então, inscrito = 45°.",
      "e11_problema_contextual_arco",
      "reflexao"
    ),

    // ─── PROBLEMA CONTEXTUAL: ARCO A PARTIR DO ÂNGULO INSCRITO ─────
    etapaTexto(
      "e11_problema_contextual_arco",
      "Em uma roda gigante vista de frente, três cabines estão em pontos A, B e C da circunferência.<br><br>" +
      "Do ponto de observação P (na circunferência), o ângulo \\( \\widehat{APB} \\) é inscrito e mede 40°.<br><br>" +
      "Qual é a medida do arco \\( \\widehat{AB} \\)?",
      "e11_escolha_roda",
      "reflexao"
    ),

    etapaEscolha(
      "e11_escolha_roda",
      "Se o ângulo inscrito é 40°, qual é a medida do arco \\( \\widehat{AB} \\)?",
      [
        op(1, "20°.", "e11_corrige_roda", "Aqui o arco precisa ser o dobro."),
        op(2, "40°.", "e11_corrige_roda", "40° é a medida do próprio ângulo, não do arco."),
        op(3, "80°.", "e12_reflexao_arcos_angulos", "Correto: arco = 2 × 40°.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e11_corrige_roda",
      "Para o ângulo inscrito, vale:<br><br>" +
      "-> Ângulo inscrito = 1/2 × arco.<br><br>" +
      "Se o ângulo inscrito é 40°:<br><br>" +
      "1) 40° = 1/2 × arco<br><br>" +
      "2) arco = 2 × 40° = 80°.",
      "e12_reflexao_arcos_angulos",
      "reflexao"
    ),

    // ─── REFLEXÃO: ARCOS, CENTRAIS E INSCRITOS ──────────────────────
    etapaTexto(
      "e12_reflexao_arcos_angulos",
      "Você viu que:<br><br>" +
      "-> a medida de um arco é igual à do ângulo central correspondente;<br><br>" +
      "-> a medida de um ângulo inscrito é igual à metade da medida do arco (e, portanto, metade do ângulo central correspondente);<br><br>" +
      "-> essas relações podem ser exploradas dinamicamente em software e usadas em problemas concretos (placas, rodas gigantes, setores circulares).",
      "e13_sintese_final",
      "reflexao"
    ),

    // ─── SÍNTESE FINAL ──────────────────────────────────────────────
    etapaEscolha(
      "e13_sintese_final",
      "Qual afirmação melhor sintetiza o que aprendemos sobre arcos e ângulos na circunferência?",
      [
        op(1, "O ângulo central tem medida igual ao arco correspondente, e o ângulo inscrito que vê esse arco tem metade da medida.", "e_final", "Excelente síntese."),
        op(2, "O ângulo inscrito é sempre maior que o ângulo central.", "e13_corrige_sintese", "Na verdade, o inscrito é metade do central que vê o mesmo arco."),
        op(3, "Arcos e ângulos na circunferência não têm relação numérica entre si.", "e13_corrige_sintese", "Toda a teoria que vimos é justamente sobre essas relações.")
      ],
      "aprofundamento"
    ),

    etapaTexto(
      "e13_corrige_sintese",
      "Na circunferência, arcos e ângulos se relacionam fortemente:<br><br>" +
      "-> Ângulo central = medida do arco;<br><br>" +
      "-> Ângulo inscrito = metade da medida do arco;<br><br>" +
      "Essas relações são a base para elaborar e resolver problemas envolvendo círculos.",
      "e_final",
      "reflexao"
    ),

    // ─── AVALIAÇÃO FINAL ───────────────────────────────────────────
    etapaAvaliacao(
      "e_final",
      "Vamos registrar um resultado objetivo desta sessão.",
      "Analise as afirmações abaixo e marque a alternativa correta:",
      [
        { id: 1, texto: "A medida de um arco de circunferência é igual à medida do ângulo central correspondente." },
        { id: 2, texto: "A medida de um ângulo inscrito é igual à metade da medida do arco que ele intercepta." },
        { id: 3, texto: "Um software de geometria dinâmica pode ser usado para observar que, ao mover um ponto sobre a circunferência, o ângulo inscrito que vê um mesmo arco mantém a relação de \"metade\" em relação ao arco/ângulo central." },
        { id: 4, texto: "Todas as afirmativas acima estão corretas." }
      ],
      4,
      "Essas afirmativas consolidam a habilidade de relacionar medidas de arcos e ângulos centrais e inscritos na circunferência e de usar ferramentas dinâmicas para explorar essa relação.[web:161][web:163][web:166][web:168]",
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/09f697a265827bbfb3c30f31eb3c119b6e82f96a.jpg"
    )
  ]
}

};