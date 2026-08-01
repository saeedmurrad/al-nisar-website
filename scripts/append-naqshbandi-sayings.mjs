/**
 * Appends Naqshbandi classical sayings to public/assets/classical-irshadat.json
 * Run: node scripts/append-naqshbandi-sayings.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const path = resolve('public/assets/classical-irshadat.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

/** @typedef {{ master: string, theme: 'gnosis'|'love', en: string, ur: string, sourceNote: string }} Draft */

/** @type {Draft[]} */
const drafts = [
  // —— Mujaddid Alf Sani (Imam Rabbani) ——
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'The purpose of the Path is perfect servantship — not claims of union that abandon the Law.',
    ur: 'طریقت کا مقصد کامل بندگی ہے — نہ وہ دعوائے وصلت جو شریعت سے روگردانی کرے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Without the Shariah, tariqat is a deception; with the Shariah, it becomes a light.',
    ur: 'شریعت کے بغیر طریقت دھوکا ہے؛ شریعت کے ساتھ وہ نور بن جاتی ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'True love of Allah is proven by love of His Messenger ﷺ and obedience to his Sunnah.',
    ur: 'اللہ کی سچی محبت اس کے رسول ﷺ کی محبت اور سنت کی پیروی سے ثابت ہوتی ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Stay with your Lord in every breath, and stay with His command in every action.',
    ur: 'ہر سانس میں اپنے رب کے ساتھ رہو، اور ہر عمل میں اس کے حکم کے ساتھ۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'The highest nearness is the nearness of Prophethood — walking the path of the Beloved ﷺ.',
    ur: 'سب سے بلند قرب قربِ نبوت ہے — محبوب ﷺ کے راستے پر چلنا۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'Empty the heart of all but Allah, yet keep the body clothed in the manners of the Sunnah.',
    ur: 'دل کو غیر اللہ سے خالی رکھو، مگر جسم کو سنت کے آداب میں ملبوس رکھو۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'States pass; what remains is sincerity and steadfastness upon the Straight Path.',
    ur: 'احوال گزر جاتے ہیں؛ جو باقی رہتا ہے وہ اخلاص اور صراطِ مستقیم پر استقامت ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Do not seek unveiling for its own sake — seek the pleasure of the One who unveils.',
    ur: 'کشف کو اس کی خاطر مت ڈھونڈو — اس کی رضا ڈھونڈو جو پردہ اٹھاتا ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'The heart that remembers Allah in the marketplace is more precious than the heart that sleeps in solitude.',
    ur: 'بازار میں اللہ کو یاد رکھنے والا دل خلوت میں سوئے ہوئے دل سے زیادہ قیمتی ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Reform begins within: when the inner self is sound, the outer deeds become sound.',
    ur: 'اصلاح اندر سے شروع ہوتی ہے: باطن درست ہو تو ظاہری اعمال درست ہو جاتے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Hold fast to the community of the Sunnah; innovation dressed as spirituality is still innovation.',
    ur: 'سنت کی جماعت کو مضبوطی سے تھامو؛ روحانیت کے لباس میں بدعت پھر بھی بدعت ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'Grief for the sake of Allah softens the heart; grief for the world hardens it.',
    ur: 'اللہ کے لیے غم دل کو نرم کرتا ہے؛ دنیا کا غم اسے سخت کر دیتا ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Knowledge without practice is a burden; practice without sincerity is a veil.',
    ur: 'عمل کے بغیر علم بوجھ ہے؛ اخلاص کے بغیر عمل پردہ ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'The seeker who corrects one habit of the ego advances farther than one who travels many deserts.',
    ur: 'جو طالب نفس کی ایک عادت درست کرے وہ اس سے آگے بڑھتا ہے جو بہت سے صحرا طے کرے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'Love that does not increase reverence for the Sacred Law is incomplete.',
    ur: 'وہ محبت ادھوری ہے جو شریعت کی تعظیم نہ بڑھائے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Be present with Allah while your hands serve His creation — this is the way of the truthful.',
    ur: 'اللہ کے ساتھ حاضر رہو جبکہ ہاتھ اس کی مخلوق کی خدمت میں ہوں — یہی راستِ صادقین ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Humility after a spiritual opening is a greater gift than the opening itself.',
    ur: 'روحانی فتح کے بعد عاجزی خود اس فتح سے بڑی نعمت ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'love',
    en: 'Ask Allah for a heart that loves what He loves and turns from what He dislikes.',
    ur: 'اللہ سے ایسا دل مانگو جو اسے محبوب رکھے جو وہ پسند کرے، اور اس سے پھرے جو وہ ناپسند کرے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'The renewal of faith in every age begins with returning hearts to the Prophetic pattern.',
    ur: 'ہر دور میں تجدیدِ ایمان دلوں کو نبوی نمونہ کی طرف لوٹانے سے شروع ہوتی ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'mujaddid_alf_sani',
    theme: 'gnosis',
    en: 'Guard the prayer; it is the pillar that keeps the house of the heart standing.',
    ur: 'نماز کی حفاظت کرو؛ یہی ستون ہے جو دل کے گھر کو کھڑا رکھتا ہے۔',
    sourceNote: 'Mujaddid Alf Sani — classical Naqshbandi tradition (public domain renderings)',
  },

  // —— Bahauddin Naqshband ——
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Heart with the Friend, hands at work.',
    ur: 'دل یار کے ساتھ، ہاتھ کام میں۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Solitude in the crowd: be alone with Allah while among the people.',
    ur: 'خلوت در انجمن: لوگوں میں رہتے ہوئے اللہ کے ساتھ تنہا رہو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Travel in your homeland: leave the bad traits of the self while your feet stay where you are.',
    ur: 'سفر در وطن: پاؤں وہیں رہیں، مگر نفس کی بری خصلتوں سے سفر کرو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Watch your step — every glance and every step either gathers you or scatters you.',
    ur: 'نظر بر قدم — ہر نگاہ اور ہر قدم یا تمہیں سمیٹتا ہے یا بکھیرتا ہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'Remember Him until remembrance itself becomes your breath.',
    ur: 'اسے یاد کرو یہاں تک کہ خود یاد تمہارا سانس بن جائے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Return again and again from heedlessness to presence — this returning is the Path.',
    ur: 'غفلت سے حاضری کی طرف بار بار لوٹو — یہی لوٹنا طریقت ہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Keep watch over your heart as a shepherd watches his flock.',
    ur: 'اپنے دل کی نگرانی ایسے کرو جیسے چرواہا اپنے ریوڑ کی۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'The silent remembrance of the heart is louder in the heavens than the loudest tongue.',
    ur: 'دل کا خاموش ذکر آسمانوں میں بلند ترین زبان سے زیادہ سنا جاتا ہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Do not display your spiritual state; display only good character and correct action.',
    ur: 'اپنا روحانی حال ظاہر نہ کرو؛ صرف اچھے اخلاق اور درست عمل ظاہر کرو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Awareness before every breath — that you are before your Lord.',
    ur: 'ہر سانس سے پہلے آگاہی — کہ تم اپنے رب کے سامنے ہو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'Love is proven when the heart remains with Allah while the world pulls in every direction.',
    ur: 'محبت تب ثابت ہوتی ہے جب دنیا ہر طرف کھینچے اور دل اللہ کے ساتھ قائم رہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Our way is conversation in outward life and solitude in the inward.',
    ur: 'ہمارا طریق ظاہر میں گفتگو اور باطن میں خلوت ہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Hold the tongue, watch the eye, and keep the heart awake.',
    ur: 'زبان تھامو، آنکھ کی نگہبانی کرو، اور دل کو بیدار رکھو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'Whoever finds Allah finds everything; whoever misses Allah finds nothing lasting.',
    ur: 'جسے اللہ مل گیا اسے سب کچھ مل گیا؛ جو اللہ سے رہ گیا اسے کچھ پائدار نہ ملا۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'The Path is short for the sincere and long for the heedless.',
    ur: 'راہ مخلص کے لیے مختصر ہے اور غافل کے لیے لمبی۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Sit where remembrance increases, and leave where the heart grows hard.',
    ur: 'وہاں بیٹھو جہاں ذکر بڑھے، اور وہاں سے اٹھو جہاں دل سخت ہو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'Be a servant among people and a lover in the presence of your Lord.',
    ur: 'لوگوں میں بندہ بنو اور اپنے رب کی بارگاہ میں عاشق۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Presence is not a moment of feeling — it is a continuous courtesy with Allah.',
    ur: 'حاضری محض احساس کا لمحہ نہیں — اللہ کے ساتھ مسلسل ادب ہے۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'gnosis',
    en: 'Begin every act with His Name, and end every act with gratitude.',
    ur: 'ہر کام اس کے نام سے شروع کرو، اور ہر کام شکر پر ختم کرو۔',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'bahauddin_naqshband',
    theme: 'love',
    en: 'The Friend is nearer than your jugular vein — so why wander far in search?',
    ur: 'دوست رگِ گردن سے بھی قریب ہے — پھر دور کیوں بھٹکتے ہو؟',
    sourceNote: 'Bahauddin Naqshband — classical Naqshbandi tradition (public domain renderings)',
  },

  // —— Abdul Khaliq Ghujdawani ——
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Remember Allah with the heart, not only with the tongue.',
    ur: 'اللہ کو صرف زبان سے نہیں، دل سے یاد کرو۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Silent dhikr polishes the heart without announcing your state to the world.',
    ur: 'خاموش ذکر دل کو جلا دیتا ہے بغیر اس کے کہ تمہارا حال دنیا کو سناو۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Be with the people outwardly and with your Lord inwardly.',
    ur: 'ظاہر میں لوگوں کے ساتھ رہو اور باطن میں اپنے رب کے ساتھ۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'love',
    en: 'Let every breath return you to the One who gave you breath.',
    ur: 'ہر سانس تمہیں اس کی طرف لوٹائے جس نے تمہیں سانس دی۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Restraint of the glance protects the light of the heart.',
    ur: 'نظر کی حفاظت دل کے نور کی حفاظت ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'The principles of the Path are few; living them sincerely is the whole journey.',
    ur: 'طریقت کے اصول کم ہیں؛ انہیں خلوص سے جینا ہی پورا سفر ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'When the heart is occupied with Allah, the limbs find ease in obedience.',
    ur: 'جب دل اللہ میں مشغول ہو تو اعضاء اطاعت میں آسان ہو جاتے ہیں۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'love',
    en: 'Love grows where remembrance is constant and the ego is quiet.',
    ur: 'محبت وہاں بڑھتی ہے جہاں ذکر دائم ہو اور نفس خاموش۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Do not leave your work for the Path — bring the Path into your work.',
    ur: 'طریقت کے لیے کام نہ چھوڑو — طریقت کو اپنے کام میں لاؤ۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Awareness of the self’s faults is the beginning of its healing.',
    ur: 'نفس کے عیوب کی آگاہی ہی اس کی شفا کی ابتدا ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Keep your intention pure; actions follow the colour of the intention.',
    ur: 'نیت پاک رکھو؛ عمل نیت کا رنگ اختیار کر لیتے ہیں۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'love',
    en: 'The Beloved is found in the quiet of a remembering heart.',
    ur: 'محبوب یاد کرنے والے دل کی خاموشی میں ملتا ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Speak little, remember much, and leave what does not concern you.',
    ur: 'کم بولو، زیادہ یاد کرو، اور جو تم سے متعلق نہیں اسے چھوڑ دو۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'The Path of the Naqshbandiyya is presence without pretence.',
    ur: 'نقشبندیہ کا راستہ بناوٹ کے بغیر حاضری ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'love',
    en: 'Let gratitude be your companion when the heart feels near, and patience when it feels far.',
    ur: 'قرب میں شکر کو ساتھی بناؤ، اور بُعد میں صبر کو۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Correct the heart first; then the tongue will speak with light.',
    ur: 'پہلے دل درست کرو؛ پھر زبان نور سے بولے گی۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Heedlessness is the real exile; remembrance is the return home.',
    ur: 'غفلت اصل جلاوطنی ہے؛ ذکر وطن کی طرف لوٹنا ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'love',
    en: 'Serve creation for the sake of the Creator, and love will settle in you.',
    ur: 'خالق کی خاطر مخلوق کی خدمت کرو، محبت تم میں ٹک جائے گی۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'A single sincere moment of presence outweighs years of empty form.',
    ur: 'حاضری کا ایک مخلص لمحہ خالی رسم کے برسوں پر بھاری ہے۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'abdul_khaliq_ghujdawani',
    theme: 'gnosis',
    en: 'Walk gently upon the earth, and keep your secret with your Lord.',
    ur: 'زمین پر نرمی سے چلو، اور اپنا راز اپنے رب کے پاس رکھو۔',
    sourceNote: 'Abdul Khaliq Ghujdawani — classical Naqshbandi tradition (public domain renderings)',
  },

  // —— Baqi Billah ——
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Remain with Allah, and you will remain forever — for He alone remains.',
    ur: 'اللہ کے ساتھ رہو تو ہمیشہ رہو گے — کیونکہ باقی صرف وہی ہے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'The foundation of this Path is adherence to the Book and the Sunnah.',
    ur: 'اس طریقت کی بنیاد کتاب و سنت پر استقامت ہے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Whoever loves the Messenger ﷺ is drawn to the company of the truthful.',
    ur: 'جو رسول ﷺ سے محبت رکھے اسے صادقین کی صحبت کھینچ لیتی ہے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Silence the claims of the self, and the heart will hear the call of guidance.',
    ur: 'نفس کے دعوے خاموش کرو، دل ہدایت کی پکار سنے گا۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Company of the righteous is a medicine; company of the heedless is a disease.',
    ur: 'صالحین کی صحبت دوا ہے؛ غافلین کی صحبت بیماری۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Seek a guide who binds you to the Law, not one who loosens you from it.',
    ur: 'ایسا مرشد ڈھونڈو جو تمہیں شریعت سے باندھے، نہ جو اس سے ڈھیلا کرے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Divine love settles where arrogance has been broken.',
    ur: 'الٰہی محبت وہاں اترتی ہے جہاں تکبر ٹوٹ چکا ہو۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Guard your times of prayer as you would guard a treasure.',
    ur: 'نماز کے اوقات کی حفاظت ایسے کرو جیسے خزانے کی۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'The world is a bridge — cross it, but do not build your house upon it.',
    ur: 'دنیا پل ہے — عبور کرو، مگر اس پر گھر نہ بناؤ۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Let your tears for Allah wash what your words cannot cleanse.',
    ur: 'اللہ کے لیے آنسو بہاؤ جو تمہارے الفاظ صاف نہیں کر سکتے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'A heart connected to Allah fears sin more than it fears people.',
    ur: 'اللہ سے جڑا دل لوگوں سے زیادہ گناہ سے ڈرتا ہے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Renew your repentance often; the door of return is never closed to the sincere.',
    ur: 'توبہ بار بار کرو؛ مخلص کے لیے لوٹنے کا دروازہ کبھی بند نہیں ہوتا۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Do not trust a spiritual state that makes you neglect an obligatory duty.',
    ur: 'اس روحانی حال پر بھروسہ نہ کرو جو فرض سے غافل کر دے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Nearness is a trust — protect it with humility and good manners.',
    ur: 'قرب ایک امانت ہے — اسے عاجزی اور حسنِ ادب سے محفوظ رکھو۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'The Naqshbandi way trains the heart in remembrance while the hands remain in service.',
    ur: 'نقشبندی طریق دل کو ذکر کی تربیت دیتا ہے جبکہ ہاتھ خدمت میں رہتے ہیں۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Ask for steadfastness more than you ask for unveiling.',
    ur: 'کشف سے زیادہ استقامت مانگو۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Love of the saints is love of the path they walked — the path of the Prophet ﷺ.',
    ur: 'اولیاء کی محبت اس راستے کی محبت ہے جس پر وہ چلے — راستۂ رسول ﷺ۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'When the ego is subdued, even a little remembrance becomes a great light.',
    ur: 'جب نفس مغلوب ہو تو تھوڑا ذکر بھی بڑا نور بن جاتا ہے۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'gnosis',
    en: 'Prefer the company that reminds you of Allah over the company that entertains you.',
    ur: 'اس صحبت کو ترجیح دو جو اللہ یاد دلاتی ہو، نہ جو صرف دل بہلاتی ہو۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
  {
    master: 'baqi_billah',
    theme: 'love',
    en: 'Die before you die — leave the claims of the self, and live by His remembrance.',
    ur: 'مرنے سے پہلے مر جاؤ — نفس کے دعوے چھوڑ دو، اور اس کے ذکر سے زندہ رہو۔',
    sourceNote: 'Baqi Billah — classical Naqshbandi tradition (public domain renderings)',
  },
];

