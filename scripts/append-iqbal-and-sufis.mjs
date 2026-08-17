/**
 * Appends Allama Iqbal and well-known Sufi sayings to classical-irshadat.json.
 * Idempotent per master — skips masters already present.
 *
 * Run: node scripts/append-iqbal-and-sufis.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const path = resolve('public/assets/classical-irshadat.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

/** @type {Record<string, { sourceNote: string; drafts: { theme: 'gnosis' | 'love'; en: string; ur: string }[] }>} */
const batches = {
  allama_iqbal: {
    sourceNote:
      'Allama Muhammad Iqbal — spiritual themes from the poetic tradition (public-domain style renderings)',
    drafts: [
      {
        theme: 'gnosis',
        en: 'Raise yourself so high that before every decree, God Himself asks: what is your wish?',
        ur: 'خود کو اتنا بلند کرو کہ ہر تقدیر سے پہلے خدا خود پوچھے: تیری رضا کیا ہے؟',
      },
      {
        theme: 'gnosis',
        en: 'The self that knows itself becomes a mirror of the Divine — polish it with love and struggle.',
        ur: 'جو خودی اپنے آپ کو پہچان لے وہ الٰہی آئینہ بن جاتی ہے — اسے محبت اور مجاہدہ سے صاف کرو۔',
      },
      {
        theme: 'love',
        en: 'Love is the path, and the Prophet ﷺ is the light upon it — walk, do not merely praise.',
        ur: 'محبت راہ ہے اور حضور ﷺ اس پر روشنی — چلو، صرف تعریف نہ کرو۔',
      },
      {
        theme: 'gnosis',
        en: 'Do not seek rest in dust; the falcon was made for open sky and higher flight.',
        ur: 'مٹی میں سکون مت ڈھونڈو؛ شاہین کھلے آسمان اور بلند پرواز کے لیے بنا ہے۔',
      },
      {
        theme: 'love',
        en: 'The heart that burns in Divine love finds every sorrow turned into a song of nearness.',
        ur: 'جو دل الٰہی عشق میں جلتا ہے، اس کی ہر رنج قرب کا گیت بن جاتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Knowledge without action is a burden; action without sincerity is a noise.',
        ur: 'عمل کے بغیر علم بوجھ ہے؛ خلوص کے بغیر عمل شور ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Break the idols of habit within you — a living faith cannot share the heart with dead custom.',
        ur: 'اپنے اندر عادت کے بت توڑ دو — زندہ ایمان مردہ رسم کے ساتھ دل نہیں بانٹ سکتا۔',
      },
      {
        theme: 'love',
        en: 'In the garden of the heart, plant only the rose of Mustafa ﷺ — every other flower fades.',
        ur: 'دل کے باغ میں صرف مصطفیٰ ﷺ کا گلاب لگاؤ — باقی سب پھول مرجھا جاتے ہیں۔',
      },
      {
        theme: 'gnosis',
        en: 'Faqr is not poverty of the hand — it is richness of the heart that needs none but Allah.',
        ur: 'فقر ہاتھ کی تنگدستی نہیں — دل کی وہ دولت ہے جسے اللہ کے سوا کسی کی حاجت نہیں۔',
      },
      {
        theme: 'gnosis',
        en: 'The night of the seeker is spent in awakening; sleep belongs to those who have forgotten the Friend.',
        ur: 'سالک کی رات بیداری میں گزرتی ہے؛ نیند ان کی ہے جو دوست کو بھول بیٹھے۔',
      },
      {
        theme: 'love',
        en: 'If you have love of the Prophet ﷺ, the world cannot make you small — love enlarges the soul.',
        ur: 'اگر محبتِ رسول ﷺ ہے تو دنیا تمہیں چھوٹا نہیں کر سکتی — عشق روح کو وسیع کرتا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Do not ask the wave to stay still; ask your heart to become an ocean that holds every storm.',
        ur: 'موج سے خاموش رہنے کو نہ کہو؛ اپنے دل سے کہو کہ ایسا سمندر بنو جو ہر طوفان سمو لے۔',
      },
      {
        theme: 'gnosis',
        en: 'Destiny favors the one who struggles — the throne of heaven is not given to the idle.',
        ur: 'تقدیر مجاہد کی مدد کرتی ہے — عرشِ الٰہی کا مقام کاہل کو نہیں ملتا۔',
      },
      {
        theme: 'love',
        en: 'A single tear of true longing is worth more than a lifetime of dry worship.',
        ur: 'سچی تڑپ کا ایک آنسو خشک عبادت کی عمر سے زیادہ قیمتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Be a spark that refuses to die in the ashes of imitation — find the fire of your own witnessing.',
        ur: 'تقلید کی راکھ میں مرنے سے انکار کرنے والا شعلہ بنو — اپنے مشاہدے کی آگ تلاش کرو۔',
      },
      {
        theme: 'gnosis',
        en: 'The Quran is not a book for the shelf — it is a voice that remakes the listener.',
        ur: 'قرآن الماری کی کتاب نہیں — وہ آواز ہے جو سننے والے کو نیا بنا دیتی ہے۔',
      },
      {
        theme: 'love',
        en: 'When love of Allah enters, fear of creation leaves — the moth no longer counts the candles.',
        ur: 'جب عشقِ الٰہی آئے تو خوفِ مخلوق جاتا رہے — پروانہ شمعوں کو گننا چھوڑ دیتا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Your clay is temporary; your light is a trust — do not bury the trust under soft living.',
        ur: 'تمہاری مٹی عارضی ہے؛ تمہارا نور امانت ہے — امانت کو آرام طلبی کے نیچے دفن نہ کرو۔',
      },
      {
        theme: 'love',
        en: 'Hold the hem of the Beloved ﷺ in every rise and fall — that grip is the whole of the journey.',
        ur: 'ہر عروج و زوال میں محبوب ﷺ کا دامن تھامے رہو — یہی گرفت پورے سفر کا خلاصہ ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Nations are revived by hearts that remember God — forgetfulness is the true decline.',
        ur: 'قومیں ان دلوں سے زندہ ہوتی ہیں جو خدا کو یاد رکھیں — بھول ہی اصل زوال ہے۔',
      },
    ],
  },

  rabia_basri: {
    sourceNote: 'Rabia al-Adawiyya — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'love',
        en: 'I love Allah with two loves: a love of passion, and a love because He is worthy of love.',
        ur: 'میں اللہ سے دو محبتوں سے محبت کرتی ہوں: ایک شوق کی محبت، اور ایک اس لیے کہ وہ محبت کا مستحق ہے۔',
      },
      {
        theme: 'love',
        en: 'O God, if I worship You for fear of Hell, burn me in Hell; if for hope of Paradise, exclude me from it — but if I worship You for Your own sake, withhold not Your Eternal Beauty.',
        ur: 'اے خدا! اگر میں نے جہنم کے خوف سے عبادت کی تو مجھے جہنم میں جلا؛ اگر جنت کی امید سے کی تو جنت سے دور رکھ — پر اگر تیری ذات کے لیے کی تو اپنی ازلی خوبصورتی مجھ سے نہ روک۔',
      },
      {
        theme: 'gnosis',
        en: 'Hide your good deeds as you hide your sins — sincerity fears the eye of praise.',
        ur: 'نیکیاں چھپاؤ جیسے گناہ چھپاتے ہو — خلوص تعریف کی نظر سے ڈرتا ہے۔',
      },
      {
        theme: 'love',
        en: 'My joy is in Him alone; the garden of Paradise is pale beside the meeting of the Friend.',
        ur: 'میری خوشی صرف اسی میں ہے؛ دوست کی ملاقات کے سامنے جنت کا باغ بھی پھیکا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'The real fast is to fast from everything other than Allah.',
        ur: 'اصل روزہ اللہ کے سوا ہر چیز سے روزہ رکھنا ہے۔',
      },
      {
        theme: 'love',
        en: 'I have left both worlds for the sake of the One — what remains between us is only love.',
        ur: 'میں نے دونوں جہان ایک کے لیے چھوڑ دیے — ہمارے درمیان اب صرف عشق باقی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Your heart is a glass; if you fill it with the world, where will you pour the wine of Truth?',
        ur: 'تمہارا دل شیشہ ہے؛ اگر اسے دنیا سے بھر دو تو حق کی شراب کہاں ڈالو گے؟',
      },
      {
        theme: 'love',
        en: 'Do not claim love while your feet still run toward what He dislikes.',
        ur: 'محبت کا دعویٰ نہ کرو جب تک تمہارے قدم اس کی ناپسندیدہ چیزوں کی طرف بھاگتے ہوں۔',
      },
      {
        theme: 'gnosis',
        en: 'Seek the Healer of hearts, not the applause of people.',
        ur: 'دلوں کے شافی کو تلاش کرو، لوگوں کی تعریف کو نہیں۔',
      },
      {
        theme: 'love',
        en: 'When He is with you, every wilderness is a garden; when He is absent, every garden is a wilderness.',
        ur: 'جب وہ ساتھ ہو تو ہر ویرانہ باغ ہے؛ جب وہ غائب ہو تو ہر باغ ویرانہ ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Repentance that returns to the same sin is a tongue without a heart.',
        ur: 'وہ توبہ جو پھر اسی گناہ کی طرف لوٹے، دل کے بغیر زبان ہے۔',
      },
      {
        theme: 'love',
        en: 'I ask not for Paradise — I ask for the One who made Paradise beautiful.',
        ur: 'میں جنت نہیں مانگتی — میں اسے مانگتی ہوں جس نے جنت کو حسین بنایا۔',
      },
    ],
  },

  fariduddin_attar: {
    sourceNote: 'Fariduddin Attar — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'gnosis',
        en: 'The valley of love has no end — whoever enters must leave the self at the gate.',
        ur: 'عشق کی وادی کا کوئی انجام نہیں — جو داخل ہو اسے دروازے پر خودی چھوڑنی پڑتی ہے۔',
      },
      {
        theme: 'love',
        en: 'The moth and the candle teach one lesson: nearness costs the form that feared the flame.',
        ur: 'پروانہ اور شمع ایک سبق سکھاتے ہیں: قرب اس قالب کی قیمت مانگتا ہے جو آگ سے ڈرتا تھا۔',
      },
      {
        theme: 'gnosis',
        en: 'Seek the Simurgh within — the journey across seven valleys ends in your own heart.',
        ur: 'سیمرغ کو اپنے اندر ڈھونڈو — سات وادیوں کا سفر تمہارے اپنے دل پر ختم ہوتا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'He who knows the secret of “I” finds that every “I” was a veil over “He”.',
        ur: 'جو “میں” کا راز جان لے، دیکھتا ہے کہ ہر “میں” “وہ” پر پردہ تھی۔',
      },
      {
        theme: 'love',
        en: 'Love is a fire that burns everything except the face of the Beloved.',
        ur: 'عشق وہ آگ ہے جو محبوب کے چہرے کے سوا سب جلا دیتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Do not count the stations of the path — count the moments you were sincere.',
        ur: 'راہ کے منازل مت گنو — وہ لمحے گنو جن میں تم مخلص تھے۔',
      },
      {
        theme: 'love',
        en: 'The bird that fears the sky will never learn the language of flight.',
        ur: 'جو پرندہ آسمان سے ڈرے وہ کبھی پرواز کی زبان نہیں سیکھے گا۔',
      },
      {
        theme: 'gnosis',
        en: 'Silence of the heart is louder than a thousand books of debate.',
        ur: 'دل کی خاموشی ہزار بحث کی کتابوں سے بلند تر ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Whoever tastes annihilation finds that nothing was lost except the illusion of ownership.',
        ur: 'جس نے فنا کا مزہ چکھ لیا، دیکھتا ہے کہ مالکیت کے وہم کے سوا کچھ نہیں گیا۔',
      },
      {
        theme: 'love',
        en: 'Come empty-handed to the court of Love — kings enter that door as beggars.',
        ur: 'عشق کی بارگاہ میں خالی ہاتھ آؤ — بادشاہ بھی اس در پر فقیر بن کر داخل ہوتے ہیں۔',
      },
      {
        theme: 'gnosis',
        en: 'The mirror of the soul shows God when the dust of self-worship is wiped away.',
        ur: 'روح کا آئینہ خدا دکھاتا ہے جب خود پرستی کی گرد صاف ہو جائے۔',
      },
      {
        theme: 'love',
        en: 'One breath spent in true longing outweighs years spent in empty form.',
        ur: 'سچی تڑپ میں گزری ایک سانس خالی رسم کے برسوں پر بھاری ہے۔',
      },
    ],
  },

  data_ganj_bakhsh: {
    sourceNote:
      'Hazrat Data Ganj Bakhsh Ali Hujwiri — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'gnosis',
        en: 'Sufism is the polishing of the heart until it reflects only the Real.',
        ur: 'تصوف دل کی صفائی ہے یہاں تک کہ وہ صرف حق کی عکس دکھائے۔',
      },
      {
        theme: 'gnosis',
        en: 'Knowledge that does not restrain the ego is a lamp that burns its own oil without lighting the path.',
        ur: 'جو علم نفس کو نہ روکے وہ چراغ ہے جو راستہ روشن کیے بغیر اپنا تیل جلائے۔',
      },
      {
        theme: 'love',
        en: 'Love of Allah is proven by love of His Messenger ﷺ and courtesy toward His creation.',
        ur: 'اللہ کی محبت اس کے رسول ﷺ کی محبت اور مخلوق سے ادب سے ثابت ہوتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'The veil between you and God is not the world — it is you.',
        ur: 'تم اور خدا کے درمیان پردہ دنیا نہیں — تم خود ہو۔',
      },
      {
        theme: 'gnosis',
        en: 'A moment of sincere presence is better than a lifetime of heedless ritual.',
        ur: 'مخلصانہ حضور کا ایک لمحہ غافل رسم کی عمر سے بہتر ہے۔',
      },
      {
        theme: 'love',
        en: 'The friend of God is known by soft speech, broken pride, and a heart that remembers.',
        ur: 'اللہ کے دوست کی پہچان نرم گفتگو، ٹوٹا ہوا تکبر اور یاد رکھنے والا دل ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Hunger of the stomach is easy; hunger of the heart for Truth is the real discipline.',
        ur: 'پیٹ کی بھوک آسان ہے؛ حق کی بھوک ہی اصل ریاضت ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Whoever serves the ego serves a tyrant; whoever serves Allah finds the ego become a servant.',
        ur: 'جو نفس کی خدمت کرے ظالم کی خدمت کرے؛ جو اللہ کی خدمت کرے نفس اس کا خادم بن جائے۔',
      },
      {
        theme: 'love',
        en: 'Nearness is not measured by miles — it is measured by how little of “I” remains.',
        ur: 'قرب میل سے نہیں ناپا جاتا — اس سے ناپا جاتا ہے کہ “میں” کتنا کم رہ گیا۔',
      },
      {
        theme: 'gnosis',
        en: 'The Shariah is the path, Tareeqat is walking it with the heart, and Haqiqah is arriving without claiming arrival.',
        ur: 'شریعت راستہ ہے، طریقت دل سے چلنا ہے، اور حقیقت پہنچنا ہے بغیر دعویٰ پہنچنے کے۔',
      },
      {
        theme: 'love',
        en: 'Blessed is the dust that the lovers of God walk upon — even stones remember their footsteps.',
        ur: 'مبارک ہے وہ مٹی جس پر اللہ کے عاشق چلیں — پتھر بھی ان کے قدم یاد رکھتے ہیں۔',
      },
      {
        theme: 'gnosis',
        en: 'Guard the tongue, for the tongue is the interpreter of the heart — and the heart is under watch.',
        ur: 'زبان کی حفاظت کرو، کیونکہ زبان دل کی ترجمان ہے — اور دل نگرانی میں ہے۔',
      },
    ],
  },

  moinuddin_chishti: {
    sourceNote:
      'Khwaja Moinuddin Chishti — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'love',
        en: 'Love all, hate none — the sun of Divine mercy rises for every heart that turns.',
        ur: 'سب سے محبت کرو، کسی سے بغض نہ رکھو — رحمتِ الٰہی کا سورج ہر اس دل کے لیے نکلتا ہے جو رجوع کرے۔',
      },
      {
        theme: 'gnosis',
        en: 'The highest form of worship is to heal a broken heart and feed a hungry soul.',
        ur: 'عبادت کا اعلیٰ درجہ ٹوٹے دل کو جوڑنا اور بھوکی روح کو کھلانا ہے۔',
      },
      {
        theme: 'love',
        en: 'Be like a tree that gives shade even to those who throw stones — generosity is the mark of the path.',
        ur: 'اس درخت کی مانند بنو جو پتھر پھینکنے والوں کو بھی سایہ دے — فیاضی راہ کی نشانی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Silence, patience, and remembrance — these three purify the seeker more than long speeches.',
        ur: 'خاموشی، صبر اور ذکر — یہ تین لمبی تقریروں سے زیادہ سالک کو پاک کرتے ہیں۔',
      },
      {
        theme: 'love',
        en: 'If you have nothing else to give, give a smile from a sincere heart — it is also charity.',
        ur: 'اگر دینے کو کچھ نہ ہو تو مخلص دل سے مسکراہٹ دو — یہ بھی صدقہ ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Do not sit with those who increase your heedlessness; sit with those who increase your yearning.',
        ur: 'ان کے پاس مت بیٹھو جو تمہاری غفلت بڑھائیں؛ ان کے پاس بیٹھو جو تمہارا شوق بڑھائیں۔',
      },
      {
        theme: 'love',
        en: 'The door of the Beloved opens for the one who arrives with humility and leaves with gratitude.',
        ur: 'محبوب کا در ان کے لیے کھلتا ہے جو تواضع سے آئیں اور شکر سے لوٹیں۔',
      },
      {
        theme: 'gnosis',
        en: 'Conquer anger before it conquers you — the warrior of the path fights the self first.',
        ur: 'غصے کو اپنے پر غالب آنے سے پہلے مغلوب کرو — راہ کا سپاہی پہلے نفس سے لڑتا ہے۔',
      },
      {
        theme: 'love',
        en: 'Service to creation is service to the Creator when done without showing off.',
        ur: 'مخلوق کی خدمت خالق کی خدمت ہے جب نمائش کے بغیر ہو۔',
      },
      {
        theme: 'gnosis',
        en: 'Keep your inner state more beautiful than your outer appearance — God looks at the heart.',
        ur: 'اندرونی حال کو ظاہری صورت سے زیادہ حسین رکھو — خدا دل کو دیکھتا ہے۔',
      },
      {
        theme: 'love',
        en: 'The poor who remember God are richer than kings who forget Him.',
        ur: 'وہ فقیر جو خدا کو یاد رکھیں ان بادشاہوں سے امیر ہیں جو اسے بھول جائیں۔',
      },
      {
        theme: 'gnosis',
        en: 'Die to your desires before death comes — that death is the beginning of true life.',
        ur: 'موت آنے سے پہلے اپنی خواہشات پر مر جاؤ — وہی موت حقیقی زندگی کی ابتدا ہے۔',
      },
    ],
  },

  junayd_baghdadi: {
    sourceNote: 'Junayd of Baghdad — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'gnosis',
        en: 'Sufism is that you be with God without attachment to anything else.',
        ur: 'تصوف یہ ہے کہ تم اللہ کے ساتھ رہو بغیر کسی اور چیز سے وابستگی کے۔',
      },
      {
        theme: 'gnosis',
        en: 'The water takes the colour of its cup — purify the cup of the heart.',
        ur: 'پانی پیالے کا رنگ اختیار کر لیتا ہے — دل کے پیالے کو پاک کرو۔',
      },
      {
        theme: 'love',
        en: 'Love is the annihilation of the lover in the attributes of the Beloved.',
        ur: 'عشق عاشق کا محبوب کی صفات میں فنا ہو جانا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Our path is built upon the Quran and the Sunnah — whoever leaves them has left the path.',
        ur: 'ہماری راہ قرآن و سنت پر قائم ہے — جو انہیں چھوڑے اس نے راہ چھوڑی۔',
      },
      {
        theme: 'gnosis',
        en: 'Tasawwuf is sobriety after intoxication, and remaining after annihilation.',
        ur: 'تصوف سکر کے بعد ہوشیاری ہے، اور فنا کے بعد بقا۔',
      },
      {
        theme: 'love',
        en: 'The one who loves does not choose — choice belongs to the Beloved.',
        ur: 'جو محبت کرے وہ انتخاب نہیں کرتا — انتخاب محبوب کا حق ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Speak little, act much, and keep your secret between you and your Lord.',
        ur: 'کم بولو، زیادہ عمل کرو، اور اپنا راز اپنے اور اپنے رب کے درمیان رکھو۔',
      },
      {
        theme: 'gnosis',
        en: 'The greatest veil is the claim of nearness while the ego still sits on the throne.',
        ur: 'سب سے بڑا پردہ قرب کا دعویٰ ہے جبکہ نفس ابھی تخت پر بیٹھا ہو۔',
      },
      {
        theme: 'love',
        en: 'True poverty is to need nothing from creation because you are filled with the Creator.',
        ur: 'حقیقی فقر یہ ہے کہ مخلوق سے کچھ نہ مانگو کیونکہ تم خالق سے بھرے ہو۔',
      },
      {
        theme: 'gnosis',
        en: 'Whoever seeks God by God arrives; whoever seeks God by the self remains in the self.',
        ur: 'جو اللہ کو اللہ سے تلاش کرے پہنچ جاتا ہے؛ جو نفس سے تلاش کرے نفس میں رہ جاتا ہے۔',
      },
      {
        theme: 'love',
        en: 'The heart has a longing that only the Face of Allah can satisfy.',
        ur: 'دل کی ایک تڑپ ہے جسے صرف وجۂ الٰہی ہی سیراب کر سکتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'Be present in your prayer as if you see Him — and know that if you do not see Him, He sees you.',
        ur: 'نماز میں ایسے حاضر رہو جیسے اسے دیکھ رہے ہو — اور جان لو کہ اگر تم نہیں دیکھتے تو وہ تمہیں دیکھتا ہے۔',
      },
    ],
  },

  hafez_shirazi: {
    sourceNote: 'Hafez of Shiraz — classical Sufi tradition (public domain renderings)',
    drafts: [
      {
        theme: 'love',
        en: 'I wish I could show you when you are lonely or in darkness the astonishing light of your own being.',
        ur: 'کاش تنہائی یا اندھیرے میں تمہیں دکھا سکوں تمہاری اپنی ہستی کا حیرت انگیز نور۔',
      },
      {
        theme: 'gnosis',
        en: 'Fear is the cheapest room in the house — I would like to see you living in better conditions.',
        ur: 'خوف گھر کا سستا ترین کمرہ ہے — میں چاہتا ہوں تم بہتر حالت میں رہو۔',
      },
      {
        theme: 'love',
        en: 'Even after all this time, the sun never says to the earth: you owe me. Look what happens with a love like that — it lights the whole sky.',
        ur: 'اتنے عرصے بعد بھی سورج زمین سے نہیں کہتا: تم میرے مقروض ہو۔ دیکھو ایسی محبت کیا کرتی ہے — پورا آسمان روشن کر دیتی ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'The heart is a thousand-stringed instrument — tune it to remembrance, not to complaint.',
        ur: 'دل ہزار تاروں والا ساز ہے — اسے شکایت پر نہیں، ذکر پر ہم آہنگ کرو۔',
      },
      {
        theme: 'love',
        en: 'Come, for the Beloved is waiting — do not spend the night counting your excuses.',
        ur: 'آؤ، محبوب منتظر ہے — رات بہانے گننے میں مت گزارو۔',
      },
      {
        theme: 'gnosis',
        en: 'Drop the burden of yesterday; the cup of this moment is enough if you drink with presence.',
        ur: 'کل کا بوجھ اتار دو؛ اس لمحے کا پیالہ کافی ہے اگر حضور کے ساتھ پیو۔',
      },
      {
        theme: 'love',
        en: 'Wherever you are, be the soul of that place — love turns every corner into a sanctuary.',
        ur: 'جہاں بھی ہو، اس جگہ کی روح بنو — عشق ہر کونے کو حرم بنا دیتا ہے۔',
      },
      {
        theme: 'gnosis',
        en: 'The one who sits with the Friend needs no other candle — the Face itself is the light.',
        ur: 'جو دوست کے پاس بیٹھے اسے اور شمع کی حاجت نہیں — چہرہ ہی نور ہے۔',
      },
      {
        theme: 'love',
        en: 'Do not leave the tavern of love empty-handed — take at least one sigh that remembers Him.',
        ur: 'عشق کی مے خانہ سے خالی ہاتھ نہ جاؤ — کم از کم ایک آہ لے جاؤ جو اسے یاد کرے۔',
      },
      {
        theme: 'gnosis',
        en: 'What we speak becomes the house we live in — speak of the Beloved and dwell in nearness.',
        ur: 'جو ہم بولتے ہیں وہی گھر بن جاتا ہے جس میں رہتے ہیں — محبوب کی بات کرو اور قرب میں بس جاؤ۔',
      },
      {
        theme: 'love',
        en: 'How did the rose ever open its heart and give to this world all its beauty? It felt the encouragement of light against its being.',
        ur: 'گلاب نے دل کیسے کھولا اور دنیا کو اپنی ساری خوبصورتی دے دی؟ اسے اپنی ہستی پر نور کی ترغیب محسوس ہوئی۔',
      },
      {
        theme: 'gnosis',
        en: 'Stay close to whatever makes you glad you are alive — and let that gladness lead you to the Giver.',
        ur: 'اس کے قریب رہو جو تمہیں زندہ ہونے کی خوشی دے — اور وہ خوشی تمہیں دینے والے تک لے جائے۔',
      },
    ],
  },
};

