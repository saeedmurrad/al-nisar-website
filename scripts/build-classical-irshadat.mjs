/**
 * Merges per-master seed files into public/assets/classical-irshadat.json.
 * Builds a focused 160-saying Divine Gnosis and Divine/Prophetic Love collection.
 * Assigns sequence and dayOfYear 1–160 in interleaved order across masters.
 *
 * Usage: node scripts/build-classical-irshadat.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SOURCES = path.join(ROOT, 'classical-sources');
const OUT = new URL('../public/assets/classical-irshadat.json', import.meta.url);
const PER_MASTER = 40;
const TOTAL = 160;
const THEMES = new Set(['gnosis', 'love']);

const MASTERS = [
  { id: 'rumi', file: 'rumi.json' },
  { id: 'ibn_arabi', file: 'ibn_arabi.json' },
  { id: 'bastami', file: 'bastami.json' },
  { id: 'shams_tabrizi', file: 'shams_tabrizi.json' },
];

async function loadMaster(m) {
  const raw = JSON.parse(await readFile(path.join(SOURCES, m.file), 'utf8'));
  if (!Array.isArray(raw) || raw.length !== PER_MASTER) {
    throw new Error(`${m.id}: expected exactly ${PER_MASTER} sayings, got ${raw?.length ?? 0}`);
  }
  const items = raw.map((row, i) => {
    const en = String(row.en ?? '').trim();
    const ur = String(row.ur ?? '').trim();
    const theme = String(row.theme ?? '').trim();
    if (!en || !ur) throw new Error(`${m.id}#${i + 1}: empty en/ur`);
    if (!THEMES.has(theme)) {
      throw new Error(`${m.id}#${i + 1}: theme must be "gnosis" or "love", got "${theme}"`);
    }
    return {
      master: m.id,
      en,
      ur,
      theme,
      sourceNote: row.sourceNote ?? `${m.id} — classical Sufi tradition`,
    };
  });
  return items;
}

/** Round-robin interleave so consecutive days rotate masters. */
function interleave(pools) {
  const queues = pools.map((p) => [...p]);
  const out = [];
  while (out.length < TOTAL) {
    let progressed = false;
    for (const q of queues) {
      if (out.length >= TOTAL) break;
      if (q.length === 0) continue;
      out.push(q.shift());
      progressed = true;
    }
    if (!progressed) break;
  }
  return out;
}

const pools = [];
for (const m of MASTERS) {
  pools.push(await loadMaster(m));
}

const interleaved = interleave(pools);
if (interleaved.length !== TOTAL) {
  throw new Error(`Expected ${TOTAL} interleaved entries, got ${interleaved.length}`);
}

const enSeen = new Set();
const sayings = interleaved.map((row, idx) => {
  const sequence = idx + 1;
  const normalizedEnglish = row.en.toLocaleLowerCase('en').replace(/\s+/g, ' ');
  if (enSeen.has(normalizedEnglish)) {
    throw new Error(`Duplicate English at sequence ${sequence}: ${row.en.slice(0, 60)}…`);
  }
  enSeen.add(normalizedEnglish);
  return {
    id: `irshad-${String(sequence).padStart(3, '0')}-${row.master}`,
    sequence,
    dayOfYear: sequence,
    master: row.master,
    en: row.en,
    ur: row.ur,
    theme: row.theme,
    sourceNote: row.sourceNote,
  };
});

const counts = Object.fromEntries(MASTERS.map((m) => [m.id, 0]));
for (const s of sayings) counts[s.master]++;

for (const m of MASTERS) {
  if (counts[m.id] !== PER_MASTER) {
    throw new Error(`${m.id}: expected ${PER_MASTER}, got ${counts[m.id]}`);
  }
}

const themeCounts = { gnosis: 0, love: 0 };
for (const s of sayings) themeCounts[s.theme]++;
if (themeCounts.gnosis / TOTAL < 0.6) {
  throw new Error(`Gnosis must be at least 60% of the collection, got ${themeCounts.gnosis}/${TOTAL}`);
}

const payload = {
  version: 2,
  updatedAt: new Date().toISOString().slice(0, 10),
  collectionFocus: 'Divine Gnosis and Divine/Prophetic Love',
  description:
    'A focused collection of 160 classical Sufi sayings on Divine Gnosis, inner awakening, nearness, witnessing, annihilation of the ego, and Divine or Prophetic Love.',
  attribution:
    'Curated public-domain renderings from the classical Sufi tradition associated with Rumi, Ibn Arabi, Bayazid Bastami, and Shams Tabrizi.',
  total: TOTAL,
  counts,
  themeCounts,
  sayings,
};

await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n');
console.log(`Wrote ${sayings.length} sayings → public/assets/classical-irshadat.json`);
console.log('Counts:', counts);
