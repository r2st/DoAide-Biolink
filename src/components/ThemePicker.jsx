import { themes } from '../data/themes';

export default function ThemePicker({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Theme</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {Object.entries(themes).map(([key, theme]) => {
          const isGradient = theme.bg.startsWith('linear-gradient');
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`relative p-2 rounded-lg border-2 transition-all text-xs font-medium ${
                selected === key
                  ? 'border-gold ring-2 ring-gold/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-full h-8 rounded-md mb-1"
                style={{
                  background: isGradient ? theme.bg : theme.bg,
                  border: `1px solid ${theme.linkBorder}`,
                }}
              />
              <span className="text-gray-700">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
