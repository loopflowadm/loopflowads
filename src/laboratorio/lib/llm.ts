import { settingsStore } from './settingsStore';

export interface GenerateAIRequest {
  prompt: string;
  systemInstruction?: string;
  imageBase64?: string;
  temperature?: number;
}

export const MODELS = {
  gemini: 'gemini-2.5-flash',
  openai: 'gpt-4o',
  anthropic: 'claude-3-5-sonnet-20241022',
} as const;

async function withRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 1200): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const isRetryable =
        String(err?.message).includes('429') ||
        String(err?.message).includes('503') ||
        String(err?.message).includes('overloaded') ||
        String(err?.message).includes('rate limit');

      if (!isRetryable || attempt === retries) break;
      await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
    }
  }
  throw lastError;
}

function extractJSON(raw: string): string {
  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  if (cleaned.startsWith('{') || cleaned.startsWith('[')) return cleaned;
  const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (match) return match[0];
  return cleaned;
}

function getFriendlyError(err: any, provider: string): string {
  const msg = String(err?.message || err);
  if (msg.includes('401') || msg.includes('API key') || msg.includes('api_key'))
    return `Chave de API inválida para ${provider}. Verifique as configurações.`;
  if (msg.includes('429') || msg.includes('rate limit') || msg.includes('quota'))
    return `Limite de requisições atingido (${provider}). Aguarde alguns segundos.`;
  if (msg.includes('503') || msg.includes('overloaded'))
    return `Serviço ${provider} sobrecarregado. Tente novamente em instantes.`;
  if (msg.includes('network') || msg.includes('fetch'))
    return 'Erro de conexão. Verifique sua internet.';
  return `Erro ao gerar conteúdo (${provider}): ${msg}`;
}

async function callGemini({ prompt, systemInstruction, imageBase64, temperature = 0.7 }: GenerateAIRequest): Promise<string> {
  const { geminiKey } = settingsStore.get();
  if (!geminiKey) throw new Error('Chave Gemini não configurada.');

  const cleanKey = geminiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.gemini}:generateContent?key=${cleanKey}`;

  const parts: any[] = [];
  if (systemInstruction) {
    parts.push({ text: `System: ${systemInstruction}\n\n` });
  }
  parts.push({ text: `User: ${prompt}` });

  if (imageBase64) {
    const base64Data = imageBase64.split(',')[1];
    const mimeType = imageBase64.match(/^data:(.*?);/)?.[1] ?? 'image/jpeg';
    parts.push({ inlineData: { data: base64Data, mimeType } });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { temperature }
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('O modelo Gemini não retornou nenhum texto.');

  return extractJSON(rawText);
}

export async function generateAIContent(req: GenerateAIRequest): Promise<string> {
  const provider = settingsStore.get().activeProvider;
  try {
    return await withRetry(() => callGemini(req));
  } catch (err: any) {
    throw new Error(getFriendlyError(err, provider));
  }
}
