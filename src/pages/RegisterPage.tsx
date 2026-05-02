import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Briefcase, ArrowLeft, Mail, Lock, Moon, Sun, User} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';

export default function RegisterPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('user', JSON.stringify({ name, email }));
    navigate('/onboarding');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans" dir={isRTL ? "rtl" : "ltr"}>
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg text-white space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div 
              className="p-3 rounded-2xl text-white shadow-lg"
              style={{ backgroundColor: primaryColorHex }}
            >
              <Briefcase className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">ECONOMINE</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            {t.startInvestmentJourney}
          </h1>
          <p className="text-xl text-emerald-100/80 leading-relaxed">
            {t.startInvestmentJourneyDesc}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 md:p-16 lg:p-24 overflow-y-auto relative">
        <div className="absolute top-6 right-6 flex items-center gap-1 border-slate-200">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('ar')} 
            className={`px-2 h-8 ${language === 'ar' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'ar' ? primaryColorHex : undefined }}
          >
            AR
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('en')} 
            className={`px-2 h-8 ${language === 'en' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'en' ? primaryColorHex : undefined }}
          >
            EN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage('fr')} 
            className={`px-2 h-8 ${language === 'fr' ? 'font-bold' : 'text-slate-500'}`}
            style={{ color: language === 'fr' ? primaryColorHex : undefined }}
          >
            FR
          </Button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="h-8 w-8 text-slate-500 dark:text-slate-400"
          >
            {settings.darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        <Link to="/" className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-medium">
          <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          {t.backToHome}
        </Link>
        <div className="max-w-md w-full mx-auto space-y-8 mt-12">
          
          <div className={`space-y-2 text-center ${isRTL ? 'lg:text-start' : 'lg:text-left'}`}>
            <h2 className="text-3xl font-bold text-slate-900">{t.registerTitle}</h2>
            <p className="text-slate-500">{t.registerDesc}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="name" className="text-slate-700 font-semibold">{t.fullNameLabel}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <Input 
                  id="name" 
                  placeholder={t.fullNamePlaceholderAuth}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-semibold">{t.emailLabel}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={t.emailPlaceholderAuth}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-slate-700 font-semibold">{t.passwordLabel}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-12 h-14 text-lg rounded-xl border-slate-200 focus:ring-opacity-20 shadow-sm"
                  style={{ 
                    '--tw-ring-color': primaryColorHex,
                    borderColor: 'var(--tw-ring-color)'
                  } as React.CSSProperties}
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 rounded-xl text-white shadow-lg font-bold text-lg transition-all"
              style={{ backgroundColor: primaryColorHex }}
            >
              {loading ? t.registering : t.registerBtn}
              {!loading && <ArrowLeft className={`${isRTL ? 'ms-2' : 'mr-2'} h-5 w-5 ${!isRTL && 'rotate-180'}`} />}
            </Button>
          </form>

          <div className="text-center text-slate-500 font-medium">
            {t.haveAccount} <Link to="/login" className="font-bold underline underline-offset-4 transition-colors" style={{ color: primaryColorHex }}>{t.loginBtn}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
