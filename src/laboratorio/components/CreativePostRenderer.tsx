import React from 'react';
import { useSafeRemotion, getSpringEntrance } from './remotion/design-tokens';
import { CreativePage, AspectRatio, LayoutType } from '../types';

interface FormatConfig {
  paddingX: number; safeTop: number; safeBottom: number;
  titleBase: number; contentBase: number;
}

const FORMAT_CONFIGS: Record<AspectRatio, FormatConfig> = {
  '9/16': { paddingX: 8, safeTop: 140, safeBottom: 160, titleBase: 13, contentBase: 4.2 },
  '4/5':  { paddingX: 7, safeTop: 80,  safeBottom: 100, titleBase: 11, contentBase: 3.9 },
  '1/1':  { paddingX: 6, safeTop: 56,  safeBottom: 56,  titleBase: 10, contentBase: 3.6 },
};

const F = {
  sans:  "'Inter', sans-serif",
  serif: "'Georgia', serif",
  mono:  "'Courier New', monospace",
} as const;

const NOISE_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

function getScaledFontSizeValue(text = '', base: number, manualSize?: number): number {
  if (manualSize) return manualSize;
  const len = text.length;
  if (len > 70) return base * 0.55;
  if (len > 55) return base * 0.65;
  if (len > 40) return base * 0.78;
  if (len > 28) return base * 0.88;
  return base;
}

const StaggeredElement: React.FC<{
  index: number; children: React.ReactNode; className?: string;
  style?: React.CSSProperties; type?: 'fade' | 'slide' | 'scale'; isStatic?: boolean;
}> = ({ index, children, className, style, type = 'scale', isStatic = false }) => {
  const { frame, fps } = useSafeRemotion();
  const spr = getSpringEntrance(isStatic ? 100 : frame, fps, index * 8);
  const mergedStyle: React.CSSProperties = {
    ...style, opacity: spr,
    transform: type === 'scale' ? `scale(${0.92 + 0.08 * spr})`
      : type === 'slide' ? `translateY(${15 * (1 - spr)}px)` : style?.transform,
  };
  return <div className={className} style={mergedStyle}>{children}</div>;
};

function NoiseLayer() {
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: NOISE_URI, zIndex: 20, mixBlendMode: 'soft-light' }} />;
}

