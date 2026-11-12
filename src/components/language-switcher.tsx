import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={t.languageSelector}>
    {(["es", "en"] as Language[]).map(option => <Button key={option} variant="ghost" size="sm" aria-label={option === "es" ? "Español" : "English"} lang={option} aria-pressed={language === option} onClick={() => setLanguage(option)}>{option.toUpperCase()}</Button>)}
  </div>;
}