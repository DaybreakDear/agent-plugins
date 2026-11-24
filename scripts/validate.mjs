import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = root.endsWith('agent-plugins') ? 'plugins.json' : 'skills.json';
const key = file === 'plugins.json' ? 'plugins' : 'skills';
const catalog = JSON.parse(readFileSync(resolve(root, file), 'utf8'));
const fail = (message) => { throw new Error(`${file}: ${message}`); };
if (catalog.schemaVersion !== 1 || !Array.isArray(catalog[key])) fail('invalid catalog format');
const ids = new Set();
for (const entry of catalog[key]) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id ?? '')) fail('invalid id');
  if (ids.has(entry.id)) fail(`duplicate id: ${entry.id}`);
  ids.add(entry.id);
  if (!entry.name || !entry.description || !entry.license) fail(`missing field: ${entry.id}`);
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(entry.source ?? '')) fail(`invalid source: ${entry.id}`);
  if (!Array.isArray(entry.agents) || !entry.agents.length || new Set(entry.agents).size !== entry.agents.length) fail(`invalid agents: ${entry.id}`);
  if (key === 'plugins') {
    if (!['pi-only', 'multi-agent'].includes(entry.compatibility)) fail(`invalid compatibility: ${entry.id}`);
    if (entry.compatibility === 'pi-only' && (entry.agents.length !== 1 || entry.agents[0] !== 'pi')) fail(`pi-only entry has non-Pi agents: ${entry.id}`);
    if (!entry.install || !entry.agents.every(agent => typeof entry.install[agent] === 'string' && entry.install[agent].length)) fail(`missing install information: ${entry.id}`);
  }
}
console.log(`${file}: ${ids.size} entries valid`);
