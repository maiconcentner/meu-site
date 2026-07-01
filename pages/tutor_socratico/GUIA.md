# Guia — Tutor Socrático (nova arquitetura)

Este guia tem duas partes: **configuração técnica** (uma vez só, feita por quem programa) e **como adicionar conteúdo novo** (pensada para professores que não programam).

---

## Parte 1 — O que mudou

O conteúdo das habilidades (antes um arquivo `sessoes.js` de 3177 linhas de código) agora mora em três abas de uma planilha Google:

| Aba | O que guarda |
|---|---|
| **Habilidades** | Uma linha por habilidade (título, descrição, pré-requisitos) |
| **Nos** | Uma linha por "balão de fala" do tutor (uma etapa da conversa) |
| **Opcoes** | Uma linha por botão de resposta que o aluno pode clicar |

O progresso dos alunos mora em outras duas abas:

| Aba | O que guarda |
|---|---|
| **Progresso** | A nota atual de cada aluno em cada habilidade |
| **Historico** | Um registro de cada sessão concluída (para o gráfico e a lista de histórico) |

Um Google Apps Script serve essas abas como uma pequena API, e o site (HTML/CSS/JS) busca os dados nela. Todo o seu conteúdo pedagógico original (9 habilidades, 318 nós, 548 opções) já foi migrado automaticamente — veja a pasta `migracao/`.

Se o Apps Script não estiver configurado (ou ficar fora do ar), o site continua funcionando normalmente com uma cópia local do mesmo conteúdo (`js/data/content-fallback.json`). Isso é intencional: o app nunca fica "quebrado" por causa da planilha.

---

## Parte 2 — Configuração técnica (uma vez só)

### 2.1 Criar a planilha e o backend

1. Crie uma planilha nova no Google Sheets.
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo padrão de `Code.gs` e cole o conteúdo do arquivo `apps-script/Code.gs` deste pacote.
4. Salve. No seletor de funções (topo do editor), escolha `configurarPlanilha` e clique em ▶ **Executar**.
   - Na primeira vez, o Google vai pedir permissão — autorize (é o script acessando a própria planilha).
   - Isso cria as 5 abas com os cabeçalhos certos.
5. Volte para a planilha. Para cada uma das abas **Habilidades**, **Nos** e **Opcoes**:
   - Selecione a célula A1 da aba.
   - **Arquivo → Importar → Fazer upload** → selecione o CSV correspondente (`migracao/habilidades.csv`, `migracao/nos.csv`, `migracao/opcoes.csv`).
   - Local de importação: **"Substituir dados na aba atual"**.
   - Tipo de separador: vírgula.
6. Confira rapidamente se as 9 habilidades e ~318 nós apareceram nas abas.

### 2.2 Implantar o Apps Script como API

1. No editor do Apps Script: **Implantar → Nova implantação**.
2. Tipo: **App da Web**.
3. Executar como: **Eu** (sua conta).
4. Quem pode acessar: **Qualquer pessoa**.
5. Implantar. Copie a **URL do app da Web** gerada (algo como `https://script.google.com/macros/s/AKfycb.../exec`).

### 2.3 Conectar o front-end

Abra `js/data/api.js` e troque a linha:

```js
export const APPS_SCRIPT_URL = "COLOQUE_AQUI_A_URL_DO_SEU_APPS_SCRIPT";
```

pela URL que você copiou. Salve.

### 2.4 Hospedar o site

O projeto é HTML/CSS/JS puro — **não** dá para simplesmente abrir o `index.html` clicando duas vezes (os módulos JavaScript e o `fetch` do conteúdo precisam de um servidor http/https de verdade, é uma restrição de segurança do navegador). Opções simples e gratuitas:

- **GitHub Pages**: suba a pasta num repositório e ative Pages nas configurações.
- **Netlify** ou **Vercel**: arraste a pasta do projeto no painel deles.

Qualquer uma funciona bem para esse tipo de site estático.

### 2.5 Testando

