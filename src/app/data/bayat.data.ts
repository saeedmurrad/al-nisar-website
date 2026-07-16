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
      'بیعت طریقت کے راستے پر مرشدِ کامل پاک سے روحانی عہد و پیمان ہے۔ یہ دنیاوی معاہدہ نہیں — یہ دل کا مقدس رشتہ ہے جو سالک کو زندہ مرشدِ پاک کے ذریعے حضور ﷺ کی سلسلہ سے جوڑتا ہے۔',
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

export const VISIT_GUIDE: VisitGuideStep[] = [
  {
    id: 'when',
    titleEn: 'Best times to visit',
    titleUr: 'بہترین اوقات',
    bodyEn:
      'Contact by phone or WhatsApp before travelling. Weekly mahafil are usually held in the evening. Avoid arriving unannounced during private hours.',
    bodyUr:
      'سفر سے پہلے فون یا واٹس ایپ پر رابطہ کریں۔ ہفتہ وار محافل عموماً شام کو ہوتی ہیں۔ ذاتی اوقات میں بغیر اطلاع تشریف نہ لائیں۔',
  },
  {
    id: 'etiquette',
    titleEn: 'Etiquette & adab',
    titleUr: 'آداب و ادب',
    bodyEn:
      'Dress modestly and respectfully. Maintain silence and adab in the gathering. Turn off mobile phones or keep them on silent. Women and men should observe the customs of the spiritual centre.',
    bodyUr:
      'سادہ اور باادب لباس پہنیں۔ محفل میں خاموشی اور ادب رکھیں۔ موبائل بند یا سائلنٹ رکھیں۔ خواتین و مرد حضرات مرکز کے آداب کا لحاظ کریں۔',
  },
  {
    id: 'expect',
    titleEn: 'What to expect',
    titleUr: 'کیا توقع رکھیں',
    bodyEn:
      'You may join dhikr, listen to bayan, and request spiritual guidance. Bayat is offered to sincere seekers after preparation — it is never rushed or taken lightly.',
    bodyUr:
      'آپ ذکر میں شریک ہو سکتے ہیں، بیان سن سکتے ہیں اور روحانی رہنمائی طلب کر سکتے ہیں۔ بیعت تیاری کے بعد خالص سالکین کو دی جاتی ہے — جلدی یا غیر سنجیدگی سے نہیں۔',
  },
  {
    id: 'directions',
    titleEn: 'Directions',
    titleUr: 'راستہ',
    bodyEn:
      '159 M Block, Burewala Sharif, District Vehari, Punjab, Pakistan. Use the directions button on the contact section for Google Maps.',
    bodyUr:
      '۱۵۹ ایم بلاک، بورے والہ شریف، ضلع وہاڑی، پنجاب، پاکستان۔ گوگل میپس کے لیے رابطہ سیکشن میں راستہ دیکھیں کا بٹن استعمال کریں۔',
  },
];

/** Bayat FAQ items — resolved against live Irshadat at runtime (same as FAQ page). */
export function bayatFaqItems(all: FaqItem[]): FaqItem[] {
  return all.filter((item) => item.category === 'bayat');
}
