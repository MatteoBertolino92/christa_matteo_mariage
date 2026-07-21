import { getTranslation, Language, languages } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/languageStore';
import { Globe, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, initializeFromUrl } = useLanguageStore();

  // Initialize language from URL on component mount
  useEffect(() => {
    initializeFromUrl();
  }, [initializeFromUrl]);

  const navLinks = [
    { href: '#event-details', labelKey: 'eventDetails' as const },
    { href: '#travel', labelKey: 'travel' as const },
    { href: '#hotels', labelKey: 'hotels' as const },
    { href: '#activities', labelKey: 'activities' as const },
    { href: '#rsvp', labelKey: 'rsvpTitle' as const },
    { href: '#gifts', labelKey: 'giftRegistry' as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="font-heading text-2xl lg:text-3xl text-primary font-bold">Christa & Matteo</a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
              >
                {getTranslation(link.labelKey, language)}
              </a>
            ))}
          </nav>

          {/* Language Selector and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 p-2 text-primary hover:text-foreground transition-colors"
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-primary/20 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left font-paragraph text-sm flex items-center gap-2 hover:bg-primary/10 transition-colors ${
                        language === lang.code ? 'bg-primary/5 text-primary font-bold' : 'text-secondary-foreground'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-primary/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors py-2"
                >
                  {getTranslation(link.labelKey, language)}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
