# ТЕХНИЧЕСКОЕ ЗАДАНИЕ / TECHNICAL SPECIFICATION
# Xattotlik Markazi — Islom Sivilizatsiyasi Markazi veb-sayt loyihasi

---

## 1. UMUMIY MA'LUMOT / GENERAL INFORMATION

| Parametr | Qiymat |
|---|---|
| **Loyiha nomi** | Xattotlik Markazi — Islom Sivilizatsiyasi Markazi |
| **Veb-sayt turi** | Ko'p sahifali korporativ veb-ilova (Multi-page SPA) |
| **Texnologiya** | React 18 + TypeScript + Vite 6 + TailwindCSS 4 |
| **Manzil** | Islom Sivilizatsiyasi Markazi, Qorasaroy ko'chasi, Toshkent, O'zbekiston |
| **Loyiha muallifi** | Shavkat Miromonovich Mirziyoyev — O'zbekiston Respublikasi Prezidenti |

---

## 2. MAQSAD VA VAZIFALAR / PURPOSE & OBJECTIVES

### 2.1 Maqsad
Islom Sivilizatsiyasi Markazi huzuridagi Xattotlik Markazi faoliyatini raqamli shaklda taqdim etuvchi, professional va zamonaviy ko'rinishdagi ko'p tilli veb-sayt yaratish.

