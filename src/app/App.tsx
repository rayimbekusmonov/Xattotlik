import { useState, useEffect, useRef, useCallback } from "react";
import {
  Instagram,
  Youtube,
  Phone,
  MapPin,
  Mail,
  Menu,
  X,
  PenLine,
  Droplet,
  Star,
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  ArrowUp,
  Quote,
  ChevronLeft,
  ZoomIn,
  CheckCircle,
  Send,
  Globe,
  ChevronDown,
} from "lucide-react";

import logoImg from "../assets/logo.JPG";
import partnerImg from "../assets/partner.png";

/* ── Translations Dictionary ──────────────────────────────────────────── */
type Locale = "uz" | "en" | "ru" | "ar";

const translations = {
  uz: {
    brand: {
      sub: "Islom Sivilizatsiyasi Markazi",
      title: "Xattotlik Markazi",
      full: "Islom Sivilizatsiyasi Markazi — Abu Dabi",
    },
    nav: {
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      gallery: "Galereya",
      courses: "Kurslar",
      contact: "Aloqa",
      enrol: "Hozir ro'yxatdan o'ting",
    },
    hero: {
      titlePre: "San'ati",
      titleItalic: "Abadiy Bitik",
      subtitle: "Merosni asrab, kelajakni shakllantiramiz",
      discover: "Galereyamizni kashf eting",
      learnMore: "Batafsil ma'lumot",
      scroll: "Pastga",
    },
    stats: {
      students: "Tashrif buyuruvchilar va talabalar",
      nations: "Millatlar vakillari",
      manuscripts: "Tarixiy qo'lyozmalar",
      heritage: "Yillik meros",
    },
    about: {
      label: "Bizning tariximiz",
      title: "Markaz haqida",
      est: "Tashkil etilgan 1989-yil — Abu Dabi",
      sub: "Muqaddas bitikning tirik arxivi",
      p1: "1989-yilda Islom Sivilizatsiyasi Markazi homiyligida tashkil etilgan Xattotlik Markazi klassik arab va islom xattotligini o'rganish, saqlash va rivojlantirishga bag'ishlangan arab dunyosining eng nufuzli muassasalaridan biridir.",
      p2: "Uch o'n yillik davomida biz 60 ta davlatdan 4000 dan ortiq talabalarni tayyorladik, 2000 dan ortiq tarixiy qo'lyozmalardan iborat jonli arxivni saqlab keldik va xalqaro miqyosda tan olingan mohir xattotlar jamoasini tarbiyaladik.",
      prominent: "Taniqli mohir xattotlar",
      specialties: {
        hassan: "Sulus va Nasx — Istanbul an'anasi",
        layla: "Kufiy geometrik — Andalusiya uslubi",
        karim: "Devoniy Jaliy — Qohira akademiyasi",
      },
      explore: "Bizning dasturlarimizni o'rganing",
    },
    gallery: {
      label: "To'plam",
      title: "Virtual Galereya",
      desc: "Bizning doimiy to'plamimiz va bitiruvchilar ko'rgazmalaridan olingan, sakkizta klassik arab xattotligi uslubini qamrab olgan eng sara asarlar jamlanmasi.",
      viewDetails: "Tafsilotlarni ko'rish",
      requestViewing: "Shaxsiy tomosha so'rash",
      items: {
        basmala: "Basmala kompozitsiyasi",
        quranic: "Qur'on oyatlari paneli",
        sacred: "Muqaddas ismlar turkumi",
        hilya: "Hilya kompozitsiyasi",
        geometric: "Geometrik uyg'unlik",
        intertwined: "Chirmashgan ismlar",
      },
      styles: {
        thuluth: "Sulus xati",
        naskh: "Nasx xati",
        kufic: "Kufiy xati",
        diwani: "Devoniy xati",
        sulus: "Sulus xati",
        tughra: "Tug'ro xati",
      },
    },
    courses: {
      label: "Bugun a'zo bo'ling",
      title: "Ta'lim dasturlari",
      desc: "Mohir xattotlar tomonidan ishlab chiqilgan tizimli o'quv yo'llari — birinchi chiziqlardan tortib ko'rgazmaga tayyor mahoratgacha.",
      levelBeginner: "Boshlang'ich",
      levelIntermediate: "O'rta",
      levelMaster: "Master-klass",
      beginnerTitle: "Yozuv asoslari",
      beginnerDesc: "Klassik arab harflarining asosiy chiziqlari, asboblari va mutanosibliklarini o'zlashtiring. Mutlaqo tajribaga ega bo'lmaganlar uchun juda mos keladi.",
      intermediateTitle: "Nasx va Sulus mahorati",
      intermediateDesc: "Murakkab kompozitsiyalar va tarixiy qo'lyozmalarni o'rganish orqali ikkita eng muhim klassik yozuv bo'yicha bilimlaringizni chuqurlashtiring.",
      masterTitle: "Zarhal berish san'ati",
      masterDesc: "Istanbul va Qohiradan kelgan mukofotga sazovor bo'lgan ustozlar rahbarligida xattotlikni an'anaviy islomiy zarhal berish bilan birlashtirgan intensiv dastur.",
      duration: "Davomiyligi",
      schedule: "Dars jadvali",
      fee: "Dastur to'lovi",
      register: "Hozir ro'yxatdan o'ting",
      features: {
        kit: "Qamish qalam va siyoh to'plami kiritilgan",
        sheets: "Raqamli mashq varaqlari",
        cert: "Tugatganlik to'g'risida sertifikat",
        premiumKit: "Premium xattotlik to'plami",
        feedback: "Yakkama-yakka fikr-mulohazalar",
        portfolio: "Portfolioni rivojlantirish",
        goldKit: "Nodir pigment va oltin barglar to'plami",
        international: "Xalqaro mehmon ustozlar",
        exhibition: "Yakuniy ko'rgazma namoyishi",
      },
      popular: "Eng mashhur",
    },
    testimonials: {
      label: "Bizning hamjamiyatimizdan",
      title: "Talabalar fikri",
      items: [
        {
          text: "Markaz arab yozuvi haqidagi tasavvurimni butunlay o'zgartirdi. Shayx Hasanning sabri va mahorati tengsiz. Mening Nasx yozuvim to'rt oy ichida o'n barobar yaxshilandi.",
          role: "O'rta bosqich bitiruvchisi, 2023",
        },
        {
          text: "Arab tilini bilmasdan Buyuk Britaniyadan kelgan bo'lsam-da, meni juda iliq kutib olishdi va alohida g'amxo'rlik bilan yo'naltirishdi. Bu yerdagi hamjamiyat haqiqatan ham xalqaro va ilhomlantiruvchidir.",
          role: "Boshlang'ich bosqich bitiruvchisi, 2024",
        },
        {
          text: "Zarhal berish master-klassi hayotimni o'zgartirgan tajriba bo'ldi. Yakuniy ko'rgazma ustida Qohira va Istanbuldan kelgan ustozlar bilan birga ishlash mening ijodiy faoliyatimning eng yorqin lahzasi bo'ldi.",
          role: "Master-klass bitiruvchisi, 2022",
        },
      ],
    },
    contact: {
      label: "Biz bilan bog'lanish",
      title: "Markaz bilan bog'lanish",
      address: "Manzil",
      addressVal: "Islom Sivilizatsiyasi Markazi\nSaadiyat oroli, Abu Dabi, BAA",
      phone: "Telefon",
      email: "Elektron pochta",
      enquiryTitle: "Yangiliklar va so'rovlar",
      enquirySub: "Merosimiz bilan bog'liq bo'ling",
      successTitle: "Xabar qabul qilindi — Shukran!",
      successDesc: "Biz 24 soat ichida javob beramiz.",
      nameLabel: "To'liq ismingiz",
      namePlaceholder: "Sizning ismingiz",
      emailLabel: "Elektron pochta manzili",
      emailPlaceholder: "sizning@elektron.pochta",
      messageLabel: "Xabar",
      messagePlaceholder: "Sizning so'rovingiz yoki xabaringiz...",
      send: "Xabar yuborish",
      requiredNotice: "* bilan belgilangan maydonlar to'ldirilishi shart",
      validation: {
        name: "Ism kiritilishi shart",
        email: "Elektron pochta kiritilishi shart",
        validEmail: "Iltimos, haqiqiy elektron pochta manzilini kiriting",
        message: "Xabar kiritilishi shart",
      },
    },
    lightbox: {
      viewing: "Ko'rilmoqda",
      close: "Yopish",
      prev: "Oldingi asar",
      next: "Keyingi asar",
      navigateHint: "Navigatsiya uchun o'q tugmalaridan foydalaning",
    },
  },
  en: {
    brand: {
      sub: "Center of Islamic Civilization",
      title: "Calligraphy Center",
      full: "Center of Islamic Civilization — Abu Dhabi",
    },
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      courses: "Courses",
      contact: "Contact",
      enrol: "Enrol Now",
    },
    hero: {
      titlePre: "The Art of",
      titleItalic: "Eternal Script",
      subtitle: "Preserving Heritage, Shaping Future",
      discover: "Discover Our Gallery",
      learnMore: "Learn More",
      scroll: "Scroll",
    },
    stats: {
      students: "Students Trained",
      nations: "Nations Represented",
      manuscripts: "Historical Manuscripts",
      heritage: "Years of Heritage",
    },
    about: {
      label: "Our Story",
      title: "About The Center",
      est: "Est. 1989 — Abu Dhabi",
      sub: "A Living Archive of Sacred Script",
      p1: "Founded under the patronage of the Center of Islamic Civilization in 1989, our Calligraphy Center stands as one of the Arab world's foremost institutions dedicated to the study, preservation, and advancement of classical Arabic and Islamic scripts.",
      p2: "Over three decades, we have trained more than 4,000 students from 60 nations, maintained a living archive of over 2,000 historical manuscripts, and nurtured a faculty of internationally recognized master calligraphers.",
      prominent: "Prominent Master Calligraphers",
      specialties: {
        hassan: "Thuluth & Naskh — Istanbul Tradition",
        layla: "Kufic Geometric — Andalusian Style",
        karim: "Diwani Jali — Cairo Academy",
      },
      explore: "Explore Our Programs",
    },
    gallery: {
      label: "The Collection",
      title: "Virtual Gallery",
      desc: "A curated selection of masterworks spanning eight classical Arabic scripts, drawn from our permanent collection and alumni exhibitions.",
      viewDetails: "View Details",
      requestViewing: "Request Private Viewing",
      items: {
        basmala: "Basmala Composition",
        quranic: "Quranic Verse Panel",
        sacred: "Sacred Name Series",
        hilya: "Hilya Composition",
        geometric: "Geometric Harmony",
        intertwined: "Intertwined Names",
      },
      styles: {
        thuluth: "Thuluth Script",
        naskh: "Naskh Script",
        kufic: "Kufic Script",
        diwani: "Diwani Script",
        sulus: "Sulus Script",
        tughra: "Tughra Script",
      },
    },
    courses: {
      label: "Enroll Today",
      title: "Educational Programs",
      desc: "Structured learning paths designed by master calligraphers — from first strokes to exhibition-ready mastery.",
      levelBeginner: "Beginner",
      levelIntermediate: "Intermediate",
      levelMaster: "Masterclass",
      beginnerTitle: "Foundation of Script",
      beginnerDesc: "Master the foundational strokes, tools, and proportions of classical Arabic letterforms. Perfect for those with no prior experience.",
      intermediateTitle: "Naskh & Thuluth Mastery",
      intermediateDesc: "Deepen your command of the two most important classical scripts with advanced compositions and historical manuscript studies.",
      masterTitle: "The Art of Illumination",
      masterDesc: "An intensive program combining calligraphy with traditional Islamic illumination, led by award-winning masters from Istanbul and Cairo.",
      duration: "Duration",
      schedule: "Schedule",
      fee: "Program Fee",
      register: "Register Now",
      features: {
        kit: "Reed pen & ink kit included",
        sheets: "Digital practice sheets",
        cert: "Certificate upon completion",
        premiumKit: "Premium calligraphy set",
        feedback: "One-on-one feedback sessions",
        portfolio: "Portfolio development",
        goldKit: "Rare pigment & gold leaf kit",
        international: "International guest masters",
        exhibition: "Final exhibition showcase",
      },
      popular: "Most Popular",
    },
    testimonials: {
      label: "From Our Community",
      title: "Student Voices",
      items: [
        {
          text: "The Center completely transformed my understanding of Arabic script. Sheikh Hassan's patience and mastery are unparalleled. My Naskh improved tenfold in just four months.",
          role: "Intermediate Graduate, 2023",
        },
        {
          text: "Coming from the UK with zero Arabic background, I was warmly welcomed and guided with exceptional care. The community here is truly international and inspiring.",
          role: "Beginner Graduate, 2024",
        },
        {
          text: "The illumination masterclass was a life-changing experience. Working alongside masters from Cairo and Istanbul on the final exhibition was the highlight of my artistic career.",
          role: "Masterclass Graduate, 2022",
        },
      ],
    },
    contact: {
      label: "Get In Touch",
      title: "Contact the Center",
      address: "Address",
      addressVal: "Center of Islamic Civilization\nSaadiyat Island, Abu Dhabi, UAE",
      phone: "Phone",
      email: "Email",
      enquiryTitle: "Newsletter & Enquiries",
      enquirySub: "Stay Connected with Our Heritage",
      successTitle: "Message Received — Shukran!",
      successDesc: "We will respond within 24 hours.",
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Your enquiry, course interest, or message...",
      send: "Send Message",
      requiredNotice: "Fields marked with * are required",
      validation: {
        name: "Name is required",
        email: "Email is required",
        validEmail: "Please enter a valid email",
        message: "Message is required",
      },
    },
    lightbox: {
      viewing: "Viewing",
      close: "Close gallery",
      prev: "Previous artwork",
      next: "Next artwork",
      navigateHint: "Use arrow keys to navigate",
    },
  },
  ru: {
    brand: {
      sub: "Центр исламской цивилизации",
      title: "Центр каллиграфии",
      full: "Центр исламской цивилизации — Абу-Даби",
    },
    nav: {
      home: "Главная",
      about: "О нас",
      gallery: "Галерея",
      courses: "Курсы",
      contact: "Контакты",
      enrol: "Записаться",
    },
    hero: {
      titlePre: "Искусство",
      titleItalic: "Вечного Письма",
      subtitle: "Сохраняя наследие, формируя будущее",
      discover: "Посетить галерею",
      learnMore: "Подробнее",
      scroll: "Листайте вниз",
    },
    stats: {
      students: "Обученных студентов",
      nations: "Представленных стран",
      manuscripts: "Исторических рукописей",
      heritage: "Лет наследия",
    },
    about: {
      label: "Наша история",
      title: "О Центре",
      est: "Основан в 1989 году — Абу-Даби",
      sub: "Живой архив священной письменности",
      p1: "Основанный под покровительством Центра исламской цивилизации в 1989 году, наш Центр каллиграфии является одним из ведущих учреждений арабского мира, посвященных изучению, сохранению и развитию классической арабской и исламской письменности.",
      p2: "За три десятилетия мы обучили более 4000 студентов из 60 стран, сохранили живой архив из более чем 2000 исторических рукописей и вырастили плеяду всемирно признанных мастеров каллиграфии.",
      prominent: "Выдающиеся мастера каллиграфии",
      specialties: {
        hassan: "Сулюс и насх — Стамбульская традиция",
        layla: "Куфический геометрический — Андалузский стиль",
        karim: "Дивани Джали — Каирская академия",
      },
      explore: "Изучить наши программы",
    },
    gallery: {
      label: "Коллекция",
      title: "Виртуальная галерея",
      desc: "Кураторская подборка шедевров, охватывающих восемь классических арабских шрифтов, из нашей постоянной коллекции и выставок выпускников.",
      viewDetails: "Подробнее",
      requestViewing: "Заказать частный показ",
      items: {
        basmala: "Композиция Басмала",
        quranic: "Панель Коранического стиха",
        sacred: "Серия Священных имен",
        hilya: "Композиция Хилья",
        geometric: "Геометрическая гармония",
        intertwined: "Переплетенные имена",
      },
      styles: {
        thuluth: "Шрифт Сулюс",
        naskh: "Шрифт Насх",
        kufic: "Куфический шрифт",
        diwani: "Шрифт Дивани",
        sulus: "Шрифт Сулюс",
        tughra: "Шрифт Тугра",
      },
    },
    courses: {
      label: "Запишитесь сегодня",
      title: "Образовательные программы",
      desc: "Структурированные программы обучения, разработанные мастерами каллиграфии — от первых штрихов до уровня выставочных работ.",
      levelBeginner: "Начальный",
      levelIntermediate: "Средний",
      levelMaster: "Мастер-класс",
      beginnerTitle: "Основы письма",
      beginnerDesc: "Освойте базовые штрихи, инструменты и пропорции классических арабских букв. Идеально подходит для начинающих без опыта.",
      intermediateTitle: "Мастерство Насх и Сулюс",
      intermediateDesc: "Углубите свои знания двух важнейших классических шрифтов с помощью сложных композиций и изучения исторических рукописей.",
      masterTitle: "Искусство иллюминирования",
      masterDesc: "Интенсивная программа, сочетающая каллиграфию с традиционным исламским золочением, под руководством выдающихся мастеров из Стамбула и Каира.",
      duration: "Продолжительность",
      schedule: "Расписание",
      fee: "Стоимость обучения",
      register: "Зарегистрироваться",
      features: {
        kit: "Набор из тростникового пера и чернил включен",
        sheets: "Цифровые тренировочные листы",
        cert: "Сертификат об окончании",
        premiumKit: "Премиальный каллиграфический набор",
        feedback: "Индивидуальные сессии обратной связи",
        portfolio: "Развитие портфолио",
        goldKit: "Набор редких пигментов и сусального золота",
        international: "Приглашенные зарубежные мастера",
        exhibition: "Финальная выставка работ",
      },
      popular: "Самый популярный",
    },
    testimonials: {
      label: "От нашего сообщества",
      title: "Голоса студентов",
      items: [
        {
          text: "Центр полностью изменил мое понимание арабской письменности. Терпение и мастерство шейха Хассана не имеют равных. Мой насх улучшился в десять раз всего за четыре месяца.",
          role: "Выпускник среднего курса, 2023",
        },
        {
          text: "Приехав из Великобритании без знания арабского языка, я встретил невероятно теплый прием и заботу. Сообщество здесь по-настоящему международное и вдохновляющее.",
          role: "Выпускник начального курса, 2024",
        },
        {
          text: "Мастер-класс по иллюминированию изменил мою жизнь. Совместная работа над финальной выставкой с мастерами из Каира и Стамбула стала вершиной моей творческой карьеры.",
          role: "Выпускник мастер-класса, 2022",
        },
      ],
    },
    contact: {
      label: "Связаться с нами",
      title: "Контакты Центра",
      address: "Адрес",
      addressVal: "Центр исламской цивилизации\nОстров Саадият, Абу-Даби, ОАЭ",
      phone: "Телефон",
      email: "Электронная почта",
      enquiryTitle: "Новости и запросы",
      enquirySub: "Оставайтесь на связи с нашим наследием",
      successTitle: "Сообщение получено — Шукран!",
      successDesc: "Мы ответим в течение 24 часов.",
      nameLabel: "Полное имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Адрес электронной почты",
      emailPlaceholder: "your@email.com",
      messageLabel: "Сообщение",
      messagePlaceholder: "Ваш запрос, интересующий курс или сообщение...",
      send: "Отправить сообщение",
      requiredNotice: "Поля, отмеченные *, обязательны для заполнения",
      validation: {
        name: "Имя обязательно",
        email: "Электронная почта обязательна",
        validEmail: "Пожалуйста, введите корректный email",
        message: "Сообщение обязательно",
      },
    },
    lightbox: {
      viewing: "Просмотр",
      close: "Закрыть галерею",
      prev: "Предыдущая работа",
      next: "Следующая работа",
      navigateHint: "Используйте клавиши со стрелками для навигации",
    },
  },
  ar: {
    brand: {
      sub: "مركز الحضارة الإسلامية",
      title: "مركز الخط العربي",
      full: "مركز الحضارة الإسلامية — أبوظبي",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      gallery: "المعرض",
      courses: "الدورات",
      contact: "اتصل بنا",
      enrol: "سجل الآن",
    },
    hero: {
      titlePre: "فن",
      titleItalic: "الحرف الخالد",
      subtitle: "نصون التراث، ونصنع المستقبل",
      discover: "اكتشف معرضنا",
      learnMore: "اقرأ المزيد",
      scroll: "انزل للأسفل",
    },
    stats: {
      students: "طالب وطالبة",
      nations: "دولة ممثلة",
      manuscripts: "مخطوطة تاريخية",
      heritage: "عاماً من التراث",
    },
    about: {
      label: "قصتنا",
      title: "عن المركز",
      est: "تأسس عام 1989 — أبوظبي",
      sub: "أرشيف حي للحرف المقدس",
      p1: "تأسس مركز الخط العربي عام 1989 تحت رعاية مركز الحضارة الإسلامية، ويعد أحد أبرز المؤسسات في العالم العربي المكرسة لدراسة الخطوط العربية والإسلامية الكلاسيكية وحفظها وتطويرها.",
      p2: "على مدار ثلاثة عقود، قمنا بتدريب أكثر من 4000 طالب من 60 جنسية مختلفة، وحفظنا أرشيفاً حياً يضم أكثر من 2000 مخطوطة تاريخية، ونخرّج نخبة من كبار الخطاطين المعترف بهم دولياً.",
      prominent: "أبرز أساتذة الخط العربي",
      specialties: {
        hassan: "الثلث والنسخ — مدرسة إسطنبول",
        layla: "الكوفي الهندسي — الأسلوب الأندلسي",
        karim: "الديواني الجلي — أكاديمية القاهرة",
      },
      explore: "استكشف برامجنا",
    },
    gallery: {
      label: "المجموعة الأثرية",
      title: "المعرض الافتراضي",
      desc: "مجموعة منسقة من الروائع الفنية التي تغطي ثمانية خطوط عربية كلاسيكية، مستوحاة من مجموعتنا الدائمة ومعارض الخريجين.",
      viewDetails: "عرض التفاصيل",
      requestViewing: "طلب عرض خاص",
      items: {
        basmala: "لوحة البسملة",
        quranic: "لوحة الآيات القرآنية",
        sacred: "سلسلة الأسماء المقدسة",
        hilya: "لوحة الحلية الشريفة",
        geometric: "التناغم الهندسي",
        intertwined: "الأسماء المتداخلة",
      },
      styles: {
        thuluth: "خط الثلث",
        naskh: "خط النسخ",
        kufic: "الخط الكوفي",
        diwani: "الخط الديواني",
        sulus: "خط الثلث",
        tughra: "خط الطغراء",
      },
    },
    courses: {
      label: "سجل اليوم",
      title: "البرامج التعليمية",
      desc: "مسارات تعليمية منظمة ومصممة من قبل كبار الخطاطين — من الخطوات الأولى إلى التميز والاحترافية الجاهزة للمعارض.",
      levelBeginner: "مبتدئ",
      levelIntermediate: "متوسط",
      levelMaster: "دروس الماجستير",
      beginnerTitle: "أساسيات الخط العربي",
      beginnerDesc: "أتقن الحركات الأساسية والأدوات والنسب للحروف العربية الكلاسيكية. مثالي لمن ليس لديهم خبرة سابقة.",
      intermediateTitle: "إتقان النسخ والثلث",
      intermediateDesc: "عمّق تمكنك من أهم خطين كلاسيكيين من خلال التراكيب المتقدمة ودراسة المخطوطات التاريخية.",
      masterTitle: "فن التذهيب والزخرفة",
      masterDesc: "برنامج مكثف يجمع بين الخط العربي والزخرفة والتذهيب الإسلامي التقليدي، بقيادة أساتذة حائزين على جوائز من إسطنبول والقاهرة.",
      duration: "المدة",
      schedule: "الجدول الدراسي",
      fee: "رسوم البرنامج",
      register: "سجل الآن",
      features: {
        kit: "حقيبة قلم القصب والحبر متضمنة",
        sheets: "أوراق تدريب رقمية",
        cert: "شهادة معتمدة عند التخرج",
        premiumKit: "أدوات خط عربي فاخرة",
        feedback: "جلسات توجيه فردية ومباشرة",
        portfolio: "تطوير الملف الفني الشخصي",
        goldKit: "حقيبة الألوان النادرة وورق الذهب",
        international: "أساتذة وخبراء دوليون زائرون",
        exhibition: "المعرض الختامي للخريجين",
      },
      popular: "الأكثر طلباً",
    },
    testimonials: {
      label: "من مجتمعنا الفني",
      title: "أصداء الطلاب",
      items: [
        {
          text: "لقد غيّر المركز مفهومي تماماً عن الحرف العربي. إن صبر الشيخ حسن ومهارته لا مثيل لهما. لقد تحسن خط النسخ لدي عشرة أضعاف في أربعة أشهر فقط.",
          role: "خريج المستوى المتوسط، 2023",
        },
        {
          text: "قدمت من المملكة المتحدة دون أي خلفية باللغة العربية، وقد تم الترحيب بي وتوجيهي بعناية فائقة. المجتمع هنا دولي وملهم حقاً.",
          role: "خريج المستوى المبتدئ، 2024",
        },
        {
          text: "كان درس تذهيب المخطوطات تجربة غيرت حياتي الفنية. العمل إلى جانب أساتذة من القاهرة وإسطنبول في المعرض الختامي كان أبرز محطات مسيرتي الفنية.",
          role: "خريج مستوى الماستر، 2022",
        },
      ],
    },
    contact: {
      label: "تواصل معنا",
      title: "الاتصال بالمركز",
      address: "العنوان",
      addressVal: "مركز الحضارة الإسلامية\nجزيرة السعديات، أبوظبي، الإمارات العربية المتحدة",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      enquiryTitle: "النشرة الإخبارية والاستفسارات",
      enquirySub: "ابق على تواصل مع تراثنا العريق",
      successTitle: "تم استلام رسالتك — شكراً لك!",
      successDesc: "سوف نقوم بالرد عليك في غضون 24 ساعة.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "اسمك الكريم",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "your@email.com",
      messageLabel: "الرسالة",
      messagePlaceholder: "استفسارك، اهتمامك بالدورات، أو رسالتك...",
      send: "إرسال الرسالة",
      requiredNotice: "الحقول المميزة بنجمة * مطلوبة",
      validation: {
        name: "الاسم مطلوب",
        email: "البريد الإلكتروني مطلوب",
        validEmail: "يرجى إدخال بريد إلكتروني صحيح",
        message: "محتوى الرسالة مطلوب",
      },
    },
    lightbox: {
      viewing: "عرض لوحة",
      close: "إغلاق المعرض",
      prev: "اللوحة السابقة",
      next: "اللوحة التالية",
      navigateHint: "استخدم أسهم لوحة المفاتيح للتنقل",
    },
  },
};

