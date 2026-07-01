// ContentStore: fonte única de verdade para HABILIDADES e SESSOES no front-end.
//
// Estratégia de carregamento (stale-while-revalidate):
//   1. Mostra imediatamente o que estiver em cache local (se ainda for válido).
//   2. Em paralelo, tenta buscar a versão mais recente no Apps Script.
//   3. Se não houver cache nem Apps Script disponível (primeiro uso, offline,
//      ou o professor ainda não implantou o backend), usa o pacote local
//      "content-fallback.json", gerado a partir do conteúdo original do projeto.
//
// Isso garante que o app SEMPRE funciona, mesmo sem o Apps Script configurado.
import { Api } from "./api.js";

const CACHE_KEY = "socraticContentCacheV1";
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas
const FALLBACK_URL = new URL("./content-fallback.json", import.meta.url);

export const ContentStore = {
  habilidades: {},
  ordemSugerida: [],
  sessoes: {},
  fonte: "nenhuma", // 'apps-script' | 'cache' | 'fallback'
  carregado: false,
  erroApi: null,

  async carregar() {
    const cache = this._lerCache();
    if (cache) {
      this._aplicar(cache, "cache");
    }

    try {
      const dados = await Api.buscarConteudo();
      if (dados && dados.sessoes && Object.keys(dados.sessoes).length > 0) {
        this._aplicar(dados, "apps-script");
        this._salvarCache(dados);
        return;
      }
    } catch (err) {
      this.erroApi = err.message;
      console.warn("Conteúdo do Apps Script indisponível, usando alternativa local:", err.message);
    }

    if (!this.carregado) {
      const resp = await fetch(FALLBACK_URL);
      const dados = await resp.json();
      this._aplicar(dados, "fallback");
    }
  },

  _aplicar(dados, fonte) {
    this.habilidades = dados.habilidades;
    this.ordemSugerida = dados.ordemSugerida;
    this.sessoes = dados.sessoes;
    this.fonte = fonte;
    this.carregado = true;
  },

  _lerCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
      return parsed.dados;
    } catch {
      return null;
    }
  },

  _salvarCache(dados) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), dados }));
    } catch {
      // localStorage cheio/indisponível: não é crítico, apenas perde o cache rápido.
    }
  }
};
