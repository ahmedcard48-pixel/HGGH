import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Download, FileText, Search } from 'lucide-react';
import Header from '../components/Header';
import { Footer } from '../components/Footer';

export default function LegalTemplatesPage() {
  const { language } = useLanguage();
  const { primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 1,
      title: language === 'ar' ? 'نموذج عقد تأسيس شركة ذات مسؤولية محدودة (SARL)' : language === 'fr' ? 'Modèle de statuts SARL' : 'SARL Articles of Association Template',
      category: language === 'ar' ? 'تأسيس الشركات' : language === 'fr' ? 'Création d\'entreprise' : 'Company Formation',
      format: 'DOCX',
      downloads: 1240
    },
    {
      id: 2,
      title: language === 'ar' ? 'عقد عمل محدد المدة (CDD)' : language === 'fr' ? 'Contrat de travail à durée déterminée (CDD)' : 'Fixed-Term Employment Contract (CDD)',
      category: language === 'ar' ? 'الموارد البشرية' : language === 'fr' ? 'Ressources Humaines' : 'Human Resources',
      format: 'DOCX',
      downloads: 850
    },
    {
      id: 3,
      title: language === 'ar' ? 'اتفاقية عدم الإفصاح (NDA)' : language === 'fr' ? 'Accord de non-divulgation (NDA)' : 'Non-Disclosure Agreement (NDA)',
      category: language === 'ar' ? 'العقود التجارية' : language === 'fr' ? 'Contrats Commerciaux' : 'Commercial Contracts',
      format: 'PDF',
      downloads: 2100
    },
    {
      id: 4,
      title: language === 'ar' ? 'نموذج فاتورة تجارية' : language === 'fr' ? 'Modèle de facture commerciale' : 'Commercial Invoice Template',
      category: language === 'ar' ? 'المالية' : language === 'fr' ? 'Finance' : 'Finance',
      format: 'XLSX',
      downloads: 3400
    },
    {
      id: 5,
      title: language === 'ar' ? 'عقد إيجار تجاري' : language === 'fr' ? 'Bail commercial' : 'Commercial Lease Agreement',
      category: language === 'ar' ? 'العقارات' : language === 'fr' ? 'Immobilier' : 'Real Estate',
      format: 'DOCX',
      downloads: 920
    },
    {
      id: 6,
      title: language === 'ar' ? 'شروط وأحكام الموقع الإلكتروني' : language === 'fr' ? 'Conditions générales du site web' : 'Website Terms and Conditions',
      category: language === 'ar' ? 'التكنولوجيا' : language === 'fr' ? 'Technologie' : 'Technology',
      format: 'DOCX',
      downloads: 1560
    }
  ];

  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900" dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {(t as any).legalTemplates || 'Legal Templates'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {language === 'ar' ? 'حمل نماذج قانونية جاهزة للاستخدام ومطابقة للقانون الجزائري لتوفير الوقت والجهد.' : language === 'fr' ? 'Téléchargez des modèles juridiques prêts à l\'emploi et conformes au droit algérien pour gagner du temps et des efforts.' : 'Download ready-to-use legal templates compliant with Algerian law to save time and effort.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} h-5 w-5 text-slate-400`} />
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث عن نموذج قانوني...' : language === 'fr' ? 'Rechercher un modèle juridique...' : 'Search for a legal template...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-slate-900 dark:text-white`}
                style={{ focusRingColor: primaryColorHex }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {template.format}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                    {template.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    {template.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {template.downloads} {language === 'ar' ? 'تحميل' : language === 'fr' ? 'téléchargements' : 'downloads'}
                    </span>
                    <Button variant="ghost" size="sm" className="hover:bg-slate-100 dark:hover:bg-slate-700" style={{ color: primaryColorHex }}>
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'تحميل' : language === 'fr' ? 'Télécharger' : 'Download'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                {language === 'ar' ? 'لم يتم العثور على نتائج.' : language === 'fr' ? 'Aucun résultat trouvé.' : 'No results found.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
