import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function CustomLinksForm({ links, onChange }) {
  const addLink = () => onChange([...links, { title: '', url: '' }]);

  const updateLink = (index, field, value) => {
    const updated = links.map((link, i) => (i === index ? { ...link, [field]: value } : link));
    onChange(updated);
  };

  const removeLink = index => onChange(links.filter((_, i) => i !== index));

  const moveLink = (from, to) => {
    if (to < 0 || to >= links.length) return;
    const updated = [...links];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Custom Links</h2>
        <button
          onClick={addLink}
          className="flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium transition-colors"
        >
          <Plus size={16} />
          Add Link
        </button>
      </div>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex flex-col gap-0.5 pt-2">
              <button
                onClick={() => moveLink(index, index - 1)}
                className="text-gray-400 hover:text-gray-600 p-0.5"
                disabled={index === 0}
              >
                <GripVertical size={14} />
              </button>
            </div>
            <div className="flex-1 space-y-1.5">
              <input
                type="text"
                value={link.title}
                onChange={e => updateLink(index, 'title', e.target.value)}
                placeholder="Link title"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <input
                type="url"
                value={link.url}
                onChange={e => updateLink(index, 'url', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <button
              onClick={() => removeLink(index)}
              className="text-gray-400 hover:text-red-500 p-2 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No custom links yet. Click "Add Link" to get started.
          </p>
        )}
      </div>
    </div>
  );
}