/* ── Gallery artwork mapping with translations ────────────────────────── */
const getGalleryItems = (t: typeof translations.en) => [
  {
    id: 1,
    title: t.gallery.items.basmala,
    style: t.gallery.styles.thuluth,
    img: "https://images.unsplash.com/photo-1603801571246-be066de0c73b?w=800&h=960&fit=crop&auto=format",
    height: "h-72",
  },
  {
    id: 2,
    title: t.gallery.items.quranic,
    style: t.gallery.styles.naskh,
    img: "https://images.unsplash.com/photo-1646229227468-ba6eb534d368?w=800&h=680&fit=crop&auto=format",
    height: "h-56",
  },
  {
    id: 3,
    title: t.gallery.items.sacred,
    style: t.gallery.styles.kufic,
    img: "https://images.unsplash.com/photo-1676928117296-66bc2882ec6a?w=800&h=820&fit=crop&auto=format",
    height: "h-64",
  },
  {
    id: 4,
    title: t.gallery.items.hilya,
    style: t.gallery.styles.diwani,
    img: "https://images.unsplash.com/photo-1601480905449-90fca867ad37?w=800&h=900&fit=crop&auto=format",
    height: "h-80",
  },
  {
    id: 5,
    title: t.gallery.items.geometric,
    style: t.gallery.styles.sulus,
    img: "https://images.unsplash.com/photo-1603224288850-cf0a7939278c?w=800&h=700&fit=crop&auto=format",
    height: "h-60",
  },
  {
    id: 6,
    title: t.gallery.items.intertwined,
    style: t.gallery.styles.tughra,
    img: "https://images.unsplash.com/photo-1700306692751-1fd5f2b88443?w=800&h=840&fit=crop&auto=format",
    height: "h-68",
  },
];