1. Abra o site publicado.
2. Faça login com um nome de teste.
3. Complete uma habilidade inteira.
4. Volte na planilha: deve aparecer uma linha nova em **Progresso** e outra em **Historico**.
5. Recarregue a página (ou abra em outro navegador/dispositivo com o mesmo nome+turma): o progresso deve reaparecer — é a sincronização funcionando.

Se algo não sincronizar, abra o Console do navegador (F12) — os erros de rede/Apps Script aparecem lá com uma mensagem explicativa.

---

## Parte 3 — Como adicionar uma habilidade nova (sem programar)

Isto é para quem só vai editar a **planilha do Google Sheets**, sem tocar em código.

### 3.1 Cadastrar a habilidade

Na aba **Habilidades**, adicione uma linha:

| Coluna | O que colocar | Exemplo |
|---|---|---|
| `id` | Um código único, sem espaços | `EF.09.MAT.2.97` |
| `titulo` | Nome que aparece para o aluno | `Equações do 2º Grau` |
| `descricao` | Frase curta explicando o tema | `Resolver equações do tipo ax² + bx + c = 0` |
| `prerequisitos` | IDs de habilidades que precisam estar concluídas antes, separados por `;` | `EF.09.MAT.2.92;EF.09.MAT.2.93` (deixe em branco se não houver) |
| `prioridade` | Número — quanto menor, mais cedo aparece na lista | `9` |
| `status_inicial` | `novo` ou `revisar` | `novo` |
| `ordem_sugerida` | Número — posição na ordem de recomendação | `9` |

### 3.2 Escrever a conversa (aba Nos)

Cada linha da aba **Nos** é **um balão de fala do tutor**. Colunas:

- `habilidade_id`: o mesmo `id` que você criou no passo 3.1.
- `no_id`: um identificador único **dentro dessa habilidade** (ex: `e1`, `e2`, `pergunta_inicial`...). Pode ser qualquer texto, desde que não se repita na mesma habilidade.
- `tipo`: um destes três valores exatos:
  - `mensagem` — o tutor só fala e o aluno clica em "Continuar" (não há certo/errado).
  - `escolha` — o tutor pergunta algo e o aluno escolhe entre várias opções.
  - `avaliacao` — a etapa final que vale nota (o "Desafio Final").
- `conta_pontuacao`: `TRUE` ou `FALSE`. Use `FALSE` para perguntas de aquecimento/diagnóstico (não deveriam penalizar o aluno); `TRUE` para perguntas de conteúdo de verdade. Para `mensagem` não importa — deixe `FALSE`.
- `texto`: o que o tutor diz. Pode usar `<br>`, `<strong>texto</strong>`, listas (`<ul><li>...</li></ul>`), e matemática entre `\( \)` (para fórmula na linha) ou `\[ \]` (para fórmula centralizada), ex: `\( (a+b)^2 \)`.
- `imagem_url`: opcional — um link direto para uma imagem (veja recomendação sobre hospedagem de imagens abaixo).
- `enunciado` e `explicacao`: **só preencha se `tipo = avaliacao`** — o enunciado da questão final e a explicação mostrada depois que o aluno responde.

### 3.3 Escrever as opções de resposta (aba Opcoes)

Cada linha é **um botão** que aparece para o aluno. Colunas:

- `habilidade_id` e `no_id_origem`: de qual habilidade e de qual nó (aba Nos) esse botão faz parte.
- `ordem`: `1`, `2`, `3`... (ordem em que os botões aparecem).
- `texto`: o texto do botão.
- `no_id_destino`: para onde o app vai depois que o aluno clica (o `no_id` de outra linha da aba Nos). **Deixe em branco se o nó de origem for do tipo `avaliacao`.**
- `correta`: `TRUE` ou `FALSE` — se essa opção é o caminho "certo" (segue em frente) ou uma resposta que precisa de recuperação. Este é o campo mais importante: é ele (e não mais o nome do `no_id_destino`) que decide se o aluno acertou ou errou.
  - Para nós do tipo `mensagem` (só um botão "Continuar"), deixe em branco.
  - Para nós do tipo `avaliacao`, marque `TRUE` na única opção que é a resposta correta da questão, e `FALSE` nas outras.
