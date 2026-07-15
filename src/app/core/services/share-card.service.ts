import { Injectable } from '@angular/core';
import { CONTACT } from '../../data/contact.data';
import { Irshad } from '../../models/content.models';

@Injectable({ providedIn: 'root' })
export class ShareCardService {
  private shareBody(irshad: Irshad): string {
    const parts = [irshad.ur];
    if (irshad.en) parts.push(irshad.en);
    parts.push('— Sufi Nisar Ahmad / صوفی نثار احمد');
    return parts.join('\n\n');
  }

  /** Full text for copy — includes website URL. */
  formatIrshadShareText(irshad: Irshad): string {
    return `${this.shareBody(irshad)}\n\n${CONTACT.websiteUrl}`;
  }

  /** Body only — pair with `url` in Web Share API to avoid duplicate links. */
  irshadShareBody(irshad: Irshad): string {
    return this.shareBody(irshad);
  }

  async renderIrshadCard(irshad: Irshad): Promise<Blob> {
    const width = 1080;
    const padding = 72;
    const lineHeightUr = 52;
    const lineHeightEn = 36;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    ctx.font = '32px "Noto Nastaliq Urdu", serif';
    const urLines = this.wrapText(ctx, irshad.ur, width - padding * 2, lineHeightUr);

    let enLines: string[] = [];
    if (irshad.en) {
      ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
      enLines = this.wrapText(ctx, irshad.en, width - padding * 2, lineHeightEn);
    }

    const headerH = 100;
    const footerH = 110;
    const urBlockH = urLines.length * lineHeightUr + 24;
    const enBlockH = enLines.length ? enLines.length * lineHeightEn + 40 : 0;
    const height = headerH + urBlockH + enBlockH + footerH + padding;

    canvas.width = width;
    canvas.height = height;

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#0a1612');
    bg.addColorStop(1, '#0d1f18');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
    ctx.font = '600 22px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AL-Nisar · Daily Irshad', width / 2, 72);

    ctx.textAlign = 'right';
    ctx.direction = 'rtl';
    ctx.fillStyle = '#f0ebe0';
    ctx.font = '32px "Noto Nastaliq Urdu", serif';
    let y = headerH + padding / 2;
    for (const line of urLines) {
      ctx.fillText(line, width - padding, y);
      y += lineHeightUr;
    }

    if (enLines.length) {
      y += 16;
      ctx.direction = 'ltr';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(200, 210, 200, 0.85)';
      ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
      for (const line of enLines) {
        ctx.fillText(line, padding, y);
        y += lineHeightEn;
      }
    }

    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.font = '500 18px Inter, system-ui, sans-serif';
    ctx.fillText('— Sufi Nisar Ahmad / صوفی نثار احمد', width / 2, height - 64);
    ctx.fillStyle = 'rgba(160, 180, 165, 0.75)';
    ctx.font = '400 16px Inter, system-ui, sans-serif';
    ctx.fillText(CONTACT.websiteUrl, width / 2, height - 32);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create image'));
      }, 'image/png');
    });
  }

  async downloadIrshadCard(irshad: Irshad): Promise<void> {
    const blob = await this.renderIrshadCard(irshad);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `al-nisar-irshad-${irshad.id}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async shareIrshadCard(irshad: Irshad): Promise<boolean> {
    const blob = await this.renderIrshadCard(irshad);
    const file = new File([blob], `al-nisar-irshad-${irshad.id}.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: 'Irshad — Sufi Nisar Ahmad',
        text: this.formatIrshadShareText(irshad),
        url: CONTACT.websiteUrl,
        files: [file],
      });
      return true;
    }
    await this.downloadIrshadCard(irshad);
    return false;
  }

  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    _lineHeight: number,
  ): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
}
