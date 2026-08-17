import { FaqItem } from './faq.data';

export interface BayatSection {
  id: string;
  titleEn: string;
  titleUr: string;
  bodyEn: string;
  bodyUr: string;
}

export interface VisitGuideStep {
  id: string;
  titleEn: string;
  titleUr: string;
  bodyEn: string;
  bodyUr: string;
}

export const BAYAT_INTRO: BayatSection[] = [
  {
    id: 'what',
    titleEn: 'What is Bayat?',
    titleUr: 'بیعت کیا ہے؟',
    bodyEn:
      'Bayat is the spiritual pledge of allegiance to Murshid Pak on the path of Tareeqat. It is not a worldly contract — it is a sacred bond of the heart, connecting the seeker to the chain of the Prophet ﷺ through the living Murshid Pak.',
    bodyUr:
      'بیعت طریقت کے راستے پر مرشدِ پاک سے روحانی عہد و پیمان ہے۔ یہ دنیاوی معاہدہ نہیں — یہ دل کا مقدس رشتہ ہے جو سالک کو زندہ مرشدِ پاک کے ذریعے حضور ﷺ کے سلسلے سے جوڑتا ہے۔',
  },
  {
    id: 'who',
    titleEn: 'Who is it for?',
    titleUr: 'یہ کس کے لیے ہے؟',
    bodyEn:
      'Bayat is for sincere seekers who wish to walk the path of self-purification (Tazkiya-e-Nafs), love of Allah and His Messenger ﷺ, and spiritual discipline under the guidance of Murshid Pak. It requires humility, patience, and a genuine intention — not curiosity alone.',
    bodyUr:
      'بیعت ان خالص سالکین کے لیے ہے جو تزکیۂ نفس، اللہ و رسول ﷺ کی محبت اور مرشدِ پاک کی رہنمائی میں روحانی تربیت چاہتے ہیں۔ اس کے لیے تواضع، صبر اور سچی نیت ضروری ہے — صرف تجسس کافی نہیں۔',
  },
  {
    id: 'prepare',
    titleEn: 'How to prepare',
    titleUr: 'تیاری کیسے کریں',
    bodyEn:
      'Purify your intention. Strengthen daily worship — Salah, Dhikr, and good character. Visit or contact with adab. Come with an open heart ready to surrender the ego at the threshold of Murshid Pak.',
    bodyUr:
      'نیت پاک کریں۔ روزانہ عبادت — نماز، ذکر اور حسنِ اخلاق — مضبوط کریں۔ ادب کے ساتھ رابطہ کریں یا تشریف لائیں۔ دل کھول کر آئیں، مرشدِ پاک کے در پر نفس قربان کرنے کے لیے تیار ہوں۔',
  },
];

/** Ziyarat guidance — reaching and visiting Burewala Sharif. */
export const ZIYARAT_GUIDE: VisitGuideStep[] = [
  {
    id: 'reach',
    titleEn: 'How to reach',
    titleUr: 'کیسے پہنچیں',
    bodyEn:
      'Address: 159 M Block, Burewala Sharif, District Vehari, Punjab, Pakistan. From Multan or Lahore, travel toward Burewala (Vehari district). Use Google Maps with the directions button below. If you are unsure of the last turn, call or WhatsApp before you arrive.',
    bodyUr:
      'پتہ: ۱۵۹ ایم بلاک، بورے والہ شریف، ضلع وہاڑی، پنجاب، پاکستان۔ ملتان یا لاہور سے بورے والہ (ضلع وہاڑی) کی طرف آئیں۔ نیچے «راستہ دیکھیں» کے بٹن سے گوگل میپس استعمال کریں۔ آخری موڑ پر شک ہو تو پہنچنے سے پہلے فون یا واٹس ایپ کریں۔',
  },
  {
    id: 'when',
    titleEn: 'When to come',
    titleUr: 'کب آئیں',
    bodyEn:
      'Always contact by phone or WhatsApp before travelling. Weekly mahafil are usually held in the evening. Avoid arriving unannounced during private or family hours. Bayat is arranged after sincere preparation — never rushed.',
    bodyUr:
      'سفر سے پہلے ہمیشہ فون یا واٹس ایپ پر رابطہ کریں۔ ہفتہ وار محافل عموماً شام کو ہوتی ہیں۔ ذاتی یا گھریلو اوقات میں بغیر اطلاع تشریف نہ لائیں۔ بیعت تیاری کے بعد ہوتی ہے — جلدی سے نہیں۔',
  },
  {
    id: 'bring',
    titleEn: 'What to bring',
    titleUr: 'کیا ساتھ لائیں',
    bodyEn:
      'Modest clothing, a quiet heart, and a simple intention. Optional: a small notebook for personal reminders. Do not bring gifts that create burden — sincerity is enough. Keep phones silent or off in the gathering.',
    bodyUr:
      'باادب لباس، پرسکون دل اور سادہ نیت۔ اختیاری: ذاتی یادداشت کے لیے چھوٹی کاپی۔ ایسا تحفہ نہ لائیں جو بوجھ بنے — خلوص کافی ہے۔ محفل میں موبائل سائلنٹ یا بند رکھیں۔',
  },
  {
    id: 'stay',
    titleEn: 'Stay & travel notes',
    titleUr: 'قیام و سفر',
    bodyEn:
      'Plan your return journey in advance. If you need overnight stay nearby, ask when you call — local arrangements vary. Women and men should travel and sit according to the customs of the centre. Come rested if you can; the visit is for presence, not haste.',
    bodyUr:
      'واپسی کا سفر پہلے سے سوچ لیں۔ قریب رات قیام درکار ہو تو کال پر پوچھ لیں — انتظامات بدل سکتے ہیں۔ خواتین و مرد حضرات مرکز کے آداب کے مطابق سفر اور نشست رکھیں۔ ممکن ہو تو تھکاوٹ سے بچ کر آئیں؛ یہ زیارت حاضری کے لیے ہے، جلدی کے لیے نہیں۔',
  },
  {
    id: 'expect',
    titleEn: 'What to expect',
    titleUr: 'کیا توقع رکھیں',
    bodyEn:
      'You may join dhikr, listen to bayan, and request spiritual guidance with adab. Photography is only with permission. Leave quietly and with gratitude. For live or special gatherings, check Events on this site.',
    bodyUr:
      'آپ ذکر میں شریک ہو سکتے ہیں، بیان سن سکتے ہیں اور ادب سے روحانی رہنمائی طلب کر سکتے ہیں۔ تصویر صرف اجازت سے۔ شکر کے ساتھ خاموشی سے واپس جائیں۔ لائیو یا خاص محافل کے لیے ویب سائٹ پر تقریبات دیکھیں۔',
  },
];

