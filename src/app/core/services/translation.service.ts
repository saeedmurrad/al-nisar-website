import { Injectable, computed, signal } from '@angular/core';
import { Lang } from '../../models/content.models';

type DictKey =
  | 'nav.home'
  | 'nav.irshadat'
  | 'nav.classicalIrshadat'
  | 'nav.faq'
  | 'nav.shajra'
  | 'nav.gallery'
  | 'nav.videos'
  | 'nav.books'
  | 'nav.listen'
  | 'nav.events'
  | 'nav.bayat'
  | 'nav.search'
  | 'nav.group.teachings'
  | 'nav.group.path'
  | 'nav.group.media'
  | 'nav.memberPortal'
  | 'nav.menu'
  | 'nav.close'
  | 'faq.title'
  | 'faq.subtitle'
  | 'faq.sourceNote'
  | 'faq.exploreIrshadat'
  | 'faq.category.bayat'
  | 'faq.category.tareeqat'
  | 'faq.category.worship'
  | 'faq.category.love'
  | 'faq.category.path'
  | 'faq.category.character'
  | 'home.dailyIrshad'
  | 'home.dailyClassical'
  | 'home.browseClassical'
  | 'home.assalat'
  | 'home.assalatEn'
  | 'home.readMore'
  | 'home.viewGallery'
  | 'home.quickLinks'
  | 'home.appPromoTitle'
  | 'home.appPromoBody'
  | 'home.getApp'
  | 'home.exploreIrshadat'
  | 'home.exploreClassical'
  | 'home.exploreShajra'
  | 'home.exploreGallery'
  | 'home.exploreVideos'
  | 'home.exploreBooks'
  | 'home.exploreListen'
  | 'home.exploreEvents'
  | 'home.shareImage'
  | 'classical.title'
  | 'classical.subtitle'
  | 'classical.today'
  | 'classical.search'
  | 'classical.all'
  | 'classical.empty'
  | 'classical.day'
  | 'classical.attributionNote'
  | 'classical.master.rumi'
  | 'classical.master.ibn_arabi'
  | 'classical.master.bastami'
  | 'classical.master.shams_tabrizi'
  | 'books.title'
  | 'books.subtitle'
  | 'books.search'
  | 'books.empty'
  | 'books.read'
  | 'books.pages'
  | 'books.back'
  | 'books.openTab'
  | 'books.download'
  | 'books.notFound'
  | 'books.viewerHint'
  | 'books.tryAltViewer'
  | 'books.tryNative'
  | 'connect.title'
  | 'connect.subtitle'
  | 'connect.visitUs'
  | 'connect.visitHint'
  | 'connect.facebook'
  | 'connect.youtube'
  | 'connect.visitFacebook'
  | 'connect.visitYoutube'
  | 'connect.watchVideos'
  | 'contact.call'
  | 'contact.whatsapp'
  | 'contact.directions'
  | 'contact.phone'
  | 'contact.address'
  | 'contact.formTitle'
  | 'contact.formIntro'
  | 'contact.name'
  | 'contact.email'
  | 'contact.message'
  | 'contact.send'
  | 'contact.formNote'
  | 'videos.title'
  | 'videos.subtitle'
  | 'videos.latest'
  | 'videos.watchOnYoutube'
  | 'videos.openChannel'
  | 'videos.facebookLatest'
  | 'videos.facebookHint'
  | 'listen.title'
  | 'listen.subtitle'
  | 'listen.kashfHint'
  | 'listen.nowPlaying'
  | 'listen.episodes'
  | 'listen.part'
  | 'listen.previous'
  | 'listen.play'
  | 'listen.next'
  | 'listen.watchOnYoutube'
  | 'listen.unavailable'
  | 'events.title'
  | 'events.subtitle'
  | 'events.upcoming'
  | 'events.past'
  | 'events.noUpcoming'
  | 'events.contactHint'
  | 'events.openLink'
  | 'events.learnMore'
  | 'events.type.mahfil'
  | 'events.type.bayat'
  | 'events.type.urs'
  | 'events.type.live'
  | 'events.type.other'
  | 'bayat.title'
  | 'bayat.subtitle'
  | 'bayat.questions'
  | 'bayat.allFaq'
  | 'bayat.visitTitle'
  | 'bayat.askQuestion'
  | 'search.title'
  | 'search.subtitle'
  | 'search.placeholder'
  | 'search.empty'
  | 'search.section.irshad'
  | 'search.section.faq'
  | 'search.section.book'
  | 'search.section.classical'
  | 'irshadat.title'
  | 'irshadat.subtitle'
  | 'irshadat.search'
  | 'irshadat.all'
  | 'irshadat.copy'
  | 'irshadat.copied'
  | 'irshadat.share'
  | 'irshadat.empty'
  | 'shajra.title'
  | 'shajra.subtitle'
  | 'shajra.order'
  | 'shajra.tapDetails'
  | 'shajra.readEnglish'
  | 'shajra.viewUrduPdf'
  | 'shajra.hideDetails'
  | 'gallery.title'
  | 'gallery.subtitle'
  | 'gallery.all'
  | 'gallery.close'
  | 'login.title'
  | 'login.subtitle'
  | 'login.email'
  | 'login.password'
  | 'login.submit'
  | 'login.signingIn'
  | 'login.success'
  | 'login.or'
  | 'login.google'
  | 'login.membersOnly'
  | 'login.emailRequired'
  | 'login.emailInvalid'
  | 'login.passwordRequired'
  | 'login.passwordMin'
  | 'footer.tagline'
  | 'footer.rights'
  | 'common.loading'
  | 'common.error'
  | 'consent.title'
  | 'consent.message'
  | 'consent.accept'
  | 'consent.decline';

