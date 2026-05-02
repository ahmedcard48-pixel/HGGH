import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { language } = useLanguage();
  const { primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: primaryColorHex }}>
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ECONOMINE</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {isRTL ? 'منصتك الأولى لاكتشاف وتحليل المشاريع الاستثمارية في الجزائر باستخدام الذكاء الاصطناعي.' : language === 'fr' ? "Votre première plateforme pour découvrir et analyser des projets d'investissement en Algérie grâce à l'IA." : 'Your premier platform for discovering and analyzing investment projects in Algeria using AI.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{isRTL ? 'الشركة' : language === 'fr' ? 'Entreprise' : 'Company'}</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{(t as any).aboutUs}</Link></li>
              <li><Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{(t as any).services}</Link></li>
              <li><Link to="/success-stories" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{(t as any).successStories}</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{(t as any).contactUsPage}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{isRTL ? 'الموارد' : language === 'fr' ? 'Ressources' : 'Resources'}</h4>
            <ul className="space-y-4">
              <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{(t as any).blog}</Link></li>
              <li><Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{t.pricing}</Link></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{isRTL ? 'مركز المساعدة' : language === 'fr' ? "Centre d'aide" : 'Help Center'}</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{isRTL ? 'دليل الاستثمار' : language === 'fr' ? "Guide d'investissement" : 'Investment Guide'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{isRTL ? 'قانوني' : language === 'fr' ? 'Légal' : 'Legal'}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{isRTL ? 'شروط الخدمة' : language === 'fr' ? "Conditions d'utilisation" : 'Terms of Service'}</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{isRTL ? 'سياسة الخصوصية' : language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{isRTL ? 'سياسة ملفات تعريف الارتباط' : language === 'fr' ? 'Politique des cookies' : 'Cookie Policy'}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} ECONOMINE. {isRTL ? 'جميع الحقوق محفوظة.' : language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
            <span>{isRTL ? 'صنع في الجزائر' : language === 'fr' ? 'Fabriqué en Algérie' : 'Made in Algeria'}</span>
            <span className="text-red-500">❤</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
