import * as Icons from 'lucide-react';
import { socialPlatforms } from '../data/themes';

export default function SocialLinksForm({ socialLinks, onChange }) {
  const update = (key, value) => onChange({ ...socialLinks, [key]: value });

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
      <div className="space-y-2">
        {socialPlatforms.map(platform => {
          const Icon = Icons[platform.icon];
          return (
            <div key={platform.key} className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500 shrink-0">
                {Icon && <Icon size={18} />}
              </div>
              <input
                type="url"
                value={socialLinks[platform.key] || ''}
                onChange={e => update(platform.key, e.target.value)}
                placeholder={platform.placeholder}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
