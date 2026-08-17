export interface GlossaryEntry {
  slug: string;
  termEn: string;
  termUr: string;
  /** Aliases used for Irshadat auto-match (English word-boundary / Urdu phrase). Skip very short ones. */
  aliasesEn: string[];
  aliasesUr: string[];
  bodyEn: string;
  bodyUr: string;
  relatedIrshadIds?: string[];
  relatedFaqIds?: string[];
}

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    slug: 'bayat',
    termEn: 'Bayat',
    termUr: 'بیعت',
    aliasesEn: ['Bayat', 'bayah'],
    aliasesUr: ['بیعت'],
    bodyEn:
      'The spiritual pledge of allegiance to Murshid Pak on the path of Tareeqat. It is a sacred bond of the heart connecting the seeker to the Prophetic chain through the living guide.',
    bodyUr:
      'طریقت کے راستے پر مرشدِ پاک سے روحانی عہد و پیمان۔ یہ دل کا مقدس رشتہ ہے جو سالک کو زندہ مرشد کے ذریعے حضور ﷺ کی سلسلہ سے جوڑتا ہے۔',
    relatedFaqIds: ['why-bayat', 'meaning-bayat', 'murid-murshid-bond'],
  },
  {
    slug: 'murshid',
    termEn: 'Murshid',
    termUr: 'مرشد',
    aliasesEn: ['Murshid', 'Murshid Pak', 'Sheikh'],
    aliasesUr: ['مرشد', 'مرشدِ پاک', 'شیخ'],
    bodyEn:
      'The spiritual guide who leads the seeker in purification of the self, remembrance of Allah, and love of the Prophet ﷺ. In this silsila we honour the living Murshid as Murshid Pak.',
    bodyUr:
      'وہ روحانی رہنما جو سالک کو تزکیۂ نفس، ذکرِ الٰہی اور محبتِ رسول ﷺ کی راہ دکھاتا ہے۔ اس سلسلے میں زندہ مرشد کو مرشدِ پاک کہا جاتا ہے۔',
    relatedFaqIds: ['meaning-bayat', 'guide-reforms-hereafter', 'fana-in-sheikh'],
  },
  {
    slug: 'murid',
    termEn: 'Murid',
    termUr: 'مرید',
    aliasesEn: ['Murid'],
    aliasesUr: ['مرید', 'سالک'],
    bodyEn:
      'The seeker who has pledged Bayat and walks under the guidance of Murshid Pak with humility, patience, and sincerity.',
    bodyUr:
      'وہ طالب جو بیعت کر کے مرشدِ پاک کی رہنمائی میں تواضع، صبر اور سچائی کے ساتھ راہِ سلوک چلتا ہے۔',
    relatedFaqIds: ['murid-murshid-bond', 'ego-at-threshold'],
  },
  {
    slug: 'tareeqat',
    termEn: 'Tareeqat',
    termUr: 'طریقت',
    aliasesEn: ['Tareeqat', 'Tariqat', 'Tariqa'],
    aliasesUr: ['طریقت'],
    bodyEn:
      'The spiritual path of discipline, dhikr, and companionship that perfects Shariah from the inside — the way of the heart walking beside the law.',
    bodyUr:
      'ذکر، صحبت اور تربیت کا روحانی راستہ جو شریعت کو باطن سے کامل کرتا ہے — دل کی راہ جو ظاہری حکم کے ساتھ چلتی ہے۔',
    relatedFaqIds: ['what-is-tareeqat', 'shariah-tareeqat'],
  },
  {
    slug: 'tasawwuf',
    termEn: 'Tasawwuf',
    termUr: 'تصوف',
    aliasesEn: ['Tasawwuf', 'Sufism'],
    aliasesUr: ['تصوف'],
    bodyEn:
      'The science and practice of purifying the heart, knowing Allah, and living Prophetic character — often called Sufism in English.',
    bodyUr:
      'قلب کی صفائی، معرفتِ الٰہی اور اخلاقِ نبوی ﷺ پر عمل کی علم و راہ — انگریزی میں اکثر صوفی ازم کہا جاتا ہے۔',
    relatedFaqIds: ['way-of-tasawwuf', 'true-sufi'],
  },
  {
    slug: 'nafs',
    termEn: 'Nafs',
    termUr: 'نفس',
    aliasesEn: ['Nafs'],
    aliasesUr: ['نفس'],
    bodyEn:
      'The lower self or ego that must be disciplined and purified (Tazkiya) so the heart can turn fully to Allah.',
    bodyUr:
      'وہ نفس یا انا جسے راہِ سلوک میں تربیت اور تزکیہ درکار ہے تاکہ دل پوری طرح اللہ کی طرف مڑ سکے۔',
    relatedFaqIds: ['nafs-and-gnosis', 'tazkiya-nafs', 'kill-ego'],
  },
  {
    slug: 'fana',
    termEn: 'Fana',
    termUr: 'فنا',
    aliasesEn: ['Fana'],
    aliasesUr: ['فنا', 'فنا فی الشیخ'],
    bodyEn:
      'Annihilation of the ego — often spoken of in stages: fana in the Sheikh, then in the Prophet ﷺ, then in Allah. It is the dissolving of self-will before Divine will.',
    bodyUr:
      'نفس کی فنا — اکثر مراحل میں بیان ہوتی ہے: فنا فی الشیخ، پھر فنا فی الرسول ﷺ، پھر فنا فی اللہ۔ یہ خودی کے ارادے کا ارادۂ الٰہی کے سامنے گھلنا ہے۔',
    relatedFaqIds: ['stages-after-bayat', 'fana-in-sheikh', 'baqaa-after-fana'],
  },
  {
    slug: 'baqa',
    termEn: 'Baqa',
    termUr: 'بقا',
    aliasesEn: ['Baqa', 'Baqaa'],
    aliasesUr: ['بقا', 'بقا بعد الفنا'],
    bodyEn:
      'Subsistence after annihilation — living again in Allah after the ego has been extinguished, with a heart at peace in Divine presence.',
    bodyUr:
      'فنا کے بعد بقا — جب نفس فنا ہو جائے تو بندہ اللہ میں زندہ رہتا ہے، دل سکونِ الٰہی میں۔',
    relatedFaqIds: ['baqaa-after-fana'],
  },
  {
    slug: 'tazkiya',
    termEn: 'Tazkiya',
    termUr: 'تزکیہ',
    aliasesEn: ['Tazkiya', 'Tazkiya-e-Nafs', 'purification'],
    aliasesUr: ['تزکیہ', 'تزکیۂ نفس'],
    bodyEn:
      'Purification of the self through worship, dhikr, good character, and the company of Murshid Pak.',
    bodyUr:
      'عبادت، ذکر، حسنِ اخلاق اور مرشدِ پاک کی صحبت سے نفس کی صفائی۔',
    relatedFaqIds: ['tazkiya-nafs'],
  },
  {
    slug: 'marifat',
    termEn: 'Marifat',
    termUr: 'معرفت',
    aliasesEn: ['Marifat', 'Gnosis', 'Divine Gnosis'],
    aliasesUr: ['معرفت', 'معرفتِ الٰہی'],
    bodyEn:
      'Divine gnosis — intimate knowing of Allah that comes through purified worship, love, and the guidance of the path — not through intellect alone.',
    bodyUr:
      'معرفتِ الٰہی — پاک عبادت، محبت اور راہِ سلوک کی رہنمائی سے حاصل ہونے والی پہچان، صرف عقل سے نہیں۔',
    relatedFaqIds: ['path-to-marifat', 'worship-without-gnosis'],
  },
  {
    slug: 'suhbah',
    termEn: 'Suhbah',
    termUr: 'صحبت',
    aliasesEn: ['Suhbah'],
    aliasesUr: ['صحبت'],
    bodyEn:
      'Sacred companionship with the purified — especially Murshid Pak — through which hearts are reformed and faizan is received.',
    bodyUr:
      'صاحبِ نفس پاک کی مقدس صحبت — خاص طور پر مرشدِ پاک — جس سے دل سنورتے اور فیضان ملتا ہے۔',
    relatedFaqIds: ['purified-company', 'company-of-gnostic'],
  },
  {
    slug: 'adab',
    termEn: 'Adab',
    termUr: 'ادب',
    aliasesEn: ['Adab'],
    aliasesUr: ['ادب', 'آداب'],
    bodyEn:
      'Spiritual courtesy — how one sits, speaks, dresses, and approaches Murshid Pak and the gathering. Without adab, knowledge does not settle in the heart.',
    bodyUr:
      'روحانی آداب — بیٹھنا، بولنا، لباس اور مرشدِ پاک و محفل سے رجوع کا انداز۔ ادب کے بغیر علم دل میں نہیں اترتا۔',
    relatedFaqIds: ['prophet-etiquette'],
  },
  {
    slug: 'faizan',
    termEn: 'Faizan',
    termUr: 'فیضان',
    aliasesEn: ['Faizan'],
    aliasesUr: ['فیضان'],
    bodyEn:
      'Spiritual grace flowing from Allah through the Prophet ﷺ and the living chain of guides into the heart of the seeker.',
    bodyUr:
      'روحانی فیضان جو اللہ کی طرف سے حضور ﷺ اور زندہ سلسلۂ مشائخ کے ذریعے سالک کے دل میں آتا ہے۔',
    relatedFaqIds: ['grace-from-prophet'],
  },
  {
    slug: 'silsila',
    termEn: 'Silsila',
    termUr: 'سلسلہ',
    aliasesEn: ['Silsila'],
    aliasesUr: ['سلسلہ', 'سلسلہ پاک'],
    bodyEn:
      'The living spiritual chain linking Murshid to Murshid back to the Prophet ﷺ. The Shajra Pak records this lineage.',
    bodyUr:
      'زندہ روحانی کڑی جو مرشد سے مرشد تک حضور ﷺ تک پہنچتی ہے۔ شجرہ پاک اسی سلسلے کا بیان ہے۔',
  },
  {
    slug: 'shajra',
    termEn: 'Shajra',
    termUr: 'شجرہ',
    aliasesEn: ['Shajra', 'Shajra Pak', 'lineage'],
    aliasesUr: ['شجرہ', 'شجرہ پاک'],
    bodyEn:
      'The recorded tree of spiritual ancestors (mashaykh) in the silsila — a map of blessing and belonging for the seeker.',
    bodyUr:
      'سلسلے کے روحانی بزرگان (مشائخ) کا درج شدہ شجرہ — سالک کے لیے برکت اور تعلق کا نقشہ۔',
  },
  {
    slug: 'wird',
    termEn: 'Wird',
    termUr: 'ورد',
    aliasesEn: ['Wird', 'litany', 'daily litany'],
    aliasesUr: ['ورد', 'وظیفہ'],
    bodyEn:
      'A set daily litany of remembrance given or practised on the path — morning and evening wirds keep the heart awake.',
    bodyUr:
      'راہِ سلوک کا مقررہ ذکر و وظائف — صبح و شام کا ورد دل کو بیدار رکھتا ہے۔',
  },
  {
    slug: 'dhikr',
    termEn: 'Dhikr',
    termUr: 'ذکر',
    aliasesEn: ['Dhikr', 'Zikr', 'remembrance'],
    aliasesUr: ['ذکر'],
    bodyEn:
      'Remembrance of Allah with the tongue and the heart — the core practice that polishes the mirror of the soul.',
    bodyUr:
      'اللہ کا ذکر زبان اور دل سے — وہ بنیادی عمل جو روح کے آئینے کو صاف کرتا ہے۔',
  },
  {
    slug: 'mahfil',
    termEn: 'Mahfil',
    termUr: 'محفل',
    aliasesEn: ['Mahfil'],
    aliasesUr: ['محفل'],
    bodyEn:
      'A spiritual gathering for dhikr, bayan, or naat — held with adab at the khanqah or online when announced.',
    bodyUr:
      'ذکر، بیان یا نعت کی روحانی نشست — خانقاہ میں یا اعلان کے مطابق آن لائن، ادب کے ساتھ۔',
  },
  {
    slug: 'urs',
    termEn: 'Urs',
    termUr: 'عرس',
    aliasesEn: ['Urs'],
    aliasesUr: ['عرس'],
    bodyEn:
      'The anniversary of a saint’s passing — remembered with Quran, dhikr, and gathering, celebrating their union with the Beloved.',
    bodyUr:
      'ولی اللہ کی وفات کی برسی — قرآن، ذکر اور محفل سے یاد کی جاتی ہے، محبوب سے وصال کی خوشی میں۔',
  },
  {
    slug: 'khanqah',
    termEn: 'Khanqah',
    termUr: 'خانقاہ',
    aliasesEn: ['Khanqah', 'tekke', 'spiritual centre'],
    aliasesUr: ['خانقاہ', 'دربار'],
    bodyEn:
      'The spiritual centre where seekers gather for suhbah, dhikr, and guidance — here, Burewala Sharif.',
    bodyUr:
      'وہ روحانی مرکز جہاں طالبان صحبت، ذکر اور ہدایت کے لیے جمع ہوتے ہیں — یہاں بورے والہ شریف۔',
  },
  {
    slug: 'latifa',
    termEn: 'Latifa',
    termUr: 'لطیفہ',
    aliasesEn: ['Latifa', 'Lataif'],
    aliasesUr: ['لطیفہ', 'لطائف'],
    bodyEn:
      'Subtle centres of awareness in the spiritual body that are awakened through authorised practices on the path.',
    bodyUr:
      'روحانی وجود کے لطیف مراکز جو راہِ سلوک کے مجاز اعمال سے بیدار کیے جاتے ہیں۔',
  },
  {
    slug: 'faqr',
    termEn: 'Faqr',
    termUr: 'فقر',
    aliasesEn: ['Faqr', 'spiritual poverty'],
    aliasesUr: ['فقر'],
    bodyEn:
      'Spiritual poverty before Allah — emptying the heart of self-reliance so it can be filled with Divine richness.',
    bodyUr:
      'اللہ کے سامنے روحانی فقر — دل کو خود داری سے خالی کرنا تاکہ غنائے الٰہی سے بھرے۔',
    relatedFaqIds: ['path-of-faqr'],
  },
  {
    slug: 'muraqaba',
    termEn: 'Muraqaba',
    termUr: 'مراقبہ',
    aliasesEn: ['Muraqaba'],
    aliasesUr: ['مراقبہ'],
    bodyEn:
      'Watchful contemplation — sitting with the heart turned toward Allah under the guidance of the path.',
    bodyUr:
      'مراقبہ — دل کو اللہ کی طرف متوجہ کر کے بیٹھنا، راہِ سلوک کی رہنمائی میں۔',
  },
];

const bySlug = new Map(GLOSSARY_ENTRIES.map((e) => [e.slug, e]));

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return bySlug.get(slug);
}

export function glossaryByIds(ids: string[] | undefined): GlossaryEntry[] {
  if (!ids?.length) return [];
  return ids.map((id) => bySlug.get(id)).filter((e): e is GlossaryEntry => !!e);
}

/** Match glossary terms against Irshad text without mutating the body. */
export function matchGlossaryTerms(en: string, ur: string): GlossaryEntry[] {
  const found: GlossaryEntry[] = [];
  const seen = new Set<string>();

  for (const entry of GLOSSARY_ENTRIES) {
    let hit = false;
    for (const alias of entry.aliasesEn) {
      if (alias.length < 4) continue;
      const re = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i');
      if (re.test(en)) {
        hit = true;
        break;
      }
    }
    if (!hit) {
      for (const alias of entry.aliasesUr) {
        if (alias.length < 2) continue;
        if (ur.includes(alias)) {
          hit = true;
          break;
        }
      }
    }
    if (hit && !seen.has(entry.slug)) {
      seen.add(entry.slug);
      found.push(entry);
    }
  }
  return found.slice(0, 6);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