/* ── Course mapping with translations ─────────────────────────────────── */
const getCourses = (t: typeof translations.en) => [
  {
    level: t.courses.levelBeginner,
    title: t.courses.beginnerTitle,
    description: t.courses.beginnerDesc,
    duration: `12 ${t.locale === "ar" ? "أسبوعاً" : t.locale === "ru" ? "недель" : t.locale === "uz" ? "hafta" : "Weeks"}`,
    schedule: t.locale === "ar" ? "السبت 10:00–13:00" : t.locale === "ru" ? "Суббота 10:00–13:00" : t.locale === "uz" ? "Shanba 10:00–13:00" : "Saturdays 10:00–13:00",
    price: t.locale === "ar" ? "٢,٤٠٠ درهم" : "AED 2,400",
    icon: <PenLine className="w-7 h-7" />,
    features: [t.courses.features.kit, t.courses.features.sheets, t.courses.features.cert],
    featured: false,
  },
  {
    level: t.courses.levelIntermediate,
    title: t.courses.intermediateTitle,
    description: t.courses.intermediateDesc,
    duration: `16 ${t.locale === "ar" ? "أسبوعاً" : t.locale === "ru" ? "недель" : t.locale === "uz" ? "hafta" : "Weeks"}`,
    schedule: t.locale === "ar" ? "الأربعاء 18:00–21:00" : t.locale === "ru" ? "Среда 18:00–21:00" : t.locale === "uz" ? "Chorshanba 18:00–21:00" : "Wednesdays 18:00–21:00",
    price: t.locale === "ar" ? "٣,٨٠٠ درهم" : "AED 3,800",
    icon: <Droplet className="w-7 h-7" />,
    features: [t.courses.features.premiumKit, t.courses.features.feedback, t.courses.features.portfolio],
    featured: true,
  },
  {
    level: t.courses.levelMaster,
    title: t.courses.masterTitle,
    description: t.courses.masterDesc,
    duration: `20 ${t.locale === "ar" ? "أسبوعاً" : t.locale === "ru" ? "недель" : t.locale === "uz" ? "hafta" : "Weeks"}`,
    schedule: t.locale === "ar" ? "الجمعة 09:00–14:00" : t.locale === "ru" ? "Пятница 09:00–14:00" : t.locale === "uz" ? "Juma 09:00–14:00" : "Fridays 09:00–14:00",
    price: t.locale === "ar" ? "٦,٢٠٠ درهم" : "AED 6,200",
    icon: <Star className="w-7 h-7" />,
    features: [t.courses.features.goldKit, t.courses.features.international, t.courses.features.exhibition],
    featured: false,
  },
];