- `feedback`: a frase curta que aparece logo depois do clique (não é usada em `avaliacao`, que usa o campo `explicacao` da aba Nos).

### 3.4 Regra de ouro para não quebrar nada

Todo `no_id_destino` precisa existir como `no_id` na aba Nos, **para a mesma habilidade**. Se você digitar um destino errado (com erro de digitação, por exemplo), o aluno vai travar naquele ponto da conversa. Antes de publicar, é bom conferir se todos os destinos batem — se você tiver alguém que programe por perto, ele pode rodar `migracao/migrate.mjs` como conferência (esse script original detecta automaticamente links quebrados).

### 3.5 As mudanças aparecem na hora?

O app guarda uma cópia do conteúdo por até 12 horas para carregar mais rápido. Para forçar a atualização imediata depois de editar a planilha, o aluno pode limpar os dados do site no navegador, ou você pode simplesmente esperar — em 12h no máximo a nova versão aparece sozinha.

---

## Parte 4 — Sobre as imagens

As imagens usadas no conteúdo original vinham de um cache de busca do Perplexity (`pplx-res.cloudinary.com`) — um link que não é seu e pode parar de funcionar sem aviso. Recomendo migrar para uma das opções abaixo antes de depender delas em produção:

- **GitHub**: suba as imagens numa pasta `imagens/` do mesmo repositório do site e use o link direto (`.../imagens/nome.png`). É a opção mais estável e sem pegadinhas de permissão.
- **Google Drive**: funciona, mas exige transformar o link de compartilhamento no formato de "link direto" (`https://drive.google.com/uc?id=SEU_ID`), e ocasionalmente o Google bloqueia hotlinking em alto volume de acesso.

---

## Parte 5 — O que foi corrigido nesta reestruturação (changelog)

- **Modo escuro**: `stat-card`, `chart-container`, `history-table`, `achievement` e o card de "sessão em andamento" tinham fundo branco fixo — apareciam estourando no meio do tema escuro. Agora usam a variável de tema.
- **Barra de progresso da tela de estudo**: existia no HTML/JS mas não tinha nenhuma regra CSS — era invisível. Adicionada.
- **Balão do "Desafio Final"**: tinha uma cor de fundo fixa (`#e0f2fe`) que ficava ilegível no modo escuro. Agora usa uma classe que respeita o tema.
- **Detecção de acerto/erro**: antes era adivinhada pelo nome do nó de destino (se continha "corrige", "recupera" ou "errado"). Agora é um campo explícito (`correta`) na planilha — mais confiável e editável por quem não programa.
- **Bug de `chatBox` indefinido**: em `handleAvaliacaoResposta`, a rolagem automática do chat para o final tentava usar uma variável que nunca tinha sido criada, o que gerava um erro silencioso no console toda vez que o aluno respondia o Desafio Final. Corrigido.
- **Tag `<body>` ausente** no `index.html` (HTML tecnicamente inválido, embora os navegadores tolerassem). Adicionada.
- **Progresso**: antes só existia no `localStorage` (um navegador, um dispositivo). Agora sincroniza com a planilha, com o local sempre como cópia de segurança caso a internet caia no meio de uma sessão.

## Parte 6 — Limitações conhecidas (decisões conscientes, não bugs)

- O "streak" (sequência de sessões) continua sendo só local — não é sincronizado entre dispositivos. Ele também não é tecnicamente uma sequência "consecutiva" no sentido estrito (nunca reseta), isso já vinha do projeto original e não foi alterado.
- O Apps Script tem um pequeno atraso de "cold start" (1-3 segundos) na primeira chamada depois de um tempo sem uso — normal em apps desse porte, imperceptível no uso contínuo de uma turma.
- Para uma turma muito grande usando ao mesmo tempo, o Apps Script tem limites de quota do Google (chamadas por dia/minuto). Para o tamanho de uma escola isso não costuma ser problema; se crescer muito, o próximo passo natural seria um banco de dados de verdade.
