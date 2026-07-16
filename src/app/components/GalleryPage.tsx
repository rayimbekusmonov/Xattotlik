import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ArrowLeft,
  Search,
  Grid3X3,
  LayoutGrid,
  Images,
} from "lucide-react";

/* ── Import all 31 sample images ───────────────────────────────────────── */
import s1  from "../../assets/projects/sample1.png";
import s2  from "../../assets/projects/sample2.png";
import s3  from "../../assets/projects/sample3.png";
import s4  from "../../assets/projects/sample4.png";
import s5  from "../../assets/projects/sample5.png";
import s6  from "../../assets/projects/sample6.png";
import s7  from "../../assets/projects/sample7.png";
import s8  from "../../assets/projects/sample8.png";
import s9  from "../../assets/projects/sample9.png";
import s10 from "../../assets/projects/sample10.png";
import s11 from "../../assets/projects/sample11.png";
import s12 from "../../assets/projects/sample12.png";
import s13 from "../../assets/projects/sample13.png";
import s14 from "../../assets/projects/sample14.png";
import s15 from "../../assets/projects/sample15.png";
import s16 from "../../assets/projects/sample16.png";
import s17 from "../../assets/projects/sample17.png";
import s18 from "../../assets/projects/sample18.png";
import s19 from "../../assets/projects/sample19.png";
import s20 from "../../assets/projects/sample20.png";
import s21 from "../../assets/projects/sample21.png";
import s22 from "../../assets/projects/sample22.png";
import s23 from "../../assets/projects/sample23.png";
import s24 from "../../assets/projects/sample24.png";
import s25 from "../../assets/projects/sample25.png";
import s26 from "../../assets/projects/sample26.png";
import s27 from "../../assets/projects/sample27.png";
import s28 from "../../assets/projects/sample28.png";
import s29 from "../../assets/projects/sample29.png";
import s30 from "../../assets/projects/sample30.png";
import s31 from "../../assets/projects/sample31.png";
import logoImg from "../../assets/logo.JPG";

/* ── Types ──────────────────────────────────────────────────────────────── */
type Locale = "uz" | "en" | "ru" | "ar";

interface GalleryPageProps {
  locale: Locale;
  onBack: () => void;
}

type Category = "all" | "thuluth" | "naskh" | "kufic" | "diwani" | "tughra" | "ruqah";

interface GalleryItem {
  id: number;
  img: string;
  category: Category;
  titleEn: string;
  titleUz: string;
  titleRu: string;
  titleAr: string;
  styleEn: string;
  styleUz: string;
  styleRu: string;
  styleAr: string;
}