/* ── Scroll reveal hook ────────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Animated counter ─────────────────────────────────────────────────── */
function useCounter(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const t = { ...translations[locale], locale };
  const galleryItems = getGalleryItems(t as any);
  const courseItems = getCourses(t as any);

  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll reveal refs
  const aboutReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const coursesReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();

  // Animated counters
  const studentsCount = useCounter(4000, statsReveal.visible);
  const nationsCount = useCounter(60, statsReveal.visible);
  const manuscriptsCount = useCounter(2000, statsReveal.visible);
  const mastersCount = useCounter(35, statsReveal.visible);

  // Close language menu on outside click
  const langDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "about", "gallery", "courses", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Auto-cycle testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % t.testimonials.items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [t.testimonials.items.length]);

  // Smooth scroll handler
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  }, []);

  // Lightbox navigation
  const openLightbox = (item: typeof galleryItems[0]) => {
    const idx = galleryItems.findIndex((g) => g.id === item.id);
    setLightboxIndex(idx);
    setLightboxItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
    document.body.style.overflow = "";
  }, []);

  const lightboxPrev = useCallback(() => {
    const idx = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(idx);
    setLightboxItem(galleryItems[idx]);
  }, [lightboxIndex, galleryItems]);

  const lightboxNext = useCallback(() => {
    const idx = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(idx);
    setLightboxItem(galleryItems[idx]);
  }, [lightboxIndex, galleryItems]);

  // Keyboard handler for lightbox
  useEffect(() => {
    if (!lightboxItem) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxItem, closeLightbox, lightboxPrev, lightboxNext]);

  // Form validation
  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) errors.name = t.contact.validation.name;
    if (!formData.email.trim()) {
      errors.email = t.contact.validation.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.contact.validation.validEmail;
    }
    if (!formData.message.trim()) errors.message = t.contact.validation.message;
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setFormData({ name: "", email: "", message: "" });
  };

  const languages: { code: Locale; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇦🇪" },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif", scrollBehavior: "smooth" }}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* ────────────────────────────────────────────────────────────────
          1. NAVIGATION
      ──────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF9F6]/97 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/20"
            : "bg-[#FAF9F6]/80 backdrop-blur-sm"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Brand */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded text-left"
            aria-label="Go to homepage"
          >
            <img
              src={logoImg}
              alt="Official Logo"
              className="w-11 h-11 object-contain rounded-full border border-[#D4AF37]/35 bg-white p-0.5"
            />
            <div className={`${locale === "ar" ? "text-right" : "text-left"}`}>
              <p
                className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-medium leading-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t.brand.sub}
              </p>
              <p
                className="text-[#005F40] text-base font-semibold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.brand.title}
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8" role="menubar">
            {["Home", "About", "Gallery", "Courses", "Contact"].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              const translatedLabel = t.nav[id as keyof typeof t.nav];
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  role="menuitem"
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1 ${
                    isActive ? "text-[#D4AF37]" : "text-[#005F40] hover:text-[#D4AF37]"
                  }`}
                >
                  {translatedLabel}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Premium Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 rounded text-[#005F40] text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Switch language"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>{languages.find((l) => l.code === locale)?.flag}</span>
                <span className="hidden xl:inline">{languages.find((l) => l.code === locale)?.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute ${locale === "ar" ? "left-0" : "right-0"} mt-2 w-40 bg-white border border-[#D4AF37]/25 shadow-xl rounded-sm py-1.5 z-[60]`}
                  role="menu"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangMenuOpen(false);
                      }}
                      role="menuitem"
                      className={`w-full px-4 py-2 text-sm text-left flex items-center gap-3 transition-colors ${
                        locale === lang.code
                          ? "bg-[#005F40]/10 text-[#005F40] font-semibold"
                          : "text-foreground hover:bg-[#FAF9F6]"
                      }`}
                      style={{ textAlign: locale === "ar" ? "right" : "left" }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo("courses")}
              className="px-6 py-2.5 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold tracking-wide rounded-sm hover:bg-[#004530] active:bg-[#003520] transition-all duration-200 border border-[#005F40] hover:border-[#004530] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {t.nav.enrol}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Language Button (simple switcher) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center justify-center w-9 h-9 border border-[#D4AF37]/30 rounded text-[#005F40] transition-colors focus:outline-none"
                aria-label="Switch language"
              >
                <Globe className="w-4 h-4 text-[#D4AF37]" />
              </button>
              {langMenuOpen && (
                <div
                  className={`absolute ${locale === "ar" ? "left-0" : "right-0"} mt-2 w-32 bg-white border border-[#D4AF37]/25 shadow-lg rounded-sm py-1 z-[60]`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs text-left flex items-center gap-2 ${
                        locale === lang.code ? "bg-[#005F40]/10 text-[#005F40]" : "text-foreground"
                      }`}
                      style={{ textAlign: locale === "ar" ? "right" : "left" }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="text-[#005F40] p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors hover:text-[#D4AF37]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div
                className="transition-transform duration-300"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#FAF9F6]/99 backdrop-blur-md border-t border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-1">
            {["Home", "About", "Gallery", "Courses", "Contact"].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              const translatedLabel = t.nav[id as keyof typeof t.nav];
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={`text-base font-medium py-3 border-b border-[#D4AF37]/10 text-left transition-colors duration-200 focus:outline-none ${
                    isActive ? "text-[#D4AF37]" : "text-[#005F40] hover:text-[#D4AF37]"
                  }`}
                  style={{ textAlign: locale === "ar" ? "right" : "left" }}
                >
                  {translatedLabel}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("courses")}
              className="mt-3 px-6 py-3 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold text-center tracking-wide rounded-sm hover:bg-[#004530] transition-colors duration-200"
            >
              {t.nav.enrol}
            </button>
          </div>
        </div>
      </nav>

      {/* ────────────────────────────────────────────────────────────────
          2. HERO SECTION
      ──────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#003828]"
        aria-label="Hero"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1646229227468-ba6eb534d368?w=1920&h=1080&fit=crop&auto=format')",
          }}
          role="img"
          aria-label="Background calligraphy artwork"
        />
        {/* Dark emerald overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002A1C]/85 via-[#003828]/80 to-[#002A1C]/90" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpolygon points='40,4 49,28 74,28 54,45 63,73 40,56 17,73 26,45 6,28 31,28' fill='none' stroke='%23D4AF37' stroke-width='0.6' opacity='0.7'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%23D4AF37' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Gold corner ornaments */}
        <div className="absolute top-28 left-8 lg:left-16 w-20 h-20 text-[#D4AF37] opacity-30 animate-pulse" style={{ animationDuration: "4s" }}>
          <StarTile />
        </div>
        <div className="absolute top-28 right-8 lg:right-16 w-20 h-20 text-[#D4AF37] opacity-30 animate-pulse" style={{ animationDuration: "5s" }}>
          <StarTile />
        </div>
        <div className="absolute bottom-16 left-8 lg:left-16 w-16 h-16 text-[#D4AF37] opacity-20">
          <StarTile />
        </div>
        <div className="absolute bottom-16 right-8 lg:right-16 w-16 h-16 text-[#D4AF37] opacity-20">
          <StarTile />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6 font-medium animate-[fadeInDown_0.8s_ease_0.2s_both]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.brand.full}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-[fadeIn_0.8s_ease_0.4s_both]">
            <div className="w-12 h-px bg-[#D4AF37]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="w-12 h-px bg-[#D4AF37]/60" />
          </div>

          <h1
            className="text-5xl lg:text-7xl font-normal text-white mb-4 leading-none tracking-tight animate-[fadeInUp_0.8s_ease_0.5s_both]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.hero.titlePre}{" "}
            <em className="italic text-[#D4AF37]" style={{ fontStyle: "italic" }}>
              {t.hero.titleItalic}
            </em>
          </h1>

          <div className="flex items-center justify-center gap-3 my-8 animate-[fadeIn_0.8s_ease_0.7s_both]">
            <div className="w-16 h-px bg-[#D4AF37]/40" />
            <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60" />
            <div className="w-16 h-px bg-[#D4AF37]/40" />
          </div>

          <p
            className="text-[#EDE8DC]/80 text-lg lg:text-xl mb-10 tracking-wide font-light max-w-xl mx-auto animate-[fadeInUp_0.8s_ease_0.8s_both]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_0.8s_ease_1s_both]">
            <button
              onClick={() => scrollTo("gallery")}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] active:bg-[#B08D22] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.hero.discover}
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#D4AF37]/50 text-[#FAF9F6] text-sm font-medium tracking-widest uppercase hover:bg-white/10 hover:border-[#D4AF37]/80 active:bg-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.hero.learnMore}
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none group"
          aria-label="Scroll down"
        >
          <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </button>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          3. STATS STRIP
      ──────────────────────────────────────────────────────────────── */}
      <div
        ref={statsReveal.ref}
        className={`bg-[#005F40] py-12 transition-all duration-700 ${
          statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
            {[
              { value: studentsCount, suffix: "+", label: t.stats.students },
              { value: nationsCount, suffix: "+", label: t.stats.nations },
              { value: manuscriptsCount, suffix: "+", label: t.stats.manuscripts },
              { value: mastersCount, suffix: "+", label: t.stats.heritage },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p
                  className="text-4xl lg:text-5xl font-bold text-[#D4AF37]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.locale === "ar" ? stat.value.toLocaleString("ar-EG") : stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-white/70 text-xs tracking-widest uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────
          4. ABOUT THE CENTER
      ──────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div
            ref={aboutReveal.ref}
            className={`text-center mb-20 transition-all duration-700 ${
              aboutReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.about.title}
            </h2>
            <GoldDivider />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: image */}
            <div
              className={`relative transition-all duration-700 delay-200 ${
                aboutReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative overflow-hidden bg-[#EDE8DC] mb-10 lg:mb-0">
                <img
                  src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=800&h=900&fit=crop&auto=format"
                  alt="Master calligrapher practicing Thuluth script with a reed pen"
                  className="w-full h-[560px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gold border frame */}
                <div className="absolute inset-4 border border-[#D4AF37]/40 pointer-events-none" />
                <div className="absolute inset-3 border border-[#D4AF37]/20 pointer-events-none" />
              </div>

              {/* Floating stat card */}
              <div className={`absolute -bottom-6 ${locale === "ar" ? "-left-6" : "-right-6"} bg-[#005F40] text-white px-8 py-6 shadow-xl hidden lg:block`}>
                <p
                  className="text-4xl font-bold text-[#D4AF37] leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  35+
                </p>
                <p className="text-xs tracking-widest uppercase text-white/70 mt-1 font-medium">
                  {t.stats.heritage}
                </p>
              </div>

              {/* Decorative corner */}
              <div className={`absolute -top-4 ${locale === "ar" ? "-right-4" : "-left-4"} w-16 h-16 text-[#D4AF37] opacity-40`}>
                <StarTile />
              </div>
            </div>

            {/* Right: text */}
            <div
              className={`lg:pl-8 transition-all duration-700 delay-300 ${
                aboutReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <SectionLabel>{t.about.est}</SectionLabel>
              <h3
                className="text-3xl lg:text-4xl text-[#1C2B3A] mb-6 font-normal leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.about.sub}
              </h3>
              <div className="w-12 h-0.5 bg-[#D4AF37] mb-6" />
              <p className="text-[#4A5568] leading-relaxed mb-5 text-[15px]">
                {t.about.p1}
              </p>
              <p className="text-[#4A5568] leading-relaxed mb-8 text-[15px]">
                {t.about.p2}
              </p>

              {/* Masters */}
              <div className="space-y-4 mb-8">
                <p
                  className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t.about.prominent}
                </p>
                {[
                  { name: "Sheikh Hassan Al-Farsi", specialty: t.about.specialties.hassan },
                  { name: "Dr. Layla Al-Mansoori", specialty: t.about.specialties.layla },
                  { name: "Ustad Karim Diab", specialty: t.about.specialties.karim },
                ].map((m) => (
                  <div key={m.name} className="flex items-start gap-3">
                    <div className="w-1 h-1 rotate-45 bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#1C2B3A] font-semibold text-sm">{m.name}</p>
                      <p className="text-[#6B7280] text-xs mt-0.5">{m.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partner Logo */}
              <div className="mt-8 mb-6 pt-6 border-t border-[#D4AF37]/20">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                  {locale === "ar" ? "الشريك الاستراتيجي" : locale === "ru" ? "Стратегический партнер" : locale === "uz" ? "Strategik hamkor" : "Strategic Partner"}
                </p>
                <img
                  src={partnerImg}
                  alt="Strategic Partner"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <button
                onClick={() => scrollTo("courses")}
                className="group inline-flex items-center gap-2 text-[#005F40] text-sm font-semibold tracking-wide hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
              >
                {t.about.explore}
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          5. VIRTUAL GALLERY
      ──────────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-28 bg-[#EDE8DC]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={galleryReveal.ref}
            className={`text-center mb-20 transition-all duration-700 ${
              galleryReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionLabel>{t.gallery.label}</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.gallery.title}
            </h2>
            <GoldDivider />
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px] leading-relaxed">
              {t.gallery.desc}
            </p>
          </div>

          {/* 3-column masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className={`break-inside-avoid group relative overflow-hidden bg-white border border-[#D4AF37]/20 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-[#D4AF37]/50 ${
                  galleryReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title} — ${item.style}`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(item)}
              >
                <div className={`${item.height} overflow-hidden bg-[#EDE8DC] relative`}>
                  <img
                    src={item.img}
                    alt={`${item.title} — ${item.style}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Zoom hint icon */}
                  <div className={`absolute top-3 ${locale === "ar" ? "left-3" : "right-3"} w-8 h-8 bg-[#002A1C]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-[#002A1C]/85 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <p
                    className="text-white text-lg text-center font-normal px-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium">
                    {item.style}
                  </p>
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <div className="mt-2 px-6 py-2 border border-[#D4AF37]/60 text-[#D4AF37] text-xs tracking-widest uppercase font-semibold flex items-center gap-2">
                    <ZoomIn className="w-3.5 h-3.5" />
                    {t.gallery.viewDetails}
                  </div>
                </div>

                {/* Default label */}
                <div className="px-5 py-4 border-t border-[#D4AF37]/20">
                  <p
                    className="text-[#1C2B3A] font-medium text-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[#D4AF37] text-xs tracking-wide font-medium mt-0.5">{item.style}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => scrollTo("contact")}
              className="px-10 py-4 border border-[#005F40] text-[#005F40] text-sm font-semibold tracking-widest uppercase hover:bg-[#005F40] hover:text-white active:bg-[#004530] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005F40]"
            >
              {t.gallery.requestViewing}
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          6. EDUCATIONAL PROGRAMS
      ──────────────────────────────────────────────────────────────── */}
      <section id="courses" className="py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={coursesReveal.ref}
            className={`text-center mb-20 transition-all duration-700 ${
              coursesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionLabel>{t.courses.label}</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.courses.title}
            </h2>
            <GoldDivider />
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px] leading-relaxed">
              {t.courses.desc}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courseItems.map((course, i) => (
              <div
                key={course.level}
                className={`relative flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  course.featured
                    ? "bg-[#005F40] text-white shadow-lg"
                    : "bg-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/60"
                } ${
                  coursesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {course.featured && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1C2B3A] text-[10px] font-bold tracking-[0.25em] uppercase px-6 py-1.5">
                    {t.courses.popular}
                  </div>
                )}

                <div className="p-8 flex-1">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center mb-6 ${
                      course.featured ? "bg-white/10 text-[#D4AF37]" : "bg-[#EDE8DC] text-[#005F40]"
                    }`}
                  >
                    {course.icon}
                  </div>

                  <p
                    className="text-xs tracking-[0.2em] uppercase font-semibold mb-1 text-[#D4AF37]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {course.level}
                  </p>
                  <h3
                    className={`text-xl font-normal mb-4 ${
                      course.featured ? "text-white" : "text-[#1C2B3A]"
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {course.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      course.featured ? "text-white/75" : "text-[#6B7280]"
                    }`}
                  >
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div
                    className={`space-y-2.5 mb-6 text-sm ${
                      course.featured ? "text-white/70" : "text-[#4A5568]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t.courses.duration}: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t.courses.schedule}: {course.schedule}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div
                    className={`space-y-2 mb-8 ${
                      course.featured ? "border-t border-white/20" : "border-t border-[#D4AF37]/15"
                    } pt-6`}
                  >
                    {course.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-xs">
                        <div
                          className="w-1 h-1 rotate-45 mt-1.5 flex-shrink-0 bg-[#D4AF37]"
                        />
                        <span className={course.featured ? "text-white/75" : "text-[#6B7280]"}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div
                  className={`px-8 py-6 border-t ${
                    course.featured ? "border-white/20" : "border-[#D4AF37]/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs uppercase tracking-widest ${
                        course.featured ? "text-white/50" : "text-[#6B7280]"
                      }`}
                    >
                      {t.courses.fee}
                    </span>
                    <span
                      className={`text-xl font-bold ${
                        course.featured ? "text-[#D4AF37]" : "text-[#005F40]"
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {course.price}
                    </span>
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className={`w-full py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      course.featured
                        ? "bg-[#D4AF37] text-[#1C2B3A] hover:bg-[#C49D2A] active:bg-[#B08D22] focus-visible:ring-[#D4AF37]"
                        : "bg-[#005F40] text-white hover:bg-[#004530] active:bg-[#003520] focus-visible:ring-[#005F40]"
                    }`}
                  >
                    {t.courses.register}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          7. TESTIMONIALS
      ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#003020] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={testimonialsReveal.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionLabel>{t.testimonials.label}</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-white font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.testimonials.title}
            </h2>
            <GoldDivider />
          </div>

          <div
            className={`relative transition-all duration-700 delay-200 ${
              testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Current testimonial */}
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-10 h-10 text-[#D4AF37]/40 mx-auto mb-6 animate-pulse" />
              <p
                className="text-white/85 text-lg leading-relaxed mb-8 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{t.testimonials.items[testimonialIndex].text}"
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <img
                  src={testimonialIndex === 0
                    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
                    : testimonialIndex === 1
                    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
                    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
                  }
                  alt={testimonialIndex === 0 ? "Fatima Al-Rashidi" : testimonialIndex === 1 ? "James Whitmore" : "Dr. Aisha Mahmoud"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/40"
                  loading="lazy"
                />
                <div className={`${locale === "ar" ? "text-right" : "text-left"}`}>
                  <p className="text-white font-semibold text-sm">
                    {testimonialIndex === 0 ? "Fatima Al-Rashidi" : testimonialIndex === 1 ? "James Whitmore" : "Dr. Aisha Mahmoud"}
                  </p>
                  <p className="text-[#D4AF37] text-xs tracking-wider mt-0.5">
                    {t.testimonials.items[testimonialIndex].role}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setTestimonialIndex((i) => (i - 1 + t.testimonials.items.length) % t.testimonials.items.length)}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className={`w-4 h-4 ${locale === "ar" ? "rotate-180" : ""}`} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {t.testimonials.items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`transition-all duration-300 rounded-full focus:outline-none ${
                        i === testimonialIndex
                          ? "w-6 h-2 bg-[#D4AF37]"
                          : "w-2 h-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setTestimonialIndex((i) => (i + 1) % t.testimonials.items.length)}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className={`w-4 h-4 ${locale === "ar" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          8. CONTACT & FOOTER
      ──────────────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#003020] text-white">
        {/* Contact row */}
        <div className="border-b border-[#D4AF37]/15">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: info + map */}
              <div>
                <SectionLabel>{t.contact.label}</SectionLabel>
                <h2
                  className="text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.locale === "ar" ? "اتصل بـ" : t.locale === "ru" ? "Связаться с" : t.locale === "uz" ? "Bog'lanish" : "Contact the"}{" "}
                  <em style={{ fontStyle: "italic", color: "#D4AF37" }}>
                    {t.locale === "ar" ? "المركز" : t.locale === "ru" ? "Центром" : t.locale === "uz" ? "Markaz" : "Center"}
                  </em>
                </h2>
                <GoldDivider />

                <div className="space-y-5 mb-10">
                  {[
                    {
                      icon: <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: t.contact.address,
                      value: t.contact.addressVal,
                      href: "https://maps.google.com/?q=Saadiyat+Island+Abu+Dhabi",
                    },
                    {
                      icon: <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: t.contact.phone,
                      value: t.locale === "ar" ? "+٩٧١ ٢ ٤٠١ ٧٠٠٠" : "+971 2 401 7000",
                      href: "tel:+97124017000",
                    },
                    {
                      icon: <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: t.contact.email,
                      value: "calligraphy@islamicciv.ae",
                      href: "mailto:calligraphy@islamicciv.ae",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded text-left"
                    >
                      <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-medium mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map embed */}
                <div className="relative h-52 bg-[#002A1C] border border-[#D4AF37]/20 overflow-hidden rounded-sm">
                  <iframe
                    title="Calligraphy Center Location — Saadiyat Island, Abu Dhabi"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=54.40,24.53,54.45,24.56&layer=mapnik&marker=24.547,54.422"
                    className="w-full h-full opacity-70"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
                </div>
              </div>

              {/* Right: contact form */}
              <div>
                <p
                  className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t.contact.enquiryTitle}
                </p>
                <h3
                  className="text-2xl font-normal text-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.locale === "ar" ? "ابق على تواصل مع" : t.locale === "ru" ? "Будьте на связи с нашим" : t.locale === "uz" ? "Merosimiz bilan" : "Stay Connected with Our"}{" "}
                  <em style={{ fontStyle: "italic", color: "#D4AF37" }}>
                    {t.locale === "ar" ? "تراثنا" : t.locale === "ru" ? "наследием" : t.locale === "uz" ? "bog'laning" : "Heritage"}
                  </em>
                </h3>

                {formSent ? (
                  <div className="py-12 text-center border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-sm">
                    <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[#D4AF37] font-semibold tracking-wide text-lg">
                      {t.contact.successTitle}
                    </p>
                    <p className="text-white/50 text-sm mt-2">{t.contact.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    {[
                      { id: "name", label: t.contact.nameLabel, type: "text", placeholder: t.contact.namePlaceholder },
                      { id: "email", label: t.contact.emailLabel, type: "email", placeholder: t.contact.emailPlaceholder },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2"
                        >
                          {field.label} <span className="text-red-400">*</span>
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={formData[field.id as "name" | "email"]}
                          onChange={(e) => {
                            setFormData({ ...formData, [field.id]: e.target.value });
                            if (formErrors[field.id as "name" | "email"]) {
                              setFormErrors({ ...formErrors, [field.id]: undefined });
                            }
                          }}
                          className={`w-full bg-[#002A1C] border ${
                            formErrors[field.id as "name" | "email"]
                              ? "border-red-500/60 focus:border-red-500"
                              : "border-[#D4AF37]/20 focus:border-[#D4AF37]/60"
                          } text-white placeholder-white/25 px-4 py-3 text-sm outline-none transition-colors duration-200`}
                          aria-describedby={formErrors[field.id as "name" | "email"] ? `${field.id}-error` : undefined}
                          aria-invalid={!!formErrors[field.id as "name" | "email"]}
                        />
                        {formErrors[field.id as "name" | "email"] && (
                          <p id={`${field.id}-error`} className="text-red-400 text-xs mt-1" role="alert">
                            {formErrors[field.id as "name" | "email"]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2"
                      >
                        {t.contact.messageLabel} <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder={t.contact.messagePlaceholder}
                        required
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                        }}
                        className={`w-full bg-[#002A1C] border ${
                          formErrors.message
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-[#D4AF37]/20 focus:border-[#D4AF37]/60"
                        } text-white placeholder-white/25 px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none`}
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                        aria-invalid={!!formErrors.message}
                      />
                      {formErrors.message && (
                        <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] active:bg-[#B08D22] transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      <Send className={`w-4 h-4 ${locale === "ar" ? "rotate-180" : ""}`} />
                      {t.contact.send}
                    </button>
                    <p className="text-white/30 text-xs text-center">
                      {t.contact.requiredNotice}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
          >
            <img
              src={logoImg}
              alt="Official Logo"
              className="w-9 h-9 object-contain rounded-full border border-[#D4AF37]/35 bg-white p-0.5"
            />
            <div className={`${locale === "ar" ? "text-right" : "text-left"}`}>
              <p className="text-[#D4AF37] text-xs tracking-widest font-medium">{t.brand.title}</p>
              <p className="text-white/30 text-[10px]">{t.brand.sub}</p>
            </div>
          </button>

          <p className="text-white/30 text-[11px] tracking-wide text-center">
            {t.locale === "ar"
              ? "© ٢٠٢٤ مركز الحضارة الإسلامية — أبوظبي. جميع الحقوق محفوظة."
              : t.locale === "ru"
              ? "© 2024 Центр исламской цивилизации — Абу-Даби. Все права защищены."
              : t.locale === "uz"
              ? "© 2024 Islom Sivilizatsiyasi Markazi — Abu Dabi. Barcha huquqlar himoyalangan."
              : "© 2024 Center of Islamic Civilization — Abu Dhabi. All rights reserved."}
          </p>

          {/* Social & Partner */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">
                {locale === "ar" ? "بالشراكة مع" : locale === "ru" ? "В партнерстве с" : locale === "uz" ? "Hamkorlikda" : "In Partnership with"}
              </span>
              <img
                src={partnerImg}
                alt="Partner Logo"
                className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#D4AF37]/20" />
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch us on YouTube"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="mailto:calligraphy@islamicciv.ae"
              aria-label="Email us"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>

      {/* ────────────────────────────────────────────────────────────────
          GALLERY LIGHTBOX
      ──────────────────────────────────────────────────────────────── */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing: ${lightboxItem.title}`}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t.lightbox.close}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={lightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t.lightbox.prev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4">
            <img
              src={lightboxItem.img}
              alt={`${lightboxItem.title} — ${lightboxItem.style}`}
              className="max-h-[70vh] max-w-full object-contain border border-[#D4AF37]/20"
            />
            <div className="text-center">
              <p
                className="text-white text-2xl font-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lightboxItem.title}
              </p>
              <p className="text-[#D4AF37] text-xs tracking-widest uppercase mt-1">{lightboxItem.style}</p>
              <p className="text-white/30 text-xs mt-2">
                {t.locale === "ar"
                  ? `${(lightboxIndex + 1).toLocaleString("ar-EG")} / ${galleryItems.length.toLocaleString("ar-EG")} — ${t.lightbox.navigateHint}`
                  : `${lightboxIndex + 1} / ${galleryItems.length} — ${t.lightbox.navigateHint}`}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={lightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t.lightbox.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => { setLightboxIndex(i); setLightboxItem(galleryItems[i]); }}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  i === lightboxIndex ? "w-6 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`View artwork ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────
          BACK TO TOP
      ──────────────────────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#005F40] text-white flex items-center justify-center shadow-lg hover:bg-[#004530] active:bg-[#003520] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] border border-[#D4AF37]/20 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* ── Global keyframe animations ─────────────────────────────── */}
      <style>{`
        html { scroll-behavior: smooth; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        [class*="animate-[fadeIn"] { animation-fill-mode: both; }

        /* Smooth focus rings */
        :focus-visible { outline: none; }
      `}</style>
    </div>
  );
}
