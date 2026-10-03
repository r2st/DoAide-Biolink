import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ThemePicker from './components/ThemePicker';
import SocialLinksForm from './components/SocialLinksForm';
import CustomLinksForm from './components/CustomLinksForm';
import BioPreview from './components/BioPreview';
import ExportPanel from './components/ExportPanel';

const defaultProfile = { name: '', photoUrl: '', bio: '' };
const defaultSocialLinks = {};
const defaultCustomLinks = [{ title: '', url: '' }];

function loadFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      return JSON.parse(atob(data));
    }
  } catch {
    // ignore
  }
  return null;
}

export default function App() {
  const urlData = loadFromUrl();
  const [profile, setProfile] = useState(urlData?.profile || defaultProfile);
  const [selectedTheme, setSelectedTheme] = useState(urlData?.theme || 'minimal');
  const [socialLinks, setSocialLinks] = useState(urlData?.socialLinks || defaultSocialLinks);
  const [customLinks, setCustomLinks] = useState(urlData?.customLinks || defaultCustomLinks);
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    if (urlData) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const isViewMode = !!urlData && !profile.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Hero - only on builder mode */}
        {!urlData && (
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Your Link-in-Bio Page, <span className="text-gold">Instantly</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
              Create a beautiful bio page in seconds. No signup needed. Free forever.
            </p>
          </div>
        )}

        {/* Mobile tab switcher */}
        <div className="lg:hidden flex mb-4 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'edit' ? 'bg-gold text-white' : 'text-gray-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'preview' ? 'bg-gold text-white' : 'text-gray-600'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor panel */}
          <div className={`lg:w-[440px] shrink-0 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-6">
              <ProfileForm profile={profile} onChange={setProfile} />
              <hr className="border-gray-100" />
              <ThemePicker selected={selectedTheme} onSelect={setSelectedTheme} />
              <hr className="border-gray-100" />
              <SocialLinksForm socialLinks={socialLinks} onChange={setSocialLinks} />
              <hr className="border-gray-100" />
              <CustomLinksForm links={customLinks} onChange={setCustomLinks} />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <ExportPanel
                profile={profile}
                selectedTheme={selectedTheme}
                socialLinks={socialLinks}
                customLinks={customLinks}
              />
            </div>
          </div>

          {/* Preview panel */}
          <div className={`flex-1 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Live Preview</h2>
                <span className="text-xs text-gray-400">Updates as you type</span>
              </div>
              <BioPreview
                profile={profile}
                selectedTheme={selectedTheme}
                socialLinks={socialLinks}
                customLinks={customLinks}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-gold flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">DoAide Biolink</span>
          </div>
          <p className="text-xs text-gray-400">
            Free link-in-bio page builder.{' '}
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark">
              Part of DoAide
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