function AtmosphericBlob({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', zIndex: 1, ...style }} />;
}

function BgImage({ src, overlay = 0.65 }: { src?: string; overlay?: number }) {
  if (!src) return null;
  return (
    <>
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0, filter: 'saturate(1.1) contrast(1.05)',
        }}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(180deg, rgba(0,0,0,${overlay * 0.5}) 0%, rgba(0,0,0,${overlay}) 100%)`,
      }} />
    </>
  );
}

function VerticalLabel({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute', fontFamily: F.mono, fontWeight: 600, fontSize: '2.4cqw',
      letterSpacing: '0.4em', color: 'rgba(255,255,255,0.15)',
      textTransform: 'uppercase', writingMode: 'vertical-rl', zIndex: 10, ...style,
    }}>{text}</div>
  );
}

function BrandFooter({ page, isDark = true }: { page: CreativePage; isDark?: boolean }) {
  const handleColor = isDark ? 'rgba(255,255,255,0.4)' : '#666';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, paddingTop: '6cqw', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3cqw' }}>
        <div style={{ width: '2cqw', height: '2cqw', borderRadius: '50%', background: isDark ? page.accentColorHex : '#000', flexShrink: 0 }} />
        <span style={{ fontFamily: F.mono, fontSize: '2.4cqw', fontWeight: 500, letterSpacing: '0.05em', color: handleColor }}>
          {page.handle ?? '@suamarca'}
        </span>
      </div>
      <span style={{ fontFamily: F.mono, fontSize: '2.4cqw', letterSpacing: '0.1em', fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.2)' : '#999' }}>
        {page.index ?? 'PAGE 01'}
      </span>
    </div>
  );
}

const LayoutFloatingCard = ({ page, cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const titleFs = `${getScaledFontSizeValue(page.title, cfg.titleBase, page.titleFontSize)}cqw`;
  const contentFs = `${getScaledFontSizeValue(page.content || '', cfg.contentBase, page.contentFontSize)}cqw`;
  const ff = page.titleFontFamily ? F[page.titleFontFamily] : F.sans;
  const hasImage = !!page.fgImage;

  return (
    <div style={{ background: hasImage ? '#000' : '#060608', width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '8cqw' }}>
      <BgImage src={page.fgImage} overlay={0.7} />
      <NoiseLayer />
      {!hasImage && (
        <>
          <AtmosphericBlob style={{ width: '120cqw', height: '100cqw', background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`, top: '-20cqw', right: '-30cqw' }} />
          <AtmosphericBlob style={{ width: '80cqw', height: '80cqw', background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)', bottom: '20cqw', left: '-20cqw' }} />
        </>
      )}
      <VerticalLabel text={page.kicker?.toUpperCase() || 'INSIGHT'} style={{ right: '6cqw', top: '12cqw', color: 'rgba(255,255,255,0.1)' }} />
      <StaggeredElement index={1} isStatic={isStatic} style={{ position: 'relative', zIndex: 10, background: 'rgba(8,8,12,0.55)', border: '1px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.15)', borderRadius: '10cqw', padding: '10cqw 8cqw', backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
        {page.kicker && (
          <p style={{ fontFamily: F.mono, fontSize: '2.8cqw', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: accent, marginBottom: '5cqw' }}>{page.kicker}</p>
        )}
        <h2
          className={activeElement === 'title' ? 'active-focus' : ''}
          style={{
            fontFamily: ff,
            fontSize: titleFs,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            marginBottom: '6cqw',
            transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
            padding: '2cqw',
          }}
        >
          {page.title.split(' ').map((w, i) =>
            i === 1 ? <em key={i} style={{ color: accent, textTransform: 'none', fontSize: '1.15em' }}>{w} </em> : w + ' '
          )}
        </h2>
        {page.content && (
          <p
            className={activeElement === 'content' ? 'active-focus' : ''}
            style={{
              fontFamily: F.sans,
              fontSize: contentFs,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
              fontWeight: 400,
              marginBottom: '10cqw',
              transform: `translate(${page.contentOffsetX || 0}cqw, ${page.contentOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >{page.content}</p>
        )}
        {page.tag && (
          <div style={{ background: accent, color: '#000', padding: '3cqw 7cqw', borderRadius: '100px', fontSize: '2.8cqw', textTransform: 'uppercase', fontWeight: 800, display: 'inline-block', letterSpacing: '0.05em', boxShadow: `0 10px 30px ${accent}4d` }}>{page.tag}</div>
        )}
      </StaggeredElement>
    </div>
  );
};

const LayoutSplit = ({ page, cfg: _cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const ghostNum = page.index?.match(/\d+/)?.[0] || '01';
  const titleFs = `${getScaledFontSizeValue(page.title, 11, page.titleFontSize)}cqw`;
  const ff = page.titleFontFamily ? F[page.titleFontFamily] : F.sans;

  const hasImage = !!page.fgImage;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <NoiseLayer />
      <div style={{ flex: 1.1, background: hasImage ? '#000' : '#0a0a0c', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10cqw' }}>
        <BgImage src={page.fgImage} overlay={0.6} />
        {!hasImage && <AtmosphericBlob style={{ width: '100cqw', height: '100cqw', background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, top: '-40cqw', right: '-40cqw' }} />}
        <div style={{ position: 'absolute', right: '-5cqw', bottom: '-8cqw', fontWeight: 800, fontSize: '60cqw', color: '#fff', opacity: 0.03, lineHeight: 0.8, letterSpacing: '-0.05em', pointerEvents: 'none', fontFamily: F.sans, zIndex: 2 }}>{ghostNum}</div>
        <StaggeredElement index={1} isStatic={isStatic} style={{ position: 'relative', zIndex: 10 }}>
          <p style={{ fontFamily: F.mono, fontSize: '2.8cqw', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: accent, marginBottom: '4cqw' }}>{page.kicker || 'INSIGHT'}</p>
          <h2
            className={activeElement === 'title' ? 'active-focus' : ''}
            style={{
              fontFamily: ff,
              fontSize: titleFs,
              color: '#fff',
              lineHeight: 1,
              fontWeight: 800,
              transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >
            {page.title.split(' ').map((w, i) =>
              i === 3 ? <span key={i} style={{ color: accent, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase' }}>{w} </span> : w + ' '
            )}
          </h2>
        </StaggeredElement>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: '10cqw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <StaggeredElement index={2} isStatic={isStatic}>
          {page.stats && page.stats.length > 0 ? (
            <div>
              {page.stats.slice(0, 3).map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3.5cqw 0', borderBottom: '1px solid rgba(13,13,20,0.1)' }}>
                  <span style={{ fontFamily: F.sans, fontSize: '3cqw', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(13,13,20,0.42)', fontWeight: 700 }}>{s.label}</span>
                  <span style={{ fontFamily: F.sans, fontSize: '8cqw', fontWeight: 800, color: '#0D0D14', lineHeight: 1 }}>{s.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={activeElement === 'content' ? 'active-focus' : ''}
              style={{
                fontFamily: F.sans,
                fontSize: `${getScaledFontSizeValue(page.content || '', 4.8, page.contentFontSize)}cqw`,
                color: '#111',
                lineHeight: 1.7,
                fontWeight: 400,
                transform: `translate(${page.contentOffsetX || 0}cqw, ${page.contentOffsetY || 0}cqw)`,
                padding: '2cqw',
              }}
            >{page.content}</p>
          )}
        </StaggeredElement>
        <StaggeredElement index={3} isStatic={isStatic}><BrandFooter page={page} isDark={false} /></StaggeredElement>
      </div>
    </div>
  );
};

const LayoutQuote = ({ page, cfg: _cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const [author, role] = (page.attribution || '').split('·').map(s => s.trim());
  const hasImage = !!page.fgImage;

  return (
    <div style={{ background: hasImage ? '#000' : '#050508', width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12cqw 10cqw' }}>
      <BgImage src={page.fgImage} overlay={0.8} />
      <NoiseLayer />
      {!hasImage && <AtmosphericBlob style={{ width: '140cqw', height: '100cqw', background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)', top: '-30cqw', left: '-40cqw' }} />}

      <StaggeredElement index={0} isStatic={isStatic} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '2cqw 5cqw', fontFamily: F.mono, fontSize: '2.2cqw', color: '#fff', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.15em' }}>{page.kicker || 'LIDERANÇA'}</div>
        <span style={{ fontFamily: F.mono, fontSize: '2.4cqw', color: 'rgba(255,255,255,0.2)' }}>{page.index || '01 / 01'}</span>
      </StaggeredElement>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <StaggeredElement index={1} isStatic={isStatic}>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: '36cqw', color: accent, opacity: 0.3, lineHeight: 0, marginBottom: '6cqw', marginLeft: '-5cqw' }}>"</div>
          <p
            className={activeElement === 'title' ? 'active-focus' : ''}
            style={{
              fontFamily: page.titleFontFamily ? F[page.titleFontFamily] : F.serif,
              fontStyle: 'italic',
              fontSize: `${getScaledFontSizeValue(page.title, 11, page.titleFontSize)}cqw`,
              color: '#fdfdfd',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >{page.title}</p>
        </StaggeredElement>
      </div>

      <StaggeredElement index={2} isStatic={isStatic} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8cqw', display: 'flex', alignItems: 'center', gap: '5cqw', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '14cqw', height: '14cqw', borderRadius: '50%', background: `linear-gradient(135deg, ${accent}40, #000)`, border: '1px solid rgba(255,255,255,0.15)' }} />
        <div>
          <p style={{ fontFamily: F.sans, fontSize: '4cqw', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{author || 'Autor'}</p>
          <p style={{ fontFamily: F.mono, fontSize: '2.2cqw', color: 'rgba(255,255,255,0.4)', marginTop: '1cqw', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{role || page.handle || '@suamarca'}</p>
        </div>
      </StaggeredElement>
    </div>
  );
};

const LayoutEditorial = ({ page, cfg: _cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const hasImage = !!page.fgImage;

  return (
    <div style={{ background: hasImage ? '#000' : '#000', width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10cqw' }}>
      <BgImage src={page.fgImage} overlay={0.72} />
      <NoiseLayer />
      <VerticalLabel text={page.index ? `VOL ${page.index.split('/')[0]} / ISSUE 2025` : 'VOL. 01 / ISSUE 2025'} style={{ left: '8cqw', top: '10cqw' }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <StaggeredElement index={1} isStatic={isStatic}>
          <div style={{ width: '10cqw', height: '1.5cqw', background: accent, marginBottom: '8cqw' }} />
          <p style={{ fontFamily: F.mono, fontSize: '2.8cqw', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: accent, marginBottom: '3cqw' }}>{page.kicker || 'EDITORIAL'}</p>
          <h2
            className={activeElement === 'title' ? 'active-focus' : ''}
            style={{
              fontFamily: page.titleFontFamily ? F[page.titleFontFamily] : F.sans,
              fontSize: `${getScaledFontSizeValue(page.title, 14, page.titleFontSize)}cqw`,
              color: '#fff',
              marginBottom: '6cqw',
              textTransform: 'uppercase',
              lineHeight: 0.85,
              fontWeight: 800,
              transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >
            {page.title.split(' ').map((w, i) =>
              i === 1 ? <em key={i} style={{ color: accent, textTransform: 'none', fontSize: '1.1em', display: 'inline-block' }}>{w} </em> : w + ' '
            )}
          </h2>
        </StaggeredElement>
        <StaggeredElement index={2} isStatic={isStatic}>
          <p
            className={activeElement === 'content' ? 'active-focus' : ''}
            style={{
              fontFamily: F.sans,
              fontSize: `${getScaledFontSizeValue(page.content || '', 4.8, page.contentFontSize)}cqw`,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.5,
              marginBottom: '12cqw',
              maxWidth: '85%',
              fontWeight: 400,
              transform: `translate(${page.contentOffsetX || 0}cqw, ${page.contentOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >{page.content}</p>
        </StaggeredElement>
        <StaggeredElement index={3} isStatic={isStatic}><BrandFooter page={page} /></StaggeredElement>
      </div>
    </div>
  );
};

const LayoutDataStory = ({ page, cfg: _cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const stats = page.stats || [{ label: 'Resultado', value: '+42%' }, { label: 'Crescimento', value: '3x' }];
  const hasImage = !!page.fgImage;

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <NoiseLayer />
      <div style={{ flex: 1, background: hasImage ? '#000' : '#0d0d0f', padding: '12cqw 10cqw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <BgImage src={page.fgImage} overlay={0.65} />
        {!hasImage && <AtmosphericBlob style={{ width: '100cqw', height: '100cqw', background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, top: '-50cqw', right: '-30cqw' }} />}
        <StaggeredElement index={1} isStatic={isStatic} style={{ position: 'relative', zIndex: 10 }}>
          <p style={{ fontFamily: F.mono, fontSize: '2.8cqw', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: accent, marginBottom: '4cqw' }}>{page.kicker || 'DADOS'}</p>
          <h2
            className={activeElement === 'title' ? 'active-focus' : ''}
            style={{
              fontFamily: page.titleFontFamily ? F[page.titleFontFamily] : F.sans,
              fontSize: `${getScaledFontSizeValue(page.title, 11, page.titleFontSize)}cqw`,
              color: '#fff',
              letterSpacing: '-0.05em',
              fontWeight: 800,
              transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >{page.title}</h2>
        </StaggeredElement>
      </div>
      <div style={{ flex: 1.4, background: '#f9f9f9', padding: '12cqw 10cqw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8cqw' }}>
          {stats.slice(0, 2).map((s, i) => (
            <StaggeredElement key={i} index={i + 2} isStatic={isStatic} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '4cqw', borderBottom: '2px solid #000' }}>
              <div>
                <p style={{ fontFamily: F.mono, fontSize: '2.4cqw', fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: '1cqw' }}>{s.label.split(' ')[0]}</p>
                <p style={{ fontFamily: F.sans, fontSize: '4cqw', fontWeight: 700, color: '#000' }}>{s.label}</p>
              </div>
              <span style={{ fontFamily: F.sans, fontSize: '14cqw', fontWeight: 800, color: '#000', lineHeight: 0.75, letterSpacing: '-0.06em' }}>{s.value}</span>
            </StaggeredElement>
          ))}
        </div>
        <StaggeredElement index={4} isStatic={isStatic}><BrandFooter page={page} isDark={false} /></StaggeredElement>
      </div>
    </div>
  );
};

const LayoutMinimal = ({ page, cfg: _cfg, isStatic, activeElement }: { page: CreativePage; cfg: FormatConfig; isStatic: boolean; activeElement: string | null }) => {
  const accent = page.accentColorHex;
  const hasImage = !!page.fgImage;

  return (
    <div style={{ background: hasImage ? '#000' : '#040405', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12cqw 11cqw', textAlign: 'center', position: 'relative' }}>
      <BgImage src={page.fgImage} overlay={0.82} />
      <NoiseLayer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <p style={{ fontFamily: F.mono, fontSize: '2.2cqw', fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{page.kicker || 'MANIFESTO'}</p>
        <span style={{ fontFamily: F.mono, fontSize: '2.4cqw', color: 'rgba(255,255,255,0.2)' }}>{page.index?.split('/')[0] || '01'}</span>
      </div>

      <div style={{ padding: '0 4cqw', position: 'relative', zIndex: 10 }}>
        <StaggeredElement index={1} isStatic={isStatic}>
          <div style={{ width: '8cqw', height: '1px', background: accent, margin: '0 auto 10cqw', opacity: 0.6 }} />
          <h2
            className={activeElement === 'title' ? 'active-focus' : ''}
            style={{
              fontFamily: page.titleFontFamily ? F[page.titleFontFamily] : F.serif,
              fontStyle: 'italic',
              fontSize: `${getScaledFontSizeValue(page.title, 13, page.titleFontSize)}cqw`,
              color: '#fff',
              marginBottom: '10cqw',
              lineHeight: 1.1,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              transform: `translate(${page.titleOffsetX || 0}cqw, ${page.titleOffsetY || 0}cqw)`,
              padding: '2cqw',
            }}
          >{page.title}</h2>
          {page.content && (
            <p
              className={activeElement === 'content' ? 'active-focus' : ''}
              style={{
                fontFamily: F.sans,
                fontSize: `${getScaledFontSizeValue(page.content || '', 4.4, page.contentFontSize)}cqw`,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.8,
                maxWidth: '90%',
                margin: '0 auto',
                fontWeight: 400,
                transform: `translate(${page.contentOffsetX || 0}cqw, ${page.contentOffsetY || 0}cqw)`,
                padding: '2cqw',
              }}
            >{page.content}</p>
          )}
        </StaggeredElement>
      </div>

      <StaggeredElement index={2} isStatic={isStatic} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5cqw', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '3cqw' }}>
          <span style={{ fontFamily: F.mono, color: 'rgba(255,255,255,0.2)', fontSize: '2.2cqw', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{page.handle ?? '@suamarca'}</span>
          <div style={{ width: '1cqw', height: '1cqw', background: accent, borderRadius: '50%' }} />
          <span style={{ color: accent, fontFamily: F.mono, fontSize: '2.2cqw', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em' }}>{page.tag || 'READ'}</span>
        </div>
      </StaggeredElement>
    </div>
  );
};

interface CreativePostRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  page: CreativePage;
  isPreview?: boolean;
  isThumbnail?: boolean;
  aspectRatio?: AspectRatio;
  slideIndex?: number;
  totalSlides?: number;
  activeElement?: 'title' | 'content' | null;
}

export default function CreativePostRenderer({
  page, isPreview = false, isThumbnail = false, aspectRatio = '9/16',
  slideIndex = 0, totalSlides = 1, activeElement = null, ...rest
}: CreativePostRendererProps) {
  const cfg = FORMAT_CONFIGS[aspectRatio] ?? FORMAT_CONFIGS['9/16'];
  const isStatic = isPreview || isThumbnail;

  const layouts: Record<LayoutType, React.ReactNode> = {
    'floating-card': <LayoutFloatingCard page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
    'split':         <LayoutSplit        page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
    'quote':         <LayoutQuote        page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
    'editorial':     <LayoutEditorial    page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
    'data-story':    <LayoutDataStory    page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
    'minimal':       <LayoutMinimal      page={page} cfg={cfg} isStatic={isStatic} activeElement={activeElement} />,
  };

  const content = layouts[page.layoutType] ?? layouts['editorial'];

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-all duration-300 ${activeElement ? 'ring-2 ring-yellow-500/20' : ''}`}
      style={{ overflow: 'hidden', position: 'relative', containerType: 'size' }}
      {...rest}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .active-focus {
          outline: 1.5cqw auto rgba(234, 179, 8, 0.45);
          outline-offset: 1cqw;
          border-radius: 2cqw;
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.2);
          transition: all 0.2s ease;
        }
      `}} />
      {content}
    </div>
  );
}
