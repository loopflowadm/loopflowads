import { useState } from 'react';
import { toast } from 'sonner';
import { generateAIContent } from '../lib/llm';
import type { CreativePage } from '../types';
import { applyTemplate, DEFAULT_TEMPLATE } from '../lib/templates';
import { parseAIJson } from '../lib/ai-parser';
import { ProspectData } from '../../prospect/types';

export type ToneOfVoice = 'profissional' | 'provocativo' | 'educacional' | 'humoristico' | 'inspiracional';
export type CopyStyle = 'direto' | 'storytelling' | 'listicle' | 'passo-a-passo' | 'problema-solucao';
export type ContentNiche = 'geral' | 'infoprodutos' | 'saas' | 'ecommerce' | 'personal-branding' | 'fitness' | 'educacao';

export interface ContentAnalysis {
  origem: string;
  temaCentral: string;
  transformacao: string;
  friccaoCentral: string;
  anguloDominante: string;
  evidencias: string[];
  vocabulario: string[];
}

export interface AngleSkeleton {
  headline: string;
  hook: string;
  mecanismo: string;
  prova: string;
  aplicacao: string;
  direcao: string;
}

export interface CopyAngle {
  headline: string;
  reasoning: string;
}

export interface CopyBlock {
  title: string;
  content: string;
  kicker?: string;
  tag?: string;
  attribution?: string;
  stats?: Array<{ label: string; value: string }>;
  layoutType?: any;
  imagePrompt?: string;
}

export type WizardStep = 'intent' | 'analysis' | 'angles' | 'skeleton' | 'refine' | 'blocks';

export const TONE_OPTIONS: { value: ToneOfVoice; label: string; desc: string }[] = [
  { value: 'profissional',  label: 'Profissional',  desc: 'Sério, confiável, corporativo' },
  { value: 'provocativo',   label: 'Provocativo',   desc: 'Desafia, questiona, polariza' },
  { value: 'educacional',   label: 'Educacional',   desc: 'Ensina, explica, simplifica' },
  { value: 'humoristico',   label: 'Humorístico',   desc: 'Leve, memes, ironia inteligente' },
  { value: 'inspiracional', label: 'Inspiracional', desc: 'Motiva, eleva, emociona' },
];

export const STYLE_OPTIONS: { value: CopyStyle; label: string; desc: string }[] = [
  { value: 'direto',            label: 'Direto ao Ponto',   desc: 'Frases curtas, sem enrolação' },
  { value: 'storytelling',      label: 'Storytelling',      desc: 'Narrativa envolvente' },
  { value: 'listicle',          label: 'Lista / Dicas',     desc: '"5 dicas...", "3 erros..."' },
  { value: 'passo-a-passo',     label: 'Passo a Passo',     desc: 'Tutorial sequencial' },
  { value: 'problema-solucao',  label: 'Problema → Solução', desc: 'Dor → Agitação → Solução' },
];

