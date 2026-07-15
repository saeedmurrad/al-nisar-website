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

  readonly masters: ClassicalMaster[] = ['rumi', 'ibn_arabi', 'bastami', 'shams_tabrizi'];

  readonly filtered = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const master = this.masterFilter();
    return this.all().filter((item) => {
      if (master !== 'all' && item.master !== master) return false;
      if (!q) return true;
      return (
        item.en.toLowerCase().includes(q) ||
        item.ur.includes(q) ||
        item.master.includes(q) ||
        String(item.dayOfYear).includes(q)
      );
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