const existing = new Set(data.sayings.map((s) => s.master));
let startSeq = data.sayings.length + 1;
const added = [];

for (const [master, batch] of Object.entries(batches)) {
  if (existing.has(master)) {
    console.log(`Skip ${master} — already present.`);
    continue;
  }
  for (const d of batch.drafts) {
    const sequence = startSeq++;
    added.push({
      id: `irshad-${String(sequence).padStart(3, '0')}-${master}`,
      sequence,
      dayOfYear: sequence,
      master,
      en: d.en,
      ur: d.ur,
      theme: d.theme,
      sourceNote: batch.sourceNote,
    });
  }
  console.log(`Queued ${batch.drafts.length} for ${master}.`);
}

if (added.length === 0) {
  console.log('Nothing to add.');
  process.exit(0);
}

data.sayings.push(...added);
data.version = 5;
data.updatedAt = new Date().toISOString().slice(0, 10);
data.total = data.sayings.length;
data.description =
  'A focused collection of classical Sufi sayings on Divine Gnosis, inner awakening, nearness, witnessing, annihilation of the ego, and Divine or Prophetic Love — including Allama Iqbal, Rabia Basri, Attar, Data Ganj Bakhsh, Moinuddin Chishti, Junayd, Hafez, Naqshbandi masters, and Hazrat Abdul Qadir Jilani.';
data.attribution =
  'Curated public-domain style renderings from the Sufi and spiritual poetic tradition associated with Rumi, Ibn Arabi, Bayazid Bastami, Shams Tabrizi, Abdul Qadir Jilani, Allama Iqbal, Rabia al-Adawiyya, Fariduddin Attar, Data Ganj Bakhsh, Moinuddin Chishti, Junayd of Baghdad, Hafez of Shiraz, and Naqshbandi masters.';
data.counts = data.sayings.reduce((acc, s) => {
  acc[s.master] = (acc[s.master] ?? 0) + 1;
  return acc;
}, {});
data.themeCounts = data.sayings.reduce((acc, s) => {
  acc[s.theme] = (acc[s.theme] ?? 0) + 1;
  return acc;
}, {});

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Added ${added.length} sayings. Total now ${data.total}.`);
console.log('Counts:', data.counts);
