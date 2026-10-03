export default function ProfileForm({ profile, onChange }) {
  const update = (field, value) => onChange({ ...profile, [field]: value });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={e => update('name', e.target.value)}
          placeholder="Your Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
        <input
          type="url"
          value={profile.photoUrl}
          onChange={e => update('photoUrl', e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          value={profile.bio}
          onChange={e => update('bio', e.target.value)}
          placeholder="A short bio about you..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
