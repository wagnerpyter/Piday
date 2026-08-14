/**
 * Mago Zero — núcleo mínimo, determinístico e isolável.
 *
 * Modelo 1: classifica um telegrama técnico.
 * Modelo 2: organiza a sequência das classificações.
 *
 * O núcleo não lê backups automaticamente e não tenta inferir identidade,
 * consciência ou autoria. A classificação continua provisória até revisão.
 */

const NOTAS_ADA = Object.freeze({
  A: "Crítico",
  B: "Erro",
  C: "Aviso",
  D: "Informação",
  E: "Depuração",
  F: "Requisição",
  G: "Sucesso",
});

const clean = (value) => String(value ?? "").trim().toLowerCase();

function classifyTelegram(telegram) {
  const observed = clean(telegram.observed_state);
  const text = clean(telegram.telegram_log);
  const mentionedRisk = telegram.mentioned_risk === true || clean(telegram.mentioned_risk) === "sim";
  const historicalReference = telegram.historical_reference === true || clean(telegram.historical_reference) === "sim";
  const mitigation = telegram.mitigation_or_success === true || clean(telegram.mitigation_or_success) === "sim";

  // Campos estruturados têm prioridade sobre palavras isoladas.
  if (/falha efetiva|erro efetivo|failure observed|tool failed/.test(observed)) {
    return result("B", "estado observado indica falha efetiva", telegram);
  }
  if (/ameaça crítica|ruptura crítica|critical/.test(observed)) {
    return result("A", "estado observado indica prioridade crítica", telegram);
  }
  if (mentionedRisk && !mitigation) {
    return result("C", historicalReference ? "risco mencionado com referência histórica separada" : "risco ou limite descrito sem falha confirmada", telegram);
  }
  if (mitigation) {
    return result("G", "mitigação ou sucesso explicitamente registrado", telegram);
  }
  if (/teste|depuração|implementação|investigação/.test(observed)) {
    return result("E", "atividade técnica de teste ou investigação", telegram);
  }
  if (/solicitação|requisição|comando/.test(observed)) {
    return result("F", "solicitação operacional registrada", telegram);
  }
  if (text.length > 0) {
    return result("D", "telegrama sem ruptura estruturada identificada", telegram);
  }
  return result("D", "telegrama sem conteúdo classificável", telegram);
}

function result(letter, basis, telegram) {
  return {
    ...telegram,
    ada_letter: letter,
    ada_category: NOTAS_ADA[letter],
    classification_basis: basis,
    classification_status: telegram.classification_status || "provisional",
    confidence: telegram.confidence ?? null,
  };
}

function buildSequence(telegrams) {
  const classified = telegrams.map(classifyTelegram);
  return {
    sequence: classified.map((item) => item.ada_letter),
    labels: classified.map((item) => item.ada_category),
    counts: classified.reduce((acc, item) => {
      acc[item.ada_letter] = (acc[item.ada_letter] || 0) + 1;
      return acc;
    }, {}),
    telegrams: classified,
  };
}

const MagoZero = Object.freeze({
  version: "0.1-skeleton",
  taxonomy: NOTAS_ADA,
  classifyTelegram,
  buildSequence,
});

if (typeof globalThis !== "undefined") {
  globalThis.MagoZero = MagoZero;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MagoZero;
}
