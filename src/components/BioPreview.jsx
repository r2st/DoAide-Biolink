import * as Icons from 'lucide-react';
import { socialPlatforms, themes } from '../data/themes';

export default function BioPreview({ profile, selectedTheme, socialLinks, customLinks }) {
  const theme = themes[selectedTheme];
  const isGradientBg = theme.bg.startsWith('linear-gradient');
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url.trim());
  const activeCustom = customLinks.filter(l => l.title.trim() && l.url.trim());

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl min-h-[500px] flex justify-center p-8"
      style={{
        background: isGradientBg ? theme.bg : theme.bg,
        fontFamily: theme.font,
      }}
    >
      <div className="w-full max-w-[360px] text-center">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            style={{ border: `3px solid ${theme.accent}` }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
            style={{
              background: theme.cardBg,
              color: theme.text,
              border: `3px solid ${theme.accent}`,
            }}
          >
            {(profile.name || '?')[0]?.toUpperCase()}
          </div>
        )}

        <h1
          className="text-xl font-bold mb-2"
          style={{ color: theme.text }}
        >
          {profile.name || 'Your Name'}
        </h1>

        {profile.bio && (
          <p
            className="text-sm mb-6 mx-auto max-w-[280px] leading-relaxed"
            style={{ color: theme.subtext }}
          >
            {profile.bio}
          </p>
        )}

        {activeSocials.length > 0 && (
          <div className="flex gap-3 justify-center flex-wrap mb-6">
            {activeSocials.map(([key, url]) => {
              const platform = socialPlatforms.find(p => p.key === key);
              const Icon = platform ? Icons[platform.icon] : null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: theme.link,
                    color: theme.linkText,
                    border: `1px solid ${theme.linkBorder}`,
                  }}
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {activeCustom.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3.5 font-medium text-sm text-center transition-all hover:-translate-y-0.5"
              style={{
                background: theme.link,
                color: theme.linkText,
                border: `1px solid ${theme.linkBorder}`,
                borderRadius: theme.borderRadius,
                ...(theme.backgroundStyle.includes('backdrop-filter')
                  ? { backdropFilter: 'blur(10px)' }
                  : {}),
              }}
            >
              {link.title}
            </a>
          ))}
          {activeCustom.length === 0 && activeSocials.length === 0 && (
            <p
              className="text-sm py-8 opacity-60"
              style={{ color: theme.subtext }}
            >
              Add social or custom links to see them here
            </p>
          )}
        </div>

        <div className="mt-8 text-xs" style={{ color: theme.subtext }}>
          Made with{' '}
          <a
            href="https://bio.doaide.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accent }}
          >
            DoAide Biolink
          </a>
        </div>
      </div>
    </div>
  );
}