### 2.2 Asosiy vazifalar
- Markazning faoliyati, maqsadlari va tarixi haqida ma'lumot berish
- O'quv dasturlari va kurslar ro'yxatini taqdim etish
- Xattotlik asarlari galereyasini ko'rsatish
- Jamoani tanishtirish
- Loyiha muallifi — Shavkat Mirziyoyev — biografiyasini joylashtirish
- Tashrif buyuruvchilar bilan aloqa o'rnatish imkoniyati
- 4 tilda (O'zbek, Ingliz, Rus, Arab) to'liq lokalizatsiya

---

## 3. TEXNIK TALABLAR / TECHNICAL REQUIREMENTS

### 3.1 Texnologik Stack

| Qatlam | Texnologiya | Versiya |
|---|---|---|
| **UI Framework** | React | 18.3.1 |
| **Til** | TypeScript | Latest |
| **Build Tool** | Vite | 6.3.5 |
| **CSS Framework** | TailwindCSS | 4.1.12 |
| **Ikonlar** | Lucide React | 0.487.0 |
| **Komponentlar** | Radix UI (to'liq to'plam) | Latest |
| **Animatsiyalar** | Motion (Framer Motion) | 12.x |

### 3.2 Brauzer moslik talablari
- Google Chrome 100+
- Mozilla Firefox 100+
- Microsoft Edge 100+
- Safari 15+
- Mobile: iOS Safari, Android Chrome

### 3.3 Javob beruvchi dizayn (Responsive Design)
- **Mobile:** 320px – 767px
- **Tablet:** 768px – 1023px
- **Desktop:** 1024px va undan katta

### 3.4 Qurilish va deploy
```bash
# O'rnatish
pnpm install

# Ishlab chiqish serveri
npm run dev

# Production build
npm run build
```

---

## 4. SAHIFALAR TUZILMASI / PAGE STRUCTURE

Sayt quyidagi 7 ta sahifaga bo'lingan (SPA state machine asosida):

```
/ (Home)
├── /author      — Loyiha muallifi (2-o'rin)
├── /about       — Biz haqimizda
├── /gallery     — Galereya
├── /courses     — Kurslar
├── /team        — Jamoamiz
└── /contact     — Aloqa
```

### 4.1 Navigatsiya tartibi (Desktop & Mobile)
```
Bosh sahifa | Loyiha muallifi | Biz haqimizda | Galereya | Kurslar | Jamoamiz | Aloqa
```

---

## 5. SAHIFALAR TAVSIFI / PAGE DESCRIPTIONS

### 5.1 Bosh Sahifa (Home)

**Maqsad:** Saytga tashrif buyuruvchini kutib olish va asosiy ma'lumotlarni taqdim etish.

**Tarkib:**
- **Hero bo'limi:** To'liq ekran, fon rasmli, asosiy sarlavha va CTA tugma
  - Sarlavha: "San'ati Abadiy Bitik" (animatsiyali)
  - CTA: "Galereyamizni kashf eting" — Galereya sahifasiga o'tish
  - "Batafsil ma'lumot" — Kurslar sahifasiga o'tish
- **Statistika bo'limi:** 4 ta ko'rsatkich (talabalar, millatlar, qo'lyozmalar, yillik meros)
- **Guvohliklar bo'limi:** Talabalar fikrlari (3 ta sharh)

---

### 5.2 Loyiha Muallifi (Project Author)

**Maqsad:** Loyiha tashabbuskori — O'zbekiston Respublikasi Prezidenti Shavkat Mirziyoyev — haqida to'liq biografik ma'lumot berish.

**Tarkib:**
- **Chap ustun (1/3):** Portrait kartasi
  - Rasmi (portrait foto)
  - Ismi: Shavkat Mirziyoyev
  - Lavozimi: O'zbekiston Respublikasi Prezidenti, Xattotlik markazi tashabbuskori
  - Mukofotlari: «Mehnat shuhrati» va «Fidokorona xizmatlari uchun» ordenlari
- **O'ng ustun (2/3):** Xronologik vaqt chizig'i (Timeline)
  - 1957 — Tug'ilgan yil va ta'lim
  - 1981 — Mehnat faoliyatining boshlanishi
  - 1990 — Siyosiy faoliyat
  - 1992 — Hokim lavozimi
  - 1995-2003 — Oliy Majlis deputati
  - 2003 — Bosh vazir
  - 2016 — Prezident saylovi
  - 2021 — Qayta saylash

**UI talablari:**
- Timeline nodi: oltin rangli, diamond shaklidagi belgi
- Har bir kard: hover effekti bilan
- RTL (o'ngdan chapga) qo'llab-quvvatlash (Arab tili uchun)

---

### 5.3 Biz Haqimizda (About)

**Maqsad:** Markaz tarixi, maqsadlari va faoliyati haqida ma'lumot berish.

**Tarkib:**
- Markazning tashkil etilish tarixi (2017-yil)
- Asosiy statistikalar (4000+ talaba, 60 mamlakat, 2000+ qo'lyozma)
- Hamkorlik logo — Islom Sivilizatsiyasi Markazi
- 3 ta taniqli o'qituvchining portret kartalari
- Interaktiv xarita (Google Maps embed) — Markazning joylashuvi

**Joylashuv koordinatalari:**
- Latitude: 41.33384192698365
- Longitude: 69.24160998403887

---

### 5.4 Galereya (Gallery)

**Maqsad:** Markazning xattotlik asarlarini namoyish etish.

**Tarkib:**
- Asarlar to'plami (31 ta rasm, sample1.png – sample31.png)
- Filter tizimi: Xat uslublari bo'yicha filtrlash (Sulus, Nasx, Kufiy, Devoniy, Tug'ro)
- Lightbox: Rasmni kattalashtirish imkoniyati
  - Esc tugmasi bilan yopish
  - Strelka tugmalari bilan o'tish
  - Ko'rish hisoblagichi
- Grid layout: Responsive mosaic grid
- GalleryPage.tsx — alohida komponent fayli (hideHeader prop bilan)

---

### 5.5 Kurslar (Courses)

**Maqsad:** Ta'lim dasturlari va ularning narxlari haqida ma'lumot berish.

**Tarkib:** 3 ta kurs darajasi:

| Daraja | Nomi | Muddati | Jadval |
|---|---|---|---|
| Boshlang'ich | Yozuv asoslari | 3 oy | Hafta/2 kun |
| O'rta | Nasx va Sulus mahorati | 6 oy | Hafta/3 kun |
| Master-klass | Zarhal berish san'ati | 10 kun | Intensiv |

Har bir kurs kartasida:
- Daraja belgisi va nomi
- Tavsifi
- Muddati va jadvali
- To'lov miqdori
- Ro'yxatdan o'tish tugmasi
- 3 ta xususiyat ro'yxati

---

### 5.6 Jamoamiz (Team)

**Maqsad:** Markazning o'qituvchilar jamoasini tanishtirish.

**Tarkib:** 5 ta o'qituvchi kartalari:

| Ism | Mutaxassislik |
|---|---|
| Shayx Hasan Al-Farsi | Sulus va Nasx — Istanbul maktabi |
| Dr. Layla Al-Mansuri | Kufiy geometrik — Andalusiya uslubi |
| Ustoz Karim Diab | Devoniy Jaliy — Qohira akademiyasi |
| Ustoz Alisher Usmonov | Nastaliq va Buxoro maktabi |
| Ustoz Sabohat Olimova | Zarhal berish va miniatyura san'ati |

---

### 5.7 Aloqa (Contact)

**Maqsad:** Tashrif buyuruvchilar bilan bog'lanish imkoniyatini yaratish.

**Tarkib:**
- Aloqa ma'lumotlari: Manzil, Telefon, Email
- Interaktiv xarita: Google Maps embed
- Aloqa formasi:
  - To'liq ism (majburiy)
  - Email manzil (majburiy, validatsiya bilan)
  - Xabar matni (majburiy)
  - Yuborish tugmasi
  - Muvaffaqiyatli yuborilganda: konfetti animatsiyasi + muvaffaqiyat xabari
  - Xato bo'lganda: inline xato xabarlari

---

## 6. LOKALIZATSIYA / LOCALIZATION

### 6.1 Qo'llab-quvvatlanadigan tillar

| Kod | Til | Yozuv yo'nalishi |
|---|---|---|
| uz | O'zbek | LTR (chapdan o'ngga) |
| en | English | LTR (chapdan o'ngga) |
| ru | Ruscha | LTR (chapdan o'ngga) |
| ar | Arabcha | RTL (o'ngdan chapga) |

### 6.2 Til tanlash komponenti

**Dizayn:** Navigatsiya panelida joylashgan, oltin rangli doira ko'rinishidagi tugma.

- Tugma ko'rinishi: Joriy til kodi (UZ / EN / RU / AR) — yuqori harflar, oltin chegara bilan
- Dropdown: Kichik ochiladigan menyu — 4 ta til kodi ko'rsatiladi
- Aktiv til: To'q yashil fon, oq matn
- Emoji bayroqlar ISHLATILMAYDI — barcha qurilmalarda ko'rinishi kafolatlanadi

### 6.3 RTL qo'llab-quvvatlash (Arab tili)
Arab tili tanlanganda quyidagilar avtomatik o'zgaradi:
- Matn tekisligi: o'ngga
- Timeline chizig'i: o'ng tomonga
- Dropdown yo'nalishi: chapga ochiladi
- Flexbox tartiblar teskari bo'ladi

---

## 7. DIZAYN TIZIMI / DESIGN SYSTEM

### 7.1 Rang palitrasi

| Nom | HEX | Ishlatilish |
|---|---|---|
| Asosiy yashil | #005F40 | Sarlavhalar, tugmalar, navigatsiya |
| Oltin | #D4AF37 | Aksentlar, chegara chiziqlari, ikonlar |
| Fon | #FAF9F6 | Asosiy fon rangi |
| Qora matn | #1C1C1C | Asosiy matn |
| Kulrang matn | #6B7280 | Ikkinchi darajali matn |

### 7.2 Tipografiya

| Vazifa | Font | Uslub |
|---|---|---|
| Sarlavhalar | Playfair Display | Serif, cursive |
| Navigatsiya | Montserrat | Sans-serif, tracking-wide |
| Asosiy matn | Inter / Roboto | Sans-serif |

### 7.3 Komponentlar

**GoldDivider** — Sahifalar orasidagi dekorativ bo'luvchi chiziq — oltin rangdagi diamond shakllar bilan.

**SectionLabel** — Kichik tepa yorliq: sariq, katta harflar, keng harf oralig'i.

**StarTile** — 8 burchakli islom yulduzi SVG pattern — fon dekoratsiyasi sifatida.

**Lightbox** — Galereyada rasmni kattalashtirish modali:
- Fon: qora, yarim shaffof
- Yopish: Esc tugmasi
- O'tish: klaviatura strelkalari yoki tugmalar
- Hisoblagich: "X / Y" formatida

---

## 8. NAVIGATSIYA / NAVIGATION

### 8.1 Menyu elementlari tartibi

```
1. Bosh sahifa (Home)
2. Loyiha muallifi (Author)   <- 2-o'rin (muhim)
3. Biz haqimizda (About)
4. Galereya (Gallery)
5. Kurslar (Courses)
6. Jamoamiz (Team)
7. Aloqa (Contact)
```

### 8.2 Desktop navigatsiyasi (1024px+)
- Brand logotipi (chap tomonda): Logo + sarlavha
- Menyu havolalari (markaz): Gorizontal, hover effekti bilan
- Til tanlash (o'ng tomonda): Doira tugma + dropdown
- "Hozir ro'yxatdan o'ting" tugmasi (o'ng tomonda)

### 8.3 Mobil navigatsiya (< 1024px)
- Brand logotipi (chap tomonda)
- Til tanlash tugmasi (o'ng tomonda, menyu tugmasidan oldin)
- Hamburger menyu tugmasi (o'ng tomonda)
- Yashirin menyu: Tugmani bosganda ochiladigan vertikal ro'yxat

---

## 9. HEADER / BOSH PANEL

- Fon: rgba(250, 249, 246, 0.97) + backdrop-blur-md
- Chegara: border-b, oltin rang
- Logotip: Rasm + "Islom Sivilizatsiyasi Markazi" + "Xattotlik Markazi"
- Balandligi: 64px
- Pozitsiya: Yuqorida qattiq (sticky)

---

## 10. FOOTER / PASTKI PANEL

Barcha sahifalarda doim ko'rinadi.

**Tarkib:**
- Brand ma'lumotlari
- Ijtimoiy tarmoq havolalari: Instagram, YouTube, Telegram
- Mualliflik huquqi
- Sahifaga qaytish tugmasi (siljiganda paydo bo'ladi)

---

## 11. ANIMATSIYALAR / ANIMATIONS

| Effekt | Qo'llanilish joyi |
|---|---|
| Fade-in + slide-up | Sahifaga kirish animatsiyasi |
| Hover scale | Komponentlar (karta, rasm, tugma) |
| Gold underline slide | Navigatsiya hover effekti |
| Rotate hamburger | Mobil menyu ochilish/yopilish |
| Timeline node hover | Vaqt chizig'i nodi rang o'zgarishi |
| Confetti | Aloqa formasi muvaffaqiyati |
| Chevron rotate | Dropdown menyu ochilishi |

---

## 12. XAVFSIZLIK VA SEO TALABLARI

### 12.1 SEO
- Sahifada bir bitta h1 elementi
- Meta tavsif — barcha sahifalar uchun
- Semantik HTML elementlar (nav, main, section, header, footer)
- Rasmlar uchun alt atributlari

### 12.2 Accessibility (A11y)
- role="menubar", role="menuitem" atributlari
- aria-label, aria-expanded atributlari
- Fokus ko'rinarli holat (focus-visible ring)
- Klaviatura bilan to'liq boshqaruv imkoniyati
- Kontrast nisbati: WCAG AA standart

---

## 13. FAYLLAR TUZILMASI / FILE STRUCTURE

```
Xattotlik/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Asosiy ilova (2600+ qator)
│   │   └── components/
│   │       ├── GalleryPage.tsx  # Galereya sahifasi komponenti
│   │       ├── figma/           # Figma export komponentlari
│   │       └── ui/              # Radix UI asosidagi UI komponentlari
│   ├── assets/
│   │   ├── logo.JPG             # Markaz logotipi
│   │   ├── owner.png            # Loyiha muallifi rasmi
│   │   ├── partner.png          # Hamkor tashkilot logosi
│   │   ├── teacher1-5.png       # O'qituvchilar rasmlari
│   │   └── sample1-31.png       # Galereya asarlari
│   ├── styles/                  # Global CSS uslublari
│   └── main.tsx                 # React kirish nuqtasi
├── index.html                   # HTML shabloni
├── vite.config.ts               # Vite konfiguratsiyasi
├── package.json                 # Bog'liqliklar
└── TECHNICAL_TASK.md            # Ushbu texnik vazifa (joriy fayl)
```

---

## 14. LOYIHA HOLATI / PROJECT STATUS

| Modul | Holat |
|---|---|
| Navigatsiya (ko'p sahifali) | Yakunlangan |
| Lokalizatsiya (4 til) | Yakunlangan |
| Home sahifasi | Yakunlangan |
| About sahifasi | Yakunlangan |
| Gallery sahifasi | Yakunlangan |
| Courses sahifasi | Yakunlangan |
| Team sahifasi | Yakunlangan |
| Contact sahifasi + xarita | Yakunlangan |
| Loyiha muallifi sahifasi | Yakunlangan |
| Til tanlash (matn kodlari) | Yakunlangan |
| RTL (Arab tili) qo'llab-quvvatlash | Yakunlangan |
| Responsive dizayn | Yakunlangan |
| Production build | Muvaffaqiyatli |

---

## 15. MUALLIFLIK HUQUQI / COPYRIGHT

```
(c) 2025 Islom Sivilizatsiyasi Markazi — Toshkent, O'zbekiston
Barcha huquqlar himoyalangan.
```

---

*Ushbu texnik vazifa hujjati loyiha ishlanmasi jarayonida yaratilgan bo'lib,
loyiha talablari va amalga oshirilgan ishlarning to'liq tavsifini o'z ichiga oladi.*