const startSeq = data.sayings.length + 1;
const existingMasters = new Set(data.sayings.map((s) => s.master));
for (const m of ['mujaddid_alf_sani', 'bahauddin_naqshband', 'abdul_khaliq_ghujdawani', 'baqi_billah']) {
  if (existingMasters.has(m)) {
    console.error(`Master ${m} already present — aborting to avoid duplicates.`);
    process.exit(1);
  }
}

const added = drafts.map((d, i) => {
  const sequence = startSeq + i;
  const dayOfYear = sequence;
  const short = d.master.replace(/_/g, '-');
  return {
    id: `irshad-${String(sequence).padStart(3, '0')}-${d.master}`,
    sequence,
    dayOfYear,
    master: d.master,
    en: d.en,
    ur: d.ur,
    theme: d.theme,
    sourceNote: d.sourceNote,
  };
});

data.sayings.push(...added);
data.version = 3;
data.updatedAt = '2026-08-01';
data.total = data.sayings.length;
data.description =
  'A focused collection of classical Sufi sayings on Divine Gnosis, inner awakening, nearness, witnessing, annihilation of the ego, and Divine or Prophetic Love — including Naqshbandi masters.';
data.attribution =
  'Curated public-domain renderings from the classical Sufi tradition associated with Rumi, Ibn Arabi, Bayazid Bastami, Shams Tabrizi, and Naqshbandi masters including Mujaddid Alf Sani, Bahauddin Naqshband, Abdul Khaliq Ghujdawani, and Baqi Billah.';
data.counts = data.sayings.reduce((acc, s) => {
  acc[s.master] = (acc[s.master] ?? 0) + 1;
  return acc;
}, {});
data.themeCounts = data.sayings.reduce((acc, s) => {
  acc[s.theme] = (acc[s.theme] ?? 0) + 1;
  return acc;
}, {});

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Added ${added.length} sayings. Total now ${data.total}. Counts:`, data.counts);
