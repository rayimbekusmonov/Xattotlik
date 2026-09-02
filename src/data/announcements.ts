export interface Announcement {
  id: string;
  tagUz: string;
  tagRu: string;
  tagEn: string;
  tagAr: string;
  dateUz: string;
  dateRu: string;
  dateEn: string;
  dateAr: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  titleAr: string;
  descUz: string;
  descRu: string;
  descEn: string;
  descAr: string;
  actionType: "enroll" | "gallery" | "courses" | "link";
  actionUrl?: string;
  isUrgent?: boolean;
}

export const announcementsData: Announcement[] = [
  {
    id: "ann-1",
    tagUz: "Qabul 2026",
    tagRu: "Прием 2026",
    tagEn: "Admission 2026",
    tagAr: "قبول ٢٠٢٦",
    dateUz: "2026-yil sentabr",
    dateRu: "Сентябрь 2026",
    dateEn: "September 2026",
    dateAr: "سبتمبر ٢٠٢٦",
    titleUz: "Xattotlik maktabiga bepul kurslarga qabul boshlandi",
    titleRu: "Открыт прием на бесплатные курсы в школу каллиграфии",
    titleEn: "Admission open for 100% free calligraphy programs",
    titleAr: "بدء استقبال طلبات التسجيل في دورات الخط العربي المجانية",
    descUz: "Sulus, Nasx, Devoniy, Nastaliq va Riq'iy xatlari bo'yicha yangi o'quv guruhlariga ro'yxatdan o'tish davom etmoqda. O'quv anjomlari bepul taqdim etiladi.",
    descRu: "Идет набор в группы по стилям Сулюс, Насх, Дивани, Насталик и Рика. Все необходимые принадлежности для каллиграфии предоставляются бесплатно.",
    descEn: "Enrollment is now ongoing for Thuluth, Naskh, Diwani, Nastaliq, and Ruq'ah courses. All calligraphy materials and tools are provided free of charge.",
    descAr: "التسجيل مفتوح في مجموعات خطوط الثلث والنسخ والديواني والنستعليق والرقعة. يتم توفير كافة أدوات ومستلزمات الخط مجاناً لجميع الطلاب.",
    actionType: "enroll",
    isUrgent: true,
  },
  {
    id: "ann-2",
    tagUz: "Mahorat darsi",
    tagRu: "Мастер-класс",
    tagEn: "Masterclass",
    tagAr: "ورشة عمل",
    dateUz: "Har shanba 14:00",
    dateRu: "Каждую субботу 14:00",
    dateEn: "Every Saturday 14:00",
    dateAr: "كل سبت ١٤:٠٠",
    titleUz: "Usta-xattotlar bilan bevosita amaliy ochiq darslar",
    titleRu: "Открытые практические занятия с признанными мастерами",
    titleEn: "Live practical masterclasses with master calligraphers",
    titleAr: "دروس عملية مفتوحة مع نخبة من كبار أساتذة الخط العربي",
    descUz: "Markazimizning yetuk ustozlari ishtirokida qamish qalam tarash, tabiiy siyoh tayyorlash va mumtoz nisbatlar bo'yicha mahorat darslariga taklif etamiz.",
    descRu: "Приглашаем на практические занятия по заточке тростникового пера, изготовлению натуральных чернил и каллиграфическим пропорциям.",
    descEn: "Join exclusive practical sessions covering traditional reed pen cutting, natural ink preparation, and classical letter proportions.",
    descAr: "ندعوكم للمشاركة في ورش العمل حول بري أقلام القصب وصناعة الأحبار الطبيعية ودراسة أصول ونسب الحروف التقليدية.",
    actionType: "courses",
    isUrgent: false,
  },
  {
    id: "ann-3",
    tagUz: "Ko'rgazma",
    tagRu: "Выставка",
    tagEn: "Exhibition",
    tagAr: "معرض فني",
    dateUz: "Doimiy ekspozitsiya",
    dateRu: "Постоянная экспозиция",
    dateEn: "Permanent Exhibition",
    dateAr: "معرض دائم",
    titleUz: "Noyob tarixiy qo'lyozmalar va bitiklar ko'rgazmasi",
    titleRu: "Выставка редких исторических рукописей и шедевров",
    titleEn: "Exhibition of rare historical manuscripts and masterworks",
    titleAr: "معرض المخطوطات والرقوق التاريخية والروائع الفنية",
    descUz: "Islom Sivilizatsiyasi Markazi fondidagi 2000 dan ortiq nodir qo'lyozmalar va zamonaviy xattotlik ustalari asarlari namoyish etilmoqda.",
    descRu: "В залах Центра исламской цивилизации представлены более 2000 редких исторических рукописей и произведения лучших современных мастеров.",
    descEn: "Explore over 2,000 rare manuscripts and distinguished contemporary calligraphic masterpieces preserved at the Center of Islamic Civilization.",
    descAr: "استمتع بمشاهدة أكثر من ٢٠٠٠ مخطوطة تاريخية نادرة وأعمال كبار خطاطي العصر الحديث في مركز الحضارة الإسلامية.",
    actionType: "gallery",
    isUrgent: false,
  },
];
