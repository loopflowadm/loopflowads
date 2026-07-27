export function parseAIJson<T>(content: string): T {
  if (!content || typeof content !== 'string') {
    throw new Error('Resposta vazia recebida da IA. Tente novamente.');
  }

  let clean = content
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  if (!clean.startsWith('{') && !clean.startsWith('[')) {
    const match = clean.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      clean = match[0];
    } else {
      throw new Error('A IA não retornou um JSON válido. Tente novamente.');
    }
  }

  try {
    return JSON.parse(clean) as T;
  } catch {
    const fixed = clean
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/'/g, '"');

    try {
      return JSON.parse(fixed) as T;
    } catch {
      console.error('[parseAIJson] Conteúdo recebido:', content);
      throw new Error('Não foi possível interpretar a resposta da IA. Tente novamente.');
    }
  }
}

export function validateAIStructure<T>(data: unknown, requiredKeys: (keyof T)[]): data is T {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  return requiredKeys.every(key => key in (data as object));
}

export function normalizeArrayField(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean);
  return [];
}
