import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Settings, Palette, Layers, Circle, LayoutDashboard, Globe, RefreshCcw, CheckCircle2, Upload } from 'lucide-react';
import { useTheme, ThemeColor, BorderRadius, BackgroundType, FontFamily, ThemeSettings } from '@/src/context/ThemeContext';
import { useLanguage } from '@/src/i18n/LanguageContext';
import { translations } from '@/src/i18n/translations';

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings, primaryColorHex, colors } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [showSettingsSaved, setShowSettingsSaved] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ 
          backgroundImage: reader.result as string, 
          backgroundType: 'image' 
        });
        setShowSettingsSaved(true);
        setTimeout(() => setShowSettingsSaved(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const businessPresets = [
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=100&w=2560',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=100&w=2560',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=100&w=2560',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=100&w=2560',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=100&w=2560',
    'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=100&w=2560'
  ];

  const handleUpdateSettings = (newSettings: Partial<ThemeSettings>) => {
    updateSettings(newSettings);
    setShowSettingsSaved(true);
    setTimeout(() => setShowSettingsSaved(false), 2000);
  };

  const glassCardStyle = {
    backgroundColor: settings.darkMode ? `rgba(15, 23, 42, ${settings.glassOpacity / 100})` : `rgba(255, 255, 255, ${settings.glassOpacity / 100})`,
    backdropFilter: `blur(${settings.glassBlur}px) saturate(${settings.glassSaturation || 100}%)`,
    WebkitBackdropFilter: `blur(${settings.glassBlur}px) saturate(${settings.glassSaturation || 100}%)`,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Settings Saved Notification */}
      {showSettingsSaved && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-1 rounded-full" style={{ backgroundColor: primaryColorHex }}>
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm">Settings Applied Successfully</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.settings}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetSettings}
          className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white"
        >
          <RefreshCcw className="w-4 h-4 ml-2" />
          {t.resetToDefault}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Settings */}
        <Card className="border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden" style={glassCardStyle}>
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50/50 border-b border-slate-100 dark:border-slate-700/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>
                <Settings className="w-4 h-4" />
              </div>
              {t.languageSettings}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'ar', label: 'العربية' },
                { id: 'en', label: 'English' },
                { id: 'fr', label: 'Français' }
              ].map((lang) => (
                <Button 
                  key={lang.id}
                  variant={language === lang.id ? 'default' : 'outline'} 
                  onClick={() => setLanguage(lang.id as any)}
                  className={`rounded-xl px-6 h-11 font-medium transition-all ${
                    language === lang.id ? 'shadow-md' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800/50'
                  }`}
                  style={language === lang.id ? { backgroundColor: primaryColorHex, color: '#ffffff', boxShadow: `0 4px 6px -1px ${primaryColorHex}40` } : {}}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* UI Theme Color */}
        <Card className="border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden" style={glassCardStyle}>
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50/50 border-b border-slate-100 dark:border-slate-700/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColorHex}20`, color: primaryColorHex }}>
                <Palette className="w-4 h-4" />
              </div>
              {t.themeColor}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              {(Object.keys(colors) as ThemeColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => updateSettings({ primaryColor: color })}
                  className={`w-10 h-10 rounded-full transition-all transform hover:scale-110 ${
                    settings.primaryColor === color ? 'ring-4 ring-offset-2 scale-110' : ''
                  }`}
                  style={{ 
                    backgroundColor: colors[color],
                    boxShadow: settings.primaryColor === color ? `0 0 0 4px white, 0 0 0 6px ${primaryColorHex}` : 'none'
                  }}
                  title={color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Background Customization */}
        <Card className="border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden md:col-span-2" style={glassCardStyle}>
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50/50 border-b border-slate-100 dark:border-slate-700/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg" style={{ color: '#10b981' }}>
                <Layers className="w-4 h-4" />
              </div>
              {t.uiCustomization}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 lg:col-span-3">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.darkMode}</Label>
                <button
                  onClick={() => handleUpdateSettings({ darkMode: !settings.darkMode })}
                  className={`w-12 h-6 rounded-full transition-colors ${settings.darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 transition-transform ${settings.darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Background Style */}
              <div className="space-y-4 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.backgroundStyle}</Label>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  {[
                    { id: 'mesh', label: t.mesh, icon: Layers },
                    { id: 'gradient', label: t.gradient, icon: Palette },
                    { id: 'geometric', label: t.geometric, icon: Circle },
                    { id: 'minimal', label: t.minimal, icon: LayoutDashboard },
                    { id: 'image', label: t.image, icon: Globe },
                    { id: 'custom-gradient', label: 'Gradient', icon: Palette }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleUpdateSettings({ backgroundType: style.id as BackgroundType })}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        settings.backgroundType === style.id 
                          ? 'shadow-sm' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800/50'
                      }`}
                      style={{ 
                        borderColor: settings.backgroundType === style.id ? primaryColorHex : undefined,
                        backgroundColor: settings.backgroundType === style.id ? `${primaryColorHex}10` : undefined,
                        color: settings.backgroundType === style.id ? primaryColorHex : undefined
                      }}
                    >
                      <style.icon className={`w-5 h-5 ${settings.backgroundType === style.id ? '' : 'text-slate-400 dark:text-slate-500'}`} style={{ color: settings.backgroundType === style.id ? primaryColorHex : undefined }} />
                      <span className="text-xs font-bold">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Presets & Upload */}
              {settings.backgroundType === 'image' && (
                <div className="space-y-4 lg:col-span-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">خلفيات أعمال (BUSINESS)</Label>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {businessPresets.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUpdateSettings({ backgroundImage: img })}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          settings.backgroundImage === img ? 'ring-2 ring-offset-2' : 'border-transparent'
                        }`}
                        style={{ borderColor: settings.backgroundImage === img ? primaryColorHex : 'transparent' }}
                      >
                        <img src={img} alt={`Preset ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {settings.backgroundImage === img && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white dark:bg-slate-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm" style={{ color: primaryColorHex }}>ACTIVE</div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={settings.backgroundImage || ''} 
                        onChange={(e) => updateSettings({ backgroundImage: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm pr-10"
                        placeholder="رابط صورة مخصص..."
                      />
                      <Globe className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-2xl border-slate-200 dark:border-slate-700 font-bold gap-2 hover:bg-slate-50 dark:bg-slate-800/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-5 h-5" />
                      {t.uploadImage}
                    </Button>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />

                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-2xl border-slate-200 dark:border-slate-700 font-bold gap-2 hover:bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 dark:text-slate-500"
                      onClick={resetSettings}
                    >
                      <RefreshCcw className="w-5 h-5" />
                      {t.resetToDefault}
                    </Button>
                  </div>
                </div>
              )}

              {/* Font Family */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.fontFamily}</Label>
                <Select 
                  value={settings.fontFamily || 'sans'} 
                  onValueChange={(val) => handleUpdateSettings({ fontFamily: val as FontFamily })}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder={t.fontFamily} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">{t.sans}</SelectItem>
                    <SelectItem value="serif">{t.serif}</SelectItem>
                    <SelectItem value="mono">{t.mono}</SelectItem>
                    <SelectItem value="outfit">{t.outfit}</SelectItem>
                    <SelectItem value="cormorant">{t.cormorant}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Border Radius */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.borderRadius}</Label>
                <Select 
                  value={settings.borderRadius || '3xl'} 
                  onValueChange={(val) => handleUpdateSettings({ borderRadius: val as BorderRadius })}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder={t.borderRadius} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">0px</SelectItem>
                    <SelectItem value="md">6px</SelectItem>
                    <SelectItem value="xl">12px</SelectItem>
                    <SelectItem value="2xl">16px</SelectItem>
                    <SelectItem value="3xl">24px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Background Blur */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.backgroundBlur}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.backgroundBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.backgroundBlur}
                  onChange={(e) => handleUpdateSettings({ backgroundBlur: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Glass Blur */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.glassBlur}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.glassBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.glassBlur}
                  onChange={(e) => handleUpdateSettings({ glassBlur: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Glass Opacity */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.glassOpacity}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.glassOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.glassOpacity}
                  onChange={(e) => handleUpdateSettings({ glassOpacity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Glass Saturation */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).glassSaturation}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.glassSaturation || 100}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.glassSaturation || 100}
                  onChange={(e) => handleUpdateSettings({ glassSaturation: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Glass Blur */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).glassBlur}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.glassBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={settings.glassBlur}
                  onChange={(e) => handleUpdateSettings({ glassBlur: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Glass Opacity */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).glassOpacity}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.glassOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.glassOpacity}
                  onChange={(e) => handleUpdateSettings({ glassOpacity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Background Saturation */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).backgroundSaturation}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.backgroundSaturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.backgroundSaturation}
                  onChange={(e) => handleUpdateSettings({ backgroundSaturation: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Background Brightness */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).backgroundBrightness}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.backgroundBrightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={settings.backgroundBrightness}
                  onChange={(e) => handleUpdateSettings({ backgroundBrightness: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Background Contrast */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).backgroundContrast}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.backgroundContrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={settings.backgroundContrast}
                  onChange={(e) => handleUpdateSettings({ backgroundContrast: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Background Hue */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">{(t as any).backgroundHue}</Label>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500">{settings.backgroundHue}deg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={settings.backgroundHue}
                  onChange={(e) => handleUpdateSettings({ backgroundHue: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: primaryColorHex }}
                />
              </div>

              {/* Visual Effects Toggles */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">{(t as any).backgroundAnimation}</Label>
                  <button
                    onClick={() => handleUpdateSettings({ backgroundAnimation: !settings.backgroundAnimation })}
                    className={`w-10 h-5 rounded-full transition-colors ${settings.backgroundAnimation ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white dark:bg-slate-900 transition-transform ${settings.backgroundAnimation ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">{(t as any).vignette}</Label>
                  <button
                    onClick={() => handleUpdateSettings({ vignette: !settings.vignette })}
                    className={`w-10 h-5 rounded-full transition-colors ${settings.vignette ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white dark:bg-slate-900 transition-transform ${settings.vignette ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">{(t as any).noise}</Label>
                  <button
                    onClick={() => handleUpdateSettings({ noise: !settings.noise })}
                    className={`w-10 h-5 rounded-full transition-colors ${settings.noise ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white dark:bg-slate-900 transition-transform ${settings.noise ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
