#!/usr/bin/env node
// Node.js 18+; somente biblioteca padrão. Nunca grava no pacote instalado.
import * as fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = path.basename(path.dirname(skillRoot)) === 'skills'
  ? path.resolve(skillRoot, '../..') : skillRoot;
const sha = data => createHash('sha256').update(data).digest('hex');
const within = (child, parent) => {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
};
async function exists(file) {
  try { await fs.lstat(file); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; }
}
async function canonical(file) {
  try { return await fs.realpath(file); } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    return path.join(await canonical(path.dirname(file)), path.basename(file));
  }
}
async function regular(file) {
  const info = await fs.lstat(file);
  if (!info.isFile() || info.isSymbolicLink()) throw Error(`Arquivo não regular: ${file}`);
}
async function json(file) { await regular(file); return JSON.parse(await fs.readFile(file, 'utf8')); }
async function exclusive(file, text) {
  try { await fs.writeFile(file, text, { flag: 'wx', mode: 0o600 }); }
  catch (e) { if (e.code !== 'EEXIST') throw e; await regular(file); }
}
async function atomicJSON(file, data) {
  await regular(file);
  const temp = file + '.tmp-' + randomUUID();
  try {
    await fs.writeFile(temp, JSON.stringify(data, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    await fs.rename(temp, file);
  } finally { await fs.unlink(temp).catch(e => { if (e.code !== 'ENOENT') throw e; }); }
}

export async function resolveMemoryDir(override, source) {
  const raw = override ?? process.env.SABATINA_VISUAL_MEMORY_DIR ?? path.join(os.homedir(), '.sabatina-visual', 'memoria');
  if (!path.isAbsolute(raw)) throw Error('SABATINA_VISUAL_MEMORY_DIR/--dir precisa ser um caminho absoluto.');
  const dir = await canonical(raw);
  if (dir === path.parse(dir).root || dir === path.resolve(os.homedir())) {
    throw Error('Use uma subpasta dedicada à memória, não a raiz do disco ou a pasta inteira do usuário.');
  }
  for (const root of [packageRoot, source].filter(Boolean)) {
    if (within(dir, await canonical(root))) throw Error('A memória deve ficar fora da instalação da skill/plugin.');
  }
  // Evita um destino dentro de outro pacote, cache de skill ou repositório.
  for (let parent = dir; ; parent = path.dirname(parent)) {
    if (await exists(path.join(parent, 'SKILL.md')) || await exists(path.join(parent, 'plugin.json')) ||
        await exists(path.join(parent, '.codex-plugin', 'plugin.json')) || await exists(path.join(parent, '.git'))) {
      throw Error('Escolha uma pasta pessoal fora de skills, plugins e repositórios.');
    }
    if (parent === path.dirname(parent)) break;
  }
  return dir;
}

async function checkFormat(dir) {
  const meta = path.join(dir, 'memoria.json');
  if (await exists(meta)) {
    const value = await json(meta);
    if (value.schema_version !== 1) throw Error('Formato de memória desconhecido; nada foi convertido. Preserve a pasta e atualize a ferramenta.');
  }
}
async function safeSubdir(dir, name) {
  const target = path.join(dir, name);
  if (await exists(target)) {
    const info = await fs.lstat(target);
    if (!info.isDirectory() || info.isSymbolicLink()) throw Error(`Diretório de dados inválido: ${name}`);
  } else { await fs.mkdir(target, { mode: 0o700 }); }
  return target;
}
async function initUnlocked(dir) {
  await checkFormat(dir);
  const templates = {
    'memoria.json': JSON.stringify({ schema_version: 1, created_at: new Date().toISOString() }, null, 2) + '\n',
    'licoes.md': '# Lições pessoais aprovadas\n\nSem lições pessoais registradas. IDs novos: U-L001, U-L002…\n',
    'preferencias.md': '# Preferências pessoais aprovadas\n\nSem preferências registradas. IDs novos: U-P001, U-P002…\n',
    'registro.md': '# Histórico pessoal\n\nRegistre data, agente, ação, IDs e aprovação. Não apague entradas antigas.\n',
    'origens.json': JSON.stringify({ schema_version: 1, imports: [] }, null, 2) + '\n',
  };
  for (const [name, text] of Object.entries(templates)) await exclusive(path.join(dir, name), text);
  const index = await json(path.join(dir, 'origens.json'));
  if (index.schema_version !== 1 || !Array.isArray(index.imports)) throw Error('Índice de migração inválido; restaure um backup antes de continuar.');
}
async function withLock(dir, action) {
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });
  const file = path.join(dir, '.memoria.lock');
  let handle;
  try { handle = await fs.open(file, 'wx', 0o600); }
  catch (e) { if (e.code === 'EEXIST') throw Error('Memória em uso (ou trava de execução interrompida). Não execute duas gravações ao mesmo tempo.'); throw e; }
  try { return await action(); }
  finally { await handle.close(); await fs.unlink(file); }
}
export async function initMemory(dir) {
  dir = await resolveMemoryDir(dir);
  return withLock(dir, async () => { await initUnlocked(dir); return { dir, schema_version: 1 }; });
}

