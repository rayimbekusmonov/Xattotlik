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
} from "lucide-react";

/* ── Islamic 8-pointed star pattern tile ──────────────────────────────── */
const StarTile = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <polygon
      points="50,5 61,35 93,35 68,57 79,91 50,70 21,91 32,57 7,35 39,35"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.35"
    />
    <polygon
      points="50,18 58,40 82,40 63,54 71,77 50,63 29,77 37,54 18,40 42,40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
    />
    <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.2" />
  </svg>
);

/* ── Decorative divider ───────────────────────────────────────────────── */
const GoldDivider = () => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
    <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60" />
    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
  </div>
);

/* ── Section label ────────────────────────────────────────────────────── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase mb-3"
    style={{ fontFamily: "'Montserrat', sans-serif" }}
  >
    {children}
  </p>
);

/* ── Scroll animation hook ────────────────────────────────────────────── */
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

/* ── Gallery artwork data ─────────────────────────────────────────────── */
const galleryItems = [
  {
    id: 1,
    title: "Basmala Composition",
    style: "Thuluth Script",
    img: "https://images.unsplash.com/photo-1603801571246-be066de0c73b?w=800&h=960&fit=crop&auto=format",
    height: "h-72",
  },
  {
    id: 2,
    title: "Quranic Verse Panel",
    style: "Naskh Script",
    img: "https://images.unsplash.com/photo-1646229227468-ba6eb534d368?w=800&h=680&fit=crop&auto=format",
    height: "h-56",
  },
  {
    id: 3,
    title: "Sacred Name Series",
    style: "Kufic Script",
    img: "https://images.unsplash.com/photo-1676928117296-66bc2882ec6a?w=800&h=820&fit=crop&auto=format",
    height: "h-64",
  },
  {
    id: 4,
    title: "Hilya Composition",
    style: "Diwani Script",
    img: "https://images.unsplash.com/photo-1601480905449-90fca867ad37?w=800&h=900&fit=crop&auto=format",
    height: "h-80",
  },
  {
    id: 5,
    title: "Geometric Harmony",
    style: "Sulus Script",
    img: "https://images.unsplash.com/photo-1603224288850-cf0a7939278c?w=800&h=700&fit=crop&auto=format",
    height: "h-60",
  },
  {
    id: 6,
    title: "Intertwined Names",
    style: "Tughra Script",
    img: "https://images.unsplash.com/photo-1700306692751-1fd5f2b88443?w=800&h=840&fit=crop&auto=format",
    height: "h-68",
  },
];

/* ── Course data ─────────────────────────────────────────────────────── */
const courses = [
  {
    level: "Beginner",
    title: "Foundation of Script",
    description:
      "Master the foundational strokes, tools, and proportions of classical Arabic letterforms. Perfect for those with no prior experience.",
    duration: "12 Weeks",
    schedule: "Saturdays 10:00–13:00",
    price: "AED 2,400",
    icon: <PenLine className="w-7 h-7" />,
    features: ["Reed pen & ink kit included", "Digital practice sheets", "Certificate upon completion"],
    featured: false,
  },
  {
    level: "Intermediate",
    title: "Naskh & Thuluth Mastery",
    description:
      "Deepen your command of the two most important classical scripts with advanced compositions and historical manuscript studies.",
    duration: "16 Weeks",
    schedule: "Wednesdays 18:00–21:00",
    price: "AED 3,800",
    icon: <Droplet className="w-7 h-7" />,
    features: ["Premium calligraphy set", "One-on-one feedback sessions", "Portfolio development"],
    featured: true,
  },
  {
    level: "Masterclass",
    title: "The Art of Illumination",
    description:
      "An intensive program combining calligraphy with traditional Islamic illumination, led by award-winning masters from Istanbul and Cairo.",
    duration: "20 Weeks",
    schedule: "Fridays 09:00–14:00",
    price: "AED 6,200",
    icon: <Star className="w-7 h-7" />,
    features: ["Rare pigment & gold leaf kit", "International guest masters", "Final exhibition showcase"],
    featured: false,
  },
];

