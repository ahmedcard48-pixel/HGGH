export interface MarketAnalysis {
  targetAudience: string;
  competitors: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface DetailedFinancials {
  fixedCosts: { item: string; cost: number }[];
  variableCosts: { item: string; cost: number }[];
  estimatedMonthlyRevenue: number;
  breakEvenMonths: number;
}

export interface BusinessModel {
  id: string;
  title: string;
  description: string;
  type: 'physical' | 'ecommerce';
  minCapital: number;
  maxCapital: number;
  riskLevel: 'low' | 'medium' | 'high';
  complexity: 1 | 2 | 3 | 4 | 5; // 1: Very Easy, 5: Expert
  skillLevelRequired: 1 | 2 | 3 | 4 | 5; // 1: Beginner, 5: Expert
  scalability: 'low' | 'medium' | 'high';
  roiMonths: number;
  successRate: number; // 0-100 percentage
  tags: string[];
  marketTrends: string[];
  requiredExperience: string;
  requiredTools: string[];
  localRegulations: string[];
  seasonalTrends: string[];
  environmentalImpact: 'low' | 'medium' | 'high';
  branding: {
    suggestedNames: string[];
    marketingStrategy: string;
  };
  sourcing: { name: string; location: string; contactType: string }[];
  legalSteps: { task: string; duration: string; cost: string }[];
  financialRatios: {
    rent: number;
    equipment: number;
    inventory: number;
    buffer: number;
  };
  marketAnalysis: MarketAnalysis;
  detailedFinancials: DetailedFinancials;
  matchPercentage?: number;
}

export const businessDB: BusinessModel[] = [
  {
    id: "clothing-ecommerce",
    title: "متجر إلكتروني للملابس الجاهزة",
    description: "مشروع تجارة إلكترونية متكامل يستهدف السوق الجزائري المتنامي. يعتمد على استيراد أو شراء الملابس الجاهزة بالجملة وإعادة بيعها عبر منصات التواصل الاجتماعي (Facebook, Instagram, TikTok) مع التركيز على بناء علامة تجارية قوية، تقديم خدمة عملاء استثنائية، وتوفير خيارات دفع مرنة كالدفع عند الاستلام (COD) لضمان أعلى معدلات التحويل.",
    type: "ecommerce",
    minCapital: 100000,
    maxCapital: 1500000,
    riskLevel: 'medium',
    complexity: 2,
    skillLevelRequired: 2,
    scalability: 'high',
    roiMonths: 8,
    successRate: 75,
    tags: ["أزياء", "ملابس", "تجارة", "توصيل", "تسويق رقمي"],
    marketTrends: ["زيادة التسوق عبر الهاتف الذكي بنسبة 40% سنوياً", "الطلب المتزايد على الأزياء المحتشمة والعصرية", "هيمنة نموذج الدفع عند الاستلام (COD)"],
    requiredExperience: "معرفة أساسية بإدارة الحملات الإعلانية (Meta Ads)، مهارات التفاوض مع الموردين، وإدارة المخزون.",
    requiredTools: ["هاتف ذكي عالي الجودة للتصوير", "حاسوب محمول لإدارة الطلبات", "نظام إدارة محتوى (CMS) أو صفحة احترافية", "برامج تصميم بسيطة (Canva)"],
    localRegulations: ["سجل تجاري إلكتروني (إلزامي قانونياً)", "التسجيل في المركز الوطني للسجل التجاري (CNRC)", "قوانين حماية المستهلك الجزائرية"],
    seasonalTrends: ["مواسم الأعياد (الفطر والأضحى)", "العودة المدرسية والجامعية", "تغير الفصول (الصيف والشتاء)"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["أناقة دي زد (Anaqa DZ)", "تريند الجزاير (Trend DZ)", "مودا ستايل (Moda Style)"],
      marketingStrategy: "بناء قمع مبيعات (Sales Funnel) متكامل: إعلانات فيديو قصيرة على TikTok لجذب الانتباه، إعادة استهداف (Retargeting) على Instagram، وتقديم عروض حصرية للعملاء المتكررين. التركيز على المحتوى المرئي عالي الجودة وتجارب العملاء (UGC).",
    },
    sourcing: [
      { name: "سوق العلمة للجملة (شارع دبي)", location: "ولاية سطيف", contactType: "زيارة ميدانية (للتفاوض المباشر وفحص الجودة)" },
      { name: "سوق تاجنانت (الملابس الرياضية والكاجوال)", location: "ولاية ميلة", contactType: "زيارة ميدانية (للعقود طويلة الأمد)" },
      { name: "موردين من تركيا (عبر وكلاء الشحن)", location: "إسطنبول (عبر وكلاء في الجزائر)", contactType: "واتساب / وكيل شحن معتمد (لضمان التخليص الجمركي)" },
    ],
    legalSteps: [
      { task: "استخراج شهادة السوابق العدلية ونسخة من بطاقة التعريف", duration: "يوم واحد", cost: "مجانية" },
      { task: "التسجيل في المركز الوطني للسجل التجاري (CNRC) للحصول على سجل تجاري إلكتروني", duration: "48 إلى 72 ساعة", cost: "حوالي 5,000 د.ج" },
      { task: "فتح حساب بنكي تجاري (BADR, BDL, أو بنك خاص) لتسهيل المعاملات", duration: "أسبوع واحد", cost: "رسوم فتح الحساب (حوالي 10,000 د.ج كإيداع أولي)" },
      { task: "إبرام عقود رسمية مع شركات التوصيل (Yalidine, NordOuest, ZR Express)", duration: "3 إلى 5 أيام", cost: "مجانية (يتم اقتطاع عمولة التوصيل)" },
    ],
    financialRatios: {
      rent: 0.05,
      equipment: 0.15,
      inventory: 0.55,
      buffer: 0.25,
    },
    marketAnalysis: {
      targetAudience: "الشباب والنساء من سن 18 إلى 45 عاماً المهتمين بالموضة والتسوق المريح.",
      competitors: "المتاجر الكبرى والصفحات النشطة على فيسبوك وانستغرام.",
      swot: {
        strengths: ["تكاليف تشغيل منخفضة", "وصول واسع للجمهور", "سهولة البدء"],
        weaknesses: ["منافسة شرسة", "مشاكل المرتجعات", "الاعتماد على شركات التوصيل"],
        opportunities: ["التوسع في ملابس الأطفال", "إطلاق علامة تجارية خاصة"],
        threats: ["تغير خوارزميات المنصات", "تقلب أسعار الجملة"],
      }
    },
    detailedFinancials: {
      fixedCosts: [
        { item: "اشتراك المنصة والمتجر", cost: 5000 },
        { item: "خدمات الإنترنت والهاتف", cost: 3000 },
      ],
      variableCosts: [
        { item: "تكلفة البضاعة", cost: 50000 },
        { item: "إعلانات ممولة", cost: 20000 },
        { item: "تغليف وشحن", cost: 5000 },
      ],
      estimatedMonthlyRevenue: 120000,
      breakEvenMonths: 6,
    }
  },
  {
    id: "specialty-coffee-shop",
    title: "مقهى مختص (Specialty Coffee)",
    description: "مقهى عصري يقدم أنواعاً فاخرة من القهوة مع توفير بيئة عمل مريحة للشباب والطلاب.",
    type: "physical",
    minCapital: 1500000,
    maxCapital: 6000000,
    riskLevel: 'high',
    complexity: 4,
    skillLevelRequired: 4,
    scalability: 'medium',
    roiMonths: 18,
    successRate: 60,
    tags: ["قهوة", "خدمات", "محل", "ترفيه"],
    marketTrends: ["ثقافة القهوة المختصة المتنامية", "مساحات العمل المشتركة", "الحلويات المبتكرة"],
    requiredExperience: "خبرة في إدارة الضيافة أو شهادة باريستا محترف.",
    requiredTools: ["آلة قهوة احترافية", "مطحنة قهوة", "أدوات تحضير يدوية", "أثاث مقهى"],
    localRegulations: ["رخصة نشاط مقهى", "شهادة صحية", "عقد إيجار تجاري"],
    seasonalTrends: ["فصل الشتاء", "فترة الامتحانات"],
    environmentalImpact: 'medium',
    branding: {
      suggestedNames: ["كافيين لاب (Caffeine Lab)", "ركن القهوة", "أروما (Aroma)"],
      marketingStrategy: "خلق تجربة بصرية مميزة (ديكور)، تقديم ورشات تذوق، وبرنامج ولاء للزبائن الدائمين.",
    },
    sourcing: [
      { name: "محامص القهوة المختصة", location: "الجزائر العاصمة/وهران", contactType: "اتفاقية توريد" },
      { name: "موردي معدات المقاهي", location: "البليدة", contactType: "شراء مباشر" },
    ],
    legalSteps: [
      { task: "عقد إيجار تجاري موثق", duration: "أسبوع", cost: "عالية" },
      { task: "سجل تجاري نشاط مقهى", duration: "أسبوعين", cost: "متوسطة" },
      { task: "رخصة الصحة والنظافة", duration: "شهر", cost: "إدارية" },
    ],
    financialRatios: {
      rent: 0.30,
      equipment: 0.40,
      inventory: 0.15,
      buffer: 0.15,
    },
    marketAnalysis: {
      targetAudience: "الطلاب، الموظفون، وعشاق القهوة الذين يبحثون عن جودة عالية وبيئة هادئة.",
      competitors: "المقاهي التقليدية وسلاسل المقاهي العالمية والمحلية.",
      swot: {
        strengths: ["جودة منتج متفوقة", "ولاء زبائن قوي", "هوامش ربح جيدة"],
        weaknesses: ["تكاليف تأسيس عالية", "صعوبة إيجاد باريستا محترف"],
        opportunities: ["بيع حبوب القهوة المحمصة", "فتح فروع أخرى"],
        threats: ["ارتفاع أسعار البن العالمي", "تغير القدرة الشرائية"],
      }
    },
    detailedFinancials: {
      fixedCosts: [
        { item: "إيجار المحل", cost: 80000 },
        { item: "رواتب الموظفين", cost: 120000 },
        { item: "كهرباء وماء", cost: 15000 },
      ],
      variableCosts: [
        { item: "بن وحليب ومواد أولية", cost: 60000 },
        { item: "مواد تنظيف واستهلاكيات", cost: 10000 },
      ],
      estimatedMonthlyRevenue: 450000,
      breakEvenMonths: 14,
    }
  },
  {
    id: "hydroponics-farm",
    title: "مزرعة مائية حديثة (Hydroponics)",
    description: "إنتاج الخضروات الورقية والأعشاب باستخدام تقنيات الزراعة المائية الموفرة للمياه والمساحة.",
    type: "physical",
    minCapital: 2000000,
    maxCapital: 8000000,
    riskLevel: 'medium',
    complexity: 5,
    skillLevelRequired: 4,
    scalability: 'high',
    roiMonths: 24,
    successRate: 85,
    tags: ["زراعة", "تكنولوجيا", "بيئة", "غذاء"],
    marketTrends: ["الطلب على المنتجات العضوية", "الأمن الغذائي", "الزراعة الحضرية"],
    requiredExperience: "خلفية تقنية في الزراعة أو استعداد للتعلم العميق للأنظمة المائية.",
    requiredTools: ["أنظمة زراعة مائية", "مضخات مياه", "إضاءة LED", "أجهزة قياس الحموضة"],
    localRegulations: ["بطاقة فلاح", "اعتماد المصالح الفلاحية"],
    seasonalTrends: ["طوال العام"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["غرين تك (GreenTech)", "مزارع المستقبل", "نبتة"],
      marketingStrategy: "التعاقد المباشر مع المطاعم الفاخرة والفنادق، التسويق كمنتج صحي وخالٍ من المبيدات.",
    },
    sourcing: [
      { name: "موردي أنظمة الزراعة المائية", location: "البليدة/العاصمة", contactType: "شراء وتركيب" },
      { name: "موردي البذور والمحاليل", location: "محلي/مستورد", contactType: "توريد دوري" },
    ],
    legalSteps: [
      { task: "بطاقة فلاح", duration: "أسبوعين", cost: "منخفضة" },
      { task: "اعتماد المصالح الفلاحية", duration: "شهر", cost: "إدارية" },
      { task: "سجل تجاري مؤسسة مصغرة", duration: "أسبوع", cost: "متوسطة" },
    ],
    financialRatios: {
      rent: 0.15,
      equipment: 0.60,
      inventory: 0.10,
      buffer: 0.15,
    },
    marketAnalysis: {
      targetAudience: "المطاعم، الفنادق، ومحلات الخضر الراقية.",
      competitors: "الزراعة التقليدية والمستورد.",
      swot: {
        strengths: ["إنتاج طوال العام", "جودة عالية جداً", "توفير 90% من المياه"],
        weaknesses: ["تكلفة طاقة عالية", "حساسية النظام للأعطال"],
        opportunities: ["التوسع في الفواكه (الفراولة)", "بيع أنظمة منزلية"],
        threats: ["انقطاع التيار الكهربائي", "أمراض النباتات المفاجئة"],
      }
    },
    detailedFinancials: {
      fixedCosts: [
        { item: "كهرباء (إضاءة ومضخات)", cost: 40000 },
        { item: "إيجار المستودع/الأرض", cost: 30000 },
        { item: "عمالة مختصة", cost: 90000 },
      ],
      variableCosts: [
        { item: "بذور ومحاليل مغذية", cost: 25000 },
        { item: "تغليف وتوزيع", cost: 15000 },
      ],
      estimatedMonthlyRevenue: 380000,
      breakEvenMonths: 20,
    }
  },
  {
    id: "organic-food-delivery",
    title: "منصة توصيل المنتجات العضوية",
    description: "ربط المزارعين المحليين مباشرة بالمستهلكين في المدن لتوفير خضروات وفواكه طازجة وعضوية.",
    type: "ecommerce",
    minCapital: 200000,
    maxCapital: 1000000,
    riskLevel: 'medium',
    complexity: 3,
    skillLevelRequired: 3,
    scalability: 'high',
    roiMonths: 12,
    successRate: 70,
    tags: ["زراعة", "غذاء", "توصيل", "صحة"],
    marketTrends: ["الطلب على الأكل الصحي", "دعم المنتجات المحلية", "التسوق عبر الإنترنت"],
    requiredExperience: "معرفة بسلاسل التوريد والتعامل مع المزارعين.",
    requiredTools: ["تطبيق/موقع إلكتروني", "سيارات توصيل", "صناديق تغليف"],
    localRegulations: ["سجل تجاري", "شهادات صحية للمنتجات"],
    seasonalTrends: ["مواسم الحصاد"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["مزرعتي (Mazraati)", "طازج (Tazaj)", "أرضي (Ardi)"],
      marketingStrategy: "التركيز على جودة المنتج الطازج، القصص وراء المزارعين، والاشتراكات الأسبوعية.",
    },
    sourcing: [
      { name: "مزارع محلية", location: "مختلف الولايات", contactType: "تعاقد مباشر" },
    ],
    legalSteps: [
      { task: "سجل تجاري", duration: "أسبوع", cost: "متوسطة" },
      { task: "تصاريح نقل المواد الغذائية", duration: "شهر", cost: "متوسطة" },
    ],
    financialRatios: {
      rent: 0.10,
      equipment: 0.20,
      inventory: 0.40,
      buffer: 0.30,
    },
    marketAnalysis: {
      targetAudience: "العائلات المهتمة بالصحة، الرياضيون، والمطاعم الراقية.",
      competitors: "الأسواق التقليدية، محلات الخضار.",
      swot: {
        strengths: ["منتج طازج", "دعم المزارع المحلي", "طلب متزايد"],
        weaknesses: ["لوجستيات التوصيل", "تلف المنتجات"],
        opportunities: ["التوسع في المنتجات المصنعة (مربى، مخللات)", "اشتراكات شهرية"],
        threats: ["تقلبات الطقس", "المنافسة من الأسواق الكبرى"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "إيجار مخزن", cost: 30000 }, { item: "رواتب", cost: 60000 }],
      variableCosts: [{ item: "شراء المنتجات", cost: 100000 }, { item: "توصيل", cost: 30000 }],
      estimatedMonthlyRevenue: 250000,
      breakEvenMonths: 10,
    }
  },
  {
    id: "home-services-platform",
    title: "منصة خدمات المنزل (تنظيف وصيانة)",
    description: "تطبيق لربط أصحاب المنازل بمقدمي خدمات التنظيف والصيانة الموثوقين.",
    type: "ecommerce",
    minCapital: 500000,
    maxCapital: 2000000,
    riskLevel: 'medium',
    complexity: 4,
    skillLevelRequired: 3,
    scalability: 'high',
    roiMonths: 15,
    successRate: 65,
    tags: ["خدمات", "تكنولوجيا", "صيانة", "تنظيف"],
    marketTrends: ["الخدمات عند الطلب", "الحاجة للثقة في مقدمي الخدمات", "زيادة وتيرة الحياة"],
    requiredExperience: "إدارة العمليات، خدمة العملاء، والتسويق الرقمي.",
    requiredTools: ["تطبيق جوال", "نظام إدارة طلبات", "شبكة مقدمي خدمات"],
    localRegulations: ["سجل تجاري", "عقود عمل"],
    seasonalTrends: ["مواسم التنظيف (رمضان، الأعياد)"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["بيتي (Bayti)", "خدماتي (Khadamati)", "مساعد (Mosaed)"],
      marketingStrategy: "التركيز على الثقة، التحقق من هوية مقدمي الخدمات، والتقييمات.",
    },
    sourcing: [
      { name: "مقدمي خدمات مستقلين", location: "المدن الكبرى", contactType: "تعاقد" },
    ],
    legalSteps: [
      { task: "سجل تجاري", duration: "أسبوع", cost: "متوسطة" },
      { task: "عقود تأمين المسؤولية", duration: "أسبوعين", cost: "عالية" },
    ],
    financialRatios: {
      rent: 0.10,
      equipment: 0.10,
      inventory: 0.05,
      buffer: 0.75,
    },
    marketAnalysis: {
      targetAudience: "العائلات العاملة، كبار السن، المكاتب.",
      competitors: "العمل الفردي غير المنظم.",
      swot: {
        strengths: ["تنظيم سوق غير منظم", "سهولة الاستخدام", "الثقة"],
        weaknesses: ["صعوبة مراقبة الجودة", "إدارة مقدمي الخدمات"],
        opportunities: ["التوسع في خدمات أخرى (تجميل، تعليم)", "تغطية مدن جديدة"],
        threats: ["خروج مقدمي الخدمات من المنصة", "المنافسة"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "تطوير وصيانة التطبيق", cost: 50000 }, { item: "رواتب", cost: 100000 }],
      variableCosts: [{ item: "تسويق", cost: 40000 }, { item: "دعم فني", cost: 20000 }],
      estimatedMonthlyRevenue: 300000,
      breakEvenMonths: 12,
    }
  },
  {
    id: "online-tutoring-kids",
    title: "منصة تعليمية للأطفال (عن بعد)",
    description: "دروس دعم وتقوية للأطفال في المواد الأساسية والمهارات الرقمية عبر الإنترنت.",
    type: "ecommerce",
    minCapital: 100000,
    maxCapital: 500000,
    riskLevel: 'low',
    complexity: 3,
    skillLevelRequired: 4,
    scalability: 'high',
    roiMonths: 6,
    successRate: 80,
    tags: ["تعليم", "أطفال", "تكنولوجيا", "تنمية"],
    marketTrends: ["التعليم الرقمي", "الطلب على دروس الدعم", "المهارات الرقمية"],
    requiredExperience: "خبرة تعليمية، إدارة محتوى، وتواصل مع أولياء الأمور.",
    requiredTools: ["منصة تعليمية", "أدوات تفاعلية", "إنترنت سريع"],
    localRegulations: ["سجل تجاري", "تراخيص تعليمية (إن وجد)"],
    seasonalTrends: ["فترة الدراسة", "فترة الامتحانات"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["أكاديمية الصغار", "تعلم (Taalam)", "مستقبلي (Mostaqbali)"],
      marketingStrategy: "التركيز على النتائج الأكاديمية، المعلمين المتميزين، والتفاعل.",
    },
    sourcing: [
      { name: "معلمين مستقلين", location: "الجزائر", contactType: "تعاقد" },
    ],
    legalSteps: [
      { task: "سجل تجاري", duration: "أسبوع", cost: "متوسطة" },
    ],
    financialRatios: {
      rent: 0.05,
      equipment: 0.20,
      inventory: 0.05,
      buffer: 0.70,
    },
    marketAnalysis: {
      targetAudience: "أولياء الأمور المهتمين بتعليم أبنائهم.",
      competitors: "مدارس الدعم التقليدية.",
      swot: {
        strengths: ["تكاليف منخفضة", "مرونة الوقت", "وصول واسع"],
        weaknesses: ["ضعف الإنترنت", "صعوبة التفاعل مع الأطفال"],
        opportunities: ["التوسع في لغات أجنبية", "برمجة للأطفال"],
        threats: ["المنافسة من اليوتيوب", "تغير المناهج"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "منصة تعليمية", cost: 10000 }, { item: "رواتب", cost: 50000 }],
      variableCosts: [{ item: "تسويق", cost: 20000 }, { item: "عمولات معلمين", cost: 40000 }],
      estimatedMonthlyRevenue: 150000,
      breakEvenMonths: 4,
    }
  },
  {
    id: "recycling-service",
    title: "خدمة جمع وتدوير النفايات",
    description: "جمع النفايات القابلة للتدوير (بلاستيك، ورق، معادن) من المنازل والمؤسسات.",
    type: "physical",
    minCapital: 500000,
    maxCapital: 3000000,
    riskLevel: 'medium',
    complexity: 4,
    skillLevelRequired: 3,
    scalability: 'medium',
    roiMonths: 20,
    successRate: 65,
    tags: ["بيئة", "تدوير", "خدمات", "صناعة"],
    marketTrends: ["الوعي البيئي", "القوانين البيئية", "الاقتصاد الدائري"],
    requiredExperience: "إدارة نفايات، لوجستيك، وعلاقات مع مصانع التحويل.",
    requiredTools: ["شاحنات جمع", "مكبس نفايات", "مخزن"],
    localRegulations: ["رخص بيئية", "سجل تجاري"],
    seasonalTrends: ["طوال العام"],
    environmentalImpact: 'high',
    branding: {
      suggestedNames: ["إيكو (EcoDZ)", "تدوير (Tadwir)", "نظيف (Nadhif)"],
      marketingStrategy: "التركيز على المسؤولية الاجتماعية، الحفاظ على البيئة، والتعاون مع البلديات.",
    },
    sourcing: [
      { name: "مصانع التحويل", location: "مختلف الولايات", contactType: "تعاقد" },
    ],
    legalSteps: [
      { task: "رخصة بيئية", duration: "شهرين", cost: "عالية" },
      { task: "سجل تجاري", duration: "أسبوع", cost: "متوسطة" },
    ],
    financialRatios: {
      rent: 0.20,
      equipment: 0.50,
      inventory: 0.05,
      buffer: 0.25,
    },
    marketAnalysis: {
      targetAudience: "المؤسسات، المطاعم، والمنازل الواعية.",
      competitors: "الجامعون غير الرسميين.",
      swot: {
        strengths: ["أثر بيئي إيجابي", "طلب متزايد على المواد الخام", "دعم حكومي"],
        weaknesses: ["تكاليف لوجستية عالية", "صعوبة فرز النفايات"],
        opportunities: ["التوسع في تحويل البلاستيك", "شراكات مع البلديات"],
        threats: ["تقلب أسعار المواد الخام", "المنافسة غير الرسمية"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "إيجار مخزن", cost: 40000 }, { item: "رواتب", cost: 100000 }],
      variableCosts: [{ item: "وقود وصيانة", cost: 50000 }, { item: "عمالة فرز", cost: 30000 }],
      estimatedMonthlyRevenue: 300000,
      breakEvenMonths: 18,
    }
  },
  {
    id: "tourism-booking-platform",
    title: "منصة حجز تجارب سياحية",
    description: "منصة لحجز تجارب سياحية محلية (رحلات، ورشات حرفية، تجارب ثقافية) في الجزائر.",
    type: "ecommerce",
    minCapital: 300000,
    maxCapital: 1500000,
    riskLevel: 'high',
    complexity: 4,
    skillLevelRequired: 3,
    scalability: 'high',
    roiMonths: 14,
    successRate: 55,
    tags: ["سياحة", "ثقافة", "تكنولوجيا", "ترفيه"],
    marketTrends: ["السياحة الداخلية", "التجارب الفريدة", "الرقمنة"],
    requiredExperience: "تسويق سياحي، علاقات عامة، وتطوير منصات.",
    requiredTools: ["منصة حجز", "شبكة مرشدين وحرفيين"],
    localRegulations: ["سجل تجاري", "تراخيص سياحية"],
    seasonalTrends: ["العطل المدرسية", "فصل الصيف"],
    environmentalImpact: 'low',
    branding: {
      suggestedNames: ["اكتشف (Iktashif)", "جزائرنا (Jazairouna)", "رحلة (Rihla)"],
      marketingStrategy: "التركيز على الصور والفيديوهات الجذابة، تجارب حصرية، والتعاون مع مدوني السفر.",
    },
    sourcing: [
      { name: "مرشدين سياحيين", location: "مختلف الولايات", contactType: "تعاقد" },
    ],
    legalSteps: [
      { task: "سجل تجاري", duration: "أسبوع", cost: "متوسطة" },
      { task: "تراخيص سياحية", duration: "شهر", cost: "عالية" },
    ],
    financialRatios: {
      rent: 0.05,
      equipment: 0.15,
      inventory: 0.05,
      buffer: 0.75,
    },
    marketAnalysis: {
      targetAudience: "السياح المحليون والأجانب، الشباب.",
      competitors: "وكالات السفر التقليدية.",
      swot: {
        strengths: ["تجارب فريدة", "سهولة الحجز", "تنشيط السياحة المحلية"],
        weaknesses: ["صعوبة إقناع الحرفيين", "الموسمية"],
        opportunities: ["التوسع في سياحة المغامرات", "شراكات مع الفنادق"],
        threats: ["الاستقرار الأمني", "المنافسة من الوكالات"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "تطوير المنصة", cost: 30000 }, { item: "رواتب", cost: 80000 }],
      variableCosts: [{ item: "تسويق", cost: 50000 }, { item: "دعم عملاء", cost: 20000 }],
      estimatedMonthlyRevenue: 250000,
      breakEvenMonths: 12,
    }
  },
  {
    id: "mobile-car-wash",
    title: "خدمة غسيل السيارات المتنقلة",
    description: "خدمة غسيل وتلميع السيارات في مكان تواجد الزبون (المنزل أو العمل).",
    type: "physical",
    minCapital: 150000,
    maxCapital: 600000,
    riskLevel: 'low',
    complexity: 2,
    skillLevelRequired: 2,
    scalability: 'medium',
    roiMonths: 5,
    successRate: 85,
    tags: ["سيارات", "خدمات", "راحة", "تنظيف"],
    marketTrends: ["الخدمات عند الطلب", "الاهتمام بمظهر السيارة", "توفير الوقت"],
    requiredExperience: "مهارات تنظيف السيارات، خدمة عملاء.",
    requiredTools: ["سيارة مجهزة", "أدوات تنظيف", "مواد تلميع"],
    localRegulations: ["سجل تجاري", "تصاريح بيئية (للمياه)"],
    seasonalTrends: ["طوال العام"],
    environmentalImpact: 'medium',
    branding: {
      suggestedNames: ["لمسة (Lamsa)", "بريق (Bariq)", "سيارتي (Sayarati)"],
      marketingStrategy: "التركيز على الراحة (نأتي إليك)، الجودة، والسرعة.",
    },
    sourcing: [
      { name: "موردي مواد التنظيف", location: "الجزائر", contactType: "شراء مباشر" },
    ],
    legalSteps: [
      { task: "سجل تجاري", duration: "أسبوع", cost: "منخفضة" },
    ],
    financialRatios: {
      rent: 0.05,
      equipment: 0.40,
      inventory: 0.20,
      buffer: 0.35,
    },
    marketAnalysis: {
      targetAudience: "الموظفون المشغولون، العائلات.",
      competitors: "محطات الغسيل التقليدية.",
      swot: {
        strengths: ["راحة للزبون", "تكاليف منخفضة", "مرونة"],
        weaknesses: ["صعوبة الوصول للمياه", "عدد محدود من السيارات"],
        opportunities: ["التوسع في خدمات أخرى (تغيير زيت)", "اشتراكات شهرية"],
        threats: ["المنافسة من المحطات", "ارتفاع أسعار الوقود"],
      }
    },
    detailedFinancials: {
      fixedCosts: [{ item: "صيانة السيارة", cost: 10000 }, { item: "رواتب", cost: 40000 }],
      variableCosts: [{ item: "مواد تنظيف", cost: 15000 }, { item: "وقود", cost: 10000 }],
      estimatedMonthlyRevenue: 120000,
      breakEvenMonths: 4,
    }
  }
];
