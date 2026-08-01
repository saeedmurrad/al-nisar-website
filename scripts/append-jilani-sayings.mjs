/**
 * Appends Hazrat Abdul Qadir Jilani sayings to classical-irshadat.json
 * Run: node scripts/append-jilani-sayings.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const path = resolve('public/assets/classical-irshadat.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

const master = 'abdul_qadir_jilani';
if (data.sayings.some((s) => s.master === master)) {
  console.error('Abdul Qadir Jilani already present — aborting.');
  process.exit(1);
}

const sourceNote =
  'Abdul Qadir Jilani — classical Sufi tradition (public domain renderings)';

const drafts = [
  {
    theme: 'gnosis',
    en: 'Close the door of heedlessness, and open the door of remembrance.',
    ur: 'غفلت کا دروازہ بند کرو، اور ذکر کا دروازہ کھولو۔',
  },
  {
    theme: 'love',
    en: 'Love Allah with a love that keeps you from everything that displeases Him.',
    ur: 'اللہ سے ایسی محبت رکھو جو تمہیں اس کی ناپسندیدہ چیزوں سے روک دے۔',
  },
  {
    theme: 'gnosis',
    en: 'Be with the Truth, and the Truth will be with you.',
    ur: 'حق کے ساتھ رہو، حق تمہارے ساتھ رہے گا۔',
  },
  {
    theme: 'gnosis',
    en: 'The heart that is empty of the world becomes a throne for Divine light.',
    ur: 'جو دل دنیا سے خالی ہو وہ الٰہی نور کا تخت بن جاتا ہے۔',
  },
  {
    theme: 'love',
    en: 'Whoever tastes the sweetness of faith finds the bitterness of sin unbearable.',
    ur: 'جس نے ایمان کی مٹھاس چکھ لی، گناہ کی تلخی اسے برداشت نہیں ہوتی۔',
  },
  {
    theme: 'gnosis',
    en: 'Do not seek rank among people — seek nearness to your Lord.',
    ur: 'لوگوں میں مرتبہ مت ڈھونڈو — اپنے رب کا قرب ڈھونڈو۔',
  },
  {
    theme: 'gnosis',
    en: 'Patience is the key to relief, and gratitude is the key to increase.',
    ur: 'صبر فرج کی کنجی ہے، اور شکر زیادتی کی کنجی۔',
  },
  {
    theme: 'love',
    en: 'When the heart loves Allah, every trial becomes a gift in disguise.',
    ur: 'جب دل اللہ سے محبت کرے تو ہر آزمائش پوشیدہ تحفہ بن جاتی ہے۔',
  },
  {
    theme: 'gnosis',
    en: 'Leave what distracts you from Allah, even if it appears beautiful.',
    ur: 'جو چیز تمہیں اللہ سے غافل کرے اسے چھوڑ دو، چاہے وہ خوبصورت دکھے۔',
  },
  {
    theme: 'gnosis',
    en: 'The servant is closest to Allah when he is most broken before Him.',
    ur: 'بندہ اللہ کے سب سے قریب تب ہوتا ہے جب اس کے سامنے سب سے زیادہ ٹوٹا ہو۔',
  },
  {
    theme: 'love',
    en: 'True love is obedience — the tongue of love is the practice of the Sunnah.',
    ur: 'سچی محبت اطاعت ہے — محبت کی زبان سنت پر عمل ہے۔',
  },
  {
    theme: 'gnosis',
    en: 'Guard your heart as you guard your prayer; both are trusts from Allah.',
    ur: 'دل کی حفاظت ایسے کرو جیسے نماز کی؛ دونوں اللہ کی امانت ہیں۔',
  },
  {
    theme: 'gnosis',
    en: 'Fear of Allah is the beginning of wisdom, and hope in Him is the wing of journey.',
    ur: 'خوفِ الٰہی حکمت کی ابتدا ہے، اور اس کی امید سفر کا پر ہے۔',
  },
  {
    theme: 'love',
    en: 'Ask Him with the hunger of the needy, and thank Him with the joy of the given.',
    ur: 'اس سے محتاج کی بھوک سے مانگو، اور دیے گئے کی خوشی سے شکر کرو۔',
  },
  {
    theme: 'gnosis',
    en: 'The world is a resting place for a traveler — do not unpack as if you will stay forever.',
    ur: 'دنیا مسافر کی قیام گاہ ہے — ایسا سامان نہ کھولو جیسے ہمیشہ رہو گے۔',
  },
  {
    theme: 'gnosis',
    en: 'Silence is an adornment for the wise and a covering for the foolish.',
    ur: 'خاموشی دانا کے لیے زینت ہے اور نادان کے لیے پردہ۔',
  },
  {
    theme: 'love',
    en: 'Let your tears water the garden of repentance until roses of nearness bloom.',
    ur: 'اپنے آنسوؤں سے توبہ کی باغچے کو سیراب کرو تاکہ قرب کے گلاب کھلیں۔',
  },
  {
    theme: 'gnosis',
    en: 'Whoever knows Allah finds creation small, and whoever knows himself finds arrogance gone.',
    ur: 'جس نے اللہ کو پہچانا مخلوق اس کے نزدیک چھوٹی ہو گئی، اور جس نے اپنے آپ کو پہچانا تکبر جاتا رہا۔',
  },
  {
    theme: 'gnosis',
    en: 'Hold fast to the rope of Allah, and do not scatter into the desires of the self.',
    ur: 'اللہ کی رسی مضبوطی سے تھامو، اور نفس کی خواہشات میں نہ بکھرو۔',
  },
  {
    theme: 'love',
    en: 'The Beloved is enough for the one who has found Him — what remains is only courtesy and gratitude.',
    ur: 'جسے محبوب مل گیا اسے وہی کافی ہے — باقی صرف ادب اور شکر رہ جاتا ہے۔',
  },
];

const startSeq = data.sayings.length + 1;
const added = drafts.map((d, i) => {
  const sequence = startSeq + i;
  return {
    id: `irshad-${String(sequence).padStart(3, '0')}-${master}`,
    sequence,
    dayOfYear: sequence,
    master,
    en: d.en,
    ur: d.ur,
    theme: d.theme,
    sourceNote,
  };
});

data.sayings.push(...added);
data.version = 4;
data.updatedAt = '2026-08-01';
data.total = data.sayings.length;
data.description =
  'A focused collection of classical Sufi sayings on Divine Gnosis, inner awakening, nearness, witnessing, annihilation of the ego, and Divine or Prophetic Love — including Naqshbandi masters and Hazrat Abdul Qadir Jilani.';
data.attribution =
  'Curated public-domain renderings from the classical Sufi tradition associated with Rumi, Ibn Arabi, Bayazid Bastami, Shams Tabrizi, Abdul Qadir Jilani, and Naqshbandi masters including Mujaddid Alf Sani, Bahauddin Naqshband, Abdul Khaliq Ghujdawani, and Baqi Billah.';
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