const galleryData: GalleryItem[] = [
  { id:1,  img:s1,  category:"thuluth", titleEn:"Basmala Composition",      titleUz:"Basmala kompozitsiyasi",    titleRu:"Композиция Басмала",       titleAr:"لوحة البسملة",              styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:2,  img:s2,  category:"naskh",   titleEn:"Quranic Verse Panel",      titleUz:"Qur'on oyatlari paneli",   titleRu:"Коранический стих",        titleAr:"لوحة الآيات القرآنية",     styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:3,  img:s3,  category:"kufic",   titleEn:"Sacred Names Series",      titleUz:"Muqaddas ismlar turkumi",  titleRu:"Серия священных имён",     titleAr:"سلسلة الأسماء المقدسة",    styleEn:"Kufic Script",  styleUz:"Kufiy xati",   styleRu:"Куфический",  styleAr:"الخط الكوفي"   },
  { id:4,  img:s4,  category:"diwani",  titleEn:"Hilya Composition",        titleUz:"Hilya kompozitsiyasi",     titleRu:"Хилья",                    titleAr:"لوحة الحلية الشريفة",      styleEn:"Diwani Script", styleUz:"Devoniy xati", styleRu:"Дивани",      styleAr:"الخط الديواني" },
  { id:5,  img:s5,  category:"thuluth", titleEn:"Geometric Harmony",        titleUz:"Geometrik uyg'unlik",      titleRu:"Геометрическая гармония",  titleAr:"التناغم الهندسي",          styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:6,  img:s6,  category:"tughra",  titleEn:"Intertwined Names",        titleUz:"Chirmashgan ismlar",       titleRu:"Переплетённые имена",      titleAr:"الأسماء المتداخلة",        styleEn:"Tughra Script", styleUz:"Tug'ro xati",  styleRu:"Тугра",       styleAr:"خط الطغراء"    },
  { id:7,  img:s7,  category:"naskh",   titleEn:"Manuscript Fragment",      titleUz:"Qo'lyozma parchasi",       titleRu:"Фрагмент рукописи",        titleAr:"مقتطف مخطوطة",             styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:8,  img:s8,  category:"kufic",   titleEn:"Kufic Wall Panel",         titleUz:"Kufiy devor paneli",       titleRu:"Куфическая панель",        titleAr:"لوحة كوفية",               styleEn:"Kufic Script",  styleUz:"Kufiy xati",   styleRu:"Куфический",  styleAr:"الخط الكوفي"   },
  { id:9,  img:s9,  category:"thuluth", titleEn:"Divine Attributes",        titleUz:"Ilohiy sifatlar",          titleRu:"Божественные атрибуты",    titleAr:"الصفات الإلهية",           styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:10, img:s10, category:"ruqah",   titleEn:"Riqa Elegance",            titleUz:"Riqa nafisligi",           titleRu:"Элегантность Рик'а",       titleAr:"رقعة أنيقة",               styleEn:"Ruq'ah Script", styleUz:"Riqa xati",    styleRu:"Рик'а",       styleAr:"خط الرقعة"     },
  { id:11, img:s11, category:"diwani",  titleEn:"Ottoman Diwani",           titleUz:"Usmonli devoniy",          titleRu:"Османский диван",          titleAr:"الديواني العثماني",        styleEn:"Diwani Script", styleUz:"Devoniy xati", styleRu:"Дивани",      styleAr:"الخط الديواني" },
  { id:12, img:s12, category:"thuluth", titleEn:"Calligraphic Seal",        titleUz:"Xattotlik muhri",          titleRu:"Каллиграфическая печать",  titleAr:"الختم الخطي",              styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:13, img:s13, category:"naskh",   titleEn:"Sacred Verse",             titleUz:"Muqaddas oyat",            titleRu:"Священный аят",            titleAr:"آية قرآنية",               styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:14, img:s14, category:"kufic",   titleEn:"Angular Geometry",         titleUz:"Burchakli geometriya",     titleRu:"Угловая геометрия",        titleAr:"هندسة زاوية",              styleEn:"Kufic Script",  styleUz:"Kufiy xati",   styleRu:"Куфический",  styleAr:"الخط الكوفي"   },
  { id:15, img:s15, category:"tughra",  titleEn:"Imperial Monogram",        titleUz:"Imperatorlik monogrammi",  titleRu:"Имперская монограмма",     titleAr:"المونوغرام الإمبراطوري",   styleEn:"Tughra Script", styleUz:"Tug'ro xati",  styleRu:"Тугра",       styleAr:"خط الطغراء"    },
  { id:16, img:s16, category:"thuluth", titleEn:"Prayer of Light",          titleUz:"Nur duosi",                titleRu:"Молитва света",            titleAr:"دعاء النور",               styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:17, img:s17, category:"naskh",   titleEn:"Enlightened Manuscript",   titleUz:"Ma'rifatli qo'lyozma",     titleRu:"Просветлённая рукопись",   titleAr:"مخطوطة منيرة",             styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:18, img:s18, category:"diwani",  titleEn:"Floral Diwani",            titleUz:"Gullar devoniy",           titleRu:"Флоральный диван",         titleAr:"ديواني زهري",              styleEn:"Diwani Script", styleUz:"Devoniy xati", styleRu:"Дивани",      styleAr:"الخط الديواني" },
  { id:19, img:s19, category:"thuluth", titleEn:"Names of God",             titleUz:"Allohning ismlari",        titleRu:"Имена Аллаха",             titleAr:"أسماء الله الحسنى",        styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:20, img:s20, category:"ruqah",   titleEn:"Delicate Strokes",         titleUz:"Nozik chiziqlar",          titleRu:"Нежные штрихи",            titleAr:"ضربات رفيعة",              styleEn:"Ruq'ah Script", styleUz:"Riqa xati",    styleRu:"Рик'а",       styleAr:"خط الرقعة"     },
  { id:21, img:s21, category:"kufic",   titleEn:"Monumental Kufic",         titleUz:"Monument kufiy",           titleRu:"Монументальный куфик",     titleAr:"الكوفي الضخم",             styleEn:"Kufic Script",  styleUz:"Kufiy xati",   styleRu:"Куфический",  styleAr:"الخط الكوفي"   },
  { id:22, img:s22, category:"thuluth", titleEn:"Majestic Thuluth",         titleUz:"Ulug'vor sulus",           titleRu:"Величественный сулюс",     titleAr:"الثلث الجليل",             styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:23, img:s23, category:"naskh",   titleEn:"Classical Naskh",          titleUz:"Klassik nasx",             titleRu:"Классический насх",        titleAr:"نسخ كلاسيكي",              styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:24, img:s24, category:"tughra",  titleEn:"Sultan's Seal",            titleUz:"Sulton muhri",             titleRu:"Печать султана",           titleAr:"ختم السلطان",              styleEn:"Tughra Script", styleUz:"Tug'ro xati",  styleRu:"Тугра",       styleAr:"خط الطغراء"    },
  { id:25, img:s25, category:"diwani",  titleEn:"Spiral Composition",       titleUz:"Spiral kompozitsiya",      titleRu:"Спиральная композиция",    titleAr:"تركيبة حلزونية",           styleEn:"Diwani Script", styleUz:"Devoniy xati", styleRu:"Дивани",      styleAr:"الخط الديواني" },
  { id:26, img:s26, category:"thuluth", titleEn:"Golden Inscription",       titleUz:"Oltin yozuv",              titleRu:"Золотая надпись",          titleAr:"النقش الذهبي",             styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
  { id:27, img:s27, category:"naskh",   titleEn:"Meditative Script",        titleUz:"Meditativ xat",            titleRu:"Медитативный шрифт",       titleAr:"خط تأملي",                styleEn:"Naskh Script",  styleUz:"Nasx xati",    styleRu:"Шрифт Насх",  styleAr:"خط النسخ"      },
  { id:28, img:s28, category:"kufic",   titleEn:"Square Kufic",             titleUz:"Kvadrat kufiy",            titleRu:"Квадратный куфик",         titleAr:"الكوفي المربع",            styleEn:"Kufic Script",  styleUz:"Kufiy xati",   styleRu:"Куфический",  styleAr:"الخط الكوفي"   },
  { id:29, img:s29, category:"ruqah",   titleEn:"Flowing Ruqah",            titleUz:"Oqar riqa",                titleRu:"Текучий Рик'а",            titleAr:"رقعة متدفقة",              styleEn:"Ruq'ah Script", styleUz:"Riqa xati",    styleRu:"Рик'а",       styleAr:"خط الرقعة"     },
  { id:30, img:s30, category:"diwani",  titleEn:"Royal Flourish",           titleUz:"Shohona ravnaq",           titleRu:"Королевский росчерк",      titleAr:"الازدهار الملكي",          styleEn:"Diwani Script", styleUz:"Devoniy xati", styleRu:"Дивани",      styleAr:"الخط الديواني" },
  { id:31, img:s31, category:"thuluth", titleEn:"Eternal Verse",            titleUz:"Abadiy oyat",              titleRu:"Вечный аят",               titleAr:"الآية الخالدة",            styleEn:"Thuluth Script", styleUz:"Sulus xati",   styleRu:"Шрифт Сулюс", styleAr:"خط الثلث"      },
];

const getTitle = (item: GalleryItem, locale: Locale) =>
  locale==="uz"?item.titleUz:locale==="ru"?item.titleRu:locale==="ar"?item.titleAr:item.titleEn;
const getStyle = (item: GalleryItem, locale: Locale) =>
  locale==="uz"?item.styleUz:locale==="ru"?item.styleRu:locale==="ar"?item.styleAr:item.styleEn;

const categoryLabels: Record<Category, Record<Locale, string>> = {
  all:     { en:"All Works",  uz:"Barcha asarlar", ru:"Все работы",   ar:"جميع الأعمال" },
  thuluth: { en:"Thuluth",    uz:"Sulus",          ru:"Сулюс",        ar:"الثلث"         },
  naskh:   { en:"Naskh",      uz:"Nasx",           ru:"Насх",         ar:"النسخ"         },
  kufic:   { en:"Kufic",      uz:"Kufiy",          ru:"Куфический",   ar:"الكوفي"        },
  diwani:  { en:"Diwani",     uz:"Devoniy",        ru:"Дивани",       ar:"الديواني"      },
  tughra:  { en:"Tughra",     uz:"Tug'ro",         ru:"Тугра",        ar:"الطغراء"       },
  ruqah:   { en:"Ruq'ah",     uz:"Riqa",           ru:"Рик'а",        ar:"الرقعة"        },
};

const uiText = {
  en: { title:"Gallery", subtitle:"A Royal Collection of Sacred Scripts", searchPlaceholder:"Search artworks…", showing:"Showing", of:"of", works:"works", close:"Close", prev:"Previous", next:"Next", backHome:"Back to Home", navigate:"Use arrow keys to navigate", view:"View" },
  uz: { title:"Galereya", subtitle:"Muqaddas xatlarning shohona to'plami", searchPlaceholder:"Asarlar qidirish…", showing:"Ko'rsatilmoqda", of:"/", works:"ta asar", close:"Yopish", prev:"Oldingi", next:"Keyingi", backHome:"Bosh sahifaga", navigate:"O'q tugmalaridan foydalaning", view:"Ko'rish" },
  ru: { title:"Галерея", subtitle:"Королевская коллекция священных шрифтов", searchPlaceholder:"Поиск произведений…", showing:"Показано", of:"из", works:"работ", close:"Закрыть", prev:"Назад", next:"Вперёд", backHome:"На главную", navigate:"Используйте стрелки", view:"Открыть" },
  ar: { title:"المعرض", subtitle:"مجموعة ملكية من الخطوط المقدسة", searchPlaceholder:"ابحث في الأعمال الفنية…", showing:"عرض", of:"من", works:"عمل", close:"إغلاق", prev:"السابق", next:"التالي", backHome:"العودة للرئيسية", navigate:"استخدم أسهم لوحة المفاتيح", view:"عرض" },
};

/* ── Islamic star SVG ────────────────────────────────────────────────────── */
const IslamicStar = ({ size=60, opacity=0.25 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <polygon points="50,5 61,35 93,35 68,57 79,91 50,70 21,91 32,57 7,35 39,35" fill="none" stroke="#D4AF37" strokeWidth="1.4"/>
    <polygon points="50,18 58,40 82,40 63,54 71,77 50,63 29,77 37,54 18,40 42,40" fill="none" stroke="#D4AF37" strokeWidth="0.7"/>
    <circle cx="50" cy="50" r="3.5" fill="#D4AF37"/>
  </svg>
);

const GoldDivider = () => (
  <div className="flex items-center gap-4 my-5">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50"/>
    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"/>
    <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60"/>
    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"/>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50"/>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════ */
export default function GalleryPage({ locale, onBack }: GalleryPageProps) {
  const ui = uiText[locale];
  const isRtl = locale === "ar";

  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridMode, setGridMode] = useState<"masonry" | "grid">("masonry");
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const categories: Category[] = ["all","thuluth","naskh","kufic","diwani","tughra","ruqah"];

  const filtered = galleryData.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      getTitle(item, locale).toLowerCase().includes(q) ||
      getStyle(item, locale).toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);
  const lightboxPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);
  const lightboxNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") isRtl ? lightboxNext() : lightboxPrev();
      if (e.key === "ArrowRight") isRtl ? lightboxPrev() : lightboxNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, lightboxPrev, lightboxNext, isRtl]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div
      className="min-h-screen bg-[#FAF9F6] text-[#1C2B3A]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="relative bg-[#002A1C] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,3 36,21 55,21 40,33 47,55 30,43 13,55 20,33 5,21 24,21' fill='none' stroke='%23D4AF37' stroke-width='0.8'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            backgroundSize:"60px 60px",
          }}
        />
        <div className="absolute top-4 left-4 hidden md:block"><IslamicStar size={80} opacity={0.15}/></div>
        <div className="absolute top-4 right-4 hidden md:block"><IslamicStar size={80} opacity={0.15}/></div>
        <div className="absolute bottom-0 left-20 hidden lg:block"><IslamicStar size={50} opacity={0.1}/></div>
        <div className="absolute bottom-0 right-20 hidden lg:block"><IslamicStar size={50} opacity={0.1}/></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-12">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#D4AF37]/80 hover:text-[#D4AF37] text-sm font-medium tracking-wide transition-colors duration-200 focus:outline-none group"
              aria-label={ui.backHome}
            >
              <ArrowLeft className={`w-4 h-4 transition-transform duration-200 ${isRtl?"rotate-180 group-hover:translate-x-1":"group-hover:-translate-x-1"}`}/>
              {ui.backHome}
            </button>
            <button onClick={onBack} className="focus:outline-none" aria-label="Home">
              <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain rounded-full border-2 border-[#D4AF37] bg-white p-0.5 shadow"/>
            </button>
          </div>

          {/* Title block */}
          <div className="text-center">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-medium mb-5">
              {locale==="ar"?"مركز الحضارة الإسلامية":locale==="ru"?"Центр исламской цивилизации":locale==="uz"?"Islom Sivilizatsiyasi Markazi":"Center of Islamic Civilization"}
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-px bg-[#D4AF37]/50"/>
              <IslamicStar size={30} opacity={0.9}/>
              <div className="w-10 h-px bg-[#D4AF37]/50"/>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none mb-4"
              style={{ fontFamily:"'Playfair Display', serif" }}
            >
              {ui.title}
            </h1>
            <p className="text-[#EDE8DC]/55 text-base md:text-lg font-light tracking-widest mb-4">
              {ui.subtitle}
            </p>
            <GoldDivider/>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex items-center gap-2 px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold">
                <Images className="w-4 h-4"/>
                {galleryData.length} {locale==="ar"?"عمل فني":locale==="ru"?"работ":locale==="uz"?"ta asar":"Artworks"}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ornament */}
        <div className="relative h-5 flex justify-center">
          <svg width="280" height="20" viewBox="0 0 280 20">
            <path d="M0,0 Q70,20 140,10 Q210,0 280,0" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.4"/>
            <circle cx="140" cy="10" r="2.5" fill="#D4AF37" fillOpacity="0.6"/>
            <circle cx="70" cy="5" r="1.5" fill="#D4AF37" fillOpacity="0.35"/>
            <circle cx="210" cy="5" r="1.5" fill="#D4AF37" fillOpacity="0.35"/>
          </svg>
        </div>
      </header>

      {/* ── Sticky Filter Bar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#FAF9F6]/96 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto flex-nowrap pb-2 sm:pb-0 sm:flex-wrap w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 focus:outline-none border whitespace-nowrap ${
                    activeCategory===cat
                      ? "bg-[#005F40] text-[#D4AF37] border-[#005F40] shadow"
                      : "bg-white text-[#4A5568] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:text-[#005F40]"
                  }`}
                >
                  {categoryLabels[cat][locale]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial w-full sm:w-auto">
                <Search className={`absolute ${isRtl?"right-3":"left-3"} top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#D4AF37]`}/>
                <input
                  type="search"
                  placeholder={ui.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRtl?"pr-9 pl-4":"pl-9 pr-4"} py-2 bg-white border border-[#D4AF37]/25 focus:border-[#D4AF37]/60 text-sm text-[#1C2B3A] placeholder-[#9CA3AF] outline-none w-full sm:w-48 transition-colors duration-200`}
                  style={{ fontFamily:"'Montserrat', sans-serif" }}
                />
              </div>
              <div className="flex border border-[#D4AF37]/25 overflow-hidden flex-shrink-0">
                <button
                  onClick={() => setGridMode("masonry")}
                  className={`p-2 transition-colors duration-200 ${gridMode==="masonry"?"bg-[#005F40] text-[#D4AF37]":"bg-white text-[#9CA3AF] hover:text-[#005F40]"}`}
                  aria-label="Masonry grid"
                >
                  <LayoutGrid className="w-4 h-4"/>
                </button>
                <button
                  onClick={() => setGridMode("grid")}
                  className={`p-2 transition-colors duration-200 ${gridMode==="grid"?"bg-[#005F40] text-[#D4AF37]":"bg-white text-[#9CA3AF] hover:text-[#005F40]"}`}
                  aria-label="Uniform grid"
                >
                  <Grid3X3 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#9CA3AF] tracking-[0.15em] uppercase mt-3">
            {ui.showing} {filtered.length} {ui.of} {galleryData.length} {ui.works}
          </p>
        </div>
      </div>

      {/* ── Gallery Grid ──────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <IslamicStar size={60} opacity={0.2}/>
            <p className="mt-6 text-[#9CA3AF] text-lg" style={{ fontFamily:"'Playfair Display', serif" }}>
              {locale==="ar"?"لا توجد نتائج":locale==="ru"?"Нет результатов":locale==="uz"?"Natija topilmadi":"No artworks found"}
            </p>
          </div>
        ) : gridMode === "masonry" ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
            {filtered.map((item, idx) => (
              <div key={item.id} className="break-inside-avoid mb-5">
                <GalleryCard
                  item={item}
                  locale={locale}
                  index={idx}
                  onClick={() => openLightbox(idx)}
                  imageLoaded={imageLoaded}
                  setImageLoaded={setImageLoaded}
                  ui={ui}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                locale={locale}
                index={idx}
                onClick={() => openLightbox(idx)}
                imageLoaded={imageLoaded}
                setImageLoaded={setImageLoaded}
                uniform
                ui={ui}
              />
            ))}
          </div>
        )}

        {/* Bottom ornament */}
        <div className="flex justify-center mt-20 mb-4">
          <div className="flex items-center gap-6">
            <div className="h-px w-16 bg-[#D4AF37]/30"/>
            <IslamicStar size={34} opacity={0.3}/>
            <IslamicStar size={22} opacity={0.2}/>
            <IslamicStar size={34} opacity={0.3}/>
            <div className="h-px w-16 bg-[#D4AF37]/30"/>
          </div>
        </div>
      </main>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background:"rgba(0,18,10,0.97)" }}
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          role="dialog"
          aria-modal="true"
          aria-label={getTitle(lightboxItem, locale)}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpolygon points='40,4 48,28 73,28 53,45 62,72 40,56 18,72 27,45 7,28 32,28' fill='none' stroke='%23D4AF37' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize:"80px 80px",
            }}
          />
          <div className="absolute top-6 left-6 hidden lg:block pointer-events-none"><IslamicStar size={60} opacity={0.12}/></div>
          <div className="absolute top-6 right-6 hidden lg:block pointer-events-none"><IslamicStar size={60} opacity={0.12}/></div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 border border-white/15 hover:border-white/35 transition-all duration-200 focus:outline-none"
            aria-label={ui.close}
          >
            <X className="w-5 h-5"/>
          </button>

          {/* Prev */}
          <button
            onClick={isRtl ? lightboxNext : lightboxPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-200 focus:outline-none"
            aria-label={ui.prev}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6"/>
          </button>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-5xl w-full px-6 md:px-16 max-h-[92vh]">
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/35"/>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/60"/>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/35"/>
            </div>

            <div className="relative border border-[#D4AF37]/25 shadow-2xl" style={{ maxHeight:"68vh" }}>
              <div className="absolute inset-2 border border-[#D4AF37]/10 pointer-events-none z-10"/>
              <img
                src={lightboxItem.img}
                alt={getTitle(lightboxItem, locale)}
                className="max-h-[68vh] max-w-full object-contain block"
                style={{ background:"#081812" }}
              />
            </div>

            <div className="text-center">
              <p className="text-white text-2xl font-normal mb-1" style={{ fontFamily:"'Playfair Display', serif" }}>
                {getTitle(lightboxItem, locale)}
              </p>
              <p className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-semibold">
                {getStyle(lightboxItem, locale)}
              </p>
              <p className="text-white/25 text-xs tracking-widest mt-2 uppercase">
                {lightboxIndex + 1} / {filtered.length} — {ui.navigate}
              </p>
            </div>

            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/35"/>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/60"/>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/35"/>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    i===lightboxIndex?"w-6 h-2 bg-[#D4AF37]":"w-2 h-2 bg-white/20 hover:bg-[#D4AF37]/50"
                  }`}
                  aria-label={`Artwork ${i+1}`}
                />
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={isRtl ? lightboxPrev : lightboxNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-200 focus:outline-none"
            aria-label={ui.next}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6"/>
          </button>
        </div>
      )}

      <style>{`
        @keyframes galleryFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gallery-card-enter {
          animation: galleryFadeUp 0.45s ease both;
        }
      `}</style>
    </div>
  );
}

/* ── Gallery Card ────────────────────────────────────────────────────────── */
interface CardProps {
  item: GalleryItem;
  locale: Locale;
  index: number;
  onClick: () => void;
  imageLoaded: Record<number, boolean>;
  setImageLoaded: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  uniform?: boolean;
  ui: typeof uiText["en"];
}

function GalleryCard({ item, locale, index, onClick, imageLoaded, setImageLoaded, uniform, ui }: CardProps) {
  const isRtl = locale === "ar";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden bg-white border border-[#D4AF37]/15 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/45 hover:-translate-y-0.5 gallery-card-enter"
      style={{ animationDelay:`${Math.min(index * 55, 550)}ms` }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${getTitle(item, locale)} — ${getStyle(item, locale)}`}
      onKeyDown={(e) => e.key==="Enter" && onClick()}
    >
      {/* Shimmer */}
      {!imageLoaded[item.id] && (
        <div className={`${uniform?"h-44":"h-52"} bg-gradient-to-br from-[#EDE8DC] to-[#D4C8A8] animate-pulse`}/>
      )}

      {/* Image */}
      <div className={uniform ? "h-44 overflow-hidden" : "overflow-hidden"}>
        <img
          src={item.img}
          alt={`${getTitle(item, locale)} — ${getStyle(item, locale)}`}
          className={`w-full ${uniform?"h-44 object-cover":""} transition-transform duration-700 ${imageLoaded[item.id]?"opacity-100":"opacity-0 absolute inset-0"}`}
          style={{ transform:hovered?"scale(1.06)":"scale(1.0)" }}
          loading="lazy"
          onLoad={() => setImageLoaded(prev => ({ ...prev, [item.id]:true }))}
        />
      </div>

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 transition-opacity duration-300 ${hovered?"opacity-100":"opacity-0"}`}
        style={{ background:"linear-gradient(160deg, rgba(0,42,28,0.91) 0%, rgba(0,18,12,0.96) 100%)" }}
      >
        <IslamicStar size={28} opacity={0.5}/>
        <div className="w-8 h-px bg-[#D4AF37]/70"/>
        <p className="text-white text-sm text-center font-normal px-5 leading-snug" style={{ fontFamily:"'Playfair Display', serif" }}>
          {getTitle(item, locale)}
        </p>
        <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-semibold">
          {getStyle(item, locale)}
        </p>
        <div className="w-8 h-px bg-[#D4AF37]/70"/>
        <div className="flex items-center gap-1.5 mt-1 px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] tracking-[0.15em] uppercase font-semibold">
          <ZoomIn className="w-3.5 h-3.5"/>
          {ui.view}
        </div>
      </div>

      {/* Category badge */}
      <div className={`absolute top-2.5 ${isRtl?"left-2.5":"right-2.5"} px-2 py-0.5 bg-[#002A1C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] tracking-[0.12em] uppercase font-semibold transition-opacity duration-200 ${hovered?"opacity-0":"opacity-100"}`}>
        {categoryLabels[item.category][locale]}
      </div>

      {/* Footer */}
      <div className={`px-4 py-3 border-t border-[#D4AF37]/15 transition-colors duration-300 ${hovered?"bg-[#002A1C]":"bg-white"}`}>
        <p className={`text-sm font-medium leading-tight ${hovered?"text-white":"text-[#1C2B3A]"}`} style={{ fontFamily:"'Playfair Display', serif" }}>
          {getTitle(item, locale)}
        </p>
        <p className="text-[#D4AF37] text-[10px] tracking-[0.12em] uppercase mt-0.5 font-semibold">
          {getStyle(item, locale)}
        </p>
      </div>
    </div>
  );
}