/* ── Testimonials data ───────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: "Fatima Al-Rashidi",
    role: "Intermediate Graduate, 2023",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    text: "The Center completely transformed my understanding of Arabic script. Sheikh Hassan's patience and mastery are unparalleled. My Naskh improved tenfold in just four months.",
    stars: 5,
  },
  {
    id: 2,
    name: "James Whitmore",
    role: "Beginner Graduate, 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    text: "Coming from the UK with zero Arabic background, I was warmly welcomed and guided with exceptional care. The community here is truly international and inspiring.",
    stars: 5,
  },
  {
    id: 3,
    name: "Dr. Aisha Mahmoud",
    role: "Masterclass Graduate, 2022",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    text: "The illumination masterclass was a life-changing experience. Working alongside masters from Cairo and Istanbul on the final exhibition was the highlight of my artistic career.",
    stars: 5,
  },
];

/* ══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
  }, [lightboxIndex]);

  const lightboxNext = useCallback(() => {
    const idx = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(idx);
    setLightboxItem(galleryItems[idx]);
  }, [lightboxIndex]);

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
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
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

  const navLinks = ["Home", "About", "Gallery", "Courses", "Contact"];

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif", scrollBehavior: "smooth" }}
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
            className="flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
            aria-label="Go to homepage"
          >
            <div className="w-10 h-10 text-[#D4AF37]">
              <StarTile />
            </div>
            <div className="text-left">
              <p
                className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-medium leading-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Center of Islamic Civilization
              </p>
              <p
                className="text-[#005F40] text-base font-semibold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Calligraphy Center
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10" role="menubar">
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  role="menuitem"
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1 ${
                    isActive ? "text-[#D4AF37]" : "text-[#005F40] hover:text-[#D4AF37]"
                  }`}
                >
                  {link}
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
            <button
              onClick={() => scrollTo("courses")}
              className="px-6 py-2.5 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold tracking-wide rounded-sm hover:bg-[#004530] active:bg-[#003520] transition-all duration-200 border border-[#005F40] hover:border-[#004530] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Enrol Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#005F40] p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors hover:text-[#D4AF37]"
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

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#FAF9F6]/99 backdrop-blur-md border-t border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={`text-base font-medium py-3 border-b border-[#D4AF37]/10 text-left transition-colors duration-200 focus:outline-none ${
                    isActive ? "text-[#D4AF37]" : "text-[#005F40] hover:text-[#D4AF37]"
                  }`}
                >
                  {link}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("courses")}
              className="mt-3 px-6 py-3 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold text-center tracking-wide rounded-sm hover:bg-[#004530] transition-colors duration-200"
            >
              Enrol Now
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
            Center of Islamic Civilization — Abu Dhabi
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
            The Art of{" "}
            <em className="italic text-[#D4AF37]" style={{ fontStyle: "italic" }}>
              Eternal Script
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
            Preserving Heritage, Shaping Future
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_0.8s_ease_1s_both]">
            <button
              onClick={() => scrollTo("gallery")}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] active:bg-[#B08D22] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Discover Our Gallery
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#D4AF37]/50 text-[#FAF9F6] text-sm font-medium tracking-widest uppercase hover:bg-white/10 hover:border-[#D4AF37]/80 active:bg-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none group"
          aria-label="Scroll down"
        >
          <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
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
              { value: studentsCount, suffix: "+", label: "Students Trained" },
              { value: nationsCount, suffix: "+", label: "Nations Represented" },
              { value: manuscriptsCount, suffix: "+", label: "Historical Manuscripts" },
              { value: mastersCount, suffix: "+", label: "Years of Heritage" },
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
                  {stat.value.toLocaleString()}{stat.suffix}
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
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About The Center
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
              <div className="absolute -bottom-6 -right-6 bg-[#005F40] text-white px-8 py-6 shadow-xl hidden lg:block">
                <p
                  className="text-4xl font-bold text-[#D4AF37] leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  35+
                </p>
                <p className="text-xs tracking-widest uppercase text-white/70 mt-1 font-medium">
                  Years of Heritage
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-4 -left-4 w-16 h-16 text-[#D4AF37] opacity-40">
                <StarTile />
              </div>
            </div>

            {/* Right: text */}
            <div
              className={`lg:pl-8 transition-all duration-700 delay-300 ${
                aboutReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <SectionLabel>Est. 1989 — Abu Dhabi</SectionLabel>
              <h3
                className="text-3xl lg:text-4xl text-[#1C2B3A] mb-6 font-normal leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Living Archive of{" "}
                <em style={{ fontStyle: "italic" }}>Sacred Script</em>
              </h3>
              <div className="w-12 h-0.5 bg-[#D4AF37] mb-6" />
              <p className="text-[#4A5568] leading-relaxed mb-5 text-[15px]">
                Founded under the patronage of the Center of Islamic Civilization in 1989, our Calligraphy
                Center stands as one of the Arab world&apos;s foremost institutions dedicated to the study,
                preservation, and advancement of classical Arabic and Islamic scripts.
              </p>
              <p className="text-[#4A5568] leading-relaxed mb-8 text-[15px]">
                Over three decades, we have trained more than 4,000 students from 60 nations, maintained
                a living archive of over 2,000 historical manuscripts, and nurtured a faculty of
                internationally recognized master calligraphers.
              </p>

              {/* Masters */}
              <div className="space-y-4 mb-8">
                <p
                  className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Prominent Master Calligraphers
                </p>
                {[
                  { name: "Sheikh Hassan Al-Farsi", specialty: "Thuluth & Naskh — Istanbul Tradition" },
                  { name: "Dr. Layla Al-Mansoori", specialty: "Kufic Geometric — Andalusian Style" },
                  { name: "Ustad Karim Diab", specialty: "Diwani Jali — Cairo Academy" },
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

              <button
                onClick={() => scrollTo("courses")}
                className="group inline-flex items-center gap-2 text-[#005F40] text-sm font-semibold tracking-wide hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
              >
                Explore Our Programs
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
            <SectionLabel>The Collection</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Virtual Gallery
            </h2>
            <GoldDivider />
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px] leading-relaxed">
              A curated selection of masterworks spanning eight classical Arabic scripts,
              drawn from our permanent collection and alumni exhibitions.
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
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#002A1C]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    View Details
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
              Request Private Viewing
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
            <SectionLabel>Enroll Today</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-[#1C2B3A] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Educational Programs
            </h2>
            <GoldDivider />
            <p className="text-[#6B7280] max-w-xl mx-auto text-[15px] leading-relaxed">
              Structured learning paths designed by master calligraphers — from first strokes
              to exhibition-ready mastery.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
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
                    Most Popular
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
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{course.schedule}</span>
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
                      Program Fee
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
                    Register Now
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
            <SectionLabel>From Our Community</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl text-white font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Student Voices
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
              <Quote className="w-10 h-10 text-[#D4AF37]/40 mx-auto mb-6" />
              <p
                className="text-white/85 text-lg leading-relaxed mb-8 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{testimonials[testimonialIndex].text}"
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <img
                  src={testimonials[testimonialIndex].avatar}
                  alt={testimonials[testimonialIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/40"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-[#D4AF37] text-xs tracking-wider mt-0.5">
                    {testimonials[testimonialIndex].role}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: testimonials[testimonialIndex].stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
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
                  onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
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
                <SectionLabel>Get In Touch</SectionLabel>
                <h2
                  className="text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Contact the{" "}
                  <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Center</em>
                </h2>
                <GoldDivider />

                <div className="space-y-5 mb-10">
                  {[
                    {
                      icon: <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: "Address",
                      value: "Center of Islamic Civilization\nSaadiyat Island, Abu Dhabi, UAE",
                      href: "https://maps.google.com/?q=Saadiyat+Island+Abu+Dhabi",
                    },
                    {
                      icon: <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: "Phone",
                      value: "+971 2 401 7000",
                      href: "tel:+97124017000",
                    },
                    {
                      icon: <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: "Email",
                      value: "calligraphy@islamicciv.ae",
                      href: "mailto:calligraphy@islamicciv.ae",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
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
                  Newsletter & Enquiries
                </p>
                <h3
                  className="text-2xl font-normal text-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Stay Connected with Our{" "}
                  <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Heritage</em>
                </h3>

                {formSent ? (
                  <div className="py-12 text-center border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-sm">
                    <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[#D4AF37] font-semibold tracking-wide text-lg">
                      Message Received — Shukran!
                    </p>
                    <p className="text-white/50 text-sm mt-2">We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    {[
                      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
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
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Your enquiry, course interest, or message..."
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
                      className="w-full py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] active:bg-[#B08D22] transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003020]"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                    <p className="text-white/30 text-xs text-center">
                      Fields marked with <span className="text-red-400">*</span> are required
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
            <div className="w-8 h-8 text-[#D4AF37] opacity-60">
              <StarTile />
            </div>
            <div>
              <p className="text-[#D4AF37] text-xs tracking-widest font-medium">Calligraphy Center</p>
              <p className="text-white/30 text-[10px]">Center of Islamic Civilization</p>
            </div>
          </button>

          <p className="text-white/30 text-[11px] tracking-wide text-center">
            © 2024 Center of Islamic Civilization — Abu Dhabi. All rights reserved.
          </p>

          {/* Social */}
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
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={lightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous artwork"
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
                {lightboxIndex + 1} / {galleryItems.length} — Use arrow keys to navigate
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={lightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next artwork"
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
