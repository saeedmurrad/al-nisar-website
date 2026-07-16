export type FaqCategory = 'bayat' | 'tareeqat' | 'worship' | 'love' | 'path' | 'character';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  questionEn: string;
  questionUr: string;
  /** Firestore document ID shared by `irshadat_ur` / `irshadat_en`. */
  irshadId: string;
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  'bayat',
  'tareeqat',
  'worship',
  'love',
  'path',
  'character',
] as const;

/**
 * Curated FAQ questions mapped to Irshadat. Answers are loaded live from
 * DataService.getIrshadat() by `irshadId` so they stay aligned with /irshadat.
 */
export const FAQ_ITEMS: FaqItem[] = [
  // —— Bayat & Spiritual Allegiance ——
  {
    id: 'why-bayat',
    category: 'bayat',
    questionEn: 'Why is Bayat (spiritual pledge) necessary on the path?',
    questionUr: 'بیعت رواہِ سلوک میں کیوں ضروری ہے؟',
    irshadId: '559591a9062521bc60a6',
  },
  {
    id: 'meaning-bayat',
    category: 'bayat',
    questionEn: 'What does pledging oneself to a Murshid Pak mean?',
    questionUr: 'مرشدِ پاک سے بیعت کا کیا مطلب ہے؟',
    irshadId: '4a1e649bbda8a9232795',
  },
  {
    id: 'ego-at-threshold',
    category: 'bayat',
    questionEn: 'Why must the seeker surrender the ego at Murshid Pak\'s threshold?',
    questionUr: 'سالک کو مرشدِ پاک کے در پر نفس کیوں قربان کرنا ہوتا ہے؟',
    irshadId: '557d8a48a3689aca784d',
  },
  {
    id: 'murid-murshid-bond',
    category: 'bayat',
    questionEn: 'What is the spiritual bond between Murid and Murshid Pak?',
    questionUr: 'مرید اور مرشدِ پاک کا روحانی رشتہ کیا ہے؟',
    irshadId: 'c16b81ae112cc815c2af',
  },
  {
    id: 'bayat-to-prophet',
    category: 'bayat',
    questionEn: 'How does Bayat connect one to the court of the Prophet ﷺ?',
    questionUr: 'بیعت انسان کو حضور ﷺ کی بارگاہ سے کیسے جوڑتی ہے؟',
    irshadId: '796d693c47fdbb19d764',
  },
  {
    id: 'stages-after-bayat',
    category: 'bayat',
    questionEn: 'What are the stages after Bayat — Fana in Murshid Pak (Sheikh), then Prophet, then Allah?',
    questionUr: 'بیعت کے بعد فنا فی الشیخ (مرشدِ پاک)، فنا فی الرسول اور فنا فی اللہ کے مراحل کیا ہیں؟',
    irshadId: 'c5bedc1d8a938b39cc9c',
  },
  {
    id: 'purified-company',
    category: 'bayat',
    questionEn: 'Why is the company of a purified soul essential after Bayat?',
    questionUr: 'بیعت کے بعد صاحبِ نفس پاک کی صحبت کیوں ضروری ہے؟',
    irshadId: '94adbf344a85326a4c54',
  },
  {
    id: 'guide-reforms-hereafter',
    category: 'bayat',
    questionEn: 'How does Murshid Pak help reform one\'s hereafter?',
    questionUr: 'مرشدِ پاک آخرت کی اصلاح میں کیسے مدد کرتے ہیں؟',
    irshadId: '495683b826d501a3d019',
  },
  {
    id: 'fana-in-sheikh',
    category: 'bayat',
    questionEn: 'What is Fana fil Sheikh (annihilation in Murshid Pak)?',
    questionUr: 'فنا فی الشیخ (مرشدِ پاک میں فنا) کیا ہے؟',
    irshadId: 'b3210716ca92fe423a51',
  },
  {
    id: 'guide-lessons',
    category: 'bayat',
    questionEn: 'How does following Murshid Pak\'s teachings remove inner flaws?',
    questionUr: 'مرشدِ پاک کے فرمان پر عمل سے اندرونی عیب کیسے دور ہوتے ہیں؟',
    irshadId: '832b8e118e41d46d627d',
  },

  // —— Tareeqat & the Spiritual Path ——
  {
    id: 'what-is-tareeqat',
    category: 'tareeqat',
    questionEn: 'What is Tareeqat (Tariqat)?',
    questionUr: 'طریقت کیا ہے؟',
    irshadId: 'bb19ff5f68f74ae687f3',
  },
  {
    id: 'shariah-tareeqat',
    category: 'tareeqat',
    questionEn: 'What is the relationship between Shariah and Tareeqat?',
    questionUr: 'شریعت اور طریقت کا کیا تعلق ہے؟',
    irshadId: 'bf64bff0c95c0d2dd8c9',
  },
  {
    id: 'path-of-faqr',
    category: 'tareeqat',
    questionEn: 'What is the path of Faqr (spiritual poverty)?',
    questionUr: 'فقر کی راہ کیا ہے؟',
    irshadId: '354d5fbea581e85b03f8',
  },
  {
    id: 'way-of-tasawwuf',
    category: 'tareeqat',
    questionEn: 'What is the way of Tasawwuf (Sufism)?',
    questionUr: 'تصوف کا طریقہ کیا ہے؟',
    irshadId: 'f5bfb2249c76a94c30b8',
  },
  {
    id: 'true-sufi',
    category: 'tareeqat',
    questionEn: 'Who is a true Sufi?',
    questionUr: 'سچا صوفی کون ہے؟',
    irshadId: 'd95dc76b66b7603f3c07',
  },
  {
    id: 'nafs-and-gnosis',
    category: 'tareeqat',
    questionEn: 'Can one attain Gnosis without sacrificing the lower self (Nafs)?',
    questionUr: 'کیا نفس کی قربانی کے بغیر معرفت حاصل ہو سکتی ہے؟',
    irshadId: '50468d9c96bbd7b16f01',
  },
  {
    id: 'path-to-marifat',
    category: 'tareeqat',
    questionEn: 'What is the path to Divine Gnosis (Marifat)?',
    questionUr: 'معرفتِ الٰہی کا راستہ کیا ہے؟',
    irshadId: '96d88cddbf28774d87fd',
  },
  {
    id: 'path-and-world',
    category: 'tareeqat',
    questionEn: 'Is the spiritual path separate from worldly life?',
    questionUr: 'کیا روحانی راستہ دنیاوی زندگی سے الگ ہے؟',
    irshadId: '5285bc4ada64a2a5942b',
  },
  {
    id: 'knowledge-at-feet',
    category: 'tareeqat',
    questionEn: 'Why must knowledge be laid at the feet of a Wali (saint)?',
    questionUr: 'علم کو ولی اللہ کے قدموں پر کیوں رکھنا چاہیے؟',
    irshadId: '5cd083824f338ce6609b',
  },
  {
    id: 'company-of-gnostic',
    category: 'tareeqat',
    questionEn: 'What happens in the company of a Gnostic (Sahib-e-Haal)?',
    questionUr: 'صاحبِ حال کی صحبت میں کیا ہوتا ہے؟',
    irshadId: '8f88f7ddf03996a69162',
  },
  {
    id: 'tazkiya-nafs',
    category: 'tareeqat',
    questionEn: 'What is Tazkiya-e-Nafs and how is it attained?',
    questionUr: 'تزکیۂ نفس کیا ہے اور کیسے حاصل ہوتا ہے؟',
    irshadId: 'c340ac8d8f9f82625181',
  },
  {
    id: 'grace-from-prophet',
    category: 'tareeqat',
    questionEn: 'Where should we seek spiritual grace (Faizan)?',
    questionUr: 'روحانی فیضان کہاں سے طلب کریں؟',
    irshadId: '6df6621218da6c2ff3af',
  },

  // —— Worship ——
  {
    id: 'true-worship',
    category: 'worship',
    questionEn: 'What is true worship?',
    questionUr: 'اصل عبادت کیا ہے؟',
    irshadId: '17d505508d6991b5ffc6',
  },
  {
    id: 'prophet-etiquette',
    category: 'worship',
    questionEn: 'How should we follow the Prophet\'s ﷺ etiquette in worship?',
    questionUr: 'عبادت میں آقا ﷺ کے آداب پر کیسے عمل کریں؟',
    irshadId: '01e5a5fddb71ec381eac',
  },
  {
    id: 'righteous-prostration',
    category: 'worship',
    questionEn: 'How should a righteous servant view their prostration?',
    questionUr: 'اللہ کا نیک بندہ اپنے سجدے کو کیسے دیکھے؟',
    irshadId: '0914e89595770d3f6055',
  },
  {
    id: 'true-gratitude',
    category: 'worship',
    questionEn: 'What is the true way of gratitude?',
    questionUr: 'شکر ادا کرنے کا اصل طریقہ کیا ہے؟',
    irshadId: '326145fca5929903b025',
  },
  {
    id: 'station-of-worship',
    category: 'worship',
    questionEn: 'What is a station of worship where only the Lord remains?',
    questionUr: 'وہ کون سی منزلِ عبادت ہے جہاں صرف رب باقی رہتا ہے؟',
    irshadId: '37189fbb0ad44978ce18',
  },
  {
    id: 'true-virtue',
    category: 'worship',
    questionEn: 'What is true virtue?',
    questionUr: 'فضیلت کیا ہے؟',
    irshadId: '0448977279d477f1f98d',
  },
  {
    id: 'worship-of-heart',
    category: 'worship',
    questionEn: 'Is worship only the movement of limbs?',
    questionUr: 'کیا عبادت صرف اعضاء کی حرکت ہے؟',
    irshadId: 'a16fd7ee6c5540bcd363',
  },
  {
    id: 'worship-without-gnosis',
    category: 'worship',
    questionEn: 'Can worship without Gnosis be true worship?',
    questionUr: 'کیا معرفت کے بغیر عبادت اصل عبادت ہے؟',
    irshadId: '9873736fcec29531bd68',
  },

  // —— Love ——
  {
    id: 'true-inheritance',
    category: 'love',
    questionEn: 'What is the true inheritance of a servant?',
    questionUr: 'بندے کا اصل اثاثہ کیا ہے؟',
    irshadId: '18483f66fd7b4b16b21c',
  },
  {
    id: 'meaning-of-mabud',
    category: 'love',
    questionEn: 'What is the meaning of Ma\'bud and liberation from hidden duality?',
    questionUr: 'معبود کا کیا معنی ہے اور شرکِ خفی سے نجات کیسے ملتی ہے؟',
    irshadId: '18f012c9970dfc3d6464',
  },
  {
    id: 'true-success',
    category: 'love',
    questionEn: 'What is true success through the Prophet\'s ﷺ gracious gaze?',
    questionUr: 'آقا ﷺ کی نظرِ کرم سے کامیابی کیا ہے؟',
    irshadId: '01876a0281052be546d4',
  },
  {
    id: 'beloved-peace',
    category: 'love',
    questionEn: 'Where does a beloved of Allah find peace?',
    questionUr: 'اللہ کے بندے کو سکون کہاں ملتا ہے؟',
    irshadId: '3d24fb96675af6b41818',
  },
  {
    id: 'enter-islam-completely',
    category: 'love',
    questionEn: 'What is the lesson of entering Islam completely?',
    questionUr: 'پورے کے پورے اسلام میں داخل ہونے کا کیا سبق ہے؟',
    irshadId: '1b95f6367d647ab2e980',
  },
  {
    id: 'illness-and-hardship',
    category: 'love',
    questionEn: 'Why does Allah send illness and hardship?',
    questionUr: 'اللہ بیماری اور تکلیف کیوں بھیجتا ہے؟',
    irshadId: '091d3b3329a3e68cb41f',
  },
  {
    id: 'love-makes-believer',
    category: 'love',
    questionEn: 'What makes a believer a true believer?',
    questionUr: 'مومن کو سچا مومن کیا بناتا ہے؟',
    irshadId: '53fd1a64b00afef27802',
  },
  {
    id: 'wealth-of-love',
    category: 'love',
    questionEn: 'What is the true wealth of this world?',
    questionUr: 'اس دنیا کا اصل خزانہ کیا ہے؟',
    irshadId: 'f998c15c0c350e9d447b',
  },

  // —— Path ——
  {
    id: 'human-perfection',
    category: 'path',
    questionEn: 'What is the perfection of a human being?',
    questionUr: 'بندے کی تکمیل کس میں ہے؟',
    irshadId: '06ca3fd49d83655a6846',
  },
  {
    id: 'baqaa-after-fana',
    category: 'path',
    questionEn: 'What is Baqaa after Fana (Subsistence after Annihilation)?',
    questionUr: 'بقا بعد الفنا کیا ہے؟',
    irshadId: '08608478661b3938a927',
  },
  {
    id: 'true-knowledge',
    category: 'path',
    questionEn: 'What is true knowledge?',
    questionUr: 'اصل علم کیا ہے؟',
    irshadId: '1fc9d8977c79040cea0d',
  },
  {
    id: 'ultimate-quest',
    category: 'path',
    questionEn: 'What is the ultimate quest of life?',
    questionUr: 'زندگی کا اصل مقصد کیا ہے؟',
    irshadId: '215af440de3114c20f2f',
  },
  {
    id: 'meraj-reality',
    category: 'path',
    questionEn: 'What is Me\'raj in reality?',
    questionUr: 'معراج درحقیقت کیا ہے؟',
    irshadId: '1da5baea477bba166f12',
  },
  {
    id: 'submission-vs-denial',
    category: 'path',
    questionEn: 'What is the difference between submission and denial?',
    questionUr: 'تسلیم اور انکار میں کیا فرق ہے؟',
    irshadId: '3c17ca5c3d36222e0f6c',
  },
  {
    id: 'kalima-and-ego',
    category: 'path',
    questionEn: 'What does the Kalima teach about negating the ego?',
    questionUr: 'کلمۂ طیبہ نفس کی نفی کا کیا سبق دیتا ہے؟',
    irshadId: '8246676ce235dfcce40f',
  },
  {
    id: 'kill-ego',
    category: 'path',
    questionEn: 'What is the true sacrifice of the self?',
    questionUr: 'نفس کی قربانی کا اصل مطلب کیا ہے؟',
    irshadId: 'c02563062b4d332c540a',
  },

  // —— Character ——
  {
    id: 'best-servant',
    category: 'character',
    questionEn: 'Who is the best servant of Allah?',
    questionUr: 'اللہ کا بہترین بندہ کون ہے؟',
    irshadId: '0c41c71bb918ee369bbe',
  },
  {
    id: 'accepted-servant',
    category: 'character',
    questionEn: 'Who is a truly accepted servant of Allah?',
    questionUr: 'اللہ کا مقبول بندہ کون ہے؟',
    irshadId: '0f167d80bc4db05e6371',
  },
  {
    id: 'fruit-of-construction',
    category: 'character',
    questionEn: 'What is the ultimate fruit of a servant\'s spiritual construction?',
    questionUr: 'بندے کی روحانی تعمیر کا کل ثمر کیا ہے؟',
    irshadId: '13cf30e3d20ed20ade82',
  },
  {
    id: 'strength-through-obedience',
    category: 'character',
    questionEn: 'What happens when strength is gained through obedience to Allah?',
    questionUr: 'جب اطاعتِ الٰہی میں طاقت آتی ہے تو کیا ہوتا ہے؟',
    irshadId: '1a969a9a09273f8c4ffa',
  },
  {
    id: 'where-guidance-resides',
    category: 'character',
    questionEn: 'Where do the pearls of true guidance reside?',
    questionUr: 'ہدایت کے موتی کہاں بستے ہیں؟',
    irshadId: '229a0c35f7fab041c6e2',
  },
  {
    id: 'vicegerent-role',
    category: 'character',
    questionEn: 'What is humanity\'s role as Allah\'s vicegerent?',
    questionUr: 'انسان کی حیثیت خلیفۂ الٰہی کے طور پر کیا ہے؟',
    irshadId: '26a1d0d8fb56e0e4d90e',
  },
  {
    id: 'kindness-to-creation',
    category: 'character',
    questionEn: 'How does Allah view kindness to His creation?',
    questionUr: 'اللہ اپنی مخلوق کے ساتھ احسان کو کیسے دیکھتا ہے؟',
    irshadId: '74f5c6b345a16d67e122',
  },
  {
    id: 'love-allah-prophet',
    category: 'character',
    questionEn: 'Who is the best servant in the sight of Allah?',
    questionUr: 'اللہ کی نظر میں بہترین بندہ کون ہے؟',
    irshadId: '933276e13245d2c4f731',
  },
];
