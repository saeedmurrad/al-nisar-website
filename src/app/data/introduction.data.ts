export interface IntroParagraph {
  en: string;
  ur: string;
}

export interface IntroQuote {
  en: string;
  ur: string;
  attributionEn?: string;
  attributionUr?: string;
}

export interface IntroSaying {
  id: string;
  titleEn: string;
  titleUr: string;
  bodyEn: string;
  bodyUr: string;
}

export interface IntroSection {
  id: string;
  titleEn: string;
  titleUr: string;
  jumpEn: string;
  jumpUr: string;
  paragraphs: IntroParagraph[];
  quotes?: IntroQuote[];
  sayings?: IntroSaying[];
  showFanaLadder?: boolean;
  isDua?: boolean;
}

export const INTRO_INVOCATION: IntroParagraph = {
  en: 'By the sanctity of Shaikh al-Mashaikh, Qudwat us-Salikin, Qiblah-e Arifeen, Mazhar-e Anwar-e Rabbani, Muqtada-e Ahl-e Haq, Abul Hasanat Hazrat Khawaja Saeen Sufi Nisar Ahmad Khaliquei Naqshbandi (Damat Barakatuhum al-Aaliyah wa Qaddasa Sirrah al-Aziz)',
  ur: 'الٰہی بحرمتِ شیخ المشائخ، قدوۃ السالکین، قبلۂ عارفین، مظہرِ انوارِ ربانی، مقتدائے اہلِ حق، ابوالحسنات حضرت خواجہ سائیں صوفی نثار احمد خلیقی نقشبندی (دامت برکاتہم العالیہ و قدس سرہ العزیز)',
};

export const FANA_LADDER = [
  { en: 'Fana Fi Al-Shaikh', ur: 'فنا فی الشیخ' },
  { en: 'Fana Fi Al-Rasool ﷺ', ur: 'فنا فی الرسول ﷺ' },
  { en: 'Fana Fi Allah', ur: 'فنا فی اللہ' },
] as const;

