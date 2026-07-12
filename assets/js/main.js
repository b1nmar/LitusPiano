/* Candle Night Piano — i18n (ES/EN/FR/DE/IT), scroll-driven stage, reveals,
   parallax, price reveal, animated Europe coverage map */
(function () {
  'use strict';

  /* ---------------- i18n dictionary ---------------- */
  var I18N = {
    es: {
      nav_book: 'Reservar',
      nav_pricing: 'Tarifas',
      hero_over: 'Litus Piano presenta',
      hero_sub: '45 minutos que no vas a olvidar. Solo un piano, cientos de velas y la música que te toca el alma.',
      hero_cta: 'Reserva tu noche mágica',
      hero_scroll: 'Desliza para vivirlo',

      exp_eyebrow: 'La experiencia',
      exp_title: 'Una noche a la luz de las velas que se queda contigo para siempre',
      exp_lead: 'Apago las luces, enciendo las velas y me siento al piano. Durante 45 minutos desaparece el mundo: solo quedan las melodías que todos reconocemos, envueltas en una atmósfera íntima, cálida y absolutamente mágica.',
      exp_pill1: '45 minutos en directo',
      exp_pill2: 'Piezas conocidas',
      exp_pill3: 'Románticas y minimalistas',
      exp_pill4: 'Todo interpretado por mí',

      stage_1_t: 'Un espacio solo iluminado por velas',
      stage_1_b: 'Cientos de llamas, un piano y el silencio expectante antes de la primera nota.',
      stage_2_t: 'Solo el piano y tú',
      stage_2_b: 'Sin bandas, sin artificios. Yo, en directo, tejiendo cada melodía nota a nota.',
      stage_3_t: 'Una sala suspendida en la música',
      stage_3_b: 'El público contiene la respiración. Un momento que nadie olvida.',

      rep_eyebrow: 'El repertorio',
      rep_title: 'Del romanticismo clásico al minimalismo más íntimo',
      rep_lead: 'Las melodías que todo el mundo reconoce y nadie se cansa de escuchar, elegidas para emocionar desde el primer compás.',
      rep_chip_film: 'Bandas sonoras de cine',
      rep_chip_pop: 'Minimalismo contemporáneo',

      gal_eyebrow: 'La atmósfera',
      gal_title: 'Así se siente una Candle Night',
      gal_note: 'Imágenes de actuaciones reales, tratadas artísticamente para preservar la privacidad de los asistentes.',

      occ_eyebrow: 'Perfecto para',
      occ_title: 'Convierte tu evento en algo inolvidable',
      occ_1_t: 'Bodas y aniversarios',
      occ_1_b: 'El momento romántico que vuestros invitados recordarán para siempre.',
      occ_2_t: 'Eventos privados y de empresa',
      occ_2_b: 'Una experiencia sofisticada que eleva cualquier velada corporativa.',
      occ_3_t: 'Hoteles y restaurantes',
      occ_3_b: 'Convierte una cena en una experiencia sensorial completa.',
      occ_4_t: 'Marcas de lujo',
      occ_4_b: 'Presentaciones y experiencias VIP con una banda sonora en directo.',

      cov_eyebrow: 'Cobertura',
      cov_title: 'De Barcelona a cualquier rincón de Europa',
      cov_lead: 'Resido en Barcelona y viajo allí donde haya un piano esperando. Cada línea en el cielo es una posible noche mágica.',
      cov_note: '¿Tu ciudad no está en el mapa? Escríbeme: podría ser la siguiente.',

      price_eyebrow: 'Tarifa',
      price_title: 'Una experiencia irrepetible, a un precio que sorprende',
      price_plan: 'Candle Night Piano',
      price_reveal_btn: 'Descubrir la tarifa',
      price_unit: 'por actuación de 45 minutos',
      price_incl1: 'Actuación de piano en directo de 45 minutos',
      price_incl2: 'Repertorio a medida: piezas conocidas, románticas y minimalistas',
      price_incl3: 'Interpretado íntegramente por mí, en persona',
      price_note_title: 'La tarifa NO incluye:',
      price_note_body: 'Impuestos, desplazamientos, alojamiento ni los medios necesarios para el concierto (piano, velas, sala o escenario, sonido e iluminación), que corren a cargo del cliente.',
      price_cta: 'Quiero reservar mi noche',

      book_eyebrow: 'Reserva',
      book_title: 'Regala una noche que nadie olvidará',
      book_lead: 'Cuéntame la fecha, la ciudad y el tipo de evento. Te respondo personalmente con todos los detalles para hacerlo realidad.',
      book_email: 'Escríbeme por email',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: '¡Usuario copiado! Búscame en WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. Todos los derechos reservados.'
    },

    en: {
      nav_book: 'Book now',
      nav_pricing: 'Pricing',
      hero_over: 'Litus Piano presents',
      hero_sub: '45 minutes you will never forget. Just a piano, hundreds of candles and the music that touches your soul.',
      hero_cta: 'Book your magical night',
      hero_scroll: 'Scroll to feel it',

      exp_eyebrow: 'The experience',
      exp_title: 'A candlelit night that stays with you forever',
      exp_lead: 'I dim the lights, light the candles and sit at the piano. For 45 minutes the world disappears: only the melodies we all recognise remain, wrapped in an intimate, warm and utterly magical atmosphere.',
      exp_pill1: '45 minutes live',
      exp_pill2: 'Well-known pieces',
      exp_pill3: 'Romantic & minimalist',
      exp_pill4: 'Every note played by me',

      stage_1_t: 'A room lit only by candlelight',
      stage_1_b: 'Hundreds of flames, a piano and the expectant silence before the first note.',
      stage_2_t: 'Just the piano and you',
      stage_2_b: 'No band, no gimmicks. Me, live, weaving every melody note by note.',
      stage_3_t: 'A room suspended in the music',
      stage_3_b: 'The audience holds its breath. A moment no one forgets.',

      rep_eyebrow: 'The repertoire',
      rep_title: 'From classical romanticism to the most intimate minimalism',
      rep_lead: 'The melodies everyone recognises and never tires of hearing, chosen to move you from the very first bar.',
      rep_chip_film: 'Film soundtracks',
      rep_chip_pop: 'Contemporary minimalism',

      gal_eyebrow: 'The atmosphere',
      gal_title: 'This is how a Candle Night feels',
      gal_note: 'Images from real performances, artistically treated to protect the privacy of the audience.',

      occ_eyebrow: 'Perfect for',
      occ_title: 'Turn your event into something unforgettable',
      occ_1_t: 'Weddings & anniversaries',
      occ_1_b: 'The romantic moment your guests will remember forever.',
      occ_2_t: 'Private & corporate events',
      occ_2_b: 'A sophisticated experience that elevates any evening.',
      occ_3_t: 'Hotels & restaurants',
      occ_3_b: 'Turn a dinner into a complete sensory experience.',
      occ_4_t: 'Luxury brands',
      occ_4_b: 'Launches and VIP experiences with a live soundtrack.',

      cov_eyebrow: 'Coverage',
      cov_title: 'From Barcelona to every corner of Europe',
      cov_lead: 'I live in Barcelona and travel wherever a piano is waiting. Every line in the sky is a possible magical night.',
      cov_note: 'Your city isn’t on the map? Write me — it could be next.',

      price_eyebrow: 'Pricing',
      price_title: 'A once-in-a-lifetime experience, at a price that surprises',
      price_plan: 'Candle Night Piano',
      price_reveal_btn: 'Reveal the fee',
      price_unit: 'per 45-minute performance',
      price_incl1: '45-minute live piano performance',
      price_incl2: 'Tailored repertoire: well-known, romantic and minimalist pieces',
      price_incl3: 'Performed entirely by me, in person',
      price_note_title: 'The fee does NOT include:',
      price_note_body: 'Taxes, travel, accommodation or the resources needed for the concert (piano, candles, venue or stage, sound and lighting), which are provided by the client.',
      price_cta: 'I want to book my night',

      book_eyebrow: 'Booking',
      book_title: 'Gift a night no one will ever forget',
      book_lead: 'Tell me the date, the city and the type of event. I reply personally with everything you need to make it happen.',
      book_email: 'Email me',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: 'Username copied! Search me on WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. All rights reserved.'
    },

    fr: {
      nav_book: 'Réserver',
      nav_pricing: 'Tarifs',
      hero_over: 'Litus Piano présente',
      hero_sub: '45 minutes que vous n’oublierez jamais. Un piano, des centaines de bougies et la musique qui touche l’âme.',
      hero_cta: 'Réservez votre nuit magique',
      hero_scroll: 'Faites défiler pour le vivre',

      exp_eyebrow: 'L’expérience',
      exp_title: 'Une nuit aux chandelles qui reste avec vous pour toujours',
      exp_lead: 'Je baisse les lumières, j’allume les bougies et je m’assieds au piano. Pendant 45 minutes, le monde disparaît : il ne reste que les mélodies que nous reconnaissons tous, enveloppées d’une atmosphère intime, chaleureuse et absolument magique.',
      exp_pill1: '45 minutes en direct',
      exp_pill2: 'Œuvres célèbres',
      exp_pill3: 'Romantiques et minimalistes',
      exp_pill4: 'Chaque note jouée par moi',

      stage_1_t: 'Un espace éclairé uniquement à la bougie',
      stage_1_b: 'Des centaines de flammes, un piano et le silence qui précède la première note.',
      stage_2_t: 'Juste le piano et vous',
      stage_2_b: 'Sans artifices. Moi, en direct, tissant chaque mélodie note après note.',
      stage_3_t: 'Une salle suspendue dans la musique',
      stage_3_b: 'Le public retient son souffle. Un moment que personne n’oublie.',

      rep_eyebrow: 'Le répertoire',
      rep_title: 'Du romantisme classique au minimalisme le plus intime',
      rep_lead: 'Les mélodies que tout le monde reconnaît et ne se lasse jamais d’écouter, choisies pour émouvoir dès la première mesure.',
      rep_chip_film: 'Musiques de film',
      rep_chip_pop: 'Minimalisme contemporain',

      gal_eyebrow: 'L’atmosphère',
      gal_title: 'Voici ce que l’on ressent lors d’une Candle Night',
      gal_note: 'Images de concerts réels, traitées artistiquement pour préserver la vie privée du public.',

      occ_eyebrow: 'Parfait pour',
      occ_title: 'Transformez votre événement en un souvenir inoubliable',
      occ_1_t: 'Mariages et anniversaires',
      occ_1_b: 'Le moment romantique dont vos invités se souviendront toujours.',
      occ_2_t: 'Événements privés et d’entreprise',
      occ_2_b: 'Une expérience raffinée qui sublime toute soirée.',
      occ_3_t: 'Hôtels et restaurants',
      occ_3_b: 'Transformez un dîner en une expérience sensorielle complète.',
      occ_4_t: 'Marques de luxe',
      occ_4_b: 'Lancements et expériences VIP avec une bande sonore en direct.',

      cov_eyebrow: 'Couverture',
      cov_title: 'De Barcelone à chaque recoin d’Europe',
      cov_lead: 'Je vis à Barcelone et je voyage partout où un piano attend. Chaque ligne dans le ciel est une nuit magique possible.',
      cov_note: 'Votre ville n’est pas sur la carte ? Écrivez-moi : elle pourrait être la prochaine.',

      price_eyebrow: 'Tarifs',
      price_title: 'Une expérience unique, à un prix qui surprend',
      price_plan: 'Candle Night Piano',
      price_reveal_btn: 'Découvrir le tarif',
      price_unit: 'par représentation de 45 minutes',
      price_incl1: '45 minutes de piano en direct',
      price_incl2: 'Répertoire sur mesure : œuvres célèbres, romantiques et minimalistes',
      price_incl3: 'Interprété entièrement par moi, en personne',
      price_note_title: 'Le tarif n’inclut PAS :',
      price_note_body: 'Taxes, déplacements, hébergement ni les moyens nécessaires au concert (piano, bougies, salle ou scène, son et lumières), à la charge du client.',
      price_cta: 'Je veux réserver ma nuit',

      book_eyebrow: 'Réservation',
      book_title: 'Offrez une nuit que personne n’oubliera',
      book_lead: 'Indiquez-moi la date, la ville et le type d’événement. Je vous réponds personnellement avec tous les détails.',
      book_email: 'Écrivez-moi par email',
      book_wa: 'WhatsApp : En_Litos',
      book_wa_copied: 'Identifiant copié ! Cherchez-moi sur WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. Tous droits réservés.'
    },

    de: {
      nav_book: 'Buchen',
      nav_pricing: 'Preise',
      hero_over: 'Litus Piano präsentiert',
      hero_sub: '45 Minuten, die Sie nie vergessen werden. Nur ein Klavier, Hunderte von Kerzen und Musik, die die Seele berührt.',
      hero_cta: 'Buchen Sie Ihre magische Nacht',
      hero_scroll: 'Scrollen und eintauchen',

      exp_eyebrow: 'Das Erlebnis',
      exp_title: 'Eine Nacht im Kerzenlicht, die für immer bleibt',
      exp_lead: 'Ich dimme das Licht, zünde die Kerzen an und setze mich ans Klavier. Für 45 Minuten verschwindet die Welt: Es bleiben nur die Melodien, die wir alle kennen – eingehüllt in eine intime, warme und absolut magische Atmosphäre.',
      exp_pill1: '45 Minuten live',
      exp_pill2: 'Bekannte Stücke',
      exp_pill3: 'Romantisch & minimalistisch',
      exp_pill4: 'Jede Note von mir gespielt',

      stage_1_t: 'Ein Raum, nur von Kerzen erleuchtet',
      stage_1_b: 'Hunderte Flammen, ein Klavier und die erwartungsvolle Stille vor dem ersten Ton.',
      stage_2_t: 'Nur das Klavier und Sie',
      stage_2_b: 'Keine Band, keine Effekte. Ich, live, Note für Note.',
      stage_3_t: 'Ein Saal, der in der Musik schwebt',
      stage_3_b: 'Das Publikum hält den Atem an. Ein Moment, den niemand vergisst.',

      rep_eyebrow: 'Das Repertoire',
      rep_title: 'Von klassischer Romantik bis zum intimsten Minimalismus',
      rep_lead: 'Melodien, die jeder kennt und nie müde wird zu hören – ausgewählt, um vom ersten Takt an zu berühren.',
      rep_chip_film: 'Filmmusik',
      rep_chip_pop: 'Zeitgenössischer Minimalismus',

      gal_eyebrow: 'Die Atmosphäre',
      gal_title: 'So fühlt sich eine Candle Night an',
      gal_note: 'Bilder echter Konzerte, künstlerisch bearbeitet, um die Privatsphäre des Publikums zu schützen.',

      occ_eyebrow: 'Perfekt für',
      occ_title: 'Machen Sie Ihr Event unvergesslich',
      occ_1_t: 'Hochzeiten & Jubiläen',
      occ_1_b: 'Der romantische Moment, an den sich Ihre Gäste für immer erinnern.',
      occ_2_t: 'Private & Firmenevents',
      occ_2_b: 'Ein stilvolles Erlebnis, das jeden Abend veredelt.',
      occ_3_t: 'Hotels & Restaurants',
      occ_3_b: 'Verwandeln Sie ein Dinner in ein Erlebnis für alle Sinne.',
      occ_4_t: 'Luxusmarken',
      occ_4_b: 'Launches und VIP-Erlebnisse mit Live-Soundtrack.',

      cov_eyebrow: 'Reichweite',
      cov_title: 'Von Barcelona in jeden Winkel Europas',
      cov_lead: 'Ich lebe in Barcelona und reise überallhin, wo ein Klavier wartet. Jede Linie am Himmel ist eine mögliche magische Nacht.',
      cov_note: 'Ihre Stadt ist nicht auf der Karte? Schreiben Sie mir – sie könnte die nächste sein.',

      price_eyebrow: 'Preise',
      price_title: 'Ein einmaliges Erlebnis zu einem überraschenden Preis',
      price_plan: 'Candle Night Piano',
      price_reveal_btn: 'Preis entdecken',
      price_unit: 'pro 45-minütigem Auftritt',
      price_incl1: '45 Minuten Klavier live',
      price_incl2: 'Maßgeschneidertes Repertoire: bekannte, romantische und minimalistische Stücke',
      price_incl3: 'Vollständig von mir persönlich gespielt',
      price_note_title: 'Der Preis beinhaltet NICHT:',
      price_note_body: 'Steuern, Anreise, Unterkunft sowie die für das Konzert nötigen Mittel (Klavier, Kerzen, Saal oder Bühne, Ton und Licht) – diese trägt der Kunde.',
      price_cta: 'Ich möchte meine Nacht buchen',

      book_eyebrow: 'Buchung',
      book_title: 'Verschenken Sie eine unvergessliche Nacht',
      book_lead: 'Nennen Sie mir Datum, Stadt und Art des Events. Ich antworte persönlich mit allen Details.',
      book_email: 'Schreiben Sie mir',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: 'Benutzername kopiert! Suchen Sie mich auf WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. Alle Rechte vorbehalten.'
    },

    it: {
      nav_book: 'Prenota',
      nav_pricing: 'Prezzi',
      hero_over: 'Litus Piano presenta',
      hero_sub: '45 minuti che non dimenticherete mai. Solo un pianoforte, centinaia di candele e la musica che tocca l’anima.',
      hero_cta: 'Prenota la tua notte magica',
      hero_scroll: 'Scorri per viverlo',

      exp_eyebrow: 'L’esperienza',
      exp_title: 'Una notte a lume di candela che resta con te per sempre',
      exp_lead: 'Abbasso le luci, accendo le candele e mi siedo al pianoforte. Per 45 minuti il mondo scompare: restano solo le melodie che tutti riconosciamo, avvolte in un’atmosfera intima, calda e assolutamente magica.',
      exp_pill1: '45 minuti dal vivo',
      exp_pill2: 'Brani celebri',
      exp_pill3: 'Romantici e minimalisti',
      exp_pill4: 'Ogni nota suonata da me',

      stage_1_t: 'Uno spazio illuminato solo dalle candele',
      stage_1_b: 'Centinaia di fiamme, un pianoforte e il silenzio prima della prima nota.',
      stage_2_t: 'Solo il pianoforte e te',
      stage_2_b: 'Senza artifici. Io, dal vivo, tessendo ogni melodia nota dopo nota.',
      stage_3_t: 'Una sala sospesa nella musica',
      stage_3_b: 'Il pubblico trattiene il respiro. Un momento che nessuno dimentica.',

      rep_eyebrow: 'Il repertorio',
      rep_title: 'Dal romanticismo classico al minimalismo più intimo',
      rep_lead: 'Le melodie che tutti riconoscono e non si stancano mai di ascoltare, scelte per emozionare dalla prima battuta.',
      rep_chip_film: 'Colonne sonore',
      rep_chip_pop: 'Minimalismo contemporaneo',

      gal_eyebrow: 'L’atmosfera',
      gal_title: 'Ecco come si vive una Candle Night',
      gal_note: 'Immagini di concerti reali, trattate artisticamente per proteggere la privacy del pubblico.',

      occ_eyebrow: 'Perfetto per',
      occ_title: 'Rendi il tuo evento indimenticabile',
      occ_1_t: 'Matrimoni e anniversari',
      occ_1_b: 'Il momento romantico che i vostri ospiti ricorderanno per sempre.',
      occ_2_t: 'Eventi privati e aziendali',
      occ_2_b: 'Un’esperienza raffinata che eleva ogni serata.',
      occ_3_t: 'Hotel e ristoranti',
      occ_3_b: 'Trasforma una cena in un’esperienza sensoriale completa.',
      occ_4_t: 'Brand di lusso',
      occ_4_b: 'Lanci ed esperienze VIP con colonna sonora dal vivo.',

      cov_eyebrow: 'Copertura',
      cov_title: 'Da Barcellona a ogni angolo d’Europa',
      cov_lead: 'Vivo a Barcellona e viaggio ovunque ci sia un pianoforte ad aspettarmi. Ogni linea nel cielo è una possibile notte magica.',
      cov_note: 'La tua città non è sulla mappa? Scrivimi: potrebbe essere la prossima.',

      price_eyebrow: 'Prezzi',
      price_title: 'Un’esperienza irripetibile, a un prezzo che sorprende',
      price_plan: 'Candle Night Piano',
      price_reveal_btn: 'Scopri la tariffa',
      price_unit: 'per esibizione di 45 minuti',
      price_incl1: '45 minuti di pianoforte dal vivo',
      price_incl2: 'Repertorio su misura: brani celebri, romantici e minimalisti',
      price_incl3: 'Interpretato interamente da me, di persona',
      price_note_title: 'La tariffa NON include:',
      price_note_body: 'Tasse, trasferte, alloggio e i mezzi necessari per il concerto (pianoforte, candele, sala o palco, audio e luci), a carico del cliente.',
      price_cta: 'Voglio prenotare la mia notte',

      book_eyebrow: 'Prenotazione',
      book_title: 'Regala una notte che nessuno dimenticherà',
      book_lead: 'Dimmi la data, la città e il tipo di evento. Ti rispondo personalmente con tutti i dettagli.',
      book_email: 'Scrivimi via email',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: 'Nome utente copiato! Cercami su WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. Tutti i diritti riservati.'
    }
  };

  var MAIL = {
    es: { subject: 'Reserva Candle Night Piano', body: 'Hola Litus,\n\nMe gustaría reservar una actuación de Candle Night Piano.\n\nFecha:\nCiudad:\nTipo de evento:\n\n¡Gracias!' },
    en: { subject: 'Candle Night Piano booking', body: 'Hi Litus,\n\nI would like to book a Candle Night Piano performance.\n\nDate:\nCity:\nType of event:\n\nThank you!' },
    fr: { subject: 'Réservation Candle Night Piano', body: 'Bonjour Litus,\n\nJe souhaiterais réserver une représentation de Candle Night Piano.\n\nDate :\nVille :\nType d’événement :\n\nMerci !' },
    de: { subject: 'Buchung Candle Night Piano', body: 'Hallo Litus,\n\nich möchte einen Candle-Night-Piano-Auftritt buchen.\n\nDatum:\nStadt:\nArt des Events:\n\nVielen Dank!' },
    it: { subject: 'Prenotazione Candle Night Piano', body: 'Ciao Litus,\n\nvorrei prenotare un’esibizione di Candle Night Piano.\n\nData:\nCittà:\nTipo di evento:\n\nGrazie!' }
  };

  var EMAIL = 'lituspiano@gmail.com';
  var WA_USER = 'En_Litos';
  var LANGS = ['es', 'en', 'fr', 'de', 'it'];
  var currentLang = 'es';

  function applyLang(lang) {
    currentLang = I18N[lang] ? lang : 'en';
    var dict = I18N[currentLang];
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    var y = new Date().getFullYear();
    document.querySelectorAll('.yr').forEach(function (el) { el.textContent = y; });

    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = currentLang.toUpperCase();
    document.querySelectorAll('.lang-list [data-setlang]').forEach(function (b) {
      b.classList.toggle('current', b.getAttribute('data-setlang') === currentLang);
    });

    var mail = document.getElementById('mailBtn');
    if (mail) {
      var m = MAIL[currentLang];
      mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
    }
    try { localStorage.setItem('cnp_lang', currentLang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('cnp_lang'); } catch (e) {}
    var lang = saved;
    if (!lang) {
      var nav = (navigator.language || 'en').toLowerCase().slice(0, 2);
      lang = LANGS.indexOf(nav) >= 0 ? nav : 'en';
    }
    applyLang(lang);

    var toggle = document.getElementById('langToggle');
    var list = document.getElementById('langList');
    if (!toggle || !list) return;
    function close() { list.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = list.hidden;
      list.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    list.querySelectorAll('[data-setlang]').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-setlang')); close(); });
    });
    document.addEventListener('click', function (e) {
      if (!list.hidden && !list.contains(e.target) && e.target !== toggle) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------------- WhatsApp: copy username ---------------- */
  function initWhatsApp() {
    var wa = document.getElementById('waBtn');
    if (!wa) return;
    wa.addEventListener('click', function (e) {
      e.preventDefault();
      var original = I18N[currentLang].book_wa;
      var done = function () {
        wa.textContent = I18N[currentLang].book_wa_copied;
        setTimeout(function () { wa.textContent = original; }, 2600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(WA_USER).then(done, done);
      } else { done(); }
    });
  }

  /* ---------------- price reveal ---------------- */
  function initPriceReveal() {
    var btn = document.getElementById('revealPriceBtn');
    var val = document.getElementById('priceValue');
    if (!btn || !val) return;
    btn.addEventListener('click', function () {
      val.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.style.display = 'none';
    });
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- topbar ---------------- */
  function initTopbar() {
    var bar = document.querySelector('.topbar');
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- scroll-driven stage + hero parallax ---------------- */
  function initScrollFX() {
    var stage = document.getElementById('stage');
    var layers = Array.prototype.slice.call(document.querySelectorAll('.stage-layer'));
    var caps = Array.prototype.slice.call(document.querySelectorAll('.stage-caption'));
    var heroBg = document.querySelector('.hero-bg');
    var count = layers.length;
    var ticking = false;
    var lastIndex = -1;

    function setActive(idx) {
      if (idx === lastIndex) return;
      lastIndex = idx;
      layers.forEach(function (l, i) { l.classList.toggle('active', i === idx); });
      caps.forEach(function (c, i) { c.classList.toggle('active', i === idx); });
    }

    function update() {
      ticking = false;
      if (heroBg) {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = 'scale(1.08) translateY(' + (y * 0.35) + 'px)';
        }
      }
      if (stage) {
        var rect = stage.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height - vh;
        var scrolled = Math.min(Math.max(-rect.top, 0), total);
        var progress = total > 0 ? scrolled / total : 0;
        var idx = Math.min(count - 1, Math.floor(progress * count));
        if (rect.top > vh || rect.bottom < 0) {
          setActive(rect.top > 0 ? 0 : count - 1);
        } else {
          setActive(idx);
        }
      }
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    setActive(0);
    update();
  }

  /* ---------------- floating embers ---------------- */
  function initEmbers() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var root = document.querySelector('.embers');
    if (!root) return;
    var n = window.innerWidth < 640 ? 10 : 18;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      var dur = 9 + Math.random() * 12;
      e.style.left = (Math.random() * 100) + 'vw';
      e.style.animationDuration = dur + 's';
      e.style.animationDelay = (-Math.random() * dur) + 's';
      var s = 2 + Math.random() * 4;
      e.style.width = e.style.height = s + 'px';
      e.style.opacity = 0.3 + Math.random() * 0.5;
      root.appendChild(e);
    }
  }

  /* ---------------- Europe coverage map (airline-route style) ---------------- */
  function initEuroMap() {
    var svg = document.getElementById('euromap');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // [name, lat, lon, major]
    var CITIES = [
      ['London', 51.51, -0.13, 1],
      ['Dublin', 53.35, -6.26, 1],
      ['Paris', 48.86, 2.35, 1],
      ['Brussels', 50.85, 4.35, 0],
      ['Amsterdam', 52.37, 4.90, 1],
      ['Berlin', 52.52, 13.40, 1],
      ['Munich', 48.14, 11.58, 0],
      ['Zurich', 47.37, 8.54, 0],
      ['Milan', 45.46, 9.19, 0],
      ['Rome', 41.90, 12.50, 1],
      ['Vienna', 48.21, 16.37, 1],
      ['Prague', 50.08, 14.44, 0],
      ['Budapest', 47.50, 19.04, 0],
      ['Warsaw', 52.23, 21.01, 0],
      ['Copenhagen', 55.68, 12.57, 1],
      ['Stockholm', 59.33, 18.06, 1],
      ['Oslo', 59.91, 10.75, 0],
      ['Lisbon', 38.72, -9.14, 1],
      ['Madrid', 40.42, -3.70, 0],
      ['Athens', 37.98, 23.73, 1]
    ];
    var BCN = { lat: 41.39, lon: 2.17 };

    function pt(lat, lon) {
      var x = (lon + 11) / 37 * 940 + 30;
      var y = (62 - lat) / 26.5 * 700 + 28;
      return [x, y];
    }
    function mk(tag, attrs) {
      var el = document.createElementNS(NS, tag);
      for (var k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    }

    // faint starfield backdrop (deterministic)
    var seed = 42;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var stars = mk('g', {});
    for (var s = 0; s < 70; s++) {
      stars.appendChild(mk('circle', {
        'class': 'star',
        cx: (rnd() * 960 + 20).toFixed(1),
        cy: (rnd() * 700 + 20).toFixed(1),
        r: (rnd() * 1.3 + 0.4).toFixed(2),
        opacity: (rnd() * 0.1 + 0.05).toFixed(3)
      }));
    }
    svg.appendChild(stars);

    var b = pt(BCN.lat, BCN.lon);
    var arcs = [], dots = [];

    // routes
    var gArcs = mk('g', {});
    CITIES.forEach(function (c) {
      var p = pt(c[1], c[2]);
      var mx = (b[0] + p[0]) / 2, my = (b[1] + p[1]) / 2;
      var dx = p[0] - b[0], dy = p[1] - b[1];
      var dist = Math.sqrt(dx * dx + dy * dy);
      // perpendicular, flipped to always bow "upwards" (towards lower y)
      var nx = -dy / dist, ny = dx / dist;
      if (ny > 0) { nx = -nx; ny = -ny; }
      var k = dist * 0.22;
      var cx = mx + nx * k, cy = my + ny * k;
      var path = mk('path', { 'class': 'arc', d: 'M' + b[0].toFixed(1) + ',' + b[1].toFixed(1) + ' Q' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ' + p[0].toFixed(1) + ',' + p[1].toFixed(1) });
      gArcs.appendChild(path);
      arcs.push(path);
    });
    svg.appendChild(gArcs);

    // city dots + labels
    var gCities = mk('g', {});
    CITIES.forEach(function (c) {
      var p = pt(c[1], c[2]);
      var dot = mk('circle', { 'class': 'citydot', cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: c[3] ? 3.4 : 2.6, opacity: 0.9 });
      gCities.appendChild(dot);
      dots.push(dot);
      var westish = p[0] < 210;
      var label = mk('text', {
        'class': c[3] ? 'major' : 'minor',
        x: (westish ? p[0] - 8 : p[0] + 8).toFixed(1),
        y: (p[1] + 4).toFixed(1),
        'text-anchor': westish ? 'end' : 'start'
      });
      label.textContent = c[0];
      gCities.appendChild(label);
    });
    svg.appendChild(gCities);

    // Barcelona origin: pulse + label
    var gB = mk('g', {});
    if (!reduced) {
      var pulse = mk('circle', { cx: b[0], cy: b[1], r: 7, fill: 'none', stroke: '#f4cf8c', 'stroke-width': 1.4, opacity: 0.6 });
      var a1 = mk('animate', { attributeName: 'r', from: 7, to: 30, dur: '2.6s', repeatCount: 'indefinite' });
      var a2 = mk('animate', { attributeName: 'opacity', from: 0.6, to: 0, dur: '2.6s', repeatCount: 'indefinite' });
      pulse.appendChild(a1); pulse.appendChild(a2);
      gB.appendChild(pulse);
    }
    gB.appendChild(mk('circle', { cx: b[0], cy: b[1], r: 6, fill: '#f4cf8c' }));
    var bl = mk('text', { 'class': 'origin', x: b[0], y: b[1] + 26, 'text-anchor': 'middle' });
    bl.textContent = 'BARCELONA';
    gB.appendChild(bl);
    svg.appendChild(gB);

    // traveling glow dot (one at a time, discreet)
    var glowOuter = mk('circle', { r: 8, fill: '#f4cf8c', opacity: 0 });
    var glowInner = mk('circle', { r: 3.2, fill: '#fff2d8', opacity: 0 });
    svg.appendChild(glowOuter);
    svg.appendChild(glowInner);

    // draw-in on scroll
    var drawn = false;
    function drawIn() {
      if (drawn) return; drawn = true;
      arcs.forEach(function (p, i) {
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.getBoundingClientRect(); // flush
        p.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.22,.61,.36,1) ' + (i * 70) + 'ms, opacity .7s, stroke-width .7s';
        p.style.strokeDashoffset = '0';
      });
      if (!reduced) setTimeout(startCycle, arcs.length * 70 + 1500);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { drawIn(); io.disconnect(); } });
      }, { threshold: 0.3 });
      io.observe(svg);
    } else { drawIn(); }

    // ambient route cycle
    var idx = -1, raf = null;
    function flyRoute(i) {
      var path = arcs[i], dot = dots[i];
      var len = path.getTotalLength();
      var t0 = null, DUR = 2000;
      path.classList.add('hot'); dot.classList.add('hot');
      glowOuter.setAttribute('opacity', 0.28);
      glowInner.setAttribute('opacity', 0.95);
      function step(ts) {
        if (!t0) t0 = ts;
        var t = Math.min((ts - t0) / DUR, 1);
        var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
        var pos = path.getPointAtLength(len * e);
        glowOuter.setAttribute('cx', pos.x); glowOuter.setAttribute('cy', pos.y);
        glowInner.setAttribute('cx', pos.x); glowInner.setAttribute('cy', pos.y);
        if (t < 1) { raf = requestAnimationFrame(step); }
        else {
          glowOuter.setAttribute('opacity', 0);
          glowInner.setAttribute('opacity', 0);
          setTimeout(function () { path.classList.remove('hot'); dot.classList.remove('hot'); }, 500);
        }
      }
      raf = requestAnimationFrame(step);
    }
    function startCycle() {
      setInterval(function () {
        if (document.hidden) return;
        idx = (idx + 1) % arcs.length;
        flyRoute(idx);
      }, 3200);
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    initLang();
    initWhatsApp();
    initPriceReveal();
    initReveals();
    initTopbar();
    initScrollFX();
    initEmbers();
    initEuroMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
