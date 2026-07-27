export interface ProjectDNA {
  id: string;
  brandName: string;
  logo: string | null;
  visualStyle: string;
  targetAudience: string;
  toneOfVoice: string;
  keyElements: string[];
  negativePrompt: string;
  colors: string[];
}

export type LayoutType =
  | 'floating-card'
  | 'split'
  | 'quote'
  | 'editorial'
  | 'data-story'
  | 'minimal';

export type AspectRatio = '9/16' | '4/5' | '1/1';

export interface StatItem {
  label: string;
  value: string;
}

export interface CreativePage {
  id: string;
  title: string;
  content?: string;
  kicker?: string;
  attribution?: string;
  stats?: StatItem[];
  accentColorHex: string;
  bgColorHex?: string;
  textColorHex?: string;
  bgClass?: string;
  layoutType: LayoutType;
  index?: string;
  tag?: string;
  handle?: string;
  fgImage?: string;
  bgImage?: string;
  hasImagePlaceholder?: boolean;
  imagePrompt?: string;
  titleFontSize?: number;
  contentFontSize?: number;
  titleFontFamily?: 'sans' | 'serif' | 'mono';
  titleOffsetY?: number;
  titleOffsetX?: number;
  contentOffsetY?: number;
  contentOffsetX?: number;
}

export interface PostResult {
  id: string;
  type: 'single' | 'carousel' | 'video';
  pages: CreativePage[];
  size?: AspectRatio;
  title?: string;
  createdAt?: string;
  prospectId?: string;
}