export function useCreativeWizard(prospect?: ProspectData) {
  const companyName = prospect?.name || prospect?.companyName || 'Empresa';
  const segment = prospect?.segment || 'Geral';

  // Wizard Navigation
  const [wizardStep, setWizardStep] = useState<WizardStep>('intent');
  const [intent, setIntent] = useState<'transform' | 'create'>('create');
  const [prompt, setPrompt] = useState(`Como acelerar as vendas da ${companyName} no setor de ${segment}`);

  // Settings
  const [format, setFormat] = useState<'single' | 'carousel' | 'video'>('carousel');
  const [size, setSize] = useState<'1/1' | '4/5' | '9/16'>('4/5');
  const [slideCount, setSlideCount] = useState(5);
  const [inspirationImage, setInspirationImage] = useState<string | null>(null);

  // Creative Options
  const [toneOfVoice, setToneOfVoice] = useState<ToneOfVoice>('profissional');
  const [copyStyle, setCopyStyle] = useState<CopyStyle>('direto');
  const [niche, setNiche] = useState<ContentNiche>('geral');

  // Step Data
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [generatedAngles, setGeneratedAngles] = useState<CopyAngle[]>([]);
  const [selectedAngle, setInternalSelectedAngle] = useState<CopyAngle | null>(null);
  const [skeleton, setSkeleton] = useState<AngleSkeleton | null>(null);
  const [generatedBlocks, setGeneratedBlocks] = useState<CopyBlock[]>([]);
  const [pages, setPages] = useState<CreativePage[]>([]);

  // State helpers
  const [isGenerating, setIsGenerating] = useState(false);

  const completedSteps = {
    intent: true,
    analysis: analysis !== null,
    angles: generatedAngles.length > 0,
    skeleton: skeleton !== null,
    refine: skeleton !== null,
    blocks: generatedBlocks.length > 0,
  };

  const getDNAContext = () => {
    return `LEAD CONTEXT:
    Empresa: ${companyName}
    Segmento: ${segment}
    Dor Principal: ${prospect?.mainPainPoint || 'Escalar vendas e captação de clientes'}
    Formato: ${format === 'video' ? 'Vídeo/Reels (9/16)' : format === 'carousel' ? 'Carrossel (4/5)' : 'Post Único'}
    Tom de Voz: ${toneOfVoice}
    Estilo de Copy: ${copyStyle}`;
  };

  const goToStep = (step: WizardStep) => {
    setWizardStep(step);
  };

  const handleExtractAnalysis = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Fazendo Raio-X com IA...');
    try {
      const formatType = format === 'video' ? 'Vídeo (Reels)' : format === 'single' ? 'Post Único' : 'Carrossel';
      const sysInstruction = `Você é um Estrategista de Conteúdo Sênior. Faça um Raio-X para gerar um ${formatType}.
      ${getDNAContext()}

      Responda APENAS JSON válido com este formato:
      {
        "origem": "assunto principal",
        "temaCentral": "resumo de uma linha",
        "transformacao": "de ponto A para ponto B",
        "friccaoCentral": "a dor principal do público",
        "anguloDominante": "a perspectiva única",
        "evidencias": ["evidencia 1", "evidencia 2"],
        "vocabulario": ["termo 1", "termo 2", "termo 3"]
      }`;

      const result = await generateAIContent({
        systemInstruction: sysInstruction,
        prompt: prompt || `Analise como promover ${companyName} em ${segment}`,
        imageBase64: inspirationImage ?? undefined,
      });

      const parsed = parseAIJson<ContentAnalysis>(result);
      setAnalysis(parsed);
      setWizardStep('analysis');
      toast.success('Raio-X concluído com sucesso!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Erro na análise com IA.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAngles = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Gerando ângulos de copy...');
    try {
      const res = await generateAIContent({
        systemInstruction: `Gere 3 ângulos criativos distintos para: ${JSON.stringify(analysis)}.
        ${getDNAContext()}
        - Ângulo 1: mais seguro e direto
        - Ângulo 2: mais ousado e de autoridade
        - Ângulo 3: provocativo ou contra-intuitivo
        JSON: [{ "headline": "...", "reasoning": "..." }]`,
        prompt: 'Gere os 3 melhores ângulos estratégicos.',
      });
      const angles = parseAIJson<CopyAngle[]>(res);
      setGeneratedAngles(angles);
      setWizardStep('angles');
      toast.success(`${angles.length} ângulos gerados!`, { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Falha ao gerar ângulos.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSkeleton = async (angle: CopyAngle) => {
    setIsGenerating(true);
    setInternalSelectedAngle(angle);
    const toastId = toast.loading('Construindo esqueleto narrativo...');
    try {
      const res = await generateAIContent({
        systemInstruction: `Crie a estrutura narrativa para: "${angle.headline}".
        ${getDNAContext()}
        JSON:
        {
          "headline": "título principal",
          "hook": "gancho de retenção de 2 linhas",
          "mecanismo": "método ou solução chave",
          "prova": "dados ou autoridade",
          "aplicacao": "passos práticos",
          "direcao": "direção visual"
        }`,
        prompt: 'Crie o esqueleto narrativo.',
      });
      const parsed = parseAIJson<AngleSkeleton>(res);
      setSkeleton(parsed);
      setWizardStep('skeleton');
      toast.success('Estrutura narrativa gerada!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Falha ao gerar esqueleto.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBlocks = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Escrevendo blocos de conteúdo...');
    try {
      const res = await generateAIContent({
        systemInstruction: `Gere ${slideCount} blocos de conteúdo para carrossel/post de ${companyName} em ${segment}.
        Baseado em: ${JSON.stringify(skeleton)}
        JSON array:
        [
          {
            "title": "título curto de alto impacto",
            "content": "conteúdo claro de 2-3 linhas",
            "kicker": "rótulo curto",
            "tag": "call to action",
            "layoutType": "floating-card"
          }
        ]`,
        prompt: 'Escreva a copy em português de alto engajamento.',
      });
      const blocks = parseAIJson<CopyBlock[]>(res);
      setGeneratedBlocks(blocks);
      const generatedPages = applyTemplate(blocks, DEFAULT_TEMPLATE, '#facc15');
      setPages(generatedPages);
      setWizardStep('blocks');
      toast.success('Design e mídias geradas!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Falha ao gerar blocos.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    wizardStep,
    goToStep,
    intent,
    setIntent,
    prompt,
    setPrompt,
    format,
    setFormat,
    size,
    setSize,
    slideCount,
    setSlideCount,
    inspirationImage,
    setInspirationImage,
    toneOfVoice,
    setToneOfVoice,
    copyStyle,
    setCopyStyle,
    niche,
    setNiche,
    analysis,
    generatedAngles,
    selectedAngle,
    skeleton,
    generatedBlocks,
    pages,
    setPages,
    isGenerating,
    completedSteps,
    handleExtractAnalysis,
    handleGenerateAngles,
    handleGenerateSkeleton,
    handleGenerateBlocks,
  };
}
