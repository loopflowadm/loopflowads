import { CreativePage, LayoutType } from '../types';

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  mood: string;
  getSlideStyle: (slideIndex: number, totalSlides: number) => { layoutType: LayoutType };
  elements: string[];
}

function makeTemplate(
  coverLayout: LayoutType,
  middleLayouts: LayoutType[],
  closeLayout: LayoutType
) {
  return (slideIndex: number, totalSlides: number): { layoutType: LayoutType } => {
    if (slideIndex === 0)              return { layoutType: coverLayout };
    if (slideIndex === totalSlides - 1) return { layoutType: closeLayout };
    return { layoutType: middleLayouts[(slideIndex - 1) % middleLayouts.length] };
  };
}

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'editorial-chic',
    name: 'Editorial Chic',
    description: 'Design de revista de luxo. Tipografia elegante com respiro.',
    mood: 'Sofisticação e Autoridade',
    elements: ['noise-overlay'],
    getSlideStyle: makeTemplate('editorial', ['floating-card', 'minimal', 'quote'], 'minimal'),
  },
  {
    id: 'data-driven',
    name: 'Data Driven',
    description: 'Focado em números e resultados com dados em destaque.',
    mood: 'Resultados e Prova Social',
    elements: ['noise-overlay'],
    getSlideStyle: makeTemplate('data-story', ['split', 'editorial', 'data-story'], 'minimal'),
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    description: 'Citações gigantes e impacto visual imediato.',
    mood: 'Engajamento e Inspiração',
    elements: ['noise-overlay'],
    getSlideStyle: makeTemplate('quote', ['editorial', 'floating-card', 'split'], 'split'),
  },
  {
    id: 'minimalist-philosophy',
    name: 'Minimalist',
    description: 'Minimalismo moderno. O conteúdo é o único mestre.',
    mood: 'Clareza e Foco',
    elements: ['noise-overlay'],
    getSlideStyle: makeTemplate('minimal', ['floating-card', 'quote', 'editorial'], 'quote'),
  },
  {
    id: 'split-vision',
    name: 'Split Vision',
    description: 'Dualidade e contraste. Ótimo para antes/depois ou métricas.',
    mood: 'Contraste e Dinamismo',
    elements: ['noise-overlay'],
    getSlideStyle: makeTemplate('split', ['data-story', 'editorial', 'floating-card'], 'editorial'),
  },
];

export const DEFAULT_TEMPLATE = layoutTemplates[0];

export interface CopyBlock {
  title: string;
  content: string;
  kicker?: string;
  tag?: string;
  attribution?: string;
  stats?: Array<{ label: string; value: string }>;
  layoutType?: LayoutType;
  imagePrompt?: string;
}

export function applyTemplate(
  blocks: CopyBlock[],
  template: LayoutTemplate = DEFAULT_TEMPLATE,
  accentColorHex: string = '#facc15'
): CreativePage[] {
  const total = blocks.length;
  return blocks.map((block, idx) => {
    const style = template.getSlideStyle(idx, total);
    return {
      id: `slide-${idx + 1}`,
      title: block.title,
      content: block.content,
      kicker: block.kicker || (idx === 0 ? 'Destaque' : `Passo 0${idx}`),
      tag: block.tag,
      attribution: block.attribution,
      stats: block.stats,
      accentColorHex,
      layoutType: block.layoutType || style.layoutType,
      index: `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
      imagePrompt: block.imagePrompt,
    };
  });
}