async function legacyFiles(source) {
  if (!await exists(path.join(source, 'aprendizados', 'licoes.md'))) throw Error('A origem precisa ser a pasta da skill antiga, contendo aprendizados/licoes.md.');
  const files = [];
  async function add(file, rel) {
    await regular(file);
    files.push({ path: rel.replaceAll(path.sep, '/'), data: await fs.readFile(file) });
  }
  async function visit(dir, prefix) {
    if (!await exists(dir)) return;
    const info = await fs.lstat(dir);
    if (info.isSymbolicLink() || !info.isDirectory()) throw Error('A migração não segue links dentro da skill.');
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const rel = path.join(prefix, entry.name);
      if (entry.isSymbolicLink()) throw Error('A migração não segue links dentro da skill.');
      if (entry.isDirectory()) await visit(path.join(dir, entry.name), rel);
      else if (entry.name.endsWith('.md')) await add(path.join(dir, entry.name), rel);
    }
  }
  if (await exists(path.join(source, 'SKILL.md'))) await add(path.join(source, 'SKILL.md'), 'SKILL.md');
  await visit(path.join(source, 'aprendizados'), 'aprendizados');
  await visit(path.join(source, 'references'), 'references');
  return files.sort((a, b) => a.path.localeCompare(b.path, 'en'));
}
export async function migrateMemory(source, dir) {
  if (!source || !path.isAbsolute(source)) throw Error('--source precisa ser o caminho absoluto da skill antiga.');
  source = await fs.realpath(source); // Aceita uma junção no diretório raiz, sem seguir links internos.
  dir = await resolveMemoryDir(dir, source);
  const files = await legacyFiles(source);
  const id = sha(files.map(f => f.path + ':' + sha(f.data)).join('\n'));
  return withLock(dir, async () => {
    await initUnlocked(dir);
    const indexPath = path.join(dir, 'origens.json');
    const index = await json(indexPath);
    const dest = path.join(dir, 'legado', id);
    if (index.imports.some(item => item.id === id)) {
      for (const file of files) {
        const target = path.join(dest, file.path);
        await regular(target);
        if (sha(await fs.readFile(target)) !== sha(file.data)) throw Error('Cópia legada alterada ou incompleta; preserve e restaure seu backup.');
      }
      return { dir, id, imported: false, files: files.length };
    }
    if (await exists(dest)) throw Error('Migração anterior incompleta. Preserve a pasta legado e confira o índice antes de repetir.');
    const stage = path.join(dir, '.migracao-' + randomUUID());
    await fs.mkdir(stage, { mode: 0o700 });
    // Uma interrupção deixa o estágio para recuperação, nunca remove o original.
    for (const file of files) {
      const target = path.join(stage, file.path);
      await fs.mkdir(path.dirname(target), { recursive: true, mode: 0o700 });
      await fs.writeFile(target, file.data, { flag: 'wx', mode: 0o600 });
      if (sha(await fs.readFile(target)) !== sha(file.data)) throw Error('Falha ao verificar a cópia migrada.');
    }
    await safeSubdir(dir, 'legado');
    await fs.rename(stage, dest);
    const lesson = files.find(f => f.path === 'aprendizados/licoes.md');
    index.imports.push({ id, imported_at: new Date().toISOString(),
      lessons_path: `legado/${id}/aprendizados/licoes.md`, lessons_sha256: sha(lesson.data),
      files: files.map(f => ({ path: f.path, sha256: sha(f.data) })) });
    await atomicJSON(indexPath, index);
    await fs.appendFile(path.join(dir, 'registro.md'), `\n- ${new Date().toISOString()} · migração · ${id} · originais preservados; regras em SKILL.md/references exigem comparação antes de incorporar.\n`);
    return { dir, id, imported: true, files: files.length };
  });
}

async function copyTree(source, dest, skip = new Set()) {
  await fs.mkdir(dest, { recursive: true, mode: 0o700 });
  for (const item of await fs.readdir(source, { withFileTypes: true })) {
    if (skip.has(item.name)) continue;
    if (item.isSymbolicLink()) throw Error('Backup não segue links simbólicos.');
    const from = path.join(source, item.name), to = path.join(dest, item.name);
    if (item.isDirectory()) await copyTree(from, to);
    else { await regular(from); await fs.copyFile(from, to, fs.constants.COPYFILE_EXCL); }
  }
}
export async function backupMemory(dir) {
  dir = await resolveMemoryDir(dir);
  if (!await exists(dir)) throw Error('Ainda não existe memória para copiar.');
  return withLock(dir, async () => {
    if (!await exists(path.join(dir, 'memoria.json'))) throw Error('O destino não é uma memória inicializada.');
    await checkFormat(dir);
    await safeSubdir(dir, 'backups');
    const dest = path.join(dir, 'backups', new Date().toISOString().replaceAll(':', '-') + '-' + randomUUID());
    await copyTree(dir, dest, new Set(['backups', '.memoria.lock']));
    return { dir, backup: dest };
  });
}
export async function memoryStatus(dir) {
  dir = await resolveMemoryDir(dir);
  const present = await exists(dir);
  if (present) await checkFormat(dir);
  return { dir, exists: present,
    files: present ? await fs.readdir(dir) : [],
    note: 'Status não mostra o conteúdo pessoal e não cria arquivos.' };
}

async function main() {
  const [command = 'status', ...rest] = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < rest.length; i += 2) {
    if (!['--dir', '--source'].includes(rest[i]) || !rest[i + 1] || options[rest[i]]) throw Error('Use status|init|migrate|backup [--dir CAMINHO] [--source SKILL_ANTIGA].');
    options[rest[i]] = rest[i + 1];
  }
  const actions = { status: () => memoryStatus(options['--dir']), init: () => initMemory(options['--dir']),
    migrate: () => migrateMemory(options['--source'], options['--dir']), backup: () => backupMemory(options['--dir']) };
  if (!actions[command] || (options['--source'] && command !== 'migrate')) throw Error('Use status|init|migrate|backup; --source só vale em migrate.');
  console.log(JSON.stringify(await actions[command](), null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
