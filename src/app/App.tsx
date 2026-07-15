import { useState, useEffect } from "react";
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

/* ── Gallery artwork data ─────────────────────────────────────────────── */
const galleryItems = [
  {
    id: 1,
    title: "Basmala Composition",
    style: "Thuluth Script",
    img: "https://images.unsplash.com/photo-1603801571246-be066de0c73b?w=600&h=720&fit=crop&auto=format",
    height: "h-72",
  },
  {
    id: 2,
    title: "Quranic Verse Panel",
    style: "Naskh Script",
    img: "https://images.unsplash.com/photo-1646229227468-ba6eb534d368?w=600&h=520&fit=crop&auto=format",
    height: "h-56",
  },
  {
    id: 3,
    title: "Sacred Name Series",
    style: "Kufic Script",
    img: "https://images.unsplash.com/photo-1676928117296-66bc2882ec6a?w=600&h=620&fit=crop&auto=format",
    height: "h-64",
  },
  {
    id: 4,
    title: "Hilya Composition",
    style: "Diwani Script",
    img: "https://images.unsplash.com/photo-1601480905449-90fca867ad37?w=600&h=680&fit=crop&auto=format",
    height: "h-80",
  },
  {
    id: 5,
    title: "Geometric Harmony",
    style: "Sulus Script",
    img: "https://images.unsplash.com/photo-1603224288850-cf0a7939278c?w=600&h=540&fit=crop&auto=format",
    height: "h-60",
  },
  {
    id: 6,
    title: "Intertwined Names",
    style: "Tughra Script",
    img: "https://images.unsplash.com/photo-1700306692751-1fd5f2b88443?w=600&h=640&fit=crop&auto=format",
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

/* ══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ────────────────────────────────────────────────────────────────
          1. NAVIGATION
      ──────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/20"
            : "bg-[#FAF9F6]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 text-[#D4AF37]">
              <StarTile />
            </div>
            <div>
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
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {["Home", "About", "Gallery", "Courses", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#005F40] text-sm font-medium tracking-wide hover:text-[#D4AF37] transition-colors duration-200 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#courses"
              className="px-6 py-2.5 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold tracking-wide rounded-sm hover:bg-[#004530] transition-colors duration-200 border border-[#005F40] hover:border-[#004530]"
            >
              Explore Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#005F40] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FAF9F6]/98 backdrop-blur-md border-t border-[#D4AF37]/20 px-6 py-6 flex flex-col gap-4">
            {["Home", "About", "Gallery", "Courses", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-[#005F40] text-base font-medium py-2 border-b border-[#D4AF37]/10"
              >
                {link}
              </a>
            ))}
            <a
              href="#courses"
              className="mt-2 px-6 py-3 bg-[#005F40] text-[#FAF9F6] text-sm font-semibold text-center tracking-wide rounded-sm"
            >
              Explore Now
            </a>
          </div>
        )}
      </nav>

      {/* ────────────────────────────────────────────────────────────────
          2. HERO SECTION
      ──────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#003828]"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1646229227468-ba6eb534d368?w=1920&h=1080&fit=crop&auto=format')",
          }}
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
        <div className="absolute top-28 left-8 lg:left-16 w-20 h-20 text-[#D4AF37] opacity-30">
          <StarTile />
        </div>
        <div className="absolute top-28 right-8 lg:right-16 w-20 h-20 text-[#D4AF37] opacity-30">
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
            className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6 font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Center of Islamic Civilization — Abu Dhabi
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#D4AF37]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="w-12 h-px bg-[#D4AF37]/60" />
          </div>

          <h1
            className="text-5xl lg:text-7xl font-normal text-white mb-4 leading-none tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Art of{" "}
            <em className="italic text-[#D4AF37] not-italic font-normal" style={{ fontStyle: "italic" }}>
              Eternal Script
            </em>
          </h1>

          <div className="flex items-center justify-center gap-3 my-8">
            <div className="w-16 h-px bg-[#D4AF37]/40" />
            <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60" />
            <div className="w-16 h-px bg-[#D4AF37]/40" />
          </div>

          <p
            className="text-[#EDE8DC]/80 text-lg lg:text-xl mb-10 tracking-wide font-light max-w-xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Preserving Heritage, Shaping Future
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#gallery"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] transition-all duration-300"
            >
              Discover Our Gallery
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#D4AF37]/50 text-[#FAF9F6] text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          3. ABOUT THE CENTER
      ──────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div className="text-center mb-20">
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
            <div className="relative">
              <div className="relative overflow-hidden bg-[#EDE8DC]">
                <img
                  src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=800&h=900&fit=crop&auto=format"
                  alt="Master calligrapher practicing Thuluth script with a reed pen"
                  className="w-full h-[560px] object-cover"
                />
                {/* Gold border frame */}
                <div className="absolute inset-4 border border-[#D4AF37]/40 pointer-events-none" />
                <div className="absolute inset-3 border border-[#D4AF37]/20 pointer-events-none" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-[#005F40] text-white px-8 py-6 shadow-xl">
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
            <div className="lg:pl-8">
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

              <a
                href="#courses"
                className="group inline-flex items-center gap-2 text-[#005F40] text-sm font-semibold tracking-wide hover:text-[#D4AF37] transition-colors duration-200"
              >
                Explore Our Programs
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          4. VIRTUAL GALLERY
      ──────────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-28 bg-[#EDE8DC]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
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
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden bg-white border border-[#D4AF37]/20 cursor-pointer"
                onMouseEnter={() => setHoveredGallery(item.id)}
                onMouseLeave={() => setHoveredGallery(null)}
              >
                <div className={`${item.height} overflow-hidden bg-[#EDE8DC]`}>
                  <img
                    src={item.img}
                    alt={`${item.title} — ${item.style}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-[#002A1C]/85 flex flex-col items-center justify-center gap-4 transition-opacity duration-400 ${
                    hoveredGallery === item.id ? "opacity-100" : "opacity-0"
                  }`}
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
                  <button className="mt-2 px-6 py-2 border border-[#D4AF37]/60 text-[#D4AF37] text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1C2B3A] transition-all duration-200 font-semibold">
                    View Details
                  </button>
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
            <button className="px-10 py-4 border border-[#005F40] text-[#005F40] text-sm font-semibold tracking-widest uppercase hover:bg-[#005F40] hover:text-white transition-all duration-300">
              View Full Collection
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          5. EDUCATIONAL PROGRAMS
      ──────────────────────────────────────────────────────────────── */}
      <section id="courses" className="py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
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
            {courses.map((course) => (
              <div
                key={course.level}
                className={`relative flex flex-col transition-shadow duration-300 hover:shadow-xl ${
                  course.featured
                    ? "bg-[#005F40] text-white shadow-lg"
                    : "bg-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/60"
                }`}
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
                    className={`text-xs tracking-[0.2em] uppercase font-semibold mb-1 ${
                      course.featured ? "text-[#D4AF37]" : "text-[#D4AF37]"
                    }`}
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
                          className={`w-1 h-1 rotate-45 mt-1.5 flex-shrink-0 ${
                            course.featured ? "bg-[#D4AF37]" : "bg-[#D4AF37]"
                          }`}
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
                    className={`w-full py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-200 ${
                      course.featured
                        ? "bg-[#D4AF37] text-[#1C2B3A] hover:bg-[#C49D2A]"
                        : "bg-[#005F40] text-white hover:bg-[#004530]"
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
          6. CONTACT & FOOTER
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
                    },
                    {
                      icon: <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: "Phone",
                      value: "+971 2 401 7000",
                    },
                    {
                      icon: <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />,
                      label: "Email",
                      value: "calligraphy@islamicciv.ae",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-medium mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map embed placeholder */}
                <div className="relative h-52 bg-[#002A1C] border border-[#D4AF37]/20 overflow-hidden">
                  <iframe
                    title="Calligraphy Center Location — Saadiyat Island, Abu Dhabi"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=54.40,24.53,54.45,24.56&layer=mapnik&marker=24.547,54.422"
                    className="w-full h-full opacity-70"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
                </div>
              </div>

              {/* Right: sign-up form */}
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
                  <div className="py-12 text-center border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                    <div className="w-12 h-12 mx-auto mb-4 text-[#D4AF37]">
                      <StarTile />
                    </div>
                    <p className="text-[#D4AF37] font-semibold tracking-wide">
                      Message Received — Shukran!
                    </p>
                    <p className="text-white/50 text-sm mt-1">We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {[
                      { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={formData[field.id as "name" | "email"]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.id]: e.target.value })
                          }
                          className="w-full bg-[#002A1C] border border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder-white/25 px-4 py-3 text-sm outline-none transition-colors duration-200"
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Your enquiry or message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#002A1C] border border-[#D4AF37]/20 focus:border-[#D4AF37]/60 text-white placeholder-white/25 px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#D4AF37] text-[#1C2B3A] text-sm font-bold tracking-widest uppercase hover:bg-[#C49D2A] transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-[#D4AF37] opacity-60">
              <StarTile />
            </div>
            <div>
              <p className="text-[#D4AF37] text-xs tracking-widest font-medium">Calligraphy Center</p>
              <p className="text-white/30 text-[10px]">Center of Islamic Civilization</p>
            </div>
          </div>

          <p className="text-white/30 text-[11px] tracking-wide text-center">
            © 2024 Center of Islamic Civilization — Abu Dhabi. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="mailto:calligraphy@islamicciv.ae"
              aria-label="Email"
              className="w-9 h-9 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