export const INTRO_SECTIONS: IntroSection[] = [
  {
    id: 'birth',
    titleEn: 'The Dawn of Sacred Birth: The First Tajalli upon the Horizon of Wilayah',
    titleUr: 'مطلعِ ولادتِ باسعادت: افقِ ولایت پر پہلی تجلی',
    jumpEn: 'Birth',
    jumpUr: 'ولادت',
    paragraphs: [
      {
        en: 'On the eleventh day of September, 1948, the fortunate earth of Faisalabad was honoured to receive a light that the pre-eternal Decree had long destined for it. That light entered the world of witnessing in the form of the Sultan of the arifeen of his age, the qutb of the circle of the Real, the lamp burning in the niche of Naqshbandi nisbat — Hazrat Khawaja Saeen Sufi Nisar Ahmad Khaliquei Naqshbandi. Those who have tasted even one sip from the cup of ma\'rifah, those whose hearts have been kindled by a single glance of his gaze, do not utter his name as one utters an ordinary name. They whisper it with trembling adab, with foreheads bowed and the burning of love upon their tongues: "Saeen Sufi Nisar Ahmad", "Sain Ji" — and in those sacred syllables the lovers breathe the fragrance of the presence of the Beloved.',
        ur: '۱۱ ستمبر ۱۹۴۸ء کو فیصل آباد کی سعید سرزمین کو وہ سعادت نصیب ہوئی جس کے لیے تقدیرِ ازلی نے اسے مدتوں سے چُن رکھا تھا۔ اس کی خاک پر وہ نور جلوہ فرما ہوا جو عصر کے سلطان العارفین، حلقۂ حق کے قطب اور نسبتِ نقشبندیہ کی طاق کے روشن چراغ — حضرت خواجہ سائیں صوفی نثار احمد خلیقی نقشبندی — کی صورت میں عالمِ شہود میں تشریف لایا۔ جنہوں نے معرفت کے جام سے ایک گھونٹ بھی چکھا ہے، جن کے دل آپ کی ایک نگاہ سے روشن ہوئے ہیں، وہ آپ کا اسمِ گرامی عام ناموں کی طرح زبان پر نہیں لاتے۔ وہ لرزتے ہوئے ادب، جھکی ہوئی جبین اور سوزِ عشق کے ساتھ سرگوشی کرتے ہیں: "سائیں صوفی نثار احمد"، "سائیں جی" — اور ان مقدس حروف میں عشاق کو محبوب کی حضوری کی خوشبو ملتی ہے۔',
      },
      {
        en: 'Before the tablet of time received its first inscription, before the pen of destiny touched the scroll of existence, the Hand of Divine Omnipotence had already kneaded into his sanctified clay the jewel of faqr before God, the humility of the annihilated, the radiance of taqwa, and that pre-eternal ache for the remembrance of the Real which is the inheritance of the chosen alone. The nafs that others receive as a tyrant, he received already bowed in surrender; the heart that others must polish over a lifetime, he received already turned toward the qiblah of the Divine. His childhood was not a childhood but a hidden apprenticeship in the school of the Unseen. In the years when other children learn to play, the lights of ma\'rifah were already gathering upon his brow of devotion, and the eyes of the people of basirah saw upon that child the unmistakable seal of wilayah.',
        ur: 'اس سے پہلے کہ لوحِ زمانہ پر پہلا حرف رقم ہو، اس سے پہلے کہ قلمِ تقدیر صحیفۂ ہست و بود کو چھوئے، دستِ قدرت نے آپ کے خمیرِ اقدس میں فقرِ الی اللہ کا جوہر، فانیوں کا انکسار، تقویٰ کی تابانی اور یادِ حق کا وہ ازلی درد ودیعت فرما دیا تھا جو صرف برگزیدہ روحوں کا ورثہ ہوتا ہے۔ جو نفس دوسروں کو سرکش ملتا ہے، آپ کو سرِ تسلیم خم کیے ہوئے ملا؛ جو قلب دوسرے عمر بھر صیقل کرتے ہیں، آپ کو ازل ہی سے قبلۂ حق کی جانب مائل ملا۔ آپ کا عہدِ طفولیت طفولیت نہ تھا بلکہ مکتبِ غیب کی ایک پوشیدہ شاگردی تھی۔ جن برسوں میں بچے کھیلنا سیکھتے ہیں، ان برسوں میں آپ کی جبینِ نیاز پر انوارِ معرفت جمع ہو رہے تھے، اور اہلِ بصیرت کی آنکھیں اس بچے پر ولایت کی ناقابلِ انکار مہر دیکھ رہی تھیں۔',
      },
    ],
  },
  {
    id: 'shariah',
    titleEn: "The Luminous Marriage of Shari'ah and Tariqah: Knowledge as the Threshold of Ma'rifah",
    titleUr: 'شریعت و طریقت کا نورانی عقد: علم بطورِ دہلیزِ معرفت',
    jumpEn: "Shari'ah",
    jumpUr: 'شریعت',
    paragraphs: [
      {
        en: "The arifeen teach that the heart is a mirror. The sciences of the outward polish one face of that mirror and the sciences of the inward polish the other, and neither face alone can hold the reflection of the Beloved. So it was that while his sanctified inner being burned in the fire of Divine longing and drank from the cup of shuhud, his outward self stood wakeful and illumined in the halls of manifest learning. He attained the degree of B.Sc. (Agriculture) from the University of Agriculture, Faisalabad — and in that attainment lies a teaching for every seeker: tasawwuf is not the abandonment of the field but the cultivation of two fields at once, the field of the earth and the field of the heart. He whose hand tills the soil of the world while his heart tills the soil of dhikr is the true farmer of the path.",
        ur: 'عارفین فرماتے ہیں کہ قلب ایک آئینہ ہے؛ علومِ ظاہری اس آئینے کے ایک رخ کی جِلا ہیں اور علومِ باطنی دوسرے رخ کی، اور کوئی ایک رخ تنہا محبوب کا عکس نہیں دکھا سکتا۔ چنانچہ جہاں آپ کا باطنِ اقدس شوقِ الٰہی کی آگ میں جلتا اور شہود کے جام سے سیراب ہوتا تھا، وہاں آپ کا ظاہر علومِ ظاہری کی درسگاہوں میں بیدار اور منوّر کھڑا تھا۔ آپ نے جامعہ زراعت فیصل آباد سے بی۔ایس۔سی۔ (ایگریکلچر) کی سند حاصل کی — اور اس حصول میں ہر سالک کے لیے ایک درس پوشیدہ ہے: تصوف کھیت چھوڑنے کا نام نہیں بلکہ بیک وقت دو کھیت بونے کا نام ہے، زمین کا کھیت اور دل کا کھیت۔ جس کا ہاتھ دنیا کی مٹی کو سیراب کرے اور دل ذکر کی مٹی کو، وہی راہِ حق کا سچا کسان ہے۔',
      },
      {
        en: 'In this he embodied, in living flesh, the golden and imperishable principle upon which the exalted Naqshbandi silsila is founded:',
        ur: 'اس طرح آپ نے اپنے وجودِ مبارک میں اس زرّیں اور لافانی اصول کو زندہ کر دکھایا جس پر سلسلۂ عالیہ نقشبندیہ کی بنیاد قائم ہے:',
      },
    ],
    quotes: [
      {
        en: '"Dast ba kar, dil ba yar" — The hand in the work of the world; the heart, without interruption, in the presence of the Friend. The outward in the marketplace of creation; the inward in the sanctuary of the Creator, where none but He may enter.',
        ur: '"دست بہ کار، دل بہ یار" — ہاتھ کارِ دنیا میں، دل بلا انقطاع حضورِ یار میں؛ ظاہر مخلوق کے بازار میں، باطن خالق کے حرم میں، جہاں اُس کے سوا کسی کی رسائی نہیں۔',
      },
    ],
  },
  {
    id: 'bayat',
    titleEn: 'The Sacred Bay\'at: The Hour in Which the Trust Was Transferred',
    titleUr: 'بیعتِ مقدسہ: وہ ساعت جس میں امانت منتقل ہوئی',
    jumpEn: "Bay'at",
    jumpUr: 'بیعت',
    paragraphs: [
      {
        en: 'Every wali has an hour that divides his life into before and after — the hour in which the door of the Unseen is opened and the seeker is received into the circle of the accepted. For our Murshid Pak that hour struck on 27 December 1967. On that day he placed his hand of surrender into the truth-upholding hand of the Ghawth of his age, the Mujaddid of the Tariqah, the one through whom the Real executes His will upon the hearts of men, the Qutb of guidance, the Sultan of the arifeen of his time — Hazrat Khawaja Saeen Muhammad Sharif Khalique Naqshbandi (may Allah\'s mercy be upon him) — the luminous heir of the Mujaddidi Naqshbandi trust and the thirty-eighth (38th) link of this blessed Shajra.',
        ur: 'ہر ولی کی زندگی میں ایک ساعت ایسی آتی ہے جو اس کی حیات کو "پہلے" اور "بعد" میں تقسیم کر دیتی ہے — وہ ساعت جس میں غیب کا دروازہ کھلتا ہے اور طالب مقبولوں کے حلقے میں قبول کر لیا جاتا ہے۔ ہمارے مرشدِ پاک کے لیے وہ ساعت ۲۷ دسمبر ۱۹۶۷ء کو آئی۔ اس روز آپ نے اپنا دستِ تسلیم وقت کے غوث، مجددِ طریقت، نافذ الحقیقت، قطبِ ارشاد، عصر کے سلطان العارفین حضرت خواجہ سائیں محمد شریف خلیق نقشبندی (رحمۃ اللہ علیہ) کے دستِ حق پرست میں دے دیا — جو مجددی نقشبندی امانت کے نورانی وارث اور اس شجرۂ طیبہ کی اڑتیسویں (۳۸ ویں) کڑی ہیں۔',
      },
      {
        en: 'Let no one imagine that 27 December 1967 is merely a date. It is a seal stamped in pre-eternity upon the Tablet of Destiny, and time only unveiled what eternity had already written. In that sanctified and fragrant hour, from the truth-upholding hand of the noble grand-Murshid, Hazoor Gojrawi Sarkar, the light that is the fountainhead of the bounty of Mustafa ﷺ and the distributing treasury of Divine ma\'rifah was transferred as a sacred trust into the breast of our gracious Murshid Pak. It was transferred not in part but in whole, not from behind veils but without a single veil, not as a reflection but as the thing itself — in one hundred percent complete manifestation and utmost tajalli, so that the lamp of the Shaikh was kindled entire within the lamp of the disciple, and the two flames became one flame.',
        ur: 'کوئی یہ نہ سمجھے کہ ۲۷ دسمبر ۱۹۶۷ء محض ایک تاریخ ہے۔ یہ لوحِ تقدیر پر ازل میں لگائی گئی ایک مہر ہے، اور زمانے نے صرف اُس کو بے نقاب کیا جو ازل پہلے ہی لکھ چکا تھا۔ اس مقدس و معطر ساعت میں دادا مرشدِ پاک حضور گوجروی سرکار کے دستِ حق پرست سے وہ نور — جو فیضانِ مصطفیٰ ﷺ کا سرچشمہ اور معرفتِ الٰہی کا خزانۂ تقسیم ہے — بطورِ امانت ہمارے کریم مرشدِ پاک کے سینے میں منتقل ہوا۔ یہ انتقال جزوی نہیں کلی تھا، حجابوں کے پیچھے سے نہیں بلکہ بغیر کسی حجاب کے تھا، عکس کی صورت نہیں بلکہ عینِ شے کی صورت تھا — سو فیصد کامل اظہار اور اتم تجلی کے ساتھ، اس طرح کہ شیخ کا چراغ پورا کا پورا مرید کے چراغ میں روشن ہو گیا اور دو شعلے ایک شعلہ بن گئے۔',
      },
      {
        en: 'Every drop of his spiritual nurturing, every irrigation of the garden of his lataif, every station of his khidmah and every ray of his hidayah — this most complete and perfect bestowal of faiz — flows from one fountain alone: the exalted threshold of Hazrat Khawaja Saeen Muhammad Sharif Khalique Naqshbandi (may Allah\'s mercy be upon him). In the school of that threshold he learned that service is the first dhikr, fidelity the second, and the effacement of one\'s own being before the Shaikh the door to every effacement that follows. Through the utmost degree of khidmah, unwavering wafa, selfless guardianship of the Shari\'ah, and the crossing of the arduous valleys of suluk — the valleys of the nafs, the qalb, the ruh, the sirr, the khafi and the akhfa — he journeyed in such wise that he was no longer merely a mureed at his Murshid\'s door, but the solace of his pure heart, the axis of his gaze of grace, the vessel of his secret, and the mirror in which the Shaikh beheld his own light.',
        ur: 'آپ کی روحانی پرورش کا ہر قطرہ، آپ کے لطائف کے باغ کی ہر آبیاری، آپ کی خدمت کی ہر منزل اور آپ کی ہدایت کی ہر کرن — یہ فیضِ اتم و اکمل — ایک ہی چشمے سے جاری ہے: حضرت خواجہ سائیں محمد شریف خلیق نقشبندی (رحمۃ اللہ علیہ) کا آستانۂ عالیہ۔ اسی آستانے کے مکتب میں آپ نے سیکھا کہ خدمت پہلا ذکر ہے، وفا دوسرا، اور شیخ کے سامنے اپنی ہستی کو مٹا دینا ہر اُس فنا کا دروازہ ہے جو آگے آنے والی ہے۔ غایت درجہ خدمت، لازوال وفا، شریعت کی بے لوث پاسبانی اور سلوک کی کٹھن وادیوں — نفس، قلب، روح، سرّ، خفی اور اخفیٰ کی وادیوں — کو آپ نے اس شان سے طے فرمایا کہ آپ اپنے مرشد کے در پر محض ایک مرید نہ رہے، بلکہ ان کے قلبِ اطہر کا چین، ان کی نگاہِ کرم کا محور، ان کے سرّ کے امین اور وہ آئینہ بن گئے جس میں شیخ اپنا ہی نور دیکھتا تھا۔',
      },
    ],
  },
  {
    id: 'fortieth',
    titleEn: 'The Fortieth Link: Trustee of an Unbroken Chain of Light',
    titleUr: 'چالیسواں حلقہ: نور کی غیر منقطع زنجیر کا امین',
    jumpEn: '40th Link',
    jumpUr: 'چالیسواں',
    paragraphs: [
      {
        en: 'Today he is the fortieth (40th) luminous link and the peerless pearl in the exalted Naqshbandi Mujaddidi chain. He is the trustee of that Divine trust and those secrets of creation which began in the sacred breast of the Master of the Two Worlds, the Sovereign of Madinah, Ahmad-e Mujtaba Hazrat Muhammad Mustafa ﷺ; which were poured into the breast of the Siddiq of the ummah in the darkness of the Cave; which passed through the Rightly-Guided Khulafa, through the Khawajagan of Turkestan whose breath was dhikr and whose sleep was muraqaba, through the Mujaddid of the second millennium and the great revivers of this land — an unbroken chain of light in which each link kindled the next and none was ever dimmed. Hand to hand, heart to heart, sirr to sirr, that light travelled fourteen centuries to reach our age, and in our age it reached him.',
        ur: 'آج آپ سلسلۂ عالیہ نقشبندیہ مجددیہ کے چالیسویں (۴۰ ویں) حلقۂ نور اور گوہرِ بے مثال ہیں۔ آپ اس امانتِ الٰہیہ اور اسرارِ کائنات کے امین ہیں جن کا آغاز سرورِ کونین، تاجدارِ مدینہ، احمدِ مجتبیٰ حضرت محمد مصطفیٰ ﷺ کے سینۂ اقدس سے ہوا؛ جو غارِ ثور کی تاریکی میں صدیقِ امت کے سینے میں انڈیلے گئے؛ جو خلفائے راشدین سے گزرے، خواجگانِ ترکستان سے گزرے جن کی سانس ذکر اور جن کی نیند مراقبہ تھی، مجددِ الفِ ثانی اور اس سرزمین کے عظیم مجددین سے گزرے — نور کی ایک ایسی غیر منقطع زنجیر جس کی ہر کڑی نے اگلی کڑی کو روشن کیا اور کوئی کڑی کبھی ماند نہ پڑی۔ ہاتھ سے ہاتھ، قلب سے قلب، سرّ سے سرّ تک وہ نور چودہ صدیوں کا سفر کر کے ہمارے عہد تک پہنچا، اور ہمارے عہد میں آپ تک پہنچا۔',
      },
      {
        en: 'Although in the luminous order of the blessed Shajra his noble name is enthroned as the fortieth link, the true root of his bay\'at and the true source of his training remain directly and eternally attached to Hazrat Khawaja Saeen Muhammad Sharif Khalique Naqshbandi (may Allah\'s mercy be upon him). The numbering belongs to the ledger of history; the nisbat belongs to the ledger of the heart. To sit in his blessed assembly is therefore not to read history but to enter it — to feel the imperishable blessings and Divine lights of a living, breathing, everlasting silsila descending into the hidden chambers of one\'s own spirit, awakening lataif that have slept since birth.',
        ur: 'اگرچہ شجرۂ مبارک کی نورانی ترتیب میں آپ کا اسمِ گرامی چالیسویں حلقے پر جلوہ فرما ہے، مگر آپ کی بیعت کی اصل جڑ اور آپ کی تربیت کا اصل منبع براہِ راست اور ابد تک حضرت خواجہ سائیں محمد شریف خلیق نقشبندی (رحمۃ اللہ علیہ) ہی سے وابستہ ہے۔ شمار تاریخ کے دفتر کا ہے، مگر نسبت دل کے دفتر کی ہے۔ پس آپ کی محفلِ پاک میں بیٹھنا تاریخ پڑھنا نہیں بلکہ تاریخ میں داخل ہونا ہے — ایک زندہ، سانس لیتے، جاوید سلسلے کی لافانی برکات اور انوارِ الٰہیہ کو اپنی روح کے نہاں خانوں میں اترتے اور پیدائش سے سوئے ہوئے لطائف کو جاگتے ہوئے محسوس کرنا ہے۔',
      },
    ],
  },
  {
    id: 'sayings',
    titleEn: "The Sacred Sayings: Rivers Flowing from the Ocean of Ma'rifah",
    titleUr: 'فرامینِ مبارکہ: بحرِ معرفت سے پھوٹنے والے دریا',
    jumpEn: 'Sayings',
    jumpUr: 'فرامین',
    showFanaLadder: true,
    paragraphs: [
      {
        en: 'The arifeen say that the speech of the wali is the overflow of his state; what the tongue utters is only the spray of the ocean within. Those travellers upon the path of the Real who, by reason of distance, cannot sit in his outward assembly of grace are nonetheless nourished through his exalted irshadat, for in them the depth, the subtlety, and the radiance of his illumined heart become present to whoever reads them with the eye of the heart. The quintessence of his lofty teaching is this: sincere and selfless love for Allah and His Noble Messenger ﷺ is the very root of iman, and the honouring of the rights of Allah\'s creation is the fruit that root cannot fail to bear.',
        ur: 'عارفین فرماتے ہیں کہ ولی کا کلام اس کے حال کا اُبال ہے؛ زبان جو کہتی ہے وہ اندر کے سمندر کی محض ایک چھینٹ ہے۔ جو سالکینِ راہِ حق مسافتوں کے سبب آپ کی ظاہری مجلسِ فیض میں نہیں بیٹھ سکتے، وہ آپ کے ارشاداتِ عالیہ سے سیراب ہوتے ہیں — کیونکہ ان ارشادات میں آپ کے قلبِ انور کی گہرائی، لطافت اور ضیا ہر اُس شخص پر حاضر ہو جاتی ہے جو انہیں دل کی آنکھ سے پڑھے۔ آپ کی تعلیماتِ عالیہ کا لبِ لباب یہ ہے کہ اللہ اور اس کے رسولِ مکرم ﷺ کی بے لوث و صادق محبت ہی ایمان کی اصل جڑ ہے، اور مخلوقِ خدا کے حقوق کی پاسداری وہ پھل ہے جو اس جڑ سے پھوٹے بغیر رہ نہیں سکتا۔',
      },
      {
        en: 'On the journey to the Divine Essence he holds the stations of fana to be indispensable, and he lays out the ladder of the path in three ascending rungs:',
        ur: 'ذاتِ حق تک کے سفر میں آپ مقاماتِ فنا کو ناگزیر قرار دیتے ہیں اور راہ کے زینے کو تین بلند ہوتے ہوئے قدموں میں بیان فرماتے ہیں:',
      },
    ],
    quotes: [
      {
        en: '"The path to the Divine Essence passes through the stages of fana; until the traveller passes through fana fi al-Shaikh and attains the station of fana fi al-Rasool ﷺ, his inner being is not fit to attain the everlasting reality of fana fi Allah."',
        ur: '"ذاتِ حق تک پہنچنے کا راستہ فنا کے مراحل سے گزرتا ہے؛ سالک جب تک فنا فی الشیخ کے راستے سے گزر کر فنا فی الرسول ﷺ کے مرتبے پر نہیں پہنچتا، اس کا باطن اس قابل ہی نہیں ہوتا کہ وہ فنا فی اللہ کی لازوال حقیقت کو پا سکے۔"',
      },
    ],
    sayings: [
      {
        id: 'jihad',
        titleEn: 'The Greater Jihad (the nafs)',
        titleUr: 'جہادِ اکبر (نفس)',
        bodyEn:
          '"The sword against the nafs must be drawn with every breath; when every moment of a person\'s life passes in the quest for the pleasure of Allah and in following the Sunnah, there is no jihad greater than that."',
        bodyUr:
          '"نفس کے خلاف ہر سانس میں تلوار کھینچنی چاہیے؛ جب انسان کا ہر لمحہ رضائے الٰہی کی جستجو اور اتباعِ سنت میں گزرے تو اس سے بڑا کوئی جہاد نہیں۔"',
      },
      {
        id: 'creed',
        titleEn: 'Creed and Noble Character',
        titleUr: 'عقیدہ و اخلاقِ عالیہ',
        bodyEn:
          '"To cast a Muslim who professes the kalimah out of the circle of Islam is not the way of the people of ma\'rifah. The friends of Allah, rather than severity, transform the very hearts of the misguided through their noble character, gentleness, and everlasting love. Where the love of Allah speaks, the cunning intellect falls silent."',
        bodyUr:
          '"کسی کلمہ گو مسلمان کو دائرۂ اسلام سے خارج کرنا اہلِ معرفت کا شیوہ نہیں۔ اولیاء اللہ سخت گیری کی بجائے اپنے حسنِ اخلاق، نرمی اور لازوال محبت سے گمراہوں کے دلوں کی کایا پلٹ دیتے ہیں۔ جہاں محبتِ الٰہی بولتی ہے، وہاں عقلِ عیار خاموش ہو جاتی ہے۔"',
      },
      {
        id: 'grace',
        titleEn: 'The Rain of Divine Grace',
        titleUr: 'بارانِ کرمِ الٰہی',
        bodyEn:
          '"Allah is so generous that when He accepts any of His servants into His court of grace, He utterly effaces all the evil effects and dominion of the nafs."',
        bodyUr:
          '"اللہ اتنا کریم ہے کہ جب وہ اپنے کسی بندے کو اپنی بارگاہِ لطف میں قبول فرما لے، تو نفس کے تمام برے اثرات اور اس کے تسلط کو ملیا میٹ کر دیتا ہے۔"',
      },
      {
        id: 'love',
        titleEn: 'The Everlasting Effect of Love',
        titleUr: 'محبت کی لافانی تاثیر',
        bodyEn:
          '"The best servant is the one who bears true love for Allah and His Beloved Messenger ﷺ, for it is through that true love that the impulse to fulfil the rights of others with a willing heart is born within a person."',
        bodyUr:
          '"بہترین بندہ وہ ہے جسے اللہ اور اس کے رسولِ مقبول ﷺ سے سچی محبت ہو، کیونکہ اسی سچی محبت کی بدولت انسان کے اندر دوسروں کے حقوق خوش دلی سے پورے کرنے کا جذبہ پیدا ہوتا ہے۔"',
      },
    ],
  },
  {
    id: 'murshid',
    titleEn: 'The Perfect Murshid: The Living Proof of the Path',
    titleUr: 'مرشدِ کامل: راہِ حق کا زندہ برہان',
    jumpEn: 'Murshid',
    jumpUr: 'مرشد',
    paragraphs: [
      {
        en: 'In an age of turbulence and deception, when the marketplace is loud and the mosque of the heart stands empty, he sits enthroned upon the exalted station of "Abul Hasanat" and "Rahnuma-e Kamilin" and continues, in a silence more eloquent than speech, to train the travellers of the path in the four pillars of the Naqshbandi way: the dhikr of the heart that no ear hears, the rabita with the Shaikh that no distance breaks, the company of the righteous in which the heart is polished, and complete adherence to the Pure Sunnah, which is the very shape of love.',
        ur: 'آشوب اور فریب کے اس زمانے میں، جب بازار شور سے بھرا ہے اور دل کی مسجد خالی پڑی ہے، آپ "ابوالحسنات" اور "راہنمائے کاملین" کے منصبِ جلیل پر جلوہ فرما ہیں اور اُس خاموشی سے جو کلام سے زیادہ گویا ہے، سالکینِ راہِ حق کو نقشبندی طریق کے چار ستونوں کی تربیت دے رہے ہیں: وہ ذکرِ قلبی جو کوئی کان نہیں سنتا، وہ رابطۂ شیخ جو کوئی مسافت نہیں توڑتی، وہ صحبتِ صالحین جس میں دل صیقل ہوتا ہے، اور سنتِ مطہرہ کی وہ کامل اتباع جو خود عشق کی صورت ہے۔',
      },
      {
        en: 'His blessed assembly is that island of serenity where the storm of the nafs falls silent and the restlessness of souls finds its shore. A single glance of his loving attention melts the hardened heart like wax before the flame; a single word from his lips breathes life into hearts long withered. Those who enter his presence as strangers leave as lovers; those who enter as lovers leave as the annihilated. He is the living proof, walking among us, that tasawwuf and tariqah are not tales of a vanished past but bright, luminous, soul-nourishing lamps of guidance even in the darkness of the present age.',
        ur: 'آپ کی مجلسِ پاک سکون کا وہ جزیرہ ہے جہاں نفس کا طوفان خاموش ہو جاتا ہے اور روحوں کا اضطراب اپنا ساحل پا لیتا ہے۔ آپ کی ایک نگاہِ التفات سخت دل کو شمع کے سامنے موم کی طرح پگھلا دیتی ہے؛ آپ کے لبوں کا ایک لفظ مدت سے مرجھائے قلوب میں زندگی پھونک دیتا ہے۔ جو آپ کی بارگاہ میں غیر بن کر آتے ہیں وہ عاشق بن کر لوٹتے ہیں؛ جو عاشق بن کر آتے ہیں وہ فانی بن کر لوٹتے ہیں۔ آپ ہمارے درمیان چلتا پھرتا زندہ برہان ہیں کہ تصوف اور طریقت ماضی کے قصے نہیں، بلکہ آج کے تاریک عصر میں بھی ہدایت کے روشن، منور اور روح پرور چراغ ہیں۔',
      },
    ],
  },
  {
    id: 'dua',
    titleEn: 'Humble Supplication in the Court of Allah',
    titleUr: 'بارگاہِ الٰہی میں عاجزانہ التجا',
    jumpEn: 'Dua',
    jumpUr: 'دعا',
    isDua: true,
    paragraphs: [
      {
        en: 'O Lord of the worlds! By the sanctity of the Master of the Messengers, the Intercessor of sinners ﷺ — grant our perfect Shaikh, the manifestation of the lights of Sufi Nisar Ahmad Khaliquei Naqshbandi, complete health, perfect well-being, the long life of Khidr, and exalted dignity; keep him established and enduring forever. Extend the shade of his affection over us, his mureeds, and over all travellers of the path until the end of time. Grant us that we may behold him with the eye of the heart, hear him with the ear of the spirit, and walk in his footsteps with the feet of sincerity, upholding the honour of Shari\'ah and Tariqah until our final breath.',
        ur: 'یا رب العالمین! بحرمتِ سید المرسلین، شفیع المذنبین ﷺ، ہمارے شیخِ کامل، مظہرِ انوارِ صوفی نثار احمد خلیقی نقشبندی کو صحتِ کاملہ، عافیتِ تامہ، طولِ عمرِ خضر اور وقارِ بلند کے ساتھ تادیر قائم و دائم فرما۔ ان کے سایۂ عاطفت کو ہم مریدوں اور تمام سالکین پر تاقیامت دراز فرما۔ ہمیں توفیق دے کہ ہم انہیں دل کی آنکھ سے دیکھیں، روح کے کان سے سنیں اور صدق کے قدموں سے ان کے نقشِ قدم پر چلیں، اور آخری سانس تک شریعت و طریقت کی لاج رکھیں۔',
      },
      {
        en: 'Ameen, then Ameen, by the sanctity of the Master of the Messengers and the Seal of the Prophets ﷺ.',
        ur: 'آمین، ثم آمین، بجاہِ سید المرسلین و خاتم النبیین ﷺ۔',
      },
    ],
  },
];
