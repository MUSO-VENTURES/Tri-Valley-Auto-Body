/* ============================================================
   Tri-Valley Auto Body — i18n
   ------------------------------------------------------------
   Swaps the static marketing copy on the page based on the
   language picked in the topbar dropdown. Elements are matched by
   [data-i18n] (textContent) or [data-i18n-html] (innerHTML, for the
   handful of strings that need a <br> or <code> tag) or
   [data-i18n-placeholder] (input placeholder attribute).

   NOTE: these are AI-generated translations, not reviewed by a
   native speaker of each language. Good enough to demo the feature
   and to work from, but get them checked before leaning on them for
   real customer-facing accuracy — especially anything touching
   insurance/warranty language.

   Scope: this covers the static template copy in index.html and the
   five sample testimonials. It does NOT translate data-driven widget
   content (gallery.json captions, insurance.json carrier names, the
   "DRP Partner" tag rendered by js/widgets.js) — that's a follow-up
   if wanted.
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "tvab_lang";
  var RTL_LANGS = { AR: true };

  var T = {
    EN: {
      topbar: { hours: "Mon–Fri · 8am–5pm", language: "Language", spanish: "Habla Español" },
      nav: { services: "Services", gallery: "Gallery", about: "About", reviews: "Reviews", contact: "Contact", callNow: "Call Now" },
      cta: {
        freeEstimate: "Free Estimate",
        callPhone: "Call 925.443.8548 →",
        getEstimate: "Get an estimate →",
        lookupCarrier: "Look up your carrier →"
      },
      hero: {
        eyebrow: "Family-Owned Since 1980",
        headline: "Built to<br>Standard.",
        rating: "4.5 Google Rating",
        bbb: "BBB A+ Accredited",
        icar: "I-CAR Gold Class",
        spanish: "Se Habla Español"
      },
      recentWork: {
        eyebrow: "Recent Work",
        heading: "From The Shop Floor",
        frameBay: "Frame & teardown bay",
        paintBooth: "Paint booth",
        panelFitup: "Panel fit-up",
        liftBay: "Lift bay",
        viewGallery: "View Full<br>Gallery"
      },
      services: {
        eyebrow: "What We Do",
        heading: "Every Repair, Done Right",
        intro: "From a scuffed bumper to a full frame straighten, our I-CAR Gold Class techs handle it in-house.",
        collision: { title: "Collision Repair", desc: "Full structural and cosmetic repair for any size accident. Unibody and frame damage, panel replacement, and OEM-spec reassembly — backed by a lifetime workmanship warranty." },
        painting: { title: "Auto Painting", desc: "Computer color-matched paint applied in our down-draft booth. Blend, clear, and cure to a factory finish — on a single panel or a full respray." },
        pdr: { title: "Paintless Dent Repair", desc: "Hail damage and minor door dings removed without cutting or repainting, preserving your factory finish and resale value." },
        frame: { title: "Frame Straightening", desc: "Computerized frame measuring and hydraulic pulling to restore your vehicle's structure to OEM tolerances." },
        glass: { title: "Auto Glass", desc: "Windshield, back glass, and window replacement with OEM or OEM-equivalent glass, including ADAS camera recalibration." },
        insurance: { title: "Insurance Claims Handling", desc: "Direct Repair Program partner with most major carriers — we can bill them directly and manage the paperwork." }
      },
      gallery: {
        eyebrow: "Signature Repairs",
        heading: "See The Difference",
        intro: "Drag the slider — this is the standard every car leaves our shop meeting.",
        before: "Before",
        after: "After",
        fullEyebrow: "Full Gallery",
        browseHeading: "Browse Real Jobs",
        loading: "Loading recent work…",
        setupTag: "How to add real photos",
        setupText: "This gallery reads from <code>data/gallery.json</code>. Drop before/after photos in <code>images/gallery/</code>, then set each job's <code>\"before\"</code> / <code>\"after\"</code> fields to the file path. No code changes needed."
      },
      process: {
        eyebrow: "Our Process",
        heading: "From Drop-Off To Done",
        intro: "Every repair follows the same five steps — no surprises, no shortcuts.",
        step1: { title: "Estimate", desc: "Free in-person or photo estimate, usually same-day." },
        step2: { title: "Insurance", desc: "We file the claim and coordinate directly with your carrier." },
        step3: { title: "Teardown", desc: "Full disassembly to catch hidden damage before repair begins." },
        step4: { title: "Repair & Paint", desc: "Structural repair, panel work, and color-matched paint." },
        step5: { title: "Quality Check", desc: "Reassembly, wash, and a final inspection before pickup." }
      },
      about: {
        eyebrow: "Our Story",
        heading: "Three Generations, One Standard.",
        p1: "Tri-Valley Auto Body is a family-owned and operated auto body repair shop with decades of experience providing auto body repair services to the entire Tri-Valley area. Since our inception in 1980, owner Fernando Romero Sr. has offered services with a family-based approach, offering customers customized collision repair processes that exceed expectations.",
        p2: "From the initial point of contact, our family will treat you like family. Now in its third generation, Tri-Valley Auto Body understands the importance of community, family and quality collision repair services. For us, they all go hand in hand to provide exceptional customer service with compassion and a commitment to your safety.",
        p3: "Our family would like to invite you to experience the Tri-Valley Auto Body difference."
      },
      team: {
        eyebrow: "Meet The Team",
        heading: "Who's Working On Your Car",
        intro: "Every technician here is I-CAR certified and most have been with us for over a decade.",
        roleOwner: "Owner & Master Technician",
        roleManager: "Shop Manager",
        roleEstimator: "Estimator",
        rolePaintLead: "Paint Lead"
      },
      certs: { eyebrow: "Certifications & Standing", ase: "ASE Certified Technicians", licensed: "Licensed & Insured", warranty: "Lifetime Workmanship Warranty" },
      reviews: {
        eyebrow: "Reviews",
        heading: "What Our Customers Say",
        intro: "Real feedback from real customers across the Tri-Valley — pulled straight from Google.",
        ratingBadge: "4.5 average · 300+ Google reviews",
        writeReview: "Write a Google Review →",
        placeIdNote: "Replace the <code>placeid=</code> link with your shop's real Google Place ID."
      },
      estimate: {
        eyebrow: "Free Estimate",
        heading: "Tell Us What Happened",
        intro: "Photos help but aren't required. We'll follow up within one business day.",
        labelName: "Full Name",
        labelPhone: "Phone",
        labelEmail: "Email",
        labelVehicle: "Vehicle (Year / Make / Model)",
        labelInsurance: "Insurance Carrier (if any)",
        labelService: "Service Needed",
        notSure: "Not sure",
        labelDetails: "Describe The Damage",
        labelPhotos: "Photos (optional)",
        photosCta: "Take a photo or upload from your device",
        submit: "Request Estimate"
      },
      booking: { eyebrow: "Or Skip Ahead", heading: "Book A Drop-Off Time", intro: "Pick a day and time that works — we'll confirm by text." },
      insurance: {
        eyebrow: "Filing A Claim",
        heading: "Find Your Insurance Carrier",
        intro: "Search or pick your carrier below for their direct claims line — and see if we're an approved direct-repair shop for them.",
        searchPlaceholder: "Search your insurance carrier…",
        loading: "Loading carriers…"
      },
      contact: {
        eyebrow: "Find Us",
        phoneLabel: "Phone:",
        textLabel: "Text:",
        hoursLabel: "Hours:",
        hours: "Mon–Fri, 8am–5pm · Closed weekends",
        getDirections: "Get Directions →",
        sendMessageEyebrow: "Send A Message",
        quickQuestion: "Quick Question?",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        sendMessage: "Send Message"
      },
      ctaBanner: { heading: "Get a free estimate today.", requestEstimate: "Request Estimate", callPhone: "Call 925.443.8548" },
      footer: {
        tagline: "Family-owned and operated collision repair, serving Livermore and the Tri-Valley since 1980.",
        servicesHeading: "Services",
        pdr: "PDR",
        companyHeading: "Company",
        aboutUs: "About Us",
        ourWork: "Our Work",
        insurance: "Insurance",
        bookOnline: "Book Online",
        directions: "Directions",
        credentials: "I-CAR Gold Class · Licensed · Insured"
      },
      chat: { label: "Chat with us" },
      testimonials: [
        { text: "\"After a rear-end collision on 580, I was dreading the whole process. Tri Valley handled my insurance, sourced the parts, and delivered my SUV looking better than before the accident.\"", who: "Erin C.", loc: "Livermore, CA" },
        { text: "\"Handled the insurance paperwork end to end so the whole process felt effortless. Kept me updated by text at every stage.\"", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "\"Third repair with this shop over the years, and every single one has been done right. Third-generation family business, and it shows.\"", who: "Kent S.", loc: "Livermore, CA" },
        { text: "\"Hail hit my Camry hard. PDR brought every panel back without a speck of new paint. You cannot tell it ever happened.\"", who: "Priya S.", loc: "Dublin, CA" },
        { text: "\"Straightforward estimate, no upselling, done exactly when they said it would be.\"", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    ES: {
      topbar: { hours: "Lun–Vie · 8am–5pm", language: "Idioma", spanish: "Hablamos Español" },
      nav: { services: "Servicios", gallery: "Galería", about: "Nosotros", reviews: "Reseñas", contact: "Contacto", callNow: "Llamar" },
      cta: {
        freeEstimate: "Presupuesto Gratis",
        callPhone: "Llamar al 925.443.8548 →",
        getEstimate: "Solicitar presupuesto →",
        lookupCarrier: "Buscar tu aseguradora →"
      },
      hero: {
        eyebrow: "Familia Propietaria Desde 1980",
        headline: "Hecho Con<br>Estándar.",
        rating: "4.5 en Google",
        bbb: "Acreditación BBB A+",
        icar: "I-CAR Gold Class",
        spanish: "Hablamos Español"
      },
      recentWork: {
        eyebrow: "Trabajo Reciente",
        heading: "Desde El Taller",
        frameBay: "Bahía de desarmado y chasis",
        paintBooth: "Cabina de pintura",
        panelFitup: "Ajuste de paneles",
        liftBay: "Bahía de elevación",
        viewGallery: "Ver Galería<br>Completa"
      },
      services: {
        eyebrow: "Qué Hacemos",
        heading: "Cada Reparación, Bien Hecha",
        intro: "Desde un parachoques rayado hasta un enderezado completo del chasis, nuestros técnicos I-CAR Gold Class lo hacen todo internamente.",
        collision: { title: "Reparación de Colisiones", desc: "Reparación estructural y estética completa para accidentes de cualquier tamaño. Daño de chasis y carrocería, reemplazo de paneles y reensamblaje según especificaciones OEM — respaldado por una garantía de por vida en la mano de obra." },
        painting: { title: "Pintura Automotriz", desc: "Pintura con emparejamiento de color computarizado aplicada en nuestra cabina de flujo descendente. Mezcla, barniz y curado a acabado de fábrica — en un solo panel o un repintado completo." },
        pdr: { title: "Reparación de Abolladuras Sin Pintura", desc: "Daño por granizo y pequeñas abolladuras de puertas eliminados sin cortar ni repintar, preservando el acabado de fábrica y el valor de reventa." },
        frame: { title: "Enderezado de Chasis", desc: "Medición computarizada del chasis y tracción hidráulica para restaurar la estructura de su vehículo a las tolerancias OEM." },
        glass: { title: "Cristales Automotrices", desc: "Reemplazo de parabrisas, cristal trasero y ventanas con cristal OEM o equivalente, incluyendo recalibración de cámaras ADAS." },
        insurance: { title: "Gestión de Reclamos de Seguro", desc: "Socio del Programa de Reparación Directa con la mayoría de las principales aseguradoras — podemos facturarles directamente y gestionar el papeleo." }
      },
      gallery: {
        eyebrow: "Reparaciones Insignia",
        heading: "Vea La Diferencia",
        intro: "Arrastre el control deslizante — este es el estándar con el que cada auto sale de nuestro taller.",
        before: "Antes",
        after: "Después",
        fullEyebrow: "Galería Completa",
        browseHeading: "Vea Trabajos Reales",
        loading: "Cargando trabajos recientes…",
        setupTag: "Cómo agregar fotos reales",
        setupText: "Esta galería lee desde <code>data/gallery.json</code>. Coloque fotos de antes/después en <code>images/gallery/</code>, luego configure los campos <code>\"before\"</code> / <code>\"after\"</code> de cada trabajo con la ruta del archivo. No se necesitan cambios de código."
      },
      process: {
        eyebrow: "Nuestro Proceso",
        heading: "Desde La Entrega Hasta El Final",
        intro: "Cada reparación sigue los mismos cinco pasos — sin sorpresas, sin atajos.",
        step1: { title: "Presupuesto", desc: "Presupuesto gratuito en persona o por foto, generalmente el mismo día." },
        step2: { title: "Seguro", desc: "Presentamos el reclamo y coordinamos directamente con su aseguradora." },
        step3: { title: "Desarmado", desc: "Desmontaje completo para detectar daños ocultos antes de comenzar la reparación." },
        step4: { title: "Reparación y Pintura", desc: "Reparación estructural, trabajo de paneles y pintura con color emparejado." },
        step5: { title: "Control de Calidad", desc: "Reensamblaje, lavado e inspección final antes de la entrega." }
      },
      about: {
        eyebrow: "Nuestra Historia",
        heading: "Tres Generaciones, Un Solo Estándar.",
        p1: "Tri-Valley Auto Body es un taller de reparación de carrocerías de propiedad y operación familiar, con décadas de experiencia brindando servicios de reparación de carrocerías a toda la zona de Tri-Valley. Desde nuestra fundación en 1980, el propietario Fernando Romero Sr. ha ofrecido servicios con un enfoque familiar, brindando a los clientes procesos de reparación de colisiones personalizados que superan las expectativas.",
        p2: "Desde el primer contacto, nuestra familia lo tratará como parte de la familia. Ahora en su tercera generación, Tri-Valley Auto Body comprende la importancia de la comunidad, la familia y los servicios de reparación de colisiones de calidad. Para nosotros, todo eso va de la mano para brindar un servicio al cliente excepcional con compasión y un compromiso con su seguridad.",
        p3: "Nuestra familia le invita a experimentar la diferencia de Tri-Valley Auto Body."
      },
      team: {
        eyebrow: "Conozca Al Equipo",
        heading: "Quién Trabaja En Su Auto",
        intro: "Cada técnico aquí está certificado por I-CAR y la mayoría lleva más de una década con nosotros.",
        roleOwner: "Propietario y Técnico Maestro",
        roleManager: "Gerente del Taller",
        roleEstimator: "Estimador",
        rolePaintLead: "Jefe de Pintura"
      },
      certs: { eyebrow: "Certificaciones y Reputación", ase: "Técnicos Certificados ASE", licensed: "Licenciado y Asegurado", warranty: "Garantía de Por Vida en Mano de Obra" },
      reviews: {
        eyebrow: "Reseñas",
        heading: "Lo Que Dicen Nuestros Clientes",
        intro: "Comentarios reales de clientes reales en todo el Tri-Valley — tomados directamente de Google.",
        ratingBadge: "4.5 de promedio · 300+ reseñas en Google",
        writeReview: "Escribir una Reseña en Google →",
        placeIdNote: "Reemplace el enlace <code>placeid=</code> con el ID de lugar real de Google de su taller."
      },
      estimate: {
        eyebrow: "Presupuesto Gratis",
        heading: "Cuéntenos Qué Pasó",
        intro: "Las fotos ayudan, pero no son obligatorias. Le responderemos dentro de un día hábil.",
        labelName: "Nombre Completo",
        labelPhone: "Teléfono",
        labelEmail: "Correo Electrónico",
        labelVehicle: "Vehículo (Año / Marca / Modelo)",
        labelInsurance: "Aseguradora (si aplica)",
        labelService: "Servicio Necesario",
        notSure: "No estoy seguro",
        labelDetails: "Describa El Daño",
        labelPhotos: "Fotos (opcional)",
        photosCta: "Toma una foto o sube una desde tu dispositivo",
        submit: "Solicitar Presupuesto"
      },
      booking: { eyebrow: "O Adelántese", heading: "Reserve Una Hora De Entrega", intro: "Elija un día y hora que le convenga — confirmaremos por mensaje de texto." },
      insurance: {
        eyebrow: "Presentar Un Reclamo",
        heading: "Encuentre Su Aseguradora",
        intro: "Busque o elija su aseguradora abajo para ver su línea directa de reclamos — y si somos un taller de reparación directa aprobado para ellos.",
        searchPlaceholder: "Busque su aseguradora…",
        loading: "Cargando aseguradoras…"
      },
      contact: {
        eyebrow: "Encuéntranos",
        phoneLabel: "Teléfono:",
        textLabel: "Mensaje de texto:",
        hoursLabel: "Horario:",
        hours: "Lun–Vie, 8am–5pm · Cerrado los fines de semana",
        getDirections: "Obtener Direcciones →",
        sendMessageEyebrow: "Envíe Un Mensaje",
        quickQuestion: "¿Una Pregunta Rápida?",
        formName: "Nombre",
        formEmail: "Correo Electrónico",
        formMessage: "Mensaje",
        sendMessage: "Enviar Mensaje"
      },
      ctaBanner: { heading: "Obtenga un presupuesto gratis hoy.", requestEstimate: "Solicitar Presupuesto", callPhone: "Llamar al 925.443.8548" },
      footer: {
        tagline: "Reparación de colisiones familiar, sirviendo a Livermore y el Tri-Valley desde 1980.",
        servicesHeading: "Servicios",
        pdr: "PDR",
        companyHeading: "Empresa",
        aboutUs: "Sobre Nosotros",
        ourWork: "Nuestro Trabajo",
        insurance: "Seguro",
        bookOnline: "Reservar en Línea",
        directions: "Direcciones",
        credentials: "I-CAR Gold Class · Licenciado · Asegurado"
      },
      chat: { label: "Chatea con nosotros" },
      testimonials: [
        { text: "\"Después de una colisión trasera en la 580, temía todo el proceso. Tri Valley se encargó de mi seguro, consiguió las piezas y me entregó mi SUV luciendo mejor que antes del accidente.\"", who: "Erin C.", loc: "Livermore, CA" },
        { text: "\"Manejaron el papeleo del seguro de principio a fin, así que todo el proceso se sintió sin esfuerzo. Me mantuvieron informado por mensaje de texto en cada etapa.\"", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "\"Tercera reparación con este taller a lo largo de los años, y cada una se ha hecho bien. Negocio familiar de tercera generación, y se nota.\"", who: "Kent S.", loc: "Livermore, CA" },
        { text: "\"El granizo golpeó fuerte mi Camry. La reparación sin pintura devolvió cada panel sin una pizca de pintura nueva. No se nota que haya pasado.\"", who: "Priya S.", loc: "Dublin, CA" },
        { text: "\"Presupuesto directo, sin ventas adicionales, terminado exactamente cuando dijeron que estaría.\"", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    AR: {
      topbar: { hours: "الإثنين–الجمعة · 8ص–5م", language: "اللغة", spanish: "نتحدث الإسبانية" },
      nav: { services: "الخدمات", gallery: "المعرض", about: "من نحن", reviews: "التقييمات", contact: "اتصل بنا", callNow: "اتصل الآن" },
      cta: {
        freeEstimate: "تقدير مجاني",
        callPhone: "اتصل 925.443.8548 ←",
        getEstimate: "احصل على تقدير ←",
        lookupCarrier: "ابحث عن شركة التأمين ←"
      },
      hero: {
        eyebrow: "شركة عائلية منذ عام 1980",
        headline: "الجودة هي<br>المعيار.",
        rating: "تقييم 4.5 على جوجل",
        bbb: "معتمد BBB A+",
        icar: "شهادة I-CAR الذهبية",
        spanish: "نتحدث الإسبانية"
      },
      recentWork: {
        eyebrow: "أعمال حديثة",
        heading: "من داخل الورشة",
        frameBay: "منطقة الهيكل والتفكيك",
        paintBooth: "غرفة الطلاء",
        panelFitup: "تركيب الألواح",
        liftBay: "منطقة الرفع",
        viewGallery: "عرض المعرض<br>الكامل"
      },
      services: {
        eyebrow: "ماذا نقدم",
        heading: "كل إصلاح، بالشكل الصحيح",
        intro: "من الخدش البسيط في الصادم إلى تقويم الهيكل الكامل، يتولى فنيونا الحاصلون على شهادة I-CAR الذهبية كل ذلك داخل الورشة.",
        collision: { title: "إصلاح حوادث التصادم", desc: "إصلاح هيكلي وتجميلي كامل لحوادث بأي حجم. أضرار الهيكل والشاسيه، واستبدال الألواح، وإعادة التجميع وفق مواصفات الشركة المصنعة — مدعوم بضمان مدى الحياة على جودة العمل." },
        painting: { title: "طلاء السيارات", desc: "طلاء بمطابقة لون حاسوبية يُطبّق في غرفة السحب الهوائي لدينا. مزج وطلاء شفاف ومعالجة للوصول لتشطيب المصنع — على لوح واحد أو طلاء كامل للسيارة." },
        pdr: { title: "إصلاح الخدوش دون طلاء", desc: "إزالة أضرار البَرَد وخدوش الأبواب البسيطة دون قص أو إعادة طلاء، مع الحفاظ على تشطيب المصنع وقيمة إعادة البيع." },
        frame: { title: "تقويم الهيكل", desc: "قياس حاسوبي للهيكل وشد هيدروليكي لإعادة بنية سيارتك إلى مواصفات الشركة المصنعة." },
        glass: { title: "زجاج السيارات", desc: "استبدال الزجاج الأمامي والخلفي والنوافذ بزجاج أصلي أو مكافئ له، بما في ذلك إعادة معايرة كاميرات نظام ADAS." },
        insurance: { title: "معالجة مطالبات التأمين", desc: "شريك في برنامج الإصلاح المباشر مع معظم شركات التأمين الكبرى — يمكننا إصدار الفاتورة لهم مباشرة وإدارة الأوراق." }
      },
      gallery: {
        eyebrow: "إصلاحات مميزة",
        heading: "شاهد الفرق",
        intro: "اسحب الشريط — هذا هو المعيار الذي تغادر به كل سيارة ورشتنا.",
        before: "قبل",
        after: "بعد",
        fullEyebrow: "المعرض الكامل",
        browseHeading: "تصفح أعمالاً حقيقية",
        loading: "جارٍ تحميل الأعمال الحديثة…",
        setupTag: "كيفية إضافة صور حقيقية",
        setupText: "يقرأ هذا المعرض من الملف <code>data/gallery.json</code>. ضع صور قبل/بعد في <code>images/gallery/</code>، ثم اضبط حقلي <code>\"before\"</code> / <code>\"after\"</code> لكل عمل على مسار الملف. لا حاجة لأي تعديل في الكود."
      },
      process: {
        eyebrow: "طريقة عملنا",
        heading: "من الاستلام حتى التسليم",
        intro: "يمر كل إصلاح بنفس الخطوات الخمس — بلا مفاجآت وبلا اختصارات.",
        step1: { title: "التقدير", desc: "تقدير مجاني حضوريًا أو عبر الصور، عادةً في نفس اليوم." },
        step2: { title: "التأمين", desc: "نقوم بتقديم المطالبة والتنسيق مباشرة مع شركة التأمين الخاصة بك." },
        step3: { title: "التفكيك", desc: "تفكيك كامل لاكتشاف أي أضرار خفية قبل بدء الإصلاح." },
        step4: { title: "الإصلاح والطلاء", desc: "إصلاح هيكلي، وأعمال الألواح، وطلاء مطابق للون." },
        step5: { title: "فحص الجودة", desc: "إعادة التجميع، والغسيل، وفحص نهائي قبل التسليم." }
      },
      about: {
        eyebrow: "قصتنا",
        heading: "ثلاثة أجيال، معيار واحد.",
        p1: "Tri-Valley Auto Body هي ورشة إصلاح هياكل سيارات مملوكة ومُدارة عائليًا، ولديها عقود من الخبرة في تقديم خدمات إصلاح هياكل السيارات لكامل منطقة Tri-Valley. منذ تأسيسها عام 1980، يقدم المالك Fernando Romero Sr. خدماته بأسلوب عائلي، ويوفر للعملاء عمليات إصلاح تصادم مخصصة تفوق التوقعات.",
        p2: "منذ لحظة التواصل الأولى، ستعاملك عائلتنا كأحد أفرادها. والآن في جيلها الثالث، تدرك Tri-Valley Auto Body أهمية المجتمع والعائلة وخدمات إصلاح التصادم عالية الجودة. بالنسبة لنا، كل ذلك يسير جنبًا إلى جنب لتقديم خدمة عملاء استثنائية بتعاطف والتزام بسلامتك.",
        p3: "تتشرف عائلتنا بدعوتك لتجربة الفرق الذي تقدمه Tri-Valley Auto Body."
      },
      team: {
        eyebrow: "تعرّف على الفريق",
        heading: "من يعمل على سيارتك",
        intro: "كل فني هنا حاصل على شهادة I-CAR، ومعظمهم معنا منذ أكثر من عقد.",
        roleOwner: "المالك وكبير الفنيين",
        roleManager: "مدير الورشة",
        roleEstimator: "مُقدِّر الأضرار",
        rolePaintLead: "رئيس قسم الطلاء"
      },
      certs: { eyebrow: "الشهادات والمكانة", ase: "فنيون معتمدون من ASE", licensed: "مرخّص ومؤمَّن", warranty: "ضمان مدى الحياة على جودة العمل" },
      reviews: {
        eyebrow: "التقييمات",
        heading: "ماذا يقول عملاؤنا",
        intro: "آراء حقيقية من عملاء حقيقيين في منطقة Tri-Valley — مأخوذة مباشرة من جوجل.",
        ratingBadge: "متوسط 4.5 · أكثر من 300 تقييم على جوجل",
        writeReview: "اكتب تقييمًا على جوجل ←",
        placeIdNote: "استبدل رابط <code>placeid=</code> بمعرّف موقع جوجل الحقيقي الخاص بورشتك."
      },
      estimate: {
        eyebrow: "تقدير مجاني",
        heading: "أخبرنا بما حدث",
        intro: "الصور تساعد لكنها ليست إلزامية. سنتواصل معك خلال يوم عمل واحد.",
        labelName: "الاسم الكامل",
        labelPhone: "الهاتف",
        labelEmail: "البريد الإلكتروني",
        labelVehicle: "السيارة (السنة / الشركة المصنعة / الطراز)",
        labelInsurance: "شركة التأمين (إن وجدت)",
        labelService: "الخدمة المطلوبة",
        notSure: "غير متأكد",
        labelDetails: "صف الضرر",
        labelPhotos: "الصور (اختياري)",
        photosCta: "التقط صورة أو ارفعها من جهازك",
        submit: "طلب تقدير"
      },
      booking: { eyebrow: "أو تخطَّ الخطوات", heading: "احجز موعد تسليم السيارة", intro: "اختر يومًا ووقتًا مناسبين — سنؤكد ذلك عبر رسالة نصية." },
      insurance: {
        eyebrow: "تقديم مطالبة",
        heading: "ابحث عن شركة التأمين الخاصة بك",
        intro: "ابحث عن شركة التأمين الخاصة بك أدناه أو اخترها لمعرفة خط المطالبات المباشر لديها — ولمعرفة ما إذا كنا ورشة إصلاح مباشر معتمدة لديها.",
        searchPlaceholder: "ابحث عن شركة التأمين الخاصة بك…",
        loading: "جارٍ تحميل شركات التأمين…"
      },
      contact: {
        eyebrow: "موقعنا",
        phoneLabel: "الهاتف:",
        textLabel: "رسالة نصية:",
        hoursLabel: "ساعات العمل:",
        hours: "الإثنين–الجمعة، 8ص–5م · مغلق في عطلة نهاية الأسبوع",
        getDirections: "احصل على الاتجاهات ←",
        sendMessageEyebrow: "أرسل رسالة",
        quickQuestion: "سؤال سريع؟",
        formName: "الاسم",
        formEmail: "البريد الإلكتروني",
        formMessage: "الرسالة",
        sendMessage: "إرسال الرسالة"
      },
      ctaBanner: { heading: "احصل على تقدير مجاني اليوم.", requestEstimate: "طلب تقدير", callPhone: "اتصل 925.443.8548" },
      footer: {
        tagline: "ورشة إصلاح حوادث عائلية، نخدم ليفرمور ومنطقة Tri-Valley منذ عام 1980.",
        servicesHeading: "الخدمات",
        pdr: "إصلاح الخدوش دون طلاء",
        companyHeading: "الشركة",
        aboutUs: "من نحن",
        ourWork: "أعمالنا",
        insurance: "التأمين",
        bookOnline: "احجز عبر الإنترنت",
        directions: "الاتجاهات",
        credentials: "شهادة I-CAR الذهبية · مرخّص · مؤمَّن"
      },
      chat: { label: "تحدث معنا" },
      testimonials: [
        { text: "«بعد حادث تصادم خلفي على طريق 580، كنت أخشى العملية بأكملها. تولت Tri Valley أمر التأمين، وأمّنت القطع، وسلمتني سيارتي وهي تبدو أفضل مما كانت عليه قبل الحادث.»", who: "Erin C.", loc: "Livermore, CA" },
        { text: "«تولوا أوراق التأمين من البداية للنهاية فشعرت أن العملية كلها سهلة. أبقوني على اطلاع برسالة نصية في كل مرحلة.»", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "«ثالث إصلاح لي مع هذه الورشة على مر السنين، وكل مرة كان العمل متقنًا. شركة عائلية من الجيل الثالث، وهذا واضح.»", who: "Kent S.", loc: "Livermore, CA" },
        { text: "«ضربَ البَرَد سيارتي كامري بشدة. أعاد إصلاح الخدوش دون طلاء كل لوح دون أي أثر لطلاء جديد. لا يمكنك أن تلاحظ أن ذلك حدث.»", who: "Priya S.", loc: "Dublin, CA" },
        { text: "«تقدير واضح ومباشر، بلا محاولات بيع إضافية، وانتهى العمل بالضبط في الموعد الذي حددوه.»", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    ZH: {
      topbar: { hours: "周一至周五 · 上午8点–下午5点", language: "语言", spanish: "会说西班牙语" },
      nav: { services: "服务项目", gallery: "作品展示", about: "关于我们", reviews: "客户评价", contact: "联系我们", callNow: "立即致电" },
      cta: {
        freeEstimate: "免费估价",
        callPhone: "致电 925.443.8548 →",
        getEstimate: "获取估价 →",
        lookupCarrier: "查询您的保险公司 →"
      },
      hero: {
        eyebrow: "家族经营，始于1980年",
        headline: "严格<br>标准打造。",
        rating: "Google评分4.5",
        bbb: "BBB A+认证",
        icar: "I-CAR金牌认证",
        spanish: "会说西班牙语"
      },
      recentWork: {
        eyebrow: "近期作品",
        heading: "来自车间一线",
        frameBay: "车架与拆解区",
        paintBooth: "喷漆房",
        panelFitup: "板件安装",
        liftBay: "举升区",
        viewGallery: "查看完整<br>作品展示"
      },
      services: {
        eyebrow: "我们的服务",
        heading: "每一次维修，都做到位",
        intro: "从轻微保险杠划痕到整体车架校正，我们的I-CAR金牌技师全部在店内完成。",
        collision: { title: "碰撞维修", desc: "为各种规模的事故提供全面的结构与外观修复。车身及车架损伤修复、板件更换，并按原厂标准重新组装——并提供终身工艺质保。" },
        painting: { title: "汽车喷漆", desc: "在我们的下吸式喷漆房中使用电脑配色喷涂。调色、罩光、烘烤至原厂效果——单个板件或整车重新喷漆均可。" },
        pdr: { title: "免喷漆凹陷修复", desc: "在不切割、不重新喷漆的情况下修复冰雹损伤和车门小凹痕，保留原厂漆面和转售价值。" },
        frame: { title: "车架校正", desc: "使用电脑车架测量与液压牵引，将车辆结构恢复至原厂公差范围。" },
        glass: { title: "汽车玻璃", desc: "使用原厂或同等品质玻璃更换挡风玻璃、后玻璃及车窗，包括ADAS摄像头重新校准。" },
        insurance: { title: "保险理赔处理", desc: "是大多数主要保险公司的直接维修计划合作伙伴——我们可直接向其开票并处理相关文书工作。" }
      },
      gallery: {
        eyebrow: "标志性维修案例",
        heading: "看看差别",
        intro: "拖动滑块——这就是每辆车离开我们车间时的标准。",
        before: "维修前",
        after: "维修后",
        fullEyebrow: "完整作品展示",
        browseHeading: "浏览真实案例",
        loading: "正在加载近期作品…",
        setupTag: "如何添加真实照片",
        setupText: "此作品展示区从 <code>data/gallery.json</code> 读取数据。将维修前后照片放入 <code>images/gallery/</code>，然后将每个案例的 <code>\"before\"</code> / <code>\"after\"</code> 字段设置为对应文件路径即可，无需修改代码。"
      },
      process: {
        eyebrow: "我们的流程",
        heading: "从送修到完工",
        intro: "每一次维修都遵循相同的五个步骤——没有意外，没有偷工减料。",
        step1: { title: "估价", desc: "免费到店或照片估价，通常当天即可完成。" },
        step2: { title: "保险", desc: "我们代为提交理赔，并直接与您的保险公司协调。" },
        step3: { title: "拆解检查", desc: "全面拆解以在维修开始前发现隐藏损伤。" },
        step4: { title: "维修与喷漆", desc: "结构维修、板件作业和配色喷漆。" },
        step5: { title: "质量检查", desc: "重新组装、清洗，并在交车前进行最终检查。" }
      },
      about: {
        eyebrow: "我们的故事",
        heading: "三代传承，同一标准。",
        p1: "Tri-Valley Auto Body是一家家族经营的汽车车身维修店，拥有数十年为整个Tri-Valley地区提供汽车车身维修服务的经验。自1980年创立以来，店主Fernando Romero Sr.始终以家族式理念提供服务，为客户提供超出预期的定制化碰撞维修方案。",
        p2: "从与我们接触的第一刻起，我们家族就会像对待家人一样对待您。如今已传承至第三代，Tri-Valley Auto Body深知社区、家庭以及高品质碰撞维修服务的重要性。对我们而言，这些理念相辅相成，共同带来充满关怀、并对您的安全高度负责的卓越客户服务。",
        p3: "我们全家诚挚邀请您亲身体验Tri-Valley Auto Body的与众不同。"
      },
      team: {
        eyebrow: "认识我们的团队",
        heading: "谁在为您的爱车服务",
        intro: "这里的每一位技师都获得I-CAR认证，大多数人已在此工作超过十年。",
        roleOwner: "店主兼首席技师",
        roleManager: "车间经理",
        roleEstimator: "估价师",
        rolePaintLead: "喷漆主管"
      },
      certs: { eyebrow: "认证与信誉", ase: "ASE认证技师", licensed: "持证并投保", warranty: "终身工艺质保" },
      reviews: {
        eyebrow: "客户评价",
        heading: "客户怎么说",
        intro: "来自Tri-Valley地区真实客户的真实反馈——直接从Google获取。",
        ratingBadge: "平均4.5分 · 300+条Google评价",
        writeReview: "撰写Google评价 →",
        placeIdNote: "请将 <code>placeid=</code> 链接替换为您店铺真实的Google Place ID。"
      },
      estimate: {
        eyebrow: "免费估价",
        heading: "告诉我们发生了什么",
        intro: "提供照片会有帮助，但不是必需的。我们将在一个工作日内与您联系。",
        labelName: "姓名",
        labelPhone: "电话",
        labelEmail: "电子邮箱",
        labelVehicle: "车辆信息（年份 / 品牌 / 型号）",
        labelInsurance: "保险公司（如有）",
        labelService: "所需服务",
        notSure: "不确定",
        labelDetails: "描述损伤情况",
        labelPhotos: "照片（可选）",
        photosCta: "拍照或从您的设备上传",
        submit: "申请估价"
      },
      booking: { eyebrow: "或直接预约", heading: "预约送修时间", intro: "选择合适的日期和时间——我们会通过短信确认。" },
      insurance: {
        eyebrow: "提交理赔",
        heading: "查找您的保险公司",
        intro: "在下方搜索或选择您的保险公司，查看其理赔直线电话——并了解我们是否是其认可的直接维修合作店。",
        searchPlaceholder: "搜索您的保险公司…",
        loading: "正在加载保险公司列表…"
      },
      contact: {
        eyebrow: "找到我们",
        phoneLabel: "电话:",
        textLabel: "短信:",
        hoursLabel: "营业时间:",
        hours: "周一至周五，上午8点–下午5点 · 周末休息",
        getDirections: "获取路线 →",
        sendMessageEyebrow: "发送消息",
        quickQuestion: "有简单问题？",
        formName: "姓名",
        formEmail: "电子邮箱",
        formMessage: "留言内容",
        sendMessage: "发送消息"
      },
      ctaBanner: { heading: "今天就获取免费估价。", requestEstimate: "申请估价", callPhone: "致电 925.443.8548" },
      footer: {
        tagline: "家族经营的碰撞维修中心，自1980年起服务Livermore及Tri-Valley地区。",
        servicesHeading: "服务项目",
        pdr: "免喷漆凹陷修复",
        companyHeading: "公司",
        aboutUs: "关于我们",
        ourWork: "我们的作品",
        insurance: "保险",
        bookOnline: "在线预约",
        directions: "路线指引",
        credentials: "I-CAR金牌认证 · 持证 · 已投保"
      },
      chat: { label: "在线聊天" },
      testimonials: [
        { text: "“在580公路上发生追尾事故后，我很担心整个维修过程。Tri Valley为我处理了保险，采购了零件，交车时我的SUV看起来比事故前还要好。”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“他们全程处理保险文书工作，整个过程毫不费力。每个阶段都通过短信及时通知我进展。”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“这些年来在这家店维修了三次，每一次都做得很到位。三代传承的家族企业，名副其实。”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“冰雹严重损坏了我的凯美瑞。免喷漆凹陷修复让每块板件恢复原状，没有一点新漆的痕迹，完全看不出发生过什么。”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“报价清晰直接，没有推销，完工时间和承诺的完全一致。”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    GU: {
      topbar: { hours: "સોમ–શુક્ર · સવારે 8–સાંજે 5", language: "ભાષા", spanish: "અમે સ્પેનિશ બોલીએ છીએ" },
      nav: { services: "સેવાઓ", gallery: "ગેલેરી", about: "અમારા વિશે", reviews: "સમીક્ષાઓ", contact: "સંપર્ક", callNow: "હમણાં કૉલ કરો" },
      cta: {
        freeEstimate: "મફત અંદાજ",
        callPhone: "925.443.8548 પર કૉલ કરો →",
        getEstimate: "અંદાજ મેળવો →",
        lookupCarrier: "તમારી વીમા કંપની શોધો →"
      },
      hero: {
        eyebrow: "1980થી કૌટુંબિક માલિકીનું",
        headline: "ધોરણ મુજબ<br>બનાવેલું.",
        rating: "4.5 Google રેટિંગ",
        bbb: "BBB A+ માન્યતાપ્રાપ્ત",
        icar: "I-CAR ગોલ્ડ ક્લાસ",
        spanish: "અમે સ્પેનિશ બોલીએ છીએ"
      },
      recentWork: {
        eyebrow: "તાજેતરનું કામ",
        heading: "શોપ ફ્લોર પરથી",
        frameBay: "ફ્રેમ અને ડિસએસેમ્બલી બે",
        paintBooth: "પેઇન્ટ બૂથ",
        panelFitup: "પેનલ ફિટ-અપ",
        liftBay: "લિફ્ટ બે",
        viewGallery: "સંપૂર્ણ ગેલેરી<br>જુઓ"
      },
      services: {
        eyebrow: "અમે શું કરીએ છીએ",
        heading: "દરેક રિપેર, યોગ્ય રીતે",
        intro: "ખંજવાળેલા બમ્પરથી લઈને સંપૂર્ણ ફ્રેમ સીધી કરવા સુધી, અમારા I-CAR ગોલ્ડ ક્લાસ ટેકનિશિયન બધું જ ઇન-હાઉસ સંભાળે છે.",
        collision: { title: "કોલિઝન રિપેર", desc: "કોઈપણ કદના અકસ્માત માટે સંપૂર્ણ સ્ટ્રક્ચરલ અને કોસ્મેટિક રિપેર. યુનિબોડી અને ફ્રેમ ડેમેજ, પેનલ રિપ્લેસમેન્ટ, અને OEM-સ્પેક રિએસેમ્બલી — લાઈફટાઈમ વર્કમેનશિપ વોરંટી સાથે." },
        painting: { title: "ઓટો પેઈન્ટિંગ", desc: "અમારા ડાઉન-ડ્રાફ્ટ બૂથમાં કમ્પ્યુટર કલર-મેચ્ડ પેઈન્ટ લગાવવામાં આવે છે. બ્લેન્ડ, ક્લિયર અને ફેક્ટરી ફિનિશ સુધી ક્યોર — એક પેનલ પર અથવા સંપૂર્ણ રિસ્પ્રે." },
        pdr: { title: "પેઈન્ટલેસ ડેન્ટ રિપેર", desc: "કાપ્યા કે ફરીથી પેઈન્ટ કર્યા વિના કરા અને નાના ડોર ડેન્ટ દૂર કરવામાં આવે છે, જેનાથી ફેક્ટરી ફિનિશ અને રિસેલ વેલ્યુ જળવાઈ રહે છે." },
        frame: { title: "ફ્રેમ સ્ટ્રેટનિંગ", desc: "તમારા વાહનની રચનાને OEM ટોલરન્સમાં પુનઃસ્થાપિત કરવા માટે કમ્પ્યુટરાઈઝ્ડ ફ્રેમ મેઝરિંગ અને હાઇડ્રોલિક પુલિંગ." },
        glass: { title: "ઓટો ગ્લાસ", desc: "OEM અથવા OEM-સમકક્ષ ગ્લાસ સાથે વિન્ડશિલ્ડ, બેક ગ્લાસ અને વિન્ડો રિપ્લેસમેન્ટ, જેમાં ADAS કેમેરા રિકેલિબ્રેશન સામેલ છે." },
        insurance: { title: "ઈન્સ્યુરન્સ ક્લેમ હેન્ડલિંગ", desc: "મોટાભાગની મુખ્ય વીમા કંપનીઓ સાથે ડાયરેક્ટ રિપેર પ્રોગ્રામ પાર્ટનર — અમે તેમને સીધું બિલ કરી શકીએ છીએ અને કાગળકામ સંભાળી શકીએ છીએ." }
      },
      gallery: {
        eyebrow: "સિગ્નેચર રિપેર",
        heading: "તફાવત જુઓ",
        intro: "સ્લાઈડરને ખેંચો — આ એ ધોરણ છે જેની સાથે દરેક કાર અમારી શોપ છોડે છે.",
        before: "પહેલાં",
        after: "પછી",
        fullEyebrow: "સંપૂર્ણ ગેલેરી",
        browseHeading: "વાસ્તવિક કામ જુઓ",
        loading: "તાજેતરનું કામ લોડ થઈ રહ્યું છે…",
        setupTag: "વાસ્તવિક ફોટા કેવી રીતે ઉમેરવા",
        setupText: "આ ગેલેરી <code>data/gallery.json</code> માંથી વાંચે છે. <code>images/gallery/</code> માં પહેલાં/પછીના ફોટા મૂકો, પછી દરેક કામની <code>\"before\"</code> / <code>\"after\"</code> ફિલ્ડને ફાઈલ પાથ પર સેટ કરો. કોઈ કોડ ફેરફારની જરૂર નથી."
      },
      process: {
        eyebrow: "અમારી પ્રક્રિયા",
        heading: "ડ્રોપ-ઓફથી પૂર્ણ સુધી",
        intro: "દરેક રિપેર સમાન પાંચ પગલાંને અનુસરે છે — કોઈ આશ્ચર્ય નહીં, કોઈ શોર્ટકટ નહીં.",
        step1: { title: "અંદાજ", desc: "મફત રૂબરૂ અથવા ફોટો અંદાજ, સામાન્ય રીતે તે જ દિવસે." },
        step2: { title: "વીમો", desc: "અમે ક્લેમ ફાઈલ કરીએ છીએ અને તમારી વીમા કંપની સાથે સીધું સંકલન કરીએ છીએ." },
        step3: { title: "ડિસએસેમ્બલી", desc: "રિપેર શરૂ થાય તે પહેલાં છુપાયેલા નુકસાનને પકડવા માટે સંપૂર્ણ ડિસએસેમ્બલી." },
        step4: { title: "રિપેર અને પેઈન્ટ", desc: "સ્ટ્રક્ચરલ રિપેર, પેનલ વર્ક અને કલર-મેચ્ડ પેઈન્ટ." },
        step5: { title: "ક્વોલિટી ચેક", desc: "રિએસેમ્બલી, વોશ, અને પિકઅપ પહેલાં અંતિમ નિરીક્ષણ." }
      },
      about: {
        eyebrow: "અમારી વાર્તા",
        heading: "ત્રણ પેઢી, એક ધોરણ.",
        p1: "Tri-Valley Auto Body એ કૌટુંબિક માલિકીની અને સંચાલિત ઓટો બોડી રિપેર શોપ છે, જેની પાસે સમગ્ર Tri-Valley વિસ્તારને ઓટો બોડી રિપેર સેવાઓ પ્રદાન કરવાનો દાયકાઓનો અનુભવ છે. 1980માં અમારી શરૂઆતથી, માલિક Fernando Romero Sr. એ કૌટુંબિક અભિગમ સાથે સેવાઓ પ્રદાન કરી છે, ગ્રાહકોને કસ્ટમાઇઝ્ડ કોલિઝન રિપેર પ્રક્રિયાઓ ઓફર કરી છે જે અપેક્ષાઓ કરતાં વધી જાય છે.",
        p2: "પ્રારંભિક સંપર્કના બિંદુથી જ, અમારો પરિવાર તમને પરિવારની જેમ વર્તાવશે. હવે તેની ત્રીજી પેઢીમાં, Tri-Valley Auto Body સમુદાય, પરિવાર અને ગુણવત્તાયુક્ત કોલિઝન રિપેર સેવાઓના મહત્વને સમજે છે. અમારા માટે, આ બધું સાથે મળીને કરુણા અને તમારી સલામતી પ્રત્યેની પ્રતિબદ્ધતા સાથે અસાધારણ ગ્રાહક સેવા પ્રદાન કરવા માટે કામ કરે છે.",
        p3: "અમારો પરિવાર તમને Tri-Valley Auto Body નો તફાવત અનુભવવા આમંત્રણ આપવા માંગે છે."
      },
      team: {
        eyebrow: "ટીમને મળો",
        heading: "તમારી કાર પર કોણ કામ કરી રહ્યું છે",
        intro: "અહીંનો દરેક ટેકનિશિયન I-CAR પ્રમાણિત છે અને મોટાભાગના લોકો એક દાયકાથી વધુ સમયથી અમારી સાથે છે.",
        roleOwner: "માલિક અને માસ્ટર ટેકનિશિયન",
        roleManager: "શોપ મેનેજર",
        roleEstimator: "એસ્ટિમેટર",
        rolePaintLead: "પેઈન્ટ લીડ"
      },
      certs: { eyebrow: "પ્રમાણપત્રો અને પ્રતિષ્ઠા", ase: "ASE પ્રમાણિત ટેકનિશિયન", licensed: "લાયસન્સ પ્રાપ્ત અને વીમાકૃત", warranty: "લાઈફટાઈમ વર્કમેનશિપ વોરંટી" },
      reviews: {
        eyebrow: "સમીક્ષાઓ",
        heading: "અમારા ગ્રાહકો શું કહે છે",
        intro: "Tri-Valley સમગ્રમાં વાસ્તવિક ગ્રાહકોના વાસ્તવિક પ્રતિભાવો — સીધા Googleમાંથી લેવામાં આવેલા.",
        ratingBadge: "4.5 સરેરાશ · 300+ Google સમીક્ષાઓ",
        writeReview: "Google સમીક્ષા લખો →",
        placeIdNote: "<code>placeid=</code> લિંકને તમારી શોપના વાસ્તવિક Google Place ID સાથે બદલો."
      },
      estimate: {
        eyebrow: "મફત અંદાજ",
        heading: "શું થયું તે અમને જણાવો",
        intro: "ફોટા મદદ કરે છે પણ જરૂરી નથી. અમે એક બિઝનેસ દિવસમાં ફોલો અપ કરીશું.",
        labelName: "પૂરું નામ",
        labelPhone: "ફોન",
        labelEmail: "ઈમેલ",
        labelVehicle: "વાહન (વર્ષ / બ્રાન્ડ / મોડલ)",
        labelInsurance: "વીમા કંપની (જો હોય તો)",
        labelService: "જરૂરી સેવા",
        notSure: "ખાતરી નથી",
        labelDetails: "નુકસાનનું વર્ણન કરો",
        labelPhotos: "ફોટા (વૈકલ્પિક)",
        photosCta: "ફોટો લો અથવા તમારા ડિવાઇસમાંથી અપલોડ કરો",
        submit: "અંદાજ માંગો"
      },
      booking: { eyebrow: "અથવા આગળ વધો", heading: "ડ્રોપ-ઓફ સમય બુક કરો", intro: "તમને અનુકૂળ દિવસ અને સમય પસંદ કરો — અમે ટેક્સ્ટ દ્વારા પુષ્ટિ કરીશું." },
      insurance: {
        eyebrow: "ક્લેમ ફાઈલ કરવો",
        heading: "તમારી વીમા કંપની શોધો",
        intro: "તેમની ડાયરેક્ટ ક્લેમ લાઈન માટે નીચે તમારી વીમા કંપની શોધો અથવા પસંદ કરો — અને જુઓ કે અમે તેમના માટે માન્યતાપ્રાપ્ત ડાયરેક્ટ-રિપેર શોપ છીએ કે નહીં.",
        searchPlaceholder: "તમારી વીમા કંપની શોધો…",
        loading: "વીમા કંપનીઓ લોડ થઈ રહી છે…"
      },
      contact: {
        eyebrow: "અમને શોધો",
        phoneLabel: "ફોન:",
        textLabel: "ટેક્સ્ટ:",
        hoursLabel: "કલાકો:",
        hours: "સોમ–શુક્ર, સવારે 8–સાંજે 5 · સપ્તાહાંતે બંધ",
        getDirections: "દિશા-નિર્દેશો મેળવો →",
        sendMessageEyebrow: "સંદેશ મોકલો",
        quickQuestion: "ઝડપી પ્રશ્ન છે?",
        formName: "નામ",
        formEmail: "ઈમેલ",
        formMessage: "સંદેશ",
        sendMessage: "સંદેશ મોકલો"
      },
      ctaBanner: { heading: "આજે જ મફત અંદાજ મેળવો.", requestEstimate: "અંદાજ માંગો", callPhone: "925.443.8548 પર કૉલ કરો" },
      footer: {
        tagline: "1980થી Livermore અને Tri-Valleyને સેવા આપતું કૌટુંબિક માલિકીનું કોલિઝન રિપેર.",
        servicesHeading: "સેવાઓ",
        pdr: "PDR",
        companyHeading: "કંપની",
        aboutUs: "અમારા વિશે",
        ourWork: "અમારું કામ",
        insurance: "વીમો",
        bookOnline: "ઓનલાઈન બુક કરો",
        directions: "દિશા-નિર્દેશો",
        credentials: "I-CAR ગોલ્ડ ક્લાસ · લાયસન્સ પ્રાપ્ત · વીમાકૃત"
      },
      chat: { label: "અમારી સાથે ચેટ કરો" },
      testimonials: [
        { text: "“580 પર પાછળથી થયેલી ટક્કર પછી, હું આખી પ્રક્રિયાથી ડરી ગયો હતો. Tri Valley એ મારો વીમો સંભાળ્યો, પાર્ટ્સ મેળવ્યા, અને મારી SUV અકસ્માત પહેલા કરતાં વધુ સારી દેખાતી પરત આપી.”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“વીમાનું કાગળકામ શરૂઆતથી અંત સુધી સંભાળ્યું જેથી આખી પ્રક્રિયા સહેલી લાગી. દરેક તબક્કે ટેક્સ્ટ દ્વારા મને અપડેટ રાખ્યો.”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“વર્ષોમાં આ શોપ સાથે ત્રીજું રિપેર, અને દરેક વખતે યોગ્ય રીતે થયું છે. ત્રીજી પેઢીનો કૌટુંબિક વ્યવસાય, અને તે દેખાય છે.”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“કરાએ મારી Camry ને સખત ફટકારી. PDR એ દરેક પેનલને નવા પેઈન્ટના એક ટીપા વગર પાછું લાવ્યું. તમે કહી શકતા નથી કે તે ક્યારેય થયું હતું.”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“સીધો અંદાજ, કોઈ વધારાનું વેચાણ નહીં, બરાબર જ્યારે તેમણે કહ્યું ત્યારે પૂર્ણ થયું.”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    HI: {
      topbar: { hours: "सोम–शुक्र · सुबह 8–शाम 5", language: "भाषा", spanish: "हम स्पेनिश बोलते हैं" },
      nav: { services: "सेवाएं", gallery: "गैलरी", about: "हमारे बारे में", reviews: "समीक्षाएं", contact: "संपर्क करें", callNow: "अभी कॉल करें" },
      cta: {
        freeEstimate: "मुफ़्त अनुमान",
        callPhone: "925.443.8548 पर कॉल करें →",
        getEstimate: "अनुमान प्राप्त करें →",
        lookupCarrier: "अपनी बीमा कंपनी खोजें →"
      },
      hero: {
        eyebrow: "1980 से पारिवारिक स्वामित्व",
        headline: "मानक के अनुरूप<br>बनाया गया।",
        rating: "4.5 Google रेटिंग",
        bbb: "BBB A+ मान्यता प्राप्त",
        icar: "I-CAR गोल्ड क्लास",
        spanish: "हम स्पेनिश बोलते हैं"
      },
      recentWork: {
        eyebrow: "हाल का काम",
        heading: "शॉप फ्लोर से",
        frameBay: "फ्रेम और डिसअसेंबली बे",
        paintBooth: "पेंट बूथ",
        panelFitup: "पैनल फिट-अप",
        liftBay: "लिफ्ट बे",
        viewGallery: "पूरी गैलरी<br>देखें"
      },
      services: {
        eyebrow: "हम क्या करते हैं",
        heading: "हर रिपेयर, सही तरीके से",
        intro: "मामूली बंपर खरोंच से लेकर पूर्ण फ्रेम स्ट्रेटनिंग तक, हमारे I-CAR गोल्ड क्लास तकनीशियन सब कुछ इन-हाउस संभालते हैं।",
        collision: { title: "कोलिज़न रिपेयर", desc: "किसी भी आकार की दुर्घटना के लिए पूर्ण संरचनात्मक और कॉस्मेटिक मरम्मत। यूनिबॉडी और फ्रेम क्षति, पैनल प्रतिस्थापन, और OEM-मानक पुनः असेंबली — आजीवन वर्कमैनशिप वारंटी के साथ।" },
        painting: { title: "ऑटो पेंटिंग", desc: "हमारे डाउन-ड्राफ्ट बूथ में कंप्यूटर कलर-मैच्ड पेंट लगाया जाता है। ब्लेंड, क्लियर और फैक्ट्री फिनिश तक क्योर — एक पैनल पर या पूरी रीस्प्रे।" },
        pdr: { title: "पेंटलेस डेंट रिपेयर", desc: "बिना काटे या दोबारा पेंट किए ओलों की क्षति और छोटे दरवाज़े के डेंट हटाए जाते हैं, जिससे फैक्ट्री फिनिश और पुनर्विक्रय मूल्य बना रहता है।" },
        frame: { title: "फ्रेम स्ट्रेटनिंग", desc: "आपके वाहन की संरचना को OEM सहनशीलता में बहाल करने के लिए कंप्यूटरीकृत फ्रेम मापन और हाइड्रोलिक खिंचाव।" },
        glass: { title: "ऑटो ग्लास", desc: "OEM या OEM-समकक्ष ग्लास के साथ विंडशील्ड, बैक ग्लास और खिड़की प्रतिस्थापन, जिसमें ADAS कैमरा रीकैलिब्रेशन शामिल है।" },
        insurance: { title: "बीमा दावा प्रबंधन", desc: "अधिकांश प्रमुख बीमा कंपनियों के साथ डायरेक्ट रिपेयर प्रोग्राम पार्टनर — हम उन्हें सीधे बिल कर सकते हैं और कागज़ी कार्रवाई संभाल सकते हैं।" }
      },
      gallery: {
        eyebrow: "सिग्नेचर रिपेयर",
        heading: "फ़र्क देखें",
        intro: "स्लाइडर खींचें — यह वह मानक है जिसके साथ हर कार हमारी शॉप छोड़ती है।",
        before: "पहले",
        after: "बाद में",
        fullEyebrow: "पूरी गैलरी",
        browseHeading: "वास्तविक काम देखें",
        loading: "हाल का काम लोड हो रहा है…",
        setupTag: "वास्तविक फ़ोटो कैसे जोड़ें",
        setupText: "यह गैलरी <code>data/gallery.json</code> से पढ़ती है। <code>images/gallery/</code> में पहले/बाद की फ़ोटो डालें, फिर हर काम के <code>\"before\"</code> / <code>\"after\"</code> फ़ील्ड को फ़ाइल पथ पर सेट करें। किसी कोड परिवर्तन की आवश्यकता नहीं है।"
      },
      process: {
        eyebrow: "हमारी प्रक्रिया",
        heading: "ड्रॉप-ऑफ से पूर्ण होने तक",
        intro: "हर रिपेयर एक जैसे पांच चरणों का पालन करता है — कोई आश्चर्य नहीं, कोई शॉर्टकट नहीं।",
        step1: { title: "अनुमान", desc: "मुफ़्त व्यक्तिगत या फ़ोटो अनुमान, आमतौर पर उसी दिन।" },
        step2: { title: "बीमा", desc: "हम दावा दर्ज करते हैं और सीधे आपकी बीमा कंपनी के साथ समन्वय करते हैं।" },
        step3: { title: "डिसअसेंबली", desc: "मरम्मत शुरू होने से पहले छिपी हुई क्षति पकड़ने के लिए पूर्ण डिसअसेंबली।" },
        step4: { title: "रिपेयर और पेंट", desc: "संरचनात्मक मरम्मत, पैनल कार्य, और रंग-मिलान पेंट।" },
        step5: { title: "गुणवत्ता जांच", desc: "पुनः असेंबली, धुलाई, और पिकअप से पहले अंतिम निरीक्षण।" }
      },
      about: {
        eyebrow: "हमारी कहानी",
        heading: "तीन पीढ़ियां, एक मानक।",
        p1: "Tri-Valley Auto Body एक पारिवारिक स्वामित्व वाली और संचालित ऑटो बॉडी रिपेयर शॉप है, जिसे पूरे Tri-Valley क्षेत्र को ऑटो बॉडी रिपेयर सेवाएं प्रदान करने का दशकों का अनुभव है। 1980 में हमारी स्थापना के बाद से, मालिक Fernando Romero Sr. ने पारिवारिक दृष्टिकोण के साथ सेवाएं प्रदान की हैं, ग्राहकों को अनुकूलित कोलिज़न रिपेयर प्रक्रियाएं प्रदान करते हुए जो अपेक्षाओं से बढ़कर हैं।",
        p2: "पहले संपर्क बिंदु से ही, हमारा परिवार आपके साथ परिवार जैसा व्यवहार करेगा। अब अपनी तीसरी पीढ़ी में, Tri-Valley Auto Body समुदाय, परिवार और गुणवत्तापूर्ण कोलिज़न रिपेयर सेवाओं के महत्व को समझता है। हमारे लिए, ये सभी साथ मिलकर करुणा और आपकी सुरक्षा के प्रति प्रतिबद्धता के साथ असाधारण ग्राहक सेवा प्रदान करने के लिए काम करते हैं।",
        p3: "हमारा परिवार आपको Tri-Valley Auto Body का अंतर अनुभव करने के लिए आमंत्रित करना चाहता है।"
      },
      team: {
        eyebrow: "टीम से मिलें",
        heading: "आपकी कार पर कौन काम कर रहा है",
        intro: "यहां हर तकनीशियन I-CAR प्रमाणित है और अधिकांश एक दशक से अधिक समय से हमारे साथ हैं।",
        roleOwner: "मालिक और मास्टर तकनीशियन",
        roleManager: "शॉप मैनेजर",
        roleEstimator: "एस्टिमेटर",
        rolePaintLead: "पेंट लीड"
      },
      certs: { eyebrow: "प्रमाणन और प्रतिष्ठा", ase: "ASE प्रमाणित तकनीशियन", licensed: "लाइसेंस प्राप्त और बीमाकृत", warranty: "आजीवन वर्कमैनशिप वारंटी" },
      reviews: {
        eyebrow: "समीक्षाएं",
        heading: "हमारे ग्राहक क्या कहते हैं",
        intro: "पूरे Tri-Valley में वास्तविक ग्राहकों से वास्तविक प्रतिक्रिया — सीधे Google से ली गई।",
        ratingBadge: "4.5 औसत · 300+ Google समीक्षाएं",
        writeReview: "Google समीक्षा लिखें →",
        placeIdNote: "<code>placeid=</code> लिंक को अपनी शॉप की वास्तविक Google Place ID से बदलें।"
      },
      estimate: {
        eyebrow: "मुफ़्त अनुमान",
        heading: "हमें बताएं क्या हुआ",
        intro: "फ़ोटो मदद करती हैं लेकिन आवश्यक नहीं हैं। हम एक व्यावसायिक दिन के भीतर संपर्क करेंगे।",
        labelName: "पूरा नाम",
        labelPhone: "फ़ोन",
        labelEmail: "ईमेल",
        labelVehicle: "वाहन (वर्ष / मेक / मॉडल)",
        labelInsurance: "बीमा कंपनी (यदि कोई हो)",
        labelService: "आवश्यक सेवा",
        notSure: "पक्का नहीं",
        labelDetails: "क्षति का वर्णन करें",
        labelPhotos: "फ़ोटो (वैकल्पिक)",
        photosCta: "फ़ोटो लें या अपने डिवाइस से अपलोड करें",
        submit: "अनुमान का अनुरोध करें"
      },
      booking: { eyebrow: "या आगे बढ़ें", heading: "ड्रॉप-ऑफ समय बुक करें", intro: "एक ऐसा दिन और समय चुनें जो काम करे — हम टेक्स्ट द्वारा पुष्टि करेंगे।" },
      insurance: {
        eyebrow: "दावा दर्ज करना",
        heading: "अपनी बीमा कंपनी खोजें",
        intro: "उनकी सीधी दावा लाइन के लिए नीचे अपनी बीमा कंपनी खोजें या चुनें — और देखें कि क्या हम उनके लिए एक अनुमोदित डायरेक्ट-रिपेयर शॉप हैं।",
        searchPlaceholder: "अपनी बीमा कंपनी खोजें…",
        loading: "बीमा कंपनियां लोड हो रही हैं…"
      },
      contact: {
        eyebrow: "हमें खोजें",
        phoneLabel: "फ़ोन:",
        textLabel: "टेक्स्ट:",
        hoursLabel: "समय:",
        hours: "सोम–शुक्र, सुबह 8–शाम 5 · सप्ताहांत बंद",
        getDirections: "दिशा-निर्देश प्राप्त करें →",
        sendMessageEyebrow: "संदेश भेजें",
        quickQuestion: "कोई त्वरित प्रश्न?",
        formName: "नाम",
        formEmail: "ईमेल",
        formMessage: "संदेश",
        sendMessage: "संदेश भेजें"
      },
      ctaBanner: { heading: "आज ही मुफ़्त अनुमान प्राप्त करें।", requestEstimate: "अनुमान का अनुरोध करें", callPhone: "925.443.8548 पर कॉल करें" },
      footer: {
        tagline: "1980 से Livermore और Tri-Valley की सेवा करने वाला पारिवारिक स्वामित्व वाला कोलिज़न रिपेयर।",
        servicesHeading: "सेवाएं",
        pdr: "PDR",
        companyHeading: "कंपनी",
        aboutUs: "हमारे बारे में",
        ourWork: "हमारा काम",
        insurance: "बीमा",
        bookOnline: "ऑनलाइन बुक करें",
        directions: "दिशा-निर्देश",
        credentials: "I-CAR गोल्ड क्लास · लाइसेंस प्राप्त · बीमाकृत"
      },
      chat: { label: "हमसे चैट करें" },
      testimonials: [
        { text: "“580 पर पीछे से टक्कर लगने के बाद, मैं पूरी प्रक्रिया से डर रही थी। Tri Valley ने मेरा बीमा संभाला, पुर्ज़े जुटाए, और मेरी SUV को दुर्घटना से पहले से बेहतर दिखते हुए वापस दिया।”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“बीमा का कागज़ी काम शुरू से अंत तक संभाला जिससे पूरी प्रक्रिया आसान महसूस हुई। हर चरण पर टेक्स्ट के ज़रिए मुझे अपडेट रखा।”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“सालों में इस शॉप के साथ तीसरी मरम्मत, और हर बार सही तरीके से हुई है। तीसरी पीढ़ी का पारिवारिक व्यवसाय, और यह दिखता है।”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“ओलों ने मेरी Camry को बुरी तरह मारा। PDR ने हर पैनल को बिना किसी नए पेंट के निशान के वापस लाया। आप बता नहीं सकते कि ऐसा कभी हुआ था।”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“सीधा अनुमान, कोई अतिरिक्त बिक्री नहीं, ठीक उसी समय पूरा हुआ जब उन्होंने कहा था।”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    IT: {
      topbar: { hours: "Lun–Ven · 8:00–17:00", language: "Lingua", spanish: "Habla Español" },
      nav: { services: "Servizi", gallery: "Galleria", about: "Chi Siamo", reviews: "Recensioni", contact: "Contatti", callNow: "Chiama Ora" },
      cta: {
        freeEstimate: "Preventivo Gratuito",
        callPhone: "Chiama il 925.443.8548 →",
        getEstimate: "Richiedi un preventivo →",
        lookupCarrier: "Cerca la tua assicurazione →"
      },
      hero: {
        eyebrow: "A Conduzione Familiare Dal 1980",
        headline: "Costruito Su<br>Standard Elevati.",
        rating: "Valutazione 4.5 su Google",
        bbb: "Accreditato BBB A+",
        icar: "I-CAR Gold Class",
        spanish: "Se Habla Español"
      },
      recentWork: {
        eyebrow: "Lavori Recenti",
        heading: "Direttamente Dall'Officina",
        frameBay: "Area telaio e smontaggio",
        paintBooth: "Cabina di verniciatura",
        panelFitup: "Montaggio pannelli",
        liftBay: "Area sollevamento",
        viewGallery: "Vedi La Galleria<br>Completa"
      },
      services: {
        eyebrow: "Cosa Facciamo",
        heading: "Ogni Riparazione, Fatta Bene",
        intro: "Da un paraurti graffiato alla raddrizzatura completa del telaio, i nostri tecnici I-CAR Gold Class gestiscono tutto internamente.",
        collision: { title: "Riparazione Collisioni", desc: "Riparazione strutturale ed estetica completa per incidenti di qualsiasi entità. Danni a scocca e telaio, sostituzione pannelli e rimontaggio secondo specifiche OEM — con garanzia a vita sulla lavorazione." },
        painting: { title: "Verniciatura Auto", desc: "Vernice abbinata al colore tramite computer, applicata nella nostra cabina a flusso discendente. Miscelazione, trasparente e cottura fino alla finitura di fabbrica — su un singolo pannello o riverniciatura completa." },
        pdr: { title: "Riparazione Ammaccature Senza Verniciatura", desc: "Danni da grandine e piccole ammaccature sportello rimossi senza tagliare o riverniciare, preservando la finitura di fabbrica e il valore di rivendita." },
        frame: { title: "Raddrizzatura Telaio", desc: "Misurazione computerizzata del telaio e trazione idraulica per riportare la struttura del veicolo alle tolleranze OEM." },
        glass: { title: "Vetri Auto", desc: "Sostituzione parabrezza, lunotto e finestrini con vetro OEM o equivalente, inclusa la ricalibrazione delle telecamere ADAS." },
        insurance: { title: "Gestione Pratiche Assicurative", desc: "Partner del Direct Repair Program con la maggior parte delle principali compagnie assicurative — possiamo fatturare direttamente a loro e gestire la burocrazia." }
      },
      gallery: {
        eyebrow: "Riparazioni Distintive",
        heading: "Guarda La Differenza",
        intro: "Trascina il cursore — questo è lo standard con cui ogni auto lascia la nostra officina.",
        before: "Prima",
        after: "Dopo",
        fullEyebrow: "Galleria Completa",
        browseHeading: "Sfoglia Lavori Reali",
        loading: "Caricamento lavori recenti…",
        setupTag: "Come aggiungere foto reali",
        setupText: "Questa galleria legge da <code>data/gallery.json</code>. Inserisci le foto prima/dopo in <code>images/gallery/</code>, poi imposta i campi <code>\"before\"</code> / <code>\"after\"</code> di ogni lavoro con il percorso del file. Nessuna modifica al codice necessaria."
      },
      process: {
        eyebrow: "Il Nostro Processo",
        heading: "Dalla Consegna Al Ritiro",
        intro: "Ogni riparazione segue gli stessi cinque passaggi — senza sorprese, senza scorciatoie.",
        step1: { title: "Preventivo", desc: "Preventivo gratuito di persona o tramite foto, solitamente in giornata." },
        step2: { title: "Assicurazione", desc: "Presentiamo la pratica e coordiniamo direttamente con la tua compagnia assicurativa." },
        step3: { title: "Smontaggio", desc: "Smontaggio completo per individuare danni nascosti prima di iniziare la riparazione." },
        step4: { title: "Riparazione e Verniciatura", desc: "Riparazione strutturale, lavorazione pannelli e verniciatura abbinata al colore." },
        step5: { title: "Controllo Qualità", desc: "Rimontaggio, lavaggio e ispezione finale prima del ritiro." }
      },
      about: {
        eyebrow: "La Nostra Storia",
        heading: "Tre Generazioni, Uno Standard.",
        p1: "Tri-Valley Auto Body è un'officina di carrozzeria a conduzione familiare, con decenni di esperienza nel fornire servizi di riparazione carrozzeria a tutta l'area di Tri-Valley. Dalla nostra fondazione nel 1980, il titolare Fernando Romero Sr. ha offerto servizi con un approccio familiare, fornendo ai clienti processi di riparazione collisioni personalizzati che superano le aspettative.",
        p2: "Fin dal primo contatto, la nostra famiglia vi tratterà come parte della famiglia. Ora alla terza generazione, Tri-Valley Auto Body comprende l'importanza della comunità, della famiglia e di servizi di riparazione collisioni di qualità. Per noi, tutto questo va di pari passo per offrire un servizio clienti eccezionale con empatia e un impegno per la vostra sicurezza.",
        p3: "La nostra famiglia desidera invitarvi a provare la differenza di Tri-Valley Auto Body."
      },
      team: {
        eyebrow: "Conosci Il Team",
        heading: "Chi Lavora Sulla Tua Auto",
        intro: "Ogni tecnico qui è certificato I-CAR e la maggior parte lavora con noi da oltre un decennio.",
        roleOwner: "Titolare e Tecnico Capo",
        roleManager: "Responsabile Officina",
        roleEstimator: "Perito",
        rolePaintLead: "Responsabile Verniciatura"
      },
      certs: { eyebrow: "Certificazioni e Reputazione", ase: "Tecnici Certificati ASE", licensed: "Autorizzato e Assicurato", warranty: "Garanzia a Vita Sulla Lavorazione" },
      reviews: {
        eyebrow: "Recensioni",
        heading: "Cosa Dicono I Nostri Clienti",
        intro: "Feedback reali da clienti reali in tutta la Tri-Valley — presi direttamente da Google.",
        ratingBadge: "Media 4.5 · Oltre 300 recensioni Google",
        writeReview: "Scrivi Una Recensione Google →",
        placeIdNote: "Sostituisci il link <code>placeid=</code> con il vero Google Place ID della tua officina."
      },
      estimate: {
        eyebrow: "Preventivo Gratuito",
        heading: "Raccontaci Cosa È Successo",
        intro: "Le foto aiutano ma non sono obbligatorie. Ti risponderemo entro un giorno lavorativo.",
        labelName: "Nome Completo",
        labelPhone: "Telefono",
        labelEmail: "Email",
        labelVehicle: "Veicolo (Anno / Marca / Modello)",
        labelInsurance: "Compagnia Assicurativa (se presente)",
        labelService: "Servizio Richiesto",
        notSure: "Non sono sicuro",
        labelDetails: "Descrivi Il Danno",
        labelPhotos: "Foto (facoltativo)",
        photosCta: "Scatta una foto o caricane una dal tuo dispositivo",
        submit: "Richiedi Preventivo"
      },
      booking: { eyebrow: "Oppure Salta Avanti", heading: "Prenota Un Orario Di Consegna", intro: "Scegli un giorno e un orario che vanno bene — confermeremo via SMS." },
      insurance: {
        eyebrow: "Presentare Una Pratica",
        heading: "Trova La Tua Compagnia Assicurativa",
        intro: "Cerca o seleziona la tua compagnia assicurativa qui sotto per la loro linea diretta pratiche — e scopri se siamo un'officina di riparazione diretta approvata per loro.",
        searchPlaceholder: "Cerca la tua compagnia assicurativa…",
        loading: "Caricamento compagnie assicurative…"
      },
      contact: {
        eyebrow: "Trovaci",
        phoneLabel: "Telefono:",
        textLabel: "SMS:",
        hoursLabel: "Orari:",
        hours: "Lun–Ven, 8:00–17:00 · Chiuso nel weekend",
        getDirections: "Ottieni Indicazioni →",
        sendMessageEyebrow: "Invia Un Messaggio",
        quickQuestion: "Una Domanda Veloce?",
        formName: "Nome",
        formEmail: "Email",
        formMessage: "Messaggio",
        sendMessage: "Invia Messaggio"
      },
      ctaBanner: { heading: "Ottieni un preventivo gratuito oggi.", requestEstimate: "Richiedi Preventivo", callPhone: "Chiama il 925.443.8548" },
      footer: {
        tagline: "Riparazione collisioni a conduzione familiare, al servizio di Livermore e della Tri-Valley dal 1980.",
        servicesHeading: "Servizi",
        pdr: "Riparazione Senza Verniciatura",
        companyHeading: "Azienda",
        aboutUs: "Chi Siamo",
        ourWork: "I Nostri Lavori",
        insurance: "Assicurazione",
        bookOnline: "Prenota Online",
        directions: "Indicazioni",
        credentials: "I-CAR Gold Class · Autorizzato · Assicurato"
      },
      chat: { label: "Chatta con noi" },
      testimonials: [
        { text: "“Dopo un tamponamento sulla 580, temevo l'intero processo. Tri Valley ha gestito la mia assicurazione, reperito i ricambi e consegnato il mio SUV in condizioni migliori rispetto a prima dell'incidente.”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“Hanno gestito la burocrazia assicurativa dall'inizio alla fine, rendendo tutto il processo semplice. Mi hanno tenuto aggiornato via SMS ad ogni fase.”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“Terza riparazione con questa officina nel corso degli anni, e ognuna è stata fatta a regola d'arte. Azienda familiare di terza generazione, e si vede.”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“La grandine ha colpito duramente la mia Camry. La riparazione senza verniciatura ha ripristinato ogni pannello senza una traccia di vernice nuova. Non si direbbe mai che sia successo.”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“Preventivo chiaro, nessuna vendita forzata, terminato esattamente quando avevano detto.”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    KO: {
      topbar: { hours: "월–금 · 오전 8시–오후 5시", language: "언어", spanish: "스페인어 가능" },
      nav: { services: "서비스", gallery: "갤러리", about: "회사 소개", reviews: "고객 후기", contact: "문의하기", callNow: "지금 전화하기" },
      cta: {
        freeEstimate: "무료 견적",
        callPhone: "925.443.8548로 전화하기 →",
        getEstimate: "견적 받기 →",
        lookupCarrier: "보험사 조회하기 →"
      },
      hero: {
        eyebrow: "1980년부터 가족 경영",
        headline: "기준에 맞춰<br>제작합니다.",
        rating: "Google 평점 4.5",
        bbb: "BBB A+ 인증",
        icar: "I-CAR 골드 클래스",
        spanish: "스페인어 가능"
      },
      recentWork: {
        eyebrow: "최근 작업",
        heading: "작업장에서 온 소식",
        frameBay: "프레임 및 분해 구역",
        paintBooth: "도장 부스",
        panelFitup: "패널 조립",
        liftBay: "리프트 구역",
        viewGallery: "전체 갤러리<br>보기"
      },
      services: {
        eyebrow: "제공 서비스",
        heading: "모든 수리를 제대로",
        intro: "가벼운 범퍼 흠집부터 완전한 프레임 교정까지, I-CAR 골드 클래스 인증 기술자들이 사내에서 직접 처리합니다.",
        collision: { title: "충돌 수리", desc: "규모에 관계없이 사고에 대한 완전한 구조 및 외관 수리. 차체 및 프레임 손상, 패널 교체, OEM 사양 재조립 — 평생 작업 보증이 포함됩니다." },
        painting: { title: "자동차 도장", desc: "다운드래프트 부스에서 컴퓨터 색상 매칭 도장을 적용합니다. 혼합, 클리어 코팅, 공장 마감까지 경화 — 단일 패널 또는 전체 재도장 모두 가능합니다." },
        pdr: { title: "무도장 덴트 수리", desc: "절단이나 재도장 없이 우박 손상과 작은 문 찌그러짐을 제거하여 공장 마감과 재판매 가치를 보존합니다." },
        frame: { title: "프레임 교정", desc: "컴퓨터화된 프레임 측정과 유압 견인으로 차량 구조를 OEM 허용 오차 범위로 복원합니다." },
        glass: { title: "자동차 유리", desc: "OEM 또는 OEM 동등 유리로 앞유리, 뒷유리, 창문을 교체하며 ADAS 카메라 재교정도 포함됩니다." },
        insurance: { title: "보험 청구 처리", desc: "대부분의 주요 보험사와 직접 수리 프로그램(DRP) 파트너 — 직접 청구서를 보내고 서류 작업을 처리해 드립니다." }
      },
      gallery: {
        eyebrow: "대표 수리 사례",
        heading: "차이를 확인하세요",
        intro: "슬라이더를 끌어보세요 — 모든 차량이 저희 작업장을 떠날 때의 기준입니다.",
        before: "수리 전",
        after: "수리 후",
        fullEyebrow: "전체 갤러리",
        browseHeading: "실제 작업 둘러보기",
        loading: "최근 작업을 불러오는 중…",
        setupTag: "실제 사진 추가 방법",
        setupText: "이 갤러리는 <code>data/gallery.json</code>에서 데이터를 읽어옵니다. <code>images/gallery/</code>에 전후 사진을 넣은 다음, 각 작업의 <code>\"before\"</code> / <code>\"after\"</code> 필드를 파일 경로로 설정하세요. 코드 수정이 필요 없습니다."
      },
      process: {
        eyebrow: "작업 프로세스",
        heading: "입고부터 완료까지",
        intro: "모든 수리는 동일한 5단계를 따릅니다 — 예상치 못한 일도, 지름길도 없습니다.",
        step1: { title: "견적", desc: "대개 당일에 무료로 대면 또는 사진 견적을 제공합니다." },
        step2: { title: "보험 처리", desc: "청구를 접수하고 보험사와 직접 조율합니다." },
        step3: { title: "분해 점검", desc: "수리를 시작하기 전 숨겨진 손상을 찾기 위해 완전히 분해합니다." },
        step4: { title: "수리 및 도장", desc: "구조 수리, 패널 작업, 색상 매칭 도장을 진행합니다." },
        step5: { title: "품질 검사", desc: "재조립, 세차, 그리고 출고 전 최종 점검을 진행합니다." }
      },
      about: {
        eyebrow: "우리의 이야기",
        heading: "3대에 걸친 하나의 기준.",
        p1: "Tri-Valley Auto Body는 Tri-Valley 전 지역에 자동차 차체 수리 서비스를 제공해 온 수십 년 경력의 가족 소유 및 운영 정비소입니다. 1980년 창업 이래, 대표 Fernando Romero Sr.는 가족적인 방식으로 서비스를 제공하며 고객에게 기대를 뛰어넘는 맞춤형 충돌 수리 과정을 선사해 왔습니다.",
        p2: "첫 연락의 순간부터 저희 가족은 고객님을 가족처럼 대합니다. 이제 3대에 이른 Tri-Valley Auto Body는 지역사회, 가족, 그리고 양질의 충돌 수리 서비스가 지닌 중요성을 잘 알고 있습니다. 저희에게 이 모든 것은 하나로 어우러져 배려와 고객님의 안전에 대한 확고한 책임감을 바탕으로 한 탁월한 고객 서비스를 제공합니다.",
        p3: "저희 가족은 고객님을 Tri-Valley Auto Body만의 차이를 직접 경험해 보시도록 초대합니다."
      },
      team: {
        eyebrow: "팀 소개",
        heading: "누가 당신의 차를 담당하나요",
        intro: "이곳의 모든 기술자는 I-CAR 인증을 받았으며 대부분 10년 이상 함께해 왔습니다.",
        roleOwner: "대표 겸 수석 기술자",
        roleManager: "작업장 매니저",
        roleEstimator: "견적 담당자",
        rolePaintLead: "도장 팀장"
      },
      certs: { eyebrow: "인증 및 신뢰도", ase: "ASE 인증 기술자", licensed: "면허 및 보험 보유", warranty: "평생 작업 보증" },
      reviews: {
        eyebrow: "고객 후기",
        heading: "고객들의 이야기",
        intro: "Tri-Valley 전역의 실제 고객들이 남긴 실제 후기 — Google에서 직접 가져왔습니다.",
        ratingBadge: "평균 4.5 · Google 리뷰 300개 이상",
        writeReview: "Google 리뷰 작성하기 →",
        placeIdNote: "<code>placeid=</code> 링크를 매장의 실제 Google Place ID로 교체하세요."
      },
      estimate: {
        eyebrow: "무료 견적",
        heading: "무슨 일이 있었는지 알려주세요",
        intro: "사진이 있으면 도움이 되지만 필수는 아닙니다. 영업일 기준 하루 내에 연락드리겠습니다.",
        labelName: "성명",
        labelPhone: "전화번호",
        labelEmail: "이메일",
        labelVehicle: "차량 정보 (연식 / 제조사 / 모델)",
        labelInsurance: "보험사 (해당 시)",
        labelService: "필요한 서비스",
        notSure: "잘 모르겠음",
        labelDetails: "손상 내용 설명",
        labelPhotos: "사진 (선택 사항)",
        photosCta: "사진을 촬영하거나 기기에서 업로드하세요",
        submit: "견적 요청하기"
      },
      booking: { eyebrow: "또는 바로 예약", heading: "입고 시간 예약하기", intro: "편한 날짜와 시간을 선택하세요 — 문자로 확인해 드립니다." },
      insurance: {
        eyebrow: "보험 청구하기",
        heading: "보험사 찾기",
        intro: "아래에서 보험사를 검색하거나 선택하여 직통 청구 라인을 확인하고, 저희가 해당 보험사의 승인된 직접 수리 매장인지 확인해 보세요.",
        searchPlaceholder: "보험사를 검색하세요…",
        loading: "보험사 목록을 불러오는 중…"
      },
      contact: {
        eyebrow: "오시는 길",
        phoneLabel: "전화:",
        textLabel: "문자:",
        hoursLabel: "영업시간:",
        hours: "월–금, 오전 8시–오후 5시 · 주말 휴무",
        getDirections: "길 찾기 →",
        sendMessageEyebrow: "메시지 보내기",
        quickQuestion: "간단한 질문이 있으신가요?",
        formName: "이름",
        formEmail: "이메일",
        formMessage: "메시지",
        sendMessage: "메시지 보내기"
      },
      ctaBanner: { heading: "오늘 무료 견적을 받아보세요.", requestEstimate: "견적 요청하기", callPhone: "925.443.8548로 전화하기" },
      footer: {
        tagline: "1980년부터 Livermore와 Tri-Valley 지역을 섬겨온 가족 경영 충돌 수리 전문점입니다.",
        servicesHeading: "서비스",
        pdr: "무도장 덴트 수리",
        companyHeading: "회사 정보",
        aboutUs: "회사 소개",
        ourWork: "작업 사례",
        insurance: "보험",
        bookOnline: "온라인 예약",
        directions: "오시는 길",
        credentials: "I-CAR 골드 클래스 · 면허 보유 · 보험 가입"
      },
      chat: { label: "채팅 상담" },
      testimonials: [
        { text: "“580번 도로에서 후방 추돌 사고를 당한 후 전체 과정이 두려웠습니다. Tri Valley가 보험 처리를 해주고 부품을 구해서 사고 전보다 더 좋은 상태로 제 SUV를 돌려주었습니다.”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“보험 서류 작업을 처음부터 끝까지 처리해 주어 전체 과정이 수월하게 느껴졌습니다. 매 단계마다 문자로 업데이트해 주었습니다.”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“여러 해에 걸쳐 이 매장에서 세 번째로 수리를 맡겼는데, 매번 제대로 처리되었습니다. 3대째 이어온 가족 사업이라는 게 느껴집니다.”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“우박이 제 Camry를 심하게 손상시켰습니다. 무도장 덴트 수리로 새 페인트 흔적 없이 모든 패널을 원상 복구했습니다. 사고가 있었는지 전혀 알 수 없습니다.”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“명확한 견적, 추가 판매 압박 없이 약속한 시간에 정확히 완료되었습니다.”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    PL: {
      topbar: { hours: "Pon–Pt · 8:00–17:00", language: "Język", spanish: "Mówimy Po Hiszpańsku" },
      nav: { services: "Usługi", gallery: "Galeria", about: "O Nas", reviews: "Opinie", contact: "Kontakt", callNow: "Zadzwoń Teraz" },
      cta: {
        freeEstimate: "Bezpłatna Wycena",
        callPhone: "Zadzwoń 925.443.8548 →",
        getEstimate: "Uzyskaj wycenę →",
        lookupCarrier: "Sprawdź swojego ubezpieczyciela →"
      },
      hero: {
        eyebrow: "Rodzinna Firma Od 1980 Roku",
        headline: "Zbudowane<br>Zgodnie Ze Standardem.",
        rating: "Ocena 4.5 w Google",
        bbb: "Akredytacja BBB A+",
        icar: "I-CAR Gold Class",
        spanish: "Mówimy Po Hiszpańsku"
      },
      recentWork: {
        eyebrow: "Ostatnie Prace",
        heading: "Prosto Z Warsztatu",
        frameBay: "Stanowisko ramy i demontażu",
        paintBooth: "Kabina lakiernicza",
        panelFitup: "Montaż paneli",
        liftBay: "Stanowisko podnośnika",
        viewGallery: "Zobacz Pełną<br>Galerię"
      },
      services: {
        eyebrow: "Czym Się Zajmujemy",
        heading: "Każda Naprawa Wykonana Dobrze",
        intro: "Od zarysowanego zderzaka po całkowite prostowanie ramy — nasi technicy z certyfikatem I-CAR Gold Class zajmują się wszystkim we własnym zakresie.",
        collision: { title: "Naprawa Powypadkowa", desc: "Pełna naprawa strukturalna i kosmetyczna wypadków dowolnej wielkości. Uszkodzenia nadwozia i ramy, wymiana paneli oraz ponowny montaż zgodny ze specyfikacją OEM — objęte dożywotnią gwarancją na jakość wykonania." },
        painting: { title: "Lakierowanie Samochodów", desc: "Lakier dobierany komputerowo, aplikowany w naszej kabinie z nawiewem dolnym. Mieszanie, lakier bezbarwny i utwardzanie do wykończenia fabrycznego — na pojedynczym panelu lub całym pojeździe." },
        pdr: { title: "Naprawa Wgnieceń Bez Lakierowania", desc: "Usuwanie szkód gradowych i drobnych wgnieceń drzwi bez cięcia czy ponownego lakierowania, zachowując fabryczne wykończenie i wartość odsprzedaży." },
        frame: { title: "Prostowanie Ramy", desc: "Komputerowy pomiar ramy i hydrauliczne naciąganie w celu przywrócenia struktury pojazdu do tolerancji OEM." },
        glass: { title: "Szyby Samochodowe", desc: "Wymiana przedniej szyby, tylnej szyby i okien na szkło OEM lub równoważne, w tym ponowna kalibracja kamer ADAS." },
        insurance: { title: "Obsługa Roszczeń Ubezpieczeniowych", desc: "Partner Programu Bezpośredniej Naprawy z większością głównych towarzystw ubezpieczeniowych — możemy wystawiać im faktury bezpośrednio i zajmować się formalnościami." }
      },
      gallery: {
        eyebrow: "Charakterystyczne Naprawy",
        heading: "Zobacz Różnicę",
        intro: "Przeciągnij suwak — to standard, z jakim każdy samochód opuszcza nasz warsztat.",
        before: "Przed",
        after: "Po",
        fullEyebrow: "Pełna Galeria",
        browseHeading: "Przeglądaj Prawdziwe Realizacje",
        loading: "Ładowanie ostatnich prac…",
        setupTag: "Jak dodać prawdziwe zdjęcia",
        setupText: "Ta galeria pobiera dane z pliku <code>data/gallery.json</code>. Umieść zdjęcia przed/po w <code>images/gallery/</code>, a następnie ustaw pola <code>\"before\"</code> / <code>\"after\"</code> dla każdej realizacji na ścieżkę pliku. Nie są wymagane żadne zmiany w kodzie."
      },
      process: {
        eyebrow: "Nasz Proces",
        heading: "Od Przyjęcia Do Odbioru",
        intro: "Każda naprawa przebiega według tych samych pięciu kroków — bez niespodzianek, bez skrótów.",
        step1: { title: "Wycena", desc: "Bezpłatna wycena osobista lub na podstawie zdjęć, zwykle tego samego dnia." },
        step2: { title: "Ubezpieczenie", desc: "Zgłaszamy roszczenie i koordynujemy bezpośrednio z Twoim ubezpieczycielem." },
        step3: { title: "Demontaż", desc: "Pełny demontaż w celu wykrycia ukrytych uszkodzeń przed rozpoczęciem naprawy." },
        step4: { title: "Naprawa i Lakierowanie", desc: "Naprawa strukturalna, prace przy panelach oraz lakierowanie dobrane kolorystycznie." },
        step5: { title: "Kontrola Jakości", desc: "Ponowny montaż, mycie oraz końcowa kontrola przed odbiorem." }
      },
      about: {
        eyebrow: "Nasza Historia",
        heading: "Trzy Pokolenia, Jeden Standard.",
        p1: "Tri-Valley Auto Body to rodzinny warsztat blacharski, posiadający dziesięciolecia doświadczenia w świadczeniu usług naprawy nadwozi dla całego obszaru Tri-Valley. Od momentu założenia firmy w 1980 roku właściciel Fernando Romero Sr. oferuje usługi w rodzinnym duchu, zapewniając klientom spersonalizowane procesy naprawy powypadkowej, które przewyższają oczekiwania.",
        p2: "Od pierwszego kontaktu nasza rodzina będzie traktować Cię jak członka rodziny. Obecnie w trzecim pokoleniu, Tri-Valley Auto Body rozumie znaczenie społeczności, rodziny oraz wysokiej jakości usług naprawy powypadkowej. Dla nas wszystko to idzie w parze, aby zapewnić wyjątkową obsługę klienta z empatią i troską o Twoje bezpieczeństwo.",
        p3: "Nasza rodzina pragnie zaprosić Cię do doświadczenia różnicy, jaką oferuje Tri-Valley Auto Body."
      },
      team: {
        eyebrow: "Poznaj Zespół",
        heading: "Kto Pracuje Przy Twoim Samochodzie",
        intro: "Każdy technik ma certyfikat I-CAR, a większość pracuje z nami od ponad dekady.",
        roleOwner: "Właściciel i Główny Technik",
        roleManager: "Kierownik Warsztatu",
        roleEstimator: "Rzeczoznawca",
        rolePaintLead: "Kierownik Lakierni"
      },
      certs: { eyebrow: "Certyfikaty i Reputacja", ase: "Technicy Certyfikowani ASE", licensed: "Licencjonowani i Ubezpieczeni", warranty: "Dożywotnia Gwarancja Na Jakość Wykonania" },
      reviews: {
        eyebrow: "Opinie",
        heading: "Co Mówią Nasi Klienci",
        intro: "Prawdziwe opinie prawdziwych klientów z całej okolicy Tri-Valley — pobrane bezpośrednio z Google.",
        ratingBadge: "Średnia 4.5 · Ponad 300 opinii w Google",
        writeReview: "Napisz Opinię w Google →",
        placeIdNote: "Zastąp link <code>placeid=</code> prawdziwym identyfikatorem Google Place Twojego warsztatu."
      },
      estimate: {
        eyebrow: "Bezpłatna Wycena",
        heading: "Powiedz Nam, Co Się Stało",
        intro: "Zdjęcia pomagają, ale nie są wymagane. Odezwiemy się w ciągu jednego dnia roboczego.",
        labelName: "Imię i Nazwisko",
        labelPhone: "Telefon",
        labelEmail: "E-mail",
        labelVehicle: "Pojazd (Rok / Marka / Model)",
        labelInsurance: "Towarzystwo Ubezpieczeniowe (jeśli dotyczy)",
        labelService: "Potrzebna Usługa",
        notSure: "Nie jestem pewien",
        labelDetails: "Opisz Uszkodzenie",
        labelPhotos: "Zdjęcia (opcjonalnie)",
        photosCta: "Zrób zdjęcie lub prześlij je ze swojego urządzenia",
        submit: "Poproś o Wycenę"
      },
      booking: { eyebrow: "Lub Przejdź Od Razu", heading: "Zarezerwuj Termin Oddania Auta", intro: "Wybierz dogodny dzień i godzinę — potwierdzimy SMS-em." },
      insurance: {
        eyebrow: "Zgłaszanie Roszczenia",
        heading: "Znajdź Swoje Towarzystwo Ubezpieczeniowe",
        intro: "Wyszukaj lub wybierz poniżej swojego ubezpieczyciela, aby poznać jego bezpośrednią linię do zgłaszania roszczeń — i sprawdzić, czy jesteśmy zatwierdzonym warsztatem bezpośredniej naprawy dla tej firmy.",
        searchPlaceholder: "Wyszukaj swoje towarzystwo ubezpieczeniowe…",
        loading: "Ładowanie listy ubezpieczycieli…"
      },
      contact: {
        eyebrow: "Znajdź Nas",
        phoneLabel: "Telefon:",
        textLabel: "SMS:",
        hoursLabel: "Godziny Otwarcia:",
        hours: "Pon–Pt, 8:00–17:00 · Zamknięte w weekendy",
        getDirections: "Wyznacz Trasę →",
        sendMessageEyebrow: "Wyślij Wiadomość",
        quickQuestion: "Masz Szybkie Pytanie?",
        formName: "Imię",
        formEmail: "E-mail",
        formMessage: "Wiadomość",
        sendMessage: "Wyślij Wiadomość"
      },
      ctaBanner: { heading: "Uzyskaj bezpłatną wycenę już dziś.", requestEstimate: "Poproś o Wycenę", callPhone: "Zadzwoń 925.443.8548" },
      footer: {
        tagline: "Rodzinny warsztat naprawy powypadkowej, obsługujący Livermore i okolice Tri-Valley od 1980 roku.",
        servicesHeading: "Usługi",
        pdr: "Naprawa Bez Lakierowania",
        companyHeading: "Firma",
        aboutUs: "O Nas",
        ourWork: "Nasze Realizacje",
        insurance: "Ubezpieczenie",
        bookOnline: "Zarezerwuj Online",
        directions: "Wskazówki Dojazdu",
        credentials: "I-CAR Gold Class · Licencjonowani · Ubezpieczeni"
      },
      chat: { label: "Czat z nami" },
      testimonials: [
        { text: "“Po najechaniu od tyłu na trasie 580 obawiałam się całego procesu. Tri Valley zajęło się moim ubezpieczeniem, zdobyło części i oddało mi SUV-a wyglądającego lepiej niż przed wypadkiem.”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“Załatwili formalności ubezpieczeniowe od początku do końca, dzięki czemu cały proces przebiegł bezproblemowo. Informowali mnie SMS-em na każdym etapie.”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“Trzecia naprawa w tym warsztacie na przestrzeni lat i za każdym razem wykonana solidnie. Firma rodzinna trzeciego pokolenia — i to widać.”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“Grad mocno uszkodził mojego Camry. Naprawa bez lakierowania przywróciła każdy panel bez śladu nowej farby. Nie sposób poznać, że coś się w ogóle wydarzyło.”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“Jasna wycena, bez naciągania na dodatkowe usługi, zakończona dokładnie w zapowiedzianym terminie.”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    },

    PT: {
      topbar: { hours: "Seg–Sex · 8h–17h", language: "Idioma", spanish: "Falamos Espanhol" },
      nav: { services: "Serviços", gallery: "Galeria", about: "Sobre Nós", reviews: "Avaliações", contact: "Contato", callNow: "Ligue Agora" },
      cta: {
        freeEstimate: "Orçamento Gratuito",
        callPhone: "Ligue 925.443.8548 →",
        getEstimate: "Solicitar orçamento →",
        lookupCarrier: "Consulte sua seguradora →"
      },
      hero: {
        eyebrow: "Empresa Familiar Desde 1980",
        headline: "Feito Com<br>Padrão de Qualidade.",
        rating: "Avaliação 4.5 no Google",
        bbb: "Credenciado BBB A+",
        icar: "I-CAR Gold Class",
        spanish: "Falamos Espanhol"
      },
      recentWork: {
        eyebrow: "Trabalhos Recentes",
        heading: "Direto Da Oficina",
        frameBay: "Área de chassi e desmontagem",
        paintBooth: "Cabine de pintura",
        panelFitup: "Montagem de painéis",
        liftBay: "Área de elevação",
        viewGallery: "Ver Galeria<br>Completa"
      },
      services: {
        eyebrow: "O Que Fazemos",
        heading: "Cada Reparo, Feito Corretamente",
        intro: "De um para-choque arranhado a um alinhamento completo de chassi, nossos técnicos certificados I-CAR Gold Class cuidam de tudo internamente.",
        collision: { title: "Reparo de Colisão", desc: "Reparo estrutural e estético completo para acidentes de qualquer tamanho. Danos de carroceria e chassi, substituição de painéis e remontagem conforme especificação OEM — com garantia vitalícia de mão de obra." },
        painting: { title: "Pintura Automotiva", desc: "Tinta com correspondência de cor computadorizada aplicada em nossa cabine de fluxo descendente. Mistura, verniz e cura até o acabamento de fábrica — em um único painel ou repintura completa." },
        pdr: { title: "Reparo de Amassados Sem Pintura", desc: "Danos de granizo e pequenos amassados de porta removidos sem cortar ou repintar, preservando o acabamento de fábrica e o valor de revenda." },
        frame: { title: "Alinhamento de Chassi", desc: "Medição computadorizada de chassi e tração hidráulica para restaurar a estrutura do seu veículo às tolerâncias OEM." },
        glass: { title: "Vidros Automotivos", desc: "Substituição de para-brisa, vidro traseiro e janelas com vidro OEM ou equivalente, incluindo recalibração de câmeras ADAS." },
        insurance: { title: "Gestão de Sinistros", desc: "Parceiro do Programa de Reparo Direto com a maioria das principais seguradoras — podemos faturar diretamente a elas e cuidar da papelada." }
      },
      gallery: {
        eyebrow: "Reparos De Destaque",
        heading: "Veja A Diferença",
        intro: "Arraste o controle deslizante — este é o padrão com que cada carro sai da nossa oficina.",
        before: "Antes",
        after: "Depois",
        fullEyebrow: "Galeria Completa",
        browseHeading: "Veja Trabalhos Reais",
        loading: "Carregando trabalhos recentes…",
        setupTag: "Como adicionar fotos reais",
        setupText: "Esta galeria lê de <code>data/gallery.json</code>. Coloque fotos de antes/depois em <code>images/gallery/</code> e, em seguida, defina os campos <code>\"before\"</code> / <code>\"after\"</code> de cada trabalho com o caminho do arquivo. Nenhuma alteração de código é necessária."
      },
      process: {
        eyebrow: "Nosso Processo",
        heading: "Da Entrega À Conclusão",
        intro: "Cada reparo segue as mesmas cinco etapas — sem surpresas, sem atalhos.",
        step1: { title: "Orçamento", desc: "Orçamento gratuito presencial ou por foto, geralmente no mesmo dia." },
        step2: { title: "Seguro", desc: "Registramos o sinistro e coordenamos diretamente com sua seguradora." },
        step3: { title: "Desmontagem", desc: "Desmontagem completa para identificar danos ocultos antes de iniciar o reparo." },
        step4: { title: "Reparo e Pintura", desc: "Reparo estrutural, trabalho de painéis e pintura com correspondência de cor." },
        step5: { title: "Controle de Qualidade", desc: "Remontagem, lavagem e inspeção final antes da retirada." }
      },
      about: {
        eyebrow: "Nossa História",
        heading: "Três Gerações, Um Padrão.",
        p1: "A Tri-Valley Auto Body é uma oficina de funilaria familiar, com décadas de experiência prestando serviços de reparo de carroceria para toda a região de Tri-Valley. Desde a nossa fundação em 1980, o proprietário Fernando Romero Sr. tem oferecido serviços com uma abordagem familiar, proporcionando aos clientes processos de reparo de colisão personalizados que superam as expectativas.",
        p2: "Desde o primeiro contato, nossa família vai tratá-lo como família. Agora em sua terceira geração, a Tri-Valley Auto Body entende a importância da comunidade, da família e de serviços de reparo de colisão de qualidade. Para nós, tudo isso caminha junto para oferecer um atendimento ao cliente excepcional, com compaixão e compromisso com a sua segurança.",
        p3: "Nossa família gostaria de convidá-lo a experimentar a diferença Tri-Valley Auto Body."
      },
      team: {
        eyebrow: "Conheça A Equipe",
        heading: "Quem Está Trabalhando No Seu Carro",
        intro: "Todos os técnicos aqui são certificados pela I-CAR e a maioria está conosco há mais de uma década.",
        roleOwner: "Proprietário e Técnico Principal",
        roleManager: "Gerente da Oficina",
        roleEstimator: "Orçamentista",
        rolePaintLead: "Líder de Pintura"
      },
      certs: { eyebrow: "Certificações e Reputação", ase: "Técnicos Certificados ASE", licensed: "Licenciado e Segurado", warranty: "Garantia Vitalícia de Mão de Obra" },
      reviews: {
        eyebrow: "Avaliações",
        heading: "O Que Nossos Clientes Dizem",
        intro: "Comentários reais de clientes reais em toda a região Tri-Valley — retirados diretamente do Google.",
        ratingBadge: "Média 4.5 · Mais de 300 avaliações no Google",
        writeReview: "Escrever Uma Avaliação no Google →",
        placeIdNote: "Substitua o link <code>placeid=</code> pelo ID real do Google Place da sua oficina."
      },
      estimate: {
        eyebrow: "Orçamento Gratuito",
        heading: "Conte-nos O Que Aconteceu",
        intro: "Fotos ajudam, mas não são obrigatórias. Retornaremos em até um dia útil.",
        labelName: "Nome Completo",
        labelPhone: "Telefone",
        labelEmail: "E-mail",
        labelVehicle: "Veículo (Ano / Marca / Modelo)",
        labelInsurance: "Seguradora (se houver)",
        labelService: "Serviço Necessário",
        notSure: "Não tenho certeza",
        labelDetails: "Descreva O Dano",
        labelPhotos: "Fotos (opcional)",
        photosCta: "Tire uma foto ou envie uma do seu dispositivo",
        submit: "Solicitar Orçamento"
      },
      booking: { eyebrow: "Ou Vá Direto", heading: "Agende Um Horário De Entrega", intro: "Escolha um dia e horário que funcionem para você — confirmaremos por mensagem de texto." },
      insurance: {
        eyebrow: "Abrindo Um Sinistro",
        heading: "Encontre Sua Seguradora",
        intro: "Pesquise ou selecione sua seguradora abaixo para ver sua linha direta de sinistros — e verificar se somos uma oficina de reparo direto aprovada por ela.",
        searchPlaceholder: "Pesquise sua seguradora…",
        loading: "Carregando seguradoras…"
      },
      contact: {
        eyebrow: "Encontre-nos",
        phoneLabel: "Telefone:",
        textLabel: "Mensagem de Texto:",
        hoursLabel: "Horário:",
        hours: "Seg–Sex, 8h–17h · Fechado nos fins de semana",
        getDirections: "Obter Direções →",
        sendMessageEyebrow: "Envie Uma Mensagem",
        quickQuestion: "Uma Pergunta Rápida?",
        formName: "Nome",
        formEmail: "E-mail",
        formMessage: "Mensagem",
        sendMessage: "Enviar Mensagem"
      },
      ctaBanner: { heading: "Obtenha um orçamento gratuito hoje.", requestEstimate: "Solicitar Orçamento", callPhone: "Ligue 925.443.8548" },
      footer: {
        tagline: "Oficina familiar de reparo de colisão, atendendo Livermore e a região Tri-Valley desde 1980.",
        servicesHeading: "Serviços",
        pdr: "Reparo Sem Pintura",
        companyHeading: "Empresa",
        aboutUs: "Sobre Nós",
        ourWork: "Nosso Trabalho",
        insurance: "Seguro",
        bookOnline: "Agendar Online",
        directions: "Direções",
        credentials: "I-CAR Gold Class · Licenciado · Segurado"
      },
      chat: { label: "Converse conosco" },
      testimonials: [
        { text: "“Depois de uma colisão traseira na 580, eu temia todo o processo. A Tri Valley cuidou do meu seguro, conseguiu as peças e entregou meu SUV com uma aparência melhor do que antes do acidente.”", who: "Erin C.", loc: "Livermore, CA" },
        { text: "“Cuidaram da papelada do seguro do início ao fim, então todo o processo foi tranquilo. Me mantiveram atualizado por mensagem de texto em cada etapa.”", who: "Dan M.", loc: "Pleasanton, CA" },
        { text: "“Terceiro reparo com esta oficina ao longo dos anos, e todos foram feitos corretamente. Empresa familiar de terceira geração, e isso se nota.”", who: "Kent S.", loc: "Livermore, CA" },
        { text: "“O granizo atingiu meu Camry com força. O reparo sem pintura trouxe cada painel de volta sem um traço de tinta nova. Você não consegue notar que aconteceu.”", who: "Priya S.", loc: "Dublin, CA" },
        { text: "“Orçamento direto, sem tentativa de venda adicional, concluído exatamente quando disseram que estaria.”", who: "Marcus B.", loc: "Pleasanton, CA" }
      ]
    }
  };

  function getLang(code) {
    return T[code] || T.EN;
  }

  function getByPath(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return null;
      cur = cur[parts[i]];
    }
    return typeof cur === "string" ? cur : null;
  }

  function applyLanguage(code) {
    var dict = getLang(code);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = getByPath(dict, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = getByPath(dict, el.getAttribute("data-i18n-html"));
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var val = getByPath(dict, el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
    });

    document.documentElement.lang = code.toLowerCase();
    document.documentElement.dir = RTL_LANGS[code] ? "rtl" : "ltr";

    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      /* localStorage unavailable (private browsing, etc) — language just won't persist */
    }

    renderTestimonials(code);
  }

  function renderTestimonials(code) {
    var dict = getLang(code || getSavedLanguage());
    if (window.TVAB && typeof window.TVAB.initTestimonials === "function") {
      window.TVAB.initTestimonials(dict.testimonials, { scope: "#reviews" });
    }
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "EN";
    } catch (e) {
      return "EN";
    }
  }

  function syncDropdownUI(code) {
    var wrap = document.querySelector("[data-lang-dropdown]");
    if (!wrap) return;
    var label = wrap.querySelector("[data-lang-trigger-label]");
    var options = wrap.querySelectorAll('[role="option"]');
    options.forEach(function (opt) {
      var match = opt.getAttribute("data-short") === code;
      opt.setAttribute("aria-selected", match ? "true" : "false");
      if (match && label) label.textContent = opt.dataset.short;
    });
  }

  function initI18n() {
    var saved = getSavedLanguage();
    syncDropdownUI(saved);
    applyLanguage(saved);
  }

  window.TVAB = window.TVAB || {};
  window.TVAB.onLanguageChange = applyLanguage;
  window.TVAB.renderTestimonials = renderTestimonials;
  window.TVAB.initI18n = initI18n;

  document.addEventListener("DOMContentLoaded", initI18n);
})();
