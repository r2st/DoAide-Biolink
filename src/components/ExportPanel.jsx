import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode, Code, Share2, Copy, Check } from 'lucide-react';
import { generateBioHtml } from '../data/generateHtml';

export default function ExportPanel({ profile, selectedTheme, socialLinks, customLinks }) {
  const [showQR, setShowQR] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [copied, setCopied] = useState(null);

  const pageUrl = `https://bio.doaide.com/?data=${encodeURIComponent(
    btoa(JSON.stringify({ profile, theme: selectedTheme, socialLinks, customLinks }))
  )}`;

  const embedCode = `<iframe src="${pageUrl}" width="400" height="600" frameborder="0" style="border-radius:12px;overflow:hidden;"></iframe>`;

  const handleDownload = () => {
    const html = generateBioHtml(profile, selectedTheme, socialLinks, customLinks);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(profile.name || 'biolink').toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareText = `Check out my bio page! ${pageUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Export & Share</h2>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold-dark transition-colors"
        >
          <Download size={16} />
          Download HTML
        </button>
        <button
          onClick={() => setShowQR(v => !v)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <QrCode size={16} />
          QR Code
        </button>
        <button
          onClick={() => setShowEmbed(v => !v)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Code size={16} />
          Embed
        </button>
        <button
          onClick={() => handleCopy(pageUrl, 'link')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {copied === 'link' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {copied === 'link' ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      <div className="flex gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          <Share2 size={14} />
          WhatsApp
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Share2 size={14} />
          X / Twitter
        </a>
      </div>

      {showQR && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col items-center gap-3">
          <QRCodeSVG value={pageUrl} size={200} />
          <p className="text-xs text-gray-500">Scan to visit your bio page</p>
        </div>
      )}

      {showEmbed && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Embed Code</span>
            <button
              onClick={() => handleCopy(embedCode, 'embed')}
              className="text-xs text-gold hover:text-gold-dark font-medium"
            >
              {copied === 'embed' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200 overflow-x-auto">
            {embedCode}
          </pre>
        </div>
      )}
    </div>
  );
}
