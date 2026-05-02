import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Briefcase, ArrowLeft, Mail, Lock, Moon, Sun} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import { DynamicBackground } from '../components/dashboard/DynamicBackground';

export default function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const { settings, updateSettings, primaryColorHex } = useTheme();
  const t = translations[language];
  const isRTL = language === 'ar';

  const borderRadiusClass = 
    settings.borderRadius === 'none' ? 'rounded-none' : 
    settings.borderRadius === 'md' ? 'rounded-md' : 
    settings.borderRadius === 'xl' ? 'rounded-xl' : 
    settings.borderRadius === '2xl' ? 'rounded-2xl' : 'rounded-3xl';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ email: 'admin', name: 'Admin' }));
      navigate('/dashboard');
    } else {
      setError(t.loginError);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex relative font-sans" dir={isRTL ? "rtl" : "ltr"}>
      <DynamicBackground />
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900/40 backdrop-blur-xl overflow-hidden items-center justify-center p-12">
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
            <div className="p-3 rounded-2xl text-white shadow-lg" style={{ backgroundColor: primaryColorHex }}>
              <Briefcase className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">ECONOMINE</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            {t.welcomeBack}
          </h1>
          <p className="text-xl text-blue-200/80 leading-relaxed">
            {t.welcomeBackDesc}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 md:p-16 lg:p-24 overflow-y-auto relative">
        <div className="absolute top-6 right-6 flex items-center gap-1 border-slate-200">
          <Button variant="ghost" size="sm" onClick={() => setLanguage('ar')} className={`px-2 h-8 ${language === 'ar' ? 'font-bold' : 'text-slate-500'}`} style={{ color: language === 'ar' ? primaryColorHex : undefined }}>AR</Button>
          <Button variant="ghost" size="sm" onClick={() => setLanguage('en')} className={`px-2 h-8 ${language === 'en' ? 'font-bold' : 'text-slate-500'}`} style={{ color: language === 'en' ? primaryColorHex : undefined }}>EN</Button>
          <Button variant="ghost" size="sm" onClick={() => setLanguage('fr')} className={`px-2 h-8 ${language === 'fr' ? 'font-bold' : 'text-slate-500'}`} style={{ color: language === 'fr' ? primaryColorHex : undefined }}>FR</Button>
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
              <h2 className="text-3xl font-bold text-slate-900">{t.loginTitle}</h2>
              <p className="text-slate-500">{t.loginDesc}</p>
              <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 font-medium">
                {t.demoAccount} <span className="font-bold">admin</span> / <span className="font-bold">admin</span>
              </div>
            </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-semibold">{t.emailLabel}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input 
                  id="email" 
                  type="text" 
                  placeholder={t.emailPlaceholder}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-semibold">{t.passwordLabel}</Label>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: primaryColorHex }}>{t.forgotPassword}</a>
              </div>
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
              className={`w-full h-14 font-bold text-lg transition-all shadow-lg ${borderRadiusClass}`}
              style={{ backgroundColor: primaryColorHex }}
            >
              {loading ? t.loggingIn : t.loginBtn}
              {!loading && <ArrowLeft className={`${isRTL ? 'ms-2' : 'mr-2'} h-5 w-5 ${!isRTL && 'rotate-180'}`} />}
            </Button>
          </form>

          <div className="text-center text-slate-500 font-medium">
            {t.noAccount} <Link to="/register" className="font-bold underline underline-offset-4 transition-colors" style={{ color: primaryColorHex }}>{t.createAccount}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
