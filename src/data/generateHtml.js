import { themes } from './themes';

export function generateBioHtml(profile, selectedTheme, socialLinks, customLinks) {
  const theme = themes[selectedTheme];
  const isGradientBg = theme.bg.startsWith('linear-gradient');

  const socialIconsSvg = {
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>',
    tiktok: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    twitch: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7"/></svg>',
    spotify: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527"/><path d="M9 15c1.5-1 4-.5 5 .5"/><path d="M7 9c3-2 8-1 10 1"/></svg>',
    email: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    website: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
  };

  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url.trim());
  const activeCustom = customLinks.filter(l => l.title.trim() && l.url.trim());

  const socialsHtml = activeSocials.length > 0 ? `
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">
      ${activeSocials.map(([key, url]) => `
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:${theme.link};border:1px solid ${theme.linkBorder};color:${theme.linkText};text-decoration:none;transition:transform 0.2s,background 0.2s;" onmouseover="this.style.transform='scale(1.1)';this.style.background='${theme.linkHover}'" onmouseout="this.style.transform='scale(1)';this.style.background='${theme.link}'">
          ${socialIconsSvg[key] || ''}
        </a>
      `).join('')}
    </div>
  ` : '';

  const linksHtml = activeCustom.map(link => `
    <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" style="display:block;padding:14px 24px;background:${theme.link};color:${theme.linkText};border:1px solid ${theme.linkBorder};border-radius:${theme.borderRadius};text-decoration:none;font-weight:500;font-size:15px;transition:transform 0.2s,background 0.2s;text-align:center;${theme.backgroundStyle}" onmouseover="this.style.transform='translateY(-2px)';this.style.background='${theme.linkHover}'" onmouseout="this.style.transform='translateY(0)';this.style.background='${theme.link}'">
      ${escapeHtml(link.title)}
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(profile.name || 'My Bio')} - Bio</title>
  <meta name="description" content="${escapeHtml(profile.bio || '')}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Quicksand:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      ${isGradientBg ? `background: ${theme.bg};` : `background-color: ${theme.bg};`}
      font-family: ${theme.font};
      display: flex;
      justify-content: center;
      padding: 40px 16px;
    }
    .container {
      width: 100%;
      max-width: 480px;
    }
    .avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
      border: 3px solid ${theme.accent};
    }
    .links { display: flex; flex-direction: column; gap: 12px; }
    .footer {
      margin-top: 32px;
      text-align: center;
      font-size: 12px;
      color: ${theme.subtext};
    }
    .footer a { color: ${theme.accent}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container" style="text-align:center;">
    ${profile.photoUrl ? `<img src="${escapeHtml(profile.photoUrl)}" alt="${escapeHtml(profile.name)}" class="avatar">` : ''}
    <h1 style="font-size:24px;font-weight:700;color:${theme.text};margin-bottom:8px;">${escapeHtml(profile.name || 'Your Name')}</h1>
    ${profile.bio ? `<p style="color:${theme.subtext};font-size:14px;line-height:1.5;margin-bottom:24px;max-width:320px;margin-left:auto;margin-right:auto;">${escapeHtml(profile.bio)}</p>` : ''}
    ${socialsHtml}
    <div class="links">
      ${linksHtml}
    </div>
    <div class="footer">
      Made with <a href="https://bio.doaide.com" target="_blank">DoAide Biolink</a>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