/** Adab guidance — manners at the khanqah and with Murshid Pak. */
export const ADAB_GUIDE: VisitGuideStep[] = [
  {
    id: 'mahfil',
    titleEn: 'In the mahfil',
    titleUr: 'محفل میں',
    bodyEn:
      'Sit calmly. Keep silence unless invited to speak. Turn phones off or silent — no scrolling during dhikr or bayan. Do not walk in front of those in prayer or remembrance without need.',
    bodyUr:
      'پرسکون بیٹھیں۔ جب تک بات کی اجازت نہ ہو خاموش رہیں۔ موبائل بند یا سائلنٹ — ذکر یا بیان کے دوران اسکرول نہ کریں۔ بلا ضرورت نمازیوں یا ذاکروں کے آگے سے نہ گزریں۔',
  },
  {
    id: 'dress',
    titleEn: 'Dress',
    titleUr: 'لباس',
    bodyEn:
      'Dress modestly and respectfully — clean, simple clothes that honour the gathering. Avoid loud colours or styles that distract. Women and men observe the covering customs of the spiritual centre.',
    bodyUr:
      'سادہ، صاف اور باادب لباس پہنیں جو محفل کے شایانِ شان ہو۔ ایسا رنگ یا انداز نہ ہو جو توجہ ہٹائے۔ خواتین و مرد حضرات مرکز کے پردہ و لباس کے آداب کا لحاظ کریں۔',
  },
  {
    id: 'murshid',
    titleEn: 'With Murshid Pak',
    titleUr: 'مرشدِ پاک کے حضور',
    bodyEn:
      'Address with reverence. Listen more than you speak. Do not argue or show off knowledge. If you have a personal question, ask privately with humility when invited — not in a way that embarrasses others.',
    bodyUr:
      'احترام سے مخاطب ہوں۔ بولنے سے زیادہ سنیں۔ بحث یا علم کی نمائش نہ کریں۔ ذاتی سوال ہو تو جب اجازت ہو، تواضع سے الگ پوچھیں — ایسا نہ کہ دوسروں کو شرمندگی ہو۔',
  },
  {
    id: 'not-ask',
    titleEn: 'What not to ask',
    titleUr: 'کیا نہ پوچھیں',
    bodyEn:
      'Avoid idle curiosity, worldly politics in the gathering, and questions meant to test or debate. Do not press for karamat (miracles) or private matters of others. Seek guidance for your own path and character.',
    bodyUr:
      'بے مقصد تجسس، محفل میں دنیاوی سیاست، اور آزمائش یا بحث والے سوالات سے پرہیز کریں۔ کرامات یا دوسروں کے ذاتی معاملات پر زور نہ دیں۔ اپنی راہ اور کردار کے لیے ہدایت طلب کریں۔',
  },
  {
    id: 'photo',
    titleEn: 'Photography',
    titleUr: 'تصویر کشی',
    bodyEn:
      'Do not photograph people, the gathering, or Murshid Pak without clear permission. Never post without consent. Presence is more precious than a picture.',
    bodyUr:
      'لوگوں، محفل یا مرشدِ پاک کی تصویر بغیر واضح اجازت کے نہ کھینچیں۔ رضامندی کے بغیر شیئر نہ کریں۔ موجودگی تصویر سے زیادہ قیمتی ہے۔',
  },
  {
    id: 'gender',
    titleEn: 'Men & women',
    titleUr: 'مرد و خواتین',
    bodyEn:
      'Follow the seating and visiting customs of the centre. Keep interactions modest. If unsure, ask a trusted attendant quietly rather than guessing.',
    bodyUr:
      'مرکز کے نشست اور ملاقات کے آداب پر عمل کریں۔ تعلقات باحیا رکھیں۔ شک ہو تو قیاس کی بجائے کسی معتبر خادم سے خاموشی سے پوچھ لیں۔',
  },
];

/** @deprecated Prefer ZIYARAT_GUIDE — kept for any external imports. */
export const VISIT_GUIDE: VisitGuideStep[] = ZIYARAT_GUIDE;

/** Bayat FAQ items — resolved against live Irshadat at runtime (same as FAQ page). */
export function bayatFaqItems(all: FaqItem[]): FaqItem[] {
  return all.filter((item) => item.category === 'bayat');
}