const DICTIONARY: Record<Lang, Record<DictKey, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.irshadat': 'Irshadat',
    'nav.classicalIrshadat': 'Sufi Sayings',
    'nav.faq': 'FAQ',
    'nav.shajra': 'Shajra Pak',
    'nav.gallery': 'Gallery',
    'nav.videos': 'Videos',
    'nav.books': 'Books',
    'nav.listen': 'Listen',
    'nav.events': 'Events',
    'nav.bayat': 'Bayat',
    'nav.search': 'Search',
    'nav.group.teachings': 'Teachings',
    'nav.group.path': 'The Path',
    'nav.group.media': 'Media',
    'nav.memberPortal': 'Member Portal',
    'nav.menu': 'Open menu',
    'nav.close': 'Close menu',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle':
      'Answers drawn from selected teachings of Sufi Nisar Ahmad — Bayat, Tareeqat, worship, love, the spiritual path, and character.',
    'faq.sourceNote': 'Answers are taken from the Irshadat of Sufi Nisar Ahmad.',
    'faq.exploreIrshadat': 'Explore all teachings',
    'faq.category.bayat': 'Bayat & Spiritual Allegiance',
    'faq.category.tareeqat': 'Tareeqat & the Spiritual Path',
    'faq.category.worship': 'Worship & Servitude',
    'faq.category.love': 'Love, Nearness & Success',
    'faq.category.path': 'Spiritual Path & Annihilation',
    'faq.category.character': 'Character, Trials & Guidance',
    'home.dailyIrshad': 'Daily Blessed Saying',
    'home.dailyClassical': 'Daily Sufi Saying — Gnosis & Love',
    'home.browseClassical': 'Browse all Sufi sayings',
    'home.assalat': 'اَلصَّلٰوةُ وَالسَّلَامُ عَلَيْكَ يَا سَيِّدِى يَا رَسُوْلَ اللّٰه',
    'home.assalatEn':
      'May endless peace & blessings be upon you, our Master, O Beloved Messenger of Allah',
    'home.readMore': 'Read more teachings',
    'home.viewGallery': 'View gallery',
    'home.quickLinks': 'Explore the Path',
    'home.appPromoTitle': 'AL Nisar on Android',
    'home.appPromoBody':
      'Carry the teachings with you. Daily Irshad, books, lineage, and community updates — all in one calm companion app.',
    'home.getApp': 'Get it on Google Play',
    'home.exploreIrshadat': 'Browse teachings of Sufi Nisar Ahmad in Urdu and English.',
    'home.exploreClassical': 'Selected Sufi sayings on Divine Gnosis and Love.',
    'home.exploreShajra': 'Discover the sacred spiritual lineage (Silsila).',
    'home.exploreGallery': 'A peaceful collection of moments from the path.',
    'home.exploreVideos': 'Watch Irshadat-e-Aalia and Naats Sharif from YouTube and Facebook.',
    'home.exploreBooks': 'Read blessed books of Sufi Nisar Ahmad as PDFs.',
    'home.exploreListen': 'Listen to Kashaf ul Mahjoob bayan episodes — stream on the go.',
    'home.exploreEvents': 'Upcoming mahafil, Bayat sessions, and live gatherings in Burewala and online.',
    'home.shareImage': 'Share image',
    'classical.title': 'Sufi Sayings',
    'classical.subtitle':
      'Selected teachings on Divine Gnosis and Love from Rumi, Ibn Arabi, Bayazid Bastami, and Shams Tabrizi.',
    'classical.today': "Today's Saying",
    'classical.search': 'Search sayings in Urdu or English…',
    'classical.all': 'All',
    'classical.empty': 'No sayings match your search.',
    'classical.day': 'Saying',
    'classical.attributionNote':
      'A focused collection on inner knowledge, nearness, witnessing, annihilation of the ego, and Divine or Prophetic Love.',
    'classical.master.rumi': 'Maulana Rumi',
    'classical.master.ibn_arabi': 'Ibn Arabi',
    'classical.master.bastami': 'Bayazid Bastami',
    'classical.master.shams_tabrizi': 'Shams Tabrizi',
    'books.title': 'Books',
    'books.subtitle': 'Blessed books of Sufi Nisar Ahmad — open to all, free to read in the browser.',
    'books.search': 'Search by title or author…',
    'books.empty': 'No books match your search.',
    'books.read': 'Read PDF',
    'books.pages': 'pages',
    'books.back': 'All books',
    'books.openTab': 'Open in new tab',
    'books.download': 'Download',
    'books.notFound': 'This book could not be found.',
    'books.viewerHint': 'PDF not showing?',
    'books.tryAltViewer': 'Try alternate viewer',
    'books.tryNative': 'Use built-in PDF viewer',
    'connect.title': 'Connect With Us',
    'connect.subtitle':
      'Visit Saeen G in Burewala Sharif, call for guidance, or follow online for live sessions and new uploads.',
    'connect.visitUs': 'Visit Saeen G',
    'connect.visitHint': 'Spiritual centre in Burewala Sharif, Punjab',
    'connect.facebook': 'Facebook Page',
    'connect.youtube': 'YouTube Channel',
    'connect.visitFacebook': 'Visit Facebook Page',
    'connect.visitYoutube': 'Visit YouTube Channel',
    'connect.watchVideos': 'Watch latest videos',
    'contact.call': 'Call',
    'contact.whatsapp': 'WhatsApp',
    'contact.directions': 'Get directions',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.formTitle': 'Ask a Question',
    'contact.formIntro': 'Send your question or message. It will be delivered by email.',
    'contact.name': 'Your name',
    'contact.email': 'Email address',
    'contact.message': 'Question or message',
    'contact.send': 'Send message',
    'contact.formNote': 'Messages are sent to the official contact email for follow-up.',
    'videos.title': 'Videos',
    'videos.subtitle': 'Irshadat-e-Aalia, Naats Sharif, and blessed gatherings of Sufi Nisar Ahmad — from the official YouTube channel and Facebook page.',
    'videos.latest': 'Latest Videos',
    'videos.watchOnYoutube': 'Watch on YouTube',
    'videos.openChannel': 'Open YouTube Channel',
    'videos.facebookLatest': 'Latest from Facebook',
    'videos.facebookHint': 'Newest posts and videos from the official Facebook page.',
    'listen.title': 'Listen',
    'listen.subtitle':
      'Audio bayan and lecture series — listen in the browser without downloading the app.',
    'listen.kashfHint': '22-part commentary on Kashaf ul Mahjoob by Sufi Nisar Ahmad.',
    'listen.nowPlaying': 'Now playing',
    'listen.episodes': 'Episodes',
    'listen.part': 'Part',
    'listen.previous': 'Previous',
    'listen.play': 'Play',
    'listen.next': 'Next',
    'listen.watchOnYoutube': 'Watch on YouTube',
    'listen.unavailable': 'Audio is not available yet. Please try again later.',
    'events.title': 'Events & Mahafil',
    'events.subtitle': 'Upcoming gatherings, Bayat sessions, Urs, and live sessions — Burewala Sharif and online.',
    'events.upcoming': 'Upcoming',
    'events.past': 'Past events',
    'events.noUpcoming': 'No upcoming events listed yet. Contact us for the latest schedule.',
    'events.contactHint': 'For the latest mahafil times and Bayat appointments, please call or message before travelling.',
    'events.openLink': 'Open link',
    'events.learnMore': 'Learn more',
    'events.type.mahfil': 'Mahfil',
    'events.type.bayat': 'Bayat',
    'events.type.urs': 'Urs',
    'events.type.live': 'Live',
    'events.type.other': 'Event',
    'bayat.title': 'Bayat & the Spiritual Path',
    'bayat.subtitle': 'Guidance for sincere seekers on pledging spiritual allegiance and visiting Burewala Sharif with adab.',
    'bayat.questions': 'Common questions about Bayat',
    'bayat.allFaq': 'Browse all FAQ →',
    'bayat.visitTitle': 'Visit guide — Burewala Sharif',
    'bayat.askQuestion': 'Ask a question',
    'search.title': 'Search',
    'search.subtitle': 'Search Irshadat, FAQ, books, and Sufi sayings in one place.',
    'search.placeholder': 'Search by topic, e.g. fana, ishq, nafs…',
    'search.empty': 'No results found. Try different words in Urdu or English.',
    'search.section.irshad': 'Irshadat',
    'search.section.faq': 'FAQ',
    'search.section.book': 'Books',
    'search.section.classical': 'Sufi Sayings',
    'irshadat.title': 'Irshadat',
    'irshadat.subtitle': 'Teachings of Sufi Nisar Ahmad — open to all, free to read.',
    'irshadat.search': 'Search in Urdu or English…',
    'irshadat.all': 'All',
    'irshadat.copy': 'Copy',
    'irshadat.copied': 'Copied',
    'irshadat.share': 'Share',
    'irshadat.empty': 'No teachings match your search.',
    'shajra.title': 'Shajra Pak',
    'shajra.subtitle': 'The spiritual lineage (Silsila) of Sufi Nisar Ahmad — shared publicly for seekers.',
    'shajra.order': 'Generation',
    'shajra.tapDetails': 'Tap for details',
    'shajra.readEnglish': 'Read details (English)',
    'shajra.viewUrduPdf': 'View Urdu PDF',
    'shajra.hideDetails': 'Hide details',
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Moments of gathering, remembrance, and light.',
    'gallery.all': 'All',
    'gallery.close': 'Close',
    'login.title': 'Member Portal',
    'login.subtitle': 'Sign in for administrative and member-only utilities. Spiritual content remains public.',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'login.signingIn': 'Signing in…',
    'login.success': 'Signed in (simulated). Member tools would appear here.',
    'login.or': 'or continue with',
    'login.google': 'Continue with Google',
    'login.membersOnly': 'For registered members only. Irshadat and Shajra Pak never require login.',
    'login.emailRequired': 'Email is required.',
    'login.emailInvalid': 'Enter a valid email address.',
    'login.passwordRequired': 'Password is required.',
    'login.passwordMin': 'Password must be at least 6 characters.',
    'footer.tagline': 'A calm bilingual companion for seekers on the path.',
    'footer.rights': 'AL-Nisar. Teachings shared for spiritual benefit.',
    'common.loading': 'Loading…',
    'common.error': 'Could not load content. Please check your connection and try again.',
    'consent.title': 'Analytics cookies',
    'consent.message':
      'We use Google Analytics to understand how visitors use this site. Only anonymous usage data is collected — never your name, messages, or personal content.',
    'consent.accept': 'Accept',
    'consent.decline': 'Decline',
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.irshadat': 'ارشادات',
    'nav.classicalIrshadat': 'اقوالِ صوفیاء',
    'nav.faq': 'سوالات',
    'nav.shajra': 'شجرہ پاک',
    'nav.gallery': 'گیلری',
    'nav.videos': 'ویڈیوز',
    'nav.books': 'کتب',
    'nav.listen': 'سنیں',
    'nav.events': 'تقریبات',
    'nav.bayat': 'بیعت',
    'nav.search': 'تلاش',
    'nav.group.teachings': 'تعلیمات',
    'nav.group.path': 'راہِ سلوک',
    'nav.group.media': 'میڈیا',
    'nav.memberPortal': 'ممبر پورٹل',
    'nav.menu': 'مینو کھولیں',
    'nav.close': 'مینو بند کریں',
    'faq.title': 'اکثر پوچھے جانے والے سوالات',
    'faq.subtitle':
      'صوفی نثار احمد کے منتخب ارشادات سے اخذ کردہ جوابات — بیعت، طریقت، عبادت، محبت، راہِ سلوک اور کردار۔',
    'faq.sourceNote': 'جوابات صوفی نثار احمد کے ارشادات سے لیے گئے ہیں۔',
    'faq.exploreIrshadat': 'تمام ارشادات دیکھیں',
    'faq.category.bayat': 'بیعت و روحانی عہد',
    'faq.category.tareeqat': 'طریقت و راہِ سلوک',
    'faq.category.worship': 'عبادت و بندگی',
    'faq.category.love': 'محبت، قرب و کامیابی',
    'faq.category.path': 'راہِ سلوک و فنا',
    'faq.category.character': 'کردار، آزمائش و ہدایت',
    'home.dailyIrshad': 'آج کا فرمانِ مبارک',
    'home.dailyClassical': 'آج کا قولِ صوفیاء — معرفت و محبت',
    'home.browseClassical': 'تمام اقوالِ صوفیاء دیکھیں',
    'home.assalat': 'اَلصَّلٰوةُ وَالسَّلَامُ عَلَيْكَ يَا سَيِّدِى يَا رَسُوْلَ اللّٰه',
    'home.assalatEn':
      'May endless peace & blessings be upon you, our Master, O Beloved Messenger of Allah',
    'home.readMore': 'مزید ارشادات پڑھیں',
    'home.viewGallery': 'گیلری دیکھیں',
    'home.quickLinks': 'راہِ سلوک دریافت کریں',
    'home.appPromoTitle': 'النثار اینڈرائیڈ ایپ',
    'home.appPromoBody':
      'ارشادات ہمیشہ اپنے ساتھ رکھیں۔ روزانہ ارشاد، کتب، شجرہ اور کمیونٹی اپڈیٹس — ایک پرسکون ساتھی ایپ میں۔',
    'home.getApp': 'گوگل پلے پر حاصل کریں',
    'home.exploreIrshadat': 'صوفی نثار احمد کے ارشادات اردو و انگریزی میں پڑھیں۔',
    'home.exploreClassical': 'معرفتِ الٰہی اور محبت پر منتخب اقوالِ صوفیاء۔',
    'home.exploreShajra': 'مقدس روحانی سلسلہ (شجرہ) دیکھیں۔',
    'home.exploreGallery': 'راہِ سلوک کے پرسکون لمحات کی گیلری۔',
    'home.exploreVideos': 'یوٹیوب اور فیس بک سے ارشاداتِ عالیہ اور نعت شریف دیکھیں۔',
    'home.exploreBooks': 'صوفی نثار احمد کی بابرکت کتب پی ڈی ایف میں پڑھیں۔',
    'home.exploreListen': 'کشف المحجوب کے بیانات سنیں — براؤزر میں سٹریم کریں۔',
    'home.exploreEvents': 'آنے والی محافل، بیعت اور لائیو نشستیں — بورے والہ شریف اور آن لائن۔',
    'home.shareImage': 'تصویر شیئر کریں',
    'classical.title': 'اقوالِ صوفیاء',
    'classical.subtitle':
      'مولانا رومی، ابن عربی، بایزید بسطامی اور شمس تبریزی کے معرفتِ الٰہی اور محبت پر منتخب اقوال۔',
    'classical.today': 'آج کا قول',
    'classical.search': 'اردو یا انگریزی میں تلاش کریں…',
    'classical.all': 'سب',
    'classical.empty': 'آپ کی تلاش سے کوئی قول نہیں ملا۔',
    'classical.day': 'قول نمبر',
    'classical.attributionNote':
      'باطنی معرفت، قربِ الٰہی، مشاہدۂ حق، فنائے نفس اور محبتِ الٰہی و محبتِ رسول ﷺ پر مرکوز مجموعہ۔',
    'classical.master.rumi': 'مولانا رومی',
    'classical.master.ibn_arabi': 'ابن عربی',
    'classical.master.bastami': 'بایزید بسطامی',
    'classical.master.shams_tabrizi': 'شمس تبریزی',
    'books.title': 'کتب',
    'books.subtitle': 'صوفی نثار احمد کی بابرکت کتب — سب کے لیے کھلیں، براؤزر میں پڑھیں۔',
    'books.search': 'عنوان یا مصنف سے تلاش کریں…',
    'books.empty': 'آپ کی تلاش سے کوئی کتاب نہیں ملی۔',
    'books.read': 'پی ڈی ایف پڑھیں',
    'books.pages': 'صفحات',
    'books.back': 'تمام کتب',
    'books.openTab': 'نئی ٹیب میں کھولیں',
    'books.download': 'ڈاؤن لوڈ',
    'books.notFound': 'یہ کتاب نہیں ملی۔',
    'books.viewerHint': 'پی ڈی ایف نہیں دکھ رہی؟',
    'books.tryAltViewer': 'متبادل ویوئر آزمائیں',
    'books.tryNative': 'بلٹ اِن پی ڈی ایف ویوئر استعمال کریں',
    'connect.title': 'ہم سے جڑیں',
    'connect.subtitle':
      'بورے والہ شریف تشریف لائیں، ہدایت کے لیے رابطہ کریں، یا لائیو نشستوں اور نئی ویڈیوز کے لیے آن لائن فالو کریں۔',
    'connect.visitUs': 'سائیں جی سے ملاقات',
    'connect.visitHint': 'بورے والہ شریف، پنجاب میں روحانی مرکز',
    'connect.facebook': 'فیس بک پیج',
    'connect.youtube': 'یوٹیوب چینل',
    'connect.visitFacebook': 'فیس بک پیج دیکھیں',
    'connect.visitYoutube': 'یوٹیوب چینل دیکھیں',
    'connect.watchVideos': 'تازہ ویڈیوز دیکھیں',
    'contact.call': 'کال کریں',
    'contact.whatsapp': 'واٹس ایپ',
    'contact.directions': 'راستہ دیکھیں',
    'contact.phone': 'فون',
    'contact.address': 'پتہ',
    'contact.formTitle': 'سوال بھیجیں',
    'contact.formIntro': 'اپنا سوال یا پیغام بھیجیں۔ یہ ای میل کے ذریعے موصول ہو جائے گا۔',
    'contact.name': 'آپ کا نام',
    'contact.email': 'ای میل ایڈریس',
    'contact.message': 'سوال یا پیغام',
    'contact.send': 'پیغام بھیجیں',
    'contact.formNote': 'پیغامات جواب کے لیے سرکاری رابطہ ای میل پر بھیجے جاتے ہیں۔',
    'videos.title': 'ویڈیوز',
    'videos.subtitle': 'صوفی نثار احمد کے ارشاداتِ عالیہ، نعت شریف اور بابرکت محافل — سرکاری یوٹیوب چینل اور فیس بک پیج سے۔',
    'videos.latest': 'تازہ ترین ویڈیوز',
    'videos.watchOnYoutube': 'یوٹیوب پر دیکھیں',
    'videos.openChannel': 'یوٹیوب چینل کھولیں',
    'videos.facebookLatest': 'فیس بک سے تازہ ترین',
    'videos.facebookHint': 'سرکاری فیس بک پیج کی نئی پوسٹس اور ویڈیوز۔',
    'listen.title': 'سنیں',
    'listen.subtitle': 'آڈیو بیانات اور لیکچر سیریز — ایپ ڈاؤن لوڈ کیے بغیر براؤزر میں سنیں۔',
    'listen.kashfHint': 'صوفی نثار احمد کا کشف المحجوب پر ۲۲ حصوں کا بیان۔',
    'listen.nowPlaying': 'اب چل رہا ہے',
    'listen.episodes': 'حصے',
    'listen.part': 'حصہ',
    'listen.previous': 'پچھلا',
    'listen.play': 'چلائیں',
    'listen.next': 'اگلا',
    'listen.watchOnYoutube': 'یوٹیوب پر دیکھیں',
    'listen.unavailable': 'آڈیو ابھی دستیاب نہیں۔ براہ کرم بعد میں دوبارہ کوشش کریں۔',
    'events.title': 'تقریبات و محافل',
    'events.subtitle': 'آنے والی محافل، بیعت، عرس اور لائیو نشستیں — بورے والہ شریف اور آن لائن۔',
    'events.upcoming': 'آنے والی',
    'events.past': 'گزشتہ تقریبات',
    'events.noUpcoming': 'فی الحال کوئی آنے والی تقریب درج نہیں۔ تازہ ترین شیڈول کے لیے رابطہ کریں۔',
    'events.contactHint': 'محافل کے اوقات اور بیعت کے لیے سفر سے پہلے فون یا واٹس ایپ پر رابطہ کریں۔',
    'events.openLink': 'لنک کھولیں',
    'events.learnMore': 'مزید جانیں',
    'events.type.mahfil': 'محفل',
    'events.type.bayat': 'بیعت',
    'events.type.urs': 'عرس',
    'events.type.live': 'لائیو',
    'events.type.other': 'تقریب',
    'bayat.title': 'بیعت و راہِ سلوک',
    'bayat.subtitle': 'خالص سالکین کے لیے بیعت اور بورے والہ شریف تشریف لانے کی رہنمائی — ادب کے ساتھ۔',
    'bayat.questions': 'بیعت کے بارے میں عام سوالات',
    'bayat.allFaq': 'تمام سوالات دیکھیں ←',
    'bayat.visitTitle': 'رہنمائی — بورے والہ شریف',
    'bayat.askQuestion': 'سوال پوچھیں',
    'search.title': 'تلاش',
    'search.subtitle': 'ارشادات، سوالات، کتب اور اقوالِ صوفیاء ایک جگہ تلاش کریں۔',
    'search.placeholder': 'موضوع تلاش کریں، جیسے فنا، عشق، نفس…',
    'search.empty': 'کوئی نتیجہ نہیں ملا۔ اردو یا انگریزی میں دوسرے الفاظ آزمائیں۔',
    'search.section.irshad': 'ارشادات',
    'search.section.faq': 'سوالات',
    'search.section.book': 'کتب',
    'search.section.classical': 'اقوالِ صوفیاء',
    'irshadat.title': 'ارشادات',
    'irshadat.subtitle': 'صوفی نثار احمد کے ارشادات — سب کے لیے کھلے، بغیر لاگ اِن۔',
    'irshadat.search': 'اردو یا انگریزی میں تلاش کریں…',
    'irshadat.all': 'سب',
    'irshadat.copy': 'کاپی',
    'irshadat.copied': 'کاپی ہو گیا',
    'irshadat.share': 'شیئر',
    'irshadat.empty': 'آپ کی تلاش سے کوئی ارشاد نہیں ملا۔',
    'shajra.title': 'شجرہ پاک',
    'shajra.subtitle': 'صوفی نثار احمد کا روحانی سلسلہ — طالبانِ حق کے لیے عوامی۔',
    'shajra.order': 'نمبر',
    'shajra.tapDetails': 'تفصیل کے لیے دبائیں',
    'shajra.readEnglish': 'تفصیل پڑھیں (انگریزی)',
    'shajra.viewUrduPdf': 'اردو پی ڈی ایف دیکھیں',
    'shajra.hideDetails': 'تفصیل بند کریں',
    'gallery.title': 'گیلری',
    'gallery.subtitle': 'اجتماع، ذکر اور نور کے لمحات۔',
    'gallery.all': 'سب',
    'gallery.close': 'بند کریں',
    'login.title': 'ممبر پورٹل',
    'login.subtitle':
      'انتظامی اور ممبر سہولیات کے لیے سائن اِن کریں۔ روحانی مواد عوامی رہتا ہے۔',
    'login.email': 'ای میل',
    'login.password': 'پاس ورڈ',
    'login.submit': 'سائن اِن',
    'login.signingIn': 'سائن اِن ہو رہا ہے…',
    'login.success': 'سائن اِن کامیاب (سیمولیٹڈ)۔ یہاں ممبر ٹولز آئیں گے۔',
    'login.or': 'یا جاری رکھیں',
    'login.google': 'گوگل کے ساتھ جاری رکھیں',
    'login.membersOnly':
      'صرف رجسٹرڈ ممبرز کے لیے۔ ارشادات اور شجرہ پاک کے لیے لاگ اِن درکار نہیں۔',
    'login.emailRequired': 'ای میل ضروری ہے۔',
    'login.emailInvalid': 'درست ای میل درج کریں۔',
    'login.passwordRequired': 'پاس ورڈ ضروری ہے۔',
    'login.passwordMin': 'پاس ورڈ کم از کم ۶ حروف کا ہو۔',
    'footer.tagline': 'طالبانِ حق کے لیے پرسکون دو لسانی ساتھی۔',
    'footer.rights': 'النثار۔ ارشادات روحانی فائدے کے لیے۔',
    'common.loading': 'لوڈ ہو رہا ہے…',
    'common.error': 'مواد لوڈ نہیں ہو سکا۔ براہ کرم انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔',
    'consent.title': 'تجزیاتی کوکیز',
    'consent.message':
      'ہم گوگل اینالیٹکس سے یہ سمجھتے ہیں کہ زائرین ویب سائٹ کیسے استعمال کرتے ہیں۔ صرف گمنام استعمال کی معلومات جمع ہوتی ہے — آپ کا نام، پیغامات یا ذاتی مواد نہیں۔',
    'consent.accept': 'قبول کریں',
    'consent.decline': 'مسترد کریں',
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly lang = signal<Lang>('en');
  readonly dir = computed(() => (this.lang() === 'ur' ? 'rtl' : 'ltr'));
  readonly isUrdu = computed(() => this.lang() === 'ur');

  t(key: DictKey): string {
    return DICTIONARY[this.lang()][key] ?? DICTIONARY['en'][key] ?? key;
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'ur' : 'en'));
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }
}
