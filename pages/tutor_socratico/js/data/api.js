// Cliente HTTP para o backend em Google Apps Script.
//
// >>> DEPOIS DE IMPLANTAR SEU APPS SCRIPT, COLE A URL AQUI EMBAIXO <<<
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6kro9waiZHseZkTC0q_7yh91MrHR_zDE2zQhnF6esZIaA7yIdzF3SmuZpm7gEH0SfWQ/exec";

const TIMEOUT_MS = 8000;

function comTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Tempo esgotado ao contactar o servidor.")), ms))
  ]);
}

function configurado() {
  return typeof APPS_SCRIPT_URL === "string" && APPS_SCRIPT_URL.startsWith("http");
}

export const Api = {
  disponivel() {
    return configurado();
  },

  async buscarConteudo() {
    if (!configurado()) throw new Error("Apps Script não configurado.");
    const resp = await comTimeout(fetch(`${APPS_SCRIPT_URL}?action=conteudo`), TIMEOUT_MS);
    if (!resp.ok) throw new Error("Falha ao buscar conteúdo: " + resp.status);
    const dados = await resp.json();
    if (dados.erro) throw new Error(dados.erro);
    return dados;
  },

  async buscarProgresso(aluno, turma) {
    if (!configurado()) throw new Error("Apps Script não configurado.");
    const url = `${APPS_SCRIPT_URL}?action=progresso&aluno=${encodeURIComponent(aluno)}&turma=${encodeURIComponent(turma)}`;
    const resp = await comTimeout(fetch(url), TIMEOUT_MS);
    if (!resp.ok) throw new Error("Falha ao buscar progresso: " + resp.status);
    const dados = await resp.json();
    if (dados.erro) throw new Error(dados.erro);
    return dados;
  },

  // "Fire-and-forget" tolerante a falhas: se não conseguir sincronizar agora,
  // o progresso continua salvo localmente e tenta de novo na próxima sessão.
  async salvarProgresso(payload) {
    if (!configurado()) return { ok: false, motivo: "não configurado" };
    try {
      const resp = await comTimeout(fetch(APPS_SCRIPT_URL, {
        method: "POST",
        // Content-Type text/plain de propósito: evita o preflight CORS (OPTIONS)
        // que o Apps Script não sabe responder. O corpo continua sendo JSON.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "salvarProgresso", ...payload })
      }), TIMEOUT_MS);
      const dados = await resp.json();
      return dados.ok ? { ok: true } : { ok: false, motivo: dados.erro || "desconhecido" };
    } catch (err) {
      console.warn("Não foi possível sincronizar o progresso agora (ficou salvo localmente):", err.message);
      return { ok: false, motivo: err.message };
    }
  }
};
