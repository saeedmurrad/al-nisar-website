import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideSearch } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { ClassicalMaster, ClassicalSaying } from '../../models/content.models';

const MASTER_ATTR: Record<ClassicalMaster, { en: string; ur: string }> = {
  rumi: { en: 'Maulana Jalaluddin Rumi', ur: 'مولانا جلال الدین رومی' },
  ibn_arabi: { en: 'Sheikh Muhyiddin Ibn Arabi', ur: 'شیخ محی الدین ابن عربی' },
  bastami: { en: 'Hazrat Bayazid Bastami', ur: 'حضرت بایزید بسطامی' },
  shams_tabrizi: { en: 'Khwaja Shams Tabrizi', ur: 'خواجہ شمس تبریزی' },
  mujaddid_alf_sani: {
    en: 'Hazrat Mujaddid Alf Sani Imam Rabbani',
    ur: 'حضرت مجدد الف ثانی امام ربانی',
  },
  bahauddin_naqshband: {
    en: 'Hazrat Bahauddin Naqshband',
    ur: 'حضرت بہاؤالدین نقشبند',
  },
  abdul_khaliq_ghujdawani: {
    en: 'Hazrat Abdul Khaliq Ghujdawani',
    ur: 'حضرت عبدالخالق غجدوانی',
  },
  baqi_billah: { en: 'Hazrat Khwaja Baqi Billah', ur: 'حضرت خواجہ باقی باللہ' },
  abdul_qadir_jilani: {
    en: 'Hazrat Abdul Qadir Jilani',
    ur: 'حضرت عبدالقادر جیلانی',
  },
  allama_iqbal: {
    en: 'Allama Muhammad Iqbal',
    ur: 'علامہ محمد اقبال',
  },
  rabia_basri: {
    en: 'Hazrat Rabia al-Adawiyya',
    ur: 'حضرت رابعہ بصری',
  },
  fariduddin_attar: {
    en: 'Fariduddin Attar',
    ur: 'فرید الدین عطار',
  },
  data_ganj_bakhsh: {
    en: 'Hazrat Data Ganj Bakhsh Ali Hujwiri',
    ur: 'حضرت داتا گنج بخش علی ہجویری',
  },
  moinuddin_chishti: {
    en: 'Khwaja Moinuddin Chishti',
    ur: 'خواجہ معین الدین چشتی',
  },
  junayd_baghdadi: {
    en: 'Hazrat Junayd of Baghdad',
    ur: 'حضرت جنید بغدادی',
  },
  hafez_shirazi: {
    en: 'Khwaja Hafez of Shiraz',
    ur: 'خواجہ حافظ شیرازی',
  },
};

@Component({
  selector: 'app-classical-irshadat',
  imports: [FormsModule, LucideSearch],
  templateUrl: './classical-irshadat.component.html',
})
export class ClassicalIrshadatComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly all = signal<ClassicalSaying[]>([]);
  readonly today = signal<ClassicalSaying | null>(null);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly searchQuery = signal('');
  readonly masterFilter = signal<ClassicalMaster | 'all'>('all');

  readonly masters: ClassicalMaster[] = [
    'abdul_qadir_jilani',
    'allama_iqbal',
    'rumi',
    'ibn_arabi',
    'bastami',
    'shams_tabrizi',
    'data_ganj_bakhsh',
    'moinuddin_chishti',
    'rabia_basri',
    'fariduddin_attar',
    'junayd_baghdadi',
    'hafez_shirazi',
    'mujaddid_alf_sani',
    'bahauddin_naqshband',
    'abdul_khaliq_ghujdawani',
    'baqi_billah',
  ];

  readonly filtered = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const master = this.masterFilter();
    return this.all()
      .filter((item) => {
        if (master !== 'all' && item.master !== master) return false;
        if (!q) return true;
        return (
          item.en.toLowerCase().includes(q) ||
          item.ur.includes(q) ||
          item.master.includes(q) ||
          String(item.dayOfYear).includes(q)
        );
      })
      .sort((a, b) => {
        const aTop = a.master === 'abdul_qadir_jilani' ? 0 : 1;
        const bTop = b.master === 'abdul_qadir_jilani' ? 0 : 1;
        if (aTop !== bTop) return aTop - bTop;
        return a.dayOfYear - b.dayOfYear;
      });
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getClassicalIrshadat()
        .then((items) => {
          this.all.set(items);
          this.today.set(this.data.pickDailyClassical(items));
        })
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  setMaster(master: ClassicalMaster | 'all'): void {
    this.masterFilter.set(master);
  }

  masterKey(master: ClassicalMaster): `classical.master.${ClassicalMaster}` {
    return `classical.master.${master}`;
  }

  attribution(item: ClassicalSaying): { en: string; ur: string } {
    return MASTER_ATTR[item.master];
  }
}
