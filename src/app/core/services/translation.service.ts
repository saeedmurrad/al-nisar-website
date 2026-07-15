import { Injectable, computed, signal } from '@angular/core';
import { Lang } from '../../models/content.models';

type DictKey =
  | 'nav.home'
  | 'nav.irshadat'
  | 'nav.shajra'
  | 'nav.gallery'
  | 'nav.videos'
  | 'nav.books'
  | 'nav.memberPortal'
  | 'nav.menu'
  | 'nav.close'
  | 'home.dailyIrshad'
  | 'home.assalat'
  | 'home.assalatEn'
  | 'home.readMore'
  | 'home.viewGallery'
  | 'home.quickLinks'
  | 'home.appPromoTitle'
  | 'home.appPromoBody'
  | 'home.getApp'
  | 'home.exploreIrshadat'
  | 'home.exploreShajra'
  | 'home.exploreGallery'
  | 'home.exploreVideos'
  | 'home.exploreBooks'
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
  | 'connect.facebook'
  | 'connect.youtube'
  | 'connect.visitFacebook'
  | 'connect.visitYoutube'
  | 'connect.watchVideos'
  | 'videos.title'
  | 'videos.subtitle'
  | 'videos.latest'
  | 'videos.watchOnYoutube'
  | 'videos.openChannel'
  | 'videos.facebookLatest'
  | 'videos.facebookHint'
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
  | 'common.error';

const DICTIONARY: Record<Lang, Record<DictKey, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.irshadat': 'Irshadat',
    'nav.shajra': 'Shajra Pak',
    'nav.gallery': 'Gallery',
    'nav.videos': 'Videos',
    'nav.books': 'Books',
    'nav.memberPortal': 'Member Portal',
    'nav.menu': 'Open menu',
    'nav.close': 'Close menu',
    'home.dailyIrshad': 'Daily Blessed Saying',
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
    'home.exploreShajra': 'Discover the sacred spiritual lineage (Silsila).',
    'home.exploreGallery': 'A peaceful collection of moments from the path.',
    'home.exploreVideos': 'Watch Irshadat-e-Aalia and Naats Sharif from YouTube and Facebook.',
    'home.exploreBooks': 'Read blessed books of Sufi Nisar Ahmad as PDFs.',
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
    'connect.subtitle': 'Follow Sufi Nisar Ahmad on Facebook and YouTube for live sessions and new uploads.',
    'connect.facebook': 'Facebook Page',
    'connect.youtube': 'YouTube Channel',
    'connect.visitFacebook': 'Visit Facebook Page',
    'connect.visitYoutube': 'Visit YouTube Channel',
    'connect.watchVideos': 'Watch latest videos',
    'videos.title': 'Videos',
    'videos.subtitle': 'Irshadat-e-Aalia, Naats Sharif, and blessed gatherings of Sufi Nisar Ahmad — from the official YouTube channel and Facebook page.',
    'videos.latest': 'Latest Videos',
    'videos.watchOnYoutube': 'Watch on YouTube',
    'videos.openChannel': 'Open YouTube Channel',
    'videos.facebookLatest': 'Latest from Facebook',
    'videos.facebookHint': 'Newest posts and videos from the official Facebook page.',
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
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.irshadat': 'ارشادات',
    'nav.shajra': 'شجرہ پاک',
    'nav.gallery': 'گیلری',
    'nav.videos': 'ویڈیوز',
    'nav.books': 'کتب',
    'nav.memberPortal': 'ممبر پورٹل',
    'nav.menu': 'مینو کھولیں',
    'nav.close': 'مینو بند کریں',
    'home.dailyIrshad': 'آج کا فرمانِ مبارک',
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
    'home.exploreShajra': 'مقدس روحانی سلسلہ (شجرہ) دیکھیں۔',
    'home.exploreGallery': 'راہِ سلوک کے پرسکون لمحات کی گیلری۔',
    'home.exploreVideos': 'یوٹیوب اور فیس بک سے ارشاداتِ عالیہ اور نعت شریف دیکھیں۔',
    'home.exploreBooks': 'صوفی نثار احمد کی بابرکت کتب پی ڈی ایف میں پڑھیں۔',
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
    'connect.subtitle': 'لائیو نشستوں اور نئی ویڈیوز کے لیے صوفی نثار احمد کو فیس بک اور یوٹیوب پر فالو کریں۔',
    'connect.facebook': 'فیس بک پیج',
    'connect.youtube': 'یوٹیوب چینل',
    'connect.visitFacebook': 'فیس بک پیج دیکھیں',
    'connect.visitYoutube': 'یوٹیوب چینل دیکھیں',
    'connect.watchVideos': 'تازہ ویڈیوز دیکھیں',
    'videos.title': 'ویڈیوز',
    'videos.subtitle': 'صوفی نثار احمد کے ارشاداتِ عالیہ، نعت شریف اور بابرکت محافل — سرکاری یوٹیوب چینل اور فیس بک پیج سے۔',
    'videos.latest': 'تازہ ترین ویڈیوز',
    'videos.watchOnYoutube': 'یوٹیوب پر دیکھیں',
    'videos.openChannel': 'یوٹیوب چینل کھولیں',
    'videos.facebookLatest': 'فیس بک سے تازہ ترین',
    'videos.facebookHint': 'سرکاری فیس بک پیج کی نئی پوسٹس اور ویڈیوز۔',
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
