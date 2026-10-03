export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-lg text-gray-900">DoAide</span>
          <span className="text-gold font-semibold">Biolink</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-gray-500">Free. No login needed.</span>
          <a
            href="https://doaide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
          >
            doaide.com
          </a>
        </div>
      </div>
    </header>
  );
}
